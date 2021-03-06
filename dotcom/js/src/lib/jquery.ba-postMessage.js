/*! 
 * postMessage - v0.5 - 9/11/2009
 * http://benalman.com/
 * 
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Licensed under the MIT license
 * http://benalman.com/about/license/
 */
var ieredUrl = "";
var isHeaderClicked = false;
(function($) {
    var interval_id, last_hash, cache_bust = 1,
        rm_callback, window = this,
        FALSE = !1,
        postMessage = "postMessage",
        addEventListener = "addEventListener",
      //  p_receiveMessage, has_postMessage = window[postMessage] && !$.browser.opera;
        p_receiveMessage, has_postMessage = window[postMessage];
    $[postMessage] = function(message, target_url, target, newURL) {
        if (!target_url) {
            return;
        }
        message = typeof message === "string" ? message : $.param(message);
        target = target || parent;
        if (has_postMessage) {
            if (IEVersion().BrowserMode == "CompatMode" || IEVersion().BrowserMode == "IE7") {
                if (ieredUrl != "") {
                    target.location = ieredUrl;
                } else {
                    target.location = target_url.replace(/#.*$/, "");
                }
            } else {
                target[postMessage](message, target_url.replace(/([^:]+:\/\/[^\/]+).*/, "$1"));
            }
        } else {
            if (target_url) {
                if (typeof newURL != "undefined") {
                    target.location = newURL;
                } else {
                    if (ieredUrl != "") {
                        target.location = ieredUrl;
                    } else {
                        target.location = target_url.replace(/#.*$/, "");
                    }
                }
            }
        }
    };

    function IEVersion() {
        var _n = navigator,
            _w = window,
            _d = document;
        var version = "NA";
        var na = _n.userAgent;
        var ieDocMode = "NA";
        var ie8BrowserMode = "NA";
        if (/msie/i.test(na) && (!_w.opera)) {
            if (_w.attachEvent && _w.ActiveXObject) {
                version = (na.match(/.+ie\s([\d.]+)/i) || [])[1];
                if (parseInt(version) == 7) {
                    if (_d.documentMode) {
                        version = 8;
                        if (/trident\/\d/i.test(na)) {
                            ie8BrowserMode = "CompatMode";
                        } else {
                            ie8BrowserMode = "IE7";
                        }
                    }
                } else {
                    if (parseInt(version) == 8) {
                        if (_d.documentMode) {
                            ie8BrowserMode = "IE8";
                        }
                    }
                }
                ieDocMode = (_d.documentMode) ? _d.documentMode : (_d.compatMode && _d.compatMode == "CSS1Compat") ? 7 : 5;
            }
        }
        return {
            "UserAgent": na,
            "Version": version,
            "BrowserMode": ie8BrowserMode,
            "DocMode": ieDocMode
        };
    }
    $.receiveMessage = p_receiveMessage = function(callback, source_origin, delay) {
        if (has_postMessage) {
            if (callback) {
                rm_callback && p_receiveMessage();
                rm_callback = function(e) {
                    if ((typeof source_origin === "string" && e.origin !== source_origin) || ($.isFunction(source_origin) && source_origin(e.origin) === FALSE)) {
                        return FALSE;
                    }
                    callback(e);
                };
            }
            if (window[addEventListener]) {
                window[callback ? addEventListener : "removeEventListener"]("message", rm_callback, FALSE);
            } else {
                window[callback ? "attachEvent" : "detachEvent"]("onmessage", rm_callback);
            }
        } else {
            interval_id && clearInterval(interval_id);
            interval_id = null;
            if (callback) {
                delay = typeof source_origin === "number" ? source_origin : typeof delay === "number" ? delay : 100;
                interval_id = setInterval(function() {
                    var hash = document.location.hash,
                        re = /^#?\d+&/;
                    if (hash !== last_hash && re.test(hash)) {
                        last_hash = hash;
                        callback({
                            data: hash.replace(re, "")
                        });
                    }
                }, delay);
            }
        }
    };
})($);

function redirectOnSessionTimeOut(url) {
    var reqUrl = url;
    if (reqUrl == null || reqUrl.indexOf("knowledgeAssistantContainer") != -1 || reqUrl.indexOf("createRegistry.jsp") != -1 || reqUrl.indexOf("manageRegistrySignin.jsp") != -1) {
        return false;
    }
    if (reqUrl == null || (reqUrl.indexOf("signinModal.jsp") == -1 && reqUrl.indexOf("signIn.jsp") == -1 && reqUrl.indexOf("storeLocator.jsp") == -1 && reqUrl.indexOf("giftCard.jsp") == -1 && reqUrl.indexOf("shareProductEmail.jsp") == -1 && reqUrl.indexOf("monogrammingModal.jsp") == -1 && reqUrl.indexOf("storeLocatorModal.jsp") == -1)) {
        if (getCookie("DPLastAccessedTime") != null && getCookie("DPSessionTimeOutInterval") != null) {
            var lastResponseCommitedTime = parseInt(getCookie("DPLastAccessedTime"));
            var sessionOutTime = parseInt(getCookie("DPSessionTimeOutInterval"));
            var currentTime = (new Date()).getTime();
            if ((currentTime - lastResponseCommitedTime) > sessionOutTime) {
                if (null != reqUrl && (reqUrl.indexOf("editShoppingBagOverlay.jsp") != -1 || reqUrl.indexOf("viewShoppingBag.jsp") != -1)) {
                    window.location = "/dotcom/jsp/cart/viewShoppingBag.jsp?sessionExpired=true&cookieExpired=true";
                    return true;
                } else {
                    window.location = "/dotcom/jsp/error/error_session.jsp?sessionExpired=true&cookieExpired=true";
                    return true;
                }
            }
        }
    }
}

function fnInitiateModal(url, parentUrl, isCouponModal, contextRoot) {
    isHeaderClicked = true;
    redirectOnSessionTimeOut(url);
    $('<div id="cboxOverlayIframe"></div>').appendTo("body").css("opacity", "0.6");
    if (parentUrl && parentUrl != "") {
        var closeUrl = "/jsp/cart/viewShoppingBag.jsp";
        if (parentUrl.indexOf("checkout") >= 0) {
            closeUrl = "/jsp/checkout/secure/checkout.jsp";
        }
        parentUrl = encodeURIComponent(parentUrl);
        var parentURLParam = parentUrl;
        if (url.indexOf("?") == -1) {
            parentURLParam = "?parentUrl=" + parentUrl;
        } else {
            parentURLParam = "&parentUrl=" + parentUrl;
        }
        url = url + parentURLParam;
    }
    if (isCouponModal) {
        modalIframe = $('<div id="iframeContainer" class="coupon_iframe_cntr"><div class="find_coupon_modal_title"><span>coupons &amp; extra savings</span></div><div style="cursor: pointer;"><a id="find_coupon_modal_closebtn" class="modalCloseImg find_coupon_modal-close" href="' + contextRoot + closeUrl + '" title="close"></a></div><iframe src="' + url + '" name="modalIframe" id="modalIframe" scrolling="yes" overflow="scroll" allowTransparency="true" frameBorder="0"></iframe></div>').appendTo("body");
    } else {
        modalIframe = $('<div id="iframeContainer"><iframe src="' + url + '" name="modalIframe" id="modalIframe" scrolling="no" overflow="hidden" allowTransparency="true" frameBorder="0"></iframe></div>').appendTo("body");
    }(function($) {
        var if_height, newurl, iframe = modalIframe;
        var winW = Math.abs($(window).width() - $("#iframeContainer").width()) / 2 + $(window).scrollLeft();
        $("#iframeContainer").css("top", "120px");
        $("#iframeContainer").css("left", winW);
        $("#modalIframe").css("top", 0);
        $("body,html").scrollTop(0);
        setInterval(function getHeight() {
            $.receiveMessage(function(e) {
            	if(e.data&&(e.data.indexOf("fsr.")>-1||e.data.indexOf("foresee/")>-1))
					return;
				var h = Number(e.data.replace(/.*if_height=(\d+)(?:&|$)/, "$1"));
                var redUrl = e.data.replace(newurl);
                if (h <= 0 && isNaN(redUrl)) {
                    $("#iframeContainer").remove();
                    $("#cboxOverlayIframe").remove();
                    $("input, a").removeAttr("disabled");
                    location.reload();
                } else {
                    if (isNaN(h) && redUrl != undefined) {
                        if ((redUrl.indexOf(".jump") > 0 || redUrl.indexOf(".jsp") > 0 || redUrl.indexOf(".htm") > 0)) {
                            $("#iframeContainer").remove();
                            $("#cboxOverlayIframe").remove();
                            window.location = redUrl;
                        }
                    }
                }
            });
        }, 500);
    })($);
}

function setIsHeaderFlag() {
    isHeaderClicked = true;
}