<complex-form>
    <h2>Tax collection form</h2>
    <br/>
    <form>
        <div class="row">
        <fieldset class="col-md-7">
            <legend>Profile data</legend>

            <div class="form-group row">
                <div class="col-md-4">
                    <label>Registration code</label>
                    <number-input name="registrationCode"/>
                </div>
                <div class="col-md-8">
                    <label>Company name</label>
                    <text-input name="name" maxlength="30" minlength="3"/>
                </div>
            </div>
            <div class="form-group">
                <label>Company type</label>
                <div class="form-group">
                    <label class="radio-inline">
                        <radio-button name="type" value="private"/> Private company
                    </label>
                    <label class="radio-inline">
                        <radio-button name="type" value="public"/> Public company
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label>Industry areas</label>
                <industry-areas list="{ industryAreas }"/>
            </div>           
        </fieldset>

        <fieldset class="col-md-4 col-md-offset-1">
            <legend>Address</legend>
            <address-section name="address"/>
        </fieldset>
        </div>

        <div class="row">
        <fieldset class="col-md-12">
            <legend>Employees</legend>
            <employee-row list-name="employee" each="{ employees }" onremove="{ removeEmployee }"/>
            <button type="button" class="btn btn-default" onclick="{ addEmployee }">Add employee</button>
        </fieldset>
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="reset" class="btn btn-default">Reset</button>
            <button type="button" class="btn btn-default" onclick="{ logData }">console.log(getData())</button>
        </div>
    </form>

    <script>
        this.mixin(FormMixin);

        this.schema = {
            registrationCode: {
                presence: true
            },
            name: {
                presence: true
            },
            type: {
                presence: true
            }
        }

        this.employees = [
            {
                socialNumber: "",
                fullName: ""
            }
        ];

        addEmployee() {
            this.employees.push({});
        }

        removeEmployee() {
            this.employees.splice();
        }

        logData() {
            console.log(this.getData());
        }

        this.on('submit.valid', function (data) {
            console.log(data);
            alert("Success!");
        });

        this.on('submit.invalid', function (errors) {
            console.log(errors);
            alert("There are errors on the form!");
        });    

        window.complexForm = this;
    </script>

</complex-form>