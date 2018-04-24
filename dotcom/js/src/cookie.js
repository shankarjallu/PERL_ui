function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + 3600 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
}




function getCookie(name) {
   var re = new RegExp(name + '=([^;]+)');
        var value = re.exec(document.cookie);
        return value !== null ? unescape(value[1]) : null;
}

function deleteCookie(cname){
	document.cookie = cname + '=;' + 'expires= 01 Jan 1970; path=/;';
}




function checkSelectedOption()
            {
                var selectedValue = $('#exampleFormControlSelect1 :selected').val();
                if(selectedValue == "after65")
                {
                    $("#divRetirementDate").fadeIn(500);
                    $("[name|='retirementDate']").attr("required");
                }
                else
                {
                    $("#divRetirementDate").fadeOut(500);
                    $("[name|='retirementDate']").removeAttr("required");
                }
            }
            function checkRetirementDateOption()
            {
                var selectedValue = $("[name|='retirementDate']:checked").val();
                if(selectedValue == "defdate")
                {
                    $("#divRetirementMonth").fadeIn(500);
                    $("#txtRetirementDate").attr("required");
                }
                else
                {
                    $("#divRetirementMonth").fadeOut(500);
                    $("#txtRetirementDate").removeAttr("required");                }
            } 