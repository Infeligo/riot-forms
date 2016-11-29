<password-input>
    <input type="password"
           name="{ opts.name }"
           value="{ opts.value }"
           class="form-control { classes() }"
           onchange="{ handleChange }"
           onblur="{ handleBlur }" />

    <script>
        this.mixin(FormControlMixin);

        getRawValue() {
            return this.root.firstChild.value;
        }

        setRawValue(value) {
            this.root.firstChild.value = value;
        }        
    </script>
</password-input>