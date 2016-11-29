<industry-areas>
    <div class="row">
        <div class="col-md-4" each={ column in columns }>                
            <div class="checkbox" each="{ column }">
                <label>
                    <check-box name="industry" value="{ value }"/> { text }
                </label>
            </div>                
        </div>
    </div>
    <script>
        const industryAreas = [
            { value: "education",    text: "Education" },
            { value: "it",           text: "IT" },
            { value: "finance",      text: "Finance" },
            { value: "engineering",  text: "Engineering" },
            { value: "health",       text: "Health" },
            { value: "marketing",    text: "Marketing" },
            { value: "maritime",     text: "Maritime" },
            { value: "art",          text: "Art & Design" },
            { value: "automotive",   text: "Automotive" },
            { value: "sport",        text: "Sport" },
            { value: "media",        text: "Media" },
            { value: "tourism",      text: "Tourism" },
            { value: "other",        text: "Other" },
        ];

        var third = industryAreas.length / 3 + 1;
        this.columns = [
            industryAreas.slice(0, third),
            industryAreas.slice(third, third * 2),
            industryAreas.slice(third * 2)
        ];
    </script>
</industry-areas>