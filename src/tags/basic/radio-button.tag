<radio-button>
    <input type="radio"
           name="{ opts.name }"
           value="{ opts.value }"
           class="{ classes() }"
           onchange="{ handleChange }"
           onblur="{ handleBlur }"/>

    <script>
        this.mixin(FormControlMixin);

        getRawValue() {
            var input = this.root.firstChild;
            return input.checked ? input.value : undefined;
        }

        setRawValue(value) {
            this.root.firstChild.value = value;
        }        
    </script>
</radio-button>