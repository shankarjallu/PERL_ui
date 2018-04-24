(function(window, document, $, undefined) {
    $(document).ready(function() {
        getFormFields();
        // tooltip
        $('[data-toggle="tooltip"]').tooltip();


        //Read More and Less

        AddReadMore();

        function AddReadMore() {
            //This limit you can set after how much characters you want to show Read More.
            var carLmt = 60;
            // Text to show when text is collapsed
            var readMoreTxt = " ... Read More";
            // Text to show when text is expanded
            var readLessTxt = " Read Less";
        
        
            //Traverse all selectors with this class and manupulate HTML part to show Read More
            $(".addReadMore").each(function() {
                if ($(this).find(".firstSec").length)
                    return;
        
                var allstr = $(this).text();
                if (allstr.length > carLmt) {
                    var firstSet = allstr.substring(0, carLmt);
                    var secdHalf = allstr.substring(carLmt, allstr.length);
                    var strtoadd = firstSet + "<span class='SecSec'>" + secdHalf + "</span><span class='readMore'  title='Click to Show More'>" + readMoreTxt + "</span><span class='readLess' title='Click to Show Less'>" + readLessTxt + "</span>";
                    $(this).html(strtoadd);
                }
        
            });
            //Read More and Read Less Click Event binding
            $(document).on("click", ".readMore,.readLess", function() {
                $(this).closest(".addReadMore").toggleClass("showlesscontent showmorecontent");
            });
        }


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
                    return true;
                }
                if (monthsTill65 > 11) {
                    console.log("13 months page!");
                    $("#tabTwo").parent("li").addClass("active");
                    $("#tabTwoContent").addClass("active in");
                    return true;
                }
                if (monthsTill65 > 8) {
                    console.log("9 months page!");
                    $("#tabThree").parent("li").addClass("active");
                    $("#tabThreeContent").addClass("active in");
                    return true;
                }
                if (monthsTill65 > 5) {
                    console.log("6 months page!");
                    $("#tabFour").parent("li").addClass("active");
                    $("#tabFourContent").addClass("active in");
                    return true;
                }
                if (monthsTill65 > 0) {
                    console.log("3 months page!");
                    $("#tabFive").parent("li").addClass("active");
                    $("#tabFiveContent").addClass("active in");
                    return true;
                }
                if (monthsTill65 <= 0) {
                    console.log("Congrats  page!");
                    $("#tabSix").parent("li").addClass("active");
                    $("#tabSixContent").addClass("active in");
                    return true;
                }

            } else {
                if (monthsTillRetirement <= 0 && monthsTillRetirement != false) {
                    console.log("Congrats  page!");
                    $("#tabSix").parent("li").addClass("active");
                    $("#tabSixContent").addClass("active in");
                    return true;
                }
                if (monthsTill65 > 15) {
                    console.log("13 months page!, more than 15 months!");
                    $("#tabOne").parent().addClass("active");
                    $("#tabOneContent").addClass("active in");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    retirementDateOption == 'nodefdate') {
                    console.log("no def date, 13 month page!");
                    $("#tabOne").parent("li").addClass("active");
                    $("#tabOneContent").addClass("active in");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'nodefplan') {
                    console.log("no plan, and <= 15 months, go to 13 months page!");
                    $("#tabOne").parent("li").addClass("active");
                    $("#tabOneContent").addClass("active in");
                    return true;
                }

                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    monthsTillRetirement > 13 ) {
                    console.log("13 months page!");
                    $("#tabOne").parent("li").addClass("active");
                    $("#tabOneContent").addClass("active in");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    monthsTillRetirement > 11 ) {
                    console.log("12 months page!");
                    $("#tabTwo").parent("li").addClass("active");
                    $("#tabTwoContent").addClass("active in");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    monthsTillRetirement > 8 ) {
                    console.log("9 months page!");
                    $("#tabThree").parent("li").addClass("active");
                    $("#tabThreeContent").addClass("active in");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    monthsTillRetirement > 5 ) {
                    console.log("6 months page!");
                    $("#tabFour").parent("li").addClass("active");
                    $("#tabFourContent").addClass("active in");
                    return true;
                }
                if (monthsTill65 <= 15 && retirementPlan == 'after65' &&
                    monthsTillRetirement > 0 ) {
                    console.log("3 months page!");
                    $("#tabFive").parent("li").addClass("active");
                    $("#tabFiveContent").addClass("active in");
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
                if (monthsTillRetirement == "late") {
                    alert("retirement date should be future date!");
                    return false;
                }
                // if (monthsTillRetirement < monthsTill65) {
                //     alert("your retirement date is " + (monthsTill65 - monthsTillRetirement) + " month(s) earlier than your actual retirement age!" );
                //     return false;
                // }
                cookieObj.name = name;
                cookieObj.dob = dob;
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
                z += '<h3 class = "main_header">' + nozipHeader.toUpperCase()  +'</h3>';
                //The image path has to change in AEM
                z += '<div class="no_zip_image contact_image">';
                z += '<img src="' + nozipImage + '">';
                z += '</div>';
                z += '<h4 class = "nozip_desc">' + nozipName + '</h4>';
                z += '<h3>' + nozipTele + '</h3>';
                z += '<h3 class = "nozip_userinfo">' + perlAdvisornotavail + '</h3>';
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
                    k += '<h3 class= "main_header">' + (result[0]).toUpperCase() + '</h3>';
                    k += '<p class = "small_header">' + result[1] + '</p>';
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
                k += '<label>' + "Name:" + "    " + '</label>';
                k += '<span class = "name">' + perlName + '</span>' + '<br />';
                k += '<label>' + "Phone:" + '</label>';
                k += '<span class="tele">' +"  "+ perlTelephone + '</span>';
                k += '<br>';

                if (perlEmail !== null && perlEmail !== "" && perlEmail !== "undefined" && perlEmail !== undefined) {
                    k += '<label>' + "Email:" + '</label>';
                    k += '<span class="email">' + perlEmail + '</span>';

                }

                if (perlStreet !== null && perlStreet !== "" && perlStreet !== undefined && perlStreet !== "undefined") {
                    k += '<label class = "noimg_label_location">' + "Location:" + '</label>';
                    k += '<span>' + perlStreet + '</span>';
                    k += '<br>';
                    k += '<p class ="noimg_address">' + perlStreetaddress + '</p>';


                }


                if (perladviserDes !== "" && perladviserDes !== null && perladviserDes !== "undefined" && perladviserDes !== undefined) {

                    k += '<p class="addReadMore showlesscontent">' + perladviserDes + '</p>';
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
            var active = true;
            //var ele = $("#timlineTabs li a")
            $("#timlineTabs li a").click(function(){
                var clickedEle = this;
                active = false;
                

            });
        }


    });
})(window, document, jQuery);