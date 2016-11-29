(function (global) {

    var FormMixin = Object.assign({}, FormGroupMixin, {

        init: function () {
            this.isForm = true;
            this.submitted = false;
            this.validating = false;
        },

        onSubmit: function (e) {
            console.debug("FormMixin.onSubmit(%o)", e);
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

    global.FormMixin = FormMixin;

})(window);