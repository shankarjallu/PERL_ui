// (function(window, document, $, undefined) {
//     $(document).ready(function() {

//         function setCookie(cname, cvalue, exdays) {
//                 var d = new Date();
//                 d.setTime(d.getTime() + 3600 * 1000);
//                 var expires = 'expires=' + d.toUTCString();
//                 document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
//             }




//             function getCookie(name) {
//                var re = new RegExp(name + '=([^;]+)');
//                     var value = re.exec(document.cookie);
//                     return value !== null ? unescape(value[1]) : null;
//             }



//         var perldata =  getCookie('perl-custumer-care');
//     var perlCustumerData =    JSON.parse(perldata);
//        console.log("this is perl-customer-dare data+" + " " + perlCustumerData);

//        var perlName = perlCustumerData.Name;
//        var perlZip = perlCustumerData.Zip;
//        var perlRegion = perlCustumerData.Region;
//        var perlHeader = perlCustumerData.Header;

//        var k = '<div>';


//     k+= '<h3>' + perlName + '</h3>';
//     k+= '<h3>' + perlZip + '</h3>';
//     k+= '<h3>' + perlRegion + '</h3>';


// k += '</div>';

// //document.getElementById('perlcustomer').innerHTML = k;
// $('#perlcustomer').append(k);
//     });

// })(window, document, jQuery);


function getAgentInfo() {
    var perldata = getCookie('perl-custumer-care');
    var perlCustumerData = JSON.parse(perldata);
    console.log("this is perl-customer-dare data+" + " " + perlCustumerData);

    var perlName = perlCustumerData.Name;
    var perlZip = perlCustumerData.Zip;
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
    $("#agentInfo").show();
    $("#agentInfo").append(k);
}