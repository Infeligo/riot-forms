/* Riot Forms, @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('validate.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'validate.js'], factory) :
  (factory((global.RiotForms = global.RiotForms || {}),global.validate));
}(this, (function (exports,validate) { 'use strict';

validate = 'default' in validate ? validate['default'] : validate;

var format = {
  
  trimmed: {

    parse: function (value) {
      return (value || "").trim();
    }

  }

};

function toFormData(data) {
  var formData = new FormData();
  flatten(data, "", formData.append);
  return formData;
}

function flatten(obj, path, callback) {
  if (Array.isArray(obj)) {
    obj.forEach(function (val, index) {
      flatten(val, path + "[" + index +"]", callback);
    });
  } else if (typeof obj === "object") {
    Object.keys(obj).forEach(function (key) {
      flatten(obj[key], (path ? path + "." : "") + key, callback);
    });    
  } else if (isFunction(obj)) {
    callback(path, obj());
  } else {
    callback(path, obj);
  }
}

function eachControlOrGroup(tag, callback, context) {
  var key, children;
  if (tag.tags) {
    for (key in tag.tags) {
      if (tag.tags.hasOwnProperty(key)) {
        [].concat(tag.tags[key]).forEach(function (child) {
          if (child.isFormGroup || child.isFormControl) {
            callback.call(context, child, key);
          } else {
            eachControlOrGroup(child, callback, context);
          }
        });
      }
    }    
  }
}

/**
 * Tests is parameter fn is a function.
 */
function isFunction(fn) {
  return typeof fn === "function";
}

/**
 * If obj[key] is an array, returns it. 
 * Otherwise assigns new empty array to obj[key] and returns it.
 */
function ensureArray(obj, key) {
  return Array.isArray(obj[key]) ? obj[key] : (obj[key] = []);
}

/**
 * FormControl mixin is a wrapper around standard input controls.
 */


function findAncestorForm(parent) {
    if (parent == null) {
        throw "Form Control must be placed within a Form";
    }
    return parent.isForm ? parent : findAncestorForm(parent.parent);
}

function validateControl(tag) {
    // TODO Evaluate if schema merge on each validation affects performance too much
    var schema = mergeSchema(tag);
    var errors = tag.validateSchema(schema);
    tag.validateCustom(errors);
    tag.errors = errors;
    tag.valid = !Object.keys(tag.errors).length;
}

function extractParentSchema(tag) {
    var parentSchema = tag.form.schema || {};
    return parentSchema[tag.opts.name] || {};
}

function mergeSchema(tag) {
    return Object.assign({}, tag.schema || {}, tag.opts.schema || {}, extractParentSchema(tag));
}

var FormControlMixin = {

    init: function () {
        this.dirty = false;
        this.touched = false;
        this.valid = true;
        this.disabled = false;
        this.readonly = false;
        this.schema = {};
        this.isFormControl = true;
        this.form = null;

        this.on('mount', function () {
            this.form = findAncestorForm(this.parent);
            this.value = this.getValue();
            this.originalValue = this.value;                                
        });
    },

    isDirty: function () {
        return this.dirty;
    },

    isPristine: function () {
        return !this.isDirty();
    },

    isTouched: function () {
        return this.touched;
    },

    isUntouched: function () {
        return !this.isTouched();
    },

    isValid: function () {
        return this.valid;
    },

    isInvalid: function () {
        return !this.isValid();
    },

    isDisabled: function () {
        return this.disabled;
    },

    isReadonly: function () {
        return this.readonly;
    },

    isEditable: function () {
        return !isReadonly() && !isDisabled();
    },

    classes: function (otherClasses) {
        var classes = Array.from(arguments);
        classes.push(this.isValid() ? "valid" : "invalid");
        classes.push(this.isTouched() ? "touched" : "untouched");
        classes.push(this.isDirty() ? "dirty" : "pristine");
        return classes.join(" ");
    },

    getName: function () {
        return this.opts.name;
    },

    hasError: function (rule) {
        return this.errors && !!this.errors[rule];
    },

    handleChange: function (e) {
        this.dirty = true;
        this.value = this.getValue();

        // Update input with formatted value
        // TODO Optimize for cases when semantically not applicable     
        this.setRawValue(this.format(this.value));

        this.validate();
        if (this.opts.onchange) {
            this.opts.onchange.call(this, e);
        }
    },

    handleBlur: function (e) {
        this.touched = true;
        this.validate();
        if (this.opts.onblur) {
            this.opts.onblur.call(this, e);
        }
    },

    handleKeyUp: function (e) {
        if (this.isTouched()) {
            this.validate();
        }
        if (this.opts.onkeyup) {
            this.opts.onkeyup.call(this, e);
        }            
    },

    validate: function () {
        validateControl(this);
        this.form.update();
    },

    validateSchema: function (schema) {
        var valueObject = {}, schemaObject = {};
        valueObject[this.opts.name] = this.value;
        schemaObject[this.opts.name] = schema;
        // Single value validation does not support detailed formats
        var errors = validate(valueObject, schemaObject, { format: "detailed" }) || [];
        console.log(valueObject, schemaObject, errors);
        // Group errors by validator
        var grouped = {};
        errors.forEach(function (error) {
            var key = error.validator;
            (grouped[key] = grouped[key] || []).push({
                error: error.error,
                value: error.value
            });

        });
        return grouped;
    },

    validateCustom: function (errors) {
        // noop
    },

    reset: function () {
        this.errors = {};
        this.valid = true;
        this.dirty = false;
        this.touched = false;
        this.value = this.originalValue;
    },

    format: function (value) {
        var formatter = this.opts.format && isFunction(this.opts.format.format) && this.opts.format.format;
        return formatter ? formatter(value) : ("" + value); 
    },

    parse: function (value) {
        var parser = this.opts.format && isFunction(this.opts.format.parse) && this.opts.format.parse;
        return parser ? parser(value) : value;
    },

    getRawValue: function () {
        throw "getRawValue() is not implemented";
    },

    setRawValue: function (value) {
        throw "setRawValue() is not implemented";
    },        

    getValue: function () {
        return this.parse(this.getRawValue());
    }

};

/**
 * The goal of this mixin is to tell a component that holds one or more controls
 * whether any of those controls have errors or warnings.
 */

function mergeErrors(target, name, source) {
    // TODO Account for multiple controls with same name
    target[name] = source;
}

var FormGroupMixin = {

    init: function () {
        this.isFormGroup = true;
        this.errors = {};
        this.validating = false;
        this.isListItem = !!this.opts.listName;                   
    },

    isValid: function () {
        return this.valid;
    },

    isInvalid: function () {
        return !this.isValid();
    },

    getErrors: function () {
        return this.errors;
    },

    getName: function getName() {
        return this.isListItem ? this.opts.listName : this.opts.name;
    },

    getData: function () {
        // TODO Consider caching data
        var data = {};
        this.eachControlOrGroup(function (tag) {
            var name = tag.getName();
            if (tag.isFormControl) {
                var value = tag.getValue();
                if (typeof value === "undefined") {
                    // Skip undefined values e.g. from checkboxes
                    return;
                }
                // Merge values with same name into array
                if (typeof data[name] !== "undefined" && !Array.isArray(data[name])) {
                    data[name] = [ data[name] ];
                }                    
                if (Array.isArray(data[name])) {
                    data[name].push(value);
                } else {
                    data[name] = value;
                }
            } else if (tag.isFormGroup) {
                if (tag.isListItem) {
                    // Add item to list
                    ensureArray(data, name).push(tag.getData());                        
                } else {
                    // Override groups with same name
                    data[name] = tag.getData();
                }
            }
        });            
        return data;
    },

    getFormData: function () {
        return toFormData(this.getData());
    },

    validate: function (callback) {
        this.errors = {};
        this.eachControlOrGroup(function (tag) {
            if (tag.isFormControl || tag.isFormGroup) {
                tag.validate();
                mergeErrors(this.errors, tag.getName(), tag.errors);
            }
        });
        this.validateCustom(this.errors);
        this.update();
        typeof callback === "function" && callback.call(this);
    },

    validateCustom: function (errors) {
        // noop
    },

    validateCustomAsync: function (errors) {
        // noop
    },

    reset: function () {
        this.eachControlOrGroup(function (tag) {
            if (tag.isFormControl || tag.isFormGroup) {
                tag.reset();
            }
        });
        this.update();
    },

    eachControlOrGroup: function (callback) {
        return eachControlOrGroup(this, callback, this);
    },        

};

var FormMixin = Object.assign({}, FormGroupMixin, {

    init: function () {
        this.isForm = true;
        this.submitted = false;
        this.validating = false;
    },

    onSubmit: function (e) {
        e.preventDefault();
        var self = this;
        // Do not update until validated
        e.preventUpdate = true;
        this.validate(function () {
            if (self.isValid()) {
                self.trigger("submit.valid", self.getData());
            } else {
                self.trigger("submit.invalid", self.getErrors());
            }
        });
        return false;
    }

});

/**
 * Riot Forms public api
 */

exports.format = format;
exports.FormControlMixin = FormControlMixin;
exports.FormGroupMixin = FormGroupMixin;
exports.FormMixin = FormMixin;

Object.defineProperty(exports, '__esModule', { value: true });

})));
