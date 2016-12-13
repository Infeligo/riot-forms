import { isFunction } from './utils';
import validate from 'validate.js';

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

export default {

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
