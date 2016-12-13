<radio-button>
    <input type="radio"
           name="{ opts.name }"
           value="{ opts.value }"
           class="{ classes() }"
           onchange="{ handleChange }"
           onblur="{ handleBlur }"/>

    <script>
        import { FormControlMixin } from 'riot-forms';
        
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