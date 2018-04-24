$(document).ready(function(){
    validateForm();
});
function validateForm() {

    $("#frmSignUp").validate({

        rules: {

            txtFirstName: "required",
            retirementDate: "required",
            txtBirthDate: {
                dateFormat: true,
                lessThanToday: true
            },
            txtRetirementDate: {
                dateFormat: true,
                morethantoday: true
            },
            txtZipCode: {

                required: true,
                minlength: 5,
                maxlength: 5
            },
            exampleFormControlSelect1: "required"
        },
        messages: {
            txtFirstName: "Enter your firstname",
            retirementDate: "Please select one of the options",
            txtBirthDate: {
                dateFormat: "Please enter a complete birth month/year",
                required: "Please provide a month/year",
                lessThanToday: "Please provide a date that is in the past"
            },
            txtRetirementDate: {
                dateFormat: "Please enter a complete retirement month/year",
                required: "Please provide a month/year",
                morethantoday: "Please provide a date that will be in the future"
            },

            txtZipCode: {
                required: "Please provide a  ZIP code.",
                minlength: "Please enter at least five characters",
                maxlength: "Please do not enter more than five characters"
            },
            exampleFormControlSelect1: "Please select your retirement plans"
        },
    });


    jQuery.validator.addMethod("dateFormat",
        function(value, element) {
            return value.match(/^(0?[1-9]|1[012])[\/\-]\d{4}$/);
        },
        "");
    jQuery.validator.addMethod("lessThanToday",
        function(value, element) {
            var data = $('#txtBirthDate').val();
            var split_field = data.split('/');

            console.log("***********");
            console.log(split_field[0]);
            console.log(split_field[1]);
            var input_month = split_field[0];
            var input_year = split_field[1];
            var curent_year = new Date().getFullYear();
            var current_month = new Date().getMonth();
            return ((curent_year > input_year));
        },
        jQuery.validator.format("Value should be less than today"));

    jQuery.validator.addMethod("morethantoday",
        function(value, element) {
            var data = $('#txtRetirementDate').val();
            var split_field = data.split('/');
            var input_month = split_field[0];
            var input_year = split_field[1];
            var curent_year = new Date().getFullYear();
            var current_month = new Date().getMonth();

            return ((curent_year <= input_year));
        },
        jQuery.validator.format("Value should be more than today"));
}
//debugger;