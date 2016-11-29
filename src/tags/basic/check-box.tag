<check-box>    
    <input type="checkbox"
           name="{ opts.name }"
           value="{ opts.value }"
           class="{ classes() }"
           onchange="{ handleChange }"
           onblur="{ handleBlur }"/>
    
    <script>
        this.mixin(FormControlMixin);

        getRawValue() {
            var input = this.root.firstChild; 
            switch (opts.type) {
                case "boolean": 
                    return input.checked;
                default:
                    return input.checked ? this.root.firstChild.value : undefined;  
            }
        }

        setRawValue(value) {
            // TODO In type is boolean, then..?
            this.root.firstChild.value = value;
        }        
    </script>
</check-box>