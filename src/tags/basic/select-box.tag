<select-box>
    <select name="{ opts.name }"
            class="form-control { classes() }"
            onchange="{ handleChange }"
            onblur="{ handleBlur }">
        <option each="{ opts.options }" value="{ value }">{ text }</option>
    </select>
    
    <script>
        import { FormControlMixin } from 'riot-forms';
        
        this.mixin(FormControlMixin);
        
        getValue() {
            return this.root.firstChild.value;
        }        
    </script>
</select-box>