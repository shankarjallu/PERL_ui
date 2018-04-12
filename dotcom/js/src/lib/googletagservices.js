window.Krux||((Krux=function(){Krux.q.push(arguments);}).q=[]);
	(function(){
	  function retrieve(n){
	    var m, k='kxbazaarvoice_'+n;
	    if (window.localStorage) {
	        return window.localStorage[k] || "";
	    } else if (navigator.cookieEnabled) {
	        m = document.cookie.match(k+'=([^;]*)');
	        return (m && unescape(m[1])) || "";
	    } else {
	        return '';
	    }
	  }
	  Krux.user = retrieve('user');
	  Krux.segments = retrieve('segs') && retrieve('segs').split(',') || [];
	})();
	
	var gptadslots=[];
	var googletag = googletag || {};
	googletag.cmd = googletag.cmd || [];
	(function(){ var gads = document.createElement('script');
		gads.async = true; gads.type = 'text/javascript';
		var useSSL = 'https:' == document.location.protocol;
		gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
		var node = document.getElementsByTagName('script')[0];
		node.parentNode.insertBefore(gads, node);
	})();