<password-input>
    <input type="password"
           name="{ opts.name }"
           value="{ opts.value }"
           class="form-control { classes() }"
           onchange="{ handleChange }"
           onblur="{ handleBlur }" />

    <script>
        import { FormControlMixin } from 'riot-forms';
        
        this.mixin(FormControlMixin);

        getRawValue() {
            return this.root.firstChild.value;
        }

        setRawValue(value) {
            this.root.firstChild.value = value;
        }        
    </script>
</password-input>