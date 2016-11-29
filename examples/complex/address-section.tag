<address-section>
    <div class="form-group">
        <label>Street</label>
        <text-input name="street" value=""/>
    </div>
    <div class="form-group">
        <label>City</label>
        <text-input name="city" value=""/>
    </div>
    <div class="form-group">    
        <label>Country</label>
        <select-box name="country" options="{ countries }"/>
    </div>

    <script>
        this.mixin(FormGroupMixin);

        this.schema = {

        }

        this.countries = [
            { value: "EE", text: "Estonia" },
            { value: "FI", text: "Finland" },
            { value: "LT", text: "Latvia" },
            { value: "LT", text: "Russia" },            
            { value: "LT", text: "Sweden" }
        ];
    </script>
</address-section>