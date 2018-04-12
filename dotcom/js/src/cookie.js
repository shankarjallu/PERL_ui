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
                var selectedValue=document.getElementById('exampleFormControlSelect1');
                if(selectedValue.value=="at65" || selectedValue.value=="after65")
                {
                    $("#divRetirementDate").fadeIn(1000);
                    $("[name|='retirementDate']").attr("required");
                }
                else
                {
                    $("#divRetirementDate").fadeOut(1000);
                    $("#divRetirementDate").removeAttr("required");
                }
            }
            function checkRetirementDateOption()
            {
                var selectedValue=$("[name|='retirementDate']:checked").val();
                if(selectedValue =="defdate")
                {
                    $("#divRetirementMonth").fadeIn(1000);
                    $("#divRetirementMonth").attr("required");
                }
                else
                {
                    $("#divRetirementMonth").fadeOut(1000);
                    $("#divRetirementMonth").removeAttr("required");                }
            } 