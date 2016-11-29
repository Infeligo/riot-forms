<text-area>
    <textarea name="{ opts.name }"
              class="form-control { classes() }"
              onchange="{ handleChange }"
              onblur="{ handleBlur }">{ opts.value }</textarea>
    
    <script>
        this.mixin(FormControlMixin);
        
        getRawValue() {
            return this.root.firstChild.text;
        }

        setRawValue(value) {
            this.root.firstChild.text = value;
        }                
    </script>
</text-area>