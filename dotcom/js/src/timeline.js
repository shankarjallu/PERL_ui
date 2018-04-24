(function(window, document, $, undefined) {
    $(document).ready(function() {
        getFormFields();
        populateForm();
        updateForm();
        checkSelectedOption();
        $('[data-toggle="tooltip"]').tooltip();

        // $().vEllipsis({
        //   'expandLink': true,
        //   'collapseLink': true,
        //   'lines': 2

        // //   'animationTime': '2000',
        // });

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

        function checkAndDisplayContent(monthsTill65, monthsTillRetirement, retirementPlan, retirementDateOption) {
            console.log("monthsTill65: " + monthsTill65);
            console.log("monthsTillRetirement: " + monthsTillRetirement);

            if (retirementPlan == 'at65') {
                if (monthsTill65 > 13) {
                    console.log("13 months page!, more than 15 months!");
                    $("#tabOne").parent().addClass("active");
                    $("#tabOneContent").addClass("active in");
                    $("#tabOne").children("span:first-child").addClass("checkedFlag");
                    return true;
                }
                if (monthsTill65 > 11) {
                    console.log("12 months page!");
                    $("#tabTwo").parent("li").addClass("active");
                    $("#tabTwoContent").addClass("active in");
                    $("#tabTwo").children("span:first-child").addClass("checkedFlag");
                    $("span.round-tabs").addClass("visited");
                    $("span.round-tabs.two").removeClass("visited");
                    $("span.round-tabs.three").removeClass("visited");
                    $("span.round-tabs.four").removeClass("visited");
                    $("span.round-tabs.five").removeClass("visited");
                    $("span.round-tabs.six").removeClass("visited");
                    return true;
                }
                if (monthsTill65 > 8) {
                    console.log("9 months page!");
                    $("#tabThree").parent("li").addClass("active");
                    $("#tabThreeContent").addClass("active in");
                    $("#tabThree").children("span:first-child").addClass("checkedFlag");
                    $("span.round-tabs").addClass("visited");
                    $("span.round-tabs.three").removeClass("visited");
                    $("span.round-tabs.four").removeClass("visited");
                    $("span.round-tabs.five").removeClass("visited");
                    $("span.round-tabs.six").removeClass("visited");
                    return true;
                }
                if (monthsTill65 > 5) {
                    console.log("6 months page!");
                    $("#tabFour").parent("li").addClass("active");
                    $("#tabFourContent").addClass("active in");
                    $("#tabFour").children("span:first-child").addClass("checkedFlag");
                    $("span.round-tabs").addClass("visited");
                    $("span.round-tabs.four").removeClass("visited");
                    $("span.round-tabs.five").removeClass("visited");
                    $("span.round-tabs.six").removeClass("visited");
                    return true;
                }
                if (monthsTill65 > 0) {
                    console.log("3 months page!");
                    $("#tabFive").parent("li").addClass("active");
                    $("#tabFiveContent").addClass("active in");
                    $("#tabFive").children("span:first-child").addClass("checkedFlag");
                    $("span.round-tabs").addClass("visited");
                    $("span.round-tabs.five").removeClass("visited");
                    $("span.round-tabs.six").removeClass("visited");
                    return true;
                }
                if (monthsTill65 <= 0) {
                    console.log("Congrats  page!");
                    $("#tabSix").parent("li").addClass("active");
                    $("#tabSixContent").addClass("active in");
                    $("#tabSix").children("span:first-child").addClass("checkedFlag");
                    $("span.round-tabs").addClass("visited");
                    $("span.round-tabs.six").removeClass("visited");
                    return true;
                }

            } else {
                if (monthsTillRetirement <= 0 && monthsTillRetirement != false) {
                    console.log("Congrats  page!");
                    $("#tabSix").parent("li").addClass("active");
                    $("#tabSixContent").addClass("active in");
                    $("#tabSix").children("span:first-child").addClass("checkedFlag");
                    $("span.round-tabs").addClass("visited");
                    $("span.round-tabs.six").removeClass("visited");
                    return true;
                }
                if (monthsTill65 > 15) {
                    console.log("13 months page!, more than 15 months!");
                    $("#tabOne").parent().addClass("active");
                    $("#tabOneContent").addClass("active in");
                    $("#tabOne").children("span:first-child").addClass("checkedFlag");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    retirementDateOption == 'nodefdate') {
                    console.log("no def date, 13 month page!");
                    $("#tabOne").parent("li").addClass("active");
                    $("#tabOneContent").addClass("active in");
                    $("#tabOne").children("span:first-child").addClass("checkedFlag");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'nodefplan') {
                    console.log("no plan, and <= 15 months, go to 13 months page!");
                    $("#tabOne").parent("li").addClass("active");
                    $("#tabOneContent").addClass("active in");
                    $("#tabOne").children("span:first-child").addClass("checkedFlag");
                    return true;
                }

                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    monthsTillRetirement > 13 ) {
                    console.log("13 months page!");
                    $("#tabOne").parent("li").addClass("active");
                    $("#tabOneContent").addClass("active in");
                    $("#tabOne").children("span:first-child").addClass("checkedFlag");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    monthsTillRetirement > 11 ) {
                    console.log("12 months page!");
                    $("#tabTwo").parent("li").addClass("active");
                    $("#tabTwoContent").addClass("active in");
                    $("#tabTwo").children("span:first-child").addClass("checkedFlag");
                    $("span.round-tabs").addClass("visited");
                    $("span.round-tabs.two").removeClass("visited");
                    $("span.round-tabs.three").removeClass("visited");
                    $("span.round-tabs.four").removeClass("visited");
                    $("span.round-tabs.five").removeClass("visited");
                    $("span.round-tabs.six").removeClass("visited");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    monthsTillRetirement > 8 ) {
                    console.log("9 months page!");
                    $("#tabThree").parent("li").addClass("active");
                    $("#tabThreeContent").addClass("active in");
                    $("#tabThree").children("span:first-child").addClass("checkedFlag");
                    $("span.round-tabs").addClass("visited");
                    $("span.round-tabs.three").removeClass("visited");
                    $("span.round-tabs.four").removeClass("visited");
                    $("span.round-tabs.five").removeClass("visited");
                    $("span.round-tabs.six").removeClass("visited");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    monthsTillRetirement > 5 ) {
                    console.log("6 months page!");
                    $("#tabFour").parent("li").addClass("active");
                    $("#tabFourContent").addClass("active in");
                    $("#tabFour").children("span:first-child").addClass("checkedFlag");
                    $("span.round-tabs").addClass("visited");
                    $("span.round-tabs.four").removeClass("visited");
                    $("span.round-tabs.five").removeClass("visited");
                    $("span.round-tabs.six").removeClass("visited");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    monthsTillRetirement > 0 ) {
                    console.log("3 months page!");
                    $("#tabFive").parent("li").addClass("active");
                    $("#tabFiveContent").addClass("active in");
                    $("#tabFive").children("span:first-child").addClass("checkedFlag");
                    $("span.round-tabs").addClass("visited");
                    $("span.round-tabs.five").removeClass("visited");
                    $("span.round-tabs.six").removeClass("visited");
                    return true;
                }
            }

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
                if (currentPath != '/tmp/pages/content.html') {
                    console.log("currentPath: " + currentPath);
                    window.location.href = 'content.html';
                }

            }
            $("form[name='frmSignUp']").submit(function(event) {
                event.preventDefault();
                var form = $("#frmSignUp");
                if(!form.valid()){
                    return false;
                }


                var zipvalue = $('#txtZipCode').val();
                console.log(zipvalue);
                var getZip, noZipArr;
                var myArray = getZipCodeArray();

                function search(nameKey, myArray) {
                    for (var i = 0; i < myArray.length; i++) {
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
                    if (getZip == null || getZip == "" || getZip == undefined || getZip == "undefined") {
                        var noZipData = noZip();
                        console.log("this is no zipdata+", noZipData);
                        var noperlzip = JSON.stringify(noZipData);
                        setCookie("perl-custumer-care", noperlzip);
                        getFields();

                    }
                }
                if (zipvalue !== "" || zipvalue !== null || zipvalue !== undefined) {
                    var resultObject = search(zipvalue, myArray);

                }
                return false;

            });

            function getFields() {
                name = $("#txtFirstName").val();
                dob = $("#txtBirthDate").val();
                zipCode = $("#txtZipCode").val();
                retirementPlan = $("#exampleFormControlSelect1").val();
                retirementDateOption = $("input[name='retirementDate']:checked").val();
                var dobArray = dob.split('/');
                var birthYear = dobArray[1];
                var birthMonth = dobArray[0];
                retirementDate = $("#txtRetirementDate").val();
                var retirementDateArray = retirementDate.split('/');
                var retirementYear = retirementDateArray[1];
                var retirementMonth = retirementDateArray[0];
                var today = new Date();
                var currentMonth = today.getMonth() + 1;
                var currentYear = today.getFullYear();

                monthsTill65 = findMonthsTill65(currentYear, birthYear, birthMonth, currentMonth);
                monthsTillRetirement = findMonthsTillRetirement(retirementYear, currentYear, retirementMonth, currentMonth);
                // if (monthsTillRetirement == "late") {
                //     alert("retirement date should be future date!");
                //     return false;
                // }
                // if (monthsTillRetirement < monthsTill65) {
                //     alert("your retirement date is " + (monthsTill65 - monthsTillRetirement) + " month(s) earlier than your actual retirement age!" );
                //     return false;
                // }
                cookieObj.name = name;
                cookieObj.dob = dob;
                cookieObj.zip = zipCode;
                cookieObj.retirementDate = retirementDate;
                cookieObj.retirementDateOption = retirementDateOption;
                cookieObj.retirementPlan = retirementPlan;
                cookieObj.isFormVisible = false;
                var cookieString = JSON.stringify(cookieObj);
                var isTimeline = createTimeline(name, dob, retirementDate, retirementPlan, retirementDateOption);
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
                retirementDateOption = parsedCookie.retirementDateOption;
                createTimeline(name, dob, retirementDate, retirementPlan, retirementDateOption);
                getAgentInfo();
            }
        }

        function createTimeline(name, dob, retirementDate, retirementPlan, retirementDateOption) {
            var monthObj = {
                "1": "Jan",
                "2": "Feb",
                "3": "Mar",
                "4": "Apr",
                "5": "May",
                "6": "Jun",
                "7": "Jul",
                "8": "Aug",
                "9": "Sep",
                "10": "Oct",
                "11": "Nov",
                "12": "Dec",
            };

            var dobArray = dob.split('/');
            var dobMonth = parseInt(dobArray[0]);
            var dobYear = parseInt(dobArray[1]);
            var retirementDateArray = retirementDate.split('/');
            var retirementYear = retirementDateArray[1];
            var retirementMonth = retirementDateArray[0];
            var today = new Date();
            var currentMonth = today.getMonth() + 1;
            var currentYear = today.getFullYear();
            var timeTo65 = 65 - (currentYear - dobYear);
            var monthsTill65 = (timeTo65 * 12) + (dobMonth - currentMonth);
            var monthsTillRetirement = findMonthsTillRetirement(retirementYear, currentYear, retirementMonth, currentMonth);
            var totalYear = 0;
            var remainderMonth = 0;
            var timeIntervalArray = [13, 12, 9, 6, 3, 0];

            function calculteBreakPoints(i, planType) {
                if (planType == 'after65') {
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
                } else {
                    console.log("plan type is at65");
                    totalYear = Math.floor(Math.abs((monthsTill65 - timeIntervalArray[i])) / 12);
                    remainderMonth = (monthsTill65 - timeIntervalArray[i]) % 12;
                    remainderMonth = currentMonth + remainderMonth;
                    if (monthsTill65 <= 1) {
                        totalYear = totalYear * -1;
                    }
                    return {
                        "totalYear": totalYear,
                        "remainderMonth": remainderMonth
                    };
                }

            }

            if ((monthsTill65 <= 15 && retirementDateOption == 'nodefdate') ||
                (monthsTill65 <= 15 && retirementPlan == 'nodefplan') ||
                (monthsTill65 > 15)) {
                for (var k = 0; k < 6; k++) {
                    $('#label' + k + '').text("Step " + (k + 1));
                }
                $("#welcome-name").append(name);
                if (retirementDateOption != undefined && retirementDateOption == 'defdate' && retirementPlan != 'at65') {
                    $("#estRetDate").text(monthObj[parseInt(retirementMonth)] + " " + retirementYear);
                } else {
                    $("#estRetDate").text(monthObj[parseInt(dobMonth)] + " " + (dobYear + 65));
                }
                checkAndDisplayContent(monthsTill65, monthsTillRetirement, retirementPlan, retirementDateOption);
                addVisitedMark();
                return true;
            }


            if ((monthsTill65 <= 15 && (retirementYear != null && retirementYear != "")) ||
                retirementPlan == 'at65') {
                $("#welcome-name").append(name);
                if (retirementDateOption != undefined && retirementDateOption == 'defdate' && retirementPlan != 'at65') {
                    $("#estRetDate").text(monthObj[parseInt(retirementMonth)] + " " + retirementYear);
                } else {
                    $("#estRetDate").text(monthObj[parseInt(dobMonth)] + " " + (dobYear + 65));
                }
                timelineGenerator(retirementPlan);
                checkAndDisplayContent(monthsTill65, monthsTillRetirement, retirementPlan, retirementDateOption);
                return true;
            }

            function timelineGenerator(type) {
                for (var i = 0; i < 6; i++) {

                    if (i < 5) {
                        var timeInterval = 0;
                        var breakPoints = calculteBreakPoints(i, type);
                        totalYear = breakPoints.totalYear;
                        remainderMonth = breakPoints.remainderMonth;

                        console.log("total yr: " + totalYear + "; remainderMonth: " + remainderMonth);

                        if (remainderMonth > 12) {
                            remainderMonth = remainderMonth - 12;
                            console.log("Month " + (i + 1) + ": " + monthObj[remainderMonth]);
                            console.log("Year " + (i + 1) + ": " + (currentYear + totalYear + 1));
                            $('#label' + i + '').text(monthObj[remainderMonth] + " " + (currentYear + totalYear + 1));
                        } else if (remainderMonth <= 0) {
                            remainderMonth = remainderMonth + 12;
                            console.log("Month " + (i + 1) + ": " + monthObj[remainderMonth]);
                            console.log("Year " + (i + 1) + ": " + (currentYear + totalYear - 1));
                            $('#label' + i + '').text(monthObj[remainderMonth] + " " + (currentYear + totalYear - 1));
                        } else {
                            console.log("Month " + (i + 1) + ": " + monthObj[remainderMonth]);
                            console.log("Year " + (i + 1) + ": " + (currentYear + totalYear));
                            $('#label' + i + '').text(monthObj[remainderMonth] + " " + (currentYear + totalYear));
                        }

                    } else {
                        $('#label' + i + '').text("Congrats!");

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
            var perlAdvisornotavail = perlCustumerData.Advisornotavail;
            var perladviserDes = perlCustumerData.advisordescritption;
            var perlTelephone = perlCustumerData.Telephone;
            var perlRegion = perlCustumerData.Region;
            var perlHeader = perlCustumerData.Header;
            var perlImage = perlCustumerData.Image;
            var perlEmail = perlCustumerData.email;
            var perlStreet = perlCustumerData.Street;
            var perlStreetaddress = perlCustumerData.Streetaddress;

            var nozipHeader = perlCustumerData.Header;
            var nozipImage = perlCustumerData.Image;
            var nozipTele = perlCustumerData.Telephone;
            var nozipName = perlCustumerData.Name;
            var nozipDescription = perlCustumerData.Description;



            var perlName = perlCustumerData.Name;
            if ((perlZip == null || perlZip == "" || perlZip == undefined) || (perlAdvisornotavail !== null && perlAdvisornotavail !== "undefined" && perlAdvisornotavail !== undefined)) {

                console.log("this came into no zip");


                var z = '<div class="contact">';
                z += '<div class="content">';
                z += '<h3>' + nozipHeader + '</h3>';
                //The image path has to change in AEM
                z += '<div class="contact_image">';
                z += '<img src="' + nozipImage + '">';
                z += '</div>';
                z += '<h3>' + nozipName + '</h3>';
                z += '<h3>' + nozipTele + '</h3>';
                z += '<h3>' + perlAdvisornotavail + '</h3>';
                z += '</div>';
                z += '</div>';


                $("#agentInfo1").append(z);
                $("#agentInfo2").append(z);
                $("#agentInfo3").append(z);
                $("#agentInfo4").append(z);
                $("#agentInfo5").append(z);




            } else {

                var result = perlHeader.split(".");
                var k = '<div class="contact">';
                k += '<div class="content">';
                if (result) {
                    k += '<h2>' + result[0] + '</h2>';
                    k += '<p>' + result[1] + '</p>';
                } else {
                    k += '<h3>' + result + '</h3>';
                }

                k += '<div class="card">';
                k += '<div class="row">';
                k += '<div class="col-sm-4">';
                k += '<div class="contact_image">';
                k += '<img src="' + perlImage + '">';
                k += '</div>';
                k += '</div>';
                k += '<div class="col-sm-6">';
                k += '<div class="info">';
                k += '<h3>' + perlName + '</h3>';
                k += '<label>' + "phone:" + '</label>';
                k += '<span>' + perlTelephone + '</span>';
                k += '<br>';

                if (perlEmail !== null && perlEmail !== "" && perlEmail !== "undefined" && perlEmail !== undefined) {
                    k += '<label>' + "email:" + '</label>';
                    k += '<span>' + perlEmail + '</span>';

                }

                if (perlStreet !== null && perlStreet !== "" && perlStreet !== undefined && perlStreet !== "undefined") {
                    k += '<label>' + "Location:" + '</label>';
                    k += '<span>' + perlStreet + '</span>';
                    k += '<br>';
                    k += '<p>' + perlStreetaddress + '</p>';


                }


                if (perladviserDes !== "" && perladviserDes !== null && perladviserDes !== "undefined" && perladviserDes !== undefined) {

                    k += '<p class="v-ellipsis" data-expandlink="Read More" data-collapselink="Read Less">' + perladviserDes + '</p>';
                }
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

        function addVisitedMark(){
            var activeEle = $("#timelineTabs li.active");
            var prevEle = $(activeEle).children("a:first-child");
            $("#timelineTabs li a").click(function(){
                var clickedEle = this;
                if($(clickedEle).children("span:first-child").hasClass("visited") &&
                    !($(prevEle).children("span:first-child").hasClass("visited"))){
                    $(prevEle).children("span:first-child").addClass("visited");
                    return true;
                }
                if($(clickedEle).children("span:first-child").hasClass("visited")){
                    console.log("visited!");
                    prevEle = clickedEle;
                   return true; 
                }else {
                    if($(prevEle).children("span:first-child").hasClass("checkedFlag")){
                        $(clickedEle).children("span:first-child").addClass("checkedFlag");
                        $(prevEle).children("span:first-child").addClass("visited");
                        prevEle = clickedEle;
                        return true;
                        
                    }else {
                       $(clickedEle).children("span:first-child").addClass("checkedFlag");
                        console.log("not visited!");
                        prevEle = clickedEle;
                        return true; 
                    }
                }  

            return true;

            });
        }

        function updateForm(){
            $("#changeInfo").click(function(){
                var cookie = getCookie("timeline-details");
                setCookie("form-cookie", cookie);
                deleteCookie("timeline-details");

                window.location.href = 'home.html';  

            });
        }

        function populateForm(){
                var formCookie = getCookie("form-cookie");
                if(formCookie == null || formCookie == "" || formCookie == undefined){
                    return false;
                }
                var parsedCookie = JSON.parse(formCookie);
                var name = parsedCookie.name;
                var dob = parsedCookie.dob;
                var zip = parsedCookie.zip;
                var retirementDateOption = parsedCookie.retirementDateOption;
                var retirementDate = parsedCookie.retirementDate;
                var retirementPlan = parsedCookie.retirementPlan; 

                $("#txtFirstName").attr("value", name);
                $("#txtBirthDate").attr("value", dob);
                $("#txtZipCode").attr("value", zip);
                $("#exampleFormControlSelect1 option[value= "+retirementPlan+"]").attr("selected", "selected");
                if(retirementDateOption){
                    $("input[name='retirementDate']:checked").attr("value", retirementDateOption);

                }
                $("#txtRetirementDate").attr("value", retirementDate);
        }


    });
})(window, document, jQuery);