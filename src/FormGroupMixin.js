import { toFormData, eachControlOrGroup, ensureArray, isFunction} from './utils';

/**
 * The goal of this mixin is to tell a component that holds one or more controls
 * whether any of those controls have errors or warnings.
 */

function mergeErrors(target, name, source) {
    // TODO Account for multiple controls with same name
    target[name] = source;
}

export default {

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

    getName() {
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
