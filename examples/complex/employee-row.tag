<employee-row>
    <div class="well">
        <div class="form-group row">
            <div class="col-md-4">
                <label>Full name</label>
                <text-input name="fullName"/>
            </div>
            <div class="col-md-4">
                <label>Social nr.</label>
                <text-input name="socialNumber"/>
            </div>            
            <div class="col-md-3">
                <label>Residency</label><br/>
                <label class="checkbox-inline">
                    <check-box name="resident"/> Is resident
                </label>
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-default">x</button>
            </div>
        </div>

        <h4>Payments</h4>

        <payment-row list-name="payment" each="{ payments }" onremove="{ removePayment }"/>

        <div class="form-group">
            <button type="button" class="btn btn-default" onclick="{ addPayment }">Add payment</button>
        </div>
    </div>

    <script>
        this.mixin(FormGroupMixin);

        this.payments = [
            {
                type: "",
                amount: 2000
            }
        ];

        addPayment() {
            this.payments.push({});
        }

        removePayment() {
            this.payments.splice();
        }
    </script>
</employee-row>