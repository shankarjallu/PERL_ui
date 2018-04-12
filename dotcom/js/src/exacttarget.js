(function(window, document, $, undefined) {
    $(document).ready(function() {

        var emailVal,teleVal,nameVal,validemail,validtele,validname;

        var IsEmail = function(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        };

        var IsPhone = function(phone) {
            var d = /[\(\)\[\]\,\.\-+\ ]/g;
            var e = phone.replace(d, '');
            if (e.length !== 10) return false;
            var regex = /^[2-9]{1}[0-9]{2}[2-9]{1}[0-9]{6}/;
            return e.match(regex);
        };




        $('input[type="submit"]').click(function(event) {

            event.preventDefault();

            $('.red').css('display', 'none');

               
             emailVal = $('input[name="email"]').val();   
             teleVal = $('input[name="tele"]').val();
             nameVal = $('input[name="name"]').val();

            if (IsEmail(emailVal)) {

                validemail = true;
                
                
                

            } else {
               // console.log("has no email value");
                      validemail = false;
                $('input[name="email"]').after("<p class='red'>PLEASE ENTER THE CORRECT EMAIL ID</p>");

            }


            if (IsPhone(teleVal)) {
                   validtele = true;
            //    console.log("correct phone val");

            } else {
                validtele = false;
            //    console.log("no phone value or wrong format");

                $('input[name="tele"]').after("<p class='red'>PLEASE ENTER THE CORRECT PHONE NUMBER</p>");

            }


            if (nameVal == "" || nameVal == null || nameVal == undefined) {

                 validname = false;
                $('input[name="name"]').after("<p class='red'>PLEASE ENTER THE NAME</p>");

            }else{
                  validname = true;
            }
          
    // make ajax only on correct email,phone and name
            if(validtele == true && validemail == true && validname == true){

            


            //     // This is will be the actual post call Ajax

            //              var optUrl = "https://auth.exacttargetapis.com/v1/requestToken";

            //               $.ajax({
            //                 type: 'POST',
            //                  contentType: 'application/json',

            //                 url: optUrl,
            //              crossDomain: true,
            //                 dataType: 'json',
            //              data: JSON.stringify([
            //         {clientId: "mgnrzotnb2xkpvtolga8qohp"}, 
            //         {clientSecret:  "xDVvLm0DPzml83SGNK5NLgsi"}
            //             ]),


            //                 success: function(data) {
            //                    console.log(data);
            //                    callExactTarget(data);
            //                 },
            //                 error: function(XMLHttpRequest, textStatus, errorThrown) {
            //                    console.log(textStatus,errorThrown);
            //                 }
            //             });

            // //Actual Ajax ends here


            // Mock Ajax starts here
            var optUrl = '../../dotcom/js/src/testdata/exacttarget.json';
            $.ajax({
                type: 'GET',

                contentType: 'application/json',

                url: optUrl,
                crossDomain: true,
                dataType: 'json',



                success: function(data) {
                    console.log(data);
                    callExactTarget(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);



                }
            });
            // Ajax ends here

        } // if valid email condition check closes here


             
        }); // submit click ends


        function callExactTarget(result) {

            console.log(result.accessToken);
 var token = result.accessToken;
       
            var etUrl = "https://www.exacttargetapis.com/hub/v1/dataevents/key:AEMEXKEY/rowset";
var headerParams = {'Authorization':'bearer' + " " + token};

var etbodydata = 
		[
			{
				"keys": {
					"Email": "" 
				},
				"values": {"PhoneNumber": "","Name":""}
			}
		];
		
		
        etbodydata[0].keys.Email = emailVal;
        etbodydata[0].values.PhoneNumber = teleVal;
        etbodydata[0].values.Name = nameVal;


            console.log(etbodydata);
            
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                headers: headerParams,
                url: etUrl,
                crossDomain: true,
                dataType: 'json',
                data: etbodydata,


                success: function(data) {
                    console.log(data);
                    
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });


        }



    });

})(window, document, jQuery);

