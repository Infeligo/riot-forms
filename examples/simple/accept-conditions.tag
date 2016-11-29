<accept-conditions>
    <div class="checkbox">
        <label>
            <check-box type="boolean" name="accept" schema="{ presence: true }" />
            Accept terms and conditions
        </label>
        <span class="help-block" if="{ tags.accept.hasError('presence') }">
            You must accept terms and conditions to proceed!
        </span>
    </div>
</accept-conditions>