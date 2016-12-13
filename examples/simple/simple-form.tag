<simple-form>
    <h2>Registration</h2>

    <form method="post" onsubmit="{ onSubmit }" novalidate>
        <div class="form-group { 'has-error': refs.username && refs.username.isInvalid() }">
            <label class="control-label">Username</label>
            <text-input ref="username" name="username" maxlength="30" format="{ RiotForms.format.trimmed }" />
            <span class="help-block" if="{ refs.username && refs.username.hasError('presence') }">
                Please choose a username!
            </span>
            <span class="help-block" if="{ refs.username && !refs.username.hasError('presence') && refs.username.hasError('length') }">
                Username must be at least 5 characters long!
            </span>
        </div>

        <div class="form-group { 'has-error': refs.password && refs.password.isInvalid() }">
            <label class="control-label">Password</label>
            <password-input ref="password" name="password" maxlength="60" />
            <span class="help-block" if="{ refs.password && refs.password.hasError('presence') }">
                Please choose a password!
            </span>
        </div>

        <div class="form-group { 'has-error': refs.passwordConfirm && refs.passwordConfirm.isInvalid() }">
            <label class="control-label">Confirm password</label>
            <password-input ref="passwordConfirm" name="passwordConfirm" maxlength="60" />
            <span class="help-block" if="{ refs.passwordConfirm && refs.passwordConfirm.hasError('presence') }">
                Please type in your password again!
            </span>
        </div>

        <accept-conditions />

        <div class="form-group form-group-action">
            <button type="submit" class="btn btn-lg btn-success">Register</button>
            <button type="reset" onclick="{ reset }" class="btn btn-lg btn-default">Reset</button>
        </div>
    </form>

    <script>
        this.mixin(RiotForms.FormMixin);

        this.schema = {
            username: {
                presence: true,
                length: {
                    minimum: 5
                }
            },
            password: {
                presence: true,
                length: {
                    minimum: 6
                }
            },
            passwordConfirm: {
                presence: true
            }                        
        };

        validateCustom(errors) {
            console.debug("SimpleForm.validateCustom(%o)", errors);
        }

        this.on('submit.valid', function (data) {
            console.log("Submitting valid form", data);
            alert("Submitting valid form. See console for data object. ");
        });

        this.on('submit.invalid', function (errors) {
            console.log("Can not submit invalid form", errors);
            alert("Can not submit invalid form. See console for errors object.");
        });

        this.on('reset', function () {
            this.reset();
        });
    </script>

</simple-form>