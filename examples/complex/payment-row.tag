<payment-row>
    <div class="form-group row">
        <div class="col-md-4">
            <label>Payment type</label>
            <select-box name="type" options="{ paymentTypes }" />
        </div>
        <div class="col-md-3">
            <label>Amount</label>
            <number-input name="amount"/>
        </div>
        <div class=""col-md-1">
            <button class="btn btn-default">x</button>
        </div>
    </div>

    <script>
        this.mixin(FormGroupMixin);        
    </script>
</payment-row>