
(function(window, document, $, undefined) {
         $(document).ready(function() { 
            getFormFields();
       // tooltip
            $('[data-toggle="tooltip"]').tooltip(); 


function findMonthsTill65(currentYear, birthYear, birthMonth, currentMonth) {
    var timeTo65 = 65 - (currentYear - birthYear);
    var monthsTill65 = 0;
    console.log("time to 65: " + timeTo65);
    if ((currentYear - birthYear) <= 65) {
        if (timeTo65 >= 0) {
            monthsTill65 = (timeTo65 * 12) + (birthMonth - currentMonth);
            return monthsTill65;

        }

    } else {
        console.log("you are late!");
        return monthsTill65;
    }
}
function findMonthsTillRetirement(retirementYear, currentYear, retirementMonth, currentMonth) {
        if (retirementYear == "" || retirementYear == null) {
            return false;
        }
        var monthsTillRetirement = 0;
        var timeToRetirement = retirementYear - currentYear;
        if (retirementYear >= currentYear) {
            if (retirementYear == currentYear && retirementMonth >= currentMonth) {
                monthsTillRetirement = (timeToRetirement * 12) + (retirementMonth - currentMonth);
                return monthsTillRetirement;
            } else if (retirementYear == currentYear && retirementMonth < currentMonth) {
                console.log("error occured!");
                console.log("please make sure retirement date is a future date!");
                return "late";
            } else {
                monthsTillRetirement = (timeToRetirement * 12) + (retirementMonth - currentMonth);
                return monthsTillRetirement;
            }
        }
        if (timeToRetirement < 0) {
            return "late";
        }

}
function checkAndDisplayContent(monthsTill65, monthsTillRetirement, retirementPlan) {
        console.log("monthsTill65: " + monthsTill65);
        console.log("monthsTillRetirement: " + monthsTillRetirement);

        if(monthsTillRetirement > 12){
            console.log("13 months page!, more than 12 months!");
            $("#tabOne").parent().addClass("active");
            $("#tabOneContent").addClass("active in");
            return true;
        }
        if (monthsTill65 > 15) {
            console.log("13 months page!, more than 15 months!");
            $("#tabOne").parent().addClass("active");
            $("#tabOneContent").addClass("active in");
            return true;
        }
        if (monthsTill65 < 0 && (retirementPlan == 'at65' || retirementPlan == 'after65') &&
            monthsTillRetirement == 0 ) {
            console.log("Congrats page!");
            $("#tabSix").parent("li").addClass("active");
            $("#tabSixContent").addClass("active in");
            return true;
        }
        if (monthsTill65 <= 15 && retirementPlan == 'nodefplan') {
            console.log("no plan, and <= 15 months, go to 13 months page!");
            $("#tabOne").parent("li").addClass("active");
            $("#tabOneContent").addClass("active in");
            return true;
        }

        if (monthsTill65 <= 15 && (retirementPlan == 'at65' || retirementPlan == 'after65') &&
            monthsTillRetirement > 13 && monthsTillRetirement >= monthsTill65) {
            console.log("13 months page!");
            $("#tabOne").parent("li").addClass("active");
            $("#tabOneContent").addClass("active in");
            return true;
        }
        if (monthsTill65 <= 15 && (retirementPlan == 'at65' || retirementPlan == 'after65') &&
            monthsTillRetirement > 11 && monthsTillRetirement >= monthsTill65) {
            console.log("12 months page!");
            $("#tabTwo").parent("li").addClass("active");
            $("#tabTwoContent").addClass("active in");
            return true;
        }
        if (monthsTill65 <= 15 && (retirementPlan == 'at65' || retirementPlan == 'after65') &&
            monthsTillRetirement > 8 && monthsTillRetirement >= monthsTill65) {
            console.log("9 months page!");
            $("#tabThree").parent("li").addClass("active");
            $("#tabThreeContent").addClass("active in");
            return true;
        }
        if (monthsTill65 <= 15 && (retirementPlan == 'at65' || retirementPlan == 'after65') &&
            monthsTillRetirement > 5 && monthsTillRetirement >= monthsTill65) {
            console.log("6 months page!");
            $("#tabFour").parent("li").addClass("active");
            $("#tabFourContent").addClass("active in");
            return true;
        }
        if (monthsTill65 <= 15 && (retirementPlan == 'at65' || retirementPlan == 'after65') &&
            monthsTillRetirement > 0 && monthsTillRetirement >= monthsTill65) {
            console.log("3 months page!");
            $("#tabFive").parent("li").addClass("active");
            $("#tabFiveContent").addClass("active in");
            return true;
        }
        
        // 
    }

function getFormFields() {
    var retirementDateOption = "";
    var name = "";
    var dob = "";
    var retirementDate = "";
    var retirementPlan = "";
    var monthsTill65 = "";
    var monthsTillRetirement = "";
    var timeToRetirement = "";
    var zipCode = "";
    var isFormVisible = true;
    var cookieObj = {};

    var retrieveCookie = getCookie("timeline-details");
    if (retrieveCookie != null) {
        isFormVisible = JSON.parse(retrieveCookie).isFormVisible;
    }

    console.log("is form visible: " + isFormVisible);


    if (!isFormVisible) {
        var currentPath = window.location.pathname;
        //console.log("currentPath: " + currentPath);
         if(currentPath != '/tmp/pages/content.html'){
             console.log("currentPath: " + currentPath);
             window.location.href = 'content.html';
         }
        
    }
    $("form[name='frmSignUp']").submit(function(event) {
        event.preventDefault();
        var zipvalue = $('#txtZipCode').val();
        console.log(zipvalue);
        var getZip,noZipArr;
        var myArray = getZipCodeArray();
        function search(nameKey, myArray){
           for (var i=0; i < myArray.length; i++) {
               if (myArray[i].Zip === nameKey) {
                    console.log(myArray[i]);
                     getZip = myArray[i].Zip;
                    var testdata = JSON.stringify(myArray[i]);
                    console.log("this is testdata" + testdata);
                 //    document.getElementById("demo").innerHTML = testdata.Region;
                     setCookie("perl-custumer-care", testdata);
                     getFields();
                     
                //  return myArray[i];
       
               }

           }
           if(getZip == null || getZip == "" || getZip == undefined || getZip == "undefined"){
           var noZipData = noZip();
            console.log("this is no zipdata+", noZipData);
            var noperlzip = JSON.stringify(noZipData);
            setCookie("perl-custumer-care", noperlzip);
            getFields();
           
          }     
       }
       if(zipvalue !== "" || zipvalue !== null || zipvalue !== undefined){
        var resultObject = search(zipvalue, myArray);

       }


    });

function getFields(){
    name = $("#txtFirstName").val();
        dob = $("#txtBirthDate").val();
        zipCode = $("#txtZipCode").val();
        retirementPlan = $("#exampleFormControlSelect1").val();
        var dobArray = dob.split('-');
        var birthYear = dobArray[0];
        var birthMonth = dobArray[1];
        retirementDate = $("#txtRetirementDate").val();
        var retirementDateArray = retirementDate.split('-');
        var retirementYear = retirementDateArray[0];
        var retirementMonth = retirementDateArray[1];
        var today = new Date();
        var currentMonth = today.getMonth() + 1;
        var currentYear = today.getFullYear();

        monthsTill65 = findMonthsTill65(currentYear, birthYear, birthMonth, currentMonth);
        monthsTillRetirement = findMonthsTillRetirement(retirementYear, currentYear, retirementMonth, currentMonth);
        if(monthsTillRetirement == "late"){
            alert("retirement date should be future date!");
            return false;
        }
        cookieObj.name = name;
        cookieObj.dob = dob;
        cookieObj.retirementDate = retirementDate;
        cookieObj.retirementPlan = retirementPlan;
        cookieObj.isFormVisible = false;
        var cookieString = JSON.stringify(cookieObj);
        var isTimeline = createTimeline(name, dob, retirementDate, retirementPlan);
        if (isTimeline) {
            setCookie("timeline-details", cookieString);
            window.location.href = 'content.html';
        }

}
        

    if (!isFormVisible) {
        var parsedCookie = JSON.parse(retrieveCookie);
        console.log(parsedCookie);
        name = parsedCookie.name;
        dob = parsedCookie.dob;
        retirementDate = parsedCookie.retirementDate;
        retirementPlan = parsedCookie.retirementPlan;
        createTimeline(name, dob, retirementDate, retirementPlan);
        getAgentInfo();
    }
}

function createTimeline(name, dob, retirementDate, retirementPlan) {
    var monthObj = {
        "1": "January",
        "2": "February",
        "3": "March",
        "4": "April",
        "5": "May",
        "6": "June",
        "7": "July",
        "8": "August",
        "9": "September",
        "10": "October",
        "11": "November",
        "12": "December",
    };

    var dobArray = dob.split('-');
    var dobMonth = parseInt(dobArray[1]);
    var dobYear = parseInt(dobArray[0]);
    var retirementDateArray = retirementDate.split('-');
    var retirementYear = retirementDateArray[0];
    var retirementMonth = retirementDateArray[1];
    var today = new Date();
    var currentMonth = today.getMonth() + 1;
    var currentYear = today.getFullYear();
    var timeTo65 = 65 - (currentYear - dobYear);
    var monthsTill65 = (timeTo65 * 12) + (dobMonth - currentMonth);
    var monthsTillRetirement = findMonthsTillRetirement(retirementYear, currentYear, retirementMonth, currentMonth);
    var totalYear = 0;
    var remainderMonth = 0;
    var timeIntervalArray = [13, 12, 9, 6, 3, 0];

    function calculteBreakPoints(i) {
        //if(monthsTillRetirement > 12){
            totalYear = Math.floor(Math.abs((monthsTillRetirement - timeIntervalArray[i])) / 12);
            remainderMonth = (monthsTillRetirement - timeIntervalArray[i]) % 12;
            remainderMonth = currentMonth + remainderMonth;
            if (monthsTillRetirement <= 1) {
                totalYear = totalYear * -1;
            }
            return {
                "totalYear": totalYear,
                "remainderMonth": remainderMonth
            };
        // }else {
        //     totalYear = Math.floor(Math.abs((monthsTillRetirement - timeIntervalArray[i])) / 12);
        //     remainderMonth = (currentMonth - timeIntervalArray[i]);
        //     if(retirementMonth <= 0){
        //         totalYear = -1;
        //     }
        //     return {
        //         "totalYear": totalYear,
        //         "remainderMonth": remainderMonth
        //     };
        //  }

    }

    if (monthsTill65 <= 15 && (retirementYear == null || retirementYear == "")) {
        for (var k = 0; k < 6; k++) {
            $('#label'+k+'').text("Step " + (k + 1));
        }
        $("#welcome-name").append(name);
        $("#estRetDate").text(monthObj[dobMonth] + " " + (dobYear + 65));
        checkAndDisplayContent(monthsTill65, monthsTillRetirement, retirementPlan);
        return true;
    }

    if (monthsTill65 > 15) {
        for (var i = 0; i < 6; i++) {
            $('#label'+i+'').text("Step " + (i + 1));
        }

        $("#welcome-name").text(name);
        $("#estRetDate").text(monthObj[dobMonth] + " " + (dobYear + 65));

        checkAndDisplayContent(monthsTill65, monthsTillRetirement, retirementPlan);
        return true;
        
    }

    if (monthsTill65 <= 15 && retirementPlan == 'nodefplan') {
        for (var j = 0; j < 6; j++) {
            $('#label'+j+'').text("Step " + (j + 1));
        }
        $("#welcome-name").append(name);
        $("#estRetDate").text(monthObj[dobMonth] + " " + (dobYear + 65));

        checkAndDisplayContent(monthsTill65, monthsTillRetirement, retirementPlan);
        return true;
    }

    if (monthsTill65 <= 15 && (retirementYear != null && retirementYear != "")) {
        $("#welcome-name").append(name);
        $("#estRetDate").text(monthObj[parseInt(retirementMonth)] + " " + retirementYear);
        timelineGenerator();
        checkAndDisplayContent(monthsTill65, monthsTillRetirement, retirementPlan);
        return true;
    }

    


    function timelineGenerator() {
        for (var i = 0; i < 6; i++) {

            if (i < 5) {
                var timeInterval = 0;
                var breakPoints = calculteBreakPoints(i);
                totalYear = breakPoints.totalYear;
                remainderMonth = breakPoints.remainderMonth;

                console.log("total yr: " + totalYear + "; remainderMonth: " + remainderMonth);

                if (remainderMonth > 12) {
                    remainderMonth = remainderMonth - 12;
                    console.log("Month " + (i + 1) + ": " + monthObj[remainderMonth]);
                    console.log("Year " + (i + 1) + ": " + (currentYear + totalYear + 1));
                    $('#label'+i+'').text(monthObj[remainderMonth] + " " + (currentYear + totalYear + 1));
                } else if (remainderMonth <= 0) {
                    remainderMonth = remainderMonth + 12;
                    console.log("Month " + (i + 1) + ": " + monthObj[remainderMonth]);
                    console.log("Year " + (i + 1) + ": " + (currentYear + totalYear - 1));
                    $('#label'+i+'').text(monthObj[remainderMonth] + " " + (currentYear + totalYear - 1));
                } else {
                    console.log("Month " + (i + 1) + ": " + monthObj[remainderMonth]);
                    console.log("Year " + (i + 1) + ": " + (currentYear + totalYear));
                    $('#label'+i+'').text(monthObj[remainderMonth] + " " + (currentYear + totalYear));
                }

            } else {
                $('#label'+i+'').text("Congrats!");
                
            }


        }

    }

    return false;
}



function getAgentInfo() {
    var perldata = getCookie('perl-custumer-care');
    var perlCustumerData = JSON.parse(perldata);
    console.log("this is perl-customer-dare data+" + " " + perlCustumerData);
    
    var perlZip = perlCustumerData.Zip;
    if(perlZip == null || perlZip == "" || perlZip == undefined){

        console.log("this came into no zip");
        var noziplHeader = perlCustumerData.Header;
        var noziplImage = perlCustumerData.Image;
        var noziplTele = perlCustumerData.Telephone;
        var noziplName = perlCustumerData.Name;
        var noziplDescription = perlCustumerData.Description;
        
     var z = '<div class="contact">';
     z += '<div class="content">';
     z += '<h3>' + noziplHeader + '</h3>';
     //The image path has to change in AEM
     z += '<img src="../../dotcom/images/SalesRep.jpg">';
     z += '<h3>' + noziplName  + '</h3>';
     z += '<h3>' + noziplTele  + '</h3>';
     z += '<h3>' + noziplDescription  + '</h3>';
     z += '</div>';
     z += '</div>';


     $("#agentInfo1").append(z);
     $("#agentInfo2").append(z);
     $("#agentInfo3").append(z);
     $("#agentInfo4").append(z);
     $("#agentInfo5").append(z);
        

        

    }else{

        var perlName = perlCustumerData.Name;
   
    var perlTelephone = perlCustumerData.Telephone;
    var perlRegion = perlCustumerData.Region;
    var perlHeader = perlCustumerData.Header;
    var result = perlHeader.split(".");
    
    
    var k = '<div class="contact">';
    k += '<div class="content">';
    if(result){
        k += '<h2>' + result[0] + '</h2>';
        k += '<p>' + result[1] + '</p>';
        }
        else{
            k += '<h3>' + result + '</h3>';
        }
    
    k += '<div class="card">';
    k += '<div class="row">';
    k += '<div class="col-sm-4">';
    k += '<div class="contact_image">';
    k += '<img src="../../dotcom/images/highmarkLogo.png">';
    k += '</div>';
    k += '</div>';
    k += '<div class="col-sm-6">';
    k += '<div class="info">';
    k += '<h3>' + perlName + '</h3>';
    k += '<label>' + "phone:" + '</label>';
    k += '<span>' + perlTelephone + '</span>';
    k += '<br>';
    k += '<label>' + "email:" + '</label>';
    
    //    k += '<label>phone:</label>' +  '<span>' + + '</span><br>';
    k += '</div>';
    k += '</div>';
    k += '</div>';
    k += '</div>';
    k += '</div>';
    k += '</div>';
   // $("#agentInfo").show();
    $("#agentInfo1").append(k);
    $("#agentInfo2").append(k);
    $("#agentInfo3").append(k);
    $("#agentInfo4").append(k);
    $("#agentInfo5").append(k);

    }
    
}



     });
 })(window, document, jQuery);