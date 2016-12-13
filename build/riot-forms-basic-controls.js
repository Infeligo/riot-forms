/* Basic Controls for Riot Forms, @license MIT */
(function (riot,riotForms) {
'use strict';

riot = 'default' in riot ? riot['default'] : riot;

riot.tag2('text-input', '<input type="text" name="{opts.name}" riot-value="{opts.value}" class="form-control {classes()}" onchange="{handleChange}" onblur="{handleBlur}">', '', '', function(opts) {

        this.mixin(riotForms.FormControlMixin);

        this.getRawValue = function() {
            return this.root.firstChild.value;
        }.bind(this);

        this.setRawValue = function(value) {
            this.root.firstChild.value = value;
        }.bind(this);
});

riot.tag2('password-input', '<input type="password" name="{opts.name}" riot-value="{opts.value}" class="form-control {classes()}" onchange="{handleChange}" onblur="{handleBlur}">', '', '', function(opts) {

        this.mixin(riotForms.FormControlMixin);

        this.getRawValue = function() {
            return this.root.firstChild.value;
        }.bind(this);

        this.setRawValue = function(value) {
            this.root.firstChild.value = value;
        }.bind(this);
});

riot.tag2('number-input', '<input type="text" name="{opts.name}" riot-value="{opts.value}" class="form-control {classes()}" onchange="{handleChange}" onblur="{handleBlur}">', '', '', function(opts) {

        this.mixin(riotForms.FormControlMixin);

        this.getRawValue = function() {
            return this.root.firstChild.value;
        }.bind(this);

        this.setRawValue = function(value) {
            this.root.firstChild.value = value;
        }.bind(this);
});

riot.tag2('date-input', '<input type="text" name="{opts.name}" riot-value="{opts.value}" class="form-control {classes()}" onchange="{handleChange}" onblur="{handleBlur}">', '', '', function(opts) {

        this.mixin(riotForms.FormControlMixin);

        this.getRawValue = function() {
            return this.root.firstChild.value;
        }.bind(this);

        this.setRawValue = function(value) {
            this.root.firstChild.value = value;
        }.bind(this);
});

riot.tag2('check-box', '<input type="checkbox" name="{opts.name}" riot-value="{opts.value}" class="{classes()}" onchange="{handleChange}" onblur="{handleBlur}">', '', '', function(opts) {

        this.mixin(riotForms.FormControlMixin);

        this.getRawValue = function() {
            var input = this.root.firstChild;
            switch (opts.type) {
                case "boolean":
                    return input.checked;
                default:
                    return input.checked ? this.root.firstChild.value : undefined;
            }
        }.bind(this);

        this.setRawValue = function(value) {

            this.root.firstChild.value = value;
        }.bind(this);
});

riot.tag2('radio-button', '<input type="radio" name="{opts.name}" riot-value="{opts.value}" class="{classes()}" onchange="{handleChange}" onblur="{handleBlur}">', '', '', function(opts) {

        this.mixin(riotForms.FormControlMixin);

        this.getRawValue = function() {
            var input = this.root.firstChild;
            return input.checked ? input.value : undefined;
        }.bind(this);

        this.setRawValue = function(value) {
            this.root.firstChild.value = value;
        }.bind(this);
});

riot.tag2('select-box', '<select name="{opts.name}" class="form-control {classes()}" onchange="{handleChange}" onblur="{handleBlur}"> <option each="{opts.options}" riot-value="{value}">{text}</option> </select>', '', '', function(opts) {

        this.mixin(riotForms.FormControlMixin);

        this.getValue = function() {
            return this.root.firstChild.value;
        }.bind(this);
});

riot.tag2('text-area', '<textarea name="{opts.name}" class="form-control {classes()}" onchange="{handleChange}" onblur="{handleBlur}">{opts.value}</textarea>', '', '', function(opts) {

        this.mixin(riotForms.FormControlMixin);

        this.getRawValue = function() {
            return this.root.firstChild.text;
        }.bind(this);

        this.setRawValue = function(value) {
            this.root.firstChild.text = value;
        }.bind(this);
});

/**
 * Riot Forms public api
 */

}(riot,RiotForms));
