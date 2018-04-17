/*! highmark - v1.0.0 - 2018-04-17 *//*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-history-placeholder-setclasses !*/
!function(e,n,o){function t(e,n){return typeof e===n}function a(){var e,n,o,a,s,i,f;for(var c in l)if(l.hasOwnProperty(c)){if(e=[],n=l[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(o=0;o<n.options.aliases.length;o++)e.push(n.options.aliases[o].toLowerCase());for(a=t(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],f=i.split("."),1===f.length?Modernizr[f[0]]=a:(!Modernizr[f[0]]||Modernizr[f[0]]instanceof Boolean||(Modernizr[f[0]]=new Boolean(Modernizr[f[0]])),Modernizr[f[0]][f[1]]=a),r.push((a?"":"no-")+f.join("-"))}}function s(e){var n=c.className,o=Modernizr._config.classPrefix||"";if(d&&(n=n.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+o+"no-js(\\s|$)");n=n.replace(t,"$1"+o+"js$2")}Modernizr._config.enableClasses&&(n+=" "+o+e.join(" "+o),d?c.className.baseVal=n:c.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):d?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}var r=[],l=[],f={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var o=this;setTimeout(function(){n(o[e])},0)},addTest:function(e,n,o){l.push({name:e,fn:n,options:o})},addAsyncTest:function(e){l.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=f,Modernizr=new Modernizr;var c=n.documentElement,d="svg"===c.nodeName.toLowerCase();Modernizr.addTest("placeholder","placeholder"in i("input")&&"placeholder"in i("textarea")),Modernizr.addTest("history",function(){var n=navigator.userAgent;return-1===n.indexOf("Android 2.")&&-1===n.indexOf("Android 4.0")||-1===n.indexOf("Mobile Safari")||-1!==n.indexOf("Chrome")||-1!==n.indexOf("Windows Phone")?e.history&&"pushState"in e.history:!1}),a(),s(r),delete f.addTest,delete f.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();e.Modernizr=Modernizr}(window,document);
(function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.hoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.hoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);
;(function ($, w) {
	"use strict";

	var methods = (function () {
		// private properties and methods go here
		var c = {
				bcClass: 'sf-breadcrumb',
				menuClass: 'sf-js-enabled',
				anchorClass: 'sf-with-ul',
				menuArrowClass: 'sf-arrows'
			},
			ios = (function () {
				var ios = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
				if (ios) {
					// tap anywhere on iOS to unfocus a submenu
					$('html').css('cursor', 'pointer').on('click', $.noop);
				}
				return ios;
			})(),
			wp7 = (function () {
				var style = document.documentElement.style;
				return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
			})(),
			unprefixedPointerEvents = (function () {
				return (!!w.PointerEvent);
			})(),
			toggleMenuClasses = function ($menu, o) {
				var classes = c.menuClass;
				if (o.cssArrows) {
					classes += ' ' + c.menuArrowClass;
				}
				$menu.toggleClass(classes);
			},
			setPathToCurrent = function ($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
						.filter(function () {
							return ($(this).children(o.popUpSelector).hide().show().length);
						}).removeClass(o.pathClass);
			},
			toggleAnchorClass = function ($li) {
				$li.children('a').toggleClass(c.anchorClass);
			},
			toggleTouchAction = function ($menu) {
				var msTouchAction = $menu.css('ms-touch-action');
				var touchAction = $menu.css('touch-action');
				touchAction = touchAction || msTouchAction;
				touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
				$menu.css({
					'ms-touch-action': touchAction,
					'touch-action': touchAction
				});
			},
			applyHandlers = function ($menu, o) {
				var targets = 'li:has(' + o.popUpSelector + ')';
				if ($.fn.hoverIntent && !o.disableHI) {
					$menu.hoverIntent(over, out, targets);
				}
				else {
					$menu
						.on('mouseenter.superfish', targets, over)
						.on('mouseleave.superfish', targets, out);
				}
				var touchevent = 'MSPointerDown.superfish';
				if (unprefixedPointerEvents) {
					touchevent = 'pointerdown.superfish';
				}
				if (!ios) {
					touchevent += ' touchend.superfish';
				}
				if (wp7) {
					touchevent += ' mousedown.superfish';
				}
				$menu
					.on('focusin.superfish', 'li', over)
					.on('focusout.superfish', 'li', out)
					.on(touchevent, 'a', o, touchHandler);
			},
			touchHandler = function (e) {
				var $this = $(this),
					o = getOptions($this),
					$ul = $this.siblings(e.data.popUpSelector);

				if (o.onHandleTouch.call($ul) === false) {
					return this;
				}

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.one('click.superfish', false);
					if (e.type === 'MSPointerDown' || e.type === 'pointerdown') {
						$this.trigger('focus');
					} else {
						$.proxy(over, $this.parent('li'))();
					}
				}
			},
			over = function () {
				var $this = $(this),
					o = getOptions($this);
				clearTimeout(o.sfTimer);
				$this.siblings().superfish('hide').end().superfish('show');
			},
			out = function () {
				var $this = $(this),
					o = getOptions($this);
				if (ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function (o) {
				o.retainPath = ($.inArray(this[0], o.$path) > -1);
				this.superfish('hide');

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function ($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function ($el) {
				return getMenu($el).data('sf-options');
			};

		return {
			// public methods
			hide: function (instant) {
				if (this.length) {
					var $this = this,
						o = getOptions($this);
					if (!o) {
						return this;
					}
					var not = (o.retainPath === true) ? o.$path : '',
						$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
						speed = o.speedOut;

					if (instant) {
						$ul.show();
						speed = 0;
					}
					o.retainPath = false;

					if (o.onBeforeHide.call($ul) === false) {
						return this;
					}

					$ul.stop(true, true).animate(o.animationOut, speed, function () {
						var $this = $(this);
						o.onHide.call($this);
					});
				}
				return this;
			},
			show: function () {
				var o = getOptions(this);
				if (!o) {
					return this;
				}
				var $this = this.addClass(o.hoverClass),
					$ul = $this.children(o.popUpSelector);

				if (o.onBeforeShow.call($ul) === false) {
					return this;
				}

				$ul.stop(true, true).animate(o.animation, o.speed, function () {
					o.onShow.call($ul);
				});
				return this;
			},
			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						o = $this.data('sf-options'),
						$hasPopUp;
					if (!o) {
						return false;
					}
					$hasPopUp = $this.find(o.popUpSelector).parent('li');
					clearTimeout(o.sfTimer);
					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					// remove event handlers
					$this.off('.superfish').off('.hoverIntent');
					// clear animation's inline display style
					$hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
						return style.replace(/display[^;]+;?/g, '');
					});
					// reset 'current' path classes
					o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
					$this.find('.' + o.hoverClass).removeClass(o.hoverClass);
					o.onDestroy.call($this);
					$this.removeData('sf-options');
				});
			},
			init: function (op) {
				return this.each(function () {
					var $this = $(this);
					if ($this.data('sf-options')) {
						return false;
					}
					var o = $.extend({}, $.fn.superfish.defaults, op),
						$hasPopUp = $this.find(o.popUpSelector).parent('li');
					o.$path = setPathToCurrent($this, o);

					$this.data('sf-options', o);

					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					applyHandlers($this, o);

					$hasPopUp.not('.' + c.bcClass).superfish('hide', true);

					o.onInit.call(this);
				});
			}
		};
	})();

	$.fn.superfish = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' +  method + ' does not exist on jQuery.fn.superfish');
		}
	};

	$.fn.superfish.defaults = {
		popUpSelector: 'ul,.sf-mega', // within menu context
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {opacity: 'show'},
		animationOut: {opacity: 'hide'},
		speed: 'normal',
		speedOut: 'fast',
		cssArrows: true,
		disableHI: false,
		onInit: $.noop,
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop,
		onDestroy: $.noop,
		onHandleTouch: $.noop
	};

})(jQuery, window);

;(function(factory) { // eslint-disable-line no-extra-semi
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function(){
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight.version = 'master';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function(){
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert styles
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function(){
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function(throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // update heights on load and resize events
    $(window).bind('load', function(event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window).bind('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });

});
(function(s){var m="",n="",t=false;function p(){var a=[cm_JSFCoreCookieName,"cmRS","cmTPSet","CoreAt","CMAVID","CoreM_State","CoreM_Ses"],c=cm_ClientID.split(";"),b;for(b=0;b<c.length;b++){a.push(cmJSFCreateCombinedSessionCookieName(c[b]));}for(b=0;b<a.length;b++){CC(a[b],cm_JSFPCookieDomain);CC(a[b]);
}}function q(b,a){var c=cI(b);return c&&c.toUpperCase()==a;}function o(d){var b=0,a=0,c=d.length;for(;b<c;b++){a=~~(31*a+d.charCodeAt(b));}return Math.abs(a);}function u(a,b){return a?a:b?b:"";}function r(){var e,c,g,b=screen,h=navigator,a=h.mimeTypes,f=h.plugins,d=""+b.width+b.height+b.availWidth+b.availHeight+b.colorDepth+b.pixelDepth+u(h.language,u(h.browserLanguage));
if(a){for(g=0,c=a.length;g<c;g++){d+=u(a[g].type);}}if(f){for(g=0,c=f.length;g<c;g++){e=f[g];d+=u(e.name)+u(e.version)+u(e.description)+u(e.filename);}}return d;}function l(){return n=="D";}s.cmSetCookieSetting=function(a){n=a;if(l()){p();}};s.cmCookiesDisabled=l;s.cmSessionCookiesOnly=function(){return n=="S";
};s.cmSetOptOut=function(a){m=a;};s.cmOptedOut=function(){return((m=="Y")||cI("CMDisabled")||q("CMOptout","OPT_OUT")||q("CMOptOut","OPT_OUT")||q("ID","OPT_OUT"));};s.cmAnonymous=function(){return((m=="A")||q("CMOptout","ANONYMOUS")||q("CMOptOut","ANONYMOUS"));};s.cmAutoAddTP=function(){return Math.random()<u(s.cm_TPThreshold,0.2);
};s.cmSetIT=function(a){t=a;};s.cmIT=function(){if(t){return"it"+o(r());}else{return null;}};}(window));var cmUtils=(function(){return{console:{log:function(b){if(typeof console!=="undefined"){console.log(b);}},error:function(b){if(typeof console!=="undefined"){console.error(b);}}},string:{trim:function(b){if(typeof b==="string"){if(String.prototype.trim){return b.trim();
}else{return b.replace(/^\s+|\s+$/g,"");}}return b;}}};}());if(typeof CM_DDX==="undefined"){CM_DDX={domReadyFired:false,headScripts:true,dispatcherLoadRequested:false,firstPassFunctionBinding:false,BAD_PAGE_ID_ELAPSED_TIMEOUT:5000,version:-1,standalone:false,test:{syndicate:true,testCounter:"",doTest:false,newWin:false,process:function(){var g=CM_DDX.gup("tms.test");
CM_DDX.test.newWin=CM_DDX.gup("tms.mWin")==="y";CM_DDX.test.doTest=CM_DDX.gup("tms.doTest")==="y";if(CM_DDX.test.doTest){var h=CM_DDX.gup("tms.syndicate");if(h===null){h="n";}if(g===null){g="";}h=h.toLowerCase();h=(h==="n"||h==="no"||h==="false")?"N":"Y";CM_DDX.test.testCounter=(g==="")?g:((g*1)+"");
CM_DDX.test.syndicate=(h==="Y");CB("ddx.test.info",g+"-"+h+"-"+CM_DDX.test.doTest+"-"+CM_DDX.test.newWin);}else{var e=cI("ddx.test.info");if(e){var f=e.split("-");CM_DDX.test.testCounter=f[0];CM_DDX.test.syndicate=(f[1]==="Y");CM_DDX.test.doTest=(f[2]==="true");CM_DDX.test.newWin=(f.length===4&&f[3]==="true");
}}}},partner:{},invokeFunctionWhenAvailable:function(b){if(CM_DDX.firstPassFunctionBinding===false){setTimeout(function(){CM_DDX.invokeFunctionWhenAvailable(b);},5);}else{if(CM_DDX.version!==0&&typeof(__$dispatcher)==="undefined"){setTimeout(function(){CM_DDX.invokeFunctionWhenAvailable(b);},CM_DDX.BAD_PAGE_ID_ELAPSED_TIMEOUT);
return;}if(CM_DDX.version!==0){b();}}},gup:function(g){g=g.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var h="[\\?&]"+g+"=([^&#]*)";var e=new RegExp(h);var f=e.exec(window.location.href);return(f===null)?null:decodeURIComponent(f[1].replace(/\+/g," "));},privacy:{isDoNotTrackEnabled:function(c){var d=CM_DDX.privacy.getDoNotTrack(c);
if(d==false){d=(cI("CM_DDX","pdnt0","false")=="true")?true:false;}return d;},setDoNotTrack:function(c,d){CM_DDX.setSubCookie("CM_DDX","pdnt"+c,d,365);},getDoNotTrack:function(b){return(cI("CM_DDX","pdnt"+b,"false")=="true")?true:false;}},setSubCookie:function(f,g,h,k,i){cmSetSubCookie(f,g,h,new Date(new Date().getTime()+(k*86400000)).toGMTString(),i);
}};if(!cm_ClientID){var cm_ClientID="99999999";}if(!cm_HOST){var cm_HOST="testdata.coremetrics.com/cm?";}if(!cmMarketing){var cmMarketing={};}cmMarketing.COOKIE_NAME="CoreMc";cmMarketing.INSTANCE=null;if(!cm_McClientID){var cm_McClientID=cm_ClientID;}if(!cm_MC_LIB_HOST){var cm_MC_LIB_HOST="libs.coremetrics.com";
}if(!cm_MC_RULES_HOST){var cm_MC_RULES_HOST="mktgcdn.coremetrics.com";}if(!cm_MC_USER_DETAILS_HOST){var cm_MC_USER_DETAILS_HOST="mcdata.coremetrics.com";}if(!cm_MC_APP_SERVER_HOST){var cm_MC_APP_SERVER_HOST="mc.coremetrics.com";}if(!cm_ClientTS){var cm_ClientTS=new Date().getTime();}if(!cm_TrackLink){var cm_TrackLink="A";
}if(!cm_NewLinkTracker){var cm_NewLinkTracker=false;}if(!cm_LinkClickDelay){var cm_LinkClickDelay=false;}if(!cm_LinkClickDelayInterval){var cm_LinkClickDelayInterval=500;}if(!cm_DelayHandlerReg){var cm_DelayHandlerReg="";}if(!cm_SkipHandlerReg){var cm_SkipHandlerReg="";}if(!cm_TrackImpressions){var cm_TrackImpressions="";
}if(!cm_SecureTags||cm_SecureTags==null){var cm_SecureTags="|2|3|";}if(!cm_DownloadExtensions){var cm_DownloadExtensions=null;}if(!cm_UseUTF8){var cm_UseUTF8=true;}if(!cm_FormPageID){var cm_FormPageID=false;}if(cm_UseCookie==null){var cm_UseCookie=false;}if(!cm_TimeoutSecs){var cm_TimeoutSecs=15;}if(!cm_UseDOMScriptLoad){var cm_UseDOMScriptLoad=true;
}if(!cm_OffsiteImpressionsEnabled){var cm_OffsiteImpressionsEnabled=false;}if(!cm_AvidHost){var cm_AvidHost="data.cmcore.com/cookie-id.js?fn=cmSetAvid";}var cm_AvidLoadTimedOut=false;if(!cm_JSFEnabled){var cm_JSFEnabled=false;}if(!cm_JSFPCookieDomain){var cm_JSFPCookieDomain=null;}if(!cm_JSFTrackClients){var cm_JSFTrackClients=true;
}if(!cm_JSFPCookieMigrate){var cm_JSFPCookieMigrate=false;}if(!cm_JSFPForceMigrateCookies){var cm_JSFPForceMigrateCookies=false;}if(!cm_JSFPCookieMigrateVisitorID){var cm_JSFPCookieMigrateVisitorID="cm_mc_uid";}if(!cm_JSFPCookieMigrateSessionID){var cm_JSFPCookieMigrateSessionID="cm_mc_sid";}if(!cm_JSFPMigrationDomainWhitelist){var cm_JSFPMigrationDomainWhitelist=null;
}if(!cm_JSFPMigrationDomainBlacklist){var cm_JSFPMigrationDomainBlacklist=null;}if(!cm_JSFPMigrationPathWhitelist){var cm_JSFPMigrationPathWhitelist=null;}if(!cm_JSFPMigrationOtherCookies){var cm_JSFPMigrationOtherCookies=null;}if(!cm_JSFPMigrationOtherCookiesExpireTimes){var cm_JSFPMigrationOtherCookiesExpireTimes={};
}if(!cm_JSFSessionType){var cm_JSFSessionType="I";}if(!cm_JSFSessionTimeout){var cm_JSFSessionTimeout=1800;}if(!cm_JSFCoreCookieName){var cm_JSFCoreCookieName="CoreID6";}if(!cm_JSFCoreCookieExpireSeconds){var cm_JSFCoreCookieExpireSeconds=473040000;}if(!cm_JSFEAMasterIDSessionCookie){var cm_JSFEAMasterIDSessionCookie=false;
}if(!cmUA){var cmUA={MSIE:2083};}if(!cmDefaultLimit){var cmDefaultLimit=8197;}if(cGQ==null){var cGQ=true;}if(!cGO){var cGO=1024;}if(!cGR){var cGR=600000;}if(!encodeURIComponent){var encodeURIComponent=null;}var _$cV1=null;var cG8;var cG9;var cG6=document;var cGT;var cG7=new _cmt();cG6.cmTagCtl=cG7;var CI=cmStartTagSet;
var CJ=cmSendTagSet;var cmIndex=0;var cG0=["vn1","vn2","st","pi","rs","ec","rf","ul"];var cGA=null;var cmValidFlag_SessionContinue=1;var cmValidFlag_NewSession=2;var cmValidFlag_NewVisitor=4;var cmValidFlag_SessionReset=32;var cmCore_JSFParamEnabled="cjen";var cmCore_JSFParamUserID="cjuid";var cmCore_JSFParamSessionID="cjsid";
var cmCore_JSFParamValidFlag="cjvf";if(!cG4){var cG4=5000;}if(!cG5){var cG5=200;}var cG2={};var cG3={};var cGM=navigator.appVersion;var cGN=navigator.userAgent;var cGS=cGN.indexOf("Opera")>=0;var cGU=cGN.indexOf("Safari")>=0;var cmT3=-1;var cGC="";var cGD="";var cGE="";var cGF="";var cGG="";var cGH="";
var cmSubmitFlag=false;var cmFormC1="submitbuttonreset";var cmFormC2="textpasswordtextarea";var cmFormC3="select-oneselect-multiple";var cGI="";var cGJ="";var cGK="";var chost=null;var cci=null;var _cm_CMRules={};var _cm_isNew=true,_cm_NRSet=false;if(!cm_PartnerDataClientIDs){var cm_PartnerDataClientIDs="";
}var cm_Avid;var cm_AvidLoadTimer;var cm_IOEnabled=false;var cm_ATEnabled=false;var cm_MCEnabled=false;(function(){CI();if(cm_UseCookie){var t=cI("cmRS","pi","");chost=cm_HOST;cm_HOST=cI("cmRS","ho",chost);cci=cm_ClientID;cm_ClientID=cI("cmRS","ci",cci);var A=cI("cmRS","t3","");if(A!=""){cGA=A;}var v=cI("cmRS","cjen","");
if(v!=""){cm_JSFEnabled=true;}var x=cI("cmRS","t1","");if(x!=""&&(!cGA||cm_ClientTS-cGA<cGR)){cmAddShared("st",x);var r=cI("cmRS","ul","");var p=cI("cmRS","rf","");var q=cI("cmRS","hr","");if(q!=""){var z=cI("cmRS","lti","");if(cm_ClientTS-z<cGR){var o=cI("cmRS","ln","");cM(x,z,o,q,true,t,r,p);}}var u=cI("cmRS","ac","");
var w=cI("cmRS","fd","");if((u!="")||(w!="")){var z=cI("cmRS","fti","");if(cm_ClientTS-z<cGR){var y=cI("cmRS","fn","");var s=cI("cmRS","fu","");cL(x,z,y,u,s,w,true,t,r,p);}}}CC("cmRS");}if((cF(4)||CD(5))||cGS||cGU){cmAddNewEvent(document,"DOMContentLoaded",cmOnDomReady,"readystatechange",cmCheckIEReady);
cmAddNewEvent(window,"load",cY);cmAddNewEvent(window,"unload",cZ);if(cm_DelayHandlerReg.indexOf("L")==-1){window.cX("main");}if(cm_DelayHandlerReg.indexOf("F")==-1){cU();}}CJ(1);}());var _cmPartnerUtils={AT_TagQueue:[],AT_PartnerCallQueue:[],AT_RulesSet:false};var _cmMc={readyToCall:{},mcTagQueue:[],callPending:{}};
CM_DDX.test.process();}function cmRetrieveUserID(d){if(_$cV1!=null){d(_$cV1);}else{if(cm_JSFEnabled){_$cV1=cmJSFGetUserId();d(_$cV1);}else{var c="eluminate"+Math.floor((Math.random()*10000)+1);window[c]=function(a){_$cV1=a;d(_$cV1);};_cmPartnerUtils.loadScript(C8(null)+"//"+cm_Production_HOST+"/cookie-id.js?fn="+c);
}}}function cmLoad(){if(cm_OffsiteImpressionsEnabled){cm_Avid=cI("CMAVID");if(cm_Avid==null){_cmPartnerUtils.loadScript(C8(null)+"//"+cm_AvidHost);cm_AvidLoadTimer=setTimeout(function(){cm_AvidLoadTimedOut=true;},2000);}}var g=cm_Production_HOST;if(cm_ATEnabled){if(!cmOptedOut()&&!cmAnonymous()){if(typeof(_cm_CMRulesLoaded)=="undefined"){var k=cm_ClientID.split(";");
for(var h=0;h<k.length;h++){k[h]=k[h].split("|")[0];if(cm_PartnerDataClientIDs.indexOf(k[h])!=-1){if(cI("CorePartnerMode")=="TEST"){_cmPartnerUtils.loadScript(C8(null)+"//"+g+"/at/rules_"+k[h]+"test.js");}else{_cmPartnerUtils.loadScript(C8(null)+"//"+g+"/at/rules_"+k[h]+".js");}}}cG6._cm_CMRulesLoaded=1;
}}}if(cm_MCEnabled){_cmPartnerUtils.loadScript(C8(null)+"//"+cm_MC_LIB_HOST+"/mc.js");try{if((_cmMc.getIframeMaxDepth("IMODGUIDIDENTIFIER",5)!=null)&&(window.name!=null)&&(window.name.length>0)){_cmPartnerUtils.loadScript(C8(null)+"//"+cm_MC_APP_SERVER_HOST+"/mcwebapp/js/easyXDM.js");_cmPartnerUtils.loadScript(C8(null)+"//"+cm_MC_APP_SERVER_HOST+"/mcwebapp/js/imodWebDesigner.js");
_cmPartnerUtils.loadScript(C8(null)+"//"+cm_MC_APP_SERVER_HOST+"/mcwebapp/js/json2.js");}}catch(f){}}if(typeof($f126)==="undefined"&&!CM_DDX.dispatcherLoadRequested){CM_DDX.dispatcherLoadRequested=true;$cm_client_id=CM_DDX.cVA;var i=(CM_DDX.version>0)?"-v"+CM_DDX.version:"";if(CM_DDX.version>=2){_cmPartnerUtils.loadScript(C8(null)+"//tmscdn.coremetrics.com/tms/dispatcher"+i+".js");
}if(CM_DDX.version>=3&&!cm_ATEnabled){_cmPartnerUtils.AT_RulesSet=true;}}}_cmMc.getWebDesignerDependentScriptUrl=function(){var b=unica_imod.getWebDesignerScriptBaseUrl();if(b!=null){return b+"easyXDM.js";}else{return null;}};_cmMc.getIframeMaxDepth=function(g,i){var k=parent;var h=null;var l=1;while(h==null&&k!=null&&(i==null||l<=i)){h=k.frames[g];
var m=k;k=k.parent;if(k==m){k=null;}l++;}return h;};var cI=cI;var cE=cE;function cmStartTagSet(){if(cG8){return false;}cG8=[];cG8[0]=new _cm();cG9=1;return true;}function cmAddShared(d,c){if(cG8){cG8[0][d]=c;}}function cmSendTagSet(){var f;var h=cG8;var e=null,g=0;for(g=0;g<h.length;g++){if(typeof h[g]._$cmlch==="function"){e=h[g];
break;}}while((f=C7(arguments[0]))!=null){if(e){c9.call(e,f,h[0].ci);}else{c9(f,h[0].ci);}}cG8=null;}function _cmCQ(d,f,e){this.pl=d;this.hosts=f.split(",");if(e){this.qs=e;}this.cM5=CR;}function CR(){var a=arguments;var d=a[0]?a[0]:this.hosts[0];return this.pl+"//"+d+(this.qs?this.qs:"");}function _cmt(){this.cM0={};
this.uls={};this.rfs={};this.cTI=[];this.cPE=0;this.normalizeURL=c2;this.getPageID=c1;this.getPluginPageID=cmGetPluginPageID;}function cmGetPluginPageID(l){var m="",o=cm_ClientID.split(";"),n=l.split("|")[0],h=l.split("|")[1];for(var k=0;k<o.length;k++){if(n==o[k].split("|")[0]){if(h){h=h.split(":");
for(var i=0;i<h.length;i++){if(o[k].split("|")[1]&&(o[k].split("|")[1].toUpperCase().indexOf(h[i].toUpperCase())>-1)){m=cm_ClientID;break;}}break;}else{m=cm_ClientID;break;}}}return this.getPageID(m);}function c1(d){var c=cG7.cM0[d];return c?c:"";}function CS(c){var d=cG7.uls[c];if(!d){d=window.location.href;
}return d?d:"";}function CT(c){var d=cG7.rfs[c];if(!d){d=cG6.referrer;}return d?d:"";}function CP(g){var f=cGT;if(!f){f=cGT=cG7.normalizeURL(window.location.href,false);}var h=g.indexOf("#");if(h>=0&&h<=f.length){var a=f.indexOf("#");if(a<0){a=f.length;}if(g.substring(0,h)==f.substring(0,a)){return g.substring(h);
}}return g;}function c2(d,e){if(e){d=CP(d);var f=window.location.protocol+"//"+window.location.host;if(d.indexOf(f)==0){d=d.substring(f.length);}}return cD(d);}function c4(){for(var b in cmUA){if(cGM.indexOf(b)!=-1){return cmUA[b];}}return cmDefaultLimit;}function C0(b){if(cG7){if(cG7.cTI&&cG7.cTI[b]){cG7.cTI[b].cmLD=true;
if(cG7.cTI[b].ci){cmJSFSetValidFlagValue(cmValidFlag_SessionContinue,false,cG7.cTI[b].ci);cmJSFSetSessionCookies(false,cG7.cTI[b].ci);}}cG7.cPE--;if(cG7.onResponse){cG7.onResponse(b);}}window.dontExit=false;}function CN(c){if(cG7){cG7.cPE--;var d=null;if(cG7.cTI&&cG7.cTI[c]){d=cG7.cTI[c];d.cmLD=true;
}if(cG7.onError&&(!d||!d.cmTO)){cG7.onError(3,d);}}}function c6(d,c){if(cG3){cG3[d]=true;}C0(c);}function CO(c){if(cG7&&cG7.cTI&&cG7.cTI[c]&&!(cG7.cTI[c].cmLD)){var d=cG7.cTI[c];d.cmTO=d.src;if(cG7.onError){cG7.onError(4,d.cmTO);}}}function c8(c){if(!cG3||cG3[c]){return true;}var d=new Date();if((d.getTime()-cG2[c])>cG4){return true;
}return false;}function CV(l,o,i){if((CM_DDX.version>=3)&&CM_DDX.standalone){return;}i=i||cm_ClientID;var p=function(b){var a=false;return function(){if(!a){if(typeof b==="function"){b();}a=true;}};}(this._$cmlch);if((!cG2[l]||c8(l))&&(cm_OffsiteImpressionsEnabled==false||cm_Avid!=null||cm_AvidLoadTimedOut)){var q=new Image();
var n=cmIndex;cG7.cTI[cmIndex++]=q;if(!cG2[l]){var m=new Date();cG2[l]=m.getTime();q.onload=function(){c6(l,n);p();};}else{q.onload=function(){C0(n);p();};}q.onerror=function(){CN(n);p();};if(cm_OffsiteImpressionsEnabled&&(cm_Avid!=null)&&(cm_Avid!="none")){o+="&avid="+cm_Avid;}var k=c4();if(o.length>k){o=o.substring(0,k-6)+"&err=O";
}if(cG7.onTagSent){cG7.onTagSent(o,n);}q.src=o;q.ci=i;setTimeout(function(){CO(n);p();},cm_TimeoutSecs*1000);}else{setTimeout(function(){CV(l,o,i);},cG5);}}function c9(f,h){if(cmOptedOut()){return;}for(var g=0;g<f.hosts.length;g++){var e=f.cM5(f.hosts[g]);cG7.cPE++;CV.call(this,f.hosts[g],e,h);}}function cC(){var d=null;
if(!this.ul){if(this.tid=="8"||(this.tid=="9"||this.tid=="10")){this.ul=window.location.protocol+"//"+window.location.hostname;}else{this.ul=window.location.href;}}if(cG8){cG8[cG9++]=this;}else{var c=this.getImgSrc(arguments[0],1);c9.call(this,c,this.ci);d=c;}return d;}function cmLogError(b){}function C4(i,h,k){if(!k){if(!i.rf){if(!document.referrer){h.rf="";
}else{h.rf=document.referrer;}}else{if(i!=h){h.rf=i.rf;}}if(!i.ul||i.ul==""||i.ul=="(none)"){h.ul=window.location.href;}else{if(i!=h){h.ul=i.ul;}}var f=cG7.normalizeURL(h.ul,false);var g=cG7.normalizeURL(h.rf,false);if(f!=""){h.ul=f;}if(g!=""){h.rf=g;}}}function C6(e,x,u){var t="";if(e.tid){t+="tid="+e.tid;
}var A=(e.tid==1||(e.pc&&e.pc.charAt(0)=="Y"));for(var s in e){if(s=="qs"||s=="tid"||s=="topline"){continue;}if(e[s]!==0&&(!e[s]||e[s]==""||typeof(e[s])==="function")){continue;}if(x&&x[s]&&x[s]==e[s]){continue;}if(t!=""){t+="&";}t+=cD(s)+"="+cE(cD(e[s]));}if(!e.rs&&e.ci){if(e.pi&&A){cG7.cM0[e.ci]=e.pi;
}if(e.ul){cG7.uls[e.ci]=e.ul;}if(e.rf){cG7.rfs[e.ci]=e.rf;}}if(x&&cm_SecureTags.indexOf("|"+e.tid+"|")!=-1){x.protocol="https:";}if(cm_JSFEnabled&&!u){cmJSFSetSessionCookies(false,e.ci);t+=(t!=""?"&":"")+cmCore_JSFParamEnabled+"=1";var q=cmJSFGetUserId();t+="&"+cmCore_JSFParamUserID+"="+(q!=null?q:"");
t+="&"+cmCore_JSFParamSessionID+"="+cmJSFGetSessionValue(e.ci);t+="&"+cmCore_JSFParamValidFlag+"="+cmJSFGetValidFlagValue(e.ci);}if(cm_PartnerDataClientIDs&&e.tid){try{var p={};for(var r in e){var z=e[r];if(typeof(z)!="function"&&typeof(z)!="undefined"){if(r=="ci"){z=z.split(";");for(var v=0;v<z.length;
v++){z[v]=z[v].split("|")[0];}z=z.join(";");}}p[r]=z;}if(x){for(var r in x){var z=x[r];if(typeof(z)!="function"&&typeof(z)!="undefined"){if(r=="ci"){z=z.split(";");for(var v=0;v<z.length;v++){z[v]=z[v].split("|")[0];}z=z.join(";");}}p[r]=z;}}p.calculateTopLineAndReturnSegments=e.calculateTopLineAndReturnSegments;
if((cm_ATEnabled&&_cmPartnerUtils.AT_RulesSet)||CM_DDX.version>=3){if(_cm_NRSet){_cmPartnerUtils.calculateAndSendATData(p);}else{_cmPartnerUtils.AT_TagQueue.push(p);}}}catch(w){}}var y=_cmPartnerUtils.copyTag(e,x);if(y.tid){_cmMc.mcTagQueue.push(y);if(cmMarketing.INSTANCE!==null){cmMarketing.INSTANCE.tagCallTriggered();
}else{_cmMc.callPending.tagCallTriggered=true;}}return t;}_cmPartnerUtils.copyTag=function(g,h){var k={};for(var f in g){var i=g[f];if(typeof(i)!="function"&&typeof(i)!="undefined"){k[f]=i;}}if(h){for(var f in h){var i=h[f];if(typeof(i)!="function"&&typeof(i)!="undefined"){k[f]=i;}}}k.calculateTopLineAndReturnSegments=g.calculateTopLineAndReturnSegments;
return k;};function C8(c){var d=location.protocol;if(c&&c.protocol){d=c.protocol;}if(d!="http:"&&d!="https:"){d="http:";}return d;}function c0(){var h=arguments;C4(this,this,h[0]);var f={};var a=C6(this,f);var g=new _cmCQ(C8(f),cm_HOST,a);return h[1]?g:g.cM5();}function C7(){var u,l,y,a,v,x,i,w,s,h,t;
if(!cG8||cG8.length<2){return null;}u=cG8[0];l=cG8[1];u.ci=l.ci;for(s=1;s<cG8.length;s++){if(u.ci.indexOf(cG8[s].ci)==-1){u.ci+=";"+cG8[s].ci;}if(cm_SecureTags.indexOf("|"+cG8[s].tid+"|")!=-1){u.protocol="https:";}}for(s=0;s<cG0.length;s++){y=cG0[s];if(!u[y]){u[y]=l[y];}}a=arguments;C4(l,u,a[0]);v=C8(u);
t=new _cmCQ(v,cm_HOST);t.qs=C6(u);x=c4();i=0;for(var p=0;p<t.hosts.length;p++){w=v.length+t.hosts[p].length+t.qs.length;if(w>i){i=w;}}for(s=1;s<cG8.length;s++){h=C6(cG8[s],u,true);if(s>1&&i+h.length+1>x){for(j=1;j<cG8.length-s+1;j++){cG8[j]=cG8[j+s-1];}cG8.length=cG8.length-s+1;break;}i+=h.length+1;t.qs+="&"+h;
}if(s==cG8.length){cG8=null;}return t;}function _cm(){var e,a=arguments;this.ci=cm_ClientID;for(e=0;e<a.length;e++){this[a[e]]=a[++e];}this.write=cC;this.getImgSrc=c0;this.writeImg=cC;this.st=cm_ClientTS;this.vn1="4.14.30";if(cF(5.5)||!cF(0)){var f=(cm_UseUTF8&&encodeURIComponent)||cGU?"utf-8":cG6.charset;
if(!f){f=cG6.defaultCharset;}if(!f){f=cG6.characterSet;}this.ec=f;}this.topline=[];}function cD(d){var c="";d=c+(!d&&d!==0?"":d);return d.split("'").join(c).split('"').join(c).split("\r").join(c).split("\n").join(c);}function cE(g){var h=0,e;while(g.charAt(h)==" "&&h!=g.length){h++;}e=g.length-1;while(g.charAt(e)==" "&&e!=0){e--;
}g=g.substring(h,e+1);if(cm_UseUTF8&&encodeURIComponent){g=encodeURIComponent(g);}else{g=preEscape(g);g=escape(g);var f=new RegExp("%25u00","g");g=g.replace(f,"%u00");}g=g.split("+").join("%2B");return g;}function preEscape(f){for(var d=160;d<256;d++){var e=new RegExp(String.fromCharCode(d),"g");f=f.replace(e,"%u00"+d.toString(16));
}return f;}function cF(d){var c=cGM.indexOf("MSIE");if(c!=-1){return(parseFloat(cGM.substring(c+5))>=d);}return false;}function CD(b){return(cGN.indexOf("Gecko")!=-1&&parseInt(cGM)>=b);}function cI(f,g,i){var k=cG6.cookie;var h=cJ(f,k,";");if(!g||!h){if(!h&&i!=null){return i;}return h;}h=cJ(g,h,"&");
if(!h&&i!=null){return i;}return unescape(h);}function CL(){var i,g,c,k,h=0;g=cG6.cookie;if(g){i=g.split(";");h=i.length;for(k=0;k<i.length;k++){c=i[k].split("=");if(c.length<2||c[1]==null||c[1]==""){h--;}}}return h;}function CB(i,l,p,m){if(cmCookiesDisabled()){return true;}var n,k,o,q=cG6.cookie;n=null;
k=l.length+1;if(!cI(i)){k+=i.length;}if(k>4096){n=1;}else{if(q){if(CL()>=50){n=2;}}}if(n){if(cG7.onError){cG7.onError(n,name);}return false;}o=i+"="+l+"; path=/";if(m){o+="; domain="+m;}if(p&&!cmSessionCookiesOnly()){o+="; expires="+p;}cG6.cookie=o;return true;}function cmSetSubCookie(n,p,q,x,t){var u=cI(n);
var r;if(!u){r=p+"="+q;}else{var o="&";var s=p+"=";var w=u.indexOf(s);if(w>=0){if(w>0&&u.charAt(w-1)!=o){w=u.indexOf(o+s);if(w>=0){w++;}}}if(w>=0){var y=w+p.length+1;var v=u.indexOf(o,y);if(v<0){v=u.length;}r=u.substring(0,y)+q+u.substring(v);}else{r=u+o+p+"="+q;}}CB(n,r,x,t);}function CC(f,g){var e=cI(f);
if(e!=null){var h=new Date();h.setYear(1973);var e=f+"=; path=/; expires="+h.toGMTString();if(g){e+="; domain="+g;}cG6.cookie=e;}return e;}function cJ(k,l,q){var m,o,p,i,n=null;m=k+"=";o=q+" ";p=l.indexOf(o+m);if(p==-1){o=q;p=l.indexOf(o+m);}if(p==-1){p=l.indexOf(m);if(p!=0){return null;}}else{p+=o.length;
}i=l.indexOf(o,p);if(i==-1){i=l.length;}return l.substring(p+m.length,i);}function CG(f){if(!f){f=window.event;}var e=[f.currentTarget,f.target,f.srcElement];for(var d=0;d<e.length;d++){if(e[d]){return e[d];}}}function CU(i,h,k,o,l){var m,n;i.pi=k?k:c1(h);if(cGQ){if(o||l){i.ul=o?o:"";i.rf=l?l:"";}else{m=CS(h);
n=CT(h);if(i.pi==""||m.indexOf("cm_")>0||(n!=""&&n.indexOf(window.location.protocol+"//"+window.location.host)!=0)){i.ul=m;i.rf=n;}}}}function cL(s,u,w,r,y,q,n,t,o,x,v){var p=new _cm("tid","10");CU(p,p.ci,t,o,x);p.st=s;p.ti=u;p.fo=w;p.ac=r;p.hr=y;p.fi=q;p._$cmlch=v;if(n){p.rs="Y";}p.write(1);}function cM(t,A,z,y,o,u,p,w,v){var q=new _cm("tid","8");
if(typeof(encodeURI)==="function"){y=encodeURI(y).replace(/%25/g,"%");}CU(q,q.ci,u,p,w);q.st=t;q.ti=A;q.nm=z;q.hr=y;q._$cmlch=v;var s=y.indexOf("cm_cr=");var x=y.indexOf("cm_me=");if(s>-1){var r=y.indexOf("&",s);if(r==-1){q.cm_cr=y.substring(s+6);}else{q.cm_cr=y.substring(s+6,r);}}if(x>-1){var r=y.indexOf("&",x);
if(r==-1){q.cm_me=y.substring(x+6);}else{q.cm_me=y.substring(x+6,r);}}if(o){q.rs="Y";}q.write(1);}function CM(i){var g,a,k,h;if((g=i.indexOf("?"))==-1){g=i.lastIndexOf("/");}if(g!=-1){a=i.indexOf("#",g);if(a==-1){a=i.length;}while(g!=-1&&g<a){g=i.indexOf("cm_",g);if(g!=-1){k=i.indexOf("&",g);if(k==-1){k=a;
}h=i.indexOf("=",g);if(h!=-1&&h<k){this[i.substring(g,h)]=i.substring(h+1,k);}g=k;}}}}function CK(v,r,s,w,t){var n,o,u,m,q,p;if((r||s||w||t)&&v){n=new _cm("tid","9");o=new CM(CP(v));if(r){u=n.cm_sp_o=o.cm_sp_o;if(!u){u=n.cm_sp=o.cm_sp;}}if(s){m=n.cm_re_o=o.cm_re_o;if(!m){m=n.cm_re=o.cm_re;}}if(w){if(v.indexOf("#")==-1){q=n.cm_cr=o.cm_cr;
}}if(t){p=n.cm_me=o.cm_me;}if(u||m||q||p){n.pi=c1(n.ci);n.st=cm_ClientTS;if(typeof cmCheckIgnoreImpression=="function"){if(cmCheckIgnoreImpression(u,m,q,p)){n.write(1);}}else{n.write(1);}}}}function cmFormBlurRecord(b){if(b.cmFormEleMemValue!=cmFormElementValue(b)&&b.cmFormEleMemValue!=null){cmFormReportInteraction(b);
}b.form.cmEleValue=-1;}function cmFormElementOnclickEvent(){try{var d;var e=cmFormElementValue(this);if((cmFormC1.indexOf(this.type)>=0)||(this.cmFormEleMemValue!=e)){if(this.type=="radio"){for(d=0;d<this.form.elements.length;d++){if(this.form.elements[d].cM2==this.cM2){this.form.elements[d].cmFormEleMemValue=null;
}}}this.cmFormEleMemValue=e;cmFormReportInteraction(this);}}catch(f){cmLogError(f);}}function cmFormElementOnfocusEvent(){try{this.form.cmEleValue=this.cM2;this.cmFormEleMemValue=cmFormElementValue(this);}catch(b){cmLogError(b);}}function cmFormElementOnblurEvent(){try{cmFormBlurRecord(this);}catch(b){cmLogError(b);
}}function cmFormElementOnchangeEvent(){try{cmFormReportInteraction(this);}catch(b){cmLogError(b);}}function cmFormElementValue(f){var e;if(f.type=="checkbox"){return f.checked;}else{if((cmFormC3.indexOf(f.type)>=0)&&f.options){var d="";for(e=0;e<f.options.length;e++){if(f.options[e].selected==true){d=d+f.options[e].index;
}}return d;}else{if(cmFormC2.indexOf(f.type)>=0||f.type=="file"||f.type=="radio"){return f.value;}else{return null;}}}}function cO(q,p,t,u){var v,w,o,m="";var r=null;p=q+":"+p;if(q!=-1){if(cG6.forms[q]){r=cG6.forms[q];var m=r.attributes;w=r.action?r.action:m.action.nodeValue?m.action.nodeValue:m.getNamedItem("action").value?m.getNamedItem("action").value:"";
}}cGD=cG6.cmTagCtl.normalizeFORM(cGD);var n=c1(cm_ClientID);if(cm_FormPageID&&n!=""){var s=cGD.split(";");cGD="";for(o=0;o<s.length-1;o++){cGD+=n.split(":").join("").split(";").join("")+"_"+s[o]+";";}cm_FormPageID=false;}if(cV(w)&&(q!="-1"||(q=="-1"&&cmSubmitFlag==false))){v=new Date();cGH=v.getTime();
cGF=p;cGE=cG7.normalizeURL(w,true);cL(cm_ClientTS,cGH,cGD,cGF,cGE,cGC,false,u,u,u,t);cGG=cGC;cGC="";if((r)&&(typeof cmCustomFormSubmitHandler=="function")){cmCustomFormSubmitHandler(r,p);}}else{cGF="";}}function cmFormOnresetEvent(){var d;try{cO(this.cM1,"R");}catch(c){cmLogError(c);}try{for(d=0;d<cG6.forms[this.cM1].elements.length;
d++){cG6.forms[this.cM1].elements[d].cmFormEleMemValue=false;}}catch(c){cmLogError(c);}try{if(this.cQ){return this.cQ();}}catch(c){cmLogError(c);}}function cmFormOnsubmitEvent(h,f,g){try{if(this.cmEleValue>-1){cmFormBlurRecord(this.elements[this.cmEleValue]);}}catch(e){cmLogError(e);}try{if(this.cM1>=0&&this.cmSubmitIndex==false){cmSubmitFlag=true;
this.cmSubmitIndex=true;cO(this?this.cM1:-1,"S",f);CE();}else{if(typeof f==="function"){f();}}}catch(e){cmLogError(e);}cmJSFPMigrateLink(this,"action");}function cmFormReportInteraction(f){var d=cG6.cmTagCtl.normalizeFIELDS(f.name?f.name:f.id?f.id:"");var e=cGC+f.form.cM1+":"+f.cM2+":"+d.split(":").join("|").split(";").join("|")+";";
if(e.length<1000){cGC=e;}}function cmFormSubmit(){cmJSFPMigrateLink(this,"action");try{if(this.cmEleValue>-1){cmFormBlurRecord(this.elements[this.cmEleValue]);}}catch(c){cmLogError(c);}try{if(this.cM1>=0&&this.cmSubmitIndex==false){cmSubmitFlag=true;this.cmSubmitIndex=true;cO(this?this.cM1:-1,"S");CE();
}}catch(c){cmLogError(c);}try{if(cm_LinkClickDelay){setTimeout((function d(a){return function(){a.cmSubmit();};}(this)),cm_LinkClickDelayInterval);return false;}else{this.cmSubmit();}}catch(c){cmLogError(c);}}cG6.cmTagCtl.normalizeFORM=function(b){return b;};cG6.cmTagCtl.normalizeFIELDS=function(b){return b;
};function cU(){if(cm_SkipHandlerReg.indexOf("F")==-1){_$cF1();var q,o,e,i,l,n,m;for(q=0;q<cG6.forms.length;q++){o=cG6.forms[q];m=0;if(!o.cM1&&!o.cmEleValue&&!o.cmSubmitIndex){o.cM1=q;o.cmEleValue=-1;o.cmSubmitIndex=false;o.radiogroup={key:"value"};try{if(cF(5)&&!cF(8)){var p=o.attributes;e=p.name?p.name.nodeValue:p.id?p.id.nodeValue:p.action?p.action.nodeValue:"UNDEFINED";
}else{if(o.attributes.getNamedItem){e=((o.attributes.getNamedItem("name"))&&(o.attributes.getNamedItem("name").value!==""))?o.attributes.getNamedItem("name").value:((o.attributes.getNamedItem("id"))&&(o.attributes.getNamedItem("id").value!==""))?o.attributes.getNamedItem("id").value:((o.attributes.getNamedItem("action"))&&(o.attributes.getNamedItem("action").value!==""))?o.attributes.getNamedItem("action").value:"UNDEFINED";
}else{e=o.name?o.name:o.id?o.id:o.action?o.action:"UNDEFINED";}}}catch(l){e="ERROR";cmLogError(l);}cGD+=e+":"+q+";";try{if(o.submit!==cmFormSubmit){o.cmSubmit=o.submit;o.submit=cmFormSubmit;}}catch(l){cmLogError(l);}if(typeof cm_NewFormTracker!=="undefined"){if(!o._$cV2){_$cF4(o);}}else{cmAddNewEvent(o,"submit",cmFormOnsubmitEvent);
}cmAddNewEvent(o,"reset",cmFormOnresetEvent);for(i=0;i<o.elements.length;i++){l=o.elements[i];if(!l.cM1&&!l.cM2&&!l.cmFormEleMemValue){l.cM1=q;l.cM2=m;l.cmFormEleMemValue=null;m++;if(l.type=="radio"){n=l.name?l.name:l.id?l.id:"";if(n!=""){if(o.radiogroup[n]){l.cM2=o.radiogroup[n];}else{o.radiogroup[n]=l.cM2;
}}}if(cmFormC1.indexOf(l.type)>=0||l.type=="checkbox"||l.type=="radio"){try{cmAddNewEvent(l,"click",cmFormElementOnclickEvent);}catch(l){cmLogError(l);}}if(cmFormC2.indexOf(l.type)>=0||cmFormC3.indexOf(l.type)>=0){try{cmAddNewEvent(l,"focus",cmFormElementOnfocusEvent);cmAddNewEvent(l,"blur",cmFormElementOnblurEvent);
}catch(l){cmLogError(l);}}if(l.type=="file"){try{cmAddNewEvent(l,"change",cmFormElementOnchangeEvent);}catch(l){cmLogError(l);}}}}}}}}function _$cF1(){if(typeof cm_NewFormTracker!=="undefined"&&cm_NewFormTracker.submitFunctions){var fnCounts={};var frm=null;var count=0;var fnToFrm={};for(frm in cm_NewFormTracker.submitFunctions){count=fnCounts[cm_NewFormTracker.submitFunctions[frm]];
if(!count){count=0;}count++;fnCounts[cm_NewFormTracker.submitFunctions[frm]]=count;fnToFrm[cm_NewFormTracker.submitFunctions[frm]]=frm;}var funcName=null;for(funcName in fnToFrm){if(fnCounts[funcName]>1){cmUtils.console.error("Function "+funcName+" defined "+fnCounts[funcName]+" times. Hence ignoring.");
}else{frm=_$cF2(fnToFrm[funcName]);if(frm&&!frm._$cV2){frm._$cV2=true;var newFuncName=funcName+Math.floor((Math.random()*10000)+1);window[newFuncName]=eval(funcName);window[funcName]=(function(f,fn){return function(){var args=arguments;var fnRealOnClick=function(){var retVal=fn.apply(this,args);if(retVal&&f){f.submit();
}};if(f){cmFormOnsubmitEvent.call(f,undefined,fnRealOnClick);}return false;};}(frm,window[newFuncName]));}}}}}function _$cF2(e){var f=e;if(typeof e==="string"){f=document.getElementById(e);if(!f){var d=document.getElementsByName(e);if(d.length>0){f=d[0];}d=null;}}if(f&&typeof f==="object"&&f.tagName=="FORM"){return f;
}return null;}function _$cF4(d){var c=function(a,b){return function(g){if(!g){g=window.event;}var h=function(){var e=false;return function(){if(!e){e=true;var f=b&&b();a.onsubmit=function(){return f;};a.submit();}};}();cmFormOnsubmitEvent.call(g.srcElement?g.srcElement:g.target,g,h);if(g.preventDefault){g.preventDefault();
}else{g.returnValue=false;}return false;};}(d,d.onsubmit);d.onsubmit=c;d=null;}function cV(i){if(cm_TrackLink==true||cm_TrackLink=="A"){return true;}else{if(cm_TrackLink=="E"&&i.indexOf("/")!=0){return true;}var h;if((h=cm_DownloadExtensions)!=null){var k=i.lastIndexOf(".");if(k!=-1){var g=i.substring(k);
for(var e=0;e<h.length;e++){if(g==h[e]){return true;}}}}return false;}}function cW(c,d){CI();var c=CG(c);if(c){C9(c,d);}CJ(1);CE();if(d){setTimeout(d,cm_LinkClickDelayInterval);}}function C9(n,e,l){cGI="";cGJ="";cGK="";var q=n.tagName.toUpperCase();if(q=="AREA"){cGJ=n.href?n.href:"";var o=n.parentElement?n.parentElement:n.parentNode;
if(o!=null){cGI=o.name?o.name:(o.title?o.title:(o.id?o.id:""));}}else{while(q!="A"&&q!="HTML"){if(!n.parentElement){if(n.parentNode){n=n.parentNode;}else{break;}}else{n=n.parentElement;}if(n){q=n.tagName.toUpperCase();}}if(q=="A"){cGJ=n.href?n.href:"";cGI=n.name?n.name:(n.title?n.title:(n.id?n.id:""));
}}if(n.getAttribute){var m=n.getAttribute("manual_cm_re");if(m){cGJ=cGJ.split("#");cGJ[0]=cGJ[0]+((cGJ[0].indexOf("?")>-1)?"&":"?")+"cm_re="+m;cGJ=cGJ.join("#");}var k=n.getAttribute("manual_cm_sp");if(k){cGJ=cGJ.split("#");cGJ[0]=cGJ[0]+((cGJ[0].indexOf("?")>-1)?"&":"?")+"cm_sp="+k;cGJ=cGJ.join("#");
}}cGJ=cG7.normalizeURL(cGJ,true);if(cV(cGJ)==true){var p=new Date();cGK=p.getTime();if(typeof cmCustomLinkClickHandler=="function"){cmCustomLinkClickHandler(n);}cM(cm_ClientTS,cGK,cGI,cGJ,false,l,l,l,e);}else{cGJ="";}cmJSFPMigrateLink(n,"href");}function cmAddNewEvent(m,n,l,k,h){if(m.addEventListener){m.addEventListener(n,l,false);
}else{if(m.attachEvent){k=k||n;h=h||l;var i=k+h,o="e"+i;if(typeof m[o]==="undefined"){m[o]=h;m[i]=function(){m[o](window.event);};m.attachEvent("on"+k,m[i]);}}}}function cX(b){if(cm_ClientID!=="99999999"&&c1(cm_ClientID)!==""){cmAddClicksAndThrowImpressions(b);}else{cmAddClickHandlers();if(b==="onload"){setTimeout(cmThrowImpressionTags,10);
}}}function cmAddClicksAndThrowImpressions(i){CI();var o,n,s,m,p,r,q;s=cm_TrackImpressions;m=(s.indexOf("S")!=-1);p=(s.indexOf("R")!=-1);r=(s.indexOf("C")!=-1);q=(s.indexOf("M")!=-1);for(o=0;o<cG6.links.length;o++){n=cG6.links[o];if(cm_SkipHandlerReg.indexOf("L")==-1){_$cF5(n);}if(i=="onload"){var l=n.href;
if(n.getAttribute("manual_cm_re")){l=l.split("#");l[0]=l[0]+((l[0].indexOf("?")>-1)?"&":"?")+"cm_re="+n.getAttribute("manual_cm_re");l=l.join("#");}if(n.getAttribute("manual_cm_sp")){l=l.split("#");l[0]=l[0]+((l[0].indexOf("?")>-1)?"&":"?")+"cm_sp="+n.getAttribute("manual_cm_sp");l=l.join("#");}if(!n.cmImpressionSent){CK(l,m,p,r,q);
n.cmImpressionSent=1;}}}CJ(1);}function cmAddClickHandlers(){var c,d;for(d=0;d<cG6.links.length;d++){c=cG6.links[d];if(cm_SkipHandlerReg.indexOf("L")==-1){_$cF5(c);}}}function _$cF5(e){var d=cmUtils.string.trim(e.href).toLowerCase();if(!cm_NewLinkTracker||e.className.indexOf("cmUseOldLinkTracker")!=-1||d.indexOf("#")===0||d.indexOf("javascript:")===0||d.indexOf(location.href.toLowerCase()+"#")===0){cmAddNewEvent(e,"click",cW);
}else{if(!e._$cF6){var f=e.onclick;e.onclick=null;e._$cF6=function(b){if(!b){b=window.event;}var c,n;c=n=this.href;var l=b.srcElement?b.srcElement:b.target;var m=l.tagName.toUpperCase();if(m!=="AREA"&&m!=="A"){while(m!=="A"){l=l.parentElement?l.parentElement:l.parentNode;if(l){m=l.tagName.toUpperCase();
}}}if(l){n=l.href;}if(n===c){var a=false;if(l.target===window.name||l.target==="_self"){var o=(function(h,i,k){var g=false;return function(){if(!g){g=true;if(!i||i.call(k)!==false){location.href=h;}}};})(n,f,l);}else{if(f){a=f.call(l);}}cW(b,o);if(l.target===window.name||l.target==="_self"||a){if(b.preventDefault){b.preventDefault();
}else{b.returnValue=false;}}}};cmAddNewEvent(e,"click",e._$cF6);}}}function cmThrowImpressionTags(){if(cm_ClientID==="99999999"||c1(cm_ClientID)===""){setTimeout(cmThrowImpressionTags,10);return;}CI();var n,l,o,p,k,q,i;o=cm_TrackImpressions;p=(o.indexOf("S")!=-1);k=(o.indexOf("R")!=-1);q=(o.indexOf("C")!=-1);
i=(o.indexOf("M")!=-1);for(n=0;n<cG6.links.length;n++){l=cG6.links[n];var m=l.href;if(l.getAttribute("manual_cm_re")){m=m.split("#");m[0]=m[0]+((m[0].indexOf("?")>-1)?"&":"?")+"cm_re="+l.getAttribute("manual_cm_re");m=m.join("#");}if(l.getAttribute("manual_cm_sp")){m=m.split("#");m[0]=m[0]+((m[0].indexOf("?")>-1)?"&":"?")+"cm_sp="+l.getAttribute("manual_cm_sp");
m=m.join("#");}if(!l.cmImpressionSent){CK(m,p,k,q,i);l.cmImpressionSent=1;}}CJ(1);}function cY(b){cmOnDomReady();window.setTimeout(function(){CM_DDX.firstPassFunctionBinding=true;},CM_DDX.BAD_PAGE_ID_ELAPSED_TIMEOUT);if((cF(4)||CD(5))||cGS||cGU){window.cX("onload");cU();}}function cZ(k){cG3=null;CI();
var e=false;for(var i=0;i<document.forms.length;i++){try{if(cG6.forms[i].cmEleValue>-1){cmFormBlurRecord(document.forms[i].elements[document.forms[i].cmEleValue]);}}catch(k){cmLogError(k);}try{if(cGC!=""){e=true;cO(-1,"U");}}catch(k){cmLogError(k);}}CJ(1);if(e){window.dontExit=true;var m=new Date();var n=new Date();
for(;window.dontExit&&(n-m<1000);){n=new Date();}}CE();if(cm_UseCookie&&cG7.cPE==0){var l=escape(c1(cm_ClientID));CB("cmRS","t3="+cmT3+"&pi="+l);}if(cG7.onUnload){cG7.onUnload();}if(cF(5)&&!cF(5.5)&&window.parent!=window){cG7.cTI=null;}else{if(!cGU){for(var o=0;o<cG7.cTI.length;o++){cG7.cTI[o].onload=null;
cG7.cTI[o].onerror=null;}}}}function CE(){if(cm_UseCookie){cmT3=new Date().getTime();var g,h,i,l,m="";g=cGA?"&t4="+cGA:"";h=(cGJ!="")?"&lti="+cGK+"&ln="+escape(cGI)+"&hr="+escape(cGJ):"";i={};CU(i,cm_ClientID);var k="";if(cm_JSFEnabled){k="&cjen=1";}l="&t1="+cm_ClientTS+"&t3="+cmT3+g+h+"&fti="+cGH+"&fn="+escape(cGD)+"&ac="+cGF+"&fd="+escape(cGG)+"&fu="+escape(cGE)+"&pi="+escape(i.pi)+"&ho="+escape(cm_HOST)+"&ci="+escape(cm_ClientID);
if(i.ul&&i.rf&&i.ul.length+i.rf.length<cGO){m="&ul="+escape(i.ul)+"&rf="+escape(i.rf);}if(!CB("cmRS",l+m+k)){if(!CB("cmRS",l+k)){CB("cmRS","t3="+cmT3+"&pi="+escape(i.pi)+k);}}}}function cmSetAvid(b){clearTimeout(cm_AvidLoadTimer);if(b){cm_Avid=b;}else{cm_Avid="none";}CB("CMAVID",cm_Avid);cm_AvidLoadTimedOut=false;
}function cmJSFSetSessionCookies(e,h){if(!cm_JSFEnabled){return;}var f=h.split(";");for(var g=0;g<f.length;g++){cmJSFSetSingleSessionCookie(e,f[g]);}}function debugReadCookie(c){var i=c+"=";var g=document.cookie.split(";");for(var k=0;k<g.length;k++){var h=g[k];while(h.charAt(0)==" "){h=h.substring(1,h.length);
}if(h.indexOf(i)==0){return h.substring(i.length,h.length);}}return null;}function cmJSFGetCookieExpireDate(){var b=new Date();b.setTime(b.getTime()+(cm_JSFCoreCookieExpireSeconds*1000));return b.toGMTString();}function cmJSFGetUserId(){var b=cI(cm_JSFCoreCookieName);if(b){b=b.split("&",2)[0];if(b=="anonymous"||cmAnonymous()){b="1000000000000003";
}}if(!b){b=cmIT();}return b;}function cmJSFSetSingleSessionCookie(q,o,t){if(!cm_JSFEnabled){return;}if(cmOptedOut()){return;}var u=cI(cm_JSFCoreCookieName);if(u==null){u=cmJSFCreateUserId();if(cm_JSFTrackClients){u+="&ci="+o;}CB(cm_JSFCoreCookieName,u,cmJSFGetCookieExpireDate(),cm_JSFPCookieDomain);if(!t){cmJSFSetSingleSessionCookie(true,o,true);
}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,false,o);cmJSFSetValidFlagSingleValue(cmValidFlag_NewVisitor,true,o);return;}if(cm_JSFTrackClients){var n=cJ("ci",u,"&");n=n&&unescape(n);if(n){n=n.split(",").join("_");}if(n&&n.indexOf(o)<0){cmSetSubCookie(cm_JSFCoreCookieName,"ci",n+"_"+o,cmJSFGetCookieExpireDate(),cm_JSFPCookieDomain);
n=cJ("ci",u,"&");n=n&&unescape(n);if(n.indexOf(o)>=0){if(!t){cmJSFSetSingleSessionCookie(true,o,true);}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,false,o);cmJSFSetValidFlagSingleValue(cmValidFlag_NewVisitor,true,o);return;}}}var m=(cmJSFGetSessionLoginCookieValue(o)!=null);if(!m){if(cmJSFCombineSessionCookies(o)){m=(cmJSFGetSessionLoginCookieValue(o)!=null);
}}if(!m&&!q){if(!t){cmJSFSetSingleSessionCookie(true,o,true);}cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,true,o);return;}var w=new Date();var v=w.getTime();var r=v+cm_JSFSessionTimeout*1000;var s=cmJSFIsSessionExpired(cmJSFGetSessionExpireCookieValue(o));if((q!=null&&q==true)||s){var p=v.toString();
if(p.length<10){while(p.length<10){p="0"+p;}}else{p=p.substring(0,10);}cmJSFSetSessionLoginCookieValue(o,p);if(s){cmJSFSetValidFlagSingleValue(cmValidFlag_SessionReset,true,o);}else{cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession,true,o);}if(cm_JSFSessionType=="T"){cmJSFSetSessionExpiresCookieValue(o,r.toString());
}}if(cm_JSFSessionType=="I"){cmJSFSetSessionExpiresCookieValue(o,r.toString());}}function cmJSFIsSessionExpired(c){if(c==null){return false;}var d=new Date();if(d.getTime()>c){return true;}else{return false;}}function cmJSFCreateUserId(){var i=new Date();var l=Math.random();if(l==0){l=Math.random();}var g=Math.random();
if(g==0){g=Math.random();}var m=l.toString().substring(2,4)+g.toString().substring(2,12)+i.getTime().toString();var h=m.length;var k=23;if(h<k){m=m+m.substring(h-(k-h),h);}if(h>k){m=m.substring(0,k);}return m;}function cmJSFSetValidFlagValue(i,g,k){if(!cm_JSFEnabled){return;}var f=k.split(";");for(var h=0;
h<f.length;h++){cmJSFSetValidFlagSingleValue(i,g,f[h]);}}function cmJSFSetValidFlagSingleValue(k,h,m){var g=null;var l=cmJSFGetSessionValidFlagCookieValue(m);if(l){var i=parseInt(l);if(!isNaN(i)){g=i;}}if(g==null){g=cmValidFlag_SessionContinue;}if(h){if(k==cmValidFlag_NewSession){g&=~cmValidFlag_SessionReset;
}if(k==cmValidFlag_SessionReset){g&=~cmValidFlag_NewSession;}g|=k;}else{g=k;}g|=cmValidFlag_SessionContinue;cmJSFSetSessionValidFlagCookieValue(m,g);}function cmJSFGetClientIdForSession(b){if(cm_JSFEAMasterIDSessionCookie){b=b.split("|")[0];}return b;}function cmJSFCreateSessionMigrationParamName(b){return cm_JSFPCookieMigrateSessionID+"_"+cmJSFGetClientIdForSession(b);
}function cmJSFCreateCombinedSessionCookieName(b){return cmJSFGetClientIdForSession(b)+"_clogin";}function cmJSFCombineSessionCookies(f){var g=cI(f+"_login");var h=cI(f+"_expires");var i=cI(f+"_valid");if(g!=null&&h!=null&i!=null){var k="l="+g+"&e="+h+"&v="+i;CB(cmJSFCreateCombinedSessionCookieName(f),k,null,cm_JSFPCookieDomain);
CC(f+"_login",cm_JSFPCookieDomain);CC(f+"_expires",cm_JSFPCookieDomain);CC(f+"_valid",cm_JSFPCookieDomain);return true;}return false;}function cmJSFSetSessionLoginCookieValue(d,c){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(d),"l",c,null,cm_JSFPCookieDomain);}function cmJSFSetSessionExpiresCookieValue(d,c){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(d),"e",c,null,cm_JSFPCookieDomain);
}function cmJSFSetSessionValidFlagCookieValue(d,c){cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(d),"v",c,null,cm_JSFPCookieDomain);}function cmJSFGetSessionLoginCookieValue(b){return cI(cmJSFCreateCombinedSessionCookieName(b),"l");}function cmJSFGetSessionExpireCookieValue(b){return cI(cmJSFCreateCombinedSessionCookieName(b),"e");
}function cmJSFGetSessionValidFlagCookieValue(b){return cI(cmJSFCreateCombinedSessionCookieName(b),"v");}function cmJSFGetSessionValue(l){var m="";var n="";var h=l.split(";");for(var k=0;k<h.length;k++){var i=h[k];if(i==""){continue;}var o=cmJSFGetSessionLoginCookieValue(i);m+=n+(o!=null?o:"");if(n==""){n="|";
}}return m;}function cmJSFGetValidFlagValue(l){var m="";var n="";var h=l.split(";");for(var k=0;k<h.length;k++){var i=h[k];if(i==""){continue;}var o=cmJSFGetSessionValidFlagCookieValue(i);m+=n+(o!=null?o:"");if(n==""){n="|";}}return m;}_cm.prototype.addTP=function(){coremetrics.getTechProps(this);};function cmJSFPMigrateCookies(z,q,p){if(z&&q&&cm_JSFEnabled&&cm_JSFPCookieMigrate){var w=cI(cm_JSFCoreCookieName),t,i,r,s;
if(!w||cm_JSFPForceMigrateCookies){CB(cm_JSFCoreCookieName,z+(cm_JSFTrackClients?"&ci="+cm_ClientID.split(";").join(","):""),cmJSFGetCookieExpireDate(),cm_JSFPCookieDomain);t=(new Date().getTime()+cm_JSFSessionTimeout*1000).toString();i=cm_ClientID.split(";");for(s=0;s<i.length;++s){r=i[s];if(q[r]!==undefined){cmJSFSetSessionLoginCookieValue(r,q[r]);
cmJSFSetSessionExpiresCookieValue(r,t);cmJSFSetSessionValidFlagCookieValue(r,"1");}}}}if(cm_JSFPCookieMigrate&&cm_JSFPMigrationOtherCookies!==null){var v=cm_JSFPMigrationOtherCookies.split(","),y,u,A,x;for(u=0;u<v.length;++u){y=v[u];if(p[y]!==undefined){A=cm_JSFPMigrationOtherCookiesExpireTimes[y];if(A){x=new Date();
x.setTime(x.getTime()+parseInt(A));x=x.toGMTString();}else{x=null;}CB(y,p[y],x,cm_JSFPCookieDomain);}}}}function cmJSFPMigrateLink(r,o){if(cm_JSFPCookieMigrate){var p=/:\/\/([a-z0-9_\-\.]+)/i.exec(r[o]),s,q,e,t,u,v,w,i;if(p){p=p[1];}if(p&&((p.indexOf(cm_JSFPCookieDomain)===-1)&&(r[o].toLowerCase().indexOf("javascript")!==0)&&((cm_JSFPMigrationDomainWhitelist!==null&&cmTextMatchList(p.toLowerCase(),cm_JSFPMigrationDomainWhitelist.split(",")))||(cm_JSFPMigrationDomainBlacklist!==null&&!(cmTextMatchList(p.toLowerCase(),cm_JSFPMigrationDomainBlacklist.split(","))))))||(cm_JSFPMigrationPathWhitelist!==null&&cmTextMatchList(r[o].toLowerCase(),cm_JSFPMigrationPathWhitelist.split(",")))){if(cm_JSFEnabled){s=cI(cm_JSFCoreCookieName);
if(s){s=s.split("&",2)[0];}q=cm_ClientID.split(";");e="";for(t=0;t<q.length;++t){e+="&"+cmJSFCreateSessionMigrationParamName(q[t])+"="+cmJSFGetSessionLoginCookieValue(q[t]);}r[o]+=(r[o].indexOf("?")>-1?"&":"?")+cm_JSFPCookieMigrateVisitorID+"="+s+e;}if(cm_JSFPMigrationOtherCookies!==null){v=cm_JSFPMigrationOtherCookies.split(",");
w="";for(u=0;u<v.length;++u){i=cI(v[u]);if(i){w+="&cm_mc_"+v[u]+"="+i;}}w=(r[o].indexOf("?")>-1?"&":"?")+w.substring(1);r[o]+=w;}}}}function cmTextMatchList(e,f){for(var d=0;d<f.length;++d){if(e.indexOf(f[d])>-1){return true;}}return false;}_cm.prototype.calculateTopLineAndReturnSegments=function cmCalculateTopLineAndReturnSegments(){var V=[];
var U=_cmPartnerUtils.getContactCookieValues();var R=new Ctck();var H="";if(document.referrer){H=document.referrer;}var Q="";if(window.location.href){Q=window.location.href;}var i=false;for(var N in _cm_CMRules){if(_cm_CMRules.hasOwnProperty(N)){i=true;break;}}var Y=typeof(CM_DDX.notifySegmentProcessor)==="function";
if(!i&&Y){_cm_CMRules[CM_DDX.cVA]={cid:CM_DDX.cVA,segmentRules:[],tags:[],segments:[]};i=true;}for(var k in _cm_CMRules){var J=_cm_CMRules[k];if(typeof(J)!="object"||typeof(J.cid)=="undefined"){continue;}if(!this.topline[J.cid]){this.topline[J.cid]={};}this.topline[J.cid].pgct=U.getPgCt(J.cid);this.topline[J.cid].osshct=U.getOsshCt(J.cid);
this.topline[J.cid].orders=U.getOrders(J.cid);this.topline[J.cid].sales=U.getSales(J.cid);this.topline[J.cid].itcartct=U.getItCartCt(J.cid);this.topline[J.cid].itpurct=U.getItPurCt(J.cid);this.topline[J.cid].pvct=U.getPvCt(J.cid);this.topline[J.cid].evpts=U.getEvPts(J.cid);this.topline[J.cid].evcomct=U.getEvComCt(J.cid);
this.topline[J.cid].evinict=U.getEvIniCt(J.cid);this.topline[J.cid].elvct=U.getElvCt(J.cid);var s=true;if(U.getFpFlag(J.cid)){s=false;}else{__cm_firstPageFlag=true;}this.topline[J.cid].startTime=U.getStTime(J.cid);if(this.topline[J.cid].startTime==0){this.topline[J.cid].startTime=((new Date()).getTime()/1000)|0;
}this.topline[J.cid].slen=(((new Date()).getTime()/1000)|0)-this.topline[J.cid].startTime;this.topline[J.cid].n_r="";this.topline[J.cid].mkchnl="";this.topline[J.cid].mkpgm="";this.topline[J.cid].mkv="";this.topline[J.cid].mkc="";this.topline[J.cid].mkp="";this.topline[J.cid].mki="";this.topline[J.cid].cmguid="";
this.topline[J.cid].natscheng="";this.topline[J.cid].natschtm="";this.topline[J.cid].refurl="";this.topline[J.cid].refsite="";this.topline[J.cid].enpg="";if(s){this.topline[J.cid].mkchnl=(new Crur()).DIRECT_LOAD_CHANNEL;if(this.pn){this.topline[J.cid].enpg=this.pn;}this.topline[J.cid].n_r="NEW";if(!_cm_isNew){this.topline[J.cid].n_r="REPEAT";
}var Z=_cmPartnerUtils.parseVCPI(Q);if(!Z){Z=_cmPartnerUtils.parseVCPI(H);}var r=_cmPartnerUtils.parseReferralURL(H);if(Z&&Z.length>0){this.topline[J.cid].mkchnl=r.MARKETING_PROGRAMS;this.topline[J.cid].mkpgm=Z[0];this.topline[J.cid].mkv=Z[1];this.topline[J.cid].mkc=Z[2];this.topline[J.cid].mkp=Z[3];
this.topline[J.cid].mki=Z[4];this.topline[J.cid].cmguid=Z[5];}else{this.topline[J.cid].mkchnl=r.channel;}this.topline[J.cid].refsite=r.refName;this.topline[J.cid].natscheng=r.natSearchEngine;this.topline[J.cid].natschtm=r.natSearchWord;this.topline[J.cid].refurl=H;}if(typeof(__cm_firstPageFlag)!="undefined"&&__cm_firstPageFlag&&!this.topline[J.cid].enpg&&this.pn){this.topline[J.cid].enpg=this.pn;
}this.topline[J.cid].tzloc="";var X=new Date(2009,0,15);var S=Math.floor(X.getTimezoneOffset()/60);if(S==8){this.topline[J.cid].tzloc="LOS ANGELES";}else{if(S==7){this.topline[J.cid].tzloc="DENVER";}else{if(S==6){this.topline[J.cid].tzloc="CHICAGO";}else{if(S==5){this.topline[J.cid].tzloc="NEW YORK";
}}}}if(this.tid!=1){if(this.tid==6||(this.pc&&(this.pc.indexOf("y")==0||this.pc.indexOf("Y")==0))){this.topline[J.cid].pgct++;if(this.se&&this.se.replace(/^\s*/,"").replace(/\s*$/,"")){this.topline[J.cid].osshct++;}}}if(this.tid=="1"){this.topline[J.cid].pgct++;if(this.se&&this.se.replace(/^\s*/,"").replace(/\s*$/,"")){this.topline[J.cid].osshct++;
}}else{if(this.tid=="3"){this.topline[J.cid].orders++;if(this.tr&&parseFloat(this.tr)!=NaN){this.topline[J.cid].sales+=parseFloat(this.tr);}}else{if(this.tid=="4"){if(this.at&&this.at=="5"&&this.qt&&parseFloat(this.qt)!=NaN){this.topline[J.cid].itcartct+=parseFloat(this.qt);}if(this.at&&this.at=="9"&&this.qt&&parseFloat(this.qt)!=NaN){this.topline[J.cid].itpurct+=parseFloat(this.qt);
}}else{if(this.tid=="5"){this.topline[J.cid].pvct++;}else{if(this.tid=="14"){if(this.cpt&&parseFloat(this.cpt)!=NaN){this.topline[J.cid].evpts+=parseFloat(this.cpt);}if(this.cat&&this.cat=="2"){this.topline[J.cid].evcomct++;}if(this.cat&&this.cat=="1"){this.topline[J.cid].evinict++;}}else{if(this.tid=="15"){this.topline[J.cid].elvct++;
}}}}}}R.setPgCt(J.cid,this.topline[J.cid].pgct);R.setOsshCt(J.cid,this.topline[J.cid].osshct);R.setOrders(J.cid,this.topline[J.cid].orders);R.setSales(J.cid,this.topline[J.cid].sales);R.setItCartCt(J.cid,this.topline[J.cid].itcartct);R.setItPurCt(J.cid,this.topline[J.cid].itpurct);R.setPvCt(J.cid,this.topline[J.cid].pvct);
R.setEvPts(J.cid,this.topline[J.cid].evpts);R.setEvComCt(J.cid,this.topline[J.cid].evcomct);R.setEvIniCt(J.cid,this.topline[J.cid].evinict);R.setElvCt(J.cid,this.topline[J.cid].elvct);R.setFpFlag(J.cid,"1");R.setStTime(J.cid,this.topline[J.cid].startTime);}for(var k in _cm_CMRules){var J=_cm_CMRules[k];
if(typeof(J)!="object"||typeof(J.cid)=="undefined"){continue;}if(Y&&CM_DDX.cVA==J.cid){CM_DDX.notifySegmentProcessor(this,this.topline[J.cid]);}var T=U.getSegRulesMet(J.cid);for(var e=0;e<J.segmentRules.length;e++){var I=J.segmentRules[e];if(T.indexOf(I.id+"_")==0||T.indexOf("_"+I.id+"_")!=-1){continue;
}var aa=false;try{aa=I.fn(this,this.topline[J.cid]);}catch(K){}if(aa){T+=I.id+"_";}}R.setSegRulesMet(J.cid,T);var L=U.getSegsMet(J.cid);for(var M=0;M<J.segments.length;M++){var W=J.segments[M];if(L.indexOf(W.id+"_")==0||L.indexOf("_"+W.id+"_")!=-1){continue;}var P=true;for(var G=0;G<W.rules.length;G++){var O=W.rules[G];
if(!(T.indexOf(O+"_")==0||T.indexOf("_"+O+"_")!=-1)){P=false;break;}}if(P){if(!V[J.cid]){V[J.cid]="";}V[J.cid]+=W.id+"_";L+=W.id+"_";}}R.setSegsMet(J.cid,L);}if(i){_cmPartnerUtils.setContactCookieValues(R);}return V;};_cmPartnerUtils.calculateAndSendATData=function(h){var f=h.calculateTopLineAndReturnSegments();
var g=_cmPartnerUtils.cmGetPartnerRequestArray(h,f);for(var e=0;e<g.length;e++){c9(g[e]);}};_cmPartnerUtils.loadScript=function(e){if(cm_UseDOMScriptLoad){try{var f=cG6.getElementsByTagName("head").item(0);var g=cG6.createElement("script");g.setAttribute("language","javascript");g.setAttribute("type","text/javascript");
g.setAttribute("src",e);f.appendChild(g);}catch(h){}}else{cG6.write('<script language="javascript1.1" src="'+e+'"><\/script>');}};_cmPartnerUtils.cmGetPartnerRequestArray=function(T,S){var L=[];if(!T.ci){return L;}var s="";if(T.rf){s=T.rf;}else{if(document.referrer){s=document.referrer;}}var Q="";if(T.ul){Q=T.ul;
}else{if(window.location.href){Q=window.location.href;}}for(var I in _cm_CMRules){var t=_cm_CMRules[I];if(typeof(t)!="object"){continue;}if((T.ci+"").indexOf(t.cid+"")==-1){continue;}if(t.version>1001){continue;}var N=_cmPartnerUtils.getShuffledIndexArray(t.partners.length-1);for(var K=0;K<N.length;K++){var e=N[K];
var W=t.partners[e];if(e<0||e>=t.tags.length){continue;}var G=t.tags[e];var i=[];for(var P=0;P<G.length;P++){var M=G[P];if(M=="1"){if(T.tid=="1"||T.tid=="6"||(T.pc&&(T.pc.indexOf("y")==0||T.pc.indexOf("Y")==0))){var H=new Cptg(W.key,s,Q);H.tid="1";_cmPartnerUtils.copyTagParms(T,H,["pi","pn","cg","pv_a1","pv_a2","pv_a3","pv_a4","pv_a5","pv_a6","pv_a7","pv_a8","pv_a9","pv_a10","pv_a11","pv_a12","pv_a13","pv_a14","pv_a15"]);
i.push(H);}}else{if(M=="2"){if(T.tid=="5"){var H=new Cptg(W.key,s,Q);H.tid="2";_cmPartnerUtils.copyTagParms(T,H,["pr","pm","cg","pr_a1","pr_a2","pr_a3","pr_a4","pr_a5","pr_a6","pr_a7","pr_a8","pr_a9","pr_a10","pr_a11","pr_a12","pr_a13","pr_a14","pr_a15"]);i.push(H);}}else{if(M=="3"){if(T.tid=="4"&&T.at&&T.at=="5"){var H=new Cptg(W.key,s,Q);
H.tid="3";_cmPartnerUtils.copyTagParms(T,H,["pr","pm","cg","qt","bp",["s_a1","pr_a1"],["s_a2","pr_a2"],["s_a3","pr_a3"],["s_a4","pr_a4"],["s_a5","pr_a5"],["s_a6","pr_a6"],["s_a7","pr_a7"],["s_a8","pr_a8"],["s_a9","pr_a9"],["s_a10","pr_a10"],["s_a11","pr_a11"],["s_a12","pr_a12"],["s_a13","pr_a13"],["s_a14","pr_a14"],["s_a15","pr_a15"]]);
i.push(H);}}else{if(M=="4"){if(T.tid=="4"&&T.at&&T.at=="9"){var H=new Cptg(W.key,s,Q);H.tid="4";_cmPartnerUtils.copyTagParms(T,H,["pr","pm","cg","qt","bp",["s_a1","pr_a1"],["s_a2","pr_a2"],["s_a3","pr_a3"],["s_a4","pr_a4"],["s_a5","pr_a5"],["s_a6","pr_a6"],["s_a7","pr_a7"],["s_a8","pr_a8"],["s_a9","pr_a9"],["s_a10","pr_a10"],["s_a11","pr_a11"],["s_a12","pr_a12"],["s_a13","pr_a13"],["s_a14","pr_a14"],["s_a15","pr_a15"]]);
H.tr=T.tr;H.on=T.on;i.push(H);}}else{if(M=="5"){if(T.tid=="3"){var H=new Cptg(W.key,s,Q);H.tid="5";_cmPartnerUtils.copyTagParms(T,H,["on",["tr","ov"],"ct","sa","zp","o_a1","o_a2","o_a3","o_a4","o_a5","o_a6","o_a7","o_a8","o_a9","o_a10","o_a11","o_a12","o_a13","o_a14","o_a15"]);i.push(H);}}else{if(M=="6"){if(T.topline[t.cid]&&T.topline[t.cid].natscheng){var H=new Cptg(W.key,s,Q);
H.tid="6";H.en=T.topline[t.cid].natscheng;H.se=T.topline[t.cid].natschtm;if(T.topline[t.cid].mkchnl==(new Crur()).MARKETING_PROGRAMS){H.st="PAID";}else{H.st="NATURAL";}i.push(H);}else{if(T.tid=="1"||T.tid=="6"||(T.pc&&(T.pc.indexOf("y")==0||T.pc.indexOf("Y")==0))){if(T.se&&T.se.replace(/^\s*/,"").replace(/\s*$/,"")){var H=new Cptg(W.key,s,Q);
H.tid="6";H.en="ONSITE";H.se=T.se;H.sr=T.sr;i.push(H);}}}}else{if(M=="7"){if(T.tid=="14"){var H=new Cptg(W.key,s,Q);H.tid="7";_cmPartnerUtils.copyTagParms(T,H,[["cid","eid"],["ccid","cat"],["cat","at"],"cpt","c_a1","c_a2","c_a3","c_a4","c_a5","c_a6","c_a7","c_a8","c_a9","c_a10","c_a11","c_a12","c_a13","c_a14","c_a15"]);
i.push(H);}}}}}}}}}if(W.type=="I"){for(var R=0;R<i.length;R++){var X=_cmPartnerUtils.cmGetImgSrc_Partner(i[R],W);L.push(X);}}else{if(W.type=="S"){for(var R=0;R<i.length;R++){if(W.callbackFunctionSet){try{W._cm_ConnectCallback(i[R]);}catch(E){var F=new Cpse(t.cid+"",Q,R);var V=_cmPartnerUtils.cmGetImgSrc_CMError(F);
L.push(V);}}else{if(!_cmPartnerUtils.AT_PartnerCallQueue[W.pid]){_cmPartnerUtils.AT_PartnerCallQueue[W.pid]=[];}_cmPartnerUtils.AT_PartnerCallQueue[W.pid].push(i[R]);}}}}}var Y=S[t.cid];if(Y){for(var O=0;O<t.segments.length;O++){var U=t.segments[O];if(Y.indexOf(U.id)!=-1){var H=new Cptg("",s,Q);H.tid="99";
H.sid=U.id;var J=_cmPartnerUtils.getShuffledIndexArray(U.p.length-1);for(var K=0;K<J.length;K++){var e=J[K];if(U.p[e]<0||U.p[e]>=t.partners.length){continue;}var W=t.partners[U.p[e]];H.ckey=W.key;if(W.type=="I"){var X=_cmPartnerUtils.cmGetImgSrc_Partner(H,W);L.push(X);}else{if(W.type=="S"){if(W.callbackFunctionSet){try{W._cm_ConnectCallback(H);
}catch(E){var F=new Cpse(t.cid+"",Q,e);var V=_cmPartnerUtils.cmGetImgSrc_CMError(F);L.push(V);}}else{if(!_cmPartnerUtils.AT_PartnerCallQueue[W.pid]){_cmPartnerUtils.AT_PartnerCallQueue[W.pid]=[];}_cmPartnerUtils.AT_PartnerCallQueue[W.pid].push(H);}}}}}}}}return L;};_cmPartnerUtils.copyTagParms=function(h,g,i){for(var k=0;
k<i.length;k++){var f=typeof(i[k]);if(f=="string"){g[i[k]]=h[i[k]];}else{if(f=="object"){g[i[k][1]]=h[i[k][0]];}}}};_cmPartnerUtils.cmGetImgSrc_Partner=function(g,h){var f=_cmPartnerUtils.cmGetQueryStringForTag_Partner(g);var e=null;if(C8(null)=="https:"){e=new _cmCQ("https:",h.surl.indexOf("://")==-1?h.surl:h.surl.substring(h.surl.indexOf("://")+3),f);
}else{e=new _cmCQ("http:",h.url.indexOf("://")==-1?h.url:h.url.substring(h.url.indexOf("://")+3),f);}return e;};_cmPartnerUtils.cmGetImgSrc_CMError=function(f){var e=_cmPartnerUtils.cmGetQueryStringForTag_Partner(f);var d=null;if(C8(null)=="https:"){d=new _cmCQ("https:",cm_HOST,e);}else{d=new _cmCQ("http:",cm_HOST,e);
}return d;};_cmPartnerUtils.cmGetQueryStringForTag_Partner=function(d){var e="";if(d.tid){e+="tid="+d.tid;}for(var f in d){if(!d[f]||d[f]==""||d[f].constructor==Function||f=="tid"){continue;}if(e!=""){e+="&";}e+=cD(f)+"="+cE(cD(d[f]));}return e;};_cmPartnerUtils.setContactRule=function(o){var k=o.cid;
_cm_CMRules[k]=o;for(var l=0;l<o.partners.length;l++){var n=o.partners[l];if(n.type=="S"){n._cm_ConnectCallback=function m(){};n.callbackFunctionSet=false;var i=n.url;if(C8(null)=="https:"){i=n.surl;}i=i.indexOf("://")==-1?i:i.substring(i.indexOf("://")+3);_cmPartnerUtils.loadScript(C8(null)+"//"+i);
}}_cmPartnerUtils.AT_RulesSet=true;if(_cm_NRSet){for(var h=0;h<_cmPartnerUtils.AT_TagQueue.length;h++){_cmPartnerUtils.calculateAndSendATData(_cmPartnerUtils.AT_TagQueue[h]);}_cmPartnerUtils.AT_TagQueue=[];}};function _cm_registerCallback(m,k){if(!m){return;}if(typeof(k)!="function"){return;}for(var e in _cm_CMRules){var i=_cm_CMRules[e];
if(typeof(i)!="object"||typeof(i.cid)=="undefined"){continue;}for(var n=0;n<i.partners.length;n++){var p=i.partners[n];if(p.pid==m&&!p.callbackFunctionSet){p._cm_ConnectCallback=k;p.callbackFunctionSet=true;if(_cmPartnerUtils.AT_PartnerCallQueue[p.pid]){for(var q=0;q<_cmPartnerUtils.AT_PartnerCallQueue[p.pid].length;
q++){try{p._cm_ConnectCallback(_cmPartnerUtils.AT_PartnerCallQueue[p.pid][q]);}catch(o){}}_cmPartnerUtils.AT_PartnerCallQueue[p.pid]=[];}}}}}function cmSetNRFlag(c){if(_cm_NRSet){return;}if(c){_cm_isNew=false;}_cm_NRSet=true;if(_cmPartnerUtils.AT_RulesSet){for(var d=0;d<_cmPartnerUtils.AT_TagQueue.length;
d++){_cmPartnerUtils.calculateAndSendATData(_cmPartnerUtils.AT_TagQueue[d]);}_cmPartnerUtils.AT_TagQueue=[];}}_cmPartnerUtils.getContactCookieValues=function(){var o=1;var m=new Ctck();var r=cI("CoreAt");if(!r){return m;}var p=r.split("&");var i,n,s,u;for(var q=0;q<p.length;q++){i=p[q];u=i.indexOf("=");
if(u!=-1){var n=i.substring(0,u);var s=null;if(i.length>u+1){s=i.substring(u+1);}if(n&&s){var t=unescape(s).split(/\|/);if(t&&t.length>0){if(t[0]&&parseInt(t[0])<=o){if(t[1]){m.setPgCt(n,t[1]);}if(t[2]){m.setOsshCt(n,t[2]);}if(t[3]){m.setOrders(n,t[3]);}if(t[4]){m.setSales(n,t[4]);}if(t[5]){m.setItCartCt(n,t[5]);
}if(t[6]){m.setItPurCt(n,t[6]);}if(t[7]){m.setPvCt(n,t[7]);}if(t[8]){m.setEvPts(n,t[8]);}if(t[9]){m.setEvComCt(n,t[9]);}if(t[10]){m.setEvIniCt(n,t[10]);}if(t[11]){m.setElvCt(n,t[11]);}if(t[12]){m.setFpFlag(n,t[12]);}if(t[13]){m.setStTime(n,t[13]);}if(t[14]){m.setSegRulesMet(n,t[14]);}if(t[15]){m.setSegsMet(n,t[15]);
}}}}}}return m;};_cmPartnerUtils.setContactCookieValues=function(e){var f=1;var h="";for(var g in e.holder){if(g.length!=8||typeof(e.holder[g])=="function"){continue;}h+=g+"="+f+"|"+e.getPgCt(g)+"|"+e.getOsshCt(g)+"|"+e.getOrders(g)+"|"+e.getSales(g)+"|"+e.getItCartCt(g)+"|"+e.getItPurCt(g)+"|"+e.getPvCt(g)+"|"+e.getEvPts(g)+"|"+e.getEvComCt(g)+"|"+e.getEvIniCt(g)+"|"+e.getElvCt(g)+"|"+e.getFpFlag(g)+"|"+e.getStTime(g)+"|"+e.getSegRulesMet(g)+"|"+e.getSegsMet(g)+"&";
}CB("CoreAt",h,"",cm_JSFPCookieDomain);};_cmPartnerUtils.parseReferralURL=function(D){var E=new Crur();if(!D){return E;}var C=this.extractDomainName(D);if(C.getPartsCount()==0){return E;}if(C.url.search(/^[0-9]+(\.[0-9]+){3}$/)>=0){E.channel=E.REFERRAL_CHANNEL;E.refName=C.url;return E;}var w=[["GOOGLE.COM","q"],["YAHOO.COM","SEARCH.YAHOO.COM","p"],["MSN.COM","SEARCH.MSN.COM",["q","MT"]],["AOL.COM","SEARCH.AOL.COM",["aps_terms","query","encquery","q"]],["AOL.COM",["AOLSEARCH.AOL.COM","AOLSEARCHT.AOL.COM"],"query"],["ASK.COM",["q","ask"]],["ASK.COM",["ASKGEEVES.COM","ASKJEEVES.COM","ASKJEEVS.COM"],"ask"],["BING.COM","q"],["LYCOS.COM","HOTBOT.LYCOS.COM","MT"],["LYCOS.COM","query"],["ALTAVISTA.COM","q"],["ALTAVISTA.COM",["PARTNERS.ALTAVISTA.COM","ALTA-VISTA.COM"],"q"],["NETSCAPE.COM","SEARCH.NETSCAPE.COM",["search","query"]],["WEBSEARCH.CNN.COM","query"],["LOOKSMART.COM","key"],["ABOUT.COM","terms"],["MAMMA.COM","query="],["ALLTHEWEB.COM",["query","q"]],["VOILA.COM","kw"],["VIRGILIO.IT","SEARCH.VIRGILIO.IT","qs"],["LIVE.COM","SEARCH.LIVE.COM","q"],["BAIDU.COM",["word","wd"]],["SEARCH.ALICE.IT","qs"],["YANDEX.RU","text"],["CLUB-INTERNET.FR","q"],["SEARCH.SEZNAM.CZ","q"],["SEARCH.SEZNAM.CZ","w"],["SEARCH.COM",["q","what","QUERY","OLDQUERY"]],["SEARCH.YAM.COM","k"],["GOOGLE.PCHOME.COM.TW","q"]];
var y=[];for(var v=C.getPartsCount();y.length==0&&v>=2;v--){var t=C.getLast(v);for(var x=0;x<w.length;x++){var k=w[x];var u=(k.length>2)?k[1]:k[0];u=(typeof(u)=="string")?[u]:u;for(var z=0;z<u.length;z++){if(u[z]==t){y.push(k);}}}}if(y.length>0){E.channel=E.NATURAL_SEARCH_CHANNEL;E.natSearchEngine=y[0][0];
E.refName=C.url;for(var v=0;v<y.length;v++){var k=y[v];var A=(k.length>2)?k[2]:k[1];var A=(typeof(A)=="string")?[A]:A;for(var x=0;x<A.length;x++){var a=new RegExp("[&?]"+A[x]+"=([^&]+)");var i=D.match(a);if(i){var B=_cmPartnerUtils.urlDecode(i[1]);if(B.search(/^[^a-zA-Z0-9]*$/)==-1){E.natSearchWord=B.replace(/\+/g," ");
break;}}}}}else{E.channel=E.REFERRAL_CHANNEL;E.refName=C.url;}return E;};_cmPartnerUtils.urlDecode=function(d){if(typeof(decodeURIComponent)=="function"){try{return decodeURIComponent(d);}catch(c){}}return unescape(d);};_cmPartnerUtils.extractDomainName=function(k){var a=k.match(/:\/*([^\/\?]+)/);var h=a?a[1]:"";
h=h.toUpperCase();a=h.match(/^(?:WWW\d*\.)?([^:]+)/);if(a){h=a[1];}var i=h.length-1;var g=h.lastIndexOf(".");if(g==-1){return new Cspd();}else{if(g==i){h=h.substring(0,i);}}return new Cspd(h);};_cmPartnerUtils.parseVCPI=function(k){if(!k){return"";}var n=k.match(/[&?]cm_mmc(_o)?=([^&]+)/);if(!n){return"";
}var a=n[1]?deObfuscate(n[2]):n[2];var b=a.split(/\-_\-|\*/);if(!b||b.length!=4){return"";}var l=b[3].indexOf("|-|");if(l!=-1){b[3]=b[3].substring(0,l);}b[0]=_cmPartnerUtils.urlDecode(b[0]).replace(/\+/g," ");b[1]=_cmPartnerUtils.urlDecode(b[1]).replace(/\+/g," ");b[2]=_cmPartnerUtils.urlDecode(b[2]).replace(/\+/g," ");
b[3]=_cmPartnerUtils.urlDecode(b[3]).replace(/\+/g," ");var o=k.match(/[&?]cm_guid=([^&]+)/);var m=(o&&o[1])?_cmPartnerUtils.urlDecode(o[1]):"";return[b[0]+"*"+b[1]+"*"+b[2]+"*"+b[3],b[0],b[1],b[2],b[3],m];};_cmPartnerUtils.deObfuscate=function(c){if(!c){return"";}var i="-P2KHd7ZG3s14WRVhqmaJe8rQUz_gpwuTtbXLkFEB56ylfAMc0YOCjvnNSDxIo9i";
var v="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_1234567890";var A=45;var s=122;var y=[];for(var w=0;w<i.length;w++){var r=i.charCodeAt(w);y[r-45]=v.charAt(w);}var e="";try{for(var w=0;w<c.length;w++){var t=c.charAt(w);var z=c.charCodeAt(w);if(z<A||z>s){e+=t;}else{var x=y[z-45];if(x==null){e+=t;
}else{e+=x;}}}}catch(u){}return e;};_cmPartnerUtils.getShuffledIndexArray=function(k){var h=[];for(var f=0;f<=k;f++){h.push(f);}for(var f=0;f<h.length;f++){var i=Math.floor(Math.random()*(h.length));var g=h[f];h[f]=h[i];h[i]=g;}return h;};_cmPartnerUtils.startsWith=function(d,c){return(d.toUpperCase().indexOf(c)==0);
};_cmPartnerUtils.endsWith=function(d,c){return((d.toUpperCase().lastIndexOf(c)!=-1)&&(d.toUpperCase().lastIndexOf(c)+c.length==d.length));};_cmPartnerUtils.contains=function(d,c){return(d.toUpperCase().indexOf(c)!=-1);};function Ctck(){this.holder={};this.getIntValue=function(f,d){if(!this.holder[f]){return 0;
}var e=this.holder[f][d]?parseInt(this.holder[f][d]):0;e=(e==NaN)?0:e;return e;};this.getFloatValue=function(f,d){if(!this.holder[f]){return 0;}var e=this.holder[f][d]?parseFloat(this.holder[f][d]):0;e=(e==NaN)?0:e;return e;};this.getStringValue=function(c,d){if(!this.holder[c]){return"";}return this.holder[c][d]?this.holder[c][d]:"";
};this.setFloatValue=function(f,e,d){if(!this.holder[f]){this.holder[f]={};}if(e&&d&&parseFloat(d)!=NaN){if(typeof(d)=="number"){this.holder[f][e]=d.toFixed(2)+"";}else{this.holder[f][e]=d;}}};this.setIntValue=function(f,e,d){if(!this.holder[f]){this.holder[f]={};}if(e&&d&&parseInt(d)!=NaN){this.holder[f][e]=d+"";
}};this.setStringValue=function(f,e,d){if(!this.holder[f]){this.holder[f]=[];}if(e&&d){this.holder[f][e]=d;}};this.getPgCt=function(b){return this.getIntValue(b,"pgct");};this.setPgCt=function(c,d){this.setIntValue(c,"pgct",d);};this.getOsshCt=function(b){return this.getIntValue(b,"osshct");};this.setOsshCt=function(c,d){this.setIntValue(c,"osshct",d);
};this.getOrders=function(b){return this.getIntValue(b,"orders");};this.setOrders=function(c,d){this.setIntValue(c,"orders",d);};this.getSales=function(b){return this.getFloatValue(b,"sales");};this.setSales=function(c,d){this.setFloatValue(c,"sales",d);};this.getItCartCt=function(b){return this.getFloatValue(b,"itcartct");
};this.setItCartCt=function(c,d){this.setFloatValue(c,"itcartct",d);};this.getItPurCt=function(b){return this.getFloatValue(b,"itpurct");};this.setItPurCt=function(c,d){this.setFloatValue(c,"itpurct",d);};this.getPvCt=function(b){return this.getIntValue(b,"pvct");};this.setPvCt=function(c,d){this.setIntValue(c,"pvct",d);
};this.getEvPts=function(b){return this.getFloatValue(b,"evpts");};this.setEvPts=function(c,d){this.setFloatValue(c,"evpts",d);};this.getEvIniCt=function(b){return this.getIntValue(b,"evinict");};this.setEvIniCt=function(c,d){this.setIntValue(c,"evinict",d);};this.getEvComCt=function(b){return this.getIntValue(b,"evcomct");
};this.setEvComCt=function(c,d){this.setIntValue(c,"evcomct",d);};this.getElvCt=function(b){return this.getIntValue(b,"elvct");};this.setElvCt=function(c,d){this.setIntValue(c,"elvct",d);};this.getFpFlag=function(b){return this.getIntValue(b,"fp");};this.setFpFlag=function(c,d){this.setIntValue(c,"fp",d);
};this.getStTime=function(b){return this.getIntValue(b,"st");};this.setStTime=function(c,d){this.setIntValue(c,"st",d);};this.getSegRulesMet=function(b){return this.getStringValue(b,"segrules");};this.setSegRulesMet=function(c,d){this.setStringValue(c,"segrules",d);};this.getSegsMet=function(b){return this.getStringValue(b,"segs");
};this.setSegsMet=function(c,d){this.setStringValue(c,"segs",d);};}function Cpse(f,e,d){this.ci=f;this.tid="21";this.ul=(e)?e:"";this.pindex=d;}function Cptg(f,d,e){this.ckey=(f)?f:"";this.rf=(d)?d:"";this.ul=(e)?e:"";}function Crur(){this.DIRECT_LOAD_CHANNEL="DIRECT LOAD";this.REFERRAL_CHANNEL="REFERRING SITES";
this.NATURAL_SEARCH_CHANNEL="NATURAL SEARCH";this.MARKETING_PROGRAMS="MARKETING PROGRAMS";this.DIRECT_LOAD_REFERRAL_NAME="DL";this.channel=this.DIRECT_LOAD_CHANNEL;this.refName=this.DIRECT_LOAD_REFERRAL_NAME;this.natSearchEngine="";this.natSearchWord="";}function Cspd(b){this.url=(b)?b:"";this.splitUrl=this.url.split(".");
this.getPartsCount=function(){return this.splitUrl.length;};this.getLast=function(f){var a="";for(var e=f;e>=1;e--){if(this.splitUrl.length>=e){if(a){a+=".";}a+=this.splitUrl[this.splitUrl.length-e];}}return a;};}function cmCheckIEReady(){if(document.readyState=="complete"){cmOnDomReady();}}function cmOnDomReady(){if(!CM_DDX.domReadyFired){CM_DDX.domReadyFired=true;
CM_DDX.invokeFunctionWhenAvailable(function(){__$dispatcher.domReady();});}}var coremetrics=(function(){var c="undefined",d="function";return{cmLoad:cmLoad,cmLastReferencedPageID:null,isDef:function(a){return typeof(a)!==c&&a;},cmUpdateConfig:function(b){var a=coremetrics.isDef;if(a(b.io)){cm_IOEnabled=b.io;
}if(a(b.ia)){cm_OffsiteImpressionsEnabled=b.ia;}if(a(b.at)){cm_ATEnabled=b.at;}if(a(b.mc)){cm_MCEnabled=b.mc;}if(a(b.ddx)&&a(b.ddx.version)){CM_DDX.version=b.ddx.version;if(a(b.ddx.standalone)){CM_DDX.standalone=b.ddx.standalone;}}},getTechProps:function(i){var k,b=i||{},a=navigator,l=window.screen,m;
b.jv=(typeof(Array.isArray)===d)?"1.8.5":(typeof([].reduce)===d)?"1.8":(typeof(Iterator)===d)?"1.7":(typeof(Array.forEach)===d)?"1.6":(typeof(decodeURI)===d)?"1.5":(typeof(NaN)==="number")?"1.3":(typeof(isFinite)===d)?"1.2":(typeof(isNaN)===d)?"1.1":"1.0";if(a.plugins){m=a.plugins;for(k=0;k<m.length;
k++){b["np"+k]=m[k].name;}}if(typeof(a.javaEnabled)===d){b.je=a.javaEnabled()?"y":"n";}b.sw=l.width;b.sh=l.height;b.pd=l.colorDepth;if(b.pd==0){b.pd=l.pixelDepth;}b.tz=new Date().getTimezoneOffset()/60;return b;}};})();var cm_exAttr=new Array();var cmCheckCMEMFlag=true;var cmAutoCopyAttributesToExtraFields=false;
var cmPricePattern=/[^\-0-9\.]/gi;var cmSpacePattern=/^\s+|\s+$/gi;var cmMMCPattern=/cm_(?:mmc|ven|cat|pla|ite)/gi;function cmLoadIOConfig(){if(typeof(IORequest)=="function"){IORequest.client_id=cm_ClientID.split(";")[0].split("|")[0];IORequest.encrypt_cats=true;IORequest.encrypt_prds=true;IORequest.conflict_resolution=true;
IORequest.max_prd_length=25;IORequest.max_cat_length=25;IORequest.timeout=[8000,4000];IORequest.use_site_category=false;if((IORequest.ie_version()!==null)&&(IORequest.ie_version()<7)){IORequest.a_max_elements=[3,3,5,3,3,3,3];}else{IORequest.a_max_elements=[3,3,5,3,3,7,7];}IORequest.required_attributes=[0,0,0,0,0];
IORequest.access_method="json remote";IORequest.default_product_file=undefined;}}function cmSetClientID(n,m,l,i,o){cm_PartnerDataClientIDs=cm_ClientID=n;if(typeof(IORequest)=="function"){IORequest.client_id=cm_ClientID.split(";")[0].split("|")[0];}cm_McClientID=cm_ClientID.split(";")[0].split("|")[0];
if(m===true){cm_JSFEnabled=true;}if(l){cm_HOST=cm_Production_HOST=l;if((l==="test.coremetrics.com")||(l==="testdata.coremetrics.com")){cm_Production_HOST="data.coremetrics.com";}cm_HOST+="/cm?";}if(i){cm_JSFPCookieDomain=i;}CM_DDX.cVA=cm_ClientID.split(";")[0].split("|")[0];if(!document.body&&CM_DDX.headScripts){document.write("<script src='",C8(null)+"//tmscdn.coremetrics.com/tms/"+CM_DDX.cVA+"/head"+(CM_DDX.test.doTest?"s-"+CM_DDX.test.testCounter:"")+".js?__t="+(CM_DDX.test.doTest?"0":(+new Date()))+"'><\/script>");
}var p=cm_ClientID.split(";");var q;for(var k=0;k<p.length;++k){q=p[k].split("|")[0];_cmPartnerUtils.loadScript(C8(null)+"//testlibs.coremetrics.com/configs/"+q+".js");}cmRetrieveUserID(cmSetNRFlag);}function cmSetupCookieMigration(s,r,q,i,z,y,u){if(s){cm_JSFPCookieMigrate=s;}if(r){cm_JSFPForceMigrateCookies=r;
}if(q){cm_JSFPMigrationDomainWhitelist=q;}if(i){cm_JSFPMigrationDomainBlacklist=i;}if(z){cm_JSFPMigrationPathWhitelist=z;}if(y){cm_JSFPMigrationOtherCookies=y;}if(u){cm_JSFPMigrationOtherCookiesExpireTimes=u;}if(cm_JSFPCookieMigrate){var t=cm_ClientID.split(";"),B={},v,w,C,x,A={};for(v=0;v<t.length;++v){C=cmExtractParameter(cmJSFCreateSessionMigrationParamName(t[v]),window.location.href);
if(C){B[t[v]]=C;}}if(cm_JSFPMigrationOtherCookies){x=cm_JSFPMigrationOtherCookies.split(",");for(w=0;w<x.length;++w){C=cmExtractParameter("cm_mc_"+x[w],window.location.href);if(C){A[x[w]]=C;}}}cmJSFPMigrateCookies(cmExtractParameter(cm_JSFPCookieMigrateVisitorID,window.location.href),B,A);}}var cmNormalizeBlackList,cmNormalizeWhiteList=null;
function cmSetupNormalization(d,f,e){if(d){cmNormalizeBlackList=d;}if(f){cmNormalizeWhiteList=f;}if(e){if(document.cmTagCtl!=null){document.cmTagCtl.normalizeURL=e;}}}function cmSetupOther(c){for(var d in c){window[d]=c[d];}}function cmSetCurrencyCode(b){cm_currencyCode=b;}function cmSetFirstPartyIDs(f,h){cm_JSFPCookieMigrate=true;
cm_JSFPForceMigrateCookies=true;var k=cm_ClientID.split(";");var i={};for(var g=0;g<k.length;++g){i[k[g]]=h;}cmJSFPMigrateCookies(f,i,null);}function cmCreateManualImpressionTag(g,h,f,i,k){if(!g){g=c1(cm_ClientID);}cmMakeTag(["tid","9","pi",g,"cm_sp",h,"cm_re",f,"cm_cr",i,"cm_me",k,"st",cm_ClientTS]);
}function cmCreateManualLinkClickTag(e,h,f){if(cM!=null){var g=new Date();cGK=g.getTime();e=cG7.normalizeURL(e,true);cM(cm_ClientTS,cGK,h,e,false,f);}}function cmCreateManualPageviewTag(i,l,m,n,q,p,o,k){cmMakeTag(["tid","1","pi",i,"cg",l,"ul",m,"rf",n,"se",p,"sr",o,"cmAttributes",q,"cmExtraFields",k]);
}function cmCreateElementTag(d,e,f){cmMakeTag(["tid","15","eid",d,"ecat",e,"cmAttributes",f]);}function cmCreatePageElementTag(m,g,h,i,k,l){cmCreateElementTag(m,g,l);}var cmCreateProductElementTag=cmCreatePageElementTag;function cmCreateConversionEventTag(l,m,i,k,g,h){cmMakeTag(["tid","14","cid",l,"cat",m,"ccid",i,"cpt",k,"cmAttributes",g,"cmExtraFields",h]);
}function cmCreateTechPropsTag(e,g,h,f){cmMakeTag(["tid","6","pi",e,"cg",g,"pc","Y","cmAttributes",h,"cmExtraFields",f]);}function cmCreatePageviewTag(g,i,l,k,m,h){cmMakeTag(["tid","1","pi",g,"cg",i,"se",l,"sr",k,"cmAttributes",m,"cmExtraFields",h]);}function cmCreateDefaultPageviewTag(b){cmCreatePageviewTag(cmGetDefaultPageID(),b);
}function cmCreateProductviewTag(l,i,k,m,g){var h=c1(cm_ClientID);cmMakeTag(["tid","5","pi",h?h:"Product: "+i+" ("+l+")","pr",l,"pm",i,"cg",k,"pc","N","cm_vc",g?g:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",m]);}(function(d){var e=[],f={};d.cmAddShop=function(c){var m=[c[1],c[9],c[11],c[13]].join("|"),a,b,l,o,n;
a=f[m];if(typeof(a)!=="undefined"){b=e[a];if(b){l=b[5];o=b[7];n=c[5];c[5]=parseInt(l)+parseInt(c[5]);c[7]=((c[7]*n)+(o*l))/c[5];e[a]=c;}}else{f[m]=e.length;e[e.length]=c;}};d.cmDisplayShop5s=d.cmDisplayShop9s=d.cmDisplayShops=function(){for(var b=0,a=e.length;b<a;b+=1){cmMakeTag(e[b]);}e=[];f={};};}(window));
function cmCreateShopAction5Tag(p,n,q,m,o,i,k){if((typeof(cm_currencyCode)=="undefined")||(!cm_currencyCode)){cm_currencyCode="";}m=m.toString().replace(cmPricePattern,"");p=p.toString().replace(cmSpacePattern,"");var l=""+(i?i+"|||":"")+(k?"extra"+k:"");cmAddShop(["pr",p,"pm",n,"qt",q,"bp",m,"cg",o,"cmAttributes",i,"cmExtraFields",k,"ha1",cm_hex_sha1(l),"cc",cm_currencyCode,"at","5","tid","4","pc","N"]);
}function cmCreateShopAction9Tag(p,n,w,o,u,r,v,q,t,m){if((typeof(cm_currencyCode)=="undefined")||(!cm_currencyCode)){cm_currencyCode="";}o=o.toString().replace(cmPricePattern,"");v=v.toString().replace(cmPricePattern,"");p=p.toString().replace(cmSpacePattern,"");var s=""+(t?t+"|||":"")+(m?"extra"+m:"");
cmAddShop(["pr",p,"pm",n,"qt",w,"bp",o,"cg",q,"cmAttributes",t,"cmExtraFields",m,"ha1",cm_hex_sha1(s),"cd",u,"on",r,"tr",v,"cc",cm_currencyCode,"at","9","tid","4","pc","N"]);}function cmCreateOrderTag(n,s,o,r,p,l,k,q,m){if((typeof(cm_currencyCode)=="undefined")||(!cm_currencyCode)){cm_currencyCode="";
}if(o){o=o.toString().replace(cmPricePattern,"");}s=s.toString().replace(cmPricePattern,"");cmMakeTag(["tid","3","on",n,"tr",s,"sg",o,"cd",r,"ct",p,"sa",l,"zp",k,"cc",cm_currencyCode,"cmAttributes",q,"cmExtraFields",m]);}function cmCreateRegistrationTag(m,l,k,i,n,o,h){cmMakeTag(["tid","2","cd",m,"em",l,"ct",k,"sa",i,"zp",n,"cy",o,"cmAttributes",h]);
}function cmCreateErrorTag(d,c){cmMakeTag(["tid","404","pi",d,"cg",c,"pc","Y"]);}function cmCreateCustomTag(d,c){cmMakeTag(["tid","7","li",d,"cmExtraFields",c]);}function cmMakeTag(r){var n=new _cm("vn2","e4.0"),q,u={1:"pv_a",2:"rg",3:"o_a",4:"s_a",5:"pr_a",6:"pv_a",14:"c_a",15:"e_a"},v={1:"pv",2:"rg",3:"or",4:"sx",5:"pr",6:"pv",7:"ps",14:"cx"},t="cmAttributes",o="cmExtraFields";
for(q=0;q<r.length;q+=2){n[r[q]]=r[q+1];}n.rnd=(Math.floor(Math.random()*11111111))+new Date().getTime();if(n.tid=="1"&&(cmCookiesDisabled()?cmAutoAddTP():(cI("cmTPSet")!="Y"))){n.tid="6";n.pc="Y";}if(n.tid=="6"){n.addTP();CB("cmTPSet","Y");}if(n.cm_exAttr){n[t]=n.cm_exAttr.join("-_-");n.cm_exAttr=null;
}function w(f,b,d){if(f[b]){var a=f[b].split("-_-"),e=d[f.tid],c;for(c=0;c<a.length;++c){f[e+(c+1)]=a[c];}f[b]=null;}}w(n,t,u);w(n,o,v);if(cmAutoCopyAttributesToExtraFields){if((n.tid!="2")&&(n.tid!="15")){for(q=1;q<=15;++q){if(!(n[v[n.tid]+""+q])){n[v[n.tid]+""+q]=n[u[n.tid]+""+q];}}}}if((n.pi==null)&&((n.pc=="Y")||(n.tid=="1"))){n.pi=cmGetDefaultPageID();
}if((n.pc=="Y")||(n.tid=="1")){coremetrics.cmLastReferencedPageID=n.pi;}else{if(coremetrics.cmLastReferencedPageID==null){coremetrics.cmLastReferencedPageID="NO_PAGEID";}}try{if(parent.cm_ref!=null){n.rf=parent.cm_ref;if(n.pc=="Y"){parent.cm_ref=document.URL;}}if(parent.cm_set_mmc){n.ul=document.location.href+((document.location.href.indexOf("?")<0)?"?":"&")+parent.cm_mmc_params;
if(n.pc=="Y"){parent.cm_ref=n.ul;parent.cm_set_mmc=false;}}}catch(s){}if(n.ul==null){n.ul=cG7.normalizeURL(window.location.href,false);}if(n.rf==null){n.rf=cG7.normalizeURL(document.referrer,false);}function i(a){return a.replace(cmMMCPattern,function(b){return b.toLowerCase();});}n.ul=i(n.ul);n.rf=i(n.rf);
if((this.manual_cm_mmc)&&(n.ul.indexOf("cm_mmc")==-1)&&(n.ul.indexOf("cm_ven")==-1)){n.ul=n.ul+((n.ul.indexOf("&")==-1)?((n.ul.indexOf("?")==-1)?"?":"&"):"&")+"cm_mmc="+this.manual_cm_mmc;}var p;if(cmCheckCMEMFlag){p=cmStartTagSet();}n.writeImg();if(cmCheckCMEMFlag){cmCheckCMEMFlag=false;cmCheckCMEM();
if(p){cmSendTagSet();}}if(typeof cm_ted_io=="function"){if(cm_IOEnabled){cm_ted_io(n);}}}function cmGetDefaultPageID(){var f=window.location.pathname;var h=f.indexOf("?");if(h!=-1){f=f.substr(0,h);}var i=f.indexOf("#");if(i!=-1){f=f.substr(0,i);}var g=f.indexOf(";");if(g!=-1){f=f.substr(0,g);}var k=f.lastIndexOf("/");
if(k==f.length-1){f=f+"default";}while(f.indexOf("/")==0){f=f.substr(1,f.length);}return(f);}function cmIndexOfParameter(c,d){return d.indexOf(c);}function cmExtractParameter(l,o){var q=null,p,i,m="&"+l+"=",k,n;p=o.indexOf("?");if(p>=0){i=o.indexOf("#");if(i<0){i=o.length;}o="&"+o.substring(p+1,i);k=o.indexOf(m);
if(k>=0){n=o.indexOf("&",k+1);if(n<0){n=o.length;}q=o.substring(k+m.length,n);}}return q;}function cmRemoveParameter(i,l){if(cmIndexOfParameter(i,l)==-1){return l;}var m=l;var g=m.indexOf(i);var k=(g-1);var h=m.indexOf("&",g);if(h==-1){h=m.length;}if(m.substring(k,g)=="?"){k=(k+1);h=(h+1);}return m.substring(0,k)+m.substring(h,m.length);
}function cmGetMetaTag(f){var e=document.getElementsBytagName("meta");for(var d in e){if(e[d].name==f){return e[d].content;}}return null;}function cmCheckCMEM(){var b,a,c,d=["cm_em","cm_lm","cm_lm_o"];for(b=0;b<d.length;b++){c=cmExtractParameter(d[b],document.location.href,true);if(c){if(b==2){cmMakeTag(["tid","2","cd_o",c,"em_o",c]);
}else{if(b==0){a=c.indexOf(":");if(a>-1){c=c.substring(a+1);}if(cmIndexOfParameter("VID",document.location.href)!=-1){var custID=cmExtractParameter("VID",document.location.href);cmCreateRegistrationTag(custID,c);}}else{a=c.indexOf(":");if(a>-1){c=c.substring(a+1);}cmCreateRegistrationTag(c,c);}}}}}if(defaultNormalize==null){var defaultNormalize=null;
}function myNormalizeURL(y,r){var s=y;if(!s){s="";}var o=cmNormalizeBlackList;var p=cmNormalizeWhiteList;if(o){if(r){o=o.split("-_-")[0].split(",");}else{if(o.split("-_-")[1]){o=o.split("-_-")[1].split(",");}else{o=null;}}}if(p){if(r){p=p.split("-_-")[0].split(",");}else{if(p.split("-_-")[1]){p=p.split("-_-")[1].split(",");
}else{p=null;}}}var x,w,i=s.indexOf("?"),q=[],t;if((i>0)&&(o||p)){x=s.substring(i+1);s=s.substring(0,i);w=x.split("&");if(o){for(var u=0;u<w.length;u++){t=true;for(var v=0;v<o.length;v++){if(w[u].toLowerCase().indexOf(o[v].toLowerCase()+"=")==0){t=false;}}if(t){q[q.length]=w[u];}}}if(p){for(var u=0;u<w.length;
u++){t=false;for(var v=0;v<p.length;v++){if(w[u].toLowerCase().indexOf(p[v].toLowerCase()+"=")==0){t=true;}}if(t){q[q.length]=w[u];}}}s+="?"+q.join("&");}if(defaultNormalize!=null){s=defaultNormalize(s,r);}return s;}if(document.cmTagCtl!=null){if((""+document.cmTagCtl.normalizeURL).indexOf("myNormalizeURL")==-1){defaultNormalize=document.cmTagCtl.normalizeURL;
document.cmTagCtl.normalizeURL=myNormalizeURL;}}var cm_hex_sha1=(function(){function t(a){return m(n(l(a),a.length*8));}function q(e){var c=0?"0123456789ABCDEF":"0123456789abcdef";var a="";var b;for(var d=0;d<e.length;d++){b=e.charCodeAt(d);a+=c.charAt((b>>>4)&15)+c.charAt(b&15);}return a;}function r(e){var a="";
var d=-1;var b,c;while(++d<e.length){b=e.charCodeAt(d);c=d+1<e.length?e.charCodeAt(d+1):0;if(55296<=b&&b<=56319&&56320<=c&&c<=57343){b=65536+((b&1023)<<10)+(c&1023);d++;}if(b<=127){a+=String.fromCharCode(b);}else{if(b<=2047){a+=String.fromCharCode(192|((b>>>6)&31),128|(b&63));}else{if(b<=65535){a+=String.fromCharCode(224|((b>>>12)&15),128|((b>>>6)&63),128|(b&63));
}else{if(b<=2097151){a+=String.fromCharCode(240|((b>>>18)&7),128|((b>>>12)&63),128|((b>>>6)&63),128|(b&63));}}}}}return a;}function l(a){var b=new Array(a.length>>2);for(var c=0;c<b.length;c++){b[c]=0;}for(var c=0;c<a.length*8;c+=8){b[c>>5]|=(a.charCodeAt(c/8)&255)<<(24-c%32);}return b;}function m(a){var b="";
for(var c=0;c<a.length*32;c+=8){b+=String.fromCharCode((a[c>>5]>>>(24-c%32))&255);}return b;}function n(f,H){f[H>>5]|=128<<(24-H%32);f[((H+64>>9)<<4)+15]=H;var d=new Array(80);var h=1732584193;var x=-271733879;var E=-1732584194;var F=271733878;var G=-1009589776;for(var e=0;e<f.length;e+=16){var b=h;var c=x;
var g=E;var i=F;var w=G;for(var k=0;k<80;k++){if(k<16){d[k]=f[e+k];}else{d[k]=o(d[k-3]^d[k-8]^d[k-14]^d[k-16],1);}var a=p(p(o(h,5),u(k,x,E,F)),p(p(G,d[k]),s(k)));G=F;F=E;E=o(x,30);x=h;h=a;}h=p(h,b);x=p(x,c);E=p(E,g);F=p(F,i);G=p(G,w);}return[h,x,E,F,G];}function u(a,b,c,d){if(a<20){return(b&c)|((~b)&d);
}if(a<40){return b^c^d;}if(a<60){return(b&c)|(b&d)|(c&d);}return b^c^d;}function s(a){return(a<20)?1518500249:(a<40)?1859775393:(a<60)?-1894007588:-899497514;}function p(b,c){var d=(b&65535)+(c&65535);var a=(b>>16)+(c>>16)+(d>>16);return(a<<16)|(d&65535);}function o(b,a){return(b<<a)|(b>>>(32-a));}return function(a){if(a){return q(t(r(a)));
}else{return null;}};})();var _io_request=new IORequest();var _io_config=undefined;var _io_zone=undefined;var _io_state=new IOState();function cm_ted_io(b){IORequest.log(IORequest.log_trace,"Processing tag: tid="+b.tid+", pr="+b.pr+", cg="+b.cg+", at="+b.at+", pi="+b.pi);_io_state.cm_ted_io(b);}function _cm_io_rec(b){if(_io_request!==undefined){_io_request.cm_io_rec(b);
}}function _cm_io_cfg(b){if(_io_request!==undefined){_io_request.cm_io_cfg(b,1);}}function _cm_io_ssp(b){if(_io_request!==undefined){_io_request.cm_io_ssp(b);}}function cmRecRequest(g,f,i,k,h){if(g===undefined){IORequest.log(IORequest.log_error,"cmRecRequest: Required zone id undefined.");}IORequest.rec_request(g,f,i,k,h);
}function cmPageRecRequest(f,e,g,h){if(f===undefined){IORequest.log(IORequest.log_error,"cmPageRecRequest: Required zone id undefined.");}IORequest.page_rec_request(f,e,g,h);}function cmElementRecRequest(f,e,g,h){if(f===undefined){IORequest.log(IORequest.log_error,"cmElementRecRequest: Required zone id undefined.");
}IORequest.element_rec_request(f,e,g,h);}function cmDisplayRecs(){IORequest.display_recs();}function cmGetTestGroup(b){return IORequest.ab_group_number;}function cmSetRegId(c,d){if((c===undefined)||(c=="")){IORequest.log(IORequest.log_error,"cmSetRegId: Required registration id is blank or undefined.");
}else{IORequest.setRegIdCalled=true;IORequest.ssp_reg_id=IORequest.encrypt16(c.toString());IORequest.log(IORequest.log_trace,"cmSetRegId",c+(d?","+d:"")+" - encryption of "+c+": "+IORequest.ssp_reg_id);IORequest.ssp_allow_flag=d;}}function cmSetSegment(b){IORequest.setSegmentCalled=true;if((b===undefined)||(b=="")){IORequest.log(IORequest.log_trace,"cmSetSegment: Segment is blank or undefined, segment will be removed from cookie");
IORequest.pf_segment="";}else{IORequest.pf_segment=IORequest.encrypt16(b.toString());IORequest.log(IORequest.log_trace,"cmSetSegment",b+" - encryption of "+b+": "+IORequest.pf_segment);}}function IORequest(p_default_json){var g_config_filename="io_config.js";var g_version="V4";this.h_timer=undefined;
this.h_script=undefined;this.xmlHttp=undefined;this.i_timeout=0;this.request_type="";this.action_callback=function(action){return;};this.display_status=function(txt,color){return;};this.cm_alert=function(p_text){if(!IORequest.production){alert(p_text);}};IOStopWatch=function(){this.start=function(){this.elapsed_time=0;
this.t_start=new Date().getTime();};this.stop=function(){this.elapsed_time=new Date().getTime()-this.t_start;return(this.elapsed_time);};};this.stop_watch=new IOStopWatch("stop_watch");this.ajax_timeout=function(req_type){if(_io_request.xmlHttp!==undefined){try{if(_io_request.xmlHttp.abort!==undefined){if(typeof _io_request.xmlHttp.abort=="function"){_io_request.xmlHttp.abort();
}}}catch(e){_io_request.display_status("IE - no abort property of the xmlHttp request object");}}IORequest.b_timeout=true;if(req_type==1){_io_request.action_callback("config_timeout");IORequest.i_zone=0;setTimeout('IORequest.config_download_failure("ajax timeout");',0);}else{if(req_type==2){_io_request.action_callback("ssp_timeout");
IORequest.log(IORequest.log_warn,"Ajax timeout downloading ssp",_io_request.stop_watch.elapsed_time+" ms");IORequest.i_zone=0;setTimeout('IORequest.ssp_download_failure("ajax timeout");',0);}else{_io_request.display_status("Ajax timeout downloading product ("+_io_request.stop_watch.elapsed_time+"ms)","red");
IORequest.log(IORequest.log_warn,"Ajax timeout downloading product",_io_request.stop_watch.elapsed_time+" ms");_io_request.download_product();}}};function getXmlHttpObject(){if(window.XMLHttpRequest){return new window.XMLHttpRequest;}else{try{return new ActiveXObject("MSXML2.XMLHTTP.3.0");}catch(ex){return null;
}}}this.javascript_timeout=function(req_type){if(IORequest.h_script!==undefined){var h=document.getElementsByTagName("head").item(0);if(h){h.removeChild(IORequest.h_script);IORequest.h_script=undefined;}}_io_request.stop_watch.stop();if(IORequest.request_crc!==undefined){IORequest.timeout_product[IORequest.offer_id+IORequest.request_crc]=1;
}if(req_type==1){_io_request.action_callback("config_timeout");IORequest.i_zone=0;setTimeout('IORequest.config_download_failure("javascript timeout");',0);}else{if(req_type==2){_io_request.action_callback("ssp_timeout");IORequest.log(IORequest.log_warn,"JavaScript timeout downloading ssp",_io_request.stop_watch.elapsed_time+" ms");
IORequest.i_zone=0;setTimeout('IORequest.ssp_download_failure("javascript timeout");',0);}else{_io_request.display_status("JavaScript timeout downloading product ("+_io_request.stop_watch.elapsed_time+"ms)","blue");IORequest.log(IORequest.log_warn,"JavaScript timeout downloading product",_io_request.stop_watch.elapsed_time+" ms");
if(IORequest.request_crc!==undefined){if((_io_config.file_not_found_pc!==undefined)&&(_io_config.file_not_found_pc>Math.floor(Math.random()*100))){var id=IORequest.offer_type+IORequest.offer_id+"|"+IORequest.request_crc+"|"+(IORequest.isCategoryOffer(IORequest.offer_type)?IORequest.plain_text_cat_id:(IORequest.isSearchOffer(IORequest.offer_type)?IORequest.plain_text_scrubbed_search_id:IORequest.plain_text_item_id));
cmCreatePageElementTag(id,_io_config.file_not_found_id);IORequest.log(IORequest.log_trace,"page element tag for file not found",id);}}_io_request.download_product();}}};this.stateChanged=function(){if(_io_request.xmlHttp.readyState==4){clearTimeout(_io_request.h_timer);_io_request.h_timer=undefined;if(_io_request.xmlHttp.status==200){var txt=_io_request.xmlHttp.responseText;
eval(txt);}else{if(_io_request.xmlHttp.status==404){_io_request.display_status("Ajax - Requested File not found on server - "+_io_request.xmlHttp.status+". Next step in recommendation plan attempted","blue");IORequest.log(IORequest.log_warn,"Ajax - Requested File not found on server - "+_io_request.xmlHttp.status,"next step in recommendation plan attempted");
IORequest.b_404=true;if(_io_request.request_type=="config"){setTimeout('IORequest.config_download_failure("ajax 404");',0);}else{if(_io_request.request_type=="ssp"){IORequest.ssp_processed("Ajax 404 downloading ssp");}else{if(_io_request.request_type=="product"){_io_request.download_product();}}}}else{_io_request.display_status("Ajax - Unexpected status from stateChanged: "+_io_request.xmlHttp.status+".","red");
IORequest.log(IORequest.log_error,"Ajax - Unexpected status from stateChanged",_io_request.xmlHttp.status);IORequest.b_404=true;if(_io_request.request_type=="config"){setTimeout('IORequest.config_download_failure("ajax 404");',0);}else{if(_io_request.request_type=="ssp"){IORequest.ssp_processed("Ajax 404 downloading ssp");
}else{if(_io_request.request_type=="product"){_io_request.download_product();}}}}}}else{}};this.get_target_from_plan=function(p_rec_plan,p_b_category){if(IORequest.current_step>=p_rec_plan.rec_steps.length){return("_SX_");}var rec_step=p_rec_plan.rec_steps[IORequest.current_step];IORequest.log(IORequest.log_trace,"step: "+IORequest.current_step+" offer_id: "+rec_step.offer_id+" type: "+rec_step.offer_type+" target: "+rec_step.target_id+" algo_id: "+rec_step.algo_id+" algo_value",rec_step.algo_value);
if(rec_step.target_id=="_NR_"){return("_NR_");}if(rec_step.target_id=="_DPF_"){return("_DPF_");}if(p_b_category&&!IORequest.isCategoryOffer(rec_step.offer_type)){IORequest.current_step++;this.display_status("Looking for Category - found Product: "+rec_step.target_id+".  Continuing to next step.","green");
IORequest.log(IORequest.log_trace,"Looking for Category - found Product: "+rec_step.target_id+".  Continuing to next step.");return(this.get_target_from_plan(p_rec_plan,1));}if(rec_step.target_id=="_SP_"||rec_step.target_id=="_SG_"||rec_step.target_id=="_SE_"){if(IORequest.item_id==""){IORequest.current_step++;
this.display_status("No item id specified. Continuing to next step.","blue");IORequest.log(IORequest.log_warn,"No item id specified.  Continuing to next step.");return(this.get_target_from_plan(p_rec_plan));}else{if(IORequest.isMultiTargetStep(rec_step)){return(IORequest.item_id);}else{return(IORequest.single_item_id);
}}}if(rec_step.target_id=="_SC_"||rec_step.target_id=="_SGC_"||rec_step.target_id=="_SEC_"){if(IORequest.category_id==""){IORequest.current_step++;this.display_status("No category id specified. Continuing to next step.","blue");IORequest.log(IORequest.log_warn,"No category id specified.  Continuing to next step.");
return(this.get_target_from_plan(p_rec_plan));}else{if(IORequest.isMultiTargetStep(rec_step)){return(IORequest.category_id);}else{return(IORequest.single_category_id);}}}if(rec_step.target_id=="_SS_"){if(IOConfig.crc_specified_search==""){IORequest.current_step++;this.display_status("No search term specified. Continuing to next step.","blue");
IORequest.log(IORequest.log_warn,"No search term specified.  Continuing to next step.");return(this.get_target_from_plan(p_rec_plan));}else{return(IOConfig.crc_specified_search);}}if(rec_step.target_id=="_RVP_"||rec_step.target_id=="_RVL_"||rec_step.target_id=="_RVG_"||rec_step.target_id=="_RVLG_"||rec_step.target_id=="_LCP_"||rec_step.target_id=="_RPP_"||rec_step.target_id=="_RVC_"||rec_step.target_id=="_MPC_"||rec_step.target_id=="_MSP_"){var rc=_io_state.cm_get_item_from_cookie(rec_step.target_id,IORequest.isMultiTargetStep(rec_step));
if(rc===0){IORequest.current_step++;this.display_status("No "+rec_step.target_id+" available. Continuing to next step.","green");IORequest.log(IORequest.log_trace,"No "+rec_step.target_id+" available.  Continuing to next step.");return(this.get_target_from_plan(p_rec_plan));}else{return(rc);}}this.display_status("unrecognized target id: "+rec_step.target_id+".","red");
IORequest.log(IORequest.log_error,"unrecognized target id",rec_step.target_id);return("_NR_");};this.issue_page_element_tag=function(ab_test_array){if(IORequest.perm_cookie_not_supported===false){var session_cookie=IORequest.find_cookie(IORequest.ses_cookie);if(session_cookie===undefined){var random_number=new Date().getTime().toString();
session_cookie=IORequest.set_and_check_cookie(IORequest.ses_cookie,"S"+random_number+"|",true);if(!session_cookie){return;}}if(session_cookie.indexOf("|"+ab_test_array[0]+"|")==-1){IORequest.log(IORequest.log_trace,"issued page element tag "+ab_test_array[1],ab_test_array[0]);IORequest.log(IORequest.log_trace,"session cookie",session_cookie);
IORequest.set_and_check_cookie(IORequest.ses_cookie,session_cookie+ab_test_array[0]+"|",true);cmCreatePageElementTag(ab_test_array[1],ab_test_array[0]);}}};this.get_client_id=function(){var r_client_id;if(IORequest.client_id_override!==undefined){r_client_id=IORequest.client_id_override;}else{if(IORequest.client_id!==undefined){r_client_id=IORequest.client_id;
}else{if(cm_ClientID!==undefined){r_client_id=cm_ClientID.split(";")[0].split("|")[0];}}if(IORequest.find_cookie(IORequest.test_cookie)===undefined){if(r_client_id.substr(0,1)=="6"){IORequest.log(IORequest.log_trace,"Retrieving data from client 9"+r_client_id.substr(1,r_client_id.length-1)+" instead of test client "+r_client_id);
r_client_id="9"+r_client_id.substr(1,r_client_id.length-1);}}}return r_client_id;};this.download_product=function(){IORequest.current_step++;this.io_zone=_io_config.zones[IORequest.zone_id];var zone_test_id="''";if(this.io_zone.ab_test_id!="no ab test"){this.issue_page_element_tag(this.io_zone.ab_test_id.split(":"));
zone_test_id="'"+this.io_zone.ab_test_id+"'";}IORequest.log(IORequest.log_trace,"ab test id",this.io_zone.ab_test_id);if(!this.io_zone.rec_plan){this.cm_alert("rec_plan not defined - zone_id: "+IORequest.zone_id);}var rc=this.get_target_from_plan(this.io_zone.rec_plan,IORequest.b_timeout||IORequest.b_404);
this.action_callback("recommendation_plan");if(rc=="_DPF_"&&(IORequest.default_product_file!==undefined)){_io_request.cm_io_rec(IORequest.default_product_file);return(0);}if(rc=="_SX_"||rc=="_NR_"||rc=="_DPF_"){var heading_txt="";if(rc=="_SX_"){this.display_status("steps exhausted. Calling zone population function "+this.io_zone.zpf+" without recommendations.","blue");
IORequest.log(IORequest.log_warn,"steps exhausted - calling zone population function without recommendations",this.io_zone.zpf);heading_txt="Steps exhausted.  No recommendations found";}else{this.display_status("calling zone population function "+this.io_zone.zpf+" without recommendations (_NR_)","blue");
IORequest.log(IORequest.log_warn,"calling zone population function without recommendations",this.io_zone.zpf);heading_txt="No recommendations found";}if(this.io_zone.zpf!==undefined){var guts="[],'"+this.io_zone.name+"','_NR_','','',[],[],'"+heading_txt+"',"+zone_test_id;if(_io_config.zpfcid!="N"){guts=guts+", []";
}var zpf=this.io_zone.zpf+"("+guts+")";IORequest.log(IORequest.log_trace,"Calling zone population function",zpf);setTimeout(zpf,0);}else{this.display_status("Zone population function "+this.io_zone.name+"_zp is not defined.","red");IORequest.log(IORequest.log_error,"Zone population function ",this.io_zone.name+"_zp is not defined");
}setTimeout('IORequest.stack_manager("rc: '+rc+'");',0);return(0);}var item=rc;this.offer_id=this.io_zone.rec_plan.rec_steps[IORequest.current_step].offer_id;this.cgi_version=this.io_zone.rec_plan.rec_steps[IORequest.current_step].offer_version;this.offer_type=this.io_zone.rec_plan.rec_steps[IORequest.current_step].offer_type;
IORequest.offer_type=this.offer_type;IORequest.offer_id=this.offer_id;if(item.length>1){var image_url_prefix=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.image_url_prefix["json remote https"]:IORequest.image_url_prefix[IORequest.access_method]);var pqa_cookie=IORequest.find_cookie(IORequest.pqa_cookie);
if(pqa_cookie!==undefined&&(pqa_cookie.indexOf("E")>-1)){image_url_prefix=image_url_prefix.replace(IORequest.io_recs,"recsprodqa.coremetrics.com");}var itemList="";for(var i_prd=0;i_prd<item.length;i_prd++){itemList=itemList+item[i_prd]+"|";}IORequest.request_crc=undefined;this.url=image_url_prefix+"?cm_cid="+this.get_client_id()+"&cm_offerid="+this.offer_id+"&cm_offertype="+this.offer_type;
if(IORequest.isMultiTargetStep(this.io_zone.rec_plan.rec_steps[IORequest.current_step])){this.url+="&cm_algorithm="+this.io_zone.rec_plan.rec_steps[IORequest.current_step].algo_id;var current_algo_value=this.io_zone.rec_plan.rec_steps[IORequest.current_step].algo_value;if((current_algo_value!==undefined)&&(current_algo_value!=="")){this.url+="&cm_algorithmvalue="+current_algo_value;
}}this.url+="&cm_targetid="+itemList;this.display_status("retrieving recommendations for multiple targets: "+itemList+" url: "+this.url,"green");IORequest.log(IORequest.log_trace,"retrieving recommendations for multiple targets: "+itemList+" - url",this.url);}else{if((IORequest.isProductBasedOffer(this.offer_type))&&((IORequest.isCategoryOffer(this.offer_type)&&!IORequest.encrypt_cats)||(IORequest.isProductOffer(this.offer_type)&&!IORequest.encrypt_prds))){this.item_id_crc=IORequest.encrypt8(item[0]);
}else{this.item_id_crc=item[0];}IORequest.request_crc=this.item_id_crc;this.group=this.item_id_crc.substr(0,2);var url_prefix=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix["json remote https"]:IORequest.url_prefix[IORequest.access_method]);var url_cookie=IORequest.find_cookie(IORequest.url_cookie);
if(url_cookie!==undefined&&(url_cookie.indexOf("old")>-1)){url_prefix=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix_old["json remote https"]:IORequest.url_prefix_old[IORequest.access_method]);}else{var pqa_cookie=IORequest.find_cookie(IORequest.pqa_cookie);
if(pqa_cookie!==undefined&&(pqa_cookie.indexOf("A")>-1)){url_prefix=url_prefix+"prodqa/";}}var version_postfix="?V="+this.cgi_version;if(_io_config.vcgi=="N"){version_postfix="";}this.url=url_prefix+this.get_client_id()+"/"+g_version+"/"+this.offer_type+this.offer_id+"/"+this.offer_type+this.group+"/"+this.item_id_crc+".js"+version_postfix;
this.display_status("retrieving recommendations for target: "+item[0]+" url: "+this.url,"green");IORequest.log(IORequest.log_trace,"retrieving recommendations for target: "+item[0]+" - url",this.url);}this.action_callback("product_request");if((IORequest.access_method=="ajax local")||(IORequest.access_method=="ajax remote")){this.xmlHttp=getXmlHttpObject();
if(this.xmlHttp===null){this.cm_alert("Your browser really does not support Ajax!");return;}this.h_timer=setTimeout("_io_request.ajax_timeout(0)",IORequest.timeout[this.i_timeout]);this.i_timeout=1;this.request_type="product";this.xmlHttp.onreadystatechange=this.stateChanged;this.stop_watch.start();try{this.xmlHttp.open("GET",this.url,true);
}catch(e){clearTimeout(this.h_timer);this.display_status("Ajax Error: Cross Domain request attempted.  Ajax not supported.  Try json x-domain.","red");IORequest.rec_request_abort();}try{this.xmlHttp.send(null);}catch(e1){clearTimeout(this.h_timer);this.display_status("Ajax Error: Host not found.  Ajax not supported.  Try json x-domain.","red");
IORequest.rec_request_abort();}}else{var request_timeout=(this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id=="_SS_"?IOConfig.sfto:IORequest.timeout[this.i_timeout]);this.h_timer=setTimeout("_io_request.javascript_timeout(0)",request_timeout);this.i_timeout=1;this.stop_watch.start();try{var h=document.getElementsByTagName("head").item(0);
IORequest.h_script=document.createElement("script");IORequest.h_script.setAttribute("language","javascript");IORequest.h_script.setAttribute("type","text/javascript");IORequest.h_script.setAttribute("charset","UTF-8");IORequest.h_script.setAttribute("src",this.url);h.appendChild(IORequest.h_script);}catch(e2){IORequest.rec_request_abort();
}}};this.download_config=function(){var url_prefix=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix["json remote https"]:IORequest.url_prefix[IORequest.access_method]);var url_cookie=IORequest.find_cookie(IORequest.url_cookie);if(url_cookie!==undefined&&(url_cookie.indexOf("old")>-1)){url_prefix=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix_old["json remote https"]:IORequest.url_prefix_old[IORequest.access_method]);
}else{var pqa_cookie=IORequest.find_cookie(IORequest.pqa_cookie);if(pqa_cookie!==undefined&&(pqa_cookie.indexOf("A")>-1)){url_prefix=url_prefix+"prodqa/";}}this.url=url_prefix+this.get_client_id()+"/"+g_config_filename+"?ts="+(((new Date().getTime())/600000)|0);this.display_status("retrieving IO Config file: "+g_config_filename+" url: "+this.url,"green");
IORequest.log(IORequest.log_trace,"retrieving IO config file "+g_config_filename,this.url);this.action_callback("config_request");if((IORequest.access_method=="ajax local")||(IORequest.access_method=="ajax remote")){this.xmlHttp=getXmlHttpObject();if(this.xmlHttp===null){this.cm_alert("Your browser really does not support Ajax!");
return;}this.h_timer=setTimeout("_io_request.ajax_timeout(1)",IORequest.timeout[this.i_timeout]);this.i_timeout=1;this.request_type="config";this.xmlHttp.onreadystatechange=this.stateChanged;this.stop_watch.start();try{this.xmlHttp.open("GET",this.url,true);}catch(e){clearTimeout(this.h_timer);this.display_status("Ajax Error: Cross Domain request attempted.  Ajax not supported.  Try json x-domain.","red");
IORequest.rec_request_abort();}try{this.xmlHttp.send(null);}catch(e1){clearTimeout(this.h_timer);this.display_status("Ajax Error: Host not found.  Ajax not supported.  Try json x-domain.","red");IORequest.rec_request_abort();}}else{this.h_timer=setTimeout("_io_request.javascript_timeout(1)",IORequest.timeout[this.i_timeout]);
this.i_timeout=1;this.stop_watch.start();try{var h=document.getElementsByTagName("head").item(0);var js=document.createElement("script");js.setAttribute("language","javascript");js.setAttribute("type","text/javascript");js.setAttribute("src",this.url);h.appendChild(js);}catch(e2){IORequest.rec_request_abort();
}}};this.download_ssp=function(orig_cookie,reg_id){var ssp_url_prefix=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.ssp_url_prefix["json remote https"]:IORequest.ssp_url_prefix[IORequest.access_method]);var pqa_cookie=IORequest.find_cookie(IORequest.pqa_cookie);
if(pqa_cookie!==undefined&&(pqa_cookie.indexOf("E")>-1)){ssp_url_prefix=ssp_url_prefix.replace(IORequest.io_recs,"recsprodqa.coremetrics.com");}var orig_cookie_encoded=encodeURIComponent(orig_cookie);this.url=ssp_url_prefix+"?cm_cid="+_io_request.get_client_id()+"&cm_regid="+reg_id+"&cm_ioc="+orig_cookie_encoded;
IORequest.log(IORequest.log_trace,"retrieving SSP data for encrypted reg id: "+reg_id+" - url",this.url);this.action_callback("ssp_request");if((IORequest.access_method=="ajax local")||(IORequest.access_method=="ajax remote")){this.xmlHttp=getXmlHttpObject();if(this.xmlHttp===null){this.cm_alert("Your browser really does not support Ajax!");
return;}this.h_timer=setTimeout("_io_request.ajax_timeout(2)",IORequest.timeout[this.i_timeout]);this.i_timeout=1;this.request_type="ssp";this.xmlHttp.onreadystatechange=this.stateChanged;this.stop_watch.start();try{this.xmlHttp.open("GET",this.url,true);}catch(e){clearTimeout(this.h_timer);this.display_status("Ajax Error: Cross Domain request attempted.  Ajax not supported.  Try json x-domain.","red");
IORequest.rec_request_abort();}try{this.xmlHttp.send(null);}catch(e1){clearTimeout(this.h_timer);this.display_status("Ajax Error: Host not found.  Ajax not supported.  Try json x-domain.","red");IORequest.rec_request_abort();}}else{this.h_timer=setTimeout("_io_request.javascript_timeout(2)",IORequest.timeout[this.i_timeout]);
this.i_timeout=1;this.stop_watch.start();try{var h=document.getElementsByTagName("head").item(0);IORequest.h_script=document.createElement("script");IORequest.h_script.setAttribute("language","javascript");IORequest.h_script.setAttribute("type","text/javascript");IORequest.h_script.setAttribute("charset","UTF-8");
IORequest.h_script.setAttribute("src",this.url);h.appendChild(IORequest.h_script);}catch(e2){IORequest.rec_request_abort();}}};this.cm_io_rec=function(_j){this.stop_watch.stop();if(this.h_timer!==undefined){clearTimeout(this.h_timer);this.h_timer=undefined;}if(this.io_zone.zpf!==undefined){if(_j!==undefined){var target_product_id=_j.pd[0][0];
var target_crc=_j.hd[6];var offer_type=_j.hd[2];var offer_id=_j.hd[3];var num_recs=_j.hd[5];var num_static_parms=3;if(IORequest.isPageBasedOffer(offer_type)){num_static_parms=5;}if(num_recs==0){this.display_status("Downloaded product file contains no recommendations.  Continuing to next step.","blue");
IORequest.log(IORequest.log_warn,"Downloaded product file contains no recommendations.  Continuing to next step.");this.download_product();}else{if(IORequest.isSearchOffer(offer_type)){target_product_id=IORequest.raw_search_term.replace(/"/g,'\\"');}if((IORequest.request_crc!==undefined)&&(target_crc!==undefined)&&(target_crc.length==8)&&(IORequest.timeout_product[offer_id+target_crc])){IORequest.log(IORequest.log_trace,"Product download attempt following timeout for same file.  Requested file CRC",IORequest.request_crc);
IORequest.timeout_product[offer_id+target_crc]=0;return;}this.display_status("Successful download of recommendations for item: "+target_product_id+' <font color="black">('+this.stop_watch.elapsed_time+" ms)</font>.","green");IORequest.log(IORequest.log_trace,"successful retrieval of recommendations for item "+target_product_id,this.stop_watch.elapsed_time+" ms");
IORequest.log(IORequest.log_iuo,"requested version: "+this.cgi_version+" returned version",_j.hd[9]);IORequest.log(IORequest.log_product_file,"product file",_j);var product_ids=[];var cat_ids=[];var page_urls=[];var page_names=[];var rec_attributes=[];var tgt_attributes=[];if(IORequest.isProductOffer(offer_type)){if((IOConfig.category_structure=="E")&&(_j.pd[0][2])){_io_state.cm_ted_io({i_offer:"epr_category",cg:_j.pd[0][2].toString().toUpperCase()});
}if((+IOConfig.brand_personalization[0])!=-1){var bp_index=(+IOConfig.brand_personalization[0])+num_static_parms;_io_state.cm_ted_io({i_offer:"brand",brn:_j.pd[0][bp_index]});}}var score=[];var resort=false;var mpc=_io_state.cm_get_item_from_cookie("_MPC_",false);var mpb=_io_state.cm_get_item_from_cookie("_MPB_",false);
for(var i_prd=1;i_prd<_j.pd.length;i_prd++){score[i_prd-1]=[];score[i_prd-1][0]=i_prd;score[i_prd-1][1]=5000;j_pd_score=_j.pd[i_prd][1];if(_j.pd[i_prd][1].length==2){score[i_prd-1][1]=_j.pd[i_prd][1][1];j_pd_score=_j.pd[i_prd][1][2];}score[i_prd-1][2]=j_pd_score;var native_rec=((score[i_prd-1][1]>=5000)&&(score[i_prd-1][1]<6000));
if(native_rec){if((IORequest.optional_parm=="R")&&(IORequest.isCategoryOffer(offer_type))){score[i_prd-1][2]=Math.floor(Math.random()*1000);resort=true;}else{if((mpc!==0)&&(_io_config.cp!==1)){var cat_compare=(IORequest.encrypt_cats?IORequest.encrypt8(_j.pd[i_prd][2]):_j.pd[i_prd][2]);score[i_prd-1][2]=score[i_prd-1][2]*((cat_compare==mpc[0])?_io_config.cp:1);
resort=true;}if(mpb!==0){var brand=_j.pd[i_prd][(+IOConfig.brand_personalization[0])+num_static_parms];var brand_crc=IORequest.encrypt8(brand);score[i_prd-1][2]=score[i_prd-1][2]*((brand_crc==mpb[0])?(+IOConfig.brand_personalization[1]):1);}}}}if(resort){score.sort(function(a,b){return(b[1]==a[1]?b[2]-a[2]:b[1]-a[1]);
});}l_attribute_array=_j.pd[0].length;for(var i_att=num_static_parms;i_att<l_attribute_array;i_att++){var prefix=((_j.ap!==undefined&&_j.ap[i_att-num_static_parms]!==undefined)?_j.ap[i_att-num_static_parms]:"");tgt_attributes.push((_j.pd[0][i_att]===undefined)?undefined:prefix+_j.pd[0][i_att].replace(/"/g,'\\"'));
}var product_filter_crc=[];var product_filter_raw=[];if(this.io_zone.filter_cp){var lcps=_io_state.cm_get_item_from_cookie("_LCP_",true);if(lcps!==0){for(var i_cp=0;i_cp<lcps.length;i_cp++){if(IORequest.encrypt_prds){product_filter_crc[lcps[i_cp]]=1;}else{product_filter_raw[lcps[i_cp]]=1;}}}}var rpps=_io_state.cm_get_item_from_cookie("_RPP_",true);
if(rpps!==0){if(this.io_zone.filter_pp){for(var i_pp=0;i_pp<rpps.length;i_pp++){if(IORequest.encrypt_prds){product_filter_crc[rpps[i_pp]]=1;}else{product_filter_raw[rpps[i_pp]]=1;}}}if(IORequest.item_id!==""){for(var i_si=0;i_si<IORequest.item_id.length;i_si++){if(IORequest.encrypt_prds){product_filter_crc[rpps[i_si]]=1;
}else{product_filter_raw[rpps[i_si]]=1;}}}}for(var i_bl=0;i_bl<_io_config.bad_list.length;i_bl++){product_filter_crc[_io_config.bad_list[i_bl]]=1;}IORequest.reason=[];var len_required_attributes=(_io_config.required_attrs.length);var a_deemphasized_by_segment=[];var a_tmp_deemph=[];for(var ii=0;((product_ids.length<this.io_zone.n_recs)&&(ii<score.length));
ii++){var i_pd=score[ii][0];var item_raw=_j.pd[i_pd][0];var zpf_item=item_raw.replace(/"/g,'\\"');var item_crc=(IORequest.isContentBasedOffer(offer_type)?IORequest.encrypt16(item_raw):IORequest.encrypt8(item_raw));IORequest.reason[item_raw]=0;var b_all_required_attributes=true;var b_excluded_by_segment_filter=false;
var b_deemphasized_by_segment_filter=false;if((IORequest.filtered_out_products[item_raw]===undefined)&&(product_filter_raw[item_raw]===undefined)&&(product_filter_crc[item_crc]===undefined)&&(IOState.h_productview_product[item_raw]===undefined)&&(IOState.h_pageview_page[item_raw]===undefined)){var a_tmp=[];
for(var i_at=num_static_parms;((i_at<_j.pd[i_pd].length)&&(b_all_required_attributes===true));i_at++){if((len_required_attributes>(i_at-num_static_parms))&&(_io_config.required_attrs[i_at-num_static_parms])&&!(_j.pd[i_pd][i_at])){b_all_required_attributes=false;}else{var at_prefix=((!IORequest.is_undefined(_j.ap)&&_j.ap[i_at-num_static_parms]!==undefined)?_j.ap[i_at-num_static_parms]:"");
a_tmp.push((_j.pd[i_pd][i_at]===undefined)?undefined:at_prefix+_j.pd[i_pd][i_at].replace(/"/g,'\\"'));}}if(b_all_required_attributes){var segment=_io_state.get_pf_segment_from_cookie();if(segment!=""){b_zone_found=false;for(var i_zones=0;((i_zones<_io_config.pf_zone_list.length)&&(b_zone_found===false));
i_zones++){if(_io_config.pf_zone_list[i_zones]==this.io_zone.name){b_zone_found=true;}}if(b_zone_found){if(_j.mids!==undefined){var i_attr_index=-1;for(var i_mids=0;((i_mids<_j.mids.length)&&(i_attr_index===-1));i_mids++){if(_j.mids[i_mids]==_io_config.pf_metric_id){i_attr_index=i_mids;}}if(i_attr_index!=-1){var segment_attr_value=_j.pd[i_pd][num_static_parms+i_attr_index];
var segment_array=segment_attr_value.split(_io_config.multi_target_delim);var in_segment=false;for(var i_segment=0;i_segment<segment_array.length;i_segment++){if(IORequest.encrypt16(segment_array[i_segment])==segment){in_segment=true;}}if(!in_segment){if(_io_config.pf_filter_type=="EXCLUDE"){b_excluded_by_segment_filter=true;
}else{if(_io_config.pf_filter_type=="DEEMPHASIZE"){b_deemphasized_by_segment_filter=true;a_deemphasized_by_segment.push(_j.pd[i_pd]);a_tmp_deemph.push(a_tmp);}}}}}}}if(b_excluded_by_segment_filter){IORequest.log(IORequest.log_trace,zpf_item+" is not in segment","not sent to zpf");IORequest.reason[item_raw]=8;
}else{if(b_deemphasized_by_segment_filter){IORequest.log(IORequest.log_trace,zpf_item+" is not in segment","moved to end of recommendation list");IORequest.reason[item_raw]=9;}else{product_ids.push(zpf_item);cat_ids.push(_j.pd[i_pd][2]);if(IORequest.isPageBasedOffer(offer_type)){page_urls.push(_j.pd[i_pd][3]);
page_names.push(_j.pd[i_pd][4]);}if(IORequest.conflict_resolution===true){IORequest.filtered_out_products[item_raw]=1;}rec_attributes.push('["'+a_tmp.join('","')+'"]');}}}else{IORequest.log(IORequest.log_trace,zpf_item+" required attribute not present","not sent to zpf");IORequest.reason[item_raw]=1;
}}else{if((product_filter_raw[item_raw]!==undefined)||(product_filter_crc[item_crc]!==undefined)){IORequest.log(IORequest.log_trace,zpf_item+" is recently carted or purchased, is in bad item list, or is the specified item on the recommendation request","not sent to zpf");IORequest.reason[item_raw]=2;
}else{if(IORequest.filtered_out_products[item_raw]!==undefined){IORequest.log(IORequest.log_trace,zpf_item+" appears in previous zone","not sent to zpf");IORequest.reason[item_raw]=3;}else{if(IOState.h_productview_product[item_raw]!==undefined){IORequest.log(IORequest.log_trace,zpf_item+" appears in the recommendation list but is also a product for which a product view tag was issued for this page","not sent to zpf");
IORequest.reason[item_raw]=5;}else{if(IOState.h_pageview_page[item_raw]!==undefined){IORequest.log(IORequest.log_trace,zpf_item+" appears in the recommendation list but is also a page for which a page view tag was issued for this page","not sent to zpf");IORequest.reason[item_raw]=7;}}}}}}for(var jj=0;
((product_ids.length<this.io_zone.n_recs)&&(jj<a_deemphasized_by_segment.length));jj++){var item_raw_deemph=a_deemphasized_by_segment[jj][0];var zpf_item_deemph=item_raw_deemph.replace(/"/g,'\\"');product_ids.push(zpf_item_deemph);cat_ids.push(a_deemphasized_by_segment[jj][2]);if(IORequest.isPageBasedOffer(offer_type)){page_urls.push(a_deemphasized_by_segment[jj][3]);
page_names.push(a_deemphasized_by_segment[jj][4]);}if(IORequest.conflict_resolution===true){IORequest.filtered_out_products[item_raw_deemph]=1;}rec_attributes.push('["'+a_tmp_deemph[jj].join('","')+'"]');}var target_header_txt=[];target_header_txt._SP_="Recommendations";target_header_txt._SG_="Page Recommendations";
target_header_txt._SE_="Element Recommendations";target_header_txt._SC_="Top Selling Items";target_header_txt._SGC_="Top Viewed Pages";target_header_txt._SEC_="Top Viewed Elements";target_header_txt._NR_="No Recommendations";target_header_txt._RVP_="Recently viewed item(s)";target_header_txt._RVG_="Recently viewed page(s)";
target_header_txt._RVL_="Recently viewed items";target_header_txt._RVLG_="Recently viewed pages";target_header_txt._RPP_="Recently purchased item(s)";target_header_txt._LCP_="Recently carted item(s)";target_header_txt._RVC_="Recommendations from a category you've recently viewed";target_header_txt._MPC_="Top selling items from a category of your interest";
target_header_txt._MSP_="Most Significant Purchase";target_header_txt._SS_="Recommendations based on search terms";target_header_txt._DPF_="Default Recommendations";var parms=[];var b_has_recs=product_ids.length?true:false;var target_id=b_has_recs?this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id:"_NR_";
if(!b_has_recs){IORequest.log(IORequest.log_trace,"No recommendations made it through the filters","changing target symbolic from "+this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id+" to _NR_.");}var heading=this.io_zone.rec_plan.rec_steps[IORequest.current_step].heading||target_header_txt[target_id];
parms.push(b_has_recs?'["'+product_ids.join('","')+'"]':"[]");parms.push('"'+this.io_zone.name+'"');parms.push('"'+target_id+'"');parms.push('"'+target_product_id+'"');parms.push('"'+_j.pd[0][2]+'"');parms.push("["+rec_attributes.join()+"]");parms.push('["'+tgt_attributes.join('","')+'"]');parms.push('"'+heading+'"');
parms.push('"'+(this.io_zone.ab_test_id||"")+'"');parms.push(b_has_recs?'["'+cat_ids.join('","')+'"]':"[]");parms.push(IORequest.isPageBasedOffer(offer_type)?'"'+_j.pd[0][3]+'"':'""');parms.push(IORequest.isPageBasedOffer(offer_type)?'"'+_j.pd[0][4]+'"':'""');parms.push((b_has_recs&&IORequest.isPageBasedOffer(offer_type))?'["'+page_urls.join('","')+'"]':"[]");
parms.push((b_has_recs&&IORequest.isPageBasedOffer(offer_type))?'["'+page_names.join('","')+'"]':"[]");var call=this.io_zone.zpf+"("+parms.join()+")";if(this.io_zone.zpf!==undefined){IORequest.log(IORequest.log_trace,"Calling zone population function",call);setTimeout(call,0);}setTimeout('IORequest.stack_manager("successful product retrieval");',0);
}}else{setTimeout('IORequest.stack_manager("successful product retrieval");',0);}}else{this.display_status("Zone population function "+this.io_zone.name+"_zp is not defined.","red");IORequest.log(IORequest.log_error,"Zone population function ",this.io_zone.name+"_zp is not defined");}};this.cm_io_cfg=function(_json,b_download_from_cdn){this.stop_watch.stop();
clearTimeout(_io_request.h_timer);_io_request.h_timer=undefined;if(_io_config===undefined){if(_json!==undefined){this.action_callback(b_download_from_cdn?"server_cfg":"default_cfg");IORequest.log(IORequest.log_trace,"successful retrieval of config file",this.stop_watch.elapsed_time+" ms");IORequest.log(IORequest.log_config_file,"config file",_json);
_io_state.set_ab_test_group_from_cookie();if(_json.zp!==undefined){_io_config=new IOConfig(_json);this.action_callback("config_return");}else{setTimeout('IORequest.config_download_failure("corrupt config file");',0);}if(b_download_from_cdn){IORequest.i_zone=0;setTimeout('IORequest.config_downloaded("successful config download");',0);
}}}else{IORequest.log(IORequest.log_warn,"config request where _io_config already defined","aborting request");}};this.cm_io_ssp=function(_json){this.stop_watch.stop();clearTimeout(_io_request.h_timer);_io_request.h_timer=undefined;if(this.h_timer!==undefined){clearTimeout(this.h_timer);this.h_timer=undefined;
}if(_json!==undefined){this.action_callback("ssp_retrieved");IORequest.log(IORequest.log_trace,"successful retrieval of ssp",this.stop_watch.elapsed_time+" ms");IORequest.log(IORequest.log_config_file,"ssp file",_json);if(_json.success){if(_json.value!==undefined){var pseudo_cookies=_json.value.split(IORequest.cookie_separator);
if(pseudo_cookies.length>=10){pseudo_cookies[10]=new Date().getTime().toString();}var new_cookie_value=pseudo_cookies.join(IORequest.cookie_separator);IORequest.set_and_check_cookie(IORequest.state_cookie,new_cookie_value,false,IORequest.vanity_suffix);IORequest.recently_viewed_product=undefined;IORequest.recently_viewed_category=undefined;
IORequest.recently_viewed_page=undefined;_io_state.cm_build_all_recent_arrays();}}else{IORequest.log(IORequest.log_trace,"SSP download failed: "+_json.message);}this.action_callback("ssp_complete");IORequest.i_zone=0;setTimeout('IORequest.ssp_processed("ssp processing complete");',0);}};}IORequest.crc32_tab=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918000,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117];
IORequest.crc32_add=function(d,c){return IORequest.crc32_tab[(d^c)&255]^((d>>8)&16777215);};IORequest.crc32_str=function(h){var g;var f=h.length;var e;e=4294967295;for(g=0;g<f;g++){e=IORequest.crc32_add(e,h.charCodeAt(g));}return e^4294967295;};IORequest.hex32=function(h){var g;var e;var f;g=h&65535;
e=g.toString(16).toUpperCase();while(e.length<4){e="0"+e;}g=(h>>>16)&65535;f=g.toString(16).toUpperCase();while(f.length<4){f="0"+f;}return f+e;};IORequest.isProductOffer=function(b){return(b=="P");};IORequest.isSearchOffer=function(b){return(b=="S");};IORequest.isEPRCategoryOffer=function(b){return(b=="E");
};IORequest.isSiteCategoryOffer=function(b){return(b=="C");};IORequest.isCategoryOffer=function(b){return(IORequest.isEPRCategoryOffer(b)||IORequest.isSiteCategoryOffer(b)||IORequest.isPageCategoryOffer(b)||IORequest.isElementCategoryOffer(b));};IORequest.isPageOffer=function(b){return(b=="A");};IORequest.isPageCategoryOffer=function(b){return(b=="F");
};IORequest.isPageBasedOffer=function(b){return(IORequest.isPageOffer(b)||IORequest.isPageCategoryOffer(b));};IORequest.isElementOffer=function(b){return(b=="B");};IORequest.isElementCategoryOffer=function(b){return(b=="G");};IORequest.isElementBasedOffer=function(b){return(IORequest.isElementOffer(b)||IORequest.isElementCategoryOffer(b));
};IORequest.isContentBasedOffer=function(b){return(IORequest.isPageOffer(b)||IORequest.isElementOffer(b)||IORequest.isPageCategoryOffer(b)||IORequest.isElementCategoryOffer(b));};IORequest.isProductBasedOffer=function(b){return(!IORequest.isContentBasedOffer());};IORequest.isMultiTargetStep=function(b){return((b.algo_id!==undefined)&&(b.algo_id!==""));
};IORequest.reverse=function(b){return b.split("").reverse().join("");};IORequest.encrypt16=function(b){return IORequest.hex32(IORequest.crc32_str(b))+IORequest.hex32(IORequest.crc32_str(IORequest.reverse(b)));};IORequest.encrypt8=function(b){return IORequest.hex32(IORequest.crc32_str(b));};IORequest.cookie_info=function(c,n){var l=document.cookie;
var i=l.length;var m=l.split(";").length;IORequest.log(IORequest.log_trace,"cookie_length: "+i+" number of cookies",IORequest.cookie_count(c));IORequest.log(IORequest.log_trace,"cookie",l);alert("n: "+m+" l: "+i+" cookie: "+l);if(n){var o=n-i-3-c.length;var p="";for(var q=0;q<o;q++){p+=""+q%10;}IORequest.set_and_check_cookie(c,p);
IORequest.cookie_info(c);}};IORequest.cookie_count=function(e){var f=document.cookie;var c=0;if(f){c=f.split(";").length;}return c;};IORequest.find_cookie=function(h){var g=document.cookie.split("; ");var e=h.length;for(var f=0;f<g.length;f++){if((h+"=")==g[f].substring(0,e+1)){return(g[f].substring(e+1));
}}return(undefined);};IORequest.rm_cookie=function(b){document.cookie=b+"=;path=/;expires="+new Date(1998,0).toGMTString()+";;";};IORequest.set_and_check_cookie=function(g,f,e,h){CB(g,f,e?null:new Date(2020,0).toGMTString(),h?h:null);f=IORequest.find_cookie(g);if(f===undefined){if(!e){IORequest.perm_cookie_not_supported=true;
}}IORequest.log(IORequest.log_cookie_write,"write "+g,IORequest.is_undefined(f)?"permanent cookies disabled":f);return(f);};IORequest.build_array_from_cookie=function(d,e){var f=IORequest.find_state_cookie(d);return((f===undefined)?undefined:(f.split(IORequest.cookie_separator))[e]);};IORequest.find_state_cookie=function(o){if(IORequest.vanity_suffix===undefined){if(cm_JSFPCookieDomain===null||cm_JSFPCookieDomain===undefined){var l=document.domain;
if(l){var n=/[^.]+\.[^.]+$/;IORequest.vanity_suffix="."+l.match(n);}}else{IORequest.vanity_suffix=cm_JSFPCookieDomain;}}var k=IORequest.find_cookie(o);if(k===undefined){var i=((IORequest.ie_version()!==null)&&(IORequest.ie_version()<7))?20:30;if(IORequest.cookie_count()>=i){k=undefined;}else{if(o==IORequest.state_cookie){var m=Math.floor(Math.random()*100);
k=[m,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]].join("~")+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_separator;
}else{if(o==IORequest.state_cookie_content){k=[IORequest.a_max_page_elements[0]].join("~")+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_array_separator;}}var h=k;k=IORequest.set_and_check_cookie(o,h,false,IORequest.vanity_suffix);}}return(k);};IORequest.default_json={zp:[{id:"Default_Zone",rp:[["001",0,99,3]]}],rp:{"001":[["101","_DPF_","0","You might be interested in"]]},oa:{"101":["4","P"]}};
IORequest.i_zone=1;IORequest.i_msg=0;IORequest.rec_stack=[];IORequest.filtered_out_products=[];IORequest.b_timeout=false;IORequest.b_404=false;IORequest.zone_id=0;IORequest.encrypt_16=0;IORequest.item_id=0;IORequest.single_item_id="";IORequest.category_id=0;IORequest.single_category_id="";IORequest.raw_search_term="";
IORequest.current_step=-1;IORequest.timeout_product=[];IORequest.ssp_reg_id="";IORequest.ssp_use_reg_id=undefined;IORequest.ssp_allow_flag=undefined;IORequest.setRegIdCalled=undefined;IORequest.pf_segment="";IORequest.setSegmentCalled=undefined;IORequest.cookie_separator="~|~";IORequest.cookie_array_separator="|";
IORequest.ses_cookie="CoreM_Ses";IORequest.state_cookie="CoreM_State";IORequest.state_cookie_content="CoreM_State_Content";IORequest.test_cookie="CoreM_State_Test";IORequest.pqa_cookie="CoreM_State_pqa";IORequest.url_cookie="CoreM_State_url";IORequest.no_log_cookie="CoreM_State_No_Log";IORequest.recently_viewed_product=undefined;
IORequest.recently_viewed_page=undefined;IORequest.recently_viewed_category=undefined;IORequest.perm_cookie_not_supported=false;IORequest.a_max_page_elements=[6];IORequest.access_method="json local";IORequest.ab_group_number=undefined;IORequest.have_cookie=false;IORequest.log_cookie_write=2<<1;IORequest.log_config_file=2<<2;
IORequest.log_product_file=2<<3;IORequest.log_trace=2<<4;IORequest.log_warn=2<<5;IORequest.log_error=2<<6;IORequest.log_iuo=2<<7;IORequest.production=false;IORequest.log_mask=IORequest.production?IORequest.log_error:(2<<16)-1;IORequest.log_mask=IORequest.log_mask&~IORequest.log_iuo;IORequest.breaklines=function(c){var d="";
while(c.length>0){d+=c.substring(0,190)+"\n";c=c.substring(190);}return d;};IORequest.log=function(f,d,e){if(!IORequest.disable_console_logging){if(typeof console!=="undefined"){if(IORequest.find_cookie(IORequest.no_log_cookie)===undefined){if(e!==undefined){d=d+": "+e;}d=IORequest.breaklines(d);if(f==IORequest.log_product_file||f==IORequest.log_config_file){if(console.group){console.group();
}if(console.dir){console.dir(e);}if(console.groupEnd){console.groupEnd();}}else{if(f==IORequest.log_warn){if(console.warn){console.warn(d);}}else{if(f==IORequest.log_error){if(console.error){console.error(d);}}else{if(IORequest.log_mask&f){if(console.log){console.log(d);}}}}}}}}};IORequest.ie_version=function(){return(/MSIE (\d+\.\d+);/.test(navigator.userAgent)?RegExp.$1:null);
};IORequest.io_cdn="iocdn.coremetrics.com";IORequest.io_recs="recs.coremetrics.com";IORequest.url_prefix=[];IORequest.url_prefix["ajax local"]="";IORequest.url_prefix["ajax remote"]="/limelight/";IORequest.url_prefix["json local"]="";IORequest.url_prefix["json remote"]="http://"+IORequest.io_cdn+"/";
IORequest.url_prefix["json remote https"]="https://"+IORequest.io_cdn+"/";IORequest.url_prefix_old=[];IORequest.url_prefix_old["json remote"]="http://coremetric.vo.llnwd.net/o33/";IORequest.url_prefix_old["json remote https"]="https://coremetric.hs.llnwd.net/o33/";IORequest.image_url_prefix=[];IORequest.image_url_prefix["json remote"]="http://"+IORequest.io_recs+"/iorequest/prodrecs";
IORequest.image_url_prefix["json remote https"]="https://"+IORequest.io_recs+"/iorequest/prodrecs";IORequest.ssp_url_prefix=[];IORequest.ssp_url_prefix["json remote"]="http://"+IORequest.io_recs+"/iorequest/ssp";IORequest.ssp_url_prefix["json remote https"]="https://"+IORequest.io_recs+"/iorequest/ssp";
IORequest.rec_request=function(g,i,f,k,h){IORequest.log(IORequest.log_trace,"cmRecRequest",g+","+(i?","+i:",")+","+(f?","+f:",")+(k?","+k:",")+(h?","+h:""));IORequest.rec_stack.push([g,false,i,f,k,h]);};IORequest.page_rec_request=function(f,e,h,g){IORequest.log(IORequest.log_trace,"cmPageRecRequest",f+","+e+","+h);
IORequest.rec_stack.push([f,true,e,h,g]);};IORequest.element_rec_request=function(f,e,h,g){IORequest.log(IORequest.log_trace,"cmElementRecRequest",f+","+e+","+h);IORequest.rec_stack.push([f,true,e,h,g]);};IORequest.rec_request_abort=function(){IORequest.rec_stack=[];IORequest.filtered_out_products=[];
IORequest.log(IORequest.log_trace,"Aborted request","communication exception");};IORequest.display_recs=function(){IORequest.log(IORequest.log_trace,"cmDisplayRecs");IORequest.i_msg=0;IORequest.i_zone=1;IORequest.filtered_out_products=[];_io_config=undefined;if(IORequest.chris_dot_html_config){_io_config=new IOConfig(IORequest.chris_dot_html_config);
IORequest.log(IORequest.log_config_file,"config file",IORequest.chris_dot_html_config);IORequest.i_zone=0;IORequest.stack_manager("chris.html");}else{_io_request.download_config();}};IORequest.config_downloaded=function(h){var m=false;if(IORequest.ssp_use_reg_id){var k=_io_state.get_ssp_load_ts_from_cookie();
var g=new Date().getTime();var l=new Date(k);l.setMinutes(l.getMinutes()+new Number(_io_config.ssp_retrieve_int));if(g>(l.getTime())){var i=IORequest.find_cookie(IORequest.state_cookie);if(i!==undefined){m=true;_io_request.download_ssp(i,IORequest.ssp_reg_id);}}}if(!m){IORequest.stack_manager(h);}};IORequest.config_download_failure=function(d){_io_config=new IOConfig(IORequest.default_json);
for(var c=0;c<IORequest.rec_stack.length;c++){_io_config.add_zone(IORequest.rec_stack[c][0]);}IORequest.stack_manager(d);};IORequest.ssp_processed=function(b){IORequest.stack_manager(b);};IORequest.ssp_download_failure=function(b){IORequest.stack_manager(b);};IORequest.encode_search_term=function(f){f=f.toString().toUpperCase();
if(IOConfig.stpr){for(var e=0;e<IOConfig.stpr.length;e++){var d=IOConfig.stpr[e];d=d.toString().toUpperCase();if(f.substring(0,d.length)==d){f=f.substr(d.length);}}}f=f.replace(/[$'&`~@:\[\]\\!%^*()={}\| <>"]/g,"");return(f);};IORequest.stack_manager=function(g){if(IORequest.rec_stack.length){var k=IORequest.rec_stack.shift();
IORequest.i_zone++;IORequest.i_msg=0;IORequest.zone_id=k[0];IORequest.encrypt_16=(k.length>1?k[1]:false);var f=(k.length>2?k[2]:"");f=(f==undefined?"":f.toString().toUpperCase());IORequest.plain_text_item_id=f;if(f!=""){if(IORequest.encrypt_16){IORequest.single_item_id=new Array(IORequest.encrypt16(f));
}else{if(IORequest.encrypt_prds){IORequest.single_item_id=new Array(IORequest.encrypt8(f));}}f=f.split(_io_config.multi_target_delim);for(i_item_id=0;i_item_id<f.length;i_item_id++){if(IORequest.encrypt_16){f[i_item_id]=IORequest.encrypt16(f[i_item_id]);}else{if(IORequest.encrypt_prds){f[i_item_id]=IORequest.encrypt8(f[i_item_id]);
}}}}IORequest.item_id=f;var h=(k.length>3?k[3]:"");h=(h==undefined?"":h.toString().toUpperCase());IORequest.plain_text_cat_id=h;if(h!=""){if(IORequest.encrypt_16){IORequest.single_category_id=new Array(IORequest.encrypt16(h));}else{if(IORequest.encrypt_cats){IORequest.single_category_id=new Array(IORequest.encrypt8(h));
}}h=h.split(_io_config.multi_target_delim);for(i_cat_id=0;i_cat_id<h.length;i_cat_id++){if(IORequest.encrypt_16){h[i_cat_id]=IORequest.encrypt16(h[i_cat_id]);}else{if(IORequest.encrypt_cats){h[i_cat_id]=IORequest.encrypt8(h[i_cat_id]);}}}}IORequest.category_id=h;IORequest.optional_parm=(k.length>4?k[4]:"");
IORequest.optional_parm=(IORequest.optional_parm==undefined?"":IORequest.optional_parm);IORequest.raw_search_term=(k.length>5?k[5]:"");IORequest.raw_search_term=(IORequest.raw_search_term==undefined?"":IORequest.raw_search_term);if(IORequest.raw_search_term!=""){var i=IORequest.encode_search_term(IORequest.raw_search_term);
IORequest.plain_text_scrubbed_search_id=i;k[5]=i;IOConfig.crc_specified_search=new Array(IORequest.encrypt8(i));}else{IOConfig.crc_specified_search="";}IORequest.current_step=-1;IORequest.b_timeout=false;IORequest.b_404=false;if(_io_config.zones[IORequest.zone_id]===undefined){IORequest.log(IORequest.log_error,"Zone "+IORequest.zone_id+" is not defined in the configuration file","no action taken");
IORequest.stack_manager("zone: "+IORequest.zone_id+" is not defined in the configuration file");}else{_io_request.display_status("stack_manager called - "+g+" - parms: "+k.join(", "),"green");IORequest.log(IORequest.log_trace,"stack_manager called - "+g+" - parms",k.join(", "));_io_request.download_product();
}}else{if(IORequest.i_zone==3){IORequest.i_zone=2;}_io_request.display_status("All recommendation requests completed","green");IORequest.log(IORequest.log_trace,"All recommendation requests completed for zone",IORequest.zone_id);IORequest.i_zone=1;IORequest.i_msg=0;}};IORequest.is_undefined=function(d){var c;
return(d===c);};IORequest.inspect_json=function(o,k,l){var m="",i,n;if(l===null||l===undefined){l=0;}if(k===null||k===undefined){k=1;}if(k<1){return'<font color="red">Error: Levels number must be > 0</font>';}if(o===null||o===undefined){return'<font color="red">Error: Object <b>NULL</b></font>';}m+="<ul>";
var p;for(p in o){if(true){try{i=typeof(o[p]);m+="<li>("+i+") "+p+((o[p]===null)?(": <b>null</b>"):(':  <font color="red">'+o[p]+"</font>"))+"</li>";if((i=="object")&&(o[p]!==null)&&(l+1<k)){m+=IORequest.inspect_json(o[p],k,l+1);}}catch(q){if(typeof(q)=="string"){n=q;}else{if(q.message){n=q.message;}else{if(q.description){n=q.description;
}else{n="Unknown";}}}m+='<li><font color="red">(Error) '+p+": "+n+"</font></li>";}}}m+="</ul>";return m;};IOConfig.version=-1;IOConfig.brand_personalization=[-1,-1];IOConfig.category_structure=-1;IOConfig.stpr=[];IOConfig.crc_specified_search="";function IOConfig(p){_io_state.cm_build_all_recent_arrays();
var m=false;this.io=p;if(((IORequest.ie_version()!==null)&&(IORequest.ie_version()<7))){if(this.io.cie6b!==undefined){for(var o=0;o<IORequest.a_max_elements.length;o++){if(this.io.cie6b[o]!=IORequest.a_max_elements[o]){IORequest.a_max_elements[o]=this.io.cie6b[o];m=true;}}}}else{if(this.io.cdfltb!==undefined){for(var u=0;
u<IORequest.a_max_elements.length;u++){if(this.io.cdfltb[u]!=IORequest.a_max_elements[u]){IORequest.a_max_elements[u]=this.io.cdfltb[u];m=true;}}}}if(this.io.cdfltpg!==undefined){for(var q=0;q<IORequest.a_max_page_elements.length;q++){if(this.io.cdfltpg[q]!=IORequest.a_max_page_elements[q]){IORequest.a_max_page_elements[q]=this.io.cdfltpg[q];
m=true;}}}if(this.io.cs===undefined){if(IOConfig.category_structure==-1){IOConfig.category_structure="S";}}else{var s=(this.io.cs!=="EPR");var v=(IOConfig.category_structure!=="E");if(s!==v){m=true;IOConfig.category_structure=(this.io.cs=="EPR"?"E":"S");}}if(this.io.cv!==undefined){if(IOConfig.version!==this.io.cv){m=true;
IOConfig.version=this.io.cv;}}if(this.io.bp!==undefined){if(IOConfig.brand_personalization[0]!=this.io.bp[0]){IOConfig.brand_personalization[0]=this.io.bp[0];m=true;}if(IOConfig.brand_personalization[1]!=this.io.bp[1]){IOConfig.brand_personalization[1]=this.io.bp[1];m=true;}}IORequest.ssp_use_reg_id=false;
var n=_io_state.get_ssp_reg_id_from_cookie();if(this.io.sspe!==undefined){if(this.io.sspe=="Y"){if((this.io.sspl===undefined)||(this.io.sspl=="OPT_IN_MANDATORY")){if(IORequest.setRegIdCalled){if(IORequest.ssp_allow_flag){IORequest.ssp_use_reg_id=true;m=true;}}}else{if(this.io.sspl=="OPT_IN_BY_DEFAULT"){if(IORequest.setRegIdCalled){if((IORequest.ssp_allow_flag===undefined)||(IORequest.ssp_allow_flag)){IORequest.ssp_use_reg_id=true;
m=true;}}else{IORequest.ssp_use_reg_id=true;IORequest.ssp_reg_id=n;}}}}}if((IORequest.ssp_use_reg_id==false)&&(n!=="")){IORequest.ssp_reg_id="";m=true;}if(m&&IORequest.have_cookie){var t=[IORequest.ab_group_number,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]];
var w=[IORequest.a_max_page_elements[0]];_io_state.cm_write_cookies(t,w);m=0;}_io_state.cm_build_all_recent_arrays();IOConfig.stpr=this.io.stpr||[];IOConfig.sfto=this.io.sfto||1500;this.fcpl=this.io.fcpl===undefined?"N":this.io.fcpl.toString().toUpperCase();this.vcgi=this.io.vcgi===undefined?"Y":this.io.vcgi.toString().toUpperCase();
this.zpfcid=this.io.zpfcid===undefined?"Y":this.io.zpfcid.toString().toUpperCase();this.required_attrs=this.io.ra||[];this.cp=this.io.cp||1;if(this.io.pfto!==undefined){IORequest.timeout[1]=this.io.pfto;}if(this.io.fnf!==undefined){this.file_not_found_id=this.io.fnf[0];this.file_not_found_pc=this.io.fnf[1];
}this.bad_list=this.io.bl||[];this.ps=this.io.ps===undefined?1:this.io.ps;this.ssp_access_method=this.io.sspa===undefined?"REGISTRATION_ID":this.io.sspa.toString().toUpperCase();this.ssp_retrieve_int=this.io.sspi===undefined?"30":this.io.sspi.toString().toUpperCase();this.pf_filter_type=this.io.pftype===undefined?"DEEMPHASIZE":this.io.pftype.toString().toUpperCase();
this.pf_zone_list=this.io.pfzones||[];this.pf_metric_id=this.io.pfmetric===undefined?undefined:this.io.pfmetric.toString().toUpperCase();this.multi_target_delim=this.io.mtdelim===undefined?"|":this.io.mtdelim.toString().toUpperCase();this.zones=[];this.n_zones=this.io.zp.length;this.rec_plan=[];for(var r=0;
r<this.n_zones;r++){this.zones[this.io.zp[r].id]=new IOZone(this.io.zp[r],this.rec_plan,this.io.rp,this.io.oa);}this.add_zone=function(a){var b={id:a,rp:[["001",0,99,3]]};this.zones[a]=new IOZone(b,this.rec_plan,this.io.rp,this.io.oa);};}function IOZone(l,m,q,o){var i=undefined;this.name=l.id;var k=this.name+"_zp";
if((window[k]!==undefined)&&(typeof window[k]=="function")){this.zpf=k;}else{if((window.io_rec_zp!==undefined)&&(typeof window.io_rec_zp=="function")){this.zpf="io_rec_zp";}else{this.zpf=undefined;}}this.filter_pp=(((l.fp!==undefined)&&(l.fp===0))?0:1);this.filter_cp=(((l.fc!==undefined)&&(l.fc===0))?0:1);
if(l.rp.length==1){if(m[l.rp[0][0]]===undefined){m[l.rp[0][0]]=new IORecPlan(l.rp[0][0],q,o);}this.rec_plan=m[l.rp[0][0]];this.n_recs=l.rp[0][3];this.ab_test_id="no ab test";}else{var n=IORequest.ab_group_number;this.rn=(n===undefined)?0:n;for(var p=0;((p<l.rp.length)&&(this.rec_plan===undefined));p++){if(this.rn>=l.rp[p][1]&&this.rn<=l.rp[p][2]){if(m[l.rp[p][0]]===undefined){m[l.rp[p][0]]=new IORecPlan(l.rp[p][0],q,o);
}this.rec_plan=m[l.rp[p][0]];this.n_recs=l.rp[p][3];this.ab_test_id=((l.rp[p][4]!==undefined)?l.rp[p][4]:"no ab test");}}}}function IORecStep(d,c){this.offer_id=d[0];this.target_id=d[1];this.offer_type=this.offer_id?c[this.offer_id][1]:"N";this.offer_version=this.offer_id?c[this.offer_id][0]:0;this.heading=(d[3]!==undefined)?d[3]:"";
this.algo_id=(d[4]!==undefined)?d[4]:"";this.algo_value=(d[5]!==undefined)?d[5]:"";this.to_string=function(){return("offer_id: "+this.offer_id+" target_id: "+this.target_id+" offer_type: "+this.offer_type+" offer_version: "+this.offer_version+" algo_id: "+this.algo_id+" algo_value: "+this.algo_value);
};}function IORecPlan(e,f,h){this.rec_steps=[];this.id=e;for(var g=0;g<f[e].length;g++){this.rec_steps.push(new IORecStep(f[e][g],h));}}IOState.h_productview_product=[];IOState.h_pageview_page=[];function IOState(){var I=document;var Y="undefined";var R=(IORequest.production?"~":"~");var T=":";var W=[];
var D=[];var J=[];var M=[];var E=[];var P=[];var ac=[];var C=[];var S=[];var O=[];var X=[];var G=[];var H=-1;var Q=undefined;var K=undefined;var L=undefined;var N=undefined;var U=["p_viewed","p_carted","p_purchased","c_viewed","c_n_views","b_viewed","b_n_views"];var V=["pv","pc","pp","cv","cn","bv","bn"];
var ab=U;var F=false;var aa=[];if(IORequest.basket_pages!==undefined){for(var Z=0;Z<IORequest.basket_pages.length;Z++){aa[IORequest.basket_pages[Z]]=1;}}this.cm_get_item_from_cookie=function(a,b){if(W.length!==0||(this.cm_build_all_recent_arrays()===true)){if((a=="_RVP_")||(a=="_RVL_")){if((b)||(a=="_RVL_")){return(ac.length!=0?ac:0);
}else{return(IORequest.recently_viewed_product!=0?new Array(IORequest.recently_viewed_product):0);}}if(a=="_RVC_"){if(b){return(O.length!=0?O:0);}else{return(IORequest.recently_viewed_category!=0?new Array(IORequest.recently_viewed_category):0);}}if(a=="_LCP_"){if(b){return(C.length!=0?C:0);}else{return(C.length!=0?C.slice(0,1):0);
}}if(a=="_RPP_"){if(b){return(S.length!=0?S:0);}else{return(S.length!=0?S.slice(0,1):0);}}if((a=="_RVG_")||(a=="_RVLG_")){if((b)||(a=="_RVLG_")){return(G.length!=0?G:0);}else{return(IORequest.recently_viewed_page!=0?new Array(IORequest.recently_viewed_page):0);}}if(a=="_MSP_"){var d=0;for(var c=1;c<S.length;
c++){if(parseFloat(D[S[c]].pp_price)>parseFloat(D[S[d]].pp_price)){d=c;}}return(S.length!=0?S.slice(d,d+1):0);}if(a=="_MPC_"){var d=0;for(var e=1;e<O.length;e++){if(parseInt(J[O[e]].n_viewed,10)>parseInt(J[O[d]].n_viewed,10)){d=e;}}return(O.length!=0?O.slice(d,d+1):0);}if(a=="_MPB_"){var d=0;for(var f=1;
f<X.length;f++){if(parseInt(M[X[f]].n_viewed,10)>parseInt(M[X[d]].n_viewed,10)){d=f;}}return(X.length!=0?X.slice(d,d+1):0);}}return(0);};cm_initialize_id=function(b,a){b[a]=[];b[a].index=-1;b[a].n_bought=0;b[a].n_viewed=0;b[a].n_carted=0;b[a].pv_timestamp=0;b[a].pc_timestamp=0;b[a].pp_timestamp=0;b[a].pp_price=-1;
};cm_build_hash_from_array=function(a){var b=[];b.max_index=0;for(var c=0;c<a.length;c++){cm_initialize_id(b,a[c]);}return b;};cm_id_array_from_index_array=function(b,d,h,f,o,c){var a=[];a.max_length=d;if(b){var n=b.split("~");if(n.length==1){n=b.split(",");}for(var e=0;e<n.length;e++){var m=h[n[e]];
a.push(m);if((o!==undefined)&&(c!==undefined)){for(var l=0;l<o.length;l++){var i=o[l];var g=c[l];if((i!==undefined)&&(g!==undefined)){var k=String(i).split("~");if(k.length==1){k=String(i).split(",");}if((!(f===undefined))&&(k.length>0)){f[m][g]=k[e];}}}}}if(a.length>a.max_length){a.length=a.max_length;
}}return a;};cm_create_integer_array_from_id_array=function(b,e,f){var d=[];for(var c=0;c<b.length;c++){var a=b[c];if(e[a].index==-1){e[a].index=e.max_index++;}d.push(e[a][f]);}return d;};cm_create_id_array_from_hash=function(c){var b=[];for(var a in c){if(typeof a!="function"){b[c[a].index]=a;}}return b;
};cm_add_action=function(k,f,n,g,i,c,b){var a;var d=k;if(n){if(g){d=IORequest.encrypt8(k);IORequest.log(IORequest.log_trace,"encryption of "+k,d);}else{d=IORequest.encrypt16(k);IORequest.log(IORequest.log_trace,"encryption of "+k,d);}}if(d!==undefined){a=[d];a.max_length=i.max_length;if(f[d]===undefined){cm_initialize_id(f,d);
}if(c!==undefined){for(var m=0;m<c.length;m++){var h=c[m];if(h!==undefined){if(b!==undefined){var l=b[m];}if(h.indexOf("n_viewed")>-1){f[d][h]++;}else{if(h.indexOf("timestamp")>-1){f[d][h]=new Date().getTime();}else{if(l!==undefined){f[d][h]=l;}}}}}}for(var e=0;e<i.length;e++){if(i[e]!=d){a.push(i[e]);
}}if(a.length>a.max_length){a.length=a.max_length;}}else{a=i;}return(a);};this.cm_write_cookies=function(l,e){var q=[cm_create_integer_array_from_id_array(ac,D,"index").join("~"),cm_create_integer_array_from_id_array(C,D,"index").join("~"),cm_create_integer_array_from_id_array(S,D,"index").join("~"),cm_create_integer_array_from_id_array(O,J,"index").join("~"),cm_create_integer_array_from_id_array(O,J,"n_viewed").join("~"),cm_create_integer_array_from_id_array(X,M,"index").join("~"),cm_create_integer_array_from_id_array(X,M,"n_viewed").join("~")];
if(F){for(var d=0;d<ab.length;d++){q[d]=ab[d]+T+q[d];}}var u=l.join("~");var m=cm_create_id_array_from_hash(D).join(R);var t=cm_create_id_array_from_hash(J).join(R);var k=cm_create_id_array_from_hash(M).join(R);var g=q.join(IORequest.cookie_array_separator);var v=cm_create_integer_array_from_id_array(ac,D,"pv_timestamp").join("~");
var o=cm_create_integer_array_from_id_array(C,D,"pc_timestamp").join("~");var p=cm_create_integer_array_from_id_array(S,D,"pp_timestamp").join("~");var n=cm_create_integer_array_from_id_array(S,D,"pp_price").join("~");var c="";if((IORequest.ssp_use_reg_id===undefined)){c=L;}else{if(IORequest.ssp_use_reg_id==true){c=IORequest.ssp_reg_id;
}else{c="";}}var r=[u,m,t,k,g,v,o,p,n,Q,K,c,N].join(IORequest.cookie_separator);var h=IORequest.set_and_check_cookie(IORequest.state_cookie,r,false,IORequest.vanity_suffix);var f=e.join("~");var b=[cm_create_integer_array_from_id_array(G,E,"index").join("~")];var a=b.join(IORequest.cookie_array_separator);
var w=cm_create_id_array_from_hash(E).join(R);var s=[f,w,a].join(IORequest.cookie_separator);var i=IORequest.set_and_check_cookie(IORequest.state_cookie_content,s,false,IORequest.vanity_suffix);return;};this.set_ab_test_group_from_cookie=function(){var a=[];var b=IORequest.find_state_cookie(IORequest.state_cookie);
if(b!==undefined){a=IORequest.build_array_from_cookie(IORequest.state_cookie,0).split(",");if(a.length>0){IORequest.ab_group_number=a[0];if(IORequest.ab_group_number.length>3){a=IORequest.build_array_from_cookie(IORequest.state_cookie,0).split("~");IORequest.ab_group_number=a[0];}}}return;};this.get_ssp_load_ts_from_cookie=function(){var b="";
var c=IORequest.find_state_cookie(IORequest.state_cookie);if(c!==undefined){var a=(c===undefined)?4:(c.split(IORequest.cookie_separator).length-1);if(a>4){b=IORequest.build_array_from_cookie(IORequest.state_cookie,10).split(IORequest.cookie_array_separator);}}return b;};this.get_ssp_reg_id_from_cookie=function(){var b="";
var c=IORequest.find_state_cookie(IORequest.state_cookie);if(c!==undefined){var a=(c===undefined)?4:(c.split(IORequest.cookie_separator).length-1);if(a>4){b=IORequest.build_array_from_cookie(IORequest.state_cookie,11).split(IORequest.cookie_array_separator);}}return b;};this.get_pf_segment_from_cookie=function(){var b="";
var c=IORequest.find_state_cookie(IORequest.state_cookie);if(c!==undefined){var a=(c===undefined)?4:(c.split(IORequest.cookie_separator).length-1);if(a>4){b=IORequest.build_array_from_cookie(IORequest.state_cookie,12).split(IORequest.cookie_array_separator);}}return b;};this.cm_build_all_recent_arrays=function(){var a=[];
var i=[];var g=[];var n=[];var b=false;var c=IORequest.find_state_cookie(IORequest.state_cookie);if(IORequest.setSegmentCalled){N=IORequest.pf_segment;}else{N=_io_state.get_pf_segment_from_cookie();}if(c!==undefined){var e=(c===undefined)?4:(c.split(IORequest.cookie_separator).length-1);W=IORequest.build_array_from_cookie(IORequest.state_cookie,0).split(",");
if(W.length>0){IORequest.have_cookie=true;IORequest.ab_group_number=W[0];if(IORequest.ab_group_number.length>3){W=IORequest.build_array_from_cookie(IORequest.state_cookie,0).split("~");IORequest.ab_group_number=W[0];}if(W.length>1){IOConfig.version=W[1];IOConfig.brand_personalization[0]=W[2];IOConfig.brand_personalization[1]=W[3];
IOConfig.category_structure=W[4];IORequest.a_max_elements[0]=W[5];IORequest.a_max_elements[1]=W[6];IORequest.a_max_elements[2]=W[7];IORequest.a_max_elements[3]=W[8];IORequest.a_max_elements[4]=W[9];IORequest.a_max_elements[5]=W[10];IORequest.a_max_elements[6]=W[11];}}a=IORequest.build_array_from_cookie(IORequest.state_cookie,1).split(R);
D=cm_build_hash_from_array(a);i=IORequest.build_array_from_cookie(IORequest.state_cookie,2).split(R);J=cm_build_hash_from_array(i);if(e>3){g=IORequest.build_array_from_cookie(IORequest.state_cookie,3).split(R);M=cm_build_hash_from_array(g);}var l=IORequest.build_array_from_cookie(IORequest.state_cookie,e<4?e:4).split(IORequest.cookie_array_separator);
if(F&&(g_b_a_arrays[0].substring(0,2)==ab[0].substring(0,2))){for(var d=0;d<l.length;d++){l[d]=l[d].substring(ab[d].length+1);}}if(e>4){var m=IORequest.build_array_from_cookie(IORequest.state_cookie,5).split(IORequest.cookie_array_separator);var o=IORequest.build_array_from_cookie(IORequest.state_cookie,6).split(IORequest.cookie_array_separator);
var f=IORequest.build_array_from_cookie(IORequest.state_cookie,7).split(IORequest.cookie_array_separator);var k=IORequest.build_array_from_cookie(IORequest.state_cookie,8).split(IORequest.cookie_array_separator);Q=IORequest.build_array_from_cookie(IORequest.state_cookie,9).split(IORequest.cookie_array_separator);
K=IORequest.build_array_from_cookie(IORequest.state_cookie,10).split(IORequest.cookie_array_separator);L=IORequest.build_array_from_cookie(IORequest.state_cookie,11).split(IORequest.cookie_array_separator);if(N===undefined){N=IORequest.build_array_from_cookie(IORequest.state_cookie,12).split(IORequest.cookie_array_separator);
}}ac=cm_id_array_from_index_array(l[0],IORequest.a_max_elements[0],a,D,new Array(m),new Array("pv_timestamp"));C=cm_id_array_from_index_array(l[1],IORequest.a_max_elements[1],a,D,new Array(o),new Array("pc_timestamp"));S=cm_id_array_from_index_array(l[2],IORequest.a_max_elements[2],a,D,new Array(f,k),new Array("pp_timestamp","pp_price"));
O=cm_id_array_from_index_array(l[3],IORequest.a_max_elements[3],i,J,new Array(l[4]),new Array("n_viewed"));if(e>3){X=cm_id_array_from_index_array(l[5],IORequest.a_max_elements[5],g,M,new Array(l[6]),new Array("n_viewed"));}if(IORequest.recently_viewed_product===undefined){IORequest.recently_viewed_product=(ac.length===0?0:ac[0]);
}if(IORequest.recently_viewed_category===undefined){IORequest.recently_viewed_category=(O.length===0?0:O[0]);}b=true;}c=IORequest.find_state_cookie(IORequest.state_cookie_content);if(c!==undefined){P=IORequest.build_array_from_cookie(IORequest.state_cookie_content,0).split(",");if(P.length>0){IORequest.a_max_page_elements[0]=P[0];
}n=IORequest.build_array_from_cookie(IORequest.state_cookie_content,1).split(R);E=cm_build_hash_from_array(n);var l=IORequest.build_array_from_cookie(IORequest.state_cookie_content,2).split(IORequest.cookie_array_separator);G=cm_id_array_from_index_array(l[0],IORequest.a_max_page_elements[0],n);if(IORequest.recently_viewed_page===undefined){IORequest.recently_viewed_page=(G.length===0?0:G[0]);
}b=true;}if(W.length==1){IORequest.rm_cookie(IORequest.state_cookie);var h=[IORequest.ab_group_number,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]];
var p=[IORequest.a_max_page_elements[0]];this.cm_write_cookies(h,p);}return b;};cm_build_html_table_from_array=function(f,g,d,b){var e=(b?2:1);var i=g.length;var h="";var a=(e==1?"<TD COLSPAN=2>":"<TD>");if(i>0&&(g[0]!==undefined)){h="<TR><TH ROWSPAN="+i+">"+f+"</TH>"+a+(e==2?d[g[0]][b]+"</TD><TD>":"")+g[0]+"</TD></TR>";
for(var c=1;c<i;c++){h+="<TR>"+a+(e==2?d[g[c]][b]+"</TD><TD>":"")+g[c]+"</TD></TR>";}}else{h="<TR><TH ROWSPAN=1>"+f+"</TH><TD COLSPAN=2>No "+f+"</TD></TR>";}return(h);};cm_get_products_in_cart=function(){if(this.cm_build_all_recent_arrays()===true){return(C);}else{return([]);}};this.cm_format_cookie_arrays=function(a){return("<H3>Obsolete</H3>");
};this.cm_ted_io=function(a){var d=false;if(this.cm_build_all_recent_arrays()===true){if(a.i_offer!==undefined){if(a.i_offer=="epr_category"){if(_io_config.fcpl=="Y"){a.cg=a.cg.replace(/>.*$/,"");a.cg=a.cg.replace(/\s+$/,"");}if(a.cg!==undefined){if(!IORequest.encrypt_cats&&(a.cg.length>IORequest.max_cat_length)){IORequest.log(IORequest.log_warn,"EPR Category not added to cookie.  Category length is greater than the maximum of "+IORequest.max_cat_length+". Category",a.cg);
}else{IORequest.log(IORequest.log_trace,"Adding EPR Category to cookie.  Category",a.cg);O=cm_add_action(a.cg,J,IORequest.encrypt_cats,true,O,new Array("n_viewed"));d=true;}}}if(a.i_offer=="brand"){IORequest.log(IORequest.log_trace,"Adding brand to cookie. Brand",a.brn);X=cm_add_action(a.brn,M,1,true,X,new Array("n_viewed"));
d=true;}}else{if(a.tid==1||a.tid==4||a.tid==5){IORequest.log(IORequest.log_cookie_write,"initial "+IORequest.state_cookie,IORequest.find_state_cookie(IORequest.state_cookie));IORequest.log(IORequest.log_cookie_write,"initial "+IORequest.state_cookie_content,IORequest.find_state_cookie(IORequest.state_cookie_content));
}if(1==a.tid){var c=""+a.pi.toString().toUpperCase();if(c!==undefined){IORequest.log(IORequest.log_trace,"Adding page ID from page view to cookie.  Page ID",c);G=cm_add_action(c,E,true,false,G);d=true;}IOState.h_pageview_page[c]=1;}if(5==a.tid){var e=""+a.pr.toString().toUpperCase();var b=""+a.cg.toString().toUpperCase();
if(e!==undefined){if(!IORequest.encrypt_prds&&(e.length>IORequest.max_prd_length)){IORequest.log(IORequest.log_warn,"Product from product view not added to cookie.  Product length is greater than the maximum of "+IORequest.max_prd_length+". Product",e);}else{IORequest.log(IORequest.log_trace,"Adding product from product view to cookie.  Product",e);
ac=cm_add_action(e,D,IORequest.encrypt_prds,true,ac,new Array("pv_timestamp"));d=true;}}if((b!==undefined)&&(IOConfig.category_structure=="S")){if(!IORequest.encrypt_cats&&(b.length>IORequest.max_cat_length)){IORequest.log(IORequest.log_warn,"Site Category from product view not added to cookie.  Category length is greater than the maximum of "+IORequest.max_cat_length+". Category",b);
}else{IORequest.log(IORequest.log_trace,"Adding Site Category from product view to cookie.  Category",b);O=cm_add_action(b,J,IORequest.encrypt_cats,true,O,new Array("n_viewed"));d=true;}}IOState.h_productview_product[e]=1;}if((a.pr!==undefined)&&(4==a.tid)&&(5==a.at)){if(!IORequest.encrypt_prds&&(a.pr.length>IORequest.max_prd_length)){IORequest.log(IORequest.log_warn,"Product from cart contents not added to cookie.  Product length is greater than the maximum of "+IORequest.max_prd_length+". Product",a.pr);
}else{IORequest.log(IORequest.log_trace,"Adding product from cart contents to cookie.  Product",a.pr);C=cm_add_action(a.pr.toString().toUpperCase(),D,IORequest.encrypt_prds,true,C,new Array("pc_timestamp"));d=true;}}if((a.pr!==undefined)&&(4==a.tid)&&(9==a.at)){if(!IORequest.encrypt_prds&&(a.pr.length>IORequest.max_prd_length)){IORequest.log(IORequest.log_warn,"Product from purchase not added to cookie.  Product length is greater than the maximum of "+IORequest.max_prd_length+". Product",a.pr);
}else{IORequest.log(IORequest.log_trace,"Adding product from purchase to cookie.  Product",a.pr);S=cm_add_action(a.pr.toString().toUpperCase(),D,IORequest.encrypt_prds,true,S,new Array("pp_timestamp","pp_price"),new Array(null,a.bp));d=true;}}}if(d){this.cm_write_cookies(W,P);}}};}cmLoadIOConfig();function cmExecuteTagQueue(){var d=window.cmTagQueue;
if(d){var f=(d.constructor==Array);if(!f){return;}for(var e=0;e<d.length;++e){window[d[e][0]].apply(window,d[e].slice(1));}}return true;}cmExecuteTagQueue();
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return b(a,c)}):"object"==typeof exports?b(a,require("jquery")):b(a,a.jQuery||a.Zepto)}(this,function(a,b){"use strict";function c(a){if(w&&"none"===a.css("animation-name")&&"none"===a.css("-webkit-animation-name")&&"none"===a.css("-moz-animation-name")&&"none"===a.css("-o-animation-name")&&"none"===a.css("-ms-animation-name"))return 0;var b,c,d,e,f=a.css("animation-duration")||a.css("-webkit-animation-duration")||a.css("-moz-animation-duration")||a.css("-o-animation-duration")||a.css("-ms-animation-duration")||"0s",g=a.css("animation-delay")||a.css("-webkit-animation-delay")||a.css("-moz-animation-delay")||a.css("-o-animation-delay")||a.css("-ms-animation-delay")||"0s",h=a.css("animation-iteration-count")||a.css("-webkit-animation-iteration-count")||a.css("-moz-animation-iteration-count")||a.css("-o-animation-iteration-count")||a.css("-ms-animation-iteration-count")||"1";for(f=f.split(", "),g=g.split(", "),h=h.split(", "),e=0,c=f.length,b=Number.NEGATIVE_INFINITY;c>e;e++)d=parseFloat(f[e])*parseInt(h[e],10)+parseFloat(g[e]),d>b&&(b=d);return d}function d(){if(b(document.body).height()<=b(window).height())return 0;var a,c,d=document.createElement("div"),e=document.createElement("div");return d.style.visibility="hidden",d.style.width="100px",document.body.appendChild(d),a=d.offsetWidth,d.style.overflow="scroll",e.style.width="100%",d.appendChild(e),c=e.offsetWidth,d.parentNode.removeChild(d),a-c}function e(){if(!x){var a,c,e=b("html"),f=k("is-locked");e.hasClass(f)||(c=b(document.body),a=parseInt(c.css("padding-right"),10)+d(),c.css("padding-right",a+"px"),e.addClass(f))}}function f(){if(!x){var a,c,e=b("html"),f=k("is-locked");e.hasClass(f)&&(c=b(document.body),a=parseInt(c.css("padding-right"),10)-d(),c.css("padding-right",a+"px"),e.removeClass(f))}}function g(a,b,c,d){var e=k("is",b),f=[k("is",u.CLOSING),k("is",u.OPENING),k("is",u.CLOSED),k("is",u.OPENED)].join(" ");a.$bg.removeClass(f).addClass(e),a.$overlay.removeClass(f).addClass(e),a.$wrapper.removeClass(f).addClass(e),a.$modal.removeClass(f).addClass(e),a.state=b,!c&&a.$modal.trigger({type:b,reason:d},[{reason:d}])}function h(a,d,e){var f=0,g=function(a){a.target===this&&f++},h=function(a){a.target===this&&0===--f&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].off(r+" "+s)}),d())};b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].on(r,g).on(s,h)}),a(),0===c(e.$bg)&&0===c(e.$overlay)&&0===c(e.$wrapper)&&0===c(e.$modal)&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].off(r+" "+s)}),d())}function i(a){a.state!==u.CLOSED&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(b,c){a[c].off(r+" "+s)}),a.$bg.removeClass(a.settings.modifier),a.$overlay.removeClass(a.settings.modifier).hide(),a.$wrapper.hide(),f(),g(a,u.CLOSED,!0))}function j(a){var b,c,d,e,f={};for(a=a.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,","),b=a.split(","),e=0,c=b.length;c>e;e++)b[e]=b[e].split(":"),d=b[e][1],("string"==typeof d||d instanceof String)&&(d="true"===d||("false"===d?!1:d)),("string"==typeof d||d instanceof String)&&(d=isNaN(d)?d:+d),f[b[e][0]]=d;return f}function k(){for(var a=q,b=0;b<arguments.length;++b)a+="-"+arguments[b];return a}function l(){var a,c,d=location.hash.replace("#","");if(d){try{c=b("[data-"+p+'-id="'+d+'"]')}catch(e){}c&&c.length&&(a=b[p].lookup[c.data(p)],a&&a.settings.hashTracking&&a.open())}else n&&n.state===u.OPENED&&n.settings.hashTracking&&n.close()}function m(a,c){var d=b(document.body),e=this;e.settings=b.extend({},t,c),e.index=b[p].lookup.push(e)-1,e.state=u.CLOSED,e.$overlay=b("."+k("overlay")),e.$overlay.length||(e.$overlay=b("<div>").addClass(k("overlay")+" "+k("is",u.CLOSED)).hide(),d.append(e.$overlay)),e.$bg=b("."+k("bg")).addClass(k("is",u.CLOSED)),e.$modal=a.addClass(q+" "+k("is-initialized")+" "+e.settings.modifier+" "+k("is",u.CLOSED)).attr("tabindex","-1"),e.$wrapper=b("<div>").addClass(k("wrapper")+" "+e.settings.modifier+" "+k("is",u.CLOSED)).hide().append(e.$modal),d.append(e.$wrapper),e.$wrapper.on("click."+q,"[data-"+p+'-action="close"]',function(a){a.preventDefault(),e.close()}),e.$wrapper.on("click."+q,"[data-"+p+'-action="cancel"]',function(a){a.preventDefault(),e.$modal.trigger(v.CANCELLATION),e.settings.closeOnCancel&&e.close(v.CANCELLATION)}),e.$wrapper.on("click."+q,"[data-"+p+'-action="confirm"]',function(a){a.preventDefault(),e.$modal.trigger(v.CONFIRMATION),e.settings.closeOnConfirm&&e.close(v.CONFIRMATION)}),e.$wrapper.on("click."+q,function(a){var c=b(a.target);c.hasClass(k("wrapper"))&&e.settings.closeOnOutsideClick&&e.close()})}var n,o,p="remodal",q=a.REMODAL_GLOBALS&&a.REMODAL_GLOBALS.NAMESPACE||p,r=b.map(["animationstart","webkitAnimationStart","MSAnimationStart","oAnimationStart"],function(a){return a+"."+q}).join(" "),s=b.map(["animationend","webkitAnimationEnd","MSAnimationEnd","oAnimationEnd"],function(a){return a+"."+q}).join(" "),t=b.extend({hashTracking:!0,closeOnConfirm:!0,closeOnCancel:!0,closeOnEscape:!0,closeOnOutsideClick:!0,modifier:""},a.REMODAL_GLOBALS&&a.REMODAL_GLOBALS.DEFAULTS),u={CLOSING:"closing",CLOSED:"closed",OPENING:"opening",OPENED:"opened"},v={CONFIRMATION:"confirmation",CANCELLATION:"cancellation"},w=function(){var a=document.createElement("div").style;return void 0!==a.animationName||void 0!==a.WebkitAnimationName||void 0!==a.MozAnimationName||void 0!==a.msAnimationName||void 0!==a.OAnimationName}(),x=/iPad|iPhone|iPod/.test(navigator.platform);m.prototype.open=function(){var a,c=this;c.state!==u.OPENING&&c.state!==u.CLOSING&&(a=c.$modal.attr("data-"+p+"-id"),a&&c.settings.hashTracking&&(o=b(window).scrollTop(),location.hash=a),n&&n!==c&&i(n),n=c,e(),c.$bg.addClass(c.settings.modifier),c.$overlay.addClass(c.settings.modifier).show(),c.$wrapper.show().scrollTop(0),c.$modal.focus(),h(function(){g(c,u.OPENING)},function(){g(c,u.OPENED)},c))},m.prototype.close=function(a){var c=this;c.state!==u.OPENING&&c.state!==u.CLOSING&&(c.settings.hashTracking&&c.$modal.attr("data-"+p+"-id")===location.hash.substr(1)&&(location.hash="",b(window).scrollTop(o)),h(function(){g(c,u.CLOSING,!1,a)},function(){c.$bg.removeClass(c.settings.modifier),c.$overlay.removeClass(c.settings.modifier).hide(),c.$wrapper.hide(),f(),g(c,u.CLOSED,!1,a)},c))},m.prototype.getState=function(){return this.state},m.prototype.destroy=function(){var a,c=b[p].lookup;i(this),this.$wrapper.remove(),delete c[this.index],a=b.grep(c,function(a){return!!a}).length,0===a&&(this.$overlay.remove(),this.$bg.removeClass(k("is",u.CLOSING)+" "+k("is",u.OPENING)+" "+k("is",u.CLOSED)+" "+k("is",u.OPENED)))},b[p]={lookup:[]},b.fn[p]=function(a){var c,d;return this.each(function(e,f){d=b(f),null==d.data(p)?(c=new m(d,a),d.data(p,c.index),c.settings.hashTracking&&d.attr("data-"+p+"-id")===location.hash.substr(1)&&c.open()):c=b[p].lookup[d.data(p)]}),c},b(document).ready(function(){b(document).on("click","[data-"+p+"-target]",function(a){a.preventDefault();var c=a.currentTarget,d=c.getAttribute("data-"+p+"-target"),e=b("[data-"+p+'-id="'+d+'"]');b[p].lookup[e.data(p)].open()}),b(document).find("."+q).each(function(a,c){var d=b(c),e=d.data(p+"-options");e?("string"==typeof e||e instanceof String)&&(e=j(e)):e={},d[p](e)}),b(document).on("keydown."+q,function(a){n&&n.settings.closeOnEscape&&n.state===u.OPENED&&27===a.keyCode&&n.close()}),b(window).on("hashchange."+q,l)})});
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!1,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.hidden="hidden",e.paused=!1,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,f,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0),e.checkResponsive(!0)}var b=0;return c}(),b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=c.options.asNavFor;d&&null!==d&&(d=a(d).not(c.$slider)),null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(a.currentSlide-1===0&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.html(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&(a("li",b.$dots).off("click.slick",b.changeSlide),b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).off("mouseenter.slick",a.proxy(b.setPaused,b,!0)).off("mouseleave.slick",a.proxy(b.setPaused,b,!1))),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.$list.off("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.html(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.setPaused,b,!0)).on("mouseleave.slick",a.proxy(b.setPaused,b,!1))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.$list.on("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}}))},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy"),d=document.createElement("img");d.onload=function(){b.animate({opacity:0},100,function(){b.attr("src",c).animate({opacity:1},200,function(){b.removeAttr("data-lazy").removeClass("slick-loading")})})},d.src=c})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.paused=!1,a.autoPlay()},b.prototype.postSlide=function(a){var b=this;b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay(),b.options.accessibility===!0&&b.initADA()},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",null),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad(),b.options.adaptiveHeight===!0&&b.setPosition()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,c.options.infinite||(c.slideCount<=c.options.slidesToShow?c.currentSlide=0:c.currentSlide>e&&(c.currentSlide=e)),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),b.$slider.trigger("reInit",[b]),b.options.autoplay===!0&&b.focusHandler()},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(b,c,d){var f,g,e=this;if("responsive"===b&&"array"===a.type(c))for(g in c)if("array"!==a.type(e.options.responsive))e.options.responsive=[c[g]];else{for(f=e.options.responsive.length-1;f>=0;)e.options.responsive[f].breakpoint===c[g].breakpoint&&e.options.responsive.splice(f,1),f--;e.options.responsive.push(c[g])}else e.options[b]=c;d===!0&&(e.unload(),e.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.setPaused=function(a){var b=this;b.options.autoplay===!0&&b.options.pauseOnHover===!0&&(b.paused=a,a?b.autoPlayClear():b.autoPlay())},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d);
}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"left":"right":"vertical"},b.prototype.swipeEnd=function(a){var c,b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.slideHandler(c),b.currentDirection=0,b.touchObject={},b.$slider.trigger("swipe",[b,"left"]);break;case"right":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.slideHandler(c),b.currentDirection=1,b.touchObject={},b.$slider.trigger("swipe",[b,"right"])}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;document[a.hidden]?(a.paused=!0,a.autoPlayClear()):a.options.autoplay===!0&&(a.paused=!1,a.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.focusHandler=function(){var b=this;b.$slider.on("focus.slick blur.slick","*",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.isPlay&&(d.is(":focus")?(b.autoPlayClear(),b.paused=!0):(b.paused=!1,b.autoPlay()))},0)})},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
/*!
 * jQuery Form Plugin
 * version: 2.43 (12-MAR-2010)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($) {

/*
	Usage Note:
	-----------
	Do not use both ajaxSubmit and ajaxForm on the same form.  These
	functions are intended to be exclusive.  Use ajaxSubmit if you want
	to bind your own submit handler to the form.  For example,

	$(document).ready(function() {
		$('#myForm').bind('submit', function() {
			$(this).ajaxSubmit({
				target: '#output'
			});
			return false; // <-- important!
		});
	});

	Use ajaxForm when you want the plugin to manage all the event binding
	for you.  For example,

	$(document).ready(function() {
		$('#myForm').ajaxForm({
			target: '#output'
		});
	});

	When using ajaxForm, the ajaxSubmit function will be invoked for you
	at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
	// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	}

	if (typeof options == 'function')
		options = { success: options };

	var url = $.trim(this.attr('action'));
	if (url) {
		// clean url (don't include hash vaue)
		url = (url.match(/^([^#]+)/)||[])[1];
   	}
   	url = url || window.location.href || '';

	options = $.extend({
		url:  url,
		type: this.attr('method') || 'GET',
		iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	}, options || {});

	// hook for manipulating the form data before it is extracted;
	// convenient for use with rich editors like tinyMCE or FCKEditor
	var veto = {};
	this.trigger('form-pre-serialize', [this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
		return this;
	}

	// provide opportunity to alter form data before it is serialized
	if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSerialize callback');
		return this;
	}

	var a = this.formToArray(options.semantic);
	if (options.data) {
		options.extraData = options.data;
		for (var n in options.data) {
		  if(options.data[n] instanceof Array) {
			for (var k in options.data[n])
			  a.push( { name: n, value: options.data[n][k] } );
		  }
		  else
			 a.push( { name: n, value: options.data[n] } );
		}
	}

	// give pre-submit callback an opportunity to abort the submit
	if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSubmit callback');
		return this;
	}

	// fire vetoable 'validate' event
	this.trigger('form-submit-validate', [a, this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
		return this;
	}

	var q = $.param(a);

	if (options.type.toUpperCase() == 'GET') {
		options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
		options.data = null;  // data is null for 'get'
	}
	else
		options.data = q; // data is the query string for 'post'

	var $form = this, callbacks = [];
	if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
	if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

	// perform a load on the target only if dataType is not provided
	if (!options.dataType && options.target) {
		var oldSuccess = options.success || function(){};
		callbacks.push(function(data) {
			var fn = options.replaceTarget ? 'replaceWith' : 'html';
			$(options.target)[fn](data).each(oldSuccess, arguments);
		});
	}
	else if (options.success)
		callbacks.push(options.success);

	options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
		for (var i=0, max=callbacks.length; i < max; i++)
			callbacks[i].apply(options, [data, status, xhr || $form, $form]);
	};

	// are there files to upload?
	var files = $('input:file', this).fieldValue();
	var found = false;
	for (var j=0; j < files.length; j++)
		if (files[j])
			found = true;

	var multipart = false;
//	var mp = 'multipart/form-data';
//	multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	// options.iframe allows user to force iframe mode
	// 06-NOV-09: now defaulting to iframe mode if file input is detected
   if ((files.length && options.iframe !== false) || options.iframe || found || multipart) {
	   // hack to fix Safari hang (thanks to Tim Molendijk for this)
	   // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
	   if (options.closeKeepAlive)
		   $.get(options.closeKeepAlive, fileUpload);
	   else
		   fileUpload();
	   }
   else
	   $.ajax(options);

	// fire 'notify' event
	this.trigger('form-submit-notify', [this, options]);
	return this;


	// private function for handling file uploads (hat tip to YAHOO!)
	function fileUpload() {
		var form = $form[0];

		if ($(':input[name=submit]', form).length) {
			alert('Error: Form elements must not be named "submit".');
			return;
		}

		var opts = $.extend({}, $.ajaxSettings, options);
		var s = $.extend(true, {}, $.extend(true, {}, $.ajaxSettings), opts);

		var id = 'jqFormIO' + (new Date().getTime());
		var $io = $('<iframe id="' + id + '" name="' + id + '" src="'+ opts.iframeSrc +'" onload="(jQuery(this).data(\'form-plugin-onload\'))()" />');
		var io = $io[0];

		$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

		var xhr = { // mock object
			aborted: 0,
			responseText: null,
			responseXML: null,
			status: 0,
			statusText: 'n/a',
			getAllResponseHeaders: function() {},
			getResponseHeader: function() {},
			setRequestHeader: function() {},
			abort: function() {
				this.aborted = 1;
				$io.attr('src', opts.iframeSrc); // abort op in progress
			}
		};

		var g = opts.global;
		// trigger ajax global events so that activity/block indicators work like normal
		if (g && ! $.active++) $.event.trigger("ajaxStart");
		if (g) $.event.trigger("ajaxSend", [xhr, opts]);

		if (s.beforeSend && s.beforeSend(xhr, s) === false) {
			s.global && $.active--;
			return;
		}
		if (xhr.aborted)
			return;

		var cbInvoked = false;
		var timedOut = 0;

		// add submitting element to data if we know it
		var sub = form.clk;
		if (sub) {
			var n = sub.name;
			if (n && !sub.disabled) {
				opts.extraData = opts.extraData || {};
				opts.extraData[n] = sub.value;
				if (sub.type == "image") {
					opts.extraData[n+'.x'] = form.clk_x;
					opts.extraData[n+'.y'] = form.clk_y;
				}
			}
		}

		// take a breath so that pending repaints get some cpu time before the upload starts
		function doSubmit() {
			// make sure form attrs are set
			var t = $form.attr('target'), a = $form.attr('action');

			// update form attrs in IE friendly way
			form.setAttribute('target',id);
			if (form.getAttribute('method') != 'POST')
				form.setAttribute('method', 'POST');
			if (form.getAttribute('action') != opts.url)
				form.setAttribute('action', opts.url);

			// ie borks in some cases when setting encoding
			if (! opts.skipEncodingOverride) {
				$form.attr({
					encoding: 'multipart/form-data',
					enctype:  'multipart/form-data'
				});
			}

			// support timout
			if (opts.timeout)
				setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

			// add "extra" data to form if provided in options
			var extraInputs = [];
			try {
				if (opts.extraData)
					for (var n in opts.extraData)
						extraInputs.push(
							$('<input type="hidden" name="'+n+'" value="'+opts.extraData[n]+'" />')
								.appendTo(form)[0]);

				// add iframe to doc and submit the form
				$io.appendTo('body');
				$io.data('form-plugin-onload', cb);
				form.submit();
			}
			finally {
				// reset attrs and remove "extra" input elements
				form.setAttribute('action',a);
				t ? form.setAttribute('target', t) : $form.removeAttr('target');
				$(extraInputs).remove();
			}
		};

		if (opts.forceSync)
			doSubmit();
		else
			setTimeout(doSubmit, 10); // this lets dom updates render
	
		var domCheckCount = 100;

		function cb() {
			if (cbInvoked) 
				return;

			var ok = true;
			try {
				if (timedOut) throw 'timeout';
				// extract the server response from the iframe
				var data, doc;

				doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
				
				var isXml = opts.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
				log('isXml='+isXml);
				if (!isXml && (doc.body == null || doc.body.innerHTML == '')) {
				 	if (--domCheckCount) {
						// in some browsers (Opera) the iframe DOM is not always traversable when
						// the onload callback fires, so we loop a bit to accommodate
				 		log('requeing onLoad callback, DOM not available');
						setTimeout(cb, 250);
						return;
					}
					log('Could not access iframe DOM after 100 tries.');
					return;
				}

				log('response detected');
				cbInvoked = true;
				xhr.responseText = doc.body ? doc.body.innerHTML : null;
				xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
				xhr.getResponseHeader = function(header){
					var headers = {'content-type': opts.dataType};
					return headers[header];
				};

				if (opts.dataType == 'json' || opts.dataType == 'script') {
					// see if user embedded response in textarea
					var ta = doc.getElementsByTagName('textarea')[0];
					if (ta)
						xhr.responseText = ta.value;
					else {
						// account for browsers injecting pre around json response
						var pre = doc.getElementsByTagName('pre')[0];
						if (pre)
							xhr.responseText = pre.innerHTML;
					}			  
				}
				else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
					xhr.responseXML = toXml(xhr.responseText);
				}
				data = $.httpData(xhr, opts.dataType);
			}
			catch(e){
				log('error caught:',e);
				ok = false;
				xhr.error = e;
				$.handleError(opts, xhr, 'error', e);
			}

			// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
			if (ok) {
				opts.success(data, 'success');
				if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
			}
			if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
			if (g && ! --$.active) $.event.trigger("ajaxStop");
			if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

			// clean up
			setTimeout(function() {
				$io.removeData('form-plugin-onload');
				$io.remove();
				xhr.responseXML = null;
			}, 100);
		};

		function toXml(s, doc) {
			if (window.ActiveXObject) {
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(s);
			}
			else
				doc = (new DOMParser()).parseFromString(s, 'text/xml');
			return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
		};
	};
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *	is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *	used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
	return this.ajaxFormUnbind().bind('submit.form-plugin', function(e) {
		e.preventDefault();
		$(this).ajaxSubmit(options);
	}).bind('click.form-plugin', function(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
			// is this a child element of the submit el?  (ex: a span within a button)
			var t = $el.closest(':submit');
			if (t.length == 0)
				return;
			target = t[0];
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX != undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop;
			}
		}
		// clear form vars
		setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	});
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
	return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
	var a = [];
	if (this.length == 0) return a;

	var form = this[0];
	var els = semantic ? form.getElementsByTagName('*') : form.elements;
	if (!els) return a;
	for(var i=0, max=els.length; i < max; i++) {
		var el = els[i];
		var n = el.name;
		if (!n) continue;

		if (semantic && form.clk && el.type == "image") {
			// handle image inputs on the fly when semantic == true
			if(!el.disabled && form.clk == el) {
				a.push({name: n, value: $(el).val()});
				a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
			}
			continue;
		}

		var v = $.fieldValue(el, true);
		if (v && v.constructor == Array) {
			for(var j=0, jmax=v.length; j < jmax; j++)
				a.push({name: n, value: v[j]});
		}
		else if (v !== null && typeof v != 'undefined')
			a.push({name: n, value: v});
	}

	if (!semantic && form.clk) {
		// input type=='image' are not found in elements array! handle it here
		var $input = $(form.clk), input = $input[0], n = input.name;
		if (n && !input.disabled && input.type == 'image') {
			a.push({name: n, value: $input.val()});
			a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
		}
	}
	return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
	//hand off to jQuery.param for proper encoding
	return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
	var a = [];
	this.each(function() {
		var n = this.name;
		if (!n) return;
		var v = $.fieldValue(this, successful);
		if (v && v.constructor == Array) {
			for (var i=0,max=v.length; i < max; i++)
				a.push({name: n, value: v[i]});
		}
		else if (v !== null && typeof v != 'undefined')
			a.push({name: this.name, value: v});
	});
	//hand off to jQuery.param for proper encoding
	return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *	  <input name="A" type="text" />
 *	  <input name="A" type="text" />
 *	  <input name="B" type="checkbox" value="B1" />
 *	  <input name="B" type="checkbox" value="B2"/>
 *	  <input name="C" type="radio" value="C1" />
 *	  <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *	   array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
	for (var val=[], i=0, max=this.length; i < max; i++) {
		var el = this[i];
		var v = $.fieldValue(el, successful);
		if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
			continue;
		v.constructor == Array ? $.merge(val, v) : val.push(v);
	}
	return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
	var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	if (typeof successful == 'undefined') successful = true;

	if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1))
			return null;

	if (tag == 'select') {
		var index = el.selectedIndex;
		if (index < 0) return null;
		var a = [], ops = el.options;
		var one = (t == 'select-one');
		var max = (one ? index+1 : ops.length);
		for(var i=(one ? index : 0); i < max; i++) {
			var op = ops[i];
			if (op.selected) {
				var v = op.value;
				if (!v) // extra pain for IE...
					v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
				if (one) return v;
				a.push(v);
			}
		}
		return a;
	}
	return el.value;
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
	return this.each(function() {
		$('input,select,textarea', this).clearFields();
	});
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
	return this.each(function() {
		var t = this.type, tag = this.tagName.toLowerCase();
		if (t == 'text' || t == 'password' || tag == 'textarea')
			this.value = '';
		else if (t == 'checkbox' || t == 'radio')
			this.checked = false;
		else if (tag == 'select')
			this.selectedIndex = -1;
	});
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
	return this.each(function() {
		// guard against an input with the name of 'reset'
		// note that IE reports the reset function as an 'object'
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
			this.reset();
	});
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
	if (b == undefined) b = true;
	return this.each(function() {
		this.disabled = !b;
	});
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
	if (select == undefined) select = true;
	return this.each(function() {
		var t = this.type;
		if (t == 'checkbox' || t == 'radio')
			this.checked = select;
		else if (this.tagName.toLowerCase() == 'option') {
			var $sel = $(this).parent('select');
			if (select && $sel[0] && $sel[0].type == 'select-one') {
				// deselect all other options
				$sel.find('option').selected(false);
			}
			this.selected = select;
		}
	});
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
	if ($.fn.ajaxSubmit.debug) {
		var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
		if (window.console && window.console.log)
			window.console.log(msg);
		else if (window.opera && window.opera.postError)
			window.opera.postError(msg);
	}
};

})(jQuery);

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
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2017 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this ||
            {};

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-parameter case has been omitted only because no current consumers
      // made use of it.
      case null:
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var builtinIteratee;

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    return _.property(value);
  };

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
  // This accumulates the arguments passed into an array, after a given index.
  var restArgs = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var shallowProperty = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  var createReduce = function(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = restArgs(function(obj, path, args) {
    var contextPath, func;
    if (_.isFunction(path)) {
      func = path;
    } else if (_.isArray(path)) {
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return _.map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection.
  _.shuffle = function(obj) {
    return _.sample(obj, Infinity);
  };

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = _.random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (_.isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null || array.length < 1) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null || array.length < 1) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, Boolean);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = restArgs(function(array, otherArrays) {
    return _.difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = restArgs(function(arrays) {
    return _.uniq(flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = restArgs(function(array, rest) {
    rest = flatten(rest, true, true);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  });

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = restArgs(_.unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of _.pairs.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions.
  var createPredicateIndexFinder = function(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  };

  // Returns the first index on an array-like that passes a predicate test.
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions.
  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Split an **array** into several arrays containing **count** or less elements
  // of initial array.
  _.chunk = function(array, count) {
    if (count == null || count < 1) return [];

    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = restArgs(function(func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArgs(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  _.partial = restArgs(function(func, boundArgs) {
    var placeholder = _.partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  _.partial.placeholder = _;

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = restArgs(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  });

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = restArgs(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArgs(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  _.restArgs = restArgs;

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  var collectNonEnumProps = function(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  };

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object.
  // In contrast to _.map it returns an object.
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj),
        length = keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of _.object.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`.
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test.
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Internal pick helper function to determine if `obj` has key `key`.
  var keyInObj = function(value, key, obj) {
    return key in obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = restArgs(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = _.allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the blacklisted properties.
  _.omit = restArgs(function(obj, keys) {
    var iteratee = keys[0], context;
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = _.map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  });

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq, deepEq;
  eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  };

  // Internal recursive comparison function for `isEqual`.
  deepEq = function(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj);
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, path) {
    if (!_.isArray(path)) {
      return obj != null && hasOwnProperty.call(obj, path);
    }
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (obj == null || !hasOwnProperty.call(obj, key)) {
        return false;
      }
      obj = obj[key];
    }
    return !!length;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(path) {
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  };

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    if (obj == null) {
      return function(){};
    }
    return function(path) {
      return !_.isArray(path) ? obj[path] : deepGet(obj, path);
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  _.result = function(obj, path, fallback) {
    if (!_.isArray(path)) path = [path];
    var length = path.length;
    if (!length) {
      return _.isFunction(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = _.isFunction(prop) ? prop.call(obj) : prop;
    }
    return obj;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define == 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}());
(function(e,t){"use strict";var n=e.History=e.History||{},r=e.jQuery;if(typeof n.Adapter!="undefined")console.log('History.js Adapter has already been loaded...');n.Adapter={bind:function(e,t,n){r(e).bind(t,n)},trigger:function(e,t,n){r(e).trigger(t,n)},extractEventData:function(e,n,r){var i=n&&n.originalEvent&&n.originalEvent[e]||r&&r[e]||t;return i},onDomLoad:function(e){r(e)}},typeof n.init!="undefined"&&n.init()})(window),function(e,t){"use strict";var n=e.console||t,r=e.document,i=e.navigator,s=!1,o=e.setTimeout,u=e.clearTimeout,a=e.setInterval,f=e.clearInterval,l=e.JSON,c=e.alert,h=e.History=e.History||{},p=e.history;try{s=e.sessionStorage,s.setItem("TEST","1"),s.removeItem("TEST")}catch(d){s=!1}l.stringify=l.stringify||l.encode,l.parse=l.parse||l.decode;if(typeof h.init!="undefined")throw new Error("History.js Core has already been loaded...");h.init=function(e){return typeof h.Adapter=="undefined"?!1:(typeof h.initCore!="undefined"&&h.initCore(),typeof h.initHtml4!="undefined"&&h.initHtml4(),!0)},h.initCore=function(d){if(typeof h.initCore.initialized!="undefined")return!1;h.initCore.initialized=!0,h.options=h.options||{},h.options.hashChangeInterval=h.options.hashChangeInterval||100,h.options.safariPollInterval=h.options.safariPollInterval||500,h.options.doubleCheckInterval=h.options.doubleCheckInterval||500,h.options.disableSuid=h.options.disableSuid||!1,h.options.storeInterval=h.options.storeInterval||1e3,h.options.busyDelay=h.options.busyDelay||250,h.options.debug=h.options.debug||!1,h.options.initialTitle=h.options.initialTitle||r.title,h.options.html4Mode=h.options.html4Mode||!1,h.options.delayInit=h.options.delayInit||!1,h.intervalList=[],h.clearAllIntervals=function(){var e,t=h.intervalList;if(typeof t!="undefined"&&t!==null){for(e=0;e<t.length;e++)f(t[e]);h.intervalList=null}},h.debug=function(){(h.options.debug||!1)&&h.log.apply(h,arguments)},h.log=function(){var e=typeof n!="undefined"&&typeof n.log!="undefined"&&typeof n.log.apply!="undefined",t=r.getElementById("log"),i,s,o,u,a;e?(u=Array.prototype.slice.call(arguments),i=u.shift(),typeof n.debug!="undefined"?n.debug.apply(n,[i,u]):n.log.apply(n,[i,u])):i="\n"+arguments[0]+"\n";for(s=1,o=arguments.length;s<o;++s){a=arguments[s];if(typeof a=="object"&&typeof l!="undefined")try{a=l.stringify(a)}catch(f){}i+="\n"+a+"\n"}return t?(t.value+=i+"\n-----\n",t.scrollTop=t.scrollHeight-t.clientHeight):e||c(i),!0},h.getInternetExplorerMajorVersion=function(){var e=h.getInternetExplorerMajorVersion.cached=typeof h.getInternetExplorerMajorVersion.cached!="undefined"?h.getInternetExplorerMajorVersion.cached:function(){var e=3,t=r.createElement("div"),n=t.getElementsByTagName("i");while((t.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->")&&n[0]);return e>4?e:!1}();return e},h.isInternetExplorer=function(){var e=h.isInternetExplorer.cached=typeof h.isInternetExplorer.cached!="undefined"?h.isInternetExplorer.cached:Boolean(h.getInternetExplorerMajorVersion());return e},h.options.html4Mode?h.emulated={pushState:!0,hashChange:!0}:h.emulated={pushState:!Boolean(e.history&&e.history.pushState&&e.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),hashChange:Boolean(!("onhashchange"in e||"onhashchange"in r)||h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8)},h.enabled=!h.emulated.pushState,h.bugs={setHash:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),safariPoll:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),ieDoubleCheck:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<7)},h.isEmptyObject=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},h.cloneObject=function(e){var t,n;return e?(t=l.stringify(e),n=l.parse(t)):n={},n},h.getRootUrl=function(){var e=r.location.protocol+"//"+(r.location.hostname||r.location.host);if(r.location.port||!1)e+=":"+r.location.port;return e+="/",e},h.getBaseHref=function(){var e=r.getElementsByTagName("base"),t=null,n="";return e.length===1&&(t=e[0],n=t.href.replace(/[^\/]+$/,"")),n=n.replace(/\/+$/,""),n&&(n+="/"),n},h.getBaseUrl=function(){var e=h.getBaseHref()||h.getBasePageUrl()||h.getRootUrl();return e},h.getPageUrl=function(){var e=h.getState(!1,!1),t=(e||{}).url||h.getLocationHref(),n;return n=t.replace(/\/+$/,"").replace(/[^\/]+$/,function(e,t,n){return/\./.test(e)?e:e+"/"}),n},h.getBasePageUrl=function(){var e=h.getLocationHref().replace(/[#\?].*/,"").replace(/[^\/]+$/,function(e,t,n){return/[^\/]$/.test(e)?"":e}).replace(/\/+$/,"")+"/";return e},h.getFullUrl=function(e,t){var n=e,r=e.substring(0,1);return t=typeof t=="undefined"?!0:t,/[a-z]+\:\/\//.test(e)||(r==="/"?n=h.getRootUrl()+e.replace(/^\/+/,""):r==="#"?n=h.getPageUrl().replace(/#.*/,"")+e:r==="?"?n=h.getPageUrl().replace(/[\?#].*/,"")+e:t?n=h.getBaseUrl()+e.replace(/^(\.\/)+/,""):n=h.getBasePageUrl()+e.replace(/^(\.\/)+/,"")),n.replace(/\#$/,"")},h.getShortUrl=function(e){var t=e,n=h.getBaseUrl(),r=h.getRootUrl();return h.emulated.pushState&&(t=t.replace(n,"")),t=t.replace(r,"/"),h.isTraditionalAnchor(t)&&(t="./"+t),t=t.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),t},h.getLocationHref=function(e){return e=e||r,e.URL===e.location.href?e.location.href:e.location.href===decodeURIComponent(e.URL)?e.URL:e.location.hash&&decodeURIComponent(e.location.href.replace(/^[^#]+/,""))===e.location.hash?e.location.href:e.URL.indexOf("#")==-1&&e.location.href.indexOf("#")!=-1?e.location.href:e.URL||e.location.href},h.store={},h.idToState=h.idToState||{},h.stateToId=h.stateToId||{},h.urlToId=h.urlToId||{},h.storedStates=h.storedStates||[],h.savedStates=h.savedStates||[],h.normalizeStore=function(){h.store.idToState=h.store.idToState||{},h.store.urlToId=h.store.urlToId||{},h.store.stateToId=h.store.stateToId||{}},h.getState=function(e,t){typeof e=="undefined"&&(e=!0),typeof t=="undefined"&&(t=!0);var n=h.getLastSavedState();return!n&&t&&(n=h.createStateObject()),e&&(n=h.cloneObject(n),n.url=n.cleanUrl||n.url),n},h.getIdByState=function(e){var t=h.extractId(e.url),n;if(!t){n=h.getStateString(e);if(typeof h.stateToId[n]!="undefined")t=h.stateToId[n];else if(typeof h.store.stateToId[n]!="undefined")t=h.store.stateToId[n];else{for(;;){t=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof h.idToState[t]=="undefined"&&typeof h.store.idToState[t]=="undefined")break}h.stateToId[n]=t,h.idToState[t]=e}}return t},h.normalizeState=function(e){var t,n;if(!e||typeof e!="object")e={};if(typeof e.normalized!="undefined")return e;if(!e.data||typeof e.data!="object")e.data={};return t={},t.normalized=!0,t.title=e.title||"",t.url=h.getFullUrl(e.url?e.url:h.getLocationHref()),t.hash=h.getShortUrl(t.url),t.data=h.cloneObject(e.data),t.id=h.getIdByState(t),t.cleanUrl=t.url.replace(/\??\&_suid.*/,""),t.url=t.cleanUrl,n=!h.isEmptyObject(t.data),(t.title||n)&&h.options.disableSuid!==!0&&(t.hash=h.getShortUrl(t.url).replace(/\??\&_suid.*/,""),/\?/.test(t.hash)||(t.hash+="?"),t.hash+="&_suid="+t.id),t.hashedUrl=h.getFullUrl(t.hash),(h.emulated.pushState||h.bugs.safariPoll)&&h.hasUrlDuplicate(t)&&(t.url=t.hashedUrl),t},h.createStateObject=function(e,t,n){var r={data:e,title:t,url:n};return r=h.normalizeState(r),r},h.getStateById=function(e){e=String(e);var n=h.idToState[e]||h.store.idToState[e]||t;return n},h.getStateString=function(e){var t,n,r;return t=h.normalizeState(e),n={data:t.data,title:e.title,url:e.url},r=l.stringify(n),r},h.getStateId=function(e){var t,n;return t=h.normalizeState(e),n=t.id,n},h.getHashByState=function(e){var t,n;return t=h.normalizeState(e),n=t.hash,n},h.extractId=function(e){var t,n,r,i;return e.indexOf("#")!=-1?i=e.split("#")[0]:i=e,n=/(.*)\&_suid=([0-9]+)$/.exec(i),r=n?n[1]||e:e,t=n?String(n[2]||""):"",t||!1},h.isTraditionalAnchor=function(e){var t=!/[\/\?\.]/.test(e);return t},h.extractState=function(e,t){var n=null,r,i;return t=t||!1,r=h.extractId(e),r&&(n=h.getStateById(r)),n||(i=h.getFullUrl(e),r=h.getIdByUrl(i)||!1,r&&(n=h.getStateById(r)),!n&&t&&!h.isTraditionalAnchor(e)&&(n=h.createStateObject(null,null,i))),n},h.getIdByUrl=function(e){var n=h.urlToId[e]||h.store.urlToId[e]||t;return n},h.getLastSavedState=function(){return h.savedStates[h.savedStates.length-1]||t},h.getLastStoredState=function(){return h.storedStates[h.storedStates.length-1]||t},h.hasUrlDuplicate=function(e){var t=!1,n;return n=h.extractState(e.url),t=n&&n.id!==e.id,t},h.storeState=function(e){return h.urlToId[e.url]=e.id,h.storedStates.push(h.cloneObject(e)),e},h.isLastSavedState=function(e){var t=!1,n,r,i;return h.savedStates.length&&(n=e.id,r=h.getLastSavedState(),i=r.id,t=n===i),t},h.saveState=function(e){return h.isLastSavedState(e)?!1:(h.savedStates.push(h.cloneObject(e)),!0)},h.getStateByIndex=function(e){var t=null;return typeof e=="undefined"?t=h.savedStates[h.savedStates.length-1]:e<0?t=h.savedStates[h.savedStates.length+e]:t=h.savedStates[e],t},h.getCurrentIndex=function(){var e=null;return h.savedStates.length<1?e=0:e=h.savedStates.length-1,e},h.getHash=function(e){var t=h.getLocationHref(e),n;return n=h.getHashByUrl(t),n},h.unescapeHash=function(e){var t=h.normalizeHash(e);return t=decodeURIComponent(t),t},h.normalizeHash=function(e){var t=e.replace(/[^#]*#/,"").replace(/#.*/,"");return t},h.setHash=function(e,t){var n,i;return t!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.setHash,args:arguments,queue:t}),!1):(h.busy(!0),n=h.extractState(e,!0),n&&!h.emulated.pushState?h.pushState(n.data,n.title,n.url,!1):h.getHash()!==e&&(h.bugs.setHash?(i=h.getPageUrl(),h.pushState(null,null,i+"#"+e,!1)):r.location.hash=e),h)},h.escapeHash=function(t){var n=h.normalizeHash(t);return n=e.encodeURIComponent(n),h.bugs.hashEscape||(n=n.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),n},h.getHashByUrl=function(e){var t=String(e).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return t=h.unescapeHash(t),t},h.setTitle=function(e){var t=e.title,n;t||(n=h.getStateByIndex(0),n&&n.url===e.url&&(t=n.title||h.options.initialTitle));try{r.getElementsByTagName("title")[0].innerHTML=t.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(i){}return r.title=t,h},h.queues=[],h.busy=function(e){typeof e!="undefined"?h.busy.flag=e:typeof h.busy.flag=="undefined"&&(h.busy.flag=!1);if(!h.busy.flag){u(h.busy.timeout);var t=function(){var e,n,r;if(h.busy.flag)return;for(e=h.queues.length-1;e>=0;--e){n=h.queues[e];if(n.length===0)continue;r=n.shift(),h.fireQueueItem(r),h.busy.timeout=o(t,h.options.busyDelay)}};h.busy.timeout=o(t,h.options.busyDelay)}return h.busy.flag},h.busy.flag=!1,h.fireQueueItem=function(e){return e.callback.apply(e.scope||h,e.args||[])},h.pushQueue=function(e){return h.queues[e.queue||0]=h.queues[e.queue||0]||[],h.queues[e.queue||0].push(e),h},h.queue=function(e,t){return typeof e=="function"&&(e={callback:e}),typeof t!="undefined"&&(e.queue=t),h.busy()?h.pushQueue(e):h.fireQueueItem(e),h},h.clearQueue=function(){return h.busy.flag=!1,h.queues=[],h},h.stateChanged=!1,h.doubleChecker=!1,h.doubleCheckComplete=function(){return h.stateChanged=!0,h.doubleCheckClear(),h},h.doubleCheckClear=function(){return h.doubleChecker&&(u(h.doubleChecker),h.doubleChecker=!1),h},h.doubleCheck=function(e){return h.stateChanged=!1,h.doubleCheckClear(),h.bugs.ieDoubleCheck&&(h.doubleChecker=o(function(){return h.doubleCheckClear(),h.stateChanged||e(),!0},h.options.doubleCheckInterval)),h},h.safariStatePoll=function(){var t=h.extractState(h.getLocationHref()),n;if(!h.isLastSavedState(t))return n=t,n||(n=h.createStateObject()),h.Adapter.trigger(e,"popstate"),h;return},h.back=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.back,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.back(!1)}),p.go(-1),!0)},h.forward=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.forward,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.forward(!1)}),p.go(1),!0)},h.go=function(e,t){var n;if(e>0)for(n=1;n<=e;++n)h.forward(t);else{if(!(e<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(n=-1;n>=e;--n)h.back(t)}return h};if(h.emulated.pushState){var v=function(){};h.pushState=h.pushState||v,h.replaceState=h.replaceState||v}else h.onPopState=function(t,n){var r=!1,i=!1,s,o;return h.doubleCheckComplete(),s=h.getHash(),s?(o=h.extractState(s||h.getLocationHref(),!0),o?h.replaceState(o.data,o.title,o.url,!1):(h.Adapter.trigger(e,"anchorchange"),h.busy(!1)),h.expectedStateId=!1,!1):(r=h.Adapter.extractEventData("state",t,n)||!1,r?i=h.getStateById(r):h.expectedStateId?i=h.getStateById(h.expectedStateId):i=h.extractState(h.getLocationHref()),i||(i=h.createStateObject(null,null,h.getLocationHref())),h.expectedStateId=!1,h.isLastSavedState(i)?(h.busy(!1),!1):(h.storeState(i),h.saveState(i),h.setTitle(i),h.Adapter.trigger(e,"statechange"),h.busy(!1),!0))},h.Adapter.bind(e,"popstate",h.onPopState),h.pushState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.pushState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.pushState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0},h.replaceState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.replaceState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.replaceState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0};if(s){try{h.store=l.parse(s.getItem("History.store"))||{}}catch(m){h.store={}}h.normalizeStore()}else h.store={},h.normalizeStore();h.Adapter.bind(e,"unload",h.clearAllIntervals),h.saveState(h.storeState(h.extractState(h.getLocationHref(),!0))),s&&(h.onUnload=function(){var e,t,n;try{e=l.parse(s.getItem("History.store"))||{}}catch(r){e={}}e.idToState=e.idToState||{},e.urlToId=e.urlToId||{},e.stateToId=e.stateToId||{};for(t in h.idToState){if(!h.idToState.hasOwnProperty(t))continue;e.idToState[t]=h.idToState[t]}for(t in h.urlToId){if(!h.urlToId.hasOwnProperty(t))continue;e.urlToId[t]=h.urlToId[t]}for(t in h.stateToId){if(!h.stateToId.hasOwnProperty(t))continue;e.stateToId[t]=h.stateToId[t]}h.store=e,h.normalizeStore(),n=l.stringify(e);try{s.setItem("History.store",n)}catch(i){if(i.code!==DOMException.QUOTA_EXCEEDED_ERR)throw i;s.length&&(s.removeItem("History.store"),s.setItem("History.store",n))}},h.intervalList.push(a(h.onUnload,h.options.storeInterval)),h.Adapter.bind(e,"beforeunload",h.onUnload),h.Adapter.bind(e,"unload",h.onUnload));if(!h.emulated.pushState){h.bugs.safariPoll&&h.intervalList.push(a(h.safariStatePoll,h.options.safariPollInterval));if(i.vendor==="Apple Computer, Inc."||(i.appCodeName||"")==="Mozilla")h.Adapter.bind(e,"hashchange",function(){h.Adapter.trigger(e,"popstate")}),h.getHash()&&h.Adapter.onDomLoad(function(){h.Adapter.trigger(e,"hashchange")})}},(!h.options||!h.options.delayInit)&&h.init()}(window)
;(function(window, document) {

  var doc = document
    , head = doc.getElementsByTagName('head')[0]
    , s = 'string'
    , f = false
    , push = 'push'
    , readyState = 'readyState'
    , onreadystatechange = 'onreadystatechange'
    , list = {}
    , ids = {}
    , delay = {}
    , scripts = {}
    , scriptpath
    , urlArgs;

  function every(ar, fn) {
    for (var i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return f
    return 1
  }
  function each(ar, fn) {
    every(ar, function (el) {
      fn(el)
      return 1
    })
  }

  function $script(paths, idOrDone, optDone) {
    paths = paths[push] ? paths : [paths]
    var idOrDoneIsDone = idOrDone && idOrDone.call
      , done = idOrDoneIsDone ? idOrDone : optDone
      , id = idOrDoneIsDone ? paths.join('') : idOrDone
      , queue = paths.length
    function loopFn(item) {
      return item.call ? item() : list[item]
    }
    function callback() {
      if (!--queue) {
        list[id] = 1
        done && done()
        for (var dset in delay) {
          every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = [])
        }
      }
    }
    setTimeout(function () {
      each(paths, function loading(path, force) {
        if (path === null) return callback()
        
        if (!force && !/^https?:\/\//.test(path) && scriptpath) {
          path = (path.indexOf('.js') === -1) ? scriptpath + path + '.js' : scriptpath + path;
        }
        
        if (scripts[path]) {
          if (id) ids[id] = 1
          return (scripts[path] == 2) ? callback() : setTimeout(function () { loading(path, true) }, 0)
        }

        scripts[path] = 1
        if (id) ids[id] = 1
        create(path, callback)
      })
    }, 0)
    return $script
  }

  function create(path, fn) {
    var el = doc.createElement('script'), loaded
    el.onload = el.onerror = el[onreadystatechange] = function () {
      if ((el[readyState] && !(/^c|loade/.test(el[readyState]))) || loaded) return;
      el.onload = el[onreadystatechange] = null
      loaded = 1
      scripts[path] = 2
      fn()
    }
    el.async = 1
    el.src = urlArgs ? path + (path.indexOf('?') === -1 ? '?' : '&') + urlArgs : path;
    head.insertBefore(el, head.lastChild)
  }

  $script.get = create

  $script.order = function (scripts, id, done) {
    (function callback(s) {
      s = scripts.shift()
      !scripts.length ? $script(s, id, done) : $script(s, callback)
    }())
  }

  $script.path = function (p) {
    scriptpath = p
  }
  $script.urlArgs = function (str) {
    urlArgs = str;
  }
  $script.ready = function (deps, ready, req) {
    deps = deps[push] ? deps : [deps]
    var missing = [];
    !each(deps, function (dep) {
      list[dep] || missing[push](dep);
    }) && every(deps, function (dep) {return list[dep]}) ?
      ready() : !function (key) {
      delay[key] = delay[key] || []
      delay[key][push](ready)
      req && req(missing)
    }(deps.join('|'))
    return $script
  }

  $script.done = function (idOrDone) {
    $script([null], idOrDone)
  }

  window.$script = $script;

}(typeof window !== "undefined" ? window : this, document));