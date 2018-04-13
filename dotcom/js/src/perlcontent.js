

(function(window, document, $, undefined) {
    $(document).ready(function() {
function getAgentInfo() {
    var perldata = getCookie('perl-custumer-care');
    var perlCustumerData = JSON.parse(perldata);
    console.log("this is perl-customer-dare data+" + " " + perlCustumerData);

    var perlName = perlCustumerData.Name;
    var perlZip = perlCustumerData.Zip;
    var perlRegion = perlCustumerData.Region;
    var perlHeader = perlCustumerData.Header;

    var k = '<div class="contact">';
    k += '<div class="content">';
    k += '<h3>' + perlHeader + '</h3>';
    k += '<div class="card">';
    k += '<div class="row">';
    k += '<div class="col-sm-6">';
    k += '<div class="contact_image">';
    k += '<img src="../../dotcom/images/highmarkLogo.png">';
    k += '</div>';
    k += '</div>';
    k += '<div class="col-sm-6">';
    k += '<div class="info">';
    k += '<h3>' + perlName + '</h3>';
    k += '<h3>' + perlZip + '</h3>';
    k += '<h3>' + perlRegion + '</h3>';
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


});

 })(window, document, jQuery);
