// function createTimeline(name, dob, retirementDate, retirementPlan) {
//     //var name = name;
//     //var dob = dob;
//     //var retirementDate = retirementDate;
//     //var retirementPlan = retirementPlan;
//     var monthObj = {
//         "1": "January",
//         "2": "February",
//         "3": "March",
//         "4": "April",
//         "5": "May",
//         "6": "June",
//         "7": "July",
//         "8": "August",
//         "9": "September",
//         "10": "October",
//         "11": "November",
//         "12": "December",
//     };

//     var dobArray = dob.split('-');
//     var dobMonth = parseInt(dobArray[1]);
//     var dobYear = parseInt(dobArray[0]);
//     var retirementDateArray = retirementDate.split('-');
//     var retirementYear = retirementDateArray[0];
//     var retirementMonth = retirementDateArray[1];
//     var today = new Date();
//     var currentMonth = today.getMonth() + 1;
//     var currentYear = today.getFullYear();
//     var timeTo65 = 65 - (currentYear - dobYear);
//     var monthsTill65 = (timeTo65 * 12) + (dobMonth - currentMonth);
//     var monthsTillRetirement = findMonthsTillRetirement(retirementYear, currentYear, retirementMonth, currentMonth);
//     var totalYear = 0;
//     var remainderMonth = 0;
//     var timeIntervalArray = [13, 12, 9, 6, 3, 0];

//     function calculteBreakPoints(i, type) {
//         if (type === "no-specific") {

//             totalYear = Math.floor(Math.abs((monthsTill65 - timeIntervalArray[i])) / 12);
//             remainderMonth = (monthsTill65 - timeIntervalArray[i]) % 12;
//             remainderMonth = currentMonth + remainderMonth;
//             if (monthsTill65 <= 0) {
//                 totalYear = totalYear * -1;
//             }
//             return {
//                 "totalYear": totalYear,
//                 "remainderMonth": remainderMonth
//             };
//         } else {
//             totalYear = Math.floor(Math.abs((monthsTillRetirement - timeIntervalArray[i])) / 12);
//             remainderMonth = (monthsTillRetirement - timeIntervalArray[i]) % 12;
//             remainderMonth = currentMonth + remainderMonth;
//             if (monthsTillRetirement <= 0) {
//                 totalYear = totalYear * -1;
//             }
//             return {
//                 "totalYear": totalYear,
//                 "remainderMonth": remainderMonth
//             };
//         }
//     }

//     if (monthsTill65 > 15) {
//         for (var i = 0; i < 6; i++) {
//             $('#label'+i+'').text("Step " + (i + 1));
//         }

//         $("#timeline-container").show();
//         $("form[name='frmSignUp']").parent().hide();
//         $("form[name='frmSignUp']").slideUp("slow");
//         $("#welcome-name").append(name);

//         //var monthsTillRetirement = findMonthsTillRetirement(retirementYear, currentYear, retirementMonth, currentMonth);
//         checkAndDisplayContent(monthsTill65, monthsTillRetirement, retirementPlan);
//         return true;
//     }

//     if (monthsTill65 <= 15 && retirementPlan == 'nodefplan') {
//         for (var j = 0; j < 6; j++) {
//             $('#label'+j+'').text("Step " + (j + 1));
//         }
//         $("#timeline-container").show();
//         $("form[name='frmSignUp']").parent().hide();
//         $("form[name='frmSignUp']").slideUp("slow");
//         $("#welcome-name").append(name);

//        // var monthsTillRetirement = findMonthsTillRetirement(retirementYear, currentYear, retirementMonth, currentMonth);
//         checkAndDisplayContent(monthsTill65, monthsTillRetirement, retirementPlan);
//         return true;
//     }

//     if (retirementDate != "" || retirementDate != null) {
//         console.log("retirementDate is not null or empty!");
//         timelineGenerator("specific");
//         return true;
//     } else {
//         timelineGenerator("no-specific");
//     }


//     function timelineGenerator(type) {
//         for (var i = 0; i < 6; i++) {

//             if (i < 5) {
//                 var timeInterval = 0;
//                 var breakPoints = calculteBreakPoints(i, type);
//                 totalYear = breakPoints.totalYear;
//                 remainderMonth = breakPoints.remainderMonth;

//                 console.log("total yr: " + totalYear + "; remainderMonth: " + remainderMonth);

//                 if (remainderMonth > 12) {
//                     remainderMonth = remainderMonth - 12;
//                     console.log("Month " + (i + 1) + ": " + monthObj[remainderMonth]);
//                     console.log("Year " + (i + 1) + ": " + (currentYear + totalYear + 1));
//                     $('#label'+i+'').text(monthObj[remainderMonth] + " " + (currentYear + totalYear + 1));
//                 } else if (remainderMonth <= 0) {
//                     remainderMonth = remainderMonth + 12;
//                     console.log("Month " + (i + 1) + ": " + monthObj[remainderMonth]);
//                     console.log("Year " + (i + 1) + ": " + (currentYear + totalYear - 1));
//                     $('#label'+i+'').text(monthObj[remainderMonth] + " " + (currentYear + totalYear - 1));
//                 } else {
//                     console.log("Month " + (i + 1) + ": " + monthObj[remainderMonth]);
//                     console.log("Year " + (i + 1) + ": " + (currentYear + totalYear));
//                     $('#label'+i+'').text(monthObj[remainderMonth] + " " + (currentYear + totalYear));
//                 }

//             } else {
//                 $('#label'+i+'').text("Congrats!");
                
//             }



//         }

//         $("#timeline-container").show();
//          $("form[name='frmSignUp']").slideUp("slow");
//         $("form[name='frmSignUp']").parent().hide();
//         $("#welcome-name").append(name);

//         var monthsTillRetirement = findMonthsTillRetirement(retirementYear, currentYear, retirementMonth, currentMonth);
//         checkAndDisplayContent(monthsTill65, monthsTillRetirement, retirementPlan);

//     }

//     return false;
// }