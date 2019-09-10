/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
  var registeredInModuleLoader = false;
  if (typeof define === 'function' && define.amd) {
    define(factory);
    registeredInModuleLoader = true;
  }
  if (typeof exports === 'object') {
    module.exports = factory();
    registeredInModuleLoader = true;
  }
  if (!registeredInModuleLoader) {
    var OldCookies = window.Cookies;
    var api = window.Cookies = factory();
    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }
}(function () {
  function extend () {
    var i = 0;
    var result = {};
    for (; i < arguments.length; i++) {
      var attributes = arguments[ i ];
      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }
    return result;
  }

  function init (converter) {
    function api (key, value, attributes) {
      var result;
      if (typeof document === 'undefined') {
        return;
      }

      // Write

      if (arguments.length > 1) {
        attributes = extend({
          path: '/'
        }, api.defaults, attributes);

        if (typeof attributes.expires === 'number') {
          var expires = new Date();
          expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
          attributes.expires = expires;
        }

        try {
          result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {}

        if (!converter.write) {
          value = encodeURIComponent(String(value))
            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        } else {
          value = converter.write(value, key);
        }

        key = encodeURIComponent(String(key));
        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
        key = key.replace(/[\(\)]/g, escape);

        return (document.cookie = [
          key, '=', value,
          attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
          attributes.path ? '; path=' + attributes.path : '',
          attributes.domain ? '; domain=' + attributes.domain : '',
          attributes.secure ? '; secure' : ''
        ].join(''));
      }

      // Read

      if (!key) {
        result = {};
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling "get()"
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var rdecode = /(%[0-9A-Z]{2})+/g;
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var cookie = parts.slice(1).join('=');

        if (cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          var name = parts[0].replace(rdecode, decodeURIComponent);
          cookie = converter.read ?
            converter.read(cookie, name) : converter(cookie, name) ||
            cookie.replace(rdecode, decodeURIComponent);

          if (this.json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
          }

          if (key === name) {
            result = cookie;
            break;
          }

          if (!key) {
            result[name] = cookie;
          }
        } catch (e) {}
      }

      return result;
    }

    api.set = api;
    api.get = function (key) {
      return api.call(api, key);
    };
    api.getJSON = function () {
      return api.apply({
        json: true
      }, [].slice.call(arguments));
    };
    api.defaults = {};

    api.remove = function (key, attributes) {
      api(key, '', extend(attributes, {
        expires: -1
      }));
    };

    api.withConverter = init;

    return api;
  }

  return init(function () {});
}));

//! moment.js
//! version : 2.13.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return fd.apply(null,arguments)}function b(a){fd=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Ja(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a),c=gd.call(b.parsedDateParts,function(a){return null!=a});a._isValid=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.invalidWeekday&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated&&(!b.meridiem||b.meridiem&&c),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a){return void 0===a}function n(a,b){var c,d,e;if(m(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),m(b._i)||(a._i=b._i),m(b._f)||(a._f=b._f),m(b._l)||(a._l=b._l),m(b._strict)||(a._strict=b._strict),m(b._tzm)||(a._tzm=b._tzm),m(b._isUTC)||(a._isUTC=b._isUTC),m(b._offset)||(a._offset=b._offset),m(b._pf)||(a._pf=j(b)),m(b._locale)||(a._locale=b._locale),hd.length>0)for(c in hd)d=hd[c],e=b[d],m(e)||(a[d]=e);return a}function o(b){n(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),id===!1&&(id=!0,a.updateOffset(this),id=!1)}function p(a){return a instanceof o||null!=a&&null!=a._isAMomentObject}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=q(b)),c}function s(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function t(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function u(b,c){var d=!0;return g(function(){return null!=a.deprecationHandler&&a.deprecationHandler(null,b),d&&(t(b+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),d=!1),c.apply(this,arguments)},c)}function v(b,c){null!=a.deprecationHandler&&a.deprecationHandler(b,c),jd[b]||(t(c),jd[b]=!0)}function w(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function x(a){return"[object Object]"===Object.prototype.toString.call(a)}function y(a){var b,c;for(c in a)b=a[c],w(b)?this[c]=b:this["_"+c]=b;this._config=a,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function z(a,b){var c,d=g({},a);for(c in b)f(b,c)&&(x(a[c])&&x(b[c])?(d[c]={},g(d[c],a[c]),g(d[c],b[c])):null!=b[c]?d[c]=b[c]:delete d[c]);return d}function A(a){null!=a&&this.set(a)}function B(a){return a?a.toLowerCase().replace("_","-"):a}function C(a){for(var b,c,d,e,f=0;f<a.length;){for(e=B(a[f]).split("-"),b=e.length,c=B(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=D(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&s(e,c,!0)>=b-1)break;b--}f++}return null}function D(a){var b=null;if(!nd[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=ld._abbr,require("./locale/"+a),E(b)}catch(c){}return nd[a]}function E(a,b){var c;return a&&(c=m(b)?H(a):F(a,b),c&&(ld=c)),ld._abbr}function F(a,b){return null!==b?(b.abbr=a,null!=nd[a]?(v("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"),b=z(nd[a]._config,b)):null!=b.parentLocale&&(null!=nd[b.parentLocale]?b=z(nd[b.parentLocale]._config,b):v("parentLocaleUndefined","specified parentLocale is not defined yet")),nd[a]=new A(b),E(a),nd[a]):(delete nd[a],null)}function G(a,b){if(null!=b){var c;null!=nd[a]&&(b=z(nd[a]._config,b)),c=new A(b),c.parentLocale=nd[a],nd[a]=c,E(a)}else null!=nd[a]&&(null!=nd[a].parentLocale?nd[a]=nd[a].parentLocale:null!=nd[a]&&delete nd[a]);return nd[a]}function H(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return ld;if(!c(a)){if(b=D(a))return b;a=[a]}return C(a)}function I(){return kd(nd)}function J(a,b){var c=a.toLowerCase();od[c]=od[c+"s"]=od[b]=a}function K(a){return"string"==typeof a?od[a]||od[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)f(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(b,c){return function(d){return null!=d?(O(this,b,d),a.updateOffset(this,c),this):N(this,b)}}function N(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function O(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function P(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=K(a),w(this[a]))return this[a](b);return this}function Q(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function R(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(sd[a]=e),b&&(sd[b[0]]=function(){return Q(e.apply(this,arguments),b[1],b[2])}),c&&(sd[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function S(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function T(a){var b,c,d=a.match(pd);for(b=0,c=d.length;c>b;b++)sd[d[b]]?d[b]=sd[d[b]]:d[b]=S(d[b]);return function(b){var e,f="";for(e=0;c>e;e++)f+=d[e]instanceof Function?d[e].call(b,a):d[e];return f}}function U(a,b){return a.isValid()?(b=V(b,a.localeData()),rd[b]=rd[b]||T(b),rd[b](a)):a.localeData().invalidDate()}function V(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(qd.lastIndex=0;d>=0&&qd.test(a);)a=a.replace(qd,c),qd.lastIndex=0,d-=1;return a}function W(a,b,c){Kd[a]=w(b)?b:function(a,d){return a&&c?c:b}}function X(a,b){return f(Kd,a)?Kd[a](b._strict,b._locale):new RegExp(Y(a))}function Y(a){return Z(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function Z(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function $(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=r(a)}),c=0;c<a.length;c++)Ld[a[c]]=d}function _(a,b){$(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function aa(a,b,c){null!=b&&f(Ld,a)&&Ld[a](b,c._a,c,a)}function ba(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function ca(a,b){return c(this._months)?this._months[a.month()]:this._months[Vd.test(b)?"format":"standalone"][a.month()]}function da(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[Vd.test(b)?"format":"standalone"][a.month()]}function ea(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],d=0;12>d;++d)f=h([2e3,d]),this._shortMonthsParse[d]=this.monthsShort(f,"").toLocaleLowerCase(),this._longMonthsParse[d]=this.months(f,"").toLocaleLowerCase();return c?"MMM"===b?(e=md.call(this._shortMonthsParse,g),-1!==e?e:null):(e=md.call(this._longMonthsParse,g),-1!==e?e:null):"MMM"===b?(e=md.call(this._shortMonthsParse,g),-1!==e?e:(e=md.call(this._longMonthsParse,g),-1!==e?e:null)):(e=md.call(this._longMonthsParse,g),-1!==e?e:(e=md.call(this._shortMonthsParse,g),-1!==e?e:null))}function fa(a,b,c){var d,e,f;if(this._monthsParseExact)return ea.call(this,a,b,c);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function ga(a,b){var c;if(!a.isValid())return a;if("string"==typeof b)if(/^\d+$/.test(b))b=r(b);else if(b=a.localeData().monthsParse(b),"number"!=typeof b)return a;return c=Math.min(a.date(),ba(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ha(b){return null!=b?(ga(this,b),a.updateOffset(this,!0),this):N(this,"Month")}function ia(){return ba(this.year(),this.month())}function ja(a){return this._monthsParseExact?(f(this,"_monthsRegex")||la.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex}function ka(a){return this._monthsParseExact?(f(this,"_monthsRegex")||la.call(this),a?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex}function la(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;12>b;b++)c=h([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;12>b;b++)d[b]=Z(d[b]),e[b]=Z(e[b]),f[b]=Z(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")","i")}function ma(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[Nd]<0||c[Nd]>11?Nd:c[Od]<1||c[Od]>ba(c[Md],c[Nd])?Od:c[Pd]<0||c[Pd]>24||24===c[Pd]&&(0!==c[Qd]||0!==c[Rd]||0!==c[Sd])?Pd:c[Qd]<0||c[Qd]>59?Qd:c[Rd]<0||c[Rd]>59?Rd:c[Sd]<0||c[Sd]>999?Sd:-1,j(a)._overflowDayOfYear&&(Md>b||b>Od)&&(b=Od),j(a)._overflowWeeks&&-1===b&&(b=Td),j(a)._overflowWeekday&&-1===b&&(b=Ud),j(a).overflow=b),a}function na(a){var b,c,d,e,f,g,h=a._i,i=$d.exec(h)||_d.exec(h);if(i){for(j(a).iso=!0,b=0,c=be.length;c>b;b++)if(be[b][1].exec(i[1])){e=be[b][0],d=be[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=ce.length;c>b;b++)if(ce[b][1].exec(i[3])){f=(i[2]||" ")+ce[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!ae.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),Ca(a)}else a._isValid=!1}function oa(b){var c=de.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(na(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function pa(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function qa(a){var b=new Date(Date.UTC.apply(null,arguments));return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function ra(a){return sa(a)?366:365}function sa(a){return a%4===0&&a%100!==0||a%400===0}function ta(){return sa(this.year())}function ua(a,b,c){var d=7+b-c,e=(7+qa(a,0,d).getUTCDay()-b)%7;return-e+d-1}function va(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ua(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=ra(f)+j):j>ra(a)?(f=a+1,g=j-ra(a)):(f=a,g=j),{year:f,dayOfYear:g}}function wa(a,b,c){var d,e,f=ua(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+xa(e,b,c)):g>xa(a.year(),b,c)?(d=g-xa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function xa(a,b,c){var d=ua(a,b,c),e=ua(a+1,b,c);return(ra(a)-d+e)/7}function ya(a,b,c){return null!=a?a:null!=b?b:c}function za(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function Aa(a){var b,c,d,e,f=[];if(!a._d){for(d=za(a),a._w&&null==a._a[Od]&&null==a._a[Nd]&&Ba(a),a._dayOfYear&&(e=ya(a._a[Md],d[Md]),a._dayOfYear>ra(e)&&(j(a)._overflowDayOfYear=!0),c=qa(e,0,a._dayOfYear),a._a[Nd]=c.getUTCMonth(),a._a[Od]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[Pd]&&0===a._a[Qd]&&0===a._a[Rd]&&0===a._a[Sd]&&(a._nextDay=!0,a._a[Pd]=0),a._d=(a._useUTC?qa:pa).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Pd]=24)}}function Ba(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=ya(b.GG,a._a[Md],wa(Ka(),1,4).year),d=ya(b.W,1),e=ya(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=ya(b.gg,a._a[Md],wa(Ka(),f,g).year),d=ya(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>xa(c,f,g)?j(a)._overflowWeeks=!0:null!=i?j(a)._overflowWeekday=!0:(h=va(c,d,e,f,g),a._a[Md]=h.year,a._dayOfYear=h.dayOfYear)}function Ca(b){if(b._f===a.ISO_8601)return void na(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=V(b._f,b._locale).match(pd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(X(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),sd[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),aa(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[Pd]<=12&&b._a[Pd]>0&&(j(b).bigHour=void 0),j(b).parsedDateParts=b._a.slice(0),j(b).meridiem=b._meridiem,b._a[Pd]=Da(b._locale,b._a[Pd],b._meridiem),Aa(b),ma(b)}function Da(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function Ea(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],Ca(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function Fa(a){if(!a._d){var b=L(a._i);a._a=e([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),Aa(a)}}function Ga(a){var b=new o(ma(Ha(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Ha(a){var b=a._i,e=a._f;return a._locale=a._locale||H(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),p(b)?new o(ma(b)):(c(e)?Ea(a):e?Ca(a):d(b)?a._d=b:Ia(a),k(a)||(a._d=null),a))}function Ia(b){var f=b._i;void 0===f?b._d=new Date(a.now()):d(f)?b._d=new Date(f.valueOf()):"string"==typeof f?oa(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),Aa(b)):"object"==typeof f?Fa(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Ja(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,Ga(f)}function Ka(a,b,c,d){return Ja(a,b,c,d,!1)}function La(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Ka();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function Ma(){var a=[].slice.call(arguments,0);return La("isBefore",a)}function Na(){var a=[].slice.call(arguments,0);return La("isAfter",a)}function Oa(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+1e3*h*60*60,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=H(),this._bubble()}function Pa(a){return a instanceof Oa}function Qa(a,b){R(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+Q(~~(a/60),2)+b+Q(~~a%60,2)})}function Ra(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(ie)||["-",0,0],f=+(60*e[1])+r(e[2]);return"+"===e[0]?f:-f}function Sa(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(p(b)||d(b)?b.valueOf():Ka(b).valueOf())-e.valueOf(),e._d.setTime(e._d.valueOf()+f),a.updateOffset(e,!1),e):Ka(b).local()}function Ta(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ua(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=Ra(Hd,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ta(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?jb(this,db(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ta(this):null!=b?this:NaN}function Va(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Wa(a){return this.utcOffset(0,a)}function Xa(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ta(this),"m")),this}function Ya(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ra(Gd,this._i)),this}function Za(a){return this.isValid()?(a=a?Ka(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function $a(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function _a(){if(!m(this._isDSTShifted))return this._isDSTShifted;var a={};if(n(a,this),a=Ha(a),a._a){var b=a._isUTC?h(a._a):Ka(a._a);this._isDSTShifted=this.isValid()&&s(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function ab(){return this.isValid()?!this._isUTC:!1}function bb(){return this.isValid()?this._isUTC:!1}function cb(){return this.isValid()?this._isUTC&&0===this._offset:!1}function db(a,b){var c,d,e,g=a,h=null;return Pa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=je.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[Od])*c,h:r(h[Pd])*c,m:r(h[Qd])*c,s:r(h[Rd])*c,ms:r(h[Sd])*c}):(h=ke.exec(a))?(c="-"===h[1]?-1:1,g={y:eb(h[2],c),M:eb(h[3],c),w:eb(h[4],c),d:eb(h[5],c),h:eb(h[6],c),m:eb(h[7],c),s:eb(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=gb(Ka(g.from),Ka(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Oa(g),Pa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function eb(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function fb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function gb(a,b){var c;return a.isValid()&&b.isValid()?(b=Sa(b,a),a.isBefore(b)?c=fb(a,b):(c=fb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function hb(a){return 0>a?-1*Math.round(-1*a):Math.round(a)}function ib(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(v(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=db(c,d),jb(this,e,a),this}}function jb(b,c,d,e){var f=c._milliseconds,g=hb(c._days),h=hb(c._months);b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(b._d.valueOf()+f*d),g&&O(b,"Date",N(b,"Date")+g*d),h&&ga(b,N(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function kb(a,b){var c=a||Ka(),d=Sa(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse",g=b&&(w(b[f])?b[f]():b[f]);return this.format(g||this.localeData().calendar(f,this,Ka(c)))}function lb(){return new o(this)}function mb(a,b){var c=p(a)?a:Ka(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?this.valueOf()>c.valueOf():c.valueOf()<this.clone().startOf(b).valueOf()):!1}function nb(a,b){var c=p(a)?a:Ka(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?this.valueOf()<c.valueOf():this.clone().endOf(b).valueOf()<c.valueOf()):!1}function ob(a,b,c,d){return d=d||"()",("("===d[0]?this.isAfter(a,c):!this.isBefore(a,c))&&(")"===d[1]?this.isBefore(b,c):!this.isAfter(b,c))}function pb(a,b){var c,d=p(a)?a:Ka(a);return this.isValid()&&d.isValid()?(b=K(b||"millisecond"),"millisecond"===b?this.valueOf()===d.valueOf():(c=d.valueOf(),this.clone().startOf(b).valueOf()<=c&&c<=this.clone().endOf(b).valueOf())):!1}function qb(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function rb(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function sb(a,b,c){var d,e,f,g;return this.isValid()?(d=Sa(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=tb(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:q(g)):NaN):NaN}function tb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)||0}function ub(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function vb(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?w(Date.prototype.toISOString)?this.toDate().toISOString():U(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):U(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function wb(b){b||(b=this.isUtc()?a.defaultFormatUtc:a.defaultFormat);var c=U(this,b);return this.localeData().postformat(c)}function xb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ka(a).isValid())?db({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function yb(a){return this.from(Ka(),a)}function zb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ka(a).isValid())?db({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function Ab(a){return this.to(Ka(),a)}function Bb(a){var b;return void 0===a?this._locale._abbr:(b=H(a),null!=b&&(this._locale=b),this)}function Cb(){return this._locale}function Db(a){switch(a=K(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function Eb(a){return a=K(a),void 0===a||"millisecond"===a?this:("date"===a&&(a="day"),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms"))}function Fb(){return this._d.valueOf()-6e4*(this._offset||0)}function Gb(){return Math.floor(this.valueOf()/1e3)}function Hb(){return this._offset?new Date(this.valueOf()):this._d}function Ib(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function Jb(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Kb(){return this.isValid()?this.toISOString():null}function Lb(){return k(this)}function Mb(){return g({},j(this))}function Nb(){return j(this).overflow}function Ob(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Pb(a,b){R(0,[a,a.length],0,b)}function Qb(a){return Ub.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Rb(a){return Ub.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Sb(){return xa(this.year(),1,4)}function Tb(){var a=this.localeData()._week;return xa(this.year(),a.dow,a.doy)}function Ub(a,b,c,d,e){var f;return null==a?wa(this,d,e).year:(f=xa(a,d,e),b>f&&(b=f),Vb.call(this,a,b,c,d,e))}function Vb(a,b,c,d,e){var f=va(a,b,c,d,e),g=qa(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Wb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Xb(a){return wa(a,this._week.dow,this._week.doy).week}function Yb(){return this._week.dow}function Zb(){return this._week.doy}function $b(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function _b(a){var b=wa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function ac(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function bc(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function cc(a){return this._weekdaysShort[a.day()]}function dc(a){return this._weekdaysMin[a.day()]}function ec(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],d=0;7>d;++d)f=h([2e3,1]).day(d),this._minWeekdaysParse[d]=this.weekdaysMin(f,"").toLocaleLowerCase(),this._shortWeekdaysParse[d]=this.weekdaysShort(f,"").toLocaleLowerCase(),this._weekdaysParse[d]=this.weekdays(f,"").toLocaleLowerCase();return c?"dddd"===b?(e=md.call(this._weekdaysParse,g),-1!==e?e:null):"ddd"===b?(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:null):(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null):"dddd"===b?(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null))):"ddd"===b?(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null))):(e=md.call(this._minWeekdaysParse,g),-1!==e?e:(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:null)))}function fc(a,b,c){var d,e,f;if(this._weekdaysParseExact)return ec.call(this,a,b,c);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){if(e=h([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function gc(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=ac(a,this.localeData()),this.add(a-b,"d")):b}function hc(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function ic(a){return this.isValid()?null==a?this.day()||7:this.day(this.day()%7?a:a-7):null!=a?this:NaN}function jc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysStrictRegex:this._weekdaysRegex):this._weekdaysStrictRegex&&a?this._weekdaysStrictRegex:this._weekdaysRegex}function kc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):this._weekdaysShortStrictRegex&&a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex}function lc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):this._weekdaysMinStrictRegex&&a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex}function mc(){function a(a,b){return b.length-a.length}var b,c,d,e,f,g=[],i=[],j=[],k=[];for(b=0;7>b;b++)c=h([2e3,1]).day(b),d=this.weekdaysMin(c,""),e=this.weekdaysShort(c,""),f=this.weekdays(c,""),g.push(d),i.push(e),j.push(f),k.push(d),k.push(e),k.push(f);for(g.sort(a),i.sort(a),j.sort(a),k.sort(a),b=0;7>b;b++)i[b]=Z(i[b]),j[b]=Z(j[b]),k[b]=Z(k[b]);this._weekdaysRegex=new RegExp("^("+k.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+j.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+g.join("|")+")","i")}function nc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function oc(){return this.hours()%12||12}function pc(){return this.hours()||24}function qc(a,b){R(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function rc(a,b){return b._meridiemParse}function sc(a){return"p"===(a+"").toLowerCase().charAt(0)}function tc(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function uc(a,b){b[Sd]=r(1e3*("0."+a))}function vc(){return this._isUTC?"UTC":""}function wc(){return this._isUTC?"Coordinated Universal Time":""}function xc(a){return Ka(1e3*a)}function yc(){return Ka.apply(null,arguments).parseZone()}function zc(a,b,c){var d=this._calendar[a];return w(d)?d.call(b,c):d}function Ac(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function Bc(){return this._invalidDate}function Cc(a){return this._ordinal.replace("%d",a)}function Dc(a){return a}function Ec(a,b,c,d){var e=this._relativeTime[c];return w(e)?e(a,b,c,d):e.replace(/%d/i,a)}function Fc(a,b){var c=this._relativeTime[a>0?"future":"past"];return w(c)?c(b):c.replace(/%s/i,b)}function Gc(a,b,c,d){var e=H(),f=h().set(d,b);return e[c](f,a)}function Hc(a,b,c){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return Gc(a,b,c,"month");var d,e=[];for(d=0;12>d;d++)e[d]=Gc(a,d,c,"month");return e}function Ic(a,b,c,d){"boolean"==typeof a?("number"==typeof b&&(c=b,b=void 0),b=b||""):(b=a,c=b,a=!1,"number"==typeof b&&(c=b,b=void 0),b=b||"");var e=H(),f=a?e._week.dow:0;if(null!=c)return Gc(b,(c+f)%7,d,"day");var g,h=[];for(g=0;7>g;g++)h[g]=Gc(b,(g+f)%7,d,"day");return h}function Jc(a,b){return Hc(a,b,"months")}function Kc(a,b){return Hc(a,b,"monthsShort")}function Lc(a,b,c){return Ic(a,b,c,"weekdays")}function Mc(a,b,c){return Ic(a,b,c,"weekdaysShort")}function Nc(a,b,c){return Ic(a,b,c,"weekdaysMin")}function Oc(){var a=this._data;return this._milliseconds=Le(this._milliseconds),this._days=Le(this._days),this._months=Le(this._months),a.milliseconds=Le(a.milliseconds),a.seconds=Le(a.seconds),a.minutes=Le(a.minutes),a.hours=Le(a.hours),a.months=Le(a.months),a.years=Le(a.years),this}function Pc(a,b,c,d){var e=db(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function Qc(a,b){return Pc(this,a,b,1)}function Rc(a,b){return Pc(this,a,b,-1)}function Sc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Tc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Sc(Vc(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=q(f/1e3),i.seconds=a%60,b=q(a/60),i.minutes=b%60,c=q(b/60),i.hours=c%24,g+=q(c/24),e=q(Uc(g)),h+=e,g-=Sc(Vc(e)),d=q(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function Uc(a){return 4800*a/146097}function Vc(a){return 146097*a/4800}function Wc(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+Uc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(Vc(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function Xc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)}function Yc(a){return function(){return this.as(a)}}function Zc(a){
return a=K(a),this[a+"s"]()}function $c(a){return function(){return this._data[a]}}function _c(){return q(this.days()/7)}function ad(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function bd(a,b,c){var d=db(a).abs(),e=_e(d.as("s")),f=_e(d.as("m")),g=_e(d.as("h")),h=_e(d.as("d")),i=_e(d.as("M")),j=_e(d.as("y")),k=e<af.s&&["s",e]||1>=f&&["m"]||f<af.m&&["mm",f]||1>=g&&["h"]||g<af.h&&["hh",g]||1>=h&&["d"]||h<af.d&&["dd",h]||1>=i&&["M"]||i<af.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,ad.apply(null,k)}function cd(a,b){return void 0===af[a]?!1:void 0===b?af[a]:(af[a]=b,!0)}function dd(a){var b=this.localeData(),c=bd(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function ed(){var a,b,c,d=bf(this._milliseconds)/1e3,e=bf(this._days),f=bf(this._months);a=q(d/60),b=q(a/60),d%=60,a%=60,c=q(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var fd,gd;gd=Array.prototype.some?Array.prototype.some:function(a){for(var b=Object(this),c=b.length>>>0,d=0;c>d;d++)if(d in b&&a.call(this,b[d],d,b))return!0;return!1};var hd=a.momentProperties=[],id=!1,jd={};a.suppressDeprecationWarnings=!1,a.deprecationHandler=null;var kd;kd=Object.keys?Object.keys:function(a){var b,c=[];for(b in a)f(a,b)&&c.push(b);return c};var ld,md,nd={},od={},pd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,qd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,rd={},sd={},td=/\d/,ud=/\d\d/,vd=/\d{3}/,wd=/\d{4}/,xd=/[+-]?\d{6}/,yd=/\d\d?/,zd=/\d\d\d\d?/,Ad=/\d\d\d\d\d\d?/,Bd=/\d{1,3}/,Cd=/\d{1,4}/,Dd=/[+-]?\d{1,6}/,Ed=/\d+/,Fd=/[+-]?\d+/,Gd=/Z|[+-]\d\d:?\d\d/gi,Hd=/Z|[+-]\d\d(?::?\d\d)?/gi,Id=/[+-]?\d+(\.\d{1,3})?/,Jd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Kd={},Ld={},Md=0,Nd=1,Od=2,Pd=3,Qd=4,Rd=5,Sd=6,Td=7,Ud=8;md=Array.prototype.indexOf?Array.prototype.indexOf:function(a){var b;for(b=0;b<this.length;++b)if(this[b]===a)return b;return-1},R("M",["MM",2],"Mo",function(){return this.month()+1}),R("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),R("MMMM",0,0,function(a){return this.localeData().months(this,a)}),J("month","M"),W("M",yd),W("MM",yd,ud),W("MMM",function(a,b){return b.monthsShortRegex(a)}),W("MMMM",function(a,b){return b.monthsRegex(a)}),$(["M","MM"],function(a,b){b[Nd]=r(a)-1}),$(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[Nd]=e:j(c).invalidMonth=a});var Vd=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Wd="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Xd="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Yd=Jd,Zd=Jd,$d=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,_d=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,ae=/Z|[+-]\d\d(?::?\d\d)?/,be=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],ce=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],de=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=u("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),R("Y",0,0,function(){var a=this.year();return 9999>=a?""+a:"+"+a}),R(0,["YY",2],0,function(){return this.year()%100}),R(0,["YYYY",4],0,"year"),R(0,["YYYYY",5],0,"year"),R(0,["YYYYYY",6,!0],0,"year"),J("year","y"),W("Y",Fd),W("YY",yd,ud),W("YYYY",Cd,wd),W("YYYYY",Dd,xd),W("YYYYYY",Dd,xd),$(["YYYYY","YYYYYY"],Md),$("YYYY",function(b,c){c[Md]=2===b.length?a.parseTwoDigitYear(b):r(b)}),$("YY",function(b,c){c[Md]=a.parseTwoDigitYear(b)}),$("Y",function(a,b){b[Md]=parseInt(a,10)}),a.parseTwoDigitYear=function(a){return r(a)+(r(a)>68?1900:2e3)};var ee=M("FullYear",!0);a.ISO_8601=function(){};var fe=u("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Ka.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:l()}),ge=u("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Ka.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:l()}),he=function(){return Date.now?Date.now():+new Date};Qa("Z",":"),Qa("ZZ",""),W("Z",Hd),W("ZZ",Hd),$(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ra(Hd,a)});var ie=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var je=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,ke=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;db.fn=Oa.prototype;var le=ib(1,"add"),me=ib(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",a.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var ne=u("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});R(0,["gg",2],0,function(){return this.weekYear()%100}),R(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Pb("gggg","weekYear"),Pb("ggggg","weekYear"),Pb("GGGG","isoWeekYear"),Pb("GGGGG","isoWeekYear"),J("weekYear","gg"),J("isoWeekYear","GG"),W("G",Fd),W("g",Fd),W("GG",yd,ud),W("gg",yd,ud),W("GGGG",Cd,wd),W("gggg",Cd,wd),W("GGGGG",Dd,xd),W("ggggg",Dd,xd),_(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=r(a)}),_(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),R("Q",0,"Qo","quarter"),J("quarter","Q"),W("Q",td),$("Q",function(a,b){b[Nd]=3*(r(a)-1)}),R("w",["ww",2],"wo","week"),R("W",["WW",2],"Wo","isoWeek"),J("week","w"),J("isoWeek","W"),W("w",yd),W("ww",yd,ud),W("W",yd),W("WW",yd,ud),_(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=r(a)});var oe={dow:0,doy:6};R("D",["DD",2],"Do","date"),J("date","D"),W("D",yd),W("DD",yd,ud),W("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),$(["D","DD"],Od),$("Do",function(a,b){b[Od]=r(a.match(yd)[0],10)});var pe=M("Date",!0);R("d",0,"do","day"),R("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),R("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),R("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),R("e",0,0,"weekday"),R("E",0,0,"isoWeekday"),J("day","d"),J("weekday","e"),J("isoWeekday","E"),W("d",yd),W("e",yd),W("E",yd),W("dd",function(a,b){return b.weekdaysMinRegex(a)}),W("ddd",function(a,b){return b.weekdaysShortRegex(a)}),W("dddd",function(a,b){return b.weekdaysRegex(a)}),_(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:j(c).invalidWeekday=a}),_(["d","e","E"],function(a,b,c,d){b[d]=r(a)});var qe="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),re="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),se="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),te=Jd,ue=Jd,ve=Jd;R("DDD",["DDDD",3],"DDDo","dayOfYear"),J("dayOfYear","DDD"),W("DDD",Bd),W("DDDD",vd),$(["DDD","DDDD"],function(a,b,c){c._dayOfYear=r(a)}),R("H",["HH",2],0,"hour"),R("h",["hh",2],0,oc),R("k",["kk",2],0,pc),R("hmm",0,0,function(){return""+oc.apply(this)+Q(this.minutes(),2)}),R("hmmss",0,0,function(){return""+oc.apply(this)+Q(this.minutes(),2)+Q(this.seconds(),2)}),R("Hmm",0,0,function(){return""+this.hours()+Q(this.minutes(),2)}),R("Hmmss",0,0,function(){return""+this.hours()+Q(this.minutes(),2)+Q(this.seconds(),2)}),qc("a",!0),qc("A",!1),J("hour","h"),W("a",rc),W("A",rc),W("H",yd),W("h",yd),W("HH",yd,ud),W("hh",yd,ud),W("hmm",zd),W("hmmss",Ad),W("Hmm",zd),W("Hmmss",Ad),$(["H","HH"],Pd),$(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),$(["h","hh"],function(a,b,c){b[Pd]=r(a),j(c).bigHour=!0}),$("hmm",function(a,b,c){var d=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d)),j(c).bigHour=!0}),$("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d,2)),b[Rd]=r(a.substr(e)),j(c).bigHour=!0}),$("Hmm",function(a,b,c){var d=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d))}),$("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d,2)),b[Rd]=r(a.substr(e))});var we=/[ap]\.?m?\.?/i,xe=M("Hours",!0);R("m",["mm",2],0,"minute"),J("minute","m"),W("m",yd),W("mm",yd,ud),$(["m","mm"],Qd);var ye=M("Minutes",!1);R("s",["ss",2],0,"second"),J("second","s"),W("s",yd),W("ss",yd,ud),$(["s","ss"],Rd);var ze=M("Seconds",!1);R("S",0,0,function(){return~~(this.millisecond()/100)}),R(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),R(0,["SSS",3],0,"millisecond"),R(0,["SSSS",4],0,function(){return 10*this.millisecond()}),R(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),R(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),R(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),R(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),R(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),J("millisecond","ms"),W("S",Bd,td),W("SS",Bd,ud),W("SSS",Bd,vd);var Ae;for(Ae="SSSS";Ae.length<=9;Ae+="S")W(Ae,Ed);for(Ae="S";Ae.length<=9;Ae+="S")$(Ae,uc);var Be=M("Milliseconds",!1);R("z",0,0,"zoneAbbr"),R("zz",0,0,"zoneName");var Ce=o.prototype;Ce.add=le,Ce.calendar=kb,Ce.clone=lb,Ce.diff=sb,Ce.endOf=Eb,Ce.format=wb,Ce.from=xb,Ce.fromNow=yb,Ce.to=zb,Ce.toNow=Ab,Ce.get=P,Ce.invalidAt=Nb,Ce.isAfter=mb,Ce.isBefore=nb,Ce.isBetween=ob,Ce.isSame=pb,Ce.isSameOrAfter=qb,Ce.isSameOrBefore=rb,Ce.isValid=Lb,Ce.lang=ne,Ce.locale=Bb,Ce.localeData=Cb,Ce.max=ge,Ce.min=fe,Ce.parsingFlags=Mb,Ce.set=P,Ce.startOf=Db,Ce.subtract=me,Ce.toArray=Ib,Ce.toObject=Jb,Ce.toDate=Hb,Ce.toISOString=vb,Ce.toJSON=Kb,Ce.toString=ub,Ce.unix=Gb,Ce.valueOf=Fb,Ce.creationData=Ob,Ce.year=ee,Ce.isLeapYear=ta,Ce.weekYear=Qb,Ce.isoWeekYear=Rb,Ce.quarter=Ce.quarters=Wb,Ce.month=ha,Ce.daysInMonth=ia,Ce.week=Ce.weeks=$b,Ce.isoWeek=Ce.isoWeeks=_b,Ce.weeksInYear=Tb,Ce.isoWeeksInYear=Sb,Ce.date=pe,Ce.day=Ce.days=gc,Ce.weekday=hc,Ce.isoWeekday=ic,Ce.dayOfYear=nc,Ce.hour=Ce.hours=xe,Ce.minute=Ce.minutes=ye,Ce.second=Ce.seconds=ze,Ce.millisecond=Ce.milliseconds=Be,Ce.utcOffset=Ua,Ce.utc=Wa,Ce.local=Xa,Ce.parseZone=Ya,Ce.hasAlignedHourOffset=Za,Ce.isDST=$a,Ce.isDSTShifted=_a,Ce.isLocal=ab,Ce.isUtcOffset=bb,Ce.isUtc=cb,Ce.isUTC=cb,Ce.zoneAbbr=vc,Ce.zoneName=wc,Ce.dates=u("dates accessor is deprecated. Use date instead.",pe),Ce.months=u("months accessor is deprecated. Use month instead",ha),Ce.years=u("years accessor is deprecated. Use year instead",ee),Ce.zone=u("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Va);var De=Ce,Ee={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Fe={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Ge="Invalid date",He="%d",Ie=/\d{1,2}/,Je={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Ke=A.prototype;Ke._calendar=Ee,Ke.calendar=zc,Ke._longDateFormat=Fe,Ke.longDateFormat=Ac,Ke._invalidDate=Ge,Ke.invalidDate=Bc,Ke._ordinal=He,Ke.ordinal=Cc,Ke._ordinalParse=Ie,Ke.preparse=Dc,Ke.postformat=Dc,Ke._relativeTime=Je,Ke.relativeTime=Ec,Ke.pastFuture=Fc,Ke.set=y,Ke.months=ca,Ke._months=Wd,Ke.monthsShort=da,Ke._monthsShort=Xd,Ke.monthsParse=fa,Ke._monthsRegex=Zd,Ke.monthsRegex=ka,Ke._monthsShortRegex=Yd,Ke.monthsShortRegex=ja,Ke.week=Xb,Ke._week=oe,Ke.firstDayOfYear=Zb,Ke.firstDayOfWeek=Yb,Ke.weekdays=bc,Ke._weekdays=qe,Ke.weekdaysMin=dc,Ke._weekdaysMin=se,Ke.weekdaysShort=cc,Ke._weekdaysShort=re,Ke.weekdaysParse=fc,Ke._weekdaysRegex=te,Ke.weekdaysRegex=jc,Ke._weekdaysShortRegex=ue,Ke.weekdaysShortRegex=kc,Ke._weekdaysMinRegex=ve,Ke.weekdaysMinRegex=lc,Ke.isPM=sc,Ke._meridiemParse=we,Ke.meridiem=tc,E("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===r(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=u("moment.lang is deprecated. Use moment.locale instead.",E),a.langData=u("moment.langData is deprecated. Use moment.localeData instead.",H);var Le=Math.abs,Me=Yc("ms"),Ne=Yc("s"),Oe=Yc("m"),Pe=Yc("h"),Qe=Yc("d"),Re=Yc("w"),Se=Yc("M"),Te=Yc("y"),Ue=$c("milliseconds"),Ve=$c("seconds"),We=$c("minutes"),Xe=$c("hours"),Ye=$c("days"),Ze=$c("months"),$e=$c("years"),_e=Math.round,af={s:45,m:45,h:22,d:26,M:11},bf=Math.abs,cf=Oa.prototype;cf.abs=Oc,cf.add=Qc,cf.subtract=Rc,cf.as=Wc,cf.asMilliseconds=Me,cf.asSeconds=Ne,cf.asMinutes=Oe,cf.asHours=Pe,cf.asDays=Qe,cf.asWeeks=Re,cf.asMonths=Se,cf.asYears=Te,cf.valueOf=Xc,cf._bubble=Tc,cf.get=Zc,cf.milliseconds=Ue,cf.seconds=Ve,cf.minutes=We,cf.hours=Xe,cf.days=Ye,cf.weeks=_c,cf.months=Ze,cf.years=$e,cf.humanize=dd,cf.toISOString=ed,cf.toString=ed,cf.toJSON=ed,cf.locale=Bb,cf.localeData=Cb,cf.toIsoString=u("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",ed),cf.lang=ne,R("X",0,0,"unix"),R("x",0,0,"valueOf"),W("x",Fd),W("X",Id),$("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),$("x",function(a,b,c){c._d=new Date(r(a))}),a.version="2.13.0",b(Ka),a.fn=De,a.min=Ma,a.max=Na,a.now=he,a.utc=h,a.unix=xc,a.months=Jc,a.isDate=d,a.locale=E,a.invalid=l,a.duration=db,a.isMoment=p,a.weekdays=Lc,a.parseZone=yc,a.localeData=H,a.isDuration=Pa,a.monthsShort=Kc,a.weekdaysMin=Nc,a.defineLocale=F,a.updateLocale=G,a.locales=I,a.weekdaysShort=Mc,a.normalizeUnits=K,a.relativeTimeThreshold=cd,a.prototype=De;var df=a;return df});
/* Asynchronously write javascript, even with document.write., v1.4.0 https://krux.github.io/postscribe
Copyright (c) 2015 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE */// An html parser written in JavaScript
// Based on http://ejohn.org/blog/pure-javascript-html-parser/
//TODO(#39)
/*globals console:false*/
(function() {
  var supports = (function() {
    var supports = {};

    var html;
    var work = this.document.createElement('div');

    html = '<P><I></P></I>';
    work.innerHTML = html;
    supports.tagSoup = work.innerHTML !== html;

    work.innerHTML = '<P><i><P></P></i></P>';
    supports.selfClose = work.childNodes.length === 2;

    return supports;
  })();



  // Regular Expressions for parsing tags and attributes
  var startTag = /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
  var endTag = /^<\/([\-A-Za-z0-9_]+)[^>]*>/;
  var attr = /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g;
  var fillAttr = /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i;

  var DEBUG = false;

  function htmlParser(stream, options) {
    stream = stream || '';

    // Options
    options = options || {};

    for(var key in supports) {
      if(supports.hasOwnProperty(key)) {
        if(options.autoFix) {
          options['fix_'+key] = true;//!supports[key];
        }
        options.fix = options.fix || options['fix_'+key];
      }
    }

    var stack = [];

    // Cache div element for unescaping html entities
    var el = document.createElement('div');

    var unescapeHTMLEntities = function(html) {
      if ( (typeof html === 'string') && (html.indexOf('&') !== -1) ) {
        el.innerHTML = html;
        // ie and ff differ
        return el.textContent || el.innerText || html;
      }
      else {
        return html;
      }
    };

    var append = function(str) {
      stream += str;
    };

    var prepend = function(str) {
      stream = str + stream;
    };

    // Order of detection matters: detection of one can only
    // succeed if detection of previous didn't
    var detect = {
      comment: /^<!--/,
      endTag: /^<\//,
      atomicTag: /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
      startTag: /^</,
      chars: /^[^<]/
    };

    // Detection has already happened when a reader is called.
    var reader = {

      comment: function() {
        var index = stream.indexOf('-->');
        if ( index >= 0 ) {
          return {
            content: stream.substr(4, index),
            length: index + 3
          };
        }
      },

      endTag: function() {
        var match = stream.match( endTag );

        if ( match ) {
          return {
            tagName: match[1],
            length: match[0].length
          };
        }
      },

      atomicTag: function() {
        var start = reader.startTag();
        if(start) {
          var rest = stream.slice(start.length);
          // for optimization, we check first just for the end tag
          if(rest.match(new RegExp('<\/\\s*' + start.tagName + '\\s*>', 'i'))) {
            // capturing the content is inefficient, so we do it inside the if
            var match = rest.match(new RegExp('([\\s\\S]*?)<\/\\s*' + start.tagName + '\\s*>', 'i'));
            if(match) {
              // good to go
              return {
                tagName: start.tagName,
                attrs: start.attrs,
                content: match[1],
                length: match[0].length + start.length
              };
            }
          }
        }
      },

      startTag: function() {

        var endTagIndex = stream.indexOf('>');
        if(endTagIndex === -1) {
          return null; //avoid the match statement if there will be no match
        }

        var match = stream.match( startTag );

        if ( match ) {
          var attrs = {};
          var booleanAttrs = {};
          var rest = match[2];

          match[2].replace(attr, function(match, name) {
            if (!(arguments[2] || arguments[3] || arguments[4] || arguments[5])) {
              attrs[name] = null;
            } else if (arguments[5]) {
              attrs[arguments[5]] = '';
              booleanAttrs[name] = true;
            } else {
              var value = arguments[2] || arguments[3] || arguments[4] ||
                fillAttr.test(name) && name || '';
              attrs[name] = unescapeHTMLEntities(value);
            }
            rest = rest.replace(match, '');
          });

          return {
            tagName: match[1],
            attrs: attrs,
            booleanAttrs: booleanAttrs,
            rest: rest,
            unary: !!match[3],
            length: match[0].length
          };
        }
      },

      chars: function() {
        var index = stream.indexOf('<');
        return {
          length: index >= 0 ? index : stream.length
        };
      }
    };

    var readToken = function() {

      // Enumerate detects in order
      for (var type in detect) {

        if(detect[type].test(stream)) {
          if(DEBUG) { console.log('suspected ' + type); }

          var token = reader[type]();
          if(token) {
            if(DEBUG) { console.log('parsed ' + type, token); }
            // Type
            token.type = token.type || type;
            // Entire text
            token.text = stream.substr(0, token.length);
            // Update the stream
            stream = stream.slice(token.length);

            return token;
          }
          return null;
        }
      }
    };

    var readTokens = function(handlers) {
      var tok;
      while((tok = readToken())) {
        // continue until we get an explicit "false" return
        if(handlers[tok.type] && handlers[tok.type](tok) === false) {
          return;
        }
      }
    };

    var clear = function() {
      var rest = stream;
      stream = '';
      return rest;
    };

    var rest = function() {
      return stream;
    };

    if(options.fix) {
      (function() {
        // Empty Elements - HTML 4.01
        var EMPTY = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i;

        // Elements that you can| intentionally| leave open
        // (and which close themselves)
        var CLOSESELF = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i;


        var stack = [];
        stack.last = function() {
          return this[this.length - 1];
        };
        stack.lastTagNameEq = function(tagName) {
          var last = this.last();
          return last && last.tagName &&
            last.tagName.toUpperCase() === tagName.toUpperCase();
        };

        stack.containsTagName = function(tagName) {
          for(var i = 0, tok; (tok = this[i]); i++) {
            if(tok.tagName === tagName) {
              return true;
            }
          }
          return false;
        };

        var correct = function(tok) {
          if(tok && tok.type === 'startTag') {
            // unary
            tok.unary = EMPTY.test(tok.tagName) || tok.unary;
            tok.html5Unary = !/\/>$/.test(tok.text);
          }
          return tok;
        };

        var readTokenImpl = readToken;

        var peekToken = function() {
          var tmp = stream;
          var tok = correct(readTokenImpl());
          stream = tmp;
          return tok;
        };

        var closeLast = function() {
          var tok = stack.pop();

          // prepend close tag to stream.
          prepend('</'+tok.tagName+'>');
        };

        var handlers = {
          startTag: function(tok) {
            var tagName = tok.tagName;
            // Fix tbody
            if(tagName.toUpperCase() === 'TR' && stack.lastTagNameEq('TABLE')) {
              prepend('<TBODY>');
              prepareNextToken();
            } else if(options.fix_selfClose && CLOSESELF.test(tagName) && stack.containsTagName(tagName)) {
              if(stack.lastTagNameEq(tagName)) {
                closeLast();
              } else {
                prepend('</'+tok.tagName+'>');
                prepareNextToken();
              }
            } else if (!tok.unary) {
              stack.push(tok);
            }
          },

          endTag: function(tok) {
            var last = stack.last();
            if(last) {
              if(options.fix_tagSoup && !stack.lastTagNameEq(tok.tagName)) {
                // cleanup tag soup
                closeLast();
              } else {
                stack.pop();
              }
            } else if (options.fix_tagSoup) {
              // cleanup tag soup part 2: skip this token
              skipToken();
            }
          }
        };

        var skipToken = function() {
          // shift the next token
          readTokenImpl();

          prepareNextToken();
        };

        var prepareNextToken = function() {
          var tok = peekToken();
          if(tok && handlers[tok.type]) {
            handlers[tok.type](tok);
          }
        };

        // redefine readToken
        readToken = function() {
          prepareNextToken();
          return correct(readTokenImpl());
        };
      })();
    }

    return {
      append: append,
      readToken: readToken,
      readTokens: readTokens,
      clear: clear,
      rest: rest,
      stack: stack
    };

  }

  htmlParser.supports = supports;

  htmlParser.tokenToString = function(tok) {
    var handler = {
      comment: function(tok) {
        return '<!--' + tok.content;
      },
      endTag: function(tok) {
        return '</'+tok.tagName+'>';
      },
      atomicTag: function(tok) {
        if(DEBUG) { console.log(tok); }
        return handler.startTag(tok) +
              tok.content +
              handler.endTag(tok);
      },
      startTag: function(tok) {
        var str = '<'+tok.tagName;
        for (var key in tok.attrs) {
          str += ' '+key;
          
          var val = tok.attrs[key];
          if (typeof tok.booleanAttrs == 'undefined' || typeof tok.booleanAttrs[key] == 'undefined') {
            // escape quotes
            str += '="'+(val ? val.replace(/(^|[^\\])"/g, '$1\\\"') : '')+'"';
          }
        }
        if (tok.rest) {
          str += tok.rest;
        }
        return str + (tok.unary && !tok.html5Unary ? '/>' : '>');
      },
      chars: function(tok) {
        return tok.text;
      }
    };
    return handler[tok.type](tok);
  };

  htmlParser.escapeAttributes = function(attrs) {
    var escapedAttrs = {};
    // escape double-quotes for writing html as a string

    for(var name in attrs) {
      var value = attrs[name];
      escapedAttrs[name] = value && value.replace(/(^|[^\\])"/g, '$1\\\"');
    }
    return escapedAttrs;
  };

  for(var key in supports) {
    htmlParser.browserHasFlaw = htmlParser.browserHasFlaw || (!supports[key]) && key;
  }

  this.htmlParser = htmlParser;
})();

//     postscribe.js 1.4.0
//     (c) Copyright 2012-2015 to the present, Krux
//     postscribe is freely distributable under the MIT license.
//     For all details and documentation:
//     http://krux.github.io/postscribe
/*globals htmlParser:false*/
(function() {
  // A function that intentionally does nothing.
  function doNothing() {}

  // Available options and defaults.
  var OPTIONS = {
    // Called when an async script has loaded.
    afterAsync: doNothing,
    // Called immediately before removing from the write queue.
    afterDequeue: doNothing,
    // Called sync after a stream's first thread release.
    afterStreamStart: doNothing,
    // Called after writing buffered document.write calls.
    afterWrite: doNothing,
    // Allows disabling the autoFix feature of htmlParser
    autoFix: true,
    // Called immediately before adding to the write queue.
    beforeEnqueue: doNothing,
    // Called before writing a token.
    beforeWriteToken: function(tok) { return tok; },
    // Called before writing buffered document.write calls.
    beforeWrite: function(str) { return str; },
    // Called when evaluation is finished.
    done: doNothing,
    // Called when a write results in an error.
    error: function(e) { throw e; },
    // Whether to let scripts w/ async attribute set fall out of the queue.
    releaseAsync: false
  };

  var global = this;

  var UNDEFINED = void 0;

  function existy(thing) {
    return thing !== UNDEFINED && thing !== null;
  }

  if(global.postscribe) {
    return;
  }

  // Turn on to debug how each chunk affected the DOM.
  var DEBUG_CHUNK = false;

  // # Helper Functions

  var slice = Array.prototype.slice;

  // Is this a function?
  function isFunction(x) {
    return 'function' === typeof x;
  }

  // Loop over each item in an array-like value.
  function each(arr, fn, _this) {
    var i, len = (arr && arr.length) || 0;
    for(i = 0; i < len; i++) {
      fn.call(_this, arr[i], i);
    }
  }

  // Loop over each key/value pair in a hash.
  function eachKey(obj, fn, _this) {
    var key;
    for(key in obj) {
      if(obj.hasOwnProperty(key)) {
        fn.call(_this, key, obj[key]);
      }
    }
  }

  // Set properties on an object.
  function set(obj, props) {
    eachKey(props, function(key, value) {
      obj[key] = value;
    });
    return obj;
  }

  // Set default options where some option was not specified.
  function defaults(options, _defaults) {
    options = options || {};
    eachKey(_defaults, function(key, val) {
      if(!existy(options[key])) {
        options[key] = val;
      }
    });
    return options;
  }

  // Convert value (e.g., a NodeList) to an array.
  function toArray(obj) {
    try {
      return slice.call(obj);
    } catch(e) {
      var ret = [];
      each(obj, function(val) {
        ret.push(val);
      });
      return ret;
    }
  }

  var last = function(array) {
    return array[array.length - 1];
  };

  // Test if token is a script tag.
  function isScript(tok) {
    return !tok || !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf('script');
  }

  function isStyle(tok) {
    return !tok || !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf('style');
  }

  // # Class WriteStream

  // Stream static html to an element, where "static html" denotes "html without scripts".

  // This class maintains a *history of writes devoid of any attributes* or "proxy history".
  // Injecting the proxy history into a temporary div has no side-effects,
  // other than to create proxy elements for previously written elements.

  // Given the `staticHtml` of a new write, a `tempDiv`'s innerHTML is set to `proxy_history + staticHtml`.
  // The *structure* of `tempDiv`'s contents, (i.e., the placement of new nodes beside or inside of proxy elements),
  // reflects the DOM structure that would have resulted if all writes had been squashed into a single write.

  // For each descendent `node` of `tempDiv` whose parentNode is a *proxy*, `node` is appended to the corresponding *real* element within the DOM.

  // Proxy elements are mapped to *actual* elements in the DOM by injecting a data-id attribute into each start tag in `staticHtml`.
  var WriteStream = (function(){

    // Prefix for data attributes on DOM elements.
    var BASEATTR = 'data-ps-';

    // get / set data attributes
    function data(el, name, value) {
      var attr = BASEATTR + name;

      if(arguments.length === 2) {
        // Get
        var val = el.getAttribute(attr);

        // IE 8 returns a number if it's a number
        return !existy(val) ? val : String(val);

      } else if(existy(value) && value !== '') {
        // Set
        el.setAttribute(attr, value);

      } else {
        // Remove
        el.removeAttribute(attr);
      }
    }

    function WriteStream(root, options) {
      var doc = root.ownerDocument;

      set(this, {
        root: root,

        options: options,

        win: doc.defaultView || doc.parentWindow,

        doc: doc,

        parser: htmlParser('', { autoFix: options.autoFix }),

        // Actual elements by id.
        actuals: [root],

        // Embodies the "structure" of what's been written so far, devoid of attributes.
        proxyHistory: '',

        // Create a proxy of the root element.
        proxyRoot: doc.createElement(root.nodeName),

        scriptStack: [],

        writeQueue: []
      });

      data(this.proxyRoot, 'proxyof', 0);

    }

    WriteStream.prototype.write = function() {
      [].push.apply(this.writeQueue, arguments);
      // Process writes
      // When new script gets pushed or pending this will stop
      // because new writeQueue gets pushed
      var arg;
      while(!this.deferredRemote &&
            this.writeQueue.length) {
        arg = this.writeQueue.shift();

        if(isFunction(arg)) {
          this.callFunction(arg);
        } else {
          this.writeImpl(arg);
        }
      }
    };

    WriteStream.prototype.callFunction = function(fn) {
      var tok = { type: 'function', value: fn.name || fn.toString() };
      this.onScriptStart(tok);
      fn.call(this.win, this.doc);
      this.onScriptDone(tok);
    };

    WriteStream.prototype.writeImpl = function(html) {
      this.parser.append(html);

      var tok, tokens = [], script, style;

      // stop if we see a script token
      while((tok = this.parser.readToken()) && !(script=isScript(tok)) && !(style=isStyle(tok))) {
        tok = this.options.beforeWriteToken(tok);

        if (tok) {
          tokens.push(tok);
        }
      }

      this.writeStaticTokens(tokens);

      if(script) {
        this.handleScriptToken(tok);
      }
      if(style){
        this.handleStyleToken(tok);
      }
    };

    // ## Contiguous non-script tokens (a chunk)
    WriteStream.prototype.writeStaticTokens = function(tokens) {

      var chunk = this.buildChunk(tokens);

      if(!chunk.actual) {
        // e.g., no tokens, or a noscript that got ignored
        return;
      }
      chunk.html = this.proxyHistory + chunk.actual;
      this.proxyHistory += chunk.proxy;

      this.proxyRoot.innerHTML = chunk.html;

      if(DEBUG_CHUNK) {
        chunk.proxyInnerHTML = this.proxyRoot.innerHTML;
      }

      this.walkChunk();

      if(DEBUG_CHUNK) {
        chunk.actualInnerHTML = this.root.innerHTML; //root
      }

      return chunk;
    };

    WriteStream.prototype.buildChunk = function (tokens) {
      var nextId = this.actuals.length,

          // The raw html of this chunk.
          raw = [],

          // The html to create the nodes in the tokens (with id's injected).
          actual = [],

          // Html that can later be used to proxy the nodes in the tokens.
          proxy = [];

      each(tokens, function(tok) {

        var tokenRaw = htmlParser.tokenToString(tok);

        raw.push(tokenRaw);

        if(tok.attrs) { // tok.attrs <==> startTag or atomicTag or cursor
          // Ignore noscript tags. They are atomic, so we don't have to worry about children.
          if(!(/^noscript$/i).test(tok.tagName)) {
            var id = nextId++;

            // Actual: inject id attribute: replace '>' at end of start tag with id attribute + '>'
            actual.push(
              tokenRaw.replace(/(\/?>)/, ' '+BASEATTR+'id='+id+' $1')
            );

            // Don't proxy scripts: they have no bearing on DOM structure.
            if(tok.attrs.id !== 'ps-script' && tok.attrs.id !== 'ps-style') {
              // Proxy: strip all attributes and inject proxyof attribute
              proxy.push(
                // ignore atomic tags (e.g., style): they have no "structural" effect
                tok.type === 'atomicTag' ? '' :
                  '<'+tok.tagName+' '+BASEATTR+'proxyof='+id+(tok.unary ? ' />' : '>')
              );
            }
          }

        } else {
          // Visit any other type of token
          // Actual: append.
          actual.push(tokenRaw);
          // Proxy: append endTags. Ignore everything else.
          proxy.push(tok.type === 'endTag' ? tokenRaw : '');
        }
      });

      return {
        tokens: tokens,
        raw: raw.join(''),
        actual: actual.join(''),
        proxy: proxy.join('')
      };
    };

    WriteStream.prototype.walkChunk = function() {
      var node, stack = [this.proxyRoot];

      // use shift/unshift so that children are walked in document order

      while(existy(node = stack.shift())) {

        var isElement = node.nodeType === 1;
        var isProxy = isElement && data(node, 'proxyof');

        // Ignore proxies
        if(!isProxy) {

          if(isElement) {
            // New actual element: register it and remove the the id attr.
            this.actuals[data(node, 'id')] = node;
            data(node, 'id', null);
          }

          // Is node's parent a proxy?
          var parentIsProxyOf = node.parentNode && data(node.parentNode, 'proxyof');
          if(parentIsProxyOf) {
            // Move node under actual parent.
            this.actuals[parentIsProxyOf].appendChild(node);
          }
        }
        // prepend childNodes to stack
        stack.unshift.apply(stack, toArray(node.childNodes));
      }
    };

    // ### Script tokens
    WriteStream.prototype.handleScriptToken = function(tok) {
      var remainder = this.parser.clear();

      if(remainder) {
        // Write remainder immediately behind this script.
        this.writeQueue.unshift(remainder);
      }

      //noinspection JSUnresolvedVariable
      tok.src = tok.attrs.src || tok.attrs.SRC;

      tok = this.options.beforeWriteToken(tok);

      if(!tok) {
        // User has removed this token
        return;
      }

      if(tok.src && this.scriptStack.length) {
        // Defer this script until scriptStack is empty.
        // Assumption 1: This script will not start executing until
        // scriptStack is empty.
        this.deferredRemote = tok;
      } else {
        this.onScriptStart(tok);
      }

      // Put the script node in the DOM.
      var _this = this;
      this.writeScriptToken(tok, function() {
        _this.onScriptDone(tok);
      });

    };

    // ### Style tokens
    WriteStream.prototype.handleStyleToken = function(tok) {
      var remainder = this.parser.clear();

      if(remainder) {
        // Write remainder immediately behind this style.
        this.writeQueue.unshift(remainder);
      }

      tok.type = tok.attrs.type || tok.attrs.TYPE || 'text/css';

      tok = this.options.beforeWriteToken(tok);

      if(tok) {
        // Put the style node in the DOM.
        this.writeStyleToken(tok);
      }

      if(remainder) {
        this.write();
      }
    };

    // Build a style and insert it into the DOM.
    WriteStream.prototype.writeStyleToken = function(tok) {
      var el = this.buildStyle(tok);

      this.insertStyle(el);

      // Set content
      if(tok.content) {
        //noinspection JSUnresolvedVariable
        if(el.styleSheet && !el.sheet) {
          el.styleSheet.cssText=tok.content;
        }
        else {
          el.appendChild(this.doc.createTextNode(tok.content));
        }
      }
    };

    // Build a style element from an atomic style token.
    WriteStream.prototype.buildStyle = function(tok) {
      var el = this.doc.createElement(tok.tagName);

      el.setAttribute('type', tok.type);
      // Set attributes
      eachKey(tok.attrs, function(name, value) {
        el.setAttribute(name, value);
      });

      return el;
    };

    // Insert style into DOM where it would naturally be written.
    WriteStream.prototype.insertStyle = function(el) {
      // Append a span to the stream. That span will act as a cursor
      // (i.e. insertion point) for the style.
      this.writeImpl('<span id="ps-style"/>');

      // Grab that span from the DOM.
      var cursor = this.doc.getElementById('ps-style');

      // Replace cursor with style.
      cursor.parentNode.replaceChild(el, cursor);
    };

    WriteStream.prototype.onScriptStart = function(tok) {
      tok.outerWrites = this.writeQueue;
      this.writeQueue = [];
      this.scriptStack.unshift(tok);
    };

    WriteStream.prototype.onScriptDone = function(tok) {
      // Pop script and check nesting.
      if(tok !== this.scriptStack[0]) {
        this.options.error({ message: 'Bad script nesting or script finished twice' });
        return;
      }
      this.scriptStack.shift();

      // Append outer writes to queue and process them.
      this.write.apply(this, tok.outerWrites);

      // Check for pending remote

      // Assumption 2: if remote_script1 writes remote_script2 then
      // the we notice remote_script1 finishes before remote_script2 starts.
      // I think this is equivalent to assumption 1
      if(!this.scriptStack.length && this.deferredRemote) {
        this.onScriptStart(this.deferredRemote);
        this.deferredRemote = null;
      }
    };

    // Build a script and insert it into the DOM.
    // Done is called once script has executed.
    WriteStream.prototype.writeScriptToken = function(tok, done) {
      var el = this.buildScript(tok);
      var asyncRelease = this.shouldRelease(el);
      var afterAsync = this.options.afterAsync;

      if(tok.src) {
        // Fix for attribute "SRC" (capitalized). IE does not recognize it.
        el.src = tok.src;
        this.scriptLoadHandler(el, !asyncRelease ? function() {
          done();
          afterAsync();
        } : afterAsync);
      }

      try {
        this.insertScript(el);
        if(!tok.src || asyncRelease) {
          done();
        }
      } catch(e) {
        this.options.error(e);
        done();
      }
    };

    // Build a script element from an atomic script token.
    WriteStream.prototype.buildScript = function(tok) {
      var el = this.doc.createElement(tok.tagName);

      // Set attributes
      eachKey(tok.attrs, function(name, value) {
        el.setAttribute(name, value);
      });

      // Set content
      if(tok.content) {
        el.text = tok.content;
      }

      return el;
    };

    // Insert script into DOM where it would naturally be written.
    WriteStream.prototype.insertScript = function(el) {
      // Append a span to the stream. That span will act as a cursor
      // (i.e. insertion point) for the script.
      this.writeImpl('<span id="ps-script"/>');

      // Grab that span from the DOM.
      var cursor = this.doc.getElementById('ps-script');

      // Replace cursor with script.
      cursor.parentNode.replaceChild(el, cursor);
    };

    WriteStream.prototype.scriptLoadHandler = function(el, done) {
      function cleanup() {
        el = el.onload = el.onreadystatechange = el.onerror = null;
      }

      // Error handler
      var error = this.options.error;

      function success() {
        cleanup();
        done();
      }

      function failure(err) {
        cleanup();
        error(err);
        done();
      }

      // Set handlers
      set(el, {
        onload: function() {
          success();
        },

        onreadystatechange: function() {
          if(/^(loaded|complete)$/.test( el.readyState )) {
            success();
          }
        },

        onerror: function() {
          failure({ message: 'remote script failed ' + el.src });
        }
      });
    };

    WriteStream.prototype.shouldRelease = function(el) {
      var isScript = /^script$/i.test(el.nodeName);
      return !isScript || !!(this.options.releaseAsync && el.src && el.hasAttribute('async'));
    };

    return WriteStream;

  }());

  // Public-facing interface and queuing
  global.postscribe = (function() {
    var nextId = 0;

    var queue = [];

    var active = null;

    function nextStream() {
      var args = queue.shift();
      var options;
      if(args) {
        options = last(args);
        options.afterDequeue();
        args.stream = runStream.apply(null, args);
        options.afterStreamStart();
      }
    }

    function runStream(el, html, options) {
      active = new WriteStream(el, options);

      // Identify this stream.
      active.id = nextId++;
      active.name = options.name || active.id;
      postscribe.streams[active.name] = active;

      // Override document.write.
      var doc = el.ownerDocument;

      var stash = {
        close: doc.close,
        open: doc.open,
        write: doc.write,
        writeln: doc.writeln
      };

      function write(str) {
        str = options.beforeWrite(str);
        active.write(str);
        options.afterWrite(str);
      }

      set(doc, {
        close: doNothing,
        open: doNothing,
        write: function(){
          return write(toArray(arguments).join(''));
        },
        writeln: function() {
          return write(toArray(arguments).join('') + '\n');
        }
      });

      // Override window.onerror
      var oldOnError = active.win.onerror || doNothing;

      // This works together with the try/catch around WriteStream::insertScript
      // In modern browsers, exceptions in tag scripts go directly to top level
      active.win.onerror = function(msg, url, line) {
        options.error({ msg: msg + ' - ' + url + ':' + line });
        oldOnError.apply(active.win, arguments);
      };

      // Write to the stream
      active.write(html, function streamDone() {
        // restore document.write
        set(doc, stash);

        // restore window.onerror
        active.win.onerror = oldOnError;

        options.done();
        active = null;
        nextStream();
      });

      return active;
    }

    function postscribe(el, html, options) {
      if(isFunction(options)) {
        options = { done: options };
      }
      options = defaults(options, OPTIONS);

      el =
        // id selector
        (/^#/).test(el) ? global.document.getElementById(el.substr(1)) :
        // jquery object. TODO: loop over all elements.
        el.jquery ? el[0] : el;


      var args = [el, html, options];

      el.postscribe = {
        cancel: function() {
          if(args.stream) {
            // TODO: implement this
            args.stream.abort();
          } else {
            args[1] = doNothing;
          }
        }
      };

      options.beforeEnqueue(args);
      queue.push(args);

      if(!active) {
        nextStream();
      }

      return el.postscribe;
    }

    return set(postscribe, {
      // Streams by name.
      streams: {},
      // Queue of streams.
      queue: queue,
      // Expose internal classes.
      WriteStream: WriteStream
    });
  }());
}());
// psQuery
// http://pseudosavant.com
// License: MIT

(function (global) {
    'use strict';

    var start = +new Date();
    
    var debug = true;
    var type_string = 'string';
    var typeMatch = function(o, type){
        return (typeof o === type);
    };

    var utils = {
        isFunction: function(fn) {
            return (!!fn && typeMatch(fn, 'function'));
        },
        lastArgumentCallback: function (args, invoke) {
            var lastArgument = args[args.length - 1];

            if (utils.isFunction(lastArgument)){
                if (invoke) {
                    lastArgument();
                }
                return lastArgument;
            } else {
                return undefined;
            }
        },
        extend: function (target) {
            Array.prototype.slice.call(arguments, 1)
                .forEach(function (source) {
                    for (var key in source) {
                        if (source[key] !== undefined) {
                            target[key] = source[key];
                        }
                    }
            });
            return target;
        }
    };

    var featureDetect = function () {
        var requiredFeatures = [
            JSON,
            document.querySelectorAll,
            global.XMLHttpRequest
        ];

        for (var i = 0; i < requiredFeatures.length; i++) {
            if (!requiredFeatures[i]) {
                return false;
            }
        }

        return true;
    };

    var psQuery = function (selector) {
        return new psQuery.fn.init(selector);
    };

    psQuery.fn = psQuery.prototype = {
        constructor: psQuery,
        init: function (selector) {
            if (!featureDetect()) {
                throw 'Error: Cannot load psQuery. Required browser features are not available.';
            }

            try {
                if (!selector) {
                    throw 'Error: Invalid selector';
                } else if (!!selector.nodeType && (selector.nodeType === 1 || selector.nodeType === 9)) {
                    this.els = [selector];
                } else if (typeMatch(selector, type_string)) {
                    this.els = document.querySelectorAll(selector);
                }

                this.length = this.els.length;

                if (this.length === 0) {
                    throw 'Error: No elements found with that selector.';
                }

                return this;
            } catch (e) {
                if (!debug) {
                    return undefined;
                } else {
                    throw e;
                }
            }
        },
        each: function (fn) {
            var els = this.els,
                trueFalseCount = 0;

            if (!utils.isFunction(fn)) {
                console.error('Is not function', typeof fn);
                throw 'Error: no function supplied to loop.';
            }

            for (var i = 0, l = els.length; i < l; i++) {
                if (fn.call(els[i], i) === false) {
                    trueFalseCount--;
                } else {
                    trueFalseCount++;
                }
            }

            return trueFalseCount;
        },
        nth: function(n) {
            var pos = (n < 0 ? this.els.length + n : n);
            return psQuery.fn.init(this.els[pos]);
        },
        get: function(n) {
            return this.nth(n);
        },
        first: function () {
            return this.nth(0);
        },
        last: function () {
            return this.nth(-1);
        },
        parent: function () {
            return psQuery(this.els[0]);
        },
        children: function(){

        },
        val: function(val) {
            if (val) {
                this.each(function () {
                    this.value = val;
                });
            } else {
                return this.els[0].value;
            }
        },
        html: function (html) {
            if (typeMatch(html, type_string)) {
                this.each(function () {
                    this.innerHTML = html;
                });

                return this;
            } else {
                return this.els[0].innerHTML;
            }
        },
        text: function(text) {
            if (typeMatch(text, type_string)) {
                this.each(function () {
                    this.innerText = text;
                });

                return this;
            } else {
                return this.els[0].innerText;
            }
        },
        hide: function() {
            var set = function () {
                this.style.display = 'none';
            };

            this.each(set);
        },
        show: function() {
            var set = function () {
                this.style.display = '';
            };

            this.each(set);
        },
        remove: function(){
            this.each(function () {
                this.parentElement.removeChild(this);
            });

            return this;
        },
        hasClass: function (className) {
            className = className.trim();

            var result = this.each(function () {
                return (this.className.indexOf(className) > -1);
            });

            return ((result + this.length) > 0);
        },
        toggleClass: function(className){
            className = className.trim();

            this.each(function () {
                var $this = $(this);
                if ($this.hasClass(className)) {
                    $this.removeClass(className);
                } else {
                    $this.addClass(className);
                }
            });

            return this;
        },
        addClass: function (classes) {
            var add = function () {
                var merged = (this.className + ' ' + classes.trim()).split(' '),
                    uniques = {},
                    union = [];
                
                for (var i = 0, l = merged.length; i < l; i++) {
                    uniques[merged[i]] = true;
                }

                for (var j in uniques) {
                    if (typeMatch(j, type_string)) {
                        union.push(j);
                    }
                }

                this.className = union.join(' ').trim();
            };

            if (typeMatch(classes, type_string)) {
                this.each(add);
            }
            return this;
        },
        removeClass: function(classes){
            var remove = function () {
                var existing = this.className + '';
                var removing = classes.trim().split(' ');

                for (var i = 0; i < removing.length; i++) {
                    existing = existing.replace(removing[i], '');
                }

                this.className = existing;
            };

            this.each(remove);
            return this;
        },
        css: function (css) {
            var set = function () {
                return undefined;
            };

            if (css) { // Set
                this.each(set);
            } else { // Get css for first element
                return '';
            }
            return this;
        },
        click: function(callback) {
            this.on('click', callback);
        },
        on: function (events) {
            var callback = utils.lastArgumentCallback(arguments),
                ev = events.split(' ');

            this.each(function () {
                for (var i = 0; i < ev.length; i++) {
                    this.addEventListener(ev[i], callback, false);
                }
            });

            return this;
        },
        off: function (events) {
            var callback = utils.lastArgumentCallback(arguments),
                ev = events.split(' ');

            this.each(function () {
                for (var i = 0; i < ev.length; i++) {
                    this.removeEventListener(ev[i], callback, false);
                }
            });

            return this;
        },
        data: function () {

        },
        attr: function (attributeName, val) {
            if (!val || !typeMatch(val, type_string)) {
                return this.els[0].getAttribute(attributeName);
            } else {
                this.each(function () {
                    this.setAttribute(attributeName, val);
                });
            }

            return this;
        }
    };

    psQuery.ajax = function (url, settings) {
        var args = arguments;
        settings = (args.length === 1 ? args[0] : args[1]);

        var emptyFunction = function () { };

        var defaultSettings = {
            url: (args.length === 2 && typeMatch(url, type_string) ? url : '.'),
            cache: true,
            data: {},
            headers: {},
            context: null,
            type: 'GET',
            success: emptyFunction,
            error: emptyFunction,
            complete: emptyFunction
        };

        settings = utils.extend(defaultSettings, settings || {});

        var mimeTypes = {
            'application/json': 'json',
            'text/html': 'html',
            'text/plain': 'text'
        };

        if (!settings.cache) {
            settings.url = settings.url +
                            (settings.url.indexOf('?') ? '&' : '?') +
                            'noCache=' +
                            Math.floor(Math.random() * 9e9);
        }

        var success = function (data, xhr, settings) {
            var status = 'success';
            settings.success.call(settings.context, data, status, xhr);
            complete(status, xhr, settings);
        };

        var error = function (error, type, xhr, settings) {
            settings.error.call(settings.context, xhr, type, error);
            complete(type, xhr, settings);
        };

        var complete = function (status, xhr, settings) {
            settings.complete.call(settings.context, xhr, status);
        };

        var xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                var result, dataType;

                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    var mime = xhr.getResponseHeader('content-type');
                    dataType = mimeTypes[mime] || 'text';
                    result = xhr.responseText;

                    try {
                        if (dataType === 'json') {
                            result = JSON.parse(result);
                        }

                        success(result, xhr, settings);
                        return;
                    } catch (e) {
                        
                    }
                }

                error(null, 'error', xhr, settings);
                return;
            }
        }, false);


        xhr.open(settings.type, settings.url);

        if (settings.type === 'POST') {
            settings.headers = utils.extend({
                'X-Requested-With': 'XMLHttpRequest',
                'Content-type': 'application/x-www-form-urlencoded'
            },
            settings.headers);
        }

        for (var key in settings.headers) {
            xhr.setRequestHeader(key, settings.headers[key]);
        }

        xhr.send(settings.data);

        return this;
    };

    psQuery.fn.init.prototype = psQuery.fn;

    global.psQuery = psQuery;
    if (!global.$) {
        global.$ = psQuery;
    }

    if (debug) {
        global.utils = utils;
    }

    global.ps = global.ps || {};
    global.ps.timings = global.ps.timings || {};
    global.ps.timings.psQuery = {
        start: start,
        end: +new Date()
    };

})(this);

/*
 * carousel ten billion
 * https://github.com/apathetic/flexicarousel-3
 *
 * Copyright (c) 2013 Wes Hatch
 * Licensed under the MIT license.
 *
 */


var Carousel = function(container, options){

	this.handle = container;

	// default options
	// --------------------
	this.defaults = {
		activeClass: 'active',
		slideWrap: 'ul',			// for binding touch events
		slides: 'li',				// the slide
		infinite: true,				// infinite scrolling or not
		display: 1,					// if infinite, the # of slides to "view ahead" ie. position offscreen
		disableDragging: false
	};

	// state vars
	// --------------------
	this.current = 0;
	this.slides = [];
	this.sliding = false;

	// touch vars
	// --------------------
	this.dragging = false;
	this.dragThreshold = 50;
	this.deltaX = 0;

	// feature detection
	// --------------------
	this.isTouch = 'ontouchend' in document;
	var style = document.body.style;
	var tests = {
		 'transform':'transitionend',
		 'OTransform': 'oTransitionEnd',
		 'MozTransform': 'transitionend',
		 'webkitTransform': 'webkitTransitionEnd'
	};
	// note: we don't test "ms" prefix, (as that gives us IE9 which doesn't support transforms3d anyway. IE10 test will work with "transform")
	for (var x in tests) {
		if ( style[x] !== undefined) {
			this.transform = x;
			this.transition = tests[x];
			break;
		}
	}

	// engage engines
	// --------------------
	this.init(options);

};

Carousel.prototype = {

	/**
	 * Initialize the carousel and set some defaults
	 * @param  {object} options List of key: value options
	 * @return {void}
	 */
	init: function(options){

		// set up options
		this.options = this._extend( this.defaults, options );

		// find carousel elements
		if ( !(this.slideWrap	= this.handle.querySelector(this.options.slideWrap)) ) { return; }		// note: assignment
		if ( !(this.slides		= this.slideWrap.querySelectorAll(this.options.slides)) ) { return; }	// note: assignment

		this.numSlides = this.slides.length;
		this.width = this.slideWrap.offsetWidth;											// for first drag

		// check if we have sufficient slides to make a carousel
		if ( this.numSlides < this.options.display ) { this.sliding = true; return; }		// this.sliding deactivates carousel. I will better-ify this one day. Maybe "this.active" ?
		if ( this.options.infinite ) { this._cloneSlides(this.options.display); }

		// add active class
		this._addClass( this.slides[0], this.options.activeClass );

		// set up Events
		if ( ! this.options.disableDragging) {
			// mobile-only setup
			if ( this.isTouch ) {
				this.handle.addEventListener('touchstart', this._dragStart.bind(this));
				this.handle.addEventListener('touchmove', this._drag.bind(this));
				this.handle.addEventListener('touchend', this._dragEnd.bind(this));
				this.handle.addEventListener('touchcancel', this._dragEnd.bind(this));
			} else {
				this.handle.addEventListener('mousedown', this._dragStart.bind(this));
				this.handle.addEventListener('mousemove', this._drag.bind(this));
				this.handle.addEventListener('mouseup', this._dragEnd.bind(this));
				this.handle.addEventListener('mouseleave', this._dragEnd.bind(this));
			}
		}

		// OR, use this and comment out setTimeout in _slide:
		// this.slideWrap.addEventListener(this.transition, (function(e) {
		// 	this.sliding = false;
		// 	this._removeClass( this.slideWrap, 'animate' );
		// }).bind(this));

		window.addEventListener('resize', this._updateView.bind(this));
		window.addEventListener('orientationchange', this._updateView.bind(this));

		return this;
	},

	/**
	 * Go to the next slide
	 * @return {void}
	 */
	next: function() {
		if (this.options.infinite || this.current !== this.numSlides-1) {
			this.go(this.current + 1);
		} else {
			this.go(this.numSlides-1);
		}
	},

	/**
	 * Go to the previous slide
	 * @return {void}
	 */
	prev: function() {
		if (this.options.infinite || this.current !== 0) {
			this.go(this.current - 1);
		} else {
			this.go(0);		// allow the slide to "snap" back if dragging and not infinite
		}
	},

	/**
	 * Go to a particular slide. Prime the "to" slide by positioning it, and then calling _move()
	 * @param  {int} to Slide to display
	 * @return {void}
	 */
	go: function(to) {

		if ( this.sliding ) { return; }

		this.width = this.slideWrap.offsetWidth;								// do this EVERY time, now

		if ( to < 0 || to >= this.numSlides ) {									// position the carousel if infinite and at end of bounds

			var temp = (to < 0) ? this.current+this.numSlides : this.current-this.numSlides;
			this._slide( -(temp * this.width - this.deltaX)+'px' );

			/* jshint ignore:start */
			this.slideWrap.offsetHeight;										// force a repaint to actually position "to" slide. *Important*
			/* jshint ignore:end */

		}

		to = this._loop(to);

		if (this.options.onSlide) { this.options.onSlide(to, this.current); }	// note: doesn't check if is a function

		this._slide( -(to * this.width)+'px', true );							// true is to animate it

		this._removeClass( this.slides[this.current], this.options.activeClass );
		this._addClass( this.slides[to], this.options.activeClass );
		this.current = to;
		this.deltaX = 0;
	},


	// ------------------------------------- "mobile" starts here ------------------------------------- //


	/**
	 * Start dragging (via touch)
	 * @param  {event} e Touch event
	 * @return {void}
	 */
	_dragStart: function(e) {

		var touches;

		if (this.sliding) {
			return false;
		}

		e = e.originalEvent || e;
		touches = e.touches !== undefined ? e.touches : false;

		this.dragThresholdMet = false;
		this.dragging = true;
		this.cancel = false;
		this.startClientX = touches ? touches[0].pageX : e.clientX;
		this.startClientY = touches ? touches[0].pageY : e.clientY;
		this.deltaX = 0;	// reset for the case when user does 0,0 touch
		this.deltaY = 0;	// reset for the case when user does 0,0 touch

		// this._addClass(this.slideWrap, 'no-animation');

		if (e.type === 'mousedown') {}
		if (e.target.tagName === 'IMG' || e.target.tagName === 'A') { e.target.draggable = false; }
	},

	/**
	 * Update slides positions according to user's touch
	 * @param  {event} e Touch event
	 * @return {void}
	 */
	_drag: function(e) {

		var abs = Math.abs,		// helper fn
			touches;

		if (!this.dragging || this.cancel) {
			return;
		}

		e = e.originalEvent || e;
		touches = e.touches !== undefined ? e.touches : false;
		this.deltaX = (touches ? touches[0].pageX : e.clientX) - this.startClientX;
		this.deltaY = (touches ? touches[0].pageY : e.clientY) - this.startClientY;

		// determine if we should do slide, or cancel and let the event pass through to the page
		if (this.dragThresholdMet || (abs(this.deltaX) > abs(this.deltaY) && abs(this.deltaX) > 10)) {		// 10 from empirical testing

			e.preventDefault();

			this.dragThresholdMet = true;
			this._slide( (this.deltaX + (this.width * -this.current))+'px' );

		} else if ((abs(this.deltaY) > abs(this.deltaX) && abs(this.deltaY) > 10)) {
			this.cancel = true;
		}
	},

	/**
	 * Drag end, calculate slides' new positions
	 * @param  {event} e Touch event
	 * @return {void}
	 */
	_dragEnd: function() {

		if (!this.dragging || this.cancel) {
			return;
		}

		this.dragging = false;
		// this._removeClass(this.slideWrap, 'no-animation');

		if ( this.deltaX !== 0 && Math.abs(this.deltaX) < this.dragThreshold ) {
			this.go(this.current);
		}
		else if ( this.deltaX > 0 ) {
			// if (this.deltaX > some_width) this.prev();	// momentum based check to swipe multiple slides?
			this.prev();
		}
		else if ( this.deltaX < 0 ) {
			this.next();
		}
	},


	// ------------------------------------- carousel engine ------------------------------------- //


	/**
	 * Helper function to translate slide in browser
	 * @param  {[type]} el     [description]
	 * @param  {[type]} offset [description]
	 * @return {[type]}        [description]
	 */
	_slide: function(offset, animate) {

		if (animate) {
			this.sliding = true;
			this._addClass( this.slideWrap, 'animate' );

			var delay = 400;
			var self = this;
			setTimeout(function(){
				self.sliding = false;
				self._removeClass( self.slideWrap, 'animate' );
			}, delay);

		}

		if (this.transform) {
			this.slideWrap.style[this.transform] = 'translate3d(' + offset + ', 0, 0)';
		}
		else {
			this.slideWrap.style.left = offset;
		}
	},


	// ------------------------------------- "helper" functions ------------------------------------- //


	/**
	 * Helper function. Calculate modulo of a slides position
	 * @param  {int} val Slide's position
	 * @return {int} the index modulo the # of slides
	 */
	_loop: function(val) {
		return (this.numSlides + (val % this.numSlides)) % this.numSlides;
	},

	/**
	 * Recalculate container width
	 * @return {[type]} [description]
	 */
	_updateView: function() {
		var self = this;

		clearTimeout(this.timer);
		this.timer = setTimeout(function() { self.go(self.current); }, 300);	// throttle updates
	},

	/**
	 * Duplicate the first and last N slides so that infinite scrolling can work
	 * Would ordinarily only need 1 slide duplicated, except for this particular project
	 * where we want to see the outlying slides as well
	 * @return {[type]} [description]
	 */
	_cloneSlides: function() {
		var offscreen,
			end,
			duplicate,
			i;

		offscreen = this.options.offscreen || 1;								// the number of slides that "hang" off the ends. Normally only need 1 to accommodate transitions

		end = (this.options.display + offscreen - 1);
		end = (end > this.numSlides) ? this.numSlides : end;
		// beg = (this.numSlides - offscreen);

		// beginning
		for (i = this.numSlides; i > (this.numSlides - offscreen); i--) {
			duplicate = this.slides[i-1].cloneNode(true);						// cloneNode --> true is deep cloning
			duplicate.removeAttribute('id');
			duplicate.setAttribute('aria-hidden', 'true');
			this._addClass( duplicate, 'clone');
			this.slideWrap.insertBefore(duplicate, this.slideWrap.firstChild);	// add duplicate to beg'n of slides
		}

		// end
		for (i = 0; i < end; i++) {
			duplicate = this.slides[i].cloneNode(true);
			duplicate.removeAttribute('id');
			duplicate.setAttribute('aria-hidden', 'true');
			this._addClass( duplicate, 'clone');
			this.slideWrap.appendChild(duplicate);
		}

		this.slideWrap.style.marginLeft = (-offscreen)+'00%';					// use marginLeft (not left) so IE8/9 etc can use left to slide
	},

	/**
	 * Helper function to add a class to an element
	 * @param  {int} i    Index of the slide to add a class to
	 * @param  {string} name Class name
	 * @return {void}
	 */
	_addClass: function(el, name) {
		if (el.classList) { el.classList.add(name); }
		else {el.className += ' ' + name; }
	},

	/**
	 * Helper function to remove a class from an element
	 * @param  {int} i    Index of the slide to remove class from
	 * @param  {string} name Class name
	 * @return {void}
	 */
	_removeClass: function(el, name) {
		if (el.classList) { el.classList.remove(name); }
		else { el.className = el.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' '); }
	},

	/**
	 * Helper function. Simple way to merge objects
	 * @param  {object} obj A list of objects to extend
	 * @return {object}     The extended object
	 */
	_extend: function(obj) {
		var args = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < args.length; i++) {
			var source = args[i];
			if (source) {
				for (var prop in source) {
					obj[prop] = source[prop];
				}
			}
		}
		return obj;
	}

};


/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
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
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
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

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
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

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
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
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
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
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

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
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
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
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
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
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
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

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
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
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
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
    if (array == null) return void 0;
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
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
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
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

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
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
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

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
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

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
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
  }

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
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
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
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

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
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
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
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
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

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
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

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
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
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

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
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
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
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
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

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
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
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
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
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
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

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
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
    // Regexes for identifying a key that needs to be escaped
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

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
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
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

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
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
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
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
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
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
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
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));;
/**

File:			_var.js
Description:	Set up our global Sprout object

*/

//'use strict';

var Sprout = {};

Sprout.Utils = {};
Sprout.Global = {};
Sprout.Components = {};
Sprout.Pages = {};
Sprout.Polyfills = {};
Sprout.user = null;
Sprout.mvpd = {};

var Drupal;
var $pdk = $pdk || {};
var gigya = gigya || null;
var googletag = googletag || null;

/**

File:           _utils.js
Description:    Global site utilities live here. Feature detection, other helpers, etc.

*/

Sprout.Utils = (function() {

    var transition = false,
        transform = false;

    var el = document.createElement('fake'),
        trans = ['webkitTransform', 'transform', 'msTransform', 'oTransform'],
        t;

    for (t = trans.length; t--;) {
        if ( el.style[ trans[t] ] !== undefined ) {
            transform = trans[t];
            break;
        }
    }


    return {
        /**
         * Transition feature detection
         * @return {string}
         */
        transition: transition,


        /**
         * Transform feature detection
         * @return {string}
         */
        transform: transform,


        /**
         * Returns if device is a touch device
         * @return {boolean}
         */
        isTouchDevice: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch || false,


        /**
         * Returns if device is a mobile device
         * @return {boolean}
         */
        isMobile: /Android(.)+mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test (navigator.userAgent),


        /**
         * Returns if device is a safari browser
         * @return {boolean}
         */
        isSafari: /Safari/i.test (navigator.userAgent) && !/Chrome/i.test (navigator.userAgent),


        /**
         * Returns if device is a tablet device
         * @return {boolean}
         */
        isTablet: /android|ipad|playbook|silk/i.test (navigator.userAgent),

        /**
        * Returns if device is running site on Chrome 55 or higher
        * @return {boolean}
        */
        isMinChrome55: function () {
            var match = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)/);
            if (match) {
                return parseInt(match[1]) >= 55;
            } else {
                return false;
            }
        },

        hasFlash: function () {
            // Flash Detection - http://stackoverflow.com/a/20095467
            var hasFlash = false;
            try {
                var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if (fo) {
                    hasFlash = true;
                }
            } catch (e) {
                if (navigator.mimeTypes
                    && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
                    && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                    hasFlash = true;
                }
            }

            return hasFlash;
        },


        /**
         * Returns if device does not support file upload
         * @return {boolean}
         */
        isFileInputSupported: function () {
             // Handle devices which falsely report support
             if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/) || typeof FormData === 'undefined') {
               return false;
             }
             // Create test element
             var el = document.createElement("input");
             el.type = "file";
             return !el.disabled;
        },

        /**
         * Returns if device does not support HTML5 file reader
         * @return {boolean}
         */
        isFileReaderSupported: !!window.FileReader,

        /**
         * Returns user authenticated state based on cookie
         * @return {boolean}
         */
        isUserAuthenticated: (document.cookie && document.cookie.indexOf('Drupal.visitor.us=1') >= 0),

        /**
         * days: Days list
         * @return {Array}    List of the days of the week
         */
        days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],


        /**
         * Feature Detection
         * @return {void}
         */
        featureDetection: function() {
            var body = document.querySelector('body');

            $(body).addClass('js');

            if (this.isTouchDevice)                     { $(body).addClass('touch'); }
            if (this.isMobile)                          { $(body).addClass('mobile'); }
            else if (this.isTablet)                     { $(body).addClass('tablet'); }
            if (this.transform && ! this.isTouchDevice) { $(body).addClass('is-animatable'); }
            if (!this.isFileInputSupported())           { $(body).addClass('no-file-input'); }
            if (!this.hasFlash())                       { $(body).addClass('no-flash'); }
        },


        /**
         * Scroll an element to a particular page anchor
         * @param  {HTMLElement}   root       the element to scroll
         * @param  {HTMLElement}   to       the element to scroll to
         * @param  {Function}      callback function to execute after scrolling completes
         * @return {void}
         */
        scrollElement: function(root, to, offset, callback) {

            offset = offset || 0;

            var duration = 500;

            var startTime,
                startPos = root.scrollTop,
                endPos = ~~(to.getBoundingClientRect().top - offset),
                maxScroll = root.scrollHeight,// - window.innerHeight,
                scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos;

            function easeInOutCubic(t, b, c, d) {
                if ((t/=d/2) < 1) { return c/2*t*t*t + b; }
                return c/2*((t-=2)*t*t + 2) + b;
            }

            function scroll(timestamp) {
                startTime = startTime || timestamp;
                var elapsed = timestamp - startTime;
                var progress = easeInOutCubic(elapsed, startPos, scrollEndValue, duration);
                root.scrollTop = progress;

                if (elapsed < duration) {
                    requestAnimationFrame(scroll);
                }
            }

            requestAnimationFrame(scroll);

            if (typeof callback === 'function') {
                window.setTimeout( callback, duration );
            }
        },


        /**
         * Scroll the page to a particular page anchor
         * @param  {HTMLElement}   to       the element to scroll to
         * @param  {Function}      callback function to execute after scrolling completes
         * @return {void}
         */
        scrollPage: function(to, offset, callback) {
            var root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body;
            Sprout.Utils.scrollElement(root, to, offset, callback);
        },


        /**
         * Deactivate Touch-Scrolling on mobile devices. Useful when modals
         * or menus occupy the screen
         * @param  {boolean}        toggle whether to deactivate or reactivate
         * @return {void}
         */
        deactivateScroll: function(toggle) {

            toggle = toggle || false;

            function deactivate(e) {
                // if (e.target is not e.scrollable) {
                e.preventDefault();
            }

            if (toggle) {
                document.addEventListener('touchmove', deactivate, false);
            } else {
                document.removeEventListener('touchmove', deactivate, false);
            }
        },


        /**
         * Animateables: watch for the position of an element to come on screen. When it
         * does, we animate it by adding class "animated"
         * @param  {NodeArray} animatables the list of HTMLElements to animate
         * @param  {Integer} delay         the delay from the bottom of the screen that we wait before triggering
         * @return {void}
         */
        animateIn: function(selector, delay) {

            var animatables = document.querySelectorAll(selector);
            delay = delay || 50;

            function watchElement(element) {
                var position;

                // $(element).addClass('fx-'+effect);

                function check() {
                    position = element.getBoundingClientRect().top;
                    position += delay;

                    if (position < window.innerHeight) {
                        $(element).addClass('animated');

                        window.removeEventListener('scroll', check);
                        window.removeEventListener('resize', check);
                    }
                }

                // bind events to animatable element
                window.addEventListener('scroll', check);
                window.addEventListener('resize', check);

                check();
            }

            if (! animatables.length || ! animatables[0].getBoundingClientRect || Sprout.Utils.isTouchDevice) {
                return false;
            } else {
                animatables = Array.prototype.slice.call(animatables, 0);
                animatables.forEach(watchElement);

                // Array.prototype.forEach.call(animatables, watchElement);
            }
        },


        /**
         * Load external JS or CSS asset
         * @param  {string}   url      the URL of the asset to load
         * @param  {Function} callback the callback to execute upon load
         * @return {void}
         */
        loadAsset: function(url, callback) {
            var head = document.querySelector('head'),
                asset;

            if (url.split('.')[1] === 'js') {
                asset = document.createElement('script');
                asset.type = 'text/javascript';
                asset.src = url;
            } else {        // we assume it will be css, here
                asset = document.createElement('link');
                asset.rel = 'stylesheet';
                asset.type = 'text/css';
                asset.href = url;
            }

            // There are two events here for cross browser compatibility.
            asset.onreadystatechange = callback;
            asset.onload = callback;

            head.appendChild(asset);
        },


        /**
         * Set timeout for next scheduled show
         * callback: Function to call when next show starts
         * current: Current Date Time
         * start: Next show start Date Time
         * end: Next show end Date Time
         */
        setScheduleTimer: function(callback, current, start, end) {
            var nextTime = start;
            if (current >= nextTime) {
                nextTime = end;
            }

            var timeoutCount = (nextTime - current + 1) * 1000;

            // Not least than one minute to avoid performance issues
            if (isNaN(timeoutCount) || timeoutCount < 60000) {
                timeoutCount = 60000;
            }

            setTimeout(callback, timeoutCount);
        },


        /**
         * [serialize description]
         * @param  {[type]} obj    [description]
         * @param  {[type]} prefix [description]
         * @return {[type]}        [description]
         */
        serialize: function(obj, prefix) {
            var items = [];
            for(var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var newPrefix = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                    items.push(typeof v === "object" ?
                               Sprout.Utils.serialize(v, newPrefix) :
                               encodeURIComponent(newPrefix) + "=" + encodeURIComponent(v));
                }
            }
            return items.join("&");
        },


        /**
         * [getDataOptions description]
         * @param  {[type]} element [description]
         * @return {[type]}         [description]
         */
        getDataOptions: function(element) {
            var options = element.getAttribute('data-options') || '{}';
            var jsonObj;
            try {
                jsonObj = JSON.parse(options.replace(/'/g, '"'));

                _.each(jsonObj, function(item, key) {
                    if (typeof item === 'string') {
                        jsonObj[key] = decodeURIComponent(item);
                    }
                });
            } catch (ev) {
                jsonObj = {};
            }

            return jsonObj;
        },


        /**
         * [getDataValue description]
         * @param  {[type]} element [description]
         * @param  {[type]} key     [description]
         * @return {[type]}         [description]
         */
        getDataValue: function(element, key) {
            if (element) {
                return element.getAttribute('data-' + key);
            } else {
                return null;
            }
        },


        /**
         * Preview local image file
         * @param  {file}           file        Image file to preview
         * @param  {HTMLElement}    display     HTML img element to display the image
         * @return {void}
         */
        previewImageFile: function(file, display) {
            if (this.isFileReaderSupported) {
                var reader = new FileReader();
                var imageData;

                reader.addEventListener('load', function(e) {
                    imageData = e.target.result;
                    display.src = imageData;
                });
                reader.readAsDataURL(file);
            } else {
                display.src = '';
            }
        },


        /**
         * Calculates the age based on a valid Date
         * @param  {Date}           Date        Birthday date to calculate age
         * @return {int}            Age
         */
        getAge: function(date) {
            if (_.isString(date)) {
                date = Sprout.Utils.formatGNUDate(date);
            }
            var age = 0;
            var dateDay = date.getDate();
            var dateMonth = date.getMonth()+1;
            var dateYear = date.getYear();

            var today = new Date();
            var todaysDay = today.getDate();
            var todaysMonth = today.getMonth()+1;
            var todaysYear = today.getYear();

            age = todaysYear - dateYear;

            if (todaysMonth < dateMonth) {
                age--;
            }

            if (todaysMonth === dateMonth && todaysDay < dateDay) {
                age--;
            }

            if (isNaN(age)) {
                age = 0;
            }
            return age;
        },


        /**
         * possible more-generalized replacement for getAge:
         */
        // getTimeOffset: function(date, quantize) {
        //     var today = new Date();
        //     var offset = Math.abs(today.getTime() - date.getTime());

        //     return (quantize === 'minute') ?
        //         offset / (1000 * 60) :                          // return difference in minutes
        //         Math.floor(offset / (1000 * 3600 * 24 * 365));  // return difference in Years by default (ie age).
        // },

        /**
         * Prettify a Date object
         * @param  {Date} date [description]
         * @return {[type]}      [description]
         */
        formatGNUDate: function(str) {
            return new Date(str.replace(/-/g, '/'));
        },

        /**
         * Prettify Time
         * @param  {integer} hour [description]
         * @param  {integer} minutes [description]
         * @return {string}      [description]
         */
        formatTime: function(hour, minutes) {
            var formatted = '';

            if ((hour % 12) > 0) {
                formatted += (hour % 12);
            } else {
                formatted += '12';
            }

            if (minutes > 0) {
                if (minutes < 10) {
                    minutes = '0'+ minutes;
                }
                formatted += ':'+ minutes;
            }

            return formatted + ((hour < 12)? 'am': 'pm');
        },

        /**
         * Prettify a Date object
         * @param  {Date} date [description]
         * @return {string}      [description]
         */
        formatDateTime: function(date) {
            var hour = date.getHours();
            var minutes = date.getMinutes();
            var formatted = '';

            formatted = getNextWeekDay(date);

            return formatted + ' ' + this.formatTime(hour, minutes);

            function getNextWeekDay(nextDate) {
                var currentDate = new Date();
                var nextWeekDay = '';
                var currentDay = currentDate.getDay();
                var nextDay = nextDate.getDay();

                if (currentDay === nextDay) {
                    nextWeekDay = 'Today';
                } else if (((currentDay + 1) % 7) === nextDay) {
                    nextWeekDay = 'Tomorrow';
                } else {
                    nextWeekDay = Sprout.Utils.days[nextDay];
                }
                return nextWeekDay;
            }
        },

        showDefaultAirTime: function(handle, currentDate) {
            var options = this.getDataOptions(handle);
            var nextAirtimeElement = handle.querySelector('.time');

            function setAirTime() {
                var defaultDate;
                if (currentDate) {
                    currentDate = new Date(currentDate.replace(/-/g, '/'));
                } else if (options.current) {
                    currentDate = new Date(options.current);
                } else {
                    currentDate = new Date();
                }

                var currentTime = (currentDate.getHours() * 60) + currentDate.getMinutes();
                var nextDayTime = _.find(options.default, function(dayTime) {
                    try {
                        dayTime = dayTime.split(':');
                        dayTime = (parseInt(dayTime[0]) * 60) + parseInt(dayTime[1]);
                        if (dayTime >= currentTime) {
                            return true;
                        }
                    } catch(ev) {}
                    return false;
                });

                if (!nextDayTime) {
                    nextDayTime = options.default[0];
                }

                try {
                    nextDayTime = nextDayTime.split(':');
                    defaultDate = new Date(currentDate);
                    defaultDate.setHours(parseInt(nextDayTime[0]), parseInt(nextDayTime[1]));

                    if (defaultDate.getTime() < currentDate.getTime()) {
                        defaultDate.setTime(defaultDate.getTime() + (24*60*60*1000));
                    }
                    nextAirtimeElement.innerHTML = Sprout.Utils.formatDateTime(defaultDate);
                    $(handle).removeClass('u-hidden');

                    Sprout.Utils.setScheduleTimer(
                        setAirTime,
                        currentDate.getTime()/1000,
                        defaultDate.getTime()/1000,
                        defaultDate.getTime()/1000
                    );
                } catch(ev) {
                    $(handle).addClass('u-hidden');
                }

                $(handle).removeClass('on-air');
            }

            if (options.default && _.isArray(options.default) && options.default.length > 0) {
                setAirTime();
            }
        },

        appendString: function(str, count, padStr, right) {
            if (str && count > 0) {
                if (right) {
                    return Sprout.Utils.appendString(str + padStr, --count, padStr, right);
                } else {
                    return Sprout.Utils.appendString(padStr + str, --count, padStr);
                }
            }

            return str;
        },

        /**
         * Fill string with
         * @param  {function} callback          Callback to invoke when external link is clicked
         * @param  {HTMLElement} handle         Target element inside which do the detection
         * @return {void}
         */
        fillString: function(str, length, padStr, type) {
            var padLen = 0;
            if (str.length >= length) {
                return str;
            }

            if (!padStr) {
                padStr = ' ';
            } else if (padStr.length > 1) {
                padStr = padStr.charAt(0);
            }

            switch (type) {
                case 'right':
                    str += padStr;
                    padLen = length - str.length;
                    return this.appendString(str, padLen, padStr, true);
                case 'both':
                    padLen = ((length - str.length) / 2);
                    return this.appendString(this.appendString(str, Math.ceil(padLen), padStr),
                                             Math.floor(padLen), padStr, true);
                default: // 'left'
                    str = padStr + str;
                    padLen = length - str.length;
                    return this.appendString(str, padLen, padStr);
            }
        },


        getParentMatch: function(elem, query){
            var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

            while (elem) {
                if (matchesSelector.bind(elem)(query)) {
                    return elem;
                } else {
                    elem = elem.parentElement;
                }
            }
            return false;
        },

        getURLParam: function(url, key) {
            var results = new RegExp('[\?&]' + key + '=([^&#]*)').exec(url);
            if (results==null){
               return null;
            }
            else{
               return results[1] || 0;
            }
        },

        /**
         * Detects clicks on external links
         * @param  {function} callback          Callback to invoke when external link is clicked
         * @param  {HTMLElement} handle         Target element inside which do the detection
         * @return {void}
         */
        detectLeavingSite: function(callback, target) {
            var self = this;

            /**
             * Process external link click and invokes callback
             * @param  {event}    Event     Click event to process
             */
            function externalLinkDetected(event, target) {
                if (target.href && !$(target).hasClass('js-ignore-external-link')) {
                    event.stopPropagation();
                    event.preventDefault();
                    callback(target.href);
                }
            }

            /**
             * Evaluates element and detect if is an anchor with external link
             * @param  {HTMLElement}    element     Target DOM element
             * @return {boolean}
             */
            function isExternalLink(element) {
                var sHref = String(element.href);
                var adurl = self.getURLParam(sHref, 'adurl');
                return (element.hostname && element.hostname !== location.hostname &&
                        (!adurl || (adurl.indexOf(element.hostname) < 0 && adurl.indexOf('sproutonline.com') < 0)));
            }

            /**
             * Get anchor element based on target.
             * If element is not an anchor or a children of an anchor, it returns null
             * @param  {HTMLElement}    element     Target DOM element
             * @return {HTMLElement}
             */
            function getAnchor(element) {
                if (element.hostname) {
                    return element;
                } else if (element.parentNode) {
                    // Bubbles through node tree until finding an anchor or getting to the HTML node
                    return getAnchor(element.parentNode);
                }
                return null;
            }

            if (target) {
                //If an specific target is provided, get all the anchors in the site and filter which one is external
                var externalLinks = _.filter(target.querySelectorAll('a'), isExternalLink);
                _.each(externalLinks, function(element) {
                    element.addEventListener('click', function(event) {
                        externalLinkDetected(event, element);
                    });
                });
            } else {
                //Or else, bind full document click event
                document.addEventListener('click', function(event) {
                    //In every click in the site, detect if the target for the event is an anchor and it has an external link
                    var target = getAnchor(event.target);
                    if (target && isExternalLink(target)) {
                        externalLinkDetected(event, target);
                    }
                });
            }
        },

        /**
         * [loader description]
         * @param  {[type]} show [description]
         * @return {[type]}      [description]
         */
        modal: function(modalId, show){
            var handle = document.querySelector(modalId);
            if (handle && handle.modal){
                if (show===true){
                    handle.modal.show();
                }
                else{
                    handle.modal.hide();
                }
            }
        },

        /**
         * [loader description]
         * @param  {[type]} show [description]
         * @return {[type]}      [description]
         */
        loader: function(show){
            this.modal('#loader', show);
        },


        /**
         * Reset errors set by validator from form field items
         * @param  {string}    element     Target selector for DOM element
         */
        resetForm: function(handle) {
            var fields = handle.querySelectorAll('.field-item');
            _.each(fields, function(field) {
                $(field).removeClass('error');

                var items = field.querySelectorAll('input');
                _.each(items, function(item) {
                    if (item.type === 'checkbox') {
                        item.checked = false;
                    }
                    else {
                        $(item).val('');
                    }
                });

                items = field.querySelectorAll('.combobox');
                _.each(items, function(item) {
                    var field = item.querySelector('.combobox-item');
                    if (item.combobox) {
                        item.combobox.selectItem(field, true);
                    }
                });
            });
        },

        /**
         * [getFormValues description]
         * @param  {[type]} handle [description]
         * @return {[type]}        [description]
         */
        getFormValues: function(handle) {
            var fields = handle.querySelectorAll('input, textarea');

            var values = {};
            _.each(fields, function(field) {
                if (!field.disabled) {
                    var fieldValue = Sprout.Utils.getFieldValue(field, handle);
                    if (fieldValue) {
                        values[field.name] = fieldValue;
                    }
                }
            });
            return values;
        },

        /**
         * [getFieldValue description]
         * @param  {[type]} field  [description]
         * @param  {[type]} handle [description]
         * @return {[type]}        [description]
         */
        getFieldValue: function(field, handle) {
            var items;
            switch (field.type) {
                case 'radio':
                    if (!handle) {
                        handle = document;
                    }
                    items = handle.querySelectorAll('input[name="' + field.getAttribute('name') + '"]:checked');
                    return (items.length < 1) ? false : true;
                case 'checkbox':
                    return field.checked?1:0;
                case 'submit':
                case 'button':
                    return null;
                default:
                    return $(field).val();
            }
        },

        /**
         * [getWebformValue description]
         * @param  {[type]} value [description]
         * @param  {[type]} type  [description]
         * @return {[type]}       [description]
         */
        getWebformValue: function(value, type) {
            switch (type) {
                case 'select':
                    return {
                        'und': value
                    };
                case 'checkbox':
                    if (value) {
                        return {
                            'und': {
                                'value': '1'
                            }
                        };
                    } else {
                        return {
                            'und': null
                        };
                    }
                    break;
                default:
                    return {
                        'und': [
                            {
                                'value': value
                            }
                        ]
                    };
            }
        },


        /**
         * Will toggle a class on body, while removing other currently-visible blocks
         * If no argument is passed, will remove all currently-visible blocks
         * @param {string}  className   The class to toggle
         * @param {boolean} force       Flag to always set the className
         */
        toggleShowing: function(className, force) {
            var showing = className ? !force && $(document.body).hasClass(className) : true;
            // remove show-*
            $(document.body).removeClass('show-search show-login show-channel');        // show-nav show-modal

            //reset channel finder form
            if(className === 'show-channel'){
                $('header #channel-finder .zip').removeClass('u-hidden');
                $('header #channel-finder .zip input').val('');
                $('header #channel-finder .providers').addClass('u-hidden');
                $('header #channel-finder .result').addClass('u-hidden');
            }

            if (!showing) {
                $(document.body).addClass(className);
            }
        },


        /**
         * Controls the scrolling for an sticky bar
         * @param {function}  callback   Callback function for the scroll event
         */
        scrolling: function(callback) {
            if (!callback) {
                return;
            }

            var ticking,
                lastScroll = 0,
                delta = 5;

            window.addEventListener('scroll', function(){
                ticking = true;
            });

            setInterval(function() {
                if (ticking) {
                    var scroll = window.scrollY;

                    if(Math.abs(lastScroll - scroll) <= delta) { return; }

                    callback(scroll, lastScroll);

                    ticking = false;
                    lastScroll = scroll;
                }
            }, 250);
        },

        /**
         * Removes whitespace nodes. Useful to normalize inline-block layouts (IE)
         * @param  {DOMElement} handle the element to remove whitespace nodes from
         * @return {void}
         */
        removeEmptyNodes: function(handle) {
            var spaces = _.filter(handle.childNodes,
                function(el) {
                    return (el.nodeType === 3 && !/\S/.test(el.nodeValue));
                });

            _.each(spaces, function(space) {
                handle.removeChild(space);
            });
        },

        /**
         * Removes all the children from a DOM element
         * @param  {DOMElement} handle the element to empty
         * @return {void}
         */
        emptyElement: function(handle) {
            while (handle.firstChild) {
                handle.removeChild(handle.firstChild);
            }
        },

        /**
         * Add or remove the selected status of DOM elements, their aria-selected value and 'selected' class
         * @param  {ArrayOfDOMElements} get the list of elements
         * @param  {Boolean} Validation of which function will do (select, deselect)
         * @return {void}
         */
        switchElementsStatus: function(elements, status) {
            /*select*/
            if (status){
                _.each(elements, function(value, key){
                    $(value).attr('aria-selected', true);
                    $(value).addClass('selected');
                });
            }
            /*deselect*/
            else{
                _.each(elements, function(value, key){
                    $(value).attr('aria-selected', false);
                    $(value).removeClass('selected');
                });
            }
        },

        /**
         *   :: cookies.js ::
         *
         *   A complete cookies reader/writer framework with full unicode support.
         *
         *   Revision #1 - September 4, 2014
         *
         *   https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
         *   https://developer.mozilla.org/User:fusionchess
         *
         *   This framework is released under the GNU Public License, version 3 or later.
         *   http://www.gnu.org/licenses/gpl-3.0-standalone.html
         *
         *   Syntaxes:
         *
         *   * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
         *   * docCookies.getItem(name)
         *   * docCookies.removeItem(name[, path[, domain]])
         *   * docCookies.hasItem(name)
         *   * docCookies.keys()
         */

        cookies: {
            getItem: function (name) {
                var ca = document.cookie.split(';');
                var nameEQ = name + "=";
                for(var i=0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)===' ') {
                        c = c.substring(1, c.length); //delete spaces
                    }
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
                return "";
            },
            setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
                if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                    return false;
                }
                var sExpires = "";
                if (vEnd) {
                    switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                    }
                }
                document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
                return true;
            },
            removeItem: function (sKey, sPath, sDomain) {
                if (!this.hasItem(sKey)) {
                    return false;
                }
                document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
                return true;
            },
            hasItem: function (sKey) {
                if (!sKey) {
                    return false;
                }
                return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
            },
            keys: function () {
                var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
                for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
                    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
                }
                return aKeys;
            },

            createCookie: function(name, value, days) {
                var expires;

                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    expires = "; expires="+date.toGMTString();
                }
                else {
                    expires = "Thu, 01 Jan 1970 00:00:00 GMT";
                }
                document.cookie = name+"="+value+expires+"; path=/";
            },

            eraseCookie: function(name) {
                Sprout.Utils.cookies.createCookie(name, "", 0);
            },

            test: function() {
                var randValue = Math.random();
                var sKey = 'sprout-cookie-test';
                var sValue = 'Sprout cookie test ' + randValue;
                this.setItem(sKey, sValue);
                var returnedValue = decodeURIComponent(this.getItem(sKey));
                var acceptCookies = returnedValue === sValue;
                this.removeItem(sKey);
                return acceptCookies;
            }
        },

        htmlDecode: function (input){
            var e = document.createElement('div');
            e.innerHTML = input;
            return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        },

        /**
         * Replaces new line character by <br /> tag
         * original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
         * @param str
         * @returns {string}
         */
        nl2br: function (str) {
            var breakTag = '<br />';
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
        },

        /**
         * Triggers available animation within the wrapper element
         * @param wrapper {DOMElement} animation container
         * @param initialDelay {number} milliseconds that will wait after the animation is triggered
         */
        triggerAnimation: function(wrapper, initialDelay) {
            try {
                var isAnimatingClass = 'animating';
                var $animation = ($(wrapper).hasClass('has-animation')) ? $(wrapper) : $(wrapper.querySelector('.has-animation'));
                if($animation) {
                    setTimeout(function() {
                        $animation.addClass(isAnimatingClass);
                        setTimeout(function (){
                            $animation.removeClass(isAnimatingClass);
                        }, 1000);
                    }, initialDelay);
                }
            } catch (err) {}
        },

        /**
         * Sanitizes a string by encoding HTML entities, it is most likely used to prevent XSS.
         * @param string
         * @returns {string}
         */
        htmlEscape: function(string) {
            return String(string)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        },
        /**
         * Creates custom ids for random generated strings
         * @returns {string}
         */
        makeId :function (){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 10; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;
        }
    };
})();

/**

File:           _components.js
Description:    Reusable components on the Sprout online site


        ◡◠ ✥ ◠◡

    Table of Contents:

    1. Library Overrides
    2. Carousel
    3. Parallax
    4. Sticky
    5. etc...

*/

Sprout.Components._init = function(element) {
    var components = element.querySelectorAll('[data-component]');
    var componentsToIgnore = element.querySelectorAll('.js-ignore [data-component]');
    Array.prototype.forEach.call(components, function(component) {
        if (_.indexOf(componentsToIgnore, component) < 0) {
            var name = component.getAttribute('data-component');

            if (Sprout.Components[name]) {
                new Sprout.Components[name](component);
            }
        }
    });
};

/**
 * Create a carousel interface to Simplecarousel
 * @param  {HTMLElement} element DOM node on which to create carousel on
 * @return {void}
 */
Sprout.Components.carousel = function(handle, options) {

    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }

    var skipSlide = options.skip || 1,
        infinite = options.infinite || false,
        firstSlide = null,
        carousel,
        bullets = (options.bullets ?
            document.querySelectorAll(options.bullets)  :
            handle.querySelectorAll('nav li')),
        next = handle.querySelector('.next'),
        prev = handle.querySelector('.prev'),
        prevTimeout = null,
        autoPlaying;

    var swipe = document.getElementById('sound-swipe');
    var onSlide = document.createEvent('Event');

    onSlide.initEvent('onSlide', true, true);

    // extend options
    options = _.extend({
        'onSlide': updateNav,
        'offscreen': skipSlide,
        'infinite': infinite,
        'autoplay': 0 //Number of seconds before it automatically displays the next slide. (0 = disabled)
    }, options);

    //Autoplaying is set depending on autoplay options
    autoPlaying = _.isNumber(options.autoplay) && options.autoplay > 0;

    // create the carousel
    carousel = new Carousel(handle, options);

    // IE layout helper
    if ( $(document.documentElement).hasClass('ie') ) { Sprout.Utils.removeEmptyNodes(carousel.slideWrap); }

    // update UI if finite
    if (prev && !options.infinite) {
        $(prev).addClass('disabled');
    }

    // create the nav
    if (bullets) {
        Array.prototype.forEach.call(bullets, function(bullet, index){
            bullet.addEventListener('click', function(e) {
                e.preventDefault();
                carousel.go(index);
            });
        });
    }

    if (prev) {
        new Sprout.Components.audio(prev, swipe);
        prev.addEventListener('click', function(e){
            e.preventDefault();
            if (skipSlide === 1) {      // if != 1, we assume it could be infinite. Use prev() & next() where possible because they have checks for non-infinite carousel
                carousel.prev();
            } else {
                carousel.go(carousel.current - skipSlide);
            }
        });
    }

    if (next) {
        new Sprout.Components.audio(next, swipe);
        next.addEventListener('click', function(e){
            e.preventDefault();
            if (skipSlide === 1) {
                carousel.next();
            } else {
                carousel.go(carousel.current + skipSlide);
            }
        });
    }

    function startAutoPlay(){
        if (autoPlaying){
            if (options.infinite || carousel.current < carousel.numSlides-1){
                window.clearTimeout(prevTimeout);
                prevTimeout = window.setTimeout(function(){
                    // If timeout callback is called, it is autoplay
                    autoPlaying = true;
                    carousel.go(carousel.current + skipSlide);
                    // Default autoplaying state to false to catch user interaction and stop autoplaying
                    autoPlaying = false;
                }, options.autoplay * 1000);
            }
        } else if(prevTimeout) {
            window.clearTimeout(prevTimeout);
        }
    }

    function updateNav(i) {
        if (!options.infinite) {
            if (prev) {
                if (i === 0){
                    $(prev).addClass('disabled');
                } else {
                    $(prev).removeClass('disabled');
                }
            }
            if (next) {
                if (i + 1 >= carousel.numSlides ){
                    $(next).addClass('disabled');
                } else {
                    $(next).removeClass('disabled');
                }
            }
        }

        if (bullets && bullets.length > 0) {
            Array.prototype.forEach.call(bullets, function(bullet){
                $(bullet).removeClass('active');
            });
            $(bullets[i]).addClass('active');
        }

        if (i !== 0 && firstSlide !== null ){
            firstSlide = null;
            carousel.go(i);
        }

        if (options.toggler){
            carousel.slides[i].dispatchEvent(onSlide);
        }

        //Trigger animation if slide changes only
        if(i !== carousel.current) {
            Sprout.Utils.triggerAnimation(carousel.slides[i], 850);
        }

        startAutoPlay();
    }

    /**
    * Function to get first slide, must be set with class 'selected' in twig markup.
    * @returns {Number} Slide index
    */
    function getFirstSlide(){
        firstSlide = 0;
        _.each(carousel.slides, function(slide, index){
            if ($(slide).hasClass('selected')){
                firstSlide = index;
            }
        });
        return firstSlide;
    }

    updateNav(getFirstSlide());
    // Default autoplaying state to false to catch user interaction and stop autoplaying
    autoPlaying = false;
};

/**
 * Parallax. Create a parallax effect on a given DOM element
 * @param  {HTMLElement} p The element to apply the effect to
 * @return {void}
 */
Sprout.Components.parallax = function(p) {

    var ticking = false,
        range = 200,
        height = window.innerHeight,
        transform = Sprout.Utils.transform;

    var offset = p.getBoundingClientRect().top,
        current = offset,
        last = 0,
        delta;

    if (!Sprout.Utils.isTouchDevice) {
        window.addEventListener('scroll', onScroll, false);
        window.addEventListener('resize', onResize, false);

        // Calculate each element's initial position. Here we find the limit as the offset and adjustment converge:
        while ( Math.abs(current - last) > 1 ) {
            last = current;
            delta = Math.min(1, -current / height) * range;
            current = offset + delta;
        }

        p.style[transform] = 'translate3d(0, '+ delta +'px, 0)';
        // p.style['opacity'] = 1;
    }

    /**
     * Update parallax on resize
     * @return {void}
     */
    function onResize() {
        height = window.innerHeight;
        update();
    }

    /**
     * Debounce scroll. Runs at 30fps using requestAnimationFrame
     * @param  {event} e scroll event
     * @return {[type]}   [description]
     */
    function onScroll(e) {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(update);
        }
    }

    /**
     * Update the parallax position. Used in debouncing for performance reasons
     * @return {[type]} [description]
     */
    function update() {
        // Array.prototype.forEach.call(p, calculate);
        calculate();
        ticking = false;
    }

    /**
     * Calculate the parallax position
     * @param  {[type]} p [description]
     * @return {[type]}   [description]
     */
    function calculate() {
        var offset = p.getBoundingClientRect().top,
            // range = 200,                                             // could be dynamic for each element
            position;

        if (height < (offset - range) ) { return; }                     // dont start parallaxin' until this here thing is within range (ie. "range" pixels from the bottom of the screen)

        position = Math.min(1, -offset / height) * range;               // 0 -> range
        // position *= p.parallaxSpeed;

        p.style[transform] = 'translate3d(0, '+ position +'px, 0)';     // no IE9, nor non 3d-accellerated browsers
    }
};

/**
 * Sticky Element: sets up a sticky bar which attaches / detaches to top of viewport
 * @param {HTMLElement} sticky The element to sticky-ify
 * @return {void}
 */
Sprout.Components.stickyElement = function(sticky, bounded) {

    if (!sticky || !sticky.getBoundingClientRect) {
        return false;                                       // progressive enhancement for newer browers only.
    }

    bounded = bounded || sticky.getAttribute('data-bounded') || false;

    var parent = sticky.parentNode,
        stickyPosition,
        parentPosition,
        currentState = '',
        stateSwitcher,
        determine = {
            normal:function(){
                stickyPosition = sticky.getBoundingClientRect();
                if (stickyPosition.top < 1) { return setState('sticky'); }
            },
            sticky:function(){
                parentPosition = parent.getBoundingClientRect();
                if (parentPosition.top > 1) { return setState('normal'); }
                if (!bounded) { return; }   // don't worry about bottom edge
                stickyPosition = sticky.getBoundingClientRect();
                if (parentPosition.bottom < stickyPosition.bottom) { return setState('bottom'); }
            },
            bottom: function(){
                stickyPosition = sticky.getBoundingClientRect();
                if (stickyPosition.top > 1) { return setState('sticky'); }
            }
        };

    function setState (state){
        if (currentState === state) { return; }
        $(sticky).removeClass(currentState);
        $(sticky).addClass(state);
        currentState = state;
        stateSwitcher = determine[state];
    }

    stickyPosition = sticky.getBoundingClientRect();

    //sticky initial position
    if (stickyPosition.top < 1) {
        setState('sticky');
        stateSwitcher();        // edge case: check if bottom of sticky collides w/ bounding container
    } else {
        setState('normal');
    }

    // window.addEventListener('scroll', stateSwitcher);
    window.addEventListener('scroll', function(){ stateSwitcher(); });
    window.addEventListener('resize', function(){ stateSwitcher(); });
};

/**
 * Navigation which updates on scroll by adding active class to respective item in nav menu
 * @param  {HTMLElement} handle         The DOM element handle
 * @return {void}
 */


/** ADOBE DTM for NAV Links Jump */
Sprout.Components.sectionNav = function(handle, options) {

    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }

    options = _.extend({
        'offset': 0,
        'bounded': false,
        'min': 1
    }, options);


    var sections = document.querySelectorAll('[data-nav]'),
        nav = handle.querySelector('ul'),
        items = [],     // document.createDocumentFragment(),  //[];
        currentSection,
        ticking,
        offset = options.offset,
        isScrolling = false;

    if (sections.length <= options.min) {
        $(handle.parentNode).addClass('u-hidden');
        return;
    }

    generateMenu();         // TODO make into an option? ie whether to generate menu automatically or not?
    checkSectionPosition();

    Sprout.Components.stickyElement(handle, options.bounded);
    window.addEventListener('scroll', updateSelected);


    /**
     * Generate the menu's HTML structure. We do this in Javascript because, if no Javascript we
     * don't want to see this menu at all.
     * @return {void}
     */

    /** ADOBE DTM for NAV Links Jump */
    function generateMenu() {
        var hideTabletSections = 0;
        Array.prototype.forEach.call(sections, function(section, i) {
            var title = section.getAttribute('data-nav'),
               // I can get the attribute for DTM here
                icon = section.getAttribute('data-icon'),
                id = section.id || '',
                item = document.createElement('li'),
                link = document.createElement('a');

            if (!title) {
                return;
            }

            link.href = '#'+id;
           // link.id = 'Test DTM 1 ID';
            link.className =  'Nav-'+id; // ADDED FOR DTM TRACKING (Will allow targeting of class for event100 eVar100) - Ari Oshinsky
            link.innerHTML = (icon) ? '<i class="icon icon-' + icon + '"></i>' : '';
            link.innerHTML += title;
            item.appendChild(link);

            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                items.forEach(function(item) {
                    $(item).removeClass('active');
                });


                $(this).addClass('active');
                isScrolling = true;

                Sprout.Utils.scrollPage(section, offset, function() {
                    isScrolling = false;
                    currentSection = i;
                });
            });

            items.push(item);

            if ($(section).hasClass('hide-tablet')) {
                hideTabletSections++;
            }
        });

        if (hideTabletSections && (sections.length - hideTabletSections) <= options.min) {
            $(handle.parentNode).addClass('hide-tablet');
        }

        // nav.appendChild(items);          // if items is a fragment
        items.forEach(function(item) {
            nav.appendChild(item);
        });
    }

    /**
     * Check each section's getBoundingClientRect to identify current viewing section
     * @return {void}
     */
    function checkSectionPosition() {
        var i;

        // Find i. Start at end and work back
        for (i = sections.length; i--;) {
            if (~~sections[i].getBoundingClientRect().top <= (offset+1)) {      // ~~ is Math.floor
                break;
            }
        }

        if (i < 0) {
            if (currentSection >= 0) {
                $(items[currentSection]).removeClass('active');
            }
            currentSection = i;
        }
        else if (i !== currentSection) {
            if (currentSection >= 0) {
                $(items[currentSection]).removeClass('active');
            }
            $(items[i]).addClass('active');
            currentSection = i;
        }

        ticking = false;
    }

    /**
     * Window scroll update the selected nav
     * @return {void}
     */
    function updateSelected() {
        if (!ticking && !isScrolling) {
            ticking = true;
            window.requestAnimationFrame(checkSectionPosition);
        }
    }
};

/**
 * Minimalistic tab panel with easy to use hooks
 * @param  {HTMLElement} handle         The DOM element to contain the tab panel
 * @return {void}
 */
Sprout.Components.tabPanel = function(handle, options) {
    var tabs = handle.querySelectorAll('[role=tab]'),
        panels = handle.querySelectorAll('[role=panel]');

    var activePanel, activeTab;
    var self = this;

    handle.tabPanel = this;

    Sprout.tabChange = document.createEvent('Event');
    Sprout.tabChange.initEvent('tabchange', true, true);

    function changeTab(newTab, preventEvent){
        if (activeTab) {
            $(activeTab).removeClass('selected').attr('aria-selected', false);
        }
        if (activePanel) {
            $(activePanel).removeClass('selected').attr('aria-hidden', true);
        }

        $(newTab).addClass('selected').attr('aria-selected', true);
        $(newTab.panelElement).addClass('selected').attr('aria-hidden', false);

        activeTab = newTab;
        activePanel = newTab.panelElement;

        if (!preventEvent) {
            handle.dispatchEvent(Sprout.tabChange);
        }
    }

    this.setActive = function(targetData) {
        var target = handle.querySelector('.tab[aria-controls="'+targetData+'"]');
        if (target !== activeTab) {
            changeTab(target, true);
        }
    };

    _.each(tabs, function(tab){
        tab.panelElement = _.find(panels, function(panel){
            return $(panel).attr('aria-labelledby') === $(tab).attr('aria-controls');
        });

        tab.addEventListener('click', function(){
            if (this !== activeTab){
                changeTab(this);
            }
        });
    });

    activeTab = _.find(tabs, function(tab){
        return $(tab).attr('aria-selected') === 'true';
    });

    if (activeTab) {
        activePanel = activeTab.panelElement;
    } else {
        activePanel = _.find(panels, function(panel){
            return ($(panel).attr('aria-hidden') !== 'true');
        });
    }

    this.getActive = function() {
        return {
            tab: activeTab,
            panel: activePanel
        };
    };
};

/**
 * Sprout Audio player
 * @param  {HTMLElement} handle the video wrapper
 * @return {void}
 */
Sprout.Components.audio = function(handle, audio) {

    var sound = audio || handle.querySelector('audio');
    // var soundEvent = document.createEvent('Event');
    // soundEvent.initEvent('audioPlaying', true, true);

    Sprout.Components.audio._current = null;         // let's keep a reference to it in the case of multiple sounds

    handle.addEventListener('click', function() {
        // handle.dispatchEvent(soundEvent);

        if (Sprout.Components.audio._current) {
            Sprout.Components.audio._current.pause();
            Sprout.Components.audio._current.currentTime = 0;
        }

        sound.play();
        $(document.body).addClass('is-playing');
        Sprout.Components.audio._current = sound;
    });

    if (sound) {
        sound.addEventListener('ended', function(){
            $(document.body).removeClass('is-playing');
            Sprout.Components.audio._current = null;
        });
    }
};

/*
 * [showTime description]
 * @param  {[type]} handle [description]
 * @return {[type]}        [description]
 */
Sprout.Components.showTime = function(handle) {

    var options = Sprout.Utils.getDataOptions(handle);
    var show = handle.getAttribute('data-show');
    var nextAirtimeElement = handle.querySelector('.time');
    $(handle).addClass('u-hidden');

    fetchSchedule();

    function checkOnAir() {
        Sprout.Services.getCurrentShowOnTV(function(event, data) {
            if (data && data.status === 200 && data.show.length && data.show[0].nid === options.showId) {
                updateDisplay(data);
            } else {
                fetchSchedule();
            }
        });
    }

    function fetchSchedule() {
        Sprout.Services.getNextShowAirTime(show, function(event, data) {
            var currentDate;
            if (data) {
                if (data.status === 200) {
                    updateDisplay(data);
                    Sprout.Utils.setScheduleTimer(
                        fetchSchedule,
                        parseInt(data.current_time),
                        data.schedule.start_seconds,
                        data.schedule.end_seconds
                    );
                    return;
                }
                currentDate = data.current_date;
            }

            Sprout.Utils.showDefaultAirTime(handle, currentDate);
        });
    }

    function updateDisplay(data) {
        if (data && data.schedule) {

            var nextDateStart = new Date(data.schedule.start_date.replace(/-/g, '/'));

            if (data.onair) {
                $(handle).addClass('on-air');
                nextAirtimeElement.innerHTML = 'Now';
            } else {
                $(handle).removeClass('on-air');
                nextAirtimeElement.innerHTML = Sprout.Utils.formatDateTime(nextDateStart);
            }

            $(handle).removeClass('u-hidden');
        }
    }
};

/**
 * Expand/contract, first parent will have contracted class
 * @param  {HTMLElement} handle         The DOM element to contain the expand contract
 * @return {void}
 */
// Sprout.Components.expander = function(handle, options) {
//     var parent = handle.parentElement;
//     var controlledBox = parent.querySelector('.controlled-box');
//     handle.addEventListener('click', function(e){
//         $(parent).removeClass('active');
//         $(controlledBox).removeClass('contracted');
//         Sprout.Utils.scrollPage(parent);
//     });

//     parent.addEventListener('filterchange', function(event){
//         $(parent).addClass('active');
//         $(controlledBox).addClass('contracted');

//         var activeFilter = event.target.filter.getActive();

//         Sprout.Utils.scrollElement(controlledBox, activeFilter, controlledBox.getBoundingClientRect().top);
//     });
// };

/**
 * Display blocker and prevents click events
 * @param  {HTMLElement} handle         The blocker DOM element
 * @return {void}
 */
Sprout.Components.blocker = function(handle, options) {
    handle.addEventListener('click', function(event){
        event.stopPropagation();
        event.preventDefault();
    });
};



/**
 * Filter tiles in a curated list
 * @param  {HTMLElement} handle  parent element
 * @return {void}
 */
Sprout.Components.filterList = function(handle) {
    var items = handle.querySelectorAll('.results-list li'),
        filters = handle.querySelectorAll('[data-filter]'),
        current = filters[0];   // _.find(filters, function(filter) { return filter.getAttribute('aria-selected') === 'true'; });

    _.each(filters, function(filter) {
        filter.addEventListener('click', function() {
            var term = filter.getAttribute('data-filter'),
                noResults;

            current.setAttribute('aria-selected', 'false');
            current.className = '';

            handle.className = 'show-'+term;                        // this removes all classes and sets as show-*

            filter.setAttribute('aria-selected', 'true');
            filter.className = 'selected';
            current = filter;

            noResults = _.every(items, function(el) {
                return (el.offsetParent === null);
            });
            if (noResults) { $(handle).addClass('no-results'); }    // no-results is removed by default, above

        });
    });
 };

/**
 * Calculate age based on dob
 * @param  {HTMLElement} handle         The DOM element to show the age
 * @return {void}
 */
Sprout.Components.age = function(handle, options) {
    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }

    var dateOfBirth = new Date(options.dob);

    handle.innerHTML = Sprout.Utils.getAge(dateOfBirth);
};


/**
 * Toggle target element class
 * @param  {HTMLElement} handle         CTA element that initiates the toggle of the target class
 * @param  {object} options             Options for the component. Target must be an element id
 * @return {void}
 */
Sprout.Components.toggler = function(handle, options) {
    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }

    //Target must be an ID
    if (options.target && options.class) {
        var targetElements = document.getElementById(options.target);
        if (targetElements) {
            targetElements = [targetElements];
        } else {
            targetElements = document.querySelectorAll(options.target);
        }

        handle.addEventListener('click', function(event) {
            event.preventDefault();

            _.each(targetElements, function(element) {
                if (options.on) {
                    $(element).addClass(options.class);
                } else if (options.off) {
                    $(element).removeClass(options.class);
                } else {
                    $(element).toggleClass(options.class);
                }
            });
        });
    }
};

// Can this be combined w/ above?
/**
 * Show / Hide a section be click
 * @param  {[type]} handle [description]
 * @return {[type]}        [description]
 */
Sprout.Components.accordion = function(handle) {
    var trigger = handle.querySelector('.js-trigger');

    if (!trigger) {
        trigger = handle.querySelector('.trigger');
    }

    if (trigger) {
        trigger.addEventListener('click', function() {
            $(handle).toggleClass('active');
        });
    }
};

/**
 * Control component for combobox element class
 * @param  {HTMLElement} handle         Wrapper for the combo box.
 * @return {void}
 */
Sprout.Components.combobox = function(handle, options) {
    if ($(handle).hasClass('js-initialized')) {
        return;
    }
    $(handle).addClass('js-initialized');

    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }

    var searchText = '';
    var self = this;
    var placeholderElement = handle.querySelector('.placeholder');
    var changeEvent = document.createEvent('Event');
    var comboWrap = handle.querySelector('.wrap');
    changeEvent.initEvent('change', true, true);

    function deselectIgnoredItems() {
        var selectedItem = handle.querySelector('li.selected');
        if (selectedItem && $(selectedItem).hasClass('js-combobox-ignore')) {
            self.selectItem(handle.querySelector('li:not(.js-combobox-ignore)'));
        }
    }

    handle.addEventListener('blur', function(){
        $(handle).removeClass('open');
        $(handle).addClass('closed');
        options.state = 'closed';
        handle.removeEventListener('keydown', self.controlCombobox.bind(self));
        searchText = '';

        deselectIgnoredItems();
    });

    handle.addEventListener('focus', function(e){
        handle.addEventListener('keydown', self.controlCombobox.bind(self));
    });

    function closeCombobox() {
        _.each(document.querySelectorAll('.combobox.open'), function(item){
            $(item).removeClass('open');
            $(item).addClass('closed');
        });
        options.state = 'closed';
        handle.removeEventListener('keydown', self.controlCombobox.bind(self));
    }

    function open(e){
        handle.addEventListener('keydown', self.controlCombobox.bind(self));

        if (options.state === 'closed'){
            document.addEventListener('click', closeCombobox);

            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }

            _.each(document.querySelectorAll('.combobox.open'), function(item){
                $(item).removeClass('open');
                $(item).addClass('closed');
            });

            $(handle).removeClass('closed');
            $(handle).addClass('open');
            options.state = 'open';
        } else if (options.state === 'open' && e){
            document.removeEventListener('click', closeCombobox);
            var itemTarget = ($(e.target).hasClass('.combobox-item'))?e.target:Sprout.Utils.getParentMatch(e.target, '.combobox-item');
            if (itemTarget){
                e.stopPropagation();
                e.preventDefault();
            }
            handle.combobox.selectItem(itemTarget);
        } else {
            // Something went wrong
            document.removeEventListener('click', closeCombobox);
            return false;
        }
    }

    handle.addEventListener('click', open);

    this.controlCombobox = function(event) {
        var preventDefault = false;
        var delta = 0;
        var selectedIndex = -1;
        var items = handle.querySelectorAll('.combobox-item');
        var selectedItem;
        var tempSearchText;
        switch(event.keyCode) {
            case 8:
                if (searchText.length > 0) {
                    searchText = searchText.substr(0, searchText.length - 1);
                }
                preventDefault = true;
                break;
            case 27:
                searchText = '';
                break;
            case 38:
                delta = -1;
                break;
            case 40:
                delta = 1;
                break;
            case 13:
                // Simulate selected item click on enter key
                selectedItem = handle.querySelector('.combobox-item.selected');
                if (selectedItem) {
                    selectedItem.click();
                }
                return;
        }

        if (delta !== 0) {
            // Select item depending on arrow interaction
            selectedIndex = _.findIndex(items, function(item, index) {
                if ($(item).hasClass('selected')) {
                    return true;
                }

                return false;
            });

            selectedIndex += delta;
            if (selectedIndex > 0) {
                if (selectedIndex < items.length) {
                    selectedItem = items[selectedIndex];
                } else {
                    selectedItem = items[items.length - 1];
                }
            } else {
                selectedItem = items[0];
            }
        } else {
            // Select item with first content character similar to the pressed key
            if ((event.keyCode === 8 || event.keyCode === 27) ||
                (event.keyCode >= 48 && event.keyCode <= 57) ||
                (event.keyCode >= 65 && event.keyCode <= 90) ||
                (event.keyCode >= 96 && event.keyCode <= 105)) {

                tempSearchText = searchText;

                if (!(event.keyCode === 8 || event.keyCode === 27)) {
                    tempSearchText += event.key;
                }

                if (tempSearchText.length > 0) {
                    var firstCharacterRegExp = new RegExp('^(<.*>)*' + tempSearchText, 'i');
                    var itemsWithStartingLetter = _.filter(items, function(item, index) {
                        var stringCode = item.innerHTML.trim();
                        return stringCode.match(firstCharacterRegExp);
                    });

                    if (itemsWithStartingLetter.length > 0) {
                        selectedItem = itemsWithStartingLetter[0];
                        searchText = tempSearchText;
                    }
                } else {
                    selectedItem = items[0];
                }
            }
        }

        if (selectedItem) {
            selectedItem.focus();
            this.selectItem(selectedItem);
            Sprout.Utils.scrollElement(comboWrap, selectedItem);

            preventDefault = true;
        }

        if (preventDefault) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    };

    this.selectItem = function(itemTarget, stopPropagation) {
        if (itemTarget) {
            $(handle.querySelector('li.selected')).removeClass('selected');
            $(itemTarget).addClass('selected');
        }
        if (placeholderElement && !stopPropagation){
            var value = itemTarget.getAttribute('data-value');
            // changeEvent.value = value;
            placeholderElement.value = value;
            placeholderElement.dispatchEvent(changeEvent);
        }
        if ($(itemTarget).hasClass('js-combobox-ignore')) {
            deselectIgnoredItems();
        }

        $(handle).removeClass('open');
        $(handle).addClass('closed');
        options.state = 'closed';
    };

    function preselect() {
        var items = handle.querySelectorAll('.combobox-item');

        _.find(items, function(item) {
            if (placeholderElement.value === Sprout.Utils.getDataValue(item, 'value')) {
                self.selectItem(item);
                return true;
            }
            return false;
        });
    }

    if (placeholderElement && placeholderElement.value !== '') {
        preselect();
    }

    handle.combobox = this;
};


/**
 * Modal component
 * @param  {HTMLElement} handle         Modal element
 * @param  {object} options             Options for the component.
 * @return {void}
 */
Sprout.Components.modal = function(handle, options) {
    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }

    var close = handle.querySelector('.js-modal-close');

    var scrollInitialPos = 0;

    this.show = function() {
        var openedModals = document.querySelectorAll('.modal.active');
        if (openedModals.length === 0) {
            scrollInitialPos = window.pageYOffset;
        }
        $(handle).removeClass('transition-out');
        $(handle).addClass('active');
        $(document.body).addClass('show-modal');
    };

    function hideModal() {
        $(handle).removeClass('transition-out');
        $(handle).removeClass('active');
        var openedModals = document.querySelectorAll('.modal.active');
        if (openedModals.length === 0) {
            $(document.body).removeClass('show-modal');
            window.scrollTo(0, scrollInitialPos);
        }
    }

    this.hide = function(event) {
        if (event){
            event.stopPropagation();
            event.preventDefault();
        }

        if ($(handle).hasClass('modal-transition')) {
            $(handle).addClass('transition-out');
            setTimeout(hideModal, 500);
        } else {
            hideModal();
        }
    };

    //Closing the interstitial event
    if (close){
        close.addEventListener('click', this.hide);
    }

    handle.modal = this;
};


/**
 * Drag and Drop component definition
 * @param  {HTMLElement}    element         Dom element to receive Drag and Drop interaction
 * @param  {array}          formats         List of accepted file formats
 * @param  {boolean}        preview         activate/disable file preview
 * @param  {int}            sizeLimit       Accepted file size limit
 * @return {void}
 */
Sprout.Components.dragAndDrop = function(element, formats, preview, sizeLimit, callback) {
    var fileInput = element.querySelector('input');
    var dropZone = element.querySelector('.drop-zone');
    var display = element.querySelector('.display');
    var fileName = element.querySelectorAll('.file-name');

    if (dropZone && Sprout.Utils.isFileReaderSupported) {
        dropZone.addEventListener('drop', dropFile, false);
        dropZone.addEventListener('dragover', cancel, false);
        dropZone.addEventListener('dragenter', cancel, false);
        dropZone.addEventListener('dragexit', cancel, false);
    }

    preview = preview && Sprout.Utils.isFileReaderSupported;

    fileInput.addEventListener('change', dropFile, false);

    var removeButton = element.querySelector('.remove-input');
    if (removeButton) {
        removeButton.addEventListener('click', remove);
    }

    var tryagainButton = element.querySelector('.try-again');
    if (tryagainButton) {
        tryagainButton.addEventListener('click', clear);
    }

    function cancel(e) {
        e.preventDefault();
    }

    function dropFile(e) {
        e.stopPropagation();
        e.preventDefault();

        var file, fileName, files; // File list

        clear();

        if (!Sprout.Utils.isFileReaderSupported) {
            if (e.target.value && e.target.value !== '') {
                file = {
                    size: 0,
                    name: e.target.value
                };
            }
        } else {
            files = e.target.files || e.dataTransfer.files; // File list

            if (files.length) {
                file = files[0];
            }
        }

        if (file) {
            fileName = file.name;
            var fileExt = fileName.toLowerCase().split('.');
            fileExt = fileExt[fileExt.length - 1];
            //files[0].type
            if (formats.indexOf(fileExt) === -1) {
                remove();
                $(element).addClass('alert-type');
            } else if (parseInt(sizeLimit,10) < file.size/1000000){
                remove();
                $(element).addClass('alert-size');
            } else {
                save(file);
            }
        }
    }

    function showFileName(file) {
        if (fileName) {
            _.each(fileName, function(item){
                item.innerHTML = file;
            });
        }
    }

    function save(file) {
        $(element).addClass('selected');
        $(element).removeClass('uploaded');

        if (preview) {
            Sprout.Utils.previewImageFile(file, display);
        }

        showFileName(file.name);

        if (callback) { callback(file); }
    }

    function remove() {
        clear();

        if (preview) {
            display.src = '';
        }

        fileInput.value = fileInput.defaultValue;

        showFileName('');

        if (callback) { callback(null); }
    }

    function clear() {
        $(element).removeClass('selected');
        $(element).removeClass('uploaded');
        $(element).removeClass('alert-size');
        $(element).removeClass('alert-type');
        $(element).removeClass('alert-server');
    }

    this.setFile = function(file) {
        if (file) {
            $(element).addClass('selected');
            $(element).addClass('uploaded');
            $(element).removeClass('alert-size');
            $(element).removeClass('alert-type');
            $(element).removeClass('alert-server');
            display.src = file.uri;
            showFileName(file.filename);
        } else {
            remove();
        }
    };
};


Sprout.Components.gamesLayout = function(element) {
    var tiles = element.querySelectorAll('.tile');
    var tilesCount = tiles.length;

    tiles = _.filter(tiles, function(tile) {
        var style = window.getComputedStyle(tile);
        return (style.getPropertyValue('display') !== 'none');
    });

    if (tiles.length > 0 && tiles.length !== 2) {
        $(tiles[0]).addClass('tile-large');
    }

    if (tiles.length !== tilesCount) {
        $(element).removeClass('total-' + tilesCount);
        $(element).addClass('total-' + tiles.length);
    }
};

/**
 * Component to handle content filtering from a non-dynamic list
 * @return {void}
 */
Sprout.Components.byTypeToggler = function(handle, options) {

    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }
    var allTiles;
    if (Sprout.Utils.isMobile){
        allTiles = handle.querySelectorAll('.filterable-tile:not(.tile-game)');
    } else if (Sprout.Utils.isTablet){
        allTiles = handle.querySelectorAll('.filterable-tile:not(.tile-game)', '.filterable-tile.html-5');
    } else {
        allTiles = handle.querySelectorAll('.filterable-tile');
    }
    var togglers = handle.querySelectorAll('.type-filter');
    var maxTiles = options.maxItems || 0;
    var showMore = handle.querySelector('.show-more');
    var self = this;
    var firstType = handle.querySelector('.type-filter.selected').getAttribute('data-toggle-by-type');


    self.togglerStatus = {
        'current': handle.querySelector('.type-filter.selected'),
        'currentType': (options.defaultAll)?'all':firstType,
        'nextGroup': []
    };

    _.each(togglers, function(el,i){
        el.addEventListener('click', setToggle, false);
    });

    handle.addEventListener('onSlide', setToggle);

    toggleType(self.togglerStatus.currentType);

    showMore.querySelector('.cta-show-more').addEventListener('click', toggleNextGroup, false);


    /**
     * When a change of filter is triggered this function will update the status of the component and add/remove relvant classes
     * @returns {void}
     */
    function setToggle(e){
        var type = e.target.getAttribute('data-toggle-by-type');

        if (type === self.togglerStatus.currentType){
            return;
        }

        toggleType(type);
    }

    /**
     * Toggle what should be shown according to a specific class
     * @param {type} type Filter class on the tiles to be shown or not
     */
    function toggleType(type){
        var newGroup;
        var filter = handle.querySelector('[data-toggle-by-type="' + type + '"]');
        if (type === 'all'){                                // We add different behavior to 'all' filter
            newGroup = allTiles;
            _.each(allTiles, function(el, i){
                $(el).removeClass('hidden');
            });
        } else {
            newGroup = _.filter(allTiles, function(tile){
                if ($(tile).hasClass(type)){
                    $(tile).removeClass('hidden');
                    return true;
                } else {
                    $(tile).addClass('hidden');
                }
            });
        }
        if (newGroup.length > maxTiles && maxTiles !== 0){
            setMaxTileView(newGroup);
        } else {
            $(showMore).removeClass('active');
        }

        $(self.togglerStatus.current).removeClass('selected');
        $(filter).addClass('selected');
        self.togglerStatus.current = filter;
        self.togglerStatus.currentType = type;
    }

    /**
     * If a max number of tiles per page is set this function will toggle the show more button and hide elements
     * @param {Array} tiles Array of DOM elements to be shown
     */
    function setMaxTileView(tiles){
        self.togglerStatus.nextGroup = [];
        $(showMore).addClass('active');
        for (var it = maxTiles; it < tiles.length; it++){
            $(tiles[it]).addClass('hidden');
            self.togglerStatus.nextGroup.push(tiles[it]);
        }
    }

    /**
     * Handle trigger for show more button
     */
    function toggleNextGroup() {
        _.each(self.togglerStatus.nextGroup, function(el, i){
            $(el).removeClass('hidden');
        });
        $(showMore).removeClass('active');
    }
};

/**
 * Component to handle back to top footer animation
 * @return {void}
 */
Sprout.Components.backToTop = function (handle, options) {
    handle.addEventListener('click', function(e) {
        e.preventDefault();
        //do not delay on mobile and IE9
        var animationInterval = (($(document.querySelector('html')).hasClass('ie') || $(document.body).hasClass('mobile')) ? 0 : 1000);
        var footer = document.querySelector('footer');
        $(footer).addClass('is-animating');
        $(handle).addClass('animation-before-scroll');
        _.delay(function(){
            var to = document.getElementById(handle.getAttribute('href').substring(1));
            $(handle).removeClass('animation-before-scroll').addClass('is-animating');
            $(handle).addClass('is-scrolling');
            Sprout.Utils.scrollPage(to, 0, function() {
                $(handle).removeClass('is-scrolling').addClass('animation-after-scroll');
                _.delay(function() {
                    $(handle).removeClass('is-animating').removeClass('animation-after-scroll');
                    $(footer).removeClass('is-animating');
                }, animationInterval);
            });
        }, animationInterval);
    });
};


/**
 * Component to handle basic keyboard interactions on simple objects
 * @return {void}
 */
Sprout.Components.keyboardInteraction = function(handle, options) {
    handle.addEventListener('keydown', function(event) {
        switch(event.keyCode) {
            case 32:
            case 13:
                handle.click();
                break;
        }
    });
};

/**
 * Component to handle share by email button using Gigya socialize API
 * @return {void}
 */
Sprout.Components.shareByEmail = function(handle, options) {

    if(gigya) {

        if (!options) {
            options = Sprout.Utils.getDataOptions(handle);
        }

        var base_url = window.location.protocol + '//' + window.location.host;
        var url = base_url + options.url;
        var img = base_url + document.querySelector('header .logo img').getAttribute('src');

        var act = new gigya.socialize.UserAction();
        act.setUserMessage("This is the user message");
        act.setTitle('Sprout: ' + Sprout.Utils.htmlDecode(options.title) );
        act.setLinkBack(url);
        act.setDescription(options.description);
        act.addActionLink("");
        act.addMediaItem({ type: 'image', src: img, href: url });

        var showShareBarUI_params={
            containerID: 'sprout-email-share',
            shareButtons: 'Email',
            showCounts: 'none',
            userAction: act,
            iconsOnly:true
        };

        gigya.socialize.showShareBarUI(showShareBarUI_params);

        //Emulate Gigya socialize events
        document.getElementById('sprout-email-share-button').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('sprout-email-share-reaction0').click();
        });
    }
};

/**
 * Component to handle animation to ensure image is fully render before animate it.
 * @param handle
 * @param options
 * @return {void}
 */
Sprout.Components.animation = function(handle, options) {
    var img = handle.querySelector('img');

    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }

    if(img) {
        img.addEventListener('load', function(e) {
            setTimeout(function() {
                $(handle).addClass('loaded');
                Sprout.Utils.triggerAnimation(handle, 0);
            }, 200);
        });

        img.src = options.image; //This is required by mobile safari. The event MUST be defined before image is loaded.
    }
};

/**
 * Component to handle the autocomplete functionality.
 * @param handle
 * @param options
 * @return {void}
 */
Sprout.Components.autocomplete = function(handle, options) {

    var toggleCssClass = 'show-suggestions',
        suggestionsList = null;

    var selectOptionEvent = document.createEvent('Event');
    selectOptionEvent.initEvent('select', true, true);

    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }

    // add options default values
    options = _.extend({
        'url': null, //endpoint of the service from where the available suggestions will be get.
        'data': null, //parameters required by the service.
        'limit': 10, //max. number of filtered suggestions.
        'minLength' : 0, //min. number of characters required to trigger autocomplete component.
        'selector': '.autocomplete-suggestions' //CSS selector of the ul element.
    }, options);

    var suggestionsWrapper = handle.parentNode.querySelector(options.selector);

    //bind key up event
    handle.addEventListener('keyup', function(e) {
        switch(e.keyCode) {
            case 27: //escape key.
                hideSuggestions();
                break;
            default:
                if(suggestionsWrapper && handle.value.length > 0) {
                    showSuggestions();
                } else {
                    hideSuggestions();
                }
        }
    });

    handle.setData = function(data) {
        options.list = data;
    };

    /**
     * Get the complete list of available suggestions then show/hide suggestions list.
     * @return {void}
     */
    function showSuggestions() {

        //Make sure to have the full list of suggestions.
        getSuggestionsList(function(event, suggestionsListFromServices) {

            suggestionsList = suggestionsListFromServices;

            if(suggestionsList && suggestionsList.results) {
                drawSuggestionsByKeyword();
            } else {
                hideSuggestions();
            }
        }, options.data);
    }

    /**
     * Build the list of suggestions and actually displayed it.
     * @return {void}
     */
    function drawSuggestionsByKeyword() {

        //Empty suggestions list
        suggestionsWrapper.innerHTML = '';

        var suggestions = getSuggestionsByKeyword();

        if(suggestions.length > 0) {

            _.each(suggestions, function(suggestion) {
                var li = document.createElement('li');
                li.innerHTML = suggestion;
                li.addEventListener('click', function() {
                    selectSuggestion(suggestion);
                });
                suggestionsWrapper.appendChild(li);
            });

            //Show suggestions list
            $(suggestionsWrapper).addClass(toggleCssClass);

        } else {
            hideSuggestions();
        }
    }

    /**
     * Hide the list of suggestions.
     * @return {void}
     */
    function hideSuggestions() {
        $(suggestionsWrapper).removeClass(toggleCssClass);
    }

    /**
     * Handle click on an item of the suggestions list.
     * @param suggestion
     * @return {void}
     */
    function selectSuggestion(suggestion) {
        handle.value = suggestion;
        hideSuggestions();
        handle.dispatchEvent(selectOptionEvent);
    }

    /**
     * Get the complete list of available suggestions.
     * @param callback
     * @param data
     * @return {void}
     */
    function getSuggestionsList(callback, data) {

        //Get the complete list of suggestion from a service or the options object.
        if(!suggestionsList) {
            if(options.url) {
                Sprout.Services.generateRequest(options.url, data, 'GET', 'json', callback);
            } else if(options.list) {
                suggestionsList = {"results": options.list};
                callback(null, suggestionsList);
            }
        }

        //Return the complete list of suggestions from the suggestionsList property.
        callback(null, suggestionsList);
    }

    /**
     * Filters the list of suggestions based on the keyword typed on the input field (handle).
     * @returns {Array} The filtered suggestions
     * @return {void}
     */
    function getSuggestionsByKeyword() {
        var keyword = handle.value;
        var filteredList = [];

        if(keyword.length > 0) {
            filteredList = _.take(_.filter(suggestionsList.results, function(name) {
                return name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            }), options.limit);
        }

        return filteredList;
    }

};

/**
 * Component load default fallback image
 * @param handle
 * @return {void}
 */
Sprout.Components.defaultImage = function(handle) {
    var defaultImage = Sprout.Utils.getDataValue(handle, 'default');

    function loadDefault() {
        handle.removeEventListener('error', loadDefault);
        handle.src = defaultImage;
    }

    if (defaultImage) {
        handle.addEventListener('error', loadDefault);
    }
};

/**
 * Components to display the current show on tv.
 * @param handle {DOMElement}
 * @return {void}
 */
Sprout.Components.currentShowOnTV = function(handle) {
    var currentlyPlayingElement = ($(handle.parentNode).hasClass('currently-playing')) ? handle.parentNode : handle;
    var avatarElement;
    var currentElement = currentlyPlayingElement.querySelector('a');

    $(currentlyPlayingElement).addClass('loading');

    Sprout.Services.getCurrentShowOnTV(function(event, data) {
        if (data) {
            currentElement.querySelector('p').innerHTML = data.tv_show;

            avatarElement = currentlyPlayingElement.querySelector('img');

            if (data.show && data.show.length > 0) {
                $(currentlyPlayingElement).removeClass('no-image');
                currentElement.href = '/' + data.show[0].url;
                avatarElement.src = data.show[0].avatar_img;
            } else {
                $(currentlyPlayingElement).addClass('no-image');
                currentElement.href = '/tv-schedule';
            }

            if (data.schedule) {
                Sprout.Utils.setScheduleTimer(
                    Sprout.Components.currentShowOnTV.bind(Sprout.Components, handle),
                    parseInt(data.current_time),
                    data.schedule.start_seconds,
                    data.schedule.end_seconds);
            }
        }

        $(currentlyPlayingElement).removeClass('loading');
    });
};

/**
 * Component to detect click on AD banner
 * @param handle
 */
Sprout.Components.adIframe = function (handle) {
    function displayAd(){
        var idAd = handle.id;
        if (googletag.pubads) {
            googletag.pubads().addEventListener('slotRenderEnded', function() {
              setTimeout(checkAdsLabel, 500);
            });
        } else {
           setTimeout(checkAdsLabel, 2000);
        }
        googletag.cmd.push(function() {
            googletag.display(idAd);
        });
    }
    setTimeout(displayAd, 100);

    function checkAdsLabel() {
        var iframe = handle.querySelector('div > iframe');

        if (!iframe) {
            $(handle).addClass('no-ads');
            return false;
        }

        try {
            var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            var innerBody = innerDoc.querySelector('body');

            if (typeof innerDoc !== 'object' || innerBody === null || innerBody.children.length === 0) {
                if (innerBody) {
                    $(handle).addClass('no-ads');
                }
                return false;
            }

            var divCollection = innerDoc.querySelectorAll('div');

            if (divCollection.length > 0) {
                var elementWithLabelParameter = getElementWithParameter(divCollection, 'data-show-label');

                //Show advertisement label
                if (elementWithLabelParameter) {
                    var showLabel = elementWithLabelParameter.getAttribute('data-show-label');
                    if (showLabel === 'true') {
                        $(handle).addClass('has-label');
                    }
                }
            }
        } catch(er) {

        }
    }

    /**
     * Look for the first DOM element which has the given attribute.
     *
     * @param elementCollection array of DOM Elements to look into
     * @param parameter name of the attribute to look for
     * @returns {*} the DOM element which has the given attribute or FALSE if attribute is not found
     */
    function getElementWithParameter(elementCollection, parameter) {
        var parameterValue;
        return _.find(elementCollection, function (element) {
            parameterValue = element.getAttribute(parameter);
            if (parameterValue) {
                return true;
            }
        });

    }
};

/**
 * Create a module for sharing to Facebook, Twitter and Pinterest
 * @param  {HTMLElement} element DOM node on which to create share module on
 * @return {void}
 */
Sprout.Components.shareSocial = function(handle, options) {
    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }
}

/**
 - * Implemented for Chrome 55+ flash fix
 - * Checks if user on Chrome 55+, then verifies if 'no-flash' class exists (added from hasFlash util)
 - * Then verifies if swf (game) or swf-video (full episode or live player) video is needing the flash overlay
 - * If needed, its appended to the game/video.
 - * @param  handle
 - */
 Sprout.Components.flashCheck = function(handle, options) {

      if (!options) {
          options = Sprout.Utils.getDataOptions(handle);
      }

     // Check if we are on Chrome 55 +
     if (Sprout.Utils.isMinChrome55()) {
             // Check if Flash is NOT available
             if (document.getElementsByClassName('no-flash').length >= 1) {
                 if (options.content === 'swf') {

                     var gameFrame = document.getElementsByClassName('app-detail-wrap');
                     if (gameFrame) {
                         document.querySelector('.app-detail-wrap .iframe').style = "display: none";

                         var flashErrorLink = document.createElement('a');
                         flashErrorLink.classList = "flash-error js-ignore-external-link";
                         flashErrorLink.href = "http://get.adobe.com/flashplayer";
                         flashErrorLink.target = "_blank";

                         gameFrame[0].appendChild(flashErrorLink);

                     }

                 } else if (options.content === 'swf-video') {

                     var videoFrame = document.querySelector('.video-wrapper');
                     if (videoFrame) {
                         document.querySelector('.video-info-overlay').style = "display: none";
                         document.querySelector('.video-wrapper #player').style = "display: none";

                        var flashErrorLink = document.createElement('a');
                         flashErrorLink.classList = "flash-error js-ignore-external-link";
                         flashErrorLink.href = "http://get.adobe.com/flashplayer";
                         flashErrorLink.target = "_blank";

                         videoFrame.appendChild(flashErrorLink);
                     }

                 }

             }
         }
     };
/**
 * Services
 *
 * @return {object}
 */
Sprout.Services = (function() {

    // Return objet
    return {
        /**
         * Generate XHR request
         *
         * @param  {string} url             Endpoint url
         * @param  {object} data            Params object for request
         * @param  {string} type            Request type
         * @param  {string} dataType        Expected response data type
         * @param  {function} callback      Callback to run on ajax complete
         * @return {object}                 XHR object
         */
        generateRequest: function(url, data, type, dataType, callback, settings) {
            var error = null,
                response = null;

            if (type === 'GET') {
                if (!data) {
                    data = {};
                }
                data.t = Sprout.timestamp;
            }

            if (data) {
                if (type === 'GET') {
                    url += (url.indexOf('?') >= 0)?'&':'?';
                    url += Sprout.Utils.serialize(data);
                    data = null;
                } else {
                    data = JSON.stringify(data);
                }
            }

            var defaultSettings = {
                url: url,
                data: data,
                type: type,              // type || 'GET'
                dataType: dataType,      // dataType || 'json'.  NOTE: psQuery doesn't use this
                success: function(res) {
                    response = res;
                },
                error: function(err) {
                    error = err;

                    if (typeof err === 'object' && err.hasOwnProperty('responseJSON')) {
                        error = err.responseJSON;
                    }
                },
                complete: function() {
                    if (typeof callback === 'function') {
                        callback(error, response);
                    }
                }
            };

            settings = _.extend(defaultSettings, settings);

            return $.ajax(settings);
        },

        /**
         * Get next air time for a show
         *
         * @param  {string} showName        Show name
         * @param  {function} callback      Callback to run on ajax complete
         * @return {object}                 XHR object
         */
        getNextShowAirTime: function(showName, callback) {
            var url = '/sprout/next_time';
            var params = {
                show: showName
            };
            return Sprout.Services.generateRequest(url, params, 'GET', 'json', callback);
        },

        /**
         * Get current show on TV
         *
         * @param  {string} showName        Show name
         * @param  {function} callback      Callback to run on ajax complete
         * @return {object}                 XHR object
         */
        getCurrentShowOnTV: function(callback) {
            var url = '/sprout/current_show';
            return Sprout.Services.generateRequest(url, null, 'GET', 'json', callback);
        },

        /**
         * Get all shows schedule
         *
         * @param  {function} callback      Callback to run on ajax complete
         * @return {object}                 XHR object
         */
        getShowsSchedule: function(callback) {
            var url = '/schedule/next_shows';
            return Sprout.Services.generateRequest(url, null, 'GET', 'json', callback);
        },

        /**
         * Get view from service
         *
         * @param  {string} page        Section name
         * @param  {string} view        Specific view name
         * @param  {object} params      Request params
         * @param  {function} callback  Callback to run on ajax complete
         * @return {object}             XHR object
         */
        getView: function(view, params, callback) {
            var url = '/services/' + view;

            params = _.extend({
                'response': 'embed'
            }, params);

            return Sprout.Services.generateRequest(url, params, 'GET', 'html', callback);
        },

        /**
         * Get session token
         * @param  {function} callback  Callback to run on ajax complete
         * @return {object}             XHR object
         */
        getSessionToken: function(callback) {
            var url = '/services/session/token';
            var session_token = Sprout.Utils.cookies.getItem('Drupal.visitor.service_token');
            if (session_token) {
                callback(null, session_token);
                return true;
            } else {
                return Sprout.Services.generateRequest(url, null, 'GET', 'text', function(event, session_token) {
                    var expireDate = new Date(Date.now() + (1 * 60 * 60 *1000));
                    Sprout.Utils.cookies.createCookie('Drupal.visitor.service_token', session_token, expireDate);
                    callback(event, session_token);
                });
            }
        },

        /**
         * [postSecure description]
         * @param  {[type]}   url           [description]
         * @param  {[type]}   data          [description]
         * @param  {Function} callback      [description]
         * @param  {[type]}   method        [description]
         * @return {[type]}                 [description]
         */
        postSecure: function(url, data, callback, method) {
            if (!method) {
                method = 'POST';
            }

            return this.getSessionToken(function(event, session_token) {
                var settings = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'X-CSRF-Token': session_token
                    }
                };
                Sprout.Services.generateRequest(url, data, method, 'application/json', callback, settings);
            });
        },

        /**
         * Get current user data
         * @param  {function}   callback        Callback to run on ajax complete
         * @return {object}                     XHR object
         */
        getUser: function(callback) {
            if (Sprout.user) {
                callback(null, Sprout.user);
            } else {
                this.postSecure('/s2s/system/connect.json', null, function(event, data) {
                    if (data && data.user && data.user.uid !== 0) {
                        Sprout.user = data.user;
                    } else {
                        Sprout.user = null;
                    }
                    callback(event, Sprout.user);
                });
            }
        },

        /**
         * Adds new sproutlet
         * @param  {object}     sproutlet_data  Formated sproutlet data
         * @param  {function}   callback        Callback to run on ajax complete
         * @return {object}                     XHR object
         */
        addSproutlet: function(sproutlet_data, callback) {
            return this.postSecure('/s2s/entity_field_collection_item.json', sproutlet_data, callback);
        },

        /**
         * Get sproutlets list
         * @param  {function}   callback        Callback to run on ajax complete
         */
        getSproutlets: function(callback) {
            var self = this;
            this.getUser(function(event, user) {
                if (user) {
                    var url = '/s2s/sproutlets/all/' + Sprout.user.uid + '.json';
                    self.generateRequest(url, null, 'GET', 'json', callback);
                } else {
                    callback({});
                }
            });
        },

        /**
         * Set Sproutlet data
         * @param  {object}     data            Sproutlet Data
         * @param  {function}   callback        Callback to run on ajax complete
         */
        setSproutlet: function(data, callback) {
            var self = this;
            var url = document.location.protocol + '//' + document.location.host;
            url += '/s2s/entity_field_collection_item/' + data.item_id + '.json';

            var proxyData = {
                'method':'PUT',
                'request':url,
                'data': data
            };
            self.postSecure('/s2s/proxyp', proxyData, callback, 'POST');
        },

        /**
         * [uploadFile description]
         * @param  {[type]}   file          [description]
         * @param  {Function} callback      [description]
         * @param  {[type]}   progress      [description]
         * @return {[type]}                 [description]
         */
        uploadFile: function(file, callback, progress) {
            this.getSessionToken(function(sessionEvent, session_token) {
                //video/mp4
                var formData = new FormData();
                var reader = new FileReader();
                reader.onprogress = progress;
                reader.onloadend = function(event) {
                    var error    = event.target.error;
                    if (error != null) {
                        callback();
                        return;
                    }
                    var data = reader.result;
                    data = data.replace("data:" + file.type+";base64,", "");

                    formData.append("filename", file.name);
                    var filename = Sprout.Utils.makeId() + "_" + file.name;
                    formData.append("filename", filename);
                    formData.append("file", data);
                    formData.append("target_uri", "webform/" + file.name);

                    var ajax = new XMLHttpRequest();
                    ajax.upload.addEventListener("progress", progress, false);
                    ajax.addEventListener('readystatechange', function () {
                        if (ajax.readyState === 4) {
                            var result, dataType;

                            if ((ajax.status >= 200 && ajax.status < 300) || ajax.status === 304) {
                                var mime = ajax.getResponseHeader('content-type');
                                result = ajax.responseText;

                                try {
                                    result = JSON.parse(result);

                                    callback(result, ajax);
                                    return;
                                } catch (e) {
                                }
                            }

                            if (callback) {
                                callback();
                            }
                            return;
                        }
                    }, false);

                    if (error) {
                        ajax.addEventListener("error", error, false);
                        ajax.addEventListener("abort", error, false);
                    }
                    ajax.open("POST", "/s2s/file.json");
                    ajax.setRequestHeader("X-CSRF-Token", session_token);
                    ajax.send(formData);
                };
                reader.readAsDataURL(file);
            });
        },

        /**
         * Webform submission
         * @param  {string}     sid             Webform id
         * @param  {object}     data            Webform data to send
         * @param  {function}   callback        Callback to run on ajax complete
         * @return {object}                     XHR object
         */
        webformSubmission: function(sid, data, callback) {
            var sproutletForm = {
                'webform': sid,
                'submission': {
                    'data': data
                }
            };
            return this.postSecure('/s2s/submission.json', sproutletForm, callback);
        },

        /**
         * Entity Form submission
         * @param  {object}     data            Formated entityform data to send
         * @param  {function}   callback        Callback to run on ajax complete
         * @return {object}                     XHR object
         */
        entityformSubmission: function(data, callback) {
            return this.postSecure('/s2s/entity_entityform.json', data, callback);
        },

        /**
         * [search description]
         * @return {[type]} [description]
         */
        // search: function(term) {
        //     var url = '/search/site/';
        //     return Sprout.Services.generateRequest(url, term, 'GET', 'json');
        // },

        /**
         * [checkEmail description]
         * @return {[type]} [description]
         */
        checkEmail: function(email, callback) {
            var data = {
                'email': email
            };
            return this.postSecure('/s2s/validation/email', data, callback, 'POST');
        },

        /**
         * [register description]
         * @return {[type]} [description]
         */
        register: function(data, callback) {
            return this.postSecure('/s2s/user/register', data, callback);
        },

        /**
         * [updateAccount description]
         * @return {[type]} [description]
         */
        updateAccount: function(uid, data, callback) {
            var proxyData = {
                'method':'PUT',
                'request':document.location.protocol + '//' + document.location.host + '/s2s/user/' + uid,
                'data': data
            };
            return this.postSecure('/s2s/proxyp', proxyData, callback, 'POST');
        },

        /**
         * [forgotPassword description]
         * @return {[type]} [description]
         */
        forgotPassword: function(data, callback) {
            return this.postSecure('/s2s/user/request_new_password', data, callback);
        },

        /**
         * [login description]
         * @return {[type]} [description]
         */
        login: function(name, pass, callback) {
            var data = {
                'username': name,
                'password': pass
            };
            return this.postSecure('/s2s/user/login', data, callback);
        },

        /**
         * Fetch the channels in your area that show Sprout
         * @param  {Object}     data    object that may contain 'zip' or 'kpiid + providerid'
         *                              e.g. {'kpiid': 200049825, 'providerid': 14567}
         * @return {function}           handle to ajax request
         */
        channelFinder: function(data, callback) {
            var url = 'http://secure.channelfinder.net/feeds/json/sprout/?';
            var settings = {
                headers: {
                    'Content-type': 'text/plain'        // for CORS, set to anything that's not x-www-form-urlencoded.
                }
            };

            if (window.XDomainRequest) {                // oh IE9....
                var xdr = new XDomainRequest();
                xdr.onload = function(e) {
                    callback(e, xdr.responseText);
                };
                xdr.open('GET', url + Sprout.Utils.serialize(data), true);
                xdr.send();
            } else {
                return Sprout.Services.generateRequest(url, data, 'GET', 'json', callback, settings);
            }
        },

        getSproutletTodayBirthdays: function(callback) {
            var _self = this;
            this.getUser(function(event, user) {
                if(user) {
                    var url = '/s2s/sproutlets/birthdays/' + user.uid + '.json';
                    return _self.generateRequest(url, null, 'GET', 'json', callback);
                } else {
                    callback({});
                }
            });
        },

        getMVPD: function(callback, mvpd) {
            var url = '/mvpd';
            if (mvpd) {
                url += '/' + mvpd;
            }

            Sprout.Services.generateRequest(url, null, 'GET', 'json', callback);
        }
    };
})();

/**

File:           global.js
Description:    Global Sprout functions: nav and nav-related modules

*/


/**
 * Search functions.
 * Do a search by clicking on .search-button, or pressing enter from within .search-input
 * @return {void}
 */
Sprout.Global.search = function() {

    function getSearchUrlByDevice(value) {
        var searchTarget = '/search/';
        if (Sprout.Utils.isMobile) {
            searchTarget += 'mobile/';
        } else if (Sprout.Utils.isTablet) {
            searchTarget += 'tablet/';
        } else {
            searchTarget += 'site/';
        }
        return searchTarget + value;
    }

    _.each(document.querySelectorAll('.search-form'), function(form) {
        form.addEventListener('submit', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var input = form.querySelector('.search-input');
            var searchTarget = 'site/';
            var value = input.value.trim();
            if( value ) {
                window.location.href = getSearchUrlByDevice(value);
            }
        });
    });
};


/**
 * Small breakpoint navigation functionality
 * @return {void}
 */
Sprout.Global.navbar = function() {

    var scrollInitialPos = scrollInitialPos || 0;

    /**
     * Toggles the small-breakpoint menu open / closed
     */
    document.querySelector('#toggle-menu').addEventListener('click', function(e) {
        e.preventDefault();
        if(document.body.className.indexOf("show-nav") === -1){
            scrollInitialPos = window.pageYOffset;
            $(document.body).addClass('show-nav');
        } else {
            $(document.body).removeClass('show-nav').removeClass('show-search');
            window.scrollTo(0, scrollInitialPos);
        }
    });

    // iphone6 fix
    document.querySelector('header .panel').addEventListener('touchstart', function(e){});          // Workaround for touch event / -webkit-overflow-scrolling:touch; bug.  // http://stackoverflow.com/questions/18736297/webkit-overflow-scrolling-touch-broken-in-ios7
    /**
     * Show or Hide the menubar
     * Displays the small-breakpoint menubar, depending on scroll direction
     */
    Sprout.Utils.scrolling(function(scroll, lastScroll) {
        if (scroll > lastScroll && scroll > 60) {       // 60 is the nav height
            $(document.body).addClass('hide-navbar');
        } else {
            $(document.body).removeClass('hide-navbar');
        }
    });
};


/**
 * Bind Desktop utility nav items functionality,
 * mobile links go through to their own page
 * @return {void}
 */
Sprout.Global.menuToggles = function() {
    document.querySelector('#toggle-channel').addEventListener('click', function(e) {
        e.preventDefault();
        Sprout.Utils.toggleShowing('show-channel');
    });

    document.querySelector('#toggle-search').addEventListener('click', function(e) {
        e.preventDefault();
        Sprout.Utils.toggleShowing('show-search');
        document.querySelector('#search .search-input').focus();
    });

    _.each(document.querySelectorAll('header .close'), function(close) {
        close.addEventListener('click', function() {
            Sprout.Utils.toggleShowing();
        });
    });
};


/**
 * Add click sound to every CTA
 * @return {void}
 */
Sprout.Global.clickify = function() {
    var click = document.querySelector('#sound-click');
    _.each(document.querySelectorAll('.cta, .more-link'), function(item){
        new Sprout.Components.audio(item, click);
    });
};

/**
 * Delete cookies on logout
 * @return {void}
 */
Sprout.Global.logout = function() {
    var logout = document.querySelector('#link-logout');
    if(logout && _.isElement(logout)){
        logout.addEventListener('click', function(e) {
            Sprout.Utils.cookies.eraseCookie('Drupal.visitor.us');
            Sprout.Utils.cookies.eraseCookie('Drupal.visitor.service_token');
            Sprout.Utils.cookies.eraseCookie('RSESS_sprout');
        });
    }
};

/**
 * OAO script
 * @return {void}
 */

Sprout.Global.OAOScript = function() {
    var values = Drupal.settings.ads,
        urlValue = Sprout.Utils.getURLParam(window.location.href, 'test'),
        executeRight = false;

    if (values){
        var networkCode = 5184,
            s1 = values.s1,
            topLevelAdUnit = "sprout.main",
            adUnit = topLevelAdUnit + "/" + s1,
            test = urlValue;

        var firstMappingValuesTop = [760, 0],
            secondMappingValuesTop = [728, 90],
            thirdMappingValuesDesktop = [330, 0 ],
            fourthMappingValuesDesktop = [320, 50];

        var firstMappingValuesRight = [0, 0],
            secondMappingValuesRight = [300, 250];

        var slotNameValuesTop = [[728, 90], [320, 50]],
            slotNameValuesRight = [300, 250];

        var leaderboardAdSpot = document.getElementById('div-id-for-top-leaderboard'),
            rectangleAdSpot = document.getElementById('div-id-for-top-rectangle');

        switch (values.type){
            case 'activity':
            case 'promotion':
            case 'game':
            case 'show':
            case 'video':
                adUnit += "/" + values.s2;
                executeRight = true;
                break;
        }

        var slotName = "/" + networkCode + "/" + adUnit;

        if (leaderboardAdSpot || rectangleAdSpot) {
            googletag.cmd.push(function(){
                if (leaderboardAdSpot){
                    var topMapping = googletag.sizeMapping()
                        .addSize(firstMappingValuesTop, secondMappingValuesTop)
                        .addSize(thirdMappingValuesDesktop, fourthMappingValuesDesktop)
                        .addSize([0, 0 ], [])
                        .build();

                    googletag.defineSlot(slotName, slotNameValuesTop , "div-id-for-top-leaderboard")
                        .defineSizeMapping(topMapping)
                        .addService(googletag.pubads())
                        .setTargeting("pos", "top");
                }

                if (executeRight && rectangleAdSpot){
                    var rightMapping = googletag.sizeMapping()
                        .addSize(firstMappingValuesRight, secondMappingValuesRight)
                        .build();

                    googletag.defineSlot(slotName, slotNameValuesRight, "div-id-for-top-rectangle")
                        .defineSizeMapping(rightMapping)
                        .addService(googletag.pubads())
                        .setTargeting("pos", "right");
                }

                switch (values.type){
                    case 'activity':
                        googletag.pubads().setTargeting("s2", values.s2);
                        googletag.pubads().setTargeting("activity", values.s2);
                        googletag.pubads().setTargeting("show", values.show);
                        googletag.pubads().setTargeting("pid", values.s2);
                        break;

                    case 'character':
                        googletag.pubads().setTargeting("pid", values.s2);
                        break;

                    case 'game':
                        googletag.pubads().setTargeting("s2", values.s2);
                        googletag.pubads().setTargeting("game", values.s2);
                        googletag.pubads().setTargeting("show", values.show);
                        googletag.pubads().setTargeting("pid", values.s2);
                        break;

                    case 'show':
                    case 'video':
                        googletag.pubads().setTargeting("s2", values.s2);
                        googletag.pubads().setTargeting("show", values.show);
                        googletag.pubads().setTargeting("pid", values.s2);
                        break;

                    case 'promotion':
                        googletag.pubads().setTargeting("pid", values.s2);
                        break;
                }

                if (urlValue){
                    googletag.pubads().setTargeting("test", test);
                }

                googletag.pubads().setTargeting("s1", s1);
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
            });
        }
    }
};

Sprout.Global.checkMVPDProvider = true;
Sprout.Global.detectMVPDProvider = function() {
    function checkAccessEnablerLoc() {
        if (!adobePassShim.isSwf) {
            Drupal.settings.adobePass.adobePassAccessEnablerLoc = Drupal.settings.adobePass.adobePassAccessEnablerLoc.replace(/\.swf/gi, '.js');
        }

        return Drupal.settings.adobePass.adobePassAccessEnablerLoc;
    }

    if (Sprout.Global.checkMVPDProvider) {
        window.sendTrackingData = function(trackingEventType, trackingData) {
            if (trackingEventType === 'authenticationDetection') {
                if (trackingData[0]) {
                    window.updateSelectedMVPD(trackingData[1]);
                } else {
                    window.updateSelectedMVPD();
                }
            }
        };

        if (adobePassShim.isSwf) {
            window.swfLoaded = function() {
                adobePass.initiateCheckAuthProcess();
            };
        }

        adobePass = tve.adobePass.getInstance({
            adobePassAccessEnablerMode: adobePassShim.isSwf?'flash':'script',
            adobePassAccessEnablerLoc: checkAccessEnablerLoc()
        });
    }
};
/**

File:           _init.js
Description:    Entry point into the Sprout online site

*/


/**
 * [ description]
 * @return {[type]} [description]
 */
Sprout.init = _.debounce(function() {
    var page, components, element, links;

    // dev only.
    if (!window.console) {
        window.console = { log: function(){} };
    }

    if (Sprout.Utils.isMobile){

    }
    else{
        if (Sprout.Utils.isTablet){
            _.each(document.querySelectorAll('.show-mobile'), function(item){
                if (!$(item).hasClass('show-tablet')){
                    $(item).remove();
                }
            });
        }
        else{
            //desktop
            _.each(document.querySelectorAll('.show-mobile'), function(item){
                $(item).remove();
            });
        }
    }

    /* ---------------------------------------
        0.  Detect user status
    -----------------------------------------*/
    var siteActions = document.querySelector('#nav-utility .site-actions');
    if (Sprout.Utils.isUserAuthenticated) {
        $(document.querySelector('body')).addClass('user-authenticated');
    }
    var statusClass = Sprout.Utils.isUserAuthenticated?'js-authenticated':'js-anonymous';
    if (siteActions) {
        _.each(siteActions.querySelectorAll('.js-user'), function(item) {
            if ($(item).hasClass(statusClass)) {
                $(item).removeClass('u-hidden');
            } else {
                siteActions.removeChild(item);
            }
        });
    }


    /* ---------------------------------------
        1.  Init Page Script
    -----------------------------------------*/

    element = document.querySelector('main');
    if (element) {
        page = element.getAttribute('data-page');
        if (Sprout.Pages[page]) {
            new Sprout.Pages[page](element);
        }
    }
    /*OAO script*/
    Sprout.Global.OAOScript();

    /* ---------------------------------------
        2.  Init Components
    -----------------------------------------*/

    Sprout.Components._init(document);



    /* ---------------------------------------
        3.  Init Global stuffs
    -----------------------------------------*/
    if ( document.querySelector('header') ) {
        Sprout.Global.search();
        Sprout.Global.navbar();
        // Sprout.Global.channelFinder();
        Sprout.Global.menuToggles();
        Sprout.Global.logout();
    }

    Sprout.Global.clickify();
    Sprout.Utils.animateIn('.fx-fadein');

    /* ---------------------------------------
        4.  Init Referral
    -----------------------------------------*/
    // move to global ?
    if ( !('referrer' in document) || !document.referrer || document.referrer === '' ) {
        links = document.getElementsByTagName('a');
        Array.prototype.forEach.call(links, function(item) {

            var currentLocation = document.location.href.replace(/^https?:\/\//,'').split('/');
            var linkHref = item.href.replace(/^https?:\/\//,'');
            var regularExp = new RegExp('^((http)s?://)?([a-z]+\.)?(' + currentLocation[0].replace('.','\.') + ')\/?$', 'i');
            var sufix = '';

            if (linkHref.match(regularExp)) {
                sufix = (item.href.indexOf('?') < 0)? '?' : '&';
                sufix += 'redirect=false';
                item.href += sufix;
            }
        });
    }


    /* ---------------------------------------
        5.  Detect Leaving Site
    -----------------------------------------*/
    // move to global?
    if (window.location.pathname.indexOf('now-leaving') < 0) {
        var leaveSiteModal = document.querySelector('#leaveSiteModal');
        if (leaveSiteModal) {
            Sprout.Utils.detectLeavingSite(function (externalHref) {
                var leaveElement = leaveSiteModal.querySelector('#interstitial-leave');
                leaveElement.href = externalHref;
                leaveSiteModal.modal.show();
            });

            leaveSiteModal.querySelector('#interstitial-stay').addEventListener('click', function() {
                var interstitialStayEvent = document.createEvent('Event');
                interstitialStayEvent.initEvent('sprout-interstitial-stay', true, true);
                leaveSiteModal.dispatchEvent(interstitialStayEvent);
            });
        }
    }


    /* ---------------------------------------
        6.  Polyfills
    -----------------------------------------*/
    Sprout.Polyfills.placeholder(document);


    /* ---------------------------------------
        7.  Miscellany
    -----------------------------------------*/
    /*  Anything in here is lower-prioriy content and is loaded asynchronously to avoid blocking the UI */
    Sprout.Utils.loadAsset('/sites/sprout/themes/sprout_twig/css/libs/oo_style.css');
    // Sprout.Utils.loadAsset('/sites/sprout/themes/sprout_twig/js/libs/opinionLab/oo_engine.min.js', function(){
    if (window.location.pathname.indexOf('now-leaving') < 0) {
        if(typeof OOo !== "undefined") {
            window.oo_tab = new OOo.Ocode({ tab:{} });
        }
    }
    // });

    /* ---------------------------------------
        8.  MVPD Provider Check
    -----------------------------------------*/
    Sprout.Global.detectMVPDProvider();

});



// Start Engines.
Sprout.Utils.featureDetection();
document.addEventListener('DOMContentLoaded', Sprout.init, false);


Sprout.Polyfills.placeholder = function(handle){

    // -----------------------------------------------------
    // placeholder
    // -----------------------------------------------------
    if (!('placeholder' in document.createElement('input'))) {
        // window.addEventListener('load', function placeholder() {

            var inputs = handle.querySelectorAll('[placeholder]');
            var forms = handle.querySelectorAll('form');
            var input;
            var i, j;

            // put this here, cuz, do we have inputs that are _not_ in a form...?
            Array.prototype.forEach.call(inputs, function(input) {
                var isPassword = input.type === 'password';
                if (input.value === '') {
                    if (isPassword) {
                        // Display password placeholder as text
                        input.setAttribute('type', 'text');
                    }
                    input.value = input.getAttribute('placeholder');
                    $(input).addClass('show-placeholder');
                }
                input.addEventListener('focus', function() {
                    if (isPassword) {
                        // Display password placeholder as text
                        this.setAttribute('type', 'password');
                    }
                    $(this).removeClass('show-placeholder');
                    if (this.value === this.getAttribute('placeholder')) {
                        this.value = '';
                    }
                });
                input.addEventListener('blur', function() {
                    if(this.value === '') {
                        if (isPassword) {
                            // Display password placeholder as text
                            this.setAttribute('type', 'text');
                        }
                        this.value = this.getAttribute('placeholder');
                        $(this).addClass('show-placeholder');
                    } else {
                        if (isPassword) {
                            // Display password placeholder as text
                            this.setAttribute('type', 'password');
                        }
                    }
                });
            });
        Array.prototype.forEach.call(forms, function(form) {
            form.addEventListener('submit', function() {
                inputs = this.querySelectorAll('[placeholder]');    // narrow down the inputs to only the current form
                for (j = 0; j < inputs.length; j++) {
                    input = inputs[j];

                    // input.focus();           // just focus the input: sufficient to check if placeholder text needs removal before submit
                                                // although, tragi-comically, IE9 will immediately fire the blur handler for. no. reason.
                                                // so...

                    if (input.value === input.getAttribute('placeholder')) {
                        input.value = '';
                        $(input).removeClass('show-placeholder');
                    }

                }
            });
        });
    }


    // -----------------------------------------------------
    // request animation frame
    // -----------------------------------------------------
    // https://gist.github.com/paulirish/1579671
    if (!window.requestAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
};

/**
 * Sprout Homepage prototype
 * @return {Sprout.Pages.home} A Sprout Homepage object
 */
Sprout.Pages['S2S'] = function(element) {
    new Sprout.S2S(element);
};



// =========================================================== //
/**
 * Functions for managing the S2S state and submission
 * @type {Object}
 */
Sprout.S2S = function(element) {
    $(element).addClass('locked');

    this.handle = element;
    this.steps = [];
    this.options = Sprout.Utils.getDataOptions(this.handle);

    setTimeout(this.onAuthentication.bind(this));
};
Sprout.S2S.prototype = {

    /**
     * Gets user data from service response
     * @param  {Event}      event        Service event
     * @param  {Object}     data         Data returned by service
     * @return {void}
     */
    onAuthentication: function() {
        if (Sprout.Utils.isUserAuthenticated) {
            this.webform = new Sprout.Webform(this.options.uuid);
            // Only initialize S2S submission after user authentication state is confirmed
            this.initializeSubmission();
        } else {
            Sprout.Components.login.open();
        }
    },

    /**
     * Initializes preview and submit steps
     * @return {void}
     */
    initializeSubmission: function() {
        var self = this;
        var nextStepsCtas = this.handle.querySelectorAll('.next-step a');
        var buttons = this.handle.querySelectorAll('#s2s-preview .submit');     // mobile & desktop submits
        var edit = this.handle.querySelector('.edit');
        this.serviceError = this.handle.querySelector('.service-error');

        $(this.handle).removeClass('locked');
        $('#s2s-step-1').addClass('active');

        // Set up Steps
        _.each(this.handle.querySelectorAll('[data-S2S]'), function(step) {
            var type = step.getAttribute(['data-S2S']);
            self.steps.push( new Sprout.S2S.step(step, type) );
        });

        // Set up Preview
        this.previewStep = new Sprout.S2S.Preview(document.querySelector('#s2s-preview'), this.steps);

        // Add Sproutlet
        new Sprout.Sproutlet.create(this.handle.querySelector('.sproutlet-create'),
                                    this.sproutletAdded.bind(this));

        _.each(nextStepsCtas, function(cta){
            cta.addEventListener('click', self.goToStep.bind(self));
        });

        _.each(buttons, function(button) {
            button.addEventListener('click', self.onSubmit.bind(self));
        });

        edit.addEventListener('click', this.goToStep.bind(this));
    },

    /**
     * Manage the transition between steps
     * @param  {Event}      event        Next Step click event
     * @return {void}
     */
    goToStep: function(event) {
        var nextStepElement = this.handle.querySelector(event.target.hash);

        event.stopPropagation();
        event.preventDefault();

        if (nextStepElement) {
            $(nextStepElement).addClass('active');
            Sprout.Utils.scrollPage(nextStepElement);
        }
    },

    /**
     * Handles the service response for adding a sproutlet. Add it to the list and select it.
     * @param  {Object}      sproutlet        Sproutlet data object
     * @return {void}
     */
    sproutletAdded: function(event, sproutlet) {
        if (event) {
            // Error
        } else {
            var sproutletList = this.handle.querySelector('.sproutlet-list .wrap');
            var addSproutletElement = this.handle.querySelector('.sproutlet-list .add-new-sproutlet');
            var stringItem = '<div>' + sproutlet.sproutlet_name + ', ' + Sprout.Utils.getAge(sproutlet.sproutlet_birthday) + ' yrs</div>';
            stringItem += '<div class="sproutlet-location">' + sproutlet.sproutlet_hometown + ', ' + sproutlet.sproutlet_state + '</div>';

            var listItem = document.createElement('li');
            listItem.id = sproutlet.id;

            listItem.setAttribute('data-options', JSON.stringify(sproutlet));

            // add the item text
            listItem.innerHTML = stringItem;

            // add listItem to the listElement
            sproutletList.insertBefore(listItem, addSproutletElement);

            var selectedSproutlet = this.handle.querySelector('.sproutlet-list .selected');
            if (selectedSproutlet) {
                $(selectedSproutlet).removeClass('selected');
            }

            $(listItem).addClass('sproutlet selected combobox-item');

            var sproutletForm = this.handle.querySelector('#s2s-preview-form.adding-sproutlet');
            if (sproutletForm) {
                $(sproutletForm).removeClass('adding-sproutlet');
            }
        }
    },

    /**
     * Return data of selected sproutlet
     * @return {object}
     */
    getSelectedSproutletData: function() {
        var sproutlet = this.handle.querySelector('.sproutlet-list .selected');
        if (sproutlet) {
            var sproutletOptions = Sprout.Utils.getDataOptions(sproutlet);
            if (sproutletOptions) {
                if (this.options.type === 'birthday-wish') {
                    return {
                        '8': {
                            'form_key': 'select_your_sproutlet',
                            'type': 'textfield',
                            'values': [sproutletOptions.id]
                        },
                        '9': {
                            'form_key': 'your_childs_first_name',
                            'type': 'textfield',
                            'values': [sproutletOptions.sproutlet_name]
                        },
                        '10': {
                            'form_key': 'hometown',
                            'type': 'textfield',
                            'values': [sproutletOptions.sproutlet_hometown]
                        },
                        '11': {
                            'form_key': 'state',
                            'type': 'select',
                            'values': [sproutletOptions.sproutlet_state]
                        },
                        '12': {
                            'form_key': 'your_childs_birthdate',
                            'type': 'date',
                            'values': [sproutletOptions.sproutlet_birthday]
                        },
                        '13': {
                            'form_key': 'my_older_child_has_special_needs',
                            'type': 'select',
                            'values': [sproutletOptions.sproutlet_special_needs]
                        }
                    };
                } else {
                    return {
                        '1': {
                            'form_key': 'sproutlet_name',
                            'type': 'textfield',
                            'values': [sproutletOptions.sproutlet_name]
                        },
                        '2': {
                            'form_key': 'sproutlet_birthday',
                            'type': 'date',
                            'values': [sproutletOptions.sproutlet_birthday]
                        },
                        '3': {
                            'form_key': 'sproutlet_hometown',
                            'type': 'textfield',
                            'values': [sproutletOptions.sproutlet_hometown]
                        },
                        '4': {
                            'form_key': 'sproutlet_state',
                            'type': 'textfield',
                            'values': [sproutletOptions.sproutlet_state]
                        },
                        '5': {
                            'form_key': 'id',
                            'type': 'textfield',
                            'values': [sproutletOptions.id]
                        }
                    };
                }
            }
        }

        return null;
    },

    /**
     * Submit submission once all the required fields are completed
     * @return {void}
     */
    onSubmit: function(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        $(this.serviceError).removeClass('error');

        if ($(this.handle).hasClass('submitting')) {
            return;
        }

        var missingStep = _.find(this.steps, function(step) {
            return !step.complete;
        });

        if (missingStep) {
            Sprout.Utils.scrollPage(missingStep.handle);
        } else if (this.previewStep.complete()) {
            Sprout.Utils.loader(true);
            $(this.handle).addClass('submitting');
            this.buildSubmissionData(this.getSelectedSproutletData());
        }
    },

    /**
     * Update file upload progress
     * @param  {Event}      event        Upload progress event
     * @return {void}
     */
    assetUploadProgress: function(event) {
        //console.log('assetUploadProgress');

        //console.log("Uploaded "+ event.loaded + " bytes of " + event.total);
        var percent = (event.loaded / event.total)*100;
        //$("#progressBar").val(Math.round(percent));
        //console.log(Math.round(percent) + "% updloaded...");
    },

    /**
     * Build submission data step by step.
     * Wait for file steps to upload files.
     * @param  {object} submissionData      Accumulated submission data
     * @param  {int}    current             Index of the current step
     * @return {void}
     */
    buildSubmissionData: function(submissionData, current) {
        var self = this;
        if (current === undefined) {
            current = 0;
        }
        var nextSteps = this.steps.slice(current);
        var completed = _.every(nextSteps, function(step, index){
            var ndx = current + index + 6;    //Steps offset
            var stepData = step.submission(function(stepData) {
                if (stepData) {
                    submissionData[ndx.toString()] = stepData;
                    self.buildSubmissionData(submissionData, current + index + 1);
                } else {
                    //Error
                    Sprout.Utils.loader(false);
                    $(self.handle).removeClass('submitting');
                    Sprout.Utils.scrollPage(step.handle);
                }
            },
            self.assetUploadProgress.bind(self));

            if (stepData && stepData.values) {
                submissionData[ndx.toString()] = stepData;
            }

            return stepData;
        });

        if (completed) {
            this.submit(submissionData);
        }
    },

    /**
     * Submit webform with submission data
     * @param  {object} submissionData      Accumulated submission data
     * @return {void}
     */
    submit: function(submissionData) {

        if (this.options.type === 'birthday-wish') {
            submissionData = _.extend({
                '14':{
                   'form_key':'term_of_use',
                   'type':'select',
                   'values':['1']
                },
                '15':{
                   'form_key':'privacy_policy',
                   'type':'select',
                   'values':['1']
                },
                '16':{
                   'form_key':'license_release',
                   'type':'select',
                   'values':['1']
                }
            }, submissionData);
        }
        this.webform.submit(submissionData, this.onCampaignSubmission.bind(this));
    },

    /**
     * Handle webform submission response
     * @return {void}
     */
    onCampaignSubmission: function(event, data) {
        var errors = [];
        if (event || (data && data.status === 500)) {
            $(this.handle).removeClass('submitting');
            Sprout.Utils.loader(false);
            $(this.serviceError).addClass('error');
            for (var key in data) {
                if (key !== 'status') {
                    errors.push('<li class="error">' + data[key] + '</li>');
                }
            }
            this.serviceError.querySelector('ul').innerHTML = errors.join('');
        } else {
            document.location.href = '/sent-to-sprout/thank-you?cid=' + this.options.cid;
        }
    }
};


// =========================================================== //
/**
 * Sprout S2S Step
 * @return {Sprout.S2S.step} A Sprout S2S Step object
 */
Sprout.S2S.step = function(element, type) {
    this.handle = element;
    this.handle.step = this;
    this.type = type;
    this.complete = false;
    this.options = Sprout.Utils.getDataOptions(this.handle);
    this.setComplete(!this.options.required);                            // disabled required steps by default

    this.field = this.handle.querySelector('input, textarea');          // works for file upload, video, text, message, poll
    this.validator = new Validator();

    var nextStepCta = this.handle.querySelector('.next-step a');
    if (nextStepCta) {
        nextStepCta.addEventListener('click', this.onNextStep.bind(this));
    }

    this.init();
};
Sprout.S2S.step.prototype = {

    /**
     * Init S2S steps depending on its type
     */
    init: function() {
        var self = this;
        switch(this.type) {
            case 'message':
            case 'textarea':
                if (this.options.max) {
                    this.field.addEventListener('blur', this.countCharacters.bind(this));
                    this.field.addEventListener('keyup', this.countCharacters.bind(this));
                } else {
                    this.field.addEventListener('blur', this.validate.bind(this));
                    this.field.addEventListener('keyup', this.validate.bind(this));
                }
                break;

            case 'file':
                this.response = null;
                //Initialize drag and drop component
                this.fileComponent = new Sprout.Components.dragAndDrop(this.handle, this.options.formats, this.options.preview, this.options.sizeLimit,
                    function(file) {
                        self.file = file;
                        self.response = null;

                        var change = document.createEvent('Event');
                        change.initEvent('change', true, true);
                        self.handle.dispatchEvent(change);
                        self.validate();
                    }
                );
                break;

            case 'poll' :
                this.field = this.handle.querySelectorAll('input');
                _.each(this.field, function(field) {
                    field.addEventListener('change', self.validate.bind(self));
                });
                break;
        }
    },

    /**
     * Validate message characters count
     * @return {void}
     */
    countCharacters: function(event) {
        //Implement max characters logic here
        var counter = this.handle.querySelector('.message-field-counter');
        var maxCharacters = this.options.max;
        var value = this.field.value;
        counter.innerHTML = maxCharacters - value.length;

        if (!event || event.type !== 'keyup' || (value.length === value.trim().length && value.trim().length > 0)) {
            this.validate();
        }
    },

    /**
     * Validate step status
     * @return {void}
     */
    validate: function() {
        this.setComplete( this.file || this.validator.check(this.handle) );
    },

    /**
     * Set step status
     * @param  {boolean}    status
     * @return {void}
     */
    setComplete: function(status) {
        this.complete = status;

        if (this.complete) {
            $(this.handle).addClass('done');
        } else {
            $(this.handle).removeClass('done');
        }
    },

    /**
     * Set step value from service response
     * @return {void}
     */
    setValue: function(valueObj) {
        switch(this.type) {
            case 'file':
                if (valueObj && valueObj.fid) {
                    this.fileComponent.setFile(valueObj);
                    this.response = valueObj;
                    this.file = valueObj.fid;
                } else {
                    this.fileComponent.setFile();
                    this.response = null;
                    this.file = null;
                    this.field.value = null;
                    this.field.file = null;
                }
                break;
            case 'poll':
                _.each(this.field, function(field) {
                    field.checked = (valueObj && field.value === valueObj);
                });
                break;
            default:
                this.field.value = (valueObj)?valueObj:'';
                break;
        }
        this.validate();
    },

    /**
     * Prevent user transitioning to the next step if the current step is not complete
     * @return {void}
     */
    onNextStep: function(event) {
        if (!this.complete) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    },

    /**
     * Returns step submission formated object by type
     * @return {object} submission object
     */
    getSubmissionObject: function() {
        var values;
        switch(this.type) {
            case 'file':
                if (this.response) {
                    values = [this.response.fid];
                }
                break;
            case 'poll':
                values = _.find(this.field, function(field) {
                    return field.checked;
                });
                values = [$(values).val()];
                break;
            default:
                values = [$(this.field).val() || this.file || ''];
                break;
        }

        return {
            'form_key': this.options.form_key,
            'type': this.options.type,
            'values': values
        };
    },

    /**
     * Returns step submission object depending on step status
     * Validates the completition of the step.
     * If it is a file, upload the file asyncronously and invoke callback
     * @param  {function}   callback    Upload callback, used for success and error
     * @param  {function}   progress    Upload progress callback
     * @return {object}     submission object
     */
    submission: function(callback, progress) {
        var submissionObject;
        var self = this;
        if (this.complete) {
            if (this.type === 'file' && !this.response && this.file) {
                Sprout.Services.uploadFile(
                    this.file,
                    function(data) {
                        if (data) {
                            //success
                            self.response = data;
                            callback(self.getSubmissionObject());
                        } else {
                            self.response = null;
                            callback();
                        }
                    },
                    progress);
            } else {
                submissionObject = this.getSubmissionObject();
            }
        }

        return submissionObject;
    }
};



// =========================================================== //
/**
 * Spout S2S Previewer
 */
Sprout.S2S.Preview = function(element, steps) {
    var self = this;

    this.handle = element;
    this.validator = new Validator();

    this.message = this.handle.querySelector('.message');
    this.photo   = this.handle.querySelector('.photo');
    this.photoName = this.handle.querySelector('.photo-name .name');
    this.video   = this.handle.querySelector('.video');
    this.poll    = this.handle.querySelector('.poll');

    _.each(steps, function(step) {
        switch (step.options.form_key) {
            case 'message':
            case 'birthday_wish':
                step.handle.addEventListener('change', self.updateMessage.bind(self));
                break;
            case 'photo':
            case 'upload_a_photo':
                step.handle.addEventListener('change', self.updatePhoto.bind(self));
                break;
            case 'video':
                step.handle.addEventListener('change', self.updateVideo.bind(self));
                break;
            case 'poll':
                step.handle.addEventListener('change', self.updatePoll.bind(self));
                break;
        }
    });
};
Sprout.S2S.Preview.prototype = {

    /**
     * Update message step in preview
     * @param  {Event}      event        Service event
     * @return {void}
     */
    updateMessage: function(event) {
        var value = event.target.value;
        this.message.innerHTML = value;
    },

    /**
     * Update photo step in preview
     * @param  {Event}      event        Service event
     * @return {void}
     */
    updatePhoto: function(event) {
        var fileName = '';
        if (event.target.step.file) {
            $(this.photo).removeClass('u-hidden');
            Sprout.Utils.previewImageFile(event.target.step.file, this.photo.querySelector('img'));
            fileName = event.target.step.file.name;
        } else {
            $(this.photo).addClass('u-hidden');
            this.photo.querySelector('img').src = '';
        }

        if (this.photoName) {
            this.photoName.innerHTML = fileName;
        }
    },

    /**
     * Update video step in preview
     * @param  {Event}      event        Service event
     * @return {void}
     */
    updateVideo: function(event) {
        if (event.target.step.file) {
            this.video.querySelector('.name').innerHTML = event.target.step.file.name;
        } else {
            this.video.querySelector('.name').innerHTML = ' ';
        }
    },

    /**
     * Update poll step in preview
     * @param  {Event}      event        Service event
     * @return {void}
     */
    updatePoll: function(event) {
        var selectedOption = Sprout.Utils.getDataOptions(Sprout.Utils.getParentMatch(event.target, 'li'));
        this.poll.querySelector('img').src = selectedOption.image;
        this.poll.querySelector('.name').innerHTML = decodeURIComponent(selectedOption.value);
    },

    /**
     * Validates preview step
     * @return {boolean}
     */
    complete: function() {
        return this.validator.check(this.handle.querySelector('.step-submit .field-item'));
    }
};


/**
 * Sprout Account prototype
 * @return {Sprout.Pages.account} A Sprout Account object
 */

 var getBirthdayCookie = function(){
    var ca = document.cookie.split(';');
    var exists = false;
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf('birthday=') == 0) {
            exists = true
        }
    }
    return exists;
}

Sprout.Pages['account'] = function(element) {
    var self = this;
    this.handle = element;

    this.options = Sprout.Utils.getDataOptions(this.handle);

    if(getBirthdayCookie() == true){
        jQuery('#account-info .form-next').hide();
        jQuery('input#mail, input#pass, input#confirm_password').prop('disabled', true);
        jQuery('#account-info .next-step').prepend('<div><p class="dob-error">Sorry, you have indicated previously that you are not at least 18 years of age. Please try again tomorrow.</p></div>');
    }

    function getSelectedPanelTab(handle) {
        return handle.querySelector('.tablist .tab.selected').getAttribute('aria-controls');
    }

    this.onTabChange = function() {
        $(this.handle).removeClass('show-birthday');
        $(this.handle).removeClass('show-profile');
        $(this.handle).addClass('show-' + getSelectedPanelTab(this.handle));
    };
    this.onSuccessEvent = function() {
        $(this.handle).addClass('show-confirmation');
        Sprout.Utils.scrollPage(this.handle);
    };

    if (this.options['edit']) {
        new Sprout.Pages['account-profile'](document.getElementById('user-account-update'), this.options);

        //Initialize account birthdays homepage
        new Sprout.Pages['account-birthdays'](document.getElementById('user-account-birthdays'));

        document.addEventListener('tabchange', this.onTabChange.bind(this));
        document.addEventListener('accountSuccess', this.onSuccessEvent.bind(this));

        _.each(this.handle.querySelectorAll('.confirmation a'), function(confirmationLink) {
            confirmationLink.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                $(self.handle).removeClass('show-confirmation');
            });
        });

        this.onTabChange();
    } else {
        new Sprout.Pages['account-profile'](element, this.options);
    }
};


Sprout.Pages['account-profile'] = function(element, options) {
    this.handle = element;
    this.options = options;
    this.steps = [];
    this.mailStep = null;
    this.mail = '';
    this.stickyInitialized = false;

    this.webform = new Sprout.Webform('account_form', this.options.type, !this.options.edit);
    this.init();
};

Sprout.Pages['account-profile'].prototype = {

    /**
     * Initialize account object after webform receives the session token
     * @return {void}
     */
    init: function() {
        var self = this;
        this.validator = new Validator();

        // home page init
        _.each(this.handle.querySelectorAll('.form-step'), function(step) {
            var newStep = new Sprout.forms.step(step);

            var emailField;
            self.steps.push( newStep );

            emailField = step.querySelector('#mail');
            if (emailField) {
                self.mail = $(emailField).val();
                self.mailStep = newStep;

                if (self.options.edit) {
                    emailField.addEventListener('keyup', self.emailChanged.bind(self));
                }
            }

            var button = step.querySelector('.form-next');
            if (button) {
                button.addEventListener('click', self.onNext.bind(self));
            }
        });

        this.initSproutlets();

        this.handle.querySelector('.add-sproutlet').addEventListener('click', this.addSproutlet.bind(this));

        if (this.options.edit) {
            document.addEventListener('tabchange', this.onTabChange.bind(this));
        }
    },

    initSubmitStickyBar: function() {
        if (this.stickyInitialized) {
            return;
        }

        this.stickyInitialized = false;

        //Submit sticky bar
        var self = this,
            submitHandle = this.handle.querySelector('#account-submit'),
            placeHolder = this.handle.querySelector('.submit-wrapper');

        function scrollStickyBar() {
            var submitHeight = submitHandle.getBoundingClientRect().height,
                scroll = placeHolder.getBoundingClientRect().top + submitHeight,
                stickyEnd = window.innerHeight;

            if (stickyEnd < scroll) {
                $(self.handle).addClass('sticky-submit');
                placeHolder.style.height = submitHeight + 'px';
            } else {
                $(self.handle).removeClass('sticky-submit');
                placeHolder.style.height = 'auto';
            }
        }

        scrollStickyBar();
        Sprout.Utils.scrolling(scrollStickyBar);
    },

    initSproutlets: function() {
        var self = this;
        var sproutletList = this.handle.querySelectorAll('.fieldset-list fieldset');

        this.sproutletCount = sproutletList.length;

        if(sproutletList.length === 0) {
            return this.addSproutlet();
        } else if (sproutletList.length === 1) {
            $(this.handle).addClass('disable-remove-child');
            $(this.handle).removeClass('disable-add-child');
        } else if (sproutletList.length === 10) {
            $(this.handle).addClass('disable-add-child');
            $(this.handle).removeClass('disable-remove-child');
        } else {
            $(this.handle).removeClass('disable-add-child');
            $(this.handle).removeClass('disable-remove-child');
        }

        _.each(sproutletList, function(sproutletNode) {
                //initialize validation for this child
                sproutletNode.querySelector('.remove-sproutlet').addEventListener('click', self.removeSproutlet.bind(self));
        });
    },

    onTabChange: function(event) {
        if ($(this.handle).hasClass('selected')) {
            document.removeEventListener('tabchange', this.onTabChange.bind(this));
            this.initSubmitStickyBar();
        }
    },

    /**
     * Add new sproutlet fieldset
     * @return {void}
     */
    addSproutlet: function() {
        var sproutletNode, fieldLabel,
            self = this,
            sproutletList = this.handle.querySelector('.fieldset-list');

        if (sproutletList && sproutletList.childElementCount < 10) {
            sproutletNode = this.handle.querySelector('.clone-fieldset fieldset');
            sproutletNode = sproutletNode.cloneNode(true);
            sproutletList.appendChild(sproutletNode);

            //initialize validation for this child
            sproutletNode.querySelector('.remove-sproutlet').addEventListener('click', this.removeSproutlet.bind(this));

            this.sproutletCount ++;

            //Update sproutlets Ids
            _.each(sproutletNode.querySelectorAll('input'), function(field) {
                field.id += self.sproutletCount;
            });

            fieldLabel = sproutletNode.querySelector('.special-needs label');

            if (fieldLabel) {
                fieldLabel.setAttribute('for', fieldLabel.getAttribute('for') + self.sproutletCount);
            }

            Sprout.Components._init(sproutletNode);
            Sprout.Polyfills.placeholder(sproutletNode);

            if (sproutletList.childElementCount === 1) {
                $(this.handle).addClass('disable-remove-child');
                $(this.handle).removeClass('disable-add-child');
            } else if (sproutletList.childElementCount === 10) {
                $(this.handle).addClass('disable-add-child');
                $(this.handle).removeClass('disable-remove-child');
            } else {
                $(this.handle).removeClass('disable-add-child');
                $(this.handle).removeClass('disable-remove-child');
            }

            if (this.steps[2]) {
                this.steps[2].init();
            }
        }
    },

    /**
     * Remove sproutlet fieldset
     * @param  {Event}      event           Remove sproutlet click event
     * @return {void}
     */
    removeSproutlet: function(event) {
        var sproutletNode,
            sproutletList = this.handle.querySelector('.fieldset-list');

        if (sproutletList.childElementCount > 1) {
            sproutletNode = Sprout.Utils.getParentMatch(event.target, 'fieldset');
            sproutletList.removeChild(sproutletNode);

            this.steps[2].init();
        }

        if (sproutletList.childElementCount === 1) {
            $(this.handle).addClass('disable-remove-child');
        }
        $(this.handle).removeClass('disable-add-child');
    },

    /**
     * Check Email service callback
     * @param  {Event}      event           Service event response
     * @param  {object}     data            Event response
     * @return {void}
     */
    onCheckEmail: function(event, data, success) {
        var item;
        var error;
        Sprout.Utils.loader(false);
        if (data) {
            if (data.status === 'success') {
                if (success) {
                    success();
                }
            } else {
                error = data.message;
            }
        } else {
            error = 'Invalid Email';
        }

        if (error) {
            this.mailStep.error('mail', error);
            Sprout.Utils.scrollPage(this.mailStep.handle.querySelector('.field-item.error'), 50);
        }
    },

    emailChanged: function(event) {
        var passwordField = this.mailStep.handle.querySelector('#current_pass');
        if (this.mail === event.target.value) {
            passwordField.disabled = true;
            $(this.handle).removeClass('update-password');
        } else {
            passwordField.disabled = false;
            $(this.handle).addClass('update-password');
        }
    },

    /**
     * Check user's email existence in the platform
     * @return {void}
     */
    checkEmail: function(success) {
        var self = this,
            stepData = this.mailStep.submission();

        Sprout.Utils.loader(true);
        Sprout.Services.checkEmail(stepData.mail, function(event, data) {
            self.onCheckEmail(event, data, success);
        });
    },

    /**
     * Manage the transition between steps
     * @param  {Event}      event        Next Step click event
     * @return {void}
     */
    onNext: function(event) {
        var self = this;
        var goToNextStep = false;
        var formStep = Sprout.Utils.getParentMatch(event.target, '.form-step');

        event.stopPropagation();
        event.preventDefault();

        switch (formStep.id) {
            case 'account-info':
                if(getBirthdayCookie() == true) return;
                this.checkEmail(function() {
                    if (self.steps[1]) {
                        $(self.steps[1].handle).addClass('active');
                        Sprout.Utils.scrollPage(self.steps[1].handle);
                    }
                });
                break;
            case 'account-submit':
                if(getBirthdayCookie() == true) return;
                this.submit();
                break;
            case 'account-about-you':

                if(getBirthdayCookie() == true) {
                    $('.dob').addClass('error');
                    return;
                }

                function pad(n) {
                    return (n < 10) ? ("0" + n) : n;
                }

                var month = pad(self.steps[1].fields[2].value);
                var day = pad(self.steps[1].fields[3].value);
                var year = pad(self.steps[1].fields[4].value);

                var years = Math.floor(moment().diff(year + '-' + month + '-' + day, 'years',true));

                if(years < 18){
                    var now = new Date();
                    now.setTime(now.getTime() + 24 * 3600 * 1000);
                    document.cookie = "birthday=birthday; expires=" + now.toUTCString() + "; path=/";

                    $('.dob').addClass('error');
                }else{
                    goToNextStep = true;
                }

                break;
            default:
                if(getBirthdayCookie() == true) return;
                goToNextStep = true;
                break;
        }

        if (goToNextStep) {
            var nextStepElement = this.handle.querySelector(event.target.hash);

            if (nextStepElement) {
                $(nextStepElement).addClass('active');
                Sprout.Utils.scrollPage(nextStepElement);
            }
        }
    },

    /**
     * Format account step submission data
     * @param  {Sprout.forms.step}       step           Form step to process data
     * @return {object}                                 Step submission data
     */
    getSumissionData: function(step){
        var stepData = step.submission();
        var fieldsetsCollection;

        switch (step.handle.id) {
            case 'account-info':
                stepData.confirm_password = null;
                delete stepData.confirm_password;
                break;

            case 'account-about-you':
                stepData.field_user_fiest = Sprout.Utils.getWebformValue(stepData.field_user_fiest);
                stepData.field_user_last = Sprout.Utils.getWebformValue(stepData.field_user_last);
                stepData.field_user_zip_code = Sprout.Utils.getWebformValue(stepData.field_user_zip_code);
                if (stepData.dob_year) {
                    stepData.field_coppa_lite_dob = {
                        'und': [
                            {
                                'value': {
                                    'day': stepData.dob_day,
                                    'month': stepData.dob_month,
                                    'year': stepData.dob_year,
                                    'hour': '0',
                                    'minute': '0',
                                    'ampm': 'am'
                                }
                            }
                        ]
                    };
                    delete stepData.dob_day;
                    delete stepData.dob_month;
                    delete stepData.dob_year;
                }
                break;

            case 'account-sproutlets':
                fieldsetsCollection = stepData.fieldsets;
                stepData = {
                    'field_user_sproutlet': {
                        'und': []
                    }
                };
                _.each(fieldsetsCollection, function(sproutletSet) {
                    var sproutletData = {
                        'field_state': Sprout.Utils.getWebformValue(sproutletSet.field_state, 'select'),
                        'field_user_kid_city': Sprout.Utils.getWebformValue(sproutletSet.field_user_kid_city),
                        'field_user_kid_first': Sprout.Utils.getWebformValue(sproutletSet.field_user_kid_first),
                        'field_user_kid_dob': {
                            'und': [
                                {
                                    'value': {
                                        'day': sproutletSet.sproutlet_dob_day,
                                        'month': sproutletSet.sproutlet_dob_month,
                                        'year': sproutletSet.sproutlet_dob_year,
                                        'hour': '0',
                                        'minute': '0',
                                        'ampm': 'am'
                                    }
                                }
                            ]
                        },
                        'field_user_kid_special_needs': Sprout.Utils.getWebformValue(sproutletSet.field_user_kid_special_needs, 'checkbox'),
                    };
                    stepData.field_user_sproutlet.und.push(sproutletData);
                });
                break;

            case 'account-newsletter':
                stepData.field_newsletter = Sprout.Utils.getWebformValue(stepData.field_newsletter, 'checkbox');
                break;

            case 'account-submit':
                if (!this.options.edit) {
                    stepData.field_user_terms_privacy = Sprout.Utils.getWebformValue(stepData.field_user_terms_privacy, 'checkbox');
                    if (stepData.field_newsletter) {
                        stepData.field_newsletter = Sprout.Utils.getWebformValue(stepData.field_newsletter, 'checkbox');
                    }
                }
                break;
        }

        stepData.fieldsets = null;
        delete stepData.fieldsets;

        return stepData;
    },

    /**
     * Submit registration data
     * @return {void}
     */
    submit: function() {
        var self = this;
        var missingStep;

        //Check all steps
        _.each(this.steps, function(step) {
            if (!step.onNextStep() && !missingStep) {
                missingStep = step;
            }
        });

        if (missingStep) {
            Sprout.Utils.scrollPage(missingStep.handle.querySelector('.field-item.error'), 50);
        } else {
            var data = {};
            _.each(self.steps, function(step) {
                data = _.extend(self.getSumissionData(step), data);
            });
            if (this.options.type === 'update-account' && this.mail === data.mail) {
                Sprout.Utils.loader(true);
                self.webform.submit(data, self.onSubmit.bind(self));
            } else {
                if (this.options.type === 'update-account') {
                    //data.current_pass
                }
                this.checkEmail(function() {
                    Sprout.Utils.loader(true);
                    self.webform.submit(data, self.onSubmit.bind(self));
                });
            }
        }
    },

    processErrors: function(result) {
        var key, message, step, index, keyIndex,
            firstStep = null,
            stepIndex = 10;
        try {
            result = JSON.parse(result);

            for (key in result.form_errors) {
                message = result.form_errors[key];
                key = key.split('][');
                index = null;
                stepIndex = null;
                keyIndex = 0;

                switch (key[0]) {
                    case 'mail':
                        stepIndex = (this.options.type === 'update-account')? 1 : 0;
                        break;

                    case 'pass':
                        stepIndex = 0;
                        break;

                    case 'current_pass':
                    case 'field_coppa_lite_dob':
                    case 'field_user_zip_code':
                        stepIndex = 1;
                        break;

                    case 'field_user_sproutlet':
                        stepIndex = 2;
                        index = parseInt(key[2]);
                        keyIndex = 3;
                        message = null;
                        break;

                    case 'field_user_terms_privacy':
                        stepIndex = 3;
                        message = null;
                        break;
                }

                if (stepIndex !== null) {
                    step = this.steps[stepIndex];
                    step.error(key[keyIndex], message, index);

                    if (firstStep === null || firstStep > stepIndex) {
                        firstStep = stepIndex;
                    }
                }
            }

            if (firstStep !== null) {
                Sprout.Utils.scrollPage(this.handle.querySelector('.field-item.error'), 50);
            }
        } catch (e) {
        }
    },

    /**
     * On Register callback
     * @param  {Event}      event           Service event response
     * @param  {object}     data            Event response
     * @return {void}
     */
    onSubmit: function(ajax, data) {
        var self = this;
        var stepData;
        var onSuccessEvent;
        if (data) {
            if (!this.options.edit) {
                stepData = this.steps[0].submission();
                Sprout.Services.login(data.username, stepData.pass, function() {
                    var sUrl = null;
                    if (self.options.destination && self.options.destination !== 'user') {
                        sUrl = self.options.destination;

                        if (sUrl.indexOf('/') !== 0) {
                            sUrl = '/' + sUrl;
                        }

                        document.location.href = sUrl;
                    } else {
                        document.location.href = '/user/register/success';
                    }

                });
            } else {
                //document.location.reload(true);

                onSuccessEvent = document.createEvent('Event');
                onSuccessEvent.initEvent('accountSuccess', true, true);
                self.handle.dispatchEvent(onSuccessEvent);
                Sprout.Utils.loader(false);
            }
        } else {
            this.processErrors(ajax.responseText);
            Sprout.Utils.loader(false);
        }
    }
};



Sprout.forms = {};
// =========================================================== //
// To Do: Merge this with S2S.step
/**
 * Simple Sprout Forms Step controller
 * @return {Sprout.Forms.step} A Sprout Forms Step object
 */
Sprout.forms.step = function(handle) {
    this.handle = handle;
    this.handle.step = this;
    this.complete = false;
    this.options = Sprout.Utils.getDataOptions(this.handle);
    this.setComplete(!this.options.required);

    this.validator = new Validator();                       // disabled required steps by default

    var nextStepCta = this.handle.querySelector('.form-next');
    if (nextStepCta) {
        nextStepCta.addEventListener('click', this.onNextStep.bind(this));
    }

    if (!this.options.edit) {
        Sprout.Utils.resetForm(this.handle);
    }

    this.init();
};
Sprout.forms.step.prototype = {

    /**
     * Init Forms steps depending on its type
     */
    init: function() {
        var self = this;

        this.fields = this.handle.querySelectorAll('input, textarea');          // works for file upload, video, text, message, poll
        this.fieldItems = this.handle.querySelectorAll('.field-item');

        _.each(this.fields, function(field) {
            field.removeEventListener('change', self.validate.bind(self));
            field.addEventListener('change', self.validate.bind(self));
            field.removeEventListener('keyup', self.validate.bind(self));
            field.addEventListener('keyup', self.validate.bind(self));
        });

        if (!this.options.edit) {
            this.validate();
        }
    },

    /**
     * Validate step status
     * @return {void}
     */
    validate: function() {
        var isValid = _.every(this.fields, function(field) {
            var value = $(field).val();
            return field.disabled || !field.required || (value && value !== '');
        });

        this.setComplete( isValid );

        return isValid;
    },

    /**
     * Set step status
     * @param  {boolean}    status
     * @return {void}
     */
    setComplete: function(status) {
        this.complete = status;

        if (this.complete) {
            $(this.handle).addClass('done');
        } else {
            $(this.handle).removeClass('done');
        }
    },

    /**
     * Prevent user transitioning to the next step if the current step is not complete
     * @return {void}
     */
    onNextStep: function(event) {
        var self = this;
        var isValid = this.complete;
        if (this.complete || !event || this.options.edit || this.options.displayErrors) {
            _.each(this.fieldItems, function(fieldItem) {
                isValid = self.validator.check(fieldItem) && isValid;
            });
            this.setComplete(isValid);
        }

        if (!this.complete && event) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }

        return this.complete;
    },

    /**
     * Returns form step submission object
     * @return {object} submission object
     */
    submission: function() {
        var fieldsets = this.handle.querySelectorAll('fieldset');
        var values = Sprout.Utils.getFormValues(this.handle);

        values.fieldsets = [];
        _.each(fieldsets, function(fieldset, index) {
            values.fieldsets[index] = Sprout.Utils.getFormValues(fieldset);
        });

        return values;
    },

    error: function(field, message, index) {
        var fieldItem, fieldError,
            fieldset = this.handle;

        if (_.isNumber(index)) {
            fieldset = this.handle.querySelectorAll('fieldset')[index];
        }

        if (fieldset && message !== '') {
            fieldItem = fieldset.querySelector('.' + field);
            $(fieldItem).addClass('error error-service');

            if (message) {
                fieldError = fieldItem.querySelector('.errors-list .error-service');
                if (fieldError) {
                    fieldError.innerHTML = message.replace(/&amp;/g, '&');
                }
            }
        }
    }
};



Sprout.Pages['account-birthdays'] = function(element) {
    this.handle = element;
    this.sproutlets = {};
    $(this.handle).addClass('loading');
    Sprout.Services.getSproutlets(this.init.bind(this));
};
Sprout.Pages['account-birthdays'].prototype = {
    init: function(event, data) {
        $(this.handle).removeClass('loading');

        _.each(data, this.initSproutlet.bind(this));
    },

    setActivateCheckbox: function(sproutlet, status) {
        var activateCheckbox = document.getElementById('activate-sproutlet-homepage-' + sproutlet.data.item_id);
        //activateCheckbox.disabled = false;
        activateCheckbox.checked = status;
        //activateCheckbox.disabled = true;
    },

    initSproutlet: function(data, key) {
        var self = this;
        this.sproutlets[key] = {
            handle: document.getElementById('birthday-sproutlet-' + key),
            data: data,
            steps: [],
            submission: {},
            ready: 0
        };

        _.each(this.sproutlets[key].handle.querySelectorAll('[data-S2S]'), function(step) {
            var type = step.getAttribute(['data-S2S']);
            var s2sStep = new Sprout.S2S.step(step, type);
            self.sproutlets[key].steps.push( s2sStep );

            //Initialize steps from service
            var stepDatum;
            if (data[s2sStep.options.form_key].und && data[s2sStep.options.form_key].und[0]) {
                switch (s2sStep.options.form_key) {
                    case 'field_user_kid_color':
                        stepDatum = data[s2sStep.options.form_key].und[0].rgb;
                        break;
                    case 'field_user_kid_photo':
                        stepDatum = data[s2sStep.options.form_key].und[0];
                        break;
                    default:
                        stepDatum = data[s2sStep.options.form_key].und[0].value;
                        break;
                }
            }
            if (!stepDatum) {
                stepDatum = s2sStep.options.default;
            }

            s2sStep.setValue(stepDatum);
        });

        this.setActivateCheckbox(this.sproutlets[key], _.every(this.sproutlets[key].steps, _.iteratee('complete')));

        var saveButton = this.sproutlets[key].handle.querySelector('.actions input');
        saveButton.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();

            self.saveSproutletBirthday(self.sproutlets[key]);
        });

        var clearLink = this.sproutlets[key].handle.querySelector('.actions span');
        clearLink.addEventListener('click', function() {
            self.resetSproutlet(self.sproutlets[key]);
        });

        $(this.sproutlets[key].handle).addClass('hide-errors');
    },

    doSubmit: function(sproutlet) {
        var self = this;
        if (this.submitting) {
            return;
        }

        this.submitting = true;
        var onSuccessEvent;
        var submissionData = _.extend(sproutlet.data, sproutlet.submission);
        Sprout.Services.setSproutlet(submissionData, function() {
            sproutlet.data = submissionData;
            self.setActivateCheckbox(sproutlet, _.every(sproutlet.steps, _.iteratee('complete')));
            Sprout.Utils.loader(false);

            onSuccessEvent = document.createEvent('Event');
            onSuccessEvent.initEvent('accountSuccess', true, true);
            self.handle.dispatchEvent(onSuccessEvent);
            self.submitting = false;
        });
    },

    buildSubmissionData: function(sproutlet, datum) {
        if (datum) {
            var valueObj =  {'und': [{}]};
            var valueName = 'value';
            switch (datum.form_key) {
                case 'field_user_kid_color':
                    valueName = 'rgb';
                    break;
                case 'field_user_kid_photo':
                    valueName = 'fid';
                    break;
            }
            valueObj.und[0][valueName] = datum.values[0];
            sproutlet.submission[datum.form_key] = valueObj;

            sproutlet.ready++;
            if (sproutlet.ready >= 2) {
                this.doSubmit(sproutlet);
            }
        }
    },

    saveSproutletBirthday: function(sproutlet) {
        var self = this;
        var datum;

        $(sproutlet.handle).addClass('hide-errors');
        var missingSteps = _.reject(sproutlet.steps, function(step) {
            step.validate();
            return step.complete;
        });

        if (missingSteps.length) {
            if (missingSteps.length >= 2) {
                sproutlet.submission = {};
                _.each(sproutlet.steps, function(step){
                    sproutlet.submission[step.options.form_key] = { 'und': [] };
                });
                Sprout.Utils.loader(true);
                this.doSubmit(sproutlet);
            } else {
                Sprout.Utils.scrollPage(missingSteps[0].handle);
                $(sproutlet.handle).removeClass('hide-errors');
            }
        } else {
            sproutlet.submission = {};
            sproutlet.ready = 0;
            Sprout.Utils.loader(true);
            _.each(sproutlet.steps, function(step){
                if (step.complete) {
                    self.buildSubmissionData(sproutlet, step.submission(function(datum) {
                        //After file upload
                        self.buildSubmissionData(sproutlet, datum);
                    }));
                }
                return !step.complete;
            });
        }
    },

    resetSproutlet: function(sproutlet) {
        _.each(sproutlet.steps, function(step){
            step.setValue(step.options.default);
        });

        this.setActivateCheckbox(sproutlet, false);
        $(sproutlet.handle).addClass('hide-errors');
    }
};

/**
 * Sprout Homepage prototype
 * @return {Sprout.Pages.shows} A Sprout Homepage object
 */
Sprout.Pages['activities'] = function(element) {

    function onViewUpdate() {
        Sprout.Utils.animateIn('.fx-fadein', 0);
    }

    //Catch view panel update event
    element.addEventListener('viewPanelUpdate', onViewUpdate);
};


/**
 * Sprout Homepage prototype
 * @return {Sprout.Pages.home} A Sprout Homepage object
 */
Sprout.Pages['birthday-card'] = function(element) {
    $(element).addClass('locked');

    this.handle = element;
    this.options = Sprout.Utils.getDataOptions(this.handle);
    this.validator = new Validator();

    setTimeout(this.onAuthentication.bind(this));
};
Sprout.Pages['birthday-card'].prototype = {

    /**
     * Gets user data from service response
     * @param  {Event}      event        Service event
     * @param  {Object}     data         Data returned by service
     * @return {void}
     */
    onAuthentication: function() {
        if (Sprout.Utils.isUserAuthenticated) {
            $(this.handle).removeClass('locked');
            this.webform = new Sprout.Webform('sprout_birthday_card', 'entityform');
            // Only initialize S2S submission after user authentication state is confirmed
            this.initializeSubmission();
        }
    },

    /**
     * Initializes preview and submit steps
     * @return {void}
     */
    initializeSubmission: function() {
        var self = this;
        // Add Sproutlet
        new Sprout.Sproutlet.create(this.handle.querySelector('.sproutlet-create'),
                                    this.sproutletAdded.bind(this));

        var buttons = this.handle.querySelectorAll('.submit-form .submit');
        _.each(buttons, function(button) {
            button.addEventListener('click', self.onSubmit.bind(self));
        });

        this.serviceError = this.handle.querySelector('.service-error');
        this.submitForm = this.handle.querySelector('.submit-form');
    },

    /**
     * Validate step status
     * @return {void}
     */
    validate: function() {
        return this.validator.check(this.submitForm.querySelector('.fields .field-item'));
    },

    /**
     * Return data of selected sproutlet
     * @return {object}
     */
    getSelectedSproutletData: function() {
        var sproutlet = this.handle.querySelector('.sproutlet-list .selected');
        if (sproutlet) {
            var sproutletOptions = Sprout.Utils.getDataOptions(sproutlet);
            if (sproutletOptions) {
                return {
                    // This is the existent id of the user_sproulet
                    "field_user_sproutlet":{
                        "und":[
                            {
                                "value":sproutletOptions.id,
                                "revision_id":sproutletOptions.id
                            }
                        ]
                    },

                    //sproutlet name
                    "field_bef_sproutlet_name":{
                        "und":[
                            {
                                "value":sproutletOptions.sproutlet_name
                            }
                        ]
                    },

                    //sproutlet birthday
                    "field_bef_sproutlet_birthday":{
                        "und":[
                            {
                                "value":sproutletOptions.sproutlet_birthday
                            }
                        ]
                    },

                    //sproutlet state
                    "field_bef_sproutlet_state":{
                        "und":[
                            {
                                "value":sproutletOptions.sproutlet_state
                            }
                        ]
                    },
                    //Sproutlet hometown
                    "field_bef_sproutlet_hometown":{
                        "und":[
                            {
                                "value":sproutletOptions.sproutlet_hometown
                            }
                        ]
                    }
                };
            }
        }

        return null;
    },
    /**
     * Handles the service response for adding a sproutlet. Add it to the list and select it.
     * @param  {Object}      sproutlet        Sproutlet data object
     * @return {void}
     */
    sproutletAdded: function (event, sproutlet) {
        if (event) {
            // Error
        } else {
            var sproutletList = this.handle.querySelector('.sproutlet-list .wrap');
            var addSproutletElement = this.handle.querySelector('.sproutlet-list .add-new-sproutlet');
            var stringItem = '<div>' + sproutlet.sproutlet_name + ', ' + Sprout.Utils.getAge(sproutlet.sproutlet_birthday) + ' yrs</div>';
            stringItem += '<div class="sproutlet-location">' + sproutlet.sproutlet_hometown + ', ' + sproutlet.sproutlet_state + '</div>';

            var listItem = document.createElement('li');
            listItem.id = sproutlet.id;

            listItem.setAttribute('data-options', JSON.stringify(sproutlet));

            // add the item text
            listItem.innerHTML = stringItem;

            // add listItem to the listElement
            sproutletList.insertBefore(listItem, addSproutletElement);

            var selectedSproutlet = this.handle.querySelector('.sproutlet-list .selected');
            if (selectedSproutlet) {
                $(selectedSproutlet).removeClass('selected');
            }

            $(listItem).addClass('sproutlet selected combobox-item');

            var sproutletForm = this.handle.querySelector('.adding-sproutlet');
            if (sproutletForm) {
                $(sproutletForm).removeClass('adding-sproutlet');
            }
        }
    },

    getEntityformData: function () {
        return _.extend(this.getSelectedSproutletData(), {
            // Terms of use
            "field_bday_tou": {
                "und": [
                    {
                        "value": "1"
                                }
                            ]
            },
            // Privacy policy
            "field_kk_tou": {
                "und": [
                    {
                        "value": "1"
                                }
                            ]
            },
            // Liscence and release
            "field_opt_in": {
                "und": [
                    {
                        "value": "1"
                                }
                            ]
            }
        });
    },

    /**
     * Submit submission once all the required fields are completed
     * @return {void}
     */
    onSubmit: function (event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        $(this.serviceError).removeClass('error');

        if ($(this.handle).hasClass('submitting')) {
            return;
        }

        if (this.validate()) {
            Sprout.Utils.loader(true);
            $(this.handle).addClass('submitting');

            this.submit(this.getEntityformData());
        }
    },

    /**
     * Submit webform with submission data
     * @param  {object} submissionData      Accumulated submission data
     * @return {void}
     */
    submit: function (submissionData) {
        this.webform.submit(submissionData, this.onCardSubmission.bind(this));
    },

    /**
     * Handle entityform submission response
     * @return {void}
     */
    onCardSubmission: function (event, data) {
        var errors = [];
        Sprout.Utils.loader(false);
        if (event || (data && data.status === 500)) {
            $(this.handle).removeClass('submitting');
            Sprout.Utils.loader(false);
            $(this.serviceError).addClass('error');
            for (var key in data) {
                if (key !== 'status') {
                    errors.push('<li class="error">' + data[key] + '</li>');
                }
            }
            this.serviceError.querySelector('ul').innerHTML = errors.join('');
        } else {
            //Ready
            $(this.submitForm).addClass('done');
        }
    }
};

/**
 * Sprout Games Landing prototype
 * @return {Sprout.Pages.games} A Sprout Games object
 */
Sprout.Pages['character'] = function(element) {

    var bounces = element.querySelectorAll('.audio');

    // _.each(bounces, function(element) {
    //     var delay = Math.random() * 4000;               // between 0 -> 4 seconds
    //     setTimeout(function() {
    //         $(element).addClass('fx-wiggle');
    //     }, delay);
    // });

    _.each(bounces, function(element) {
        $(element).addClass('fx-wiggle');
        setTimeout(function() {
            $(element).removeClass('fx-wiggle');
        }, 1000);
    });

};

Sprout.Pages['character'].prototype = {

};



/**
 * Sprout Game Detail prototype
 * @return {Sprout.Pages.game} A Sprout Game Page object
 */
Sprout.Pages['game'] = function(element) {
    var redirect = document.querySelector('section:not(.panel) .redirect');
    
    if(redirect) {
        redirect = redirect.getAttribute('data-redirect');
        document.location.href = redirect;
    } else if (document.querySelector('main.game-detail > .blocker')){
        // Wait until all components has been initialized
        setTimeout(Sprout.Components.login.open);
    }

    // var redirect = $(element).getDataAttribute('data-redirect');
    // if(Sprout.Utils.isMobile && redirect) {
    //     window.location.replace(window.location.origin + redirect);
    // }

    function onViewUpdate() {
        Sprout.Utils.animateIn('.fx-fadein', 0);
    }

    // Catch view panel update event
    element.addEventListener('viewPanelUpdate', onViewUpdate);

    function resizeIframe(iframe, ratio) {
        iframe.style.width = (iframe.offsetWidth * ratio) + 'px';
        iframe.style.height = (iframe.offsetHeight * ratio) + 'px';
    }

    function onResize() {
        var width = window.innerWidth,
            height = window.innerHeight,
            iframe = document.querySelector('#iframe > iframe');

        if (iframe.offsetWidth > width) {
            var ratio = width / iframe.offsetWidth;
            resizeIframe(iframe, ratio);
        }
        else {
            var maxWidth = parseInt(iframe.getAttribute('data-width'));

            if (width > maxWidth) {
                width = maxWidth;
            }

            var ratio = width / iframe.offsetWidth;
            resizeIframe(iframe, ratio);
        }

        if (iframe.offsetHeight > height) {
            var ratio = height / iframe.offsetHeight;
            resizeIframe(iframe, ratio);
        }
    };

    if ($('body').hasClass('mobile')) {
        $('html').addClass('mobile');
        $('html, body').addClass('html5-game');

        window.addEventListener('orientationchange', onResize);
        window.addEventListener('touchend', onResize);
        window.addEventListener('resize', onResize);

        window.onload = function() {
          onResize();
        };
    }
};

Sprout.Pages['game'].prototype = {

};



/**
 * Sprout Games Landing prototype
 * @return {Sprout.Pages.games} A Sprout Games object
 */
Sprout.Pages['games'] = function(element) {
    // Sprout.Utils.animateIn('.fx-fadein');
    this.filterify();

    function onViewUpdate() {
        Sprout.Utils.animateIn('.fx-fadein', 0);
    }

    //Catch view panel update event
    element.addEventListener('viewPanelUpdate', onViewUpdate);
};

Sprout.Pages['games'].prototype = {

    filterify: function() {
        // do stuffs
    }
};


/**
 * Sprout Homepage prototype
 * @return {Sprout.Pages.home} A Sprout Homepage object
 */
Sprout.Pages['home'] = function(element) {

    // this.animateify();

    function populateSproutlets(sproutletsObj) {
        var hero = document.querySelector('.hero'),
            sproutletsWrapper = document.querySelector('.birthday-hero-wrapper'),
            structureContainer = sproutletsWrapper.querySelector('.container'),
            sproutletContainer = sproutletsWrapper.querySelectorAll('.container-birth');

        var quantity = Object.keys(sproutletsObj).length,
            classQuantity = (quantity % 2)+2;

        $(sproutletsWrapper).addClass('active');

        _.each(sproutletsObj, function(sproutlet){
            var sproutletStructure = sproutletContainer[0].cloneNode(true),
                sproutletPicture = sproutletStructure.querySelector('.picture');

            if(!_.isEmpty(sproutlet.field_user_kid_first) && !_.isEmpty(sproutlet.field_user_kid_message) && !_.isEmpty(sproutlet.field_user_kid_photo) && !_.isEmpty(sproutlet.field_user_kid_color)) {
                sproutletStructure.querySelector('.sproutlet-name').innerHTML = sproutlet.field_user_kid_first.und[0].safe_value;
                sproutletStructure.querySelector('p').innerHTML = Sprout.Utils.nl2br(sproutlet.field_user_kid_message.und[0].safe_value);
                sproutletPicture.querySelector('img').setAttribute('src', sproutlet.field_user_kid_photo.und[0].uri);
                $(sproutletPicture).removeClass('birthday-ribbon');

                structureContainer.appendChild(sproutletStructure);

                if (quantity === 1){
                    hero.setAttribute('style', 'background-color:' + sproutlet.field_user_kid_color.und[0].rgb + ';');
                    $(sproutletPicture).addClass('birthday-ribbon');
                }
                else{
                    $(sproutletsWrapper).addClass('birthday-ribbon');
                    $(sproutletStructure).addClass('sproutlet-birth sproutlet-birth-'+classQuantity);
                }
                $(hero).addClass('birthday-hero');
            }
            else {
                //Show carousel
                $(hero).addClass('show-carousel');
            }

        });
        //remove original structure
        structureContainer.removeChild(structureContainer.childNodes[1]);
    }

    function checkSproutletTodayBirthdays() {
        var hero = document.querySelector('.hero');

        Sprout.Services.getSproutletTodayBirthdays(function(event, data) {
            if(!_.isEmpty(data)) {
                //populate the Sproutlet info (also twins and triplets)
                populateSproutlets(data);
            }
            else {
                //Show carousel
                $(hero).addClass('show-carousel');
            }
        });
    }

	function init() {
        checkSproutletTodayBirthdays();
    }

    init();
};

Sprout.Pages['home'].prototype = {
    // animateify: function() {
    //     var animatables = document.querySelectorAll('.fx-fadein');
    //     Sprout.Utils.animateIn(animatables, 50);
    // }
};

/**
 * Sprout now-leaving prototype
 * @return {Sprout.Pages.now_leaving} A Sprout page object
 */
Sprout.Pages['now-leaving'] = function (element) {

    function init() {
        var stayOnSite = element.querySelector('.cta-secondary');

        stayOnSite.addEventListener('click', function (e) {

            if (document.referrer) {
                window.location = document.referrer;
            }

            if (history.lenght > 1) {
                history.back(-1);
            }

            //Ad opens a new tab/window so close it.
            window.close();
        });
    }

    init();
};

/**
 * Sprout Sweepstakes prototype
 * @return {Sprout.Pages['promotionPage']} A Sprout Sweepstakes object
 */
Sprout.Pages['promotionPage'] = function(element) {
    this.handle = element;

    // Jump to content section on thank you page
    if (document.querySelectorAll('.promotion-page__thankyou').length == 1) {
        location.href = "#sweepstakesForm";
    }

    // If on thankyou or gallery page, do not load; not required any further
    if (this.handle.classList.contains('promotion-page__thankyou') || this.handle.classList.contains('promotion-page__gallery')) {
        return;
    }

    this.init();

    var fileInput = this.handle.querySelector('.file_upload .form-file');
    fileInput.addEventListener('change', checkFile, false);

    function checkFile(event) {
        var typeError = document.querySelectorAll('.file-upload-js-error');
        if (typeError.length == 1) {
            jQuery('.file-upload-js-error').remove();
            jQuery('.file_upload').addClass('alert-type');
        }
    }
};

Sprout.Pages['promotionPage'].prototype = {
    init: function() {
        var self = this;

        this.handle.querySelector('form').addEventListener('submit', this.submit.bind(this));

        // Handling Character Count on field_submission_body
        var submissionBody = document.getElementById('edit-field-submission-body-und-0-value');
        if (submissionBody) {
            var maxCharsOutput = document.querySelector('.submission-count__left');
            var maxChars = maxCharsOutput.innerHTML;
            maxChars = parseInt(maxChars);

            submissionBody.onkeyup = function () {
              maxCharsOutput.innerHTML = maxChars - this.value.length;
            };
        }

        var fileElement = this.handle.querySelector('.file_upload');

        this.options = Sprout.Utils.getDataOptions(fileElement);

        //Initialize drag and drop component
        //Using this for photo only, no drag and drop on the promotions
        this.fileComponent = new Sprout.Components.dragAndDrop(fileElement, this.options.formats, this.options.preview, this.options.sizeLimit,
            function(file) {
                self.file = file;
            }
        );
    },

    submit: function(event) {
        var isValid = true;
        var validatorInstance = new Validator();

        var items = this.handle.querySelectorAll('.field-item');
        _.each(items, function(item) {
            isValid = validatorInstance.check(item) && isValid;
        });

        if (isValid) {
            Sprout.Utils.loader(true);
        } else {
            event.stopPropagation();
            event.preventDefault();
        }
    },
};
/**
 * Sprout Quiz Question prototype
 * @return {Sprout.Pages.quiz} A Sprout Quiz page object
 */
Sprout.Pages['question'] = function(element) {
  setTimeout(function() {
    window.scrollTo(0,0);
  }, 250);

  // On initial load of question page, toggle to answered state if answered
  window.scrollTo(0, 0);
  if(Cookies.getJSON('answers')) {
    if(Cookies.getJSON('answers').hasOwnProperty(window.location.pathname)) {
      $(element).addClass('answered');

      var storedAnswers = Cookies.getJSON('answers')[window.location.pathname];
      Drupal.settings.QUIZ.answers.forEach(function(answer, index) {
        storedAnswers.forEach(function(storedAnswer) {
          if(answer.answer === storedAnswer.answer) {
            var response = jQuery('.facts-container > p')[index];
            jQuery(response).css('display', (isMultipleChoice ? 'inline-block' : 'block'));
          }
        });
      });


      var progress = calculateQuizProgress();
      if(progress >= 100) {
        setupQuizResultButton();
      } else {
        setupNextQuestionButton();
      }
    } else {
      $(element).addClass('unanswered');
    }
  } else {
    $(element).addClass('unanswered');
  }

  var isSingleChoice = false;
  var isMultipleChoice = false;
  if(jQuery(element).hasClass('single')) {
    isSingleChoice = true;
  } else if(jQuery(element).hasClass('multiple')) {
    isMultipleChoice = true;
  }

  // Set cookie for answered question
  // with question path, answer and result it influences
  function registerAnswers(answers) {
    var answer = {};
    answer[window.location.pathname] = answers;
    Cookies.set('answers',
      jQuery.extend(Cookies.getJSON('answers'), answer)
    );

    setProgress(calculateQuizProgress());
    window.scrollTo(0,0);
  };

  function setupNextQuestionButton() {
    var remainingQuestions = jQuery(Drupal.settings.QUIZ.questions).not(Object.keys(Cookies.getJSON('answers'))).get();
    var $button = jQuery('button#call-to-action');
    $button.text('Next Question');
    $button.on('click', function() {
      window.location.href = remainingQuestions[0];
    });
  };

  function setupQuizResultButton() {
    var $button = jQuery('button#call-to-action');
    var results = calculateQuizResult();

    var max = 0;
    var maxResult;
    Object.keys(results).forEach(function(result) {
      if(results[result] > max) {
        maxResult = result;
        max = results[result];
      }
    });

    $button.text('Get Your Results!');
    $button.on('click', function() {
      window.location.href = maxResult;
    });
  };

  // Register answers of horizontal style buttons (single choice)
  try {
    jQuery('.horizontal button').on('click', function(e) {
      $(element).addClass('answered');
      jQuery(this).toggleClass('active');

      var index = jQuery(this).index();
      var response = jQuery('.facts-container > p')[index];
      jQuery(response).css('display', (isMultipleChoice ? 'inline' : 'block'));

      var answer = Drupal.settings.QUIZ.answers[index];
      registerAnswers([answer]);

      var progress = calculateQuizProgress();
      if(progress === 100) {
        setupQuizResultButton();
      } else {
        setupNextQuestionButton();
      }
    });
  } catch(error) {
  }

  // Register answers of vertical style buttons (multiple choice)
  try {
    var answers = [];
    var responses = [];
    var indices = [];
    jQuery('.vertical button:not(.submit)').on('click', function(e) {
      var answer = $(e.target).text();
      var index = jQuery(this).index();
      var response = jQuery('.facts-container > p')[index];

      if(isMultipleChoice) {
        var indexInAnswers = jQuery.inArray($(e.target).text(), answers);
        if(indexInAnswers > -1) {
          answers.splice(indexInAnswers, 1);
        } else {
          answers.push($(e.target).text());
        }

        jQuery(this).toggleClass('active');

        indices.push(index);
        responses.push(response);
      } else {
        $(element).addClass('answered');

        responses.forEach(function(response) {
          jQuery(response).css('display', (isMultipleChoice ? 'inline-block' : 'block'));
        });

        var answer = jQuery(Drupal.settings.QUIZ.answers).filter(
          function(index) {
            return jQuery.inArray(index, indices) > -1;
          });
        registerAnswers(answer.toArray());

        var progress = calculateQuizProgress();
        if(progress === 100) {
          setupQuizResultButton();
        } else {
          setupNextQuestionButton();
        }
      }

      if(answers.length > 0)
        jQuery('button.submit').removeClass('inactive');
      else
        jQuery('button.submit').addClass('inactive');
    });

    jQuery('.vertical button.submit').on('click', function(e) {
      $(element).addClass('answered');

      responses.forEach(function(response) {
        jQuery(response).css('display', (isMultipleChoice ? 'inline-block' : 'block'));
      });

      var answer = jQuery(Drupal.settings.QUIZ.answers).filter(
        function(index) {
          return jQuery.inArray(index, indices) > -1;
        });
      registerAnswers(answer.toArray());

      var progress = calculateQuizProgress();
      if(progress === 100) {
        setupQuizResultButton();
      } else {
        setupNextQuestionButton();
      }
    });
  } catch(error) {
  }

  // Calculate quiz completion progress
  function calculateQuizProgress() {
    if(Cookies.getJSON('answers'))
      return Math.round((100 / Drupal.settings.QUIZ.questions.length) * Object.keys(Cookies.getJSON('answers')).length);
    else
      return 0;
  };

  function calculateQuizResult() {
    var answers = Cookies.getJSON('answers');

    var results = {};
    Object.keys(answers).forEach(function(question) {
      var answer = answers[question];

      answer.forEach(function(ans) {
        if(results.hasOwnProperty(ans.result)) {
          results[ans.result] += 1 / answer.length;
        } else {
          results[ans.result] = 1 / answer.length;
        }
      });
    });

    return results;
  }

  setTimeout(function() {
    setProgress(calculateQuizProgress());
  }, 250);
}

/**
 * Sprout Quiz Page prototype
 * @return {Sprout.Pages.quiz} A Sprout Quiz page object
 */
Sprout.Pages['quiz-result'] = function(element) {
  jQuery(element).find('.retake-cta').on('click', function(e) {
    e.preventDefault();

    Cookies.remove('answers');
    window.location = this.href;
  });

  jQuery(element).find('.rewatch-cta').on('click', function(e) {
    e.preventDefault();

    Cookies.remove('seenQuizIntro');
    window.location = this.href;
  });
}


/**
 * Sprout Quiz Page prototype
 * @return {Sprout.Pages.quiz} A Sprout Quiz page object
 */
Sprout.Pages['quiz'] = function(element) {
  var currentSectionIndex = 0;
  var $sections = $('.quiz .fullpage-section');

  if(Cookies.get('seenQuizIntro')) {
    $('#quiz-main').addClass('fullpage-active');
  } else {
    $('#quiz-landing').addClass('fullpage-active');
  }

  function showSection() {
    $sections.each(function(index) {
      var section = $sections.els[index];
      $(section).toggleClass('fullpage-active', (index >= currentSectionIndex));
    });
  };

  function nextSlide() {
    if(++currentSectionIndex > $sections.length)
      currentSectionIndex = $sections.length - 1;

    window.scrollTo(0,0);
    showSection();
  };

  function previousSlide() {
    if(--currentSectionIndex < 0)
      currentSectionIndex = 0;

    showSection();
  };

  $('a.next-fullpage-section').on('click', function(e) {
    e.preventDefault();
    nextSlide();

    setTimeout(function() {
      Sprout.Utils.animateIn('.fx-fadein', 0);
    }, 600);

    Cookies.set('seenQuizIntro', true);

    // force video to reload to emulate pause functionality 
    // because PDK controller isn't working
    var $videoIframe = jQuery('#quiz-hero-video #sproutVideoIframe');
    var src = $videoIframe.attr('src');
    $videoIframe.attr('src', '');
    $videoIframe.attr('src', src);
  });

  $('a.previous-fullpage-section').on('click', function(e) {
    e.preventDefault();
    previousSlide();
  });

  // Toggle state of question tiles if answered
  // Also keep track of how many questions were answered
  // to calculate quiz progress
  var answeredLength = 0;
  var $questionTiles = jQuery('.question-tile');
  $questionTiles.each(function(index, element) {
    var href = jQuery(element).attr('href');
    if(Cookies.getJSON('answers')) {
      if(Cookies.getJSON('answers').hasOwnProperty(href)) {
        $(element).addClass('answered');
        answeredLength++;
      }
    }
  });

  var progress = Math.round((100 / $questionTiles.length) * answeredLength);
  setTimeout(function() {
    setProgress(progress);
  }, 250);

  var $firstTile = jQuery('.quiz-column:nth-of-type(1) .question-tile:nth-of-type(1)');
  if(!$firstTile.hasClass('answered')) {
    $firstTile.addClass('hover fx-wiggle-more');
  }
};

/**
 * Sprout Password Reset prototype
 * @return {Sprout.Pages['password-reset']} A Sprout Password Reset object
 */
Sprout.Pages['reset-password'] = function(element) {
    this.element = element;
    this.init();
};

Sprout.Pages['reset-password'].prototype = {
    init: function() {
        this.element.querySelector('form').addEventListener('submit', this.submit.bind(this));
    },

    submit: function(event) {
        var isValid = true;
        var validatorInstance = new Validator();

        var items = this.element.querySelectorAll('.field-item');
        _.each(items, function(item) {
            isValid = validatorInstance.check(item) && isValid;
        });

        if (isValid) {
            Sprout.Utils.loader(true);
        } else {
            event.stopPropagation();
            event.preventDefault();
        }
    }
};


/**
 * Sprout Schedule prototype
 * @return {Object} A Sprout Schedule Page object
 */
Sprout.Pages['schedule'] = function(element) {
    var jump = element.querySelector('.jump');
    var listings = element.querySelectorAll('#tv-listing li');

    if (jump) {
        jump.addEventListener('click', function(e) {
            var anchor = this.getAttribute('href');
            var to = document.querySelector(anchor);
            Sprout.Utils.scrollPage(to);
        });
    }

    if (listings) {
        _.each(listings, function(listing) {
            listing.addEventListener('click', function() {  // events on accordion are not cancelled, and should bubble
                if ($(listing).hasClass('active') ) {
                    listing.style.backgroundColor = listing.getAttribute('data-background');
                } else {
                    listing.style.backgroundColor = '';
                }
            });

            if ($(listing).hasClass('active') ) {           // set default colour on page load
                listing.style.backgroundColor = listing.getAttribute('data-background');
            }
        });
    }

};


/**
 * Sprout Homepage prototype
 * @return {Sprout.Pages.shows} A Sprout Homepage object
 */
Sprout.Pages['search'] = function(element) {
    var searchTarget = '/search/';
    if (Sprout.Utils.isMobile) {
        searchTarget += 'mobile/';
    } else if (Sprout.Utils.isTablet) {
        searchTarget += 'tablet/';
    } else {
        searchTarget += 'site/';
    }

    var currentSearchUrl = window.location.href;
    if (currentSearchUrl.indexOf(searchTarget) < 0) {
        window.location.href = currentSearchUrl.replace(new RegExp(/\/search\/[\d,\w,\s]+\//), searchTarget);
    }
};


/**
 * Sprout Show Detail Page prototype
 * @return {Sprout.Pages.show-detail} A Sprout Show Detail page object
 */
Sprout.Pages['show-detail'] = function(element) {
  // forces reload of iframed videos when navigating away from them in the carousel
  // doing this because the PDK controller is acting up as a temporary workaround
  if(jQuery(element).find('#show-lessons')) {
    function resetVideoPlayer(e) {
      e.preventDefault();

      var $activeVideoIframe = jQuery(element).find('#show-lessons-videos .carousel .tile.active #sproutVideoIframe');
      var src = $activeVideoIframe.attr('src');
      $activeVideoIframe.attr('src', '');
      $activeVideoIframe.attr('src', src);
    }

    jQuery(element).find('#show-lessons-videos .carousel nav .icon').on('click', resetVideoPlayer);
    jQuery(element).find('#show-lessons-header li.lesson:not(.active)').on('click', resetVideoPlayer);
  }
};


/**
 * Sprout Homepage prototype
 * @return {Sprout.Pages.shows} A Sprout Homepage object
 */
Sprout.Pages['shows'] = function(element) {
    function updateShowsSchedule() {
        Sprout.Services.getShowsSchedule(function(event, data) {
            var showHandle;
            if (data) {
                if (data.all) {
                    _.each(data.all, function(showData) {
                        if (_.isArray(showData.show) && showData.show.length > 0 && showData.schedule) {
                            showHandle = element.querySelector('#show-' + showData.show[0].nid + ' .airtime');
                            var nextDateStart = new Date(showData.schedule.start_date.replace(/-/g, '/'));
                            var nextAirtimeElement = showHandle.querySelector('.time');
                            $(showHandle).removeClass('on-air');
                            $(showHandle).removeClass('u-hidden');
                            nextAirtimeElement.innerHTML = Sprout.Utils.formatDateTime(nextDateStart);
                        }
                    });

                    //data-options
                }
                if (data.on_air) {
                    if (_.isArray(data.on_air.show) && data.on_air.show.length > 0) {
                        showHandle = element.querySelector('#show-' + data.on_air.show[0].nid + ' .airtime');

                        if (showHandle) {
                            $(showHandle).removeClass('u-hidden');
                            $(showHandle).addClass('on-air');
                        }
                    }

                    Sprout.Utils.setScheduleTimer(
                        updateShowsSchedule,
                        parseInt(data.current_time),
                        data.on_air.start_seconds,
                        data.on_air.end_seconds
                    );
                }

                _.each(element.querySelectorAll('.show .airtime.u-hidden:not(.on-air)'), function(showHandle) {
                    Sprout.Utils.showDefaultAirTime(showHandle, data.current_date);
                });
            }
        });
    }

    updateShowsSchedule();
};


/**
 * Sprout Special Events prototype
 * @return {Sprout.Pages.event} A Sprout Special Event object
 */
Sprout.Pages['events'] = function(element) {

};

/**
 * Sprout Account prototype
 * @return {Sprout.Pages.account} A Sprout Account object
 */
Sprout.Pages['user'] = function(element) {
    this.element = element;
    this.init();
};

Sprout.Pages['user'].prototype = {
    init: function() {
        // home page init
    }
};


/**
 * Sprout Video Detail prototype
 * @return {Sprout.Pages.video} A Sprout Video Page object
 */
Sprout.Pages['video'] = function(element) {

    function onViewUpdate() {
        Sprout.Utils.animateIn('.fx-fadein', 0);
    }

    //Catch view panel update event
    element.addEventListener('viewPanelUpdate', onViewUpdate);
};

Sprout.Pages['video'].prototype = {

};



/**
 * Sprout Homepage prototype
 * @return {Sprout.Pages.shows} A Sprout Homepage object
 */
Sprout.Pages['watch'] = function(element) {

    function onViewUpdate() {
        Sprout.Utils.animateIn('.fx-fadein', 0);
    }

    function displayOneEpisode(elem){
        $(elem).addClass('episode-tile-show');
    }

    function episodeCycling(){
        var cookieName = 'PromotedEpisodeShown',
            episodes = element.querySelectorAll('.episode-tile'),
            currentEpisode = 0,
            shownSproutlets = decodeURIComponent(Sprout.Utils.cookies.getItem(cookieName));

        if (episodes.length > 0){
            if (shownSproutlets && shownSproutlets < (episodes.length-1)){
                shownSproutlets ++;
                currentEpisode = shownSproutlets;
            }

            displayOneEpisode(episodes[currentEpisode]);
            Sprout.Utils.cookies.setItem(cookieName, currentEpisode);
        }

    }

    function init() {

        //Catch view panel update event
        element.addEventListener('viewPanelUpdate', onViewUpdate);
        episodeCycling();
    }

    init();

};


/**
 * Channel Finder
 * @return {void}
 */
Sprout.Components.channelFinder = function(handle) {
    var zip =           handle.querySelector('.zip');
    var result =        handle.querySelector('.result');
    var provider =      handle.querySelector('.providers');

    var zipButton =     handle.querySelector('.zip button');
    var zipInput =      handle.querySelector('.zip input');
    var providerList =  handle.querySelector('.providers ul');
    var reset =         handle.querySelector('.result button');

    zipButton.addEventListener('click', getProvider);

    zipInput.addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            getProvider();
        }
    });

    reset.addEventListener('click', function() {
        showStep(1);
    });

    function showStep(i, error) {
        var steps = [zip, provider, result];
        _.each(steps, function(step){ $(step).addClass('u-hidden'); });
        $(steps[i-1]).removeClass('u-hidden');

        if (error) { $(result).addClass('error'); }
        else {       $(result).removeClass('error'); }
    }

    function getProvider(e) {

        var validator = new Validator();
        if (! validator.check( zip.querySelector('.field-item') )) { return; }

        Sprout.Services.channelFinder({'zip': zipInput.value}, function(e, data){
            try { data = JSON.parse(data); }
            catch(err) { }

            if (data && data.providers) {
                providerList.innerHTML = '';
                _.each(data.providers, function(item) {
                    var li = document.createElement('li');
                    li.innerHTML = '<button id="provider-' + item.providerID + '">'+ item.providerName +'</button>';
                    li.addEventListener('click', function() { getChannel(item.providerID, data.kpiID); });
                    providerList.appendChild(li);
                });
                showStep(2);
            } else {
                showStep(3, true);
            }
        });
    }

    function getChannel(providerId, kpiId) {
        Sprout.Services.channelFinder({'kpiid':kpiId, 'providerid':providerId}, function(e, data){
            try { data = JSON.parse(data); }
            catch(err) { }

            if (data.channelSD && data.channelSD !== '0000') {
                result.querySelector('.success').innerHTML = '<h4>You can watch Sprout on '+data.providerName+' channel '+data.channelSD+'</h4>';
                showStep(3);
            } else {
				result.querySelector('.fail').innerHTML = '<h4>'+data.message+'</h4>';	// there's sometimes an errant <br> in the returned message
                showStep(3, true);
            }
        });
    }

};

/**
 * Filter controller easy to use hooks through events
 * @param  {HTMLElement} handle         The DOM element to contain the filter
 * @return {void}
 */
Sprout.Components.filter = function(handle, options) {
    function deselect() {
        var selectedItems = handle.querySelectorAll('.selected');
        Sprout.Utils.switchElementsStatus(selectedItems, false);
    }

    function setDefaultFilter() {
        var item = null;

        deselect();

        if (options.default) {
            item = handle.querySelector(options.default);
            $(item).attr('aria-selected', true);
            $(item).addClass('selected');
        }

        return item;
    }

    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }

    // extend options
    options = _.extend({
        'default': null,
        'onchange': 'filterchange',
        'oninit': 'filterinit',
        'item': 'a',
        'toggle': true
    }, options);

    this.filterKey = Sprout.Utils.getDataValue(handle, 'filter');

    var items = handle.querySelectorAll(options.item);

    var activeFilter = _.find(items, function(item){
        return $(item).attr('aria-selected') === 'true';
    });

    if (!activeFilter) {
        activeFilter = setDefaultFilter();
    }

    var filterChangeEvent = document.createEvent('Event');
    filterChangeEvent.initEvent(options.onchange, true, true);

    var filterInitEvent = document.createEvent('Event');
    filterInitEvent.initEvent(options.oninit, true, true);

    function changeFilter(item, preventDefault){
        if (item !== activeFilter) {
            deselect();

            $(item).attr('aria-selected', true);
            $(item).addClass('selected');
        } else if (!preventDefault && options.toggle) {
            deselect();

            item = setDefaultFilter();
        }

        if (item !== activeFilter){
            activeFilter = item;

            if (!preventDefault) {
                handle.dispatchEvent(filterChangeEvent);
            }
        }
    }

    _.each(items, function(item){
        item.addEventListener('click', function(event){
            changeFilter(this);
        });
    });

    this.getActive = function() {
        return activeFilter;
    };
    this.setActive = function(filterData) {
        var item;
        if (filterData) {
            item = _.find(items, function(item) {
                var itemOptions = Sprout.Utils.getDataOptions(item);
                return itemOptions.id === filterData.id;
            });
        }

        if (item) {
            changeFilter(item, true);
        } else {
            activeFilter = setDefaultFilter();
        }
    };

    handle.filter = this;

    handle.dispatchEvent(filterInitEvent);
};



/**
 * Sprout Login prototype
 * @return {Sprout.Pages.login} A Sprout Login object
 */
Sprout.Components.login = function(element) {
    this.element = element;
    this.enabled = false;
    this.init();
};

Sprout.Components.login.constant = {
    open: 'show-login',
    close: 'hide-login',
    forgot: 'show-forgot-password'
};

//Static function to send open login event
Sprout.Components.login.open = function(destination) {
    if (Sprout.Utils.isMobile) {
        if (destination) {
            destination = '?destination=' + destination;
        } else {
            destination = '?destination=' + document.location.pathname;
        }
        document.location.href = '/user' + destination;
    } else {
        var openLoginEvent = document.createEvent('Event');
        openLoginEvent.initEvent(Sprout.Components.login.constant.open, true, true);
        document.dispatchEvent(openLoginEvent);
    }
};

Sprout.Components.login.prototype = {
    init: function(element) {
        document.addEventListener(Sprout.Components.login.constant.open, this.open.bind(this));
        document.addEventListener(Sprout.Components.login.constant.close, this.close.bind(this));

        this.element.addEventListener('submit', this.submit.bind(this));

        this.originalDestination = null;
        this.registerElement = this.element.querySelector('.register .cta');
        this.destinationElement = this.element.querySelector('input[name=redirect]');
        this.registerUrl = this.registerElement.href;
        this.destinationElement.addEventListener('change', this.updateDestination.bind(this));
        this.updateDestination();
    },
    updateDestination: function() {
        if (!this.originalDestination) {
            this.originalDestination = this.destinationElement.value;
        }

        if (this.destinationElement.value === '') {
            this.destinationElement.value = this.originalDestination;
        }

        var sUrl = this.registerUrl;
        if (this.destinationElement.value && this.destinationElement.value !== '' && this.destinationElement.value !== 'user') {
            sUrl += (sUrl.indexOf('?') >= 0)? '&':'?';
            sUrl += 'destination=' + this.destinationElement.value;
        }
        this.registerElement.href = sUrl;
    },
    open: function() {
        // var body = document.querySelector('body');
        // $(body).addClass(Sprout.Components.login.constant.open);
        Sprout.Utils.toggleShowing('show-login', true);
        Sprout.Components.forgotPassword.reset();
    },
    close: function() {
        // var body = document.querySelector('body');
        // $(body).removeClass(Sprout.Components.login.constant.open);
        Sprout.Utils.toggleShowing();
    },
    submit: function(event) {
        var isValid = true;
        var validatorInstance = new Validator();
        var items = this.element.querySelectorAll('.field-item');
        _.each(items, function(item) {
            isValid = validatorInstance.check(item) && isValid;
            //Escape field value
            var fields = item.querySelectorAll('input, textarea');
            _.each(fields, function(field) {
                field.value = Sprout.Utils.htmlEscape(field.value);
            });
        });

        if (!isValid) {
            event.stopPropagation();
            event.preventDefault();
        }

    }
};


/**
 * Sprout Login CTA prototype
 * @return {Sprout.Pages.login} A Sprout Login CTA object
 */
Sprout.Components.loginCta = function(element, options) {
    var originalDestination;

    var openLoginEvent = document.createEvent('Event'),
        closeLoginEvent = document.createEvent('Event'),
        changeEvent = document.createEvent('Event');

    openLoginEvent.initEvent(Sprout.Components.login.constant.open, true, true);
    closeLoginEvent.initEvent(Sprout.Components.login.constant.close, true, true);
    changeEvent.initEvent('change', true, true);

    if (!options) {
        options = Sprout.Utils.getDataOptions(element);
    }

    // extend options
    options = _.extend({
        'action': 'toggle',
        'auto': null,
        'destination': null
    }, options);

    function setDestination(destination) {
        var destinationElement = document.querySelector('header .login input[name=redirect]');

        if (destination) {
            destinationElement.value = destination;
        } else {
            destinationElement.value = '';
        }
        destinationElement.dispatchEvent(changeEvent);
    }

    function onClick(event) {
        var body = document.querySelector('body');

        if (!$(body).hasClass('mobile') && document.querySelector('header .login')) {
            event.preventDefault();
            event.stopPropagation();

            setDestination();
            switch(options.action) {
                case 'toggle':
                    if ($(body).hasClass(Sprout.Components.login.constant.open)) {
                        element.dispatchEvent(closeLoginEvent);
                    } else {
                        element.dispatchEvent(openLoginEvent);
                        setDestination(options.destination);
                    }
                    break;
                case 'open':
                    element.dispatchEvent(openLoginEvent);
                    setDestination(options.destination);
                    break;
                case 'close':
                    if ($(body).hasClass(Sprout.Components.login.constant.open)) {
                        element.dispatchEvent(closeLoginEvent);
                    }
                    break;
            }

            Sprout.Utils.scrollPage(document.querySelector('header'));
        }
    }

    switch(options.auto) {
        case 'open':
            if (Sprout.Utils.isMobile) {
                document.location.href = '/user?destination=' + document.location.pathname;
            } else {
                element.dispatchEvent(openLoginEvent);
                setDestination(options.destination);
            }
            break;
        case 'close':
            element.dispatchEvent(closeLoginEvent);
            break;
    }

    element.addEventListener('click', onClick);
};


/**
 * Sprout Login prototype
 * @return {Sprout.Pages.login} A Sprout Login object
 */
Sprout.Components.forgotPassword = function(element) {
    this.element = element;
    this.enabled = false;
    this.webform = new Sprout.Webform('forgotPassword_form', 'forgotPassword', true);

    this.element.addEventListener('submit', this.submit.bind(this));
};
Sprout.Components.forgotPassword.reset = function() {
    var body = document.querySelector('body');
    var handle = document.querySelector('.forgot-password');
    $(body).removeClass(Sprout.Components.login.constant.forgot);
    Sprout.Utils.resetForm(handle);
    $(handle).removeClass('done');
};
Sprout.Components.forgotPassword.prototype = {
    submit: function(event) {
        var isValid = true;
        var validatorInstance = new Validator();

        var items = this.element.querySelectorAll('.field-item');
        _.each(items, function(item) {
            isValid = validatorInstance.check(item) && isValid;
        });

        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        if (isValid) {
            var formData = Sprout.Utils.getFormValues(this.element);
            Sprout.Utils.loader(true);
            this.webform.submit(formData, this.onSubmit.bind(this));
        }
    },
    onSubmit: function(event) {
        var item;
        Sprout.Utils.loader(false);
        if (!event || event.status === 200) {
            $(this.element).addClass('done');
        } else {
            item = this.element.querySelector('.field-item');
            $(item).addClass('error error-service');
        }
    }
};
/**
 * Progress circle
 * @return {void}
 */
Sprout.Components.progressCircle = function(handle) {
  window.setProgress = function(percentage) {
    jQuery(handle).find('.progress-percentage').text(percentage + '%');
    jQuery(handle).find('.progress-completed')
     .css('stroke-dashoffset', 138 - (percentage * 1.38));
  };
}


/**
 * Share social
 * @return {void}
 */
Sprout.Components.shareSocial = function(handle) {
  var facebookLink = jQuery(handle).find('.facebook-link');
  var twitterLink = jQuery(handle).find('.twitter-link');
  var pinterestLink = jQuery(handle).find('.pinterest-link');
  var url = jQuery(handle).attr('data-link');
  var description = jQuery(handle).attr('data-description');
  var media = jQuery(handle).attr('data-media');

  jQuery(handle).click(function(e) {
    jQuery(handle).addClass('active');
  });

  if(!/^(?:[a-z]+:)?\/\//i.test(url)) {
    url = window.location.origin + url;
  } 

  jQuery(facebookLink).click(function (e) {
    e.preventDefault();
    window.open('http://www.facebook.com/share.php?u=' + encodeURIComponent(url))
  });

  jQuery(twitterLink).click(function (e) {
    e.preventDefault();
    window.open('http://twitter.com/share?text=' + encodeURIComponent(description) + '&url=/');
  });

  jQuery(pinterestLink).click(function (e) {
    e.preventDefault();
    window.open('http://pinterest.com/pin/create/link/?url=' + 
      encodeURIComponent(url) + 
      '&media=' + encodeURIComponent(media) + 
      '&description=' + encodeURIComponent(description))
  });

}


/**
 * Sprout Splash
 * @return {Sprout.Pages.splash} A Sprout Splash page object
 */
Sprout.Components['splash'] = function(element) {

    var parent = document.getElementsByTagName('html')[0];

    setTimeout(function(){
        $(element).addClass('animated');
    }, 500);

    element.querySelector('.cta').addEventListener('click', function(e){
        e.preventDefault();
        if (!$(parent).hasClass('ie')){
            history.replaceState({}, "", "?redirect=false");
        }
        $(parent).addClass('splash-out');
        setTimeout(function(){
            $(parent).removeClass('splash-out show-home-splash');
        }, 100);
    });


};

Sprout.Sproutlet = {};

Sprout.Sproutlet.create = function(element, callback) {
    this.element = element;
    this.callback = callback;
    this.webform = new Sprout.Webform('create_sproutlet_form', 'create_sproutlet');
    this.init();
};

Sprout.Sproutlet.create.prototype = {
    /**
     * Initializes preview and submit steps
     * @return {void}
     */
    init: function() {
        var addSproutletButton = this.element.querySelector('.js-submit');
        addSproutletButton.addEventListener('click', this.submit.bind(this));

        this.validator = new Validator();

        var closeButton = this.element.querySelector('.js-close');
        if (closeButton) {
            closeButton.addEventListener('click', this.clearNewSproutlet.bind(this));
        }
    },

    /**
     * Submit add sproutlet form
     * @return {void}
     */
    clearNewSproutlet: function() {
        Sprout.Utils.resetForm(this.element);
    },

    /**
     * Submit add sproutlet form
     * @return {void}
     */
    submit: function(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        if ($(this.element).hasClass('processing')) {
            return;
        }

        //Check that all steps are completed
        var self = this;
        var isCompleted = true;
        var items = this.element.querySelectorAll('.field-item');
        var sproutletData = {
            'hostEntityType': 'user',
            'field_name': 'field_user_sproutlet',
            'field_state': {'und': [{'value': ''}]},
            'field_user_kid_city': {'und': [{'value': ''}]},
            'field_user_kid_dob': {'und': [{'value': ''}]},
            'field_user_kid_first': {'und': [{'value': ''}]},
            'field_user_kid_special_needs': {'und': [{'value': '0'}]}
        };

        //Validate that all the dob comboboxes were selected
        var dobItem;
        var dobFields;
        var dobObject = {
            sproutlet_dob_month:'',
            sproutlet_dob_day:'',
            sproutlet_dob_year:''
        };

        _.each(items, function(item) {
            isCompleted = self.validator.check(item) && isCompleted;
        });

        if (isCompleted) {
            _.each(items, function(item) {
                var field;
                $(item).removeClass('error');
                if ($(item).hasClass('dob')) {
                    dobObject = Sprout.Utils.getFormValues(item);
                    sproutletData['field_user_kid_dob'].und[0].value =
                        dobObject.sproutlet_dob_year + '-' +
                        Sprout.Utils.fillString(dobObject.sproutlet_dob_month.toString(), 2, '0') + '-' +
                        Sprout.Utils.fillString(dobObject.sproutlet_dob_day.toString(), 2, '0') +
                        ' 00:00:00';
                /*
                } else if ($(item).hasClass('state')) {
                    field = item.querySelector('select');
                    sproutletData[field.id].und[0].value = $(field).val();
                */
                } else if ($(item).hasClass('special-needs')) {
                    field = item.querySelector('input');
                    sproutletData[field.id].und[0].value = field.checked? '1':'0';
                } else {
                    field = item.querySelector('input');
                    sproutletData[field.id].und[0].value = $(field).val();
                }
            });

            if (isCompleted) {
                $(this.element).addClass('processing');
                Sprout.Utils.loader(true);
                this.webform.submit(sproutletData, this.success.bind(this));
            }
        }
    },

    /**
     * Handles the service response for adding a sproutlet. Add it to the list and select it.
     * @param  {Object}      sproutlet        Sproutlet data object
     * @return {void}
     */
    success: function(event, data) {
        var formElement, sproutlet, itemName, dobDate;
        if (event || !data) {
            //General error
        } else if (data.exception) {
            //display errors
            for(var key in data.exception) {
                switch(key) {
                    case 'field_user_kid_dob':
                        itemName = 'dob';
                        break;
                    case 'field_state':
                        itemName = 'state';
                        break;
                    case 'field_user_kid_city':
                        itemName = 'city';
                        break;
                    case 'field_user_kid_first':
                        itemName = 'firstname';
                        break;
                    case 'field_user_kid_special_needs':
                        itemName = 'special-needs';
                        break;
                }
                formElement = this.element.querySelector('.field-item.' + itemName);
                $(formElement).addClass('error');
            }
        } else {
            dobDate = data.field_user_kid_dob.und[0].value;
            sproutlet = {
                'id': data.item_id,
                'sproutlet_state': data.field_state.und[0].value,
                'sproutlet_hometown': data.field_user_kid_city.und[0].value,
                'sproutlet_birthday': dobDate.split(' ')[0],
                'sproutlet_name': data.field_user_kid_first.und[0].value,
                'sproutlet_special_needs': data.field_user_kid_special_needs.und[0].value
            };
            this.clearNewSproutlet();
        }

        if (this.callback) {
            this.callback(event, sproutlet);
        }

        Sprout.Utils.loader(false);
        $(this.element).removeClass('processing');
    }
};

/**
 * Form validator
 *
 * @return {object}
 */
function Validator() {
	var rules = {
		email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		confirmEmail: /.*/,																// match anything to begin with, this regex is dynamically updated via email input
		dob: /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/,			// mm-dd-yyyy
		phone: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
		zip: /^\d{5}$/,
        password: /^(?=.*\d)(?=.*[A-Z]).{6,}$/
	};

    var placeholderSupport = ('placeholder' in document.createElement('input'));

	// special case for confirm mail, note: we can only deal with one of these per form
	/*$('[data-validate="email"]').on('change', function() {			// this is weak binding. Hope that the name doesnt change
		var val = $(this).val();
		rules['confirmEmail'] = new RegExp('^'+val+'$');		// match email exactly in confirmEmail
	});*/

	// Return object
	return {
		/**
		 * Checks all fields within the given section
		 *
		 * @param  {string} ruleName
		 * @param  {regex} updatedRule
		 * @return {void}
		 */
		updateRule: function(ruleName, updatedRule) {
			rules[ruleName] = updatedRule;
		},

		/**
		 * Checks all fields within the given section
		 *
		 * @param  {HTMLELement} panel    Section of the form to validate
		 * @param  {function} callback
		 * @return {void}
		 */
		check: function(section, successCallback) {
			var fields = section.querySelectorAll('input, select, textarea'),
                self = this,
                group = $(section).attr('data-group');

            var validatorFailureEvent = document.createEvent('Event');
            validatorFailureEvent.initEvent('validation:failure', true, true);

            var validatorSuccessEvent = document.createEvent('Event');
            validatorSuccessEvent.initEvent('validation:success', true, true);

            //If group field like dob, check full section on change instead of single field
            var checkCallback = _.debounce((group)? checkSection : checkField, 100);
			_.each(fields, function(item) {
                var match = $(item).attr('data-match');

                item.removeEventListener('change', checkCallback.bind(item));   //Remove previously attached change event handler
                item.addEventListener('change', checkCallback.bind(item));

                if (match) {
                    match = document.querySelector(match);

                    if (match) {
                        match.removeEventListener('change', checkCallback.bind(item));
                        match.addEventListener('change', checkCallback.bind(item));
                    }
                }
			});

            function checkSection() {
                var pass = true;        // form is valid until we discover otherwise

                _.each(fields, function(item) {
                    pass = checkField.call(item) && pass;
                });

                if (pass) {
                    if (group) {
                        //Remove error type specific classes
                        $(section).removeClass('error-required');
                        $(section).removeClass('error-rule');
                        $(section).removeClass('error-match');
                        $(section).removeClass('error-service');

                        section.dispatchEvent(validatorSuccessEvent);
                        if (successCallback) {
                            successCallback.call();
                        }
                    }
                    $(section).removeClass('error');
                } else {
                    if (group) {
                        section.dispatchEvent(validatorFailureEvent);
                    }
                    $(section).addClass('error');
                }
                return pass;
            }

			/**
			 * Checks that the field contains valid data
			 *
			 * @return {boolean}
			 */
			function checkField(event) {
				var required = this.hasAttribute('required'),
					validate = $(this).attr('data-validate'),
					match = $(this).attr('data-match'),
					valid,
                    value,
					radios,
                    type,
					radioName,
                    pass = true,
                    errorTypes = [];

                if (!group) {
                    //Remove error type specific classes
                    $(section).removeClass('error-required');
                    $(section).removeClass('error-rule');
                    $(section).removeClass('error-match');
                    $(section).removeClass('error-service');
                }

				// check if field is even visible, do nothing if not
                /*  //CHANGE NOT IS NOR NEXT
				if (!$(this).is(':visible') && ! $(this).next('.chosen-container').length) {		// add chosen drop-down check
					return;
				}*/

				// Check if empty / selected
                if (!this.disabled) {
                    if (required) {
                        type = this.getAttribute('type');
                        // slightly different (and 2x inefficient) logic for radio buttons
                        if (type === 'radio') {
                            radioName = this.getAttribute('name');
                            radios = section.querySelectorAll('input[name="'+radioName+'"]:checked');
                            valid = (radios.length < 1) ? false : true;
                        } else if (type === 'checkbox') {
                            valid = this.checked;
                        } else if (type === 'file') {
                            valid = (this.value.length > 0) ? true : false;
                        } else {
                            value = this.value.trim();
                            if (!placeholderSupport && this.value === this.getAttribute('placeholder')) {
                                value = '';
                            } else {
                                this.value = value;
                            }
                            valid = (value.length > 0) ? true : false;
                        }

                        if (!valid) {
                            errorTypes.push('error-required');
                        }
                    } else {
                        valid = true;
                    }

                    // For promotion submission, if value empty (and not required) do not validate
                    if (this.form !== null && this.form.id === 'eck-entity-form-add-promotion-submission-promotion-submission') {
                        if (this.value != '') {
                            if (valid && validate && rules[validate]) {
                                // Allow rules to be functions
                                if (typeof rules[validate] === 'function') {
                                    valid = rules[validate]();
                                } else if (this.value.match(rules[validate]) === null) {  // we don't check if rules[validate] fails to get the regex we're after
                                    valid = false;
                                }

                                if (!valid) {
                                    errorTypes.push('error-rule');
                                }
                            }
                        }
                        // check for valid data if not required error
                    } else if (valid && validate && rules[validate]) {
                        // Allow rules to be functions
                        if (typeof rules[validate] === 'function') {
                            valid = rules[validate]();
                        } else if (this.value.match(rules[validate]) === null) {  // we don't check if rules[validate] fails to get the regex we're after
                            valid = false;
                        }

                        if (!valid) {
                            errorTypes.push('error-rule');
                        }
                    }

                    //Add match validation
                    if (valid && match) {
                        match = document.querySelector(match);

                        if (match) {
                            valid = (match.value === this.value);
                        } else {
                            valid = false;
                        }

                        if (!valid) {
                            errorTypes.push('error-match');
                        }
                    }

                    // Check if we get a valid birthdate (over 18) from the promotions feature upon submit
                    if (valid && this.id == 'edit-field-birthdate-und-0-value-year') {
                        var yearPromotion = section.querySelector('.placeholder#edit-field-birthdate-und-0-value-year').value;
                        var monthPromotion = section.querySelector('.placeholder#edit-field-birthdate-und-0-value-month').value;
                        var dayPromotion = section.querySelector('.placeholder#edit-field-birthdate-und-0-value-day').value;

                        function pad(n) {
                            return (n < 10) ? ("0" + n) : n;
                        }

                        var year = pad(yearPromotion);
                        var month = pad(monthPromotion);
                        var day = pad(dayPromotion);

                        var years = moment().diff(year + '-' + month + '-' + day, 'years');

                        if(years < 18 && required){
                            $('.promo-dob').addClass('error-rule');
                            valid = false;
                        }
                    }

                    // Check if we get a valid zip code from the promotions feature upon submit
                    if (valid && this.id == 'edit-field-zip-code-und-0-value' && rules['zip'] && this.value != '') {
                        // Allow rules to be functions
                        if (typeof rules['zip'] === 'function') {
                            valid = rules['zip']();
                        } else if (this.value.match(rules['zip']) === null) {  // we don't check if rules[validate] fails to get the regex we're after
                            valid = false;
                        }

                        if (!valid) {
                            errorTypes.push('error-rule');
                        }
                    }

                    if (valid) {
                        if (radioName) {
                            radios = section.querySelectorAll('input[name="'+radioName+'"]');
                            _.each(radios, function(item) {
                                $(item).removeClass('error');
                            });
                        } else {
                            $(this).removeClass('error');			// reset the field
                        }
                    } else {
                        $(this).addClass('error');
                        pass = false;
                    }
                }

                if (group) {
                    if (!pass) {
                        $(section).addClass(errorTypes.join(' '));
                    }
                } else {
                    if (pass) {
                        $(section).removeClass('error');
                        section.dispatchEvent(validatorSuccessEvent);
                        if (successCallback) {
                            successCallback.call();
                        }
                    } else {
                        $(section).addClass('error');
                        $(section).addClass(errorTypes.join(' '));
                        section.dispatchEvent(validatorFailureEvent);
                    }
                }

                if (!placeholderSupport && this.getAttribute('placeholder') && this.value === this.getAttribute('placeholder')) {
                    //Make sure placeholder is placed on empty fields for polyfilled placeholders fields
                    this.focus();
                }

                return pass;
			}

            return checkSection();
		}
	};
}

var pdkBasePath = '/sites/sprout/themes/sprout_twig/js/libs/pdk/';

var videoLoader;
var accessEnabler;
var mvpdService;
var adobePass;
var tve;
var adobePassShim;
var mvpdPickerPlugIn;

function sendMessageToAdsComponent(msg) {
    window.postMessage(msg, document.location.href);
}

window.updateSelectedMVPD = function(id) {
    if (id) {
        $(document.body).addClass('has-video-provider');
    } else {
        $(document.body).removeClass('has-video-provider');
    }
};

window.tpUseCustomMVPDPicker = true;

// ************************************** //

var adobePassShim = {

    isSwf: !Sprout.Utils.isMobile && !Sprout.Utils.isTablet && !Sprout.Utils.isSafari,
    playerLoaded: false,
    adobePassJS: {},
    adobePassSwf: "",
    resourceIdField: "resourceId",

    setJSAP: function(_ap)
    {
        this.adobePassJS = _ap;
	    this.isSwf = false;
    },

    setSwfAP: function(swf)
    {
	    this.adobePassSwf = swf;
        this.isSwf = true;
    },

    init: function()
    {
        $pdk.controller.addEventListener("OnPlayerLoaded", adobePassShim.registerAdobePassPlugin);
    },

	parseResourceIds: function(map)
	{
		window.adobePassResourceIds = {};
		var pairs = decodeURIComponent(map).split(",");

		for (var i=0; i<pairs.length; i++)
		{
			var pair = pairs[i].split(":");

			window.adobePassResourceIds[pair[0]] = pair[1];
		}

		if (mvpdPickerPlugIn && mvpdPickerPlugIn.provider)
		{
			adobePassShim.setResourceId(window.adobePassResourceIds[mvpdPickerPlugIn.provider]);
		}
	},

    registerAdobePassPlugin: function()
    {
        if(!this.playerLoaded)
        {
            this.playerLoaded = true;
        }

    },

    //these are methods to the accessEnabler
    setRequestor: function(){

        if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_setRequestor();

        }else{

            this.adobePassJS.setRequestor();
        }

    },

    getAuthorization: function(){

        if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_getAuthorization();

        }else{

            this.adobePassJS.getAuthorization();
        }
    },

    checkAuthorization: function(){

        if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_checkAuthorization();

        }else{

            this.adobePassJS.checkAuthorization();
        }

    },

    checkAuthentication: function(){

        if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_checkAuthentication();

        }else{

            this.adobePassJS.checkAuthentication();
        }
    },

    setProviderDialogURL: function(url){

        if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_setProviderDialogURL(url);

        }

	//this is not needed for Javascript AdobePass
    },

    getAuthentication: function(){

        if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_getAuthentication();

        }else{

            this.adobePassJS.getAuthentication();
        }

    },

    setSelectedProvider: function(id){

        if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_setSelectedProvider(id);

        }else{

            //send id back to javascript AccessEnabler
            this.adobePassJS.setSelectedProvider(id);
        }

    },

    getSelectedProvider: function(){

        if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_getSelectedProvider();

        }else{

            this.adobePassJS.getSelectedProvider();
        }

    },

    selectedProvider: function(data){

	    if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_selectedProvider(data);

        }else{


            this.adobePassJS.selectedProvider(data);
        }

    },

    getMetadata: function(key, inResourceId){

        if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_getMetadata(key, inResourceId);

        }else{

            this.adobePassJS.getMetadata(key, inResourceId);
        }
    },

    setResourceId: function(id){
        if(this.isSwf){

            var swf = document.getElementById(this.adobePassSwf);
            swf.ap_setResourceId(id);
        }else{

	        this.adobePassJS.setResourceId(id);
        }
    },

    setAuthenticationStatus: function(code){

	    if(this.isSwf){

            //this is done directly in the swf

        }else{

	        this.adobePassJS.setAuthenticationStatus(code);

        }

    },

    setToken: function(resourceId, token){

	    if(this.isSwf){

            //this is done directly in the swf

        }else{

	        this.adobePassJS.setToken(resourceId, token);

        }

    },

    setMetadataStatus: function(key, argument, value){

	    if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_setMetadataStatus(key, argument, value);

        }else{

	        this.adobePassJS.setMetadataStatus(key, argument, value);
        }

    },

    logout: function(){

        if(this.isSwf){

            document.getElementById(this.adobePassSwf).ap_logout();

        }else{

            this.adobePassJS.logout();
	    }

    }
};

videoLoader = function(show) {
};

function displayMediaError() {
    videoLoader();
    Sprout.Utils.modal('#videoDetailSproutNow', true);
}

/**
 * Sprout MPX video
 * @param  {HTMLElement} handle the video wrapper
 * @return {void}
 */
Sprout.Components.video = function (handle, options) {
    var player,
        play = handle.querySelectorAll('.video-wrapper .icon-watch'),
        src = pdkBasePath + "tpPdk.js";

    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }

    if (options.content === 'swf-video') {
        Sprout.Components.flashCheck(handle, options);
        if (document.getElementsByClassName('no-flash').length >= 1) {
            return;
        }
    }

        // NOTE: autoplay doesn't work on mobile and always be false anyways
    if (options.autoplay === 'not-mobile') {
        options.autoplay = (Sprout.Utils.isMobile || Sprout.Utils.isTablet) ? false : true;
    } else {
        options.autoplay = options.autoplay === 'true';
    }

    // extend options
    options = _.extend({
        'autoplay': false
    }, options);

    if (options.liveFeed && !adobePassShim.isSwf) {
        document.location = '/games/sprout-now-app';
        return;
    }

    if (options.protected) {
        Sprout.Global.checkMVPDProvider = false;

        window.providerDialogEnabled = options.autoplay;
        if (!Sprout.Utils.cookies.test() && window.providerDialogEnabled) {
            //Use timeout to wait for modal components to be instantiated
            setTimeout(displayMediaError);
        }

        videoLoader = function(show) {
            var loaderElement = handle.querySelector('.loader');
            if (show) {
                $(handle).addClass('detecting-provider');
                $(loaderElement).addClass('active');
            } else {
                $(handle).removeClass('detecting-provider');
                $(loaderElement).removeClass('active');
            }
        };
        videoLoader(true);
    }

    function startPDKEvents() {
        var openOverlay = true;
        // attach events
        $pdk.controller.addEventListener("OnMediaStart", function (e) {
            $(handle).addClass('started').removeClass('is-loading');
        });
        $pdk.controller.addEventListener("OnMediaPlaying", function (e) {
            openOverlay = true;
            $(handle).addClass('is-playing');
        });
        $pdk.controller.addEventListener("OnMediaPause", function (e) {
            openOverlay = false;
            $(handle).removeClass('is-playing');
        });
        $pdk.controller.addEventListener("OnMediaEnd", function (e) {
            $(handle).removeClass('is-playing').removeClass('started');
            if (!options.liveFeed) {
                sendMessageToAdsComponent('videoCompleted');
            }
        });
        $pdk.controller.addEventListener("OnMediaComplete", function (e) {
            $(handle).removeClass('is-playing').removeClass('started');
            if (!options.liveFeed) {
                sendMessageToAdsComponent('videoCompleted');
            }
        });
        $pdk.controller.addEventListener("OnMediaLoadStart", function (e) {
            $(handle).addClass('is-loading');
        });
        $pdk.controller.addEventListener("OnCredentialAcquisitionFailed", function(event) {
            if (window.providerDialogEnabled) {
                displayMediaError();
            }
        });

        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

        if(!isMobile){
            var html = '';
            var $ = jQuery;

            html += '<div class="closedCaptionsCard">'//Opening div

            html +=     '<section class="CaptionsSection">'; 
            html +=         '<div id="headerContainer">'; //Start header
            html +=                 '<h1>Closed Captioning Settings</h1>'; // Header Title
            html +=                 '<div><input type="checkbox" id="onOff" name="language" class="onOff"><label for="onOff"></label></div>';
            html +=         '</div>'; // End header
            html +=         '<span class="preview">Preview</span><br/>';
            html +=         '<div class="sampleDiv">'; // Start Sample Text Section
            html +=             '<span class="sampleText">This is a sample text</span><br/>';
            html +=         '</div>'; // End Sample Text Section
            html +=         '<br/>'; // Make some space.. With HR!
            html +=     '</section>';

            html +=     '<section id="FontsSection">';
            html +=         '<div class="fontContainer">';
            html +=             '<div class="column1">'; // Start Row 1
            html +=                 '<div class="fontSize">';
            html +=                     '<span>1. Captions Size</span><br/>'; // small font size
            html +=                     '<div class="sizeSlider"></div>';
            html +=                     '<span class="fontSizeInput"></span>';
            html +=                 '</div>';
            html +=                 '<div class="font">';
            html +=                     '<span>2. Captions Font Family</span><br/>'; // Small font
            html +=                     '<select>'; // Font Selector
            html +=                         '<option value="archer">Archer</option>';
            html +=                         '<option value="arial">Arial</option>';
            html +=                         '<option value="arial black">Arial Black</option>';
            html +=                         '<option value="courier new">Courier New</option>';
            html +=                         '<option value="georgia">Georgia</option>';
            html +=                         '<option value="impact">Impact</option>';
            html +=                         '<option value="Lucida Sans Unicode">Lucida Sans Unicode</option>';
            html +=                         '<option value="palatino">Palatino</option>';
            html +=                         '<option value="tahoma">Tahoma</option>';
            html +=                         '<option value="times new roman">Times New Roman</option>';
            html +=                     '</select>'; // End Font Color Selector
            html +=                 '</div>';
            html +=                 '<div class="edgeAttr">';
            html +=                     '<span>3. Edge Style</span><br/>'; // small font size
            html +=                     '<select>'; // Edge Attributes selector
            html +=                         '<option id="None" value="none">None</option>'
            html +=                         '<option id="Raised" value="-1px -1px 0px">Raised</option>'
            html +=                         '<option id="Depressed" value="0 1px 0">Depressed</option>'
            html +=                         '<option id="Dropshadow" value="2px 2px">Dropshadow</option>'
            html +=                     '</select>'; // End Font Color Selector
            html +=                 '</div>';
            html +=             '</div>'; // End row 1
            html +=             '<div class="column2">'; // Start Row 2
            html +=                 '<div class="fontColor">';
            html +=                     '<span>4. Captions Color</span><br/>';
            html +=                     '<div class="fontColor-btn-grp">'; // Start radio buttons div
            html +=                         '<input type="radio" id="fontblack" name="fontColor" value="#000000" /><label for=fontblack></label>';
            html +=                         '<input type="radio" id="fontblue" name="fontColor" value="#307CC0" /><label for=fontblue></label>';
            html +=                         '<input type="radio" id="fontgreen" name="fontColor" value="#AED250" /><label for=fontgreen></label>';
            html +=                         '<input type="radio" id="fontred" name="fontColor" value="#EA4444" /><label for=fontred></label>';
            html +=                         '<input type="radio" id="fontpink" name="fontColor" value="#ED5D81" /><label for=fontpink></label>';
            html +=                         '<input type="radio" id="fontorange" name="fontColor" value="#FFC813" /><label for=fontorange></label>';
            html +=                         '<input type="radio" id="fontwhite" name="fontColor" value="#ffffff" /><label for="fontwhite"></label>';
            html +=                     '</div>'; // End radio buttons div
            html +=                 '</div>';
            html +=                 '<div class="backgroundColor">';
            html +=                     '<span>5. Background Color</span><br/>';
            html +=                     '<div class="backgroundColor-btn-grp">'; // Start radio buttons div

            html +=                         '<input type="radio" id="backgroundblack" name="backgroundColor" value="#000000" /><label for=backgroundblack></label>';
            html +=                         '<input type="radio" id="backgroundblue" name="backgroundColor" value="#307CC0" /><label for=backgroundblue></label>';
            html +=                         '<input type="radio" id="backgroundgreen" name="backgroundColor" value="#AED250" /><label for=backgroundgreen></label>';
            html +=                         '<input type="radio" id="backgroundred" name="backgroundColor" value="#EA4444" /><label for=backgroundred></label>';
            html +=                         '<input type="radio" id="backgroundpink" name="backgroundColor" value="#ED5D81" /><label for=backgroundpink></label>';
            html +=                         '<input type="radio" id="backgroundorange" name="backgroundColor" value="#FFC813" /><label for=backgroundorange></label>';
            html +=                         '<input type="radio" id="backgroundwhite" name="backgroundColor" value="#ffffff" /><label for="backgroundwhite"></label>';
            html +=                     '</div>'; // End radio buttons div
            html +=                 '</div>';
            html +=                 '<div class="edgeColor">';
            html +=                     '<span>6. Edge Color</span><br/>'; // Small font
            html +=                     '<div class="edgeColor-btn-grp">'; // Start radio buttons div

            html +=                         '<input type="radio" id="edgeblack" name="edgeColor" value="#000000" /><label for=edgeblack></label>';
            html +=                         '<input type="radio" id="edgeblue" name="edgeColor" value="#307CC0" /><label for=edgeblue></label>';
            html +=                         '<input type="radio" id="edgegreen" name="edgeColor" value="#AED250" /><label for=edgegreen></label>';
            html +=                         '<input type="radio" id="edgered" name="edgeColor" value="#EA4444" /><label for=edgered></label>';
            html +=                         '<input type="radio" id="edgepink" name="edgeColor" value="#ED5D81" /><label for=edgepink></label>';
            html +=                         '<input type="radio" id="edgeorange" name="edgeColor" value="#FFC813" /><label for=edgeorange></label>';
            html +=                         '<input type="radio" id="edgewhite" name="edgeColor" value="#ffffff" /><label for="edgewhite"></label>';
            html +=                     '</div>'; // End radio buttons div
            html +=                 '</div>';
            html +=             '</div>';
            html +=             '<div class="column3">';
            html +=                 '<div class="fontOpacity">';
            html +=                     '<span>7. Text Opacity</span><br/>';
            html +=                     '<div class="fontOpacitySlider"></div>'; // Number Font Opa input
            html +=                     '<span class="fontOpacityInput">100%</span>'; // Number Font Opa input
            html +=                 '</div>';
            html +=                 '<div class="backgroundOpacity">';
            html +=                     '<span>8. Background Opacity</span><br/>';
            html +=                     '<div class="backgroundOpacitySlider"></div>'; // Number Font Opa input
            html +=                     '<span class="backgroundOpacityInput">100%</span>'; // Number Font Opa input
            html +=                 '</div>';
            html +=             '</div>';
            html +=         '</div>';
            html +=     '</section>';
            html +=     '<br/>';
            html +=     '<section class="buttons">';
            html +=         '<span class="defaults"></span>';
            html +=         '<span class="doneButton"></span>';
            html +=     '</section>';
            html += '</div>'; //Closing div

            var listeners = {};
            var defaults = {};

            var hexToRgb = function(hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            }

            $pdk.controller.addPlayerCard("forms", "sproutClosedCaptionsCard", html);


            $pdk.controller.addEventListener("OnGetSubtitleStyle", listeners.style = function (e) { loadStyles(e) });

            var loadStyles = function(e){
                if(e.data.fontColor !== null){ // checking to make sure this isn't null. Can check any property really. They all get set same time.
                    defaults = e;
                }else{
                    defaults.data = {
                        fontColor : "#000000",
                        backgroundColor: "#ffffff",
                        fontEdgeColor: "#ffffff",
                        opacity: 1,
                        backgroundOpacity: 1,
                        fontFamily: "archer",
                        fontEdge: "none",
                        fontSize: "1"
                    }
                }
            }

            var language = '';

            $pdk.controller.addEventListener("OnGetSubtitleLanguage", function(e){
                language = e.data.langCode;
            });

            var resetSampleText = function(){

                var $fontColor = $('.fontColor');
                var $font = $('.font');
                var $edgeAttr = $('.edgeAttr');
                var $edgeColor = $('.edgeColor');
                var $backgroundColor = $('.backgroundColor');
                var $fontSize = $('.sizeSlider');
                var $fontOpacity = $('.fontOpacitySlider');
                var $backgroundOpacity = $('.backgroundOpacitySlider');

                
                $(".backgroundOpacityInput" ).html('100%');

                $(".fontOpacityInput" ).html('100%');

                var fontColor = hexToRgb('#000000');
                var backgroundColor = hexToRgb('#ffffff');
                $('.sampleText').css({
                    color: 'rgba('+fontColor.r+','+fontColor.g+','+fontColor.b+',1)',
                    backgroundColor: 'rgba('+backgroundColor.r+','+backgroundColor.g+','+backgroundColor.b+',1)',
                    fontSize: '2vw',
                    textShadow: 'none',
                    fontFamily: 'archer'
                });

                $fontOpacity.slider('value', 100);
                $backgroundOpacity.slider('value', 100);
            }

            $pdk.controller.addEventListener("OnPlayerLoaded", function(e){ //Event seems to fire at the right time.. Take advantage of this.
                $pdk.controller.getSubtitleStyle();

                var resetDefaults = function(){
                    $('input[name="fontColor"][value="#000000"]').prop('checked', true);
                    $('.font').find('select')[0].value = "archer";
                    $('.edgeAttr').find('select')[0].value = "none";
                    $('input[name="edgeColor"][value="#ffffff"]').prop('checked', true);
                    $('input[name="backgroundColor"][value="#ffffff"]').prop('checked', true);
                    $('.sizeSlider').slider('value', 1.0);
                    $('.fontSizeInput').html(1.0);
                    $('.fontOpacitySlider').slider('value', 1.0);
                    $('.backgroundOpacitySlider').slider('value', 1.0 );
                    $(".backgroundOpacityInput" ).html(100 + '%');
                    $(".fontOpacityInput" ).html(100 + '%');

                    resetSampleText();
                }

                var style = {
                    globalDataType: "com.theplatform.pdk.data::SubtitleStyle"
                }

                $pdk.controller.addEventListener("OnMediaStart", function(){
                    $pdk.controller.removeEventListener('OnGetSubtitleLanguage');
                    $pdk.controller.addEventListener('OnGetSubtitleLanguage', function(e){

                        if(!openOverlay){
                            return;
                       }

                       $pdk.controller.showPlayerCard('forms', 'sproutClosedCaptionsCard');
                        
                        if(language == 'en'){
                            language = 'none';
                        }else if(language == 'none'){
                            language = 'en';
                        }

                        $pdk.controller.setSubtitleLanguage(language);



                        var $fontColor = $('.fontColor');
                        var $font = $('.font');
                        var $edgeAttr = $('.edgeAttr');
                        var $edgeColor = $('.edgeColor');
                        var $backgroundColor = $('.backgroundColor');
                        var $fontSize = $('.sizeSlider');
                        var $fontOpacity = $('.fontOpacitySlider');
                        var $backgroundOpacity = $('.backgroundOpacitySlider');

                        $('.defaults').click(function(e){
                            resetDefaults();
                        });

                        $fontSize.slider({
                            value:1,
                            min: 0.25,
                            max: 1.0,
                            step: 0.25,
                            slide: function(event, ui){
                                $(".fontSizeInput" ).html(ui.value );
                                $('.sampleText').css('fontSize', ui.value * 2 + 'vw');
                            }
                        });
                        $( ".fontSizeInput" ).html($(".sizeSlider").slider( "value" ));

                        $fontOpacity.slider({
                            value:1,
                            min: 0,
                            max: 1,
                            step: 0.01,
                            slide: function(event, ui){
                                var i = 100;
                                var value = ui.value.toFixed(2);
                    
                                if(value != 1.00){
                        
                                    if(value.toString().indexOf('0.0') == true){
                            
                                        i = value.toString().split('0.0')[1];
                                    }else{
                                        i = value.toString().split('.')[1];
                                    }
                                }

                                if(ui.value == 0.0) i = 0;
                                $(".fontOpacityInput" ).html(i + '%');
                                var fontColor = $('input[name=fontColor]:checked').val();
                                var color = hexToRgb(fontColor);
                                $('.sampleText').css('color', 'rgba('+ color.r + ','+color.g+', '+color.b+','+ui.value+' )');
                            }
                        });
                        $( ".fontOpacityInput" ).html($(".fontOpacitySlider").slider( "value" ));

                        $backgroundOpacity.slider({
                            value:1,
                            min: 0,
                            max: 1,
                            step: 0.01,
                            slide: function(event, ui){
                                var i = 100;
                                var value = ui.value.toFixed(2);
                    
                                if(value != 1.00){
                        
                                    if(value.toString().indexOf('0.0') == true){
                            
                                        i = value.toString().split('0.0')[1];
                                    }else{
                                        i = value.toString().split('.')[1];
                                    }
                                }

                                if(ui.value == 0.0) i = 0;
                                $(".backgroundOpacityInput" ).html(i + '%');
                                $('.sampleText').css('background-color', 'rgba(255,255,255,' + ui.value + ')');
                                var backgroundColor = $('input[name=backgroundColor]:checked').val();
                                var color = hexToRgb(backgroundColor);
                                $('.sampleText').css('background-color', 'rgba('+ color.r + ','+color.g+', '+color.b+','+ui.value+' )');
                            }
                        });
                        $( ".backgroundOpacityInput" ).html($( ".backgroundOpacitySlider" ).slider( "value" ));

                        //Get the player settings and show em.
                        
                        $('input[name="fontColor"][value="'+ defaults.data.fontColor+ '"]').prop('checked', true);
                        $font.find('select')[0].value = (defaults.data.fontFamily ? defaults.data.fontFamily : "archer");
                        $edgeAttr.find('select option[id="'+defaults.data.fontEdge+'"]').prop('selected', true);
                        $('input[name="edgeColor"][value="'+ defaults.data.fontEdgeColor+ '"]').prop('checked', true);
                        $('input[name="backgroundColor"][value="'+ defaults.data.backgroundColor + '"]').prop('checked', true);
                        $fontSize.slider('value', defaults.data.fontSize);
                        $('.fontSizeInput').html(defaults.data.fontSize);
                        
                        var i = 100;
                        var value = defaults.data.backgroundOpacity.toFixed(2);
                        if(value != 1.00){
                            if(value.toString().indexOf('0.0') == true){
                                i = value.toString().split('0.0')[1];
                            }else{
                                i = value.toString().split('.')[1];
                            }
                        }
                        if(defaults.data.backgroundOpacity == 0.0) i = 0;
                        $(".backgroundOpacityInput" ).html(i + '%');

                        var b = 100;
                        var value = defaults.data.opacity.toFixed(2);
                        if(value != 1.00){
                            if(value.toString().indexOf('0.0') == true){
                                b = value.toString().split('0.0')[1];
                            }else{
                                b = value.toString().split('.')[1];
                            }
                        }

                        if(defaults.data.opacity == 0.0) b = 0;
                        $(".fontOpacityInput" ).html(b + '%');

                        var fontColor = hexToRgb(defaults.data.fontColor);
                        var backgroundColor = hexToRgb(defaults.data.backgroundColor);
                        $('.sampleText').css({
                            color: 'rgba('+fontColor.r+','+fontColor.g+','+fontColor.b+','+defaults.data.opacity+')',
                            backgroundColor: 'rgba('+backgroundColor.r+','+backgroundColor.g+','+backgroundColor.b+','+defaults.data.backgroundOpacity+')',
                            fontSize: (defaults.data.fontSize * 2) + 'vw',
                            textShadow: $edgeAttr.find('select option:selected').val() + defaults.data.fontEdgeColor,
                            fontFamily: defaults.data.fontFamily
                        });

                        $fontOpacity.slider('value', (isNaN(defaults.data.opacity) || defaults.data.opacity === null ? "100" : defaults.data.opacity));
                        $backgroundOpacity.slider('value', (isNaN(defaults.data.backgroundOpacity) || defaults.data.backgroundOpacity === null ? "100" : defaults.data.backgroundOpacity));

                        if(language == 'en'){
                            $('input[name="language"]').prop('checked', true);
                        }else{
                            $('input[name="language"]').prop('checked', false);
                        }
                        

                        $('.doneButton').click(function(e){
                            //Gather up the styles.. add em!

                            var style = {
                                globalDataType: "com.theplatform.pdk.data::SubtitleStyle"
                            }

                            var subtitleLanguage = 'en';
                            var backgroundColor = $('input[name=backgroundColor]:checked').val();
                            var fontEdge = $edgeAttr.find('select option:selected').text();
                            var edgeColor = $('input[name=edgeColor]:checked').val();
                            var fontColor = $('input[name=fontColor]:checked').val();
                            var fontSize = $fontSize.slider('value');
                            var font = $font.find('select')[0].value;
                            var backgroundOpacity = $backgroundOpacity.slider('value');
                            var fontOpacity = $fontOpacity.slider('value');
                            var captions = $('input[name="language"]');

                            if(!captions.is(':checked')) subtitleLanguage = 'none';

                            $pdk.controller.setSubtitleLanguage(subtitleLanguage);

                            style.backgroundColor = backgroundColor;
                            style.fontEdge = fontEdge;
                            style.fontEdgeColor = edgeColor;
                            style.fontColor = fontColor;
                            style.fontSize = parseFloat(fontSize);
                            style.fontFamily = font;
                            style.backgroundOpacity = parseFloat(backgroundOpacity);
                            style.opacity = parseFloat(fontOpacity);

                            $pdk.controller.setSubtitleStyle(style); // Set final styles when the card is closed.
                            $pdk.controller.hidePlayerCard('forms', 'sproutClosedCaptionsCard');
                        });

                        //Setup event listeners for when the vlaues are changed
                        $font.find('select').change(function(e){
                            $('.sampleText').css('fontFamily', $(e.target).find('option:selected').val());
                        });

                        $('input[name="backgroundColor"]').change(function(e){
                            var color = hexToRgb(e.target.value);
                            $('.sampleText').css('background-color', 'rgba('+ color.r + ','+color.g+', '+color.b+','+$backgroundOpacity.slider('value')+' )');
                        });

                        $('input[name="fontColor"]').change(function(e){
                            var color = hexToRgb(e.target.value);
                            $('.sampleText').css('color', 'rgba('+ color.r + ','+color.g+', '+color.b+','+$fontOpacity.slider('value')+' )');
                        });

                        $('input[name="edgeColor"]').change(function(e){
                            $('.sampleText').css('text-shadow', $edgeAttr.find('select option:selected').val() + e.target.value);
                        });

                        $edgeAttr.find('select').change(function(e){
                
                            $('.sampleText').css('text-shadow', $(e.target).find('option:selected').val() + $('input[name="edgeColor"]:checked').val());
                        });
                    });
                });
            });
        }
    }

    function startMPX() {
        // create the player
        player = new Player('player'); // it needs a hard-coded ID. Ugh

        if (options.protected && adobePassShim.isSwf) {
            player.setRuntime('Flash');
        }

        player.setMedium("javascript");

        // assign options
        player.autoplay = options.autoplay && !options.protected;
        player.autoplay = false;

        player.logLevel = 'fatal';

        if (options.liveFeed) {
            player.formats = "f4m,mpeg4";
            player.layoutUrl = options.skinPath + 'sprout-live.xml'; // some player, if a local Otherwise...
        } else {
            player.formats = "m3u,f4m,mpeg4";
            player.releaseURL = options.video;
            player.layoutUrl = options.skinPath + 'sprout.xml'; // some player, if a local ref. Otherwise...
        }

        player.skinURL = options.skinPath + 'sproutcustom/sproutcustom.json'; // player skin

        player.endCard = 'none';

        if (options.protected) {
            if (adobePassShim.isSwf) {
                player.pluginAkamaiSwf = "type=content|url=" + pdkBasePath + "swf/akamaiHD.swf|fallback=switch%3Dhttp|bufferProfile=livelowlatency|enableDVR=true|priority=1|manifest=true|hosts=.akamaihd.net";
                player.pluginAkamaiJs = "type=content|url=" + pdkBasePath + "js/plugins/akamaiHD.js|fallback=switch%3Dhttp|bufferProfile=livelowlatency|enableDVR=false|priority=1|manifest=true|hosts=.akamaihd.net|format=F4M";

                if (options.liveFeed) {
                    player.pluginLiveCaptionsSwf = "type=captions|url=" + pdkBasePath + "swf/liveCaptions.swf|priority=4";
                }
            }

            //useCustomMVPDPicker=true|
            player.pluginPickerSwf = "type=picker|URL=" + pdkBasePath + "swf/mvpdPicker.swf|priority=2|useCustomMVPDPicker=true";
            player.pluginPickerJs   = "type=picker|URL=" + pdkBasePath + "js/plugins/mvpdPicker.js|priority=2|useCustomMVPDPicker=true";
            player.pluginAdobePassSwf = "type=auth|URL=" + pdkBasePath + "swf/adobePass.swf|priority=3|accessEnablerURL=http://entitlement.auth.adobe.com/entitlement/AccessEnabler.swf|requestorId=sprout|createIFrameCallback=createMVPDIFrame|sendTrackingDataCallback=onTrackingDataCallback|setTokenCallback=traceToken|tokenRequestFailedCallback=tokenRequestFailedCallback|setAuthenticationStatusCallback=onAuthenticationStatusCallback|promptImmediately=true|displayProviderDialogCallback=displayMVPDPickerCallback|swfLoadedCallback=swfLoaded";

            player.pluginAdobePassJs = "type=auth|URL=" + pdkBasePath + "js/plugins/adobePass.js|priority=3|accessEnablerURL=http://entitlement.auth.adobe.com/entitlement/AccessEnabler.js|requestorId=sprout|createIFrameCallback=createMVPDIFrame|sendTrackingDataCallback=onTrackingDataCallback|setTokenCallback=traceToken|tokenRequestFailedCallback=tokenRequestFailedCallback|setAuthenticationStatusCallback=onAuthenticationStatusCallback|promptImmediately=true|displayProviderDialogCallback=displayMVPDPickerCallback";

            if (!options.autoplay) {
                player.pluginAdobePassSwf += "|entitlementLoadedCallback=onEntitlementLoadedAuthenticateCallback";
                player.pluginAdobePassJs += "|entitlementLoadedCallback=onEntitlementLoadedAuthenticateCallback";
            } else {
                player.pluginAdobePassSwf += "|entitlementLoadedCallback=onEntitlementLoadedCallback";
                player.pluginAdobePassJs += "|entitlementLoadedCallback=onEntitlementLoadedCallback";
            }
        }

        startPDKEvents();

        if (options.liveFeed) {
            var releasemodel = new ReleaseModel("releaseModelDiv");

            releasemodel.feedsServiceURL = options.video;
            releasemodel.feedsServiceURL = "http://feed.theplatform.com/f/HNK2IC/sprout_live";
            releasemodel.shuffle = true;
            releasemodel.autoLoad=true;
            releasemodel.scopes=["primary_player"];
            releasemodel.autoPlay=true;
            if (adobePassShim.isSwf) {
                releasemodel.params = 'byContent=byFormat%3Df4m';
            } else {
                releasemodel.params = 'byContent=byFormat%3Dm3u';
            }
            releasemodel.endIndex=4;

            releasemodel.bind("releaseModelDiv");

            $pdk.controller.addEventListener("OnRefreshReleaseModel", function (e) {
                player.releaseURL = e.data.entries[0].url;
                player.formats = e.data.entries[0].format;
                player.bind();
            });
        } else {
            player.bind();
        }
    }

    if ($(document.documentElement).hasClass('ie')) { // check if IE, IE9
        // video fallback? "sorry, please update your browser"
    } else {
        if (options.protected) {
            initializeAdobePass2(options);

            startMPX();

            //Play video when custom overlay is clicked
            $('.video-info-overlay').click(function (e) {
                if ($(handle).hasClass('started')) {
                    $pdk.controller.pause();
                } else if (options.protected && !$(document.body).hasClass('has-video-provider')) {
                    window.providerDialogEnabled = true;
                    if (adobePass) {
                        adobePass.initiateCheckAuthProcess();
                    } else {
                        adobePassShim.getAuthentication();
                    }
                } else {
                    $pdk.controller.clickPlayButton();
                }
            });
        }
    }
};



/**
 * Sprout MPX video
 * @param  {HTMLElement} handle the video wrapper
 * @return {void}
 */
Sprout.Components['mvpd-access'] = function (handle, options) {
    var mvpdData;
    var modalHandler = document.getElementById('mvpd-access-modal');
    var _self = this;
    var searchInput = handle.querySelector('input');
    var searchButton = handle.querySelector('button');
    var closeBox = handle.querySelector('.js-modal-close');

    window.addEventListener('beforeunload', function() {
        if (window.mvpdFrame) {
            window.mvpdFrame.close();
            window.mvpdFrame = null;
        }
    });
    function onLoginProvider(mvpdId) {
        if (adobePass && adobePass.login) {
            adobePass.login(mvpdId);
        } else {
            if (mvpdId) {
                if (!window.mvpdFrame || window.mvpdFrame.closed) {
                    window.mvpdFrame = window.open(null, 'mvpdframe', 'width=600,height=500,resizable=1,modal=1,dialog=1');
                    //window.focus();
                }

                adobePassShim.setSelectedProvider(mvpdId);

                //Close providers box to allow user to start authentication
                modalHandler.modal.hide();
            }
            if (adobePassShim.isSwf) {
                adobePassShim.setSelectedProvider();
            }
        }
    }

    function mvpdAuthentication(e) {
        e.preventDefault();
        e.stopPropagation();
        onLoginProvider(e.target.id);
    }

    function renderList(e, mvpdList) {
        var mvpdListElement = handle.querySelector('.mvpd-grid');

        mvpdData = mvpdList;

        Sprout.Utils.loader(false);

        _.each(mvpdList.featured,
            function (mvpd) {
                Sprout.mvpd[mvpd.mvpd_id] = mvpd;

                var item = document.createElement('li');
                var anchor = document.createElement('a');
                var image = document.createElement('img');
                image.src = mvpd.mvpd_logo;
                image.alt = mvpd.title;
                anchor.appendChild(image);
                item.appendChild(anchor);
                mvpdListElement.appendChild(item);

                item.addEventListener('click', function() {
                    onLoginProvider(mvpd.mvpd_id);
                });
            });

        _.each(mvpdList.not_featured,
            function (mvpd) {
                Sprout.mvpd[mvpd.mvpd_id] = mvpd;
            });

        searchInput.setData(_.pluck(mvpdList.featured.concat(mvpdList.not_featured), 'title'));
    }

    function selectProvider(e) {
        e.preventDefault();
        e.stopPropagation();

        var selectedProvider;
        if (searchInput.value) {
            selectedProvider = _.findWhere(mvpdData.featured.concat(mvpdData.not_featured), {'title': searchInput.value});

            if (selectedProvider) {
                onLoginProvider(selectedProvider.mvpd_id);
            }
        }
    }

    this.show = function (mvpdList) {
        if (mvpdList) {
            mvpdData = mvpdList;
        }

        $(handle).removeClass('select-mvpd');

        if (!mvpdData) {
            // If authentication error, initialize MVPD component
            Sprout.Utils.loader(true);
            Sprout.Services.getMVPD(renderList.bind(_self));
        } else {
            Sprout.Utils.loader(false);
        }

        modalHandler.modal.show();
    };

    handle['mvpd-access'] = this;
    searchButton.addEventListener('click', selectProvider);
    searchInput.addEventListener('select', selectProvider);

    closeBox.addEventListener('click', function() {
        onLoginProvider();
    });
};


/**
 * Sprout MPX video
 * @param  {HTMLElement} handle the video wrapper
 * @return {void}
 */
Sprout.Components['mvpd-provider'] = function (handle, options) {

    function setMVPDProvider(mvpd) {
        if (mvpd) {
            $(document.body).addClass('has-video-provider');
            handle.querySelector('.provider-logo').href = mvpd.mvpd_url;
            handle.querySelector('img').src = decodeURIComponent(mvpd.mvpd_color);
        } else {
            $(document.body).removeClass('has-video-provider');
        }
    }

    function updateSelectedMVPD(id) {
        var selectedMvpd = null;
        if (id) {
            if (Sprout.mvpd[id]) {
                setMVPDProvider(Sprout.mvpd[id]);
            } else {
                Sprout.Services.getMVPD(function(e, data) {
                    if (data && data.status) {
                        setMVPDProvider(data.mvpd);
                    } else {
                        setMVPDProvider();
                    }
                }, id);
            }
        } else {
            setMVPDProvider();
        }
    }

    handle.querySelector('.logout').addEventListener('click', function(){
        $(document.body).removeClass('has-video-provider');

        if (adobePass && adobePass.logout) {
            adobePass.logout();
        } else {
            adobePassShim.logout();
        }
        setTimeout(window.location.reload, 3000);
    });

    window.updateSelectedMVPD = updateSelectedMVPD;
};

function initializeAdobePass2(options) {
    function onDisplayProviderDialog(mvpdList) {
        if (window.providerDialogEnabled) {
            var accessHandle = document.querySelector('.mvpd-access');
            if (accessHandle && accessHandle['mvpd-access']) {
                accessHandle['mvpd-access'].show();
            }
        }
        videoLoader();
    }

    function createMVPDIFrameCallback(width, height) {
        if (window.mvpdFrame && !window.mvpdFrame.closed) {
            window.mvpdFrame.resizeTo(width, height);
            window.mvpdFrame.innerWidth = width;
            window.mvpdFrame.innerHeight = height;
            window.mvpdFrame.focus();
            window.mvpdFrame.opener = window;
        }
    }

    function traceTokenCallback(token) {
    }

    function entitlementLoadedCallback() {
        var channel = 'sprout';
        adobePassShim.setProviderDialogURL('NOFLASH');
    }
    function setAuthenticationStatus(status, message) {
        if (!status && message.toLowerCase() === 'generic authentication error' && window.providerDialogEnabled) {
            displayMediaError();
        }
    }
    function onSendTrackingData(trackingEventType, trackingData) {
        switch(trackingEventType) {
        case 'authenticationDetection':
            if (window.updateSelectedMVPD) {
                if (trackingData[0] && trackingData[1]) {
                    if (trackingData[1] !== 'undefined') {
                        window.updateSelectedMVPD(trackingData[1]);
                        adobePassShim.setResourceId('sprout');
                    }
                }
            }
            break;
        case 'authorizationDetection':
            if (trackingData[0]) {
                $(document.body).removeClass('video-provider-error');

                if (options.autoplay) {
                    $pdk.controller.clickPlayButton();
                    options.autoplay = false;
                }
            } else {
                $(document.body).addClass('video-provider-error');
                displayMediaError();
            }
            break;
        }
        setTimeout(videoLoader,500);
    }
    function onTokenRequestFailed() {
        if (window.providerDialogEnabled) {
            displayMediaError();
        }
    }

    function entitlementLoadedAuthenticateCallback() {
    }

    window.onEntitlementLoadedAuthenticateCallback = entitlementLoadedAuthenticateCallback;

    window.onEntitlementLoadedCallback = entitlementLoadedCallback;
    window.swfLoaded = function() {
        adobePassShim.setProviderDialogURL('NOFLASH');
        if (!Sprout.Utils.cookies.test()) {
            displayMediaError();
        }
    };
    window.displayProviderDialog = onDisplayProviderDialog;
    window.displayMVPDPickerCallback = onDisplayProviderDialog;
    window.onAuthenticationStatusCallback = setAuthenticationStatus;
    window.onTrackingDataCallback = onSendTrackingData;
    window.sendTrackingData = onSendTrackingData;
    window.createMVPDIFrame = createMVPDIFrameCallback;
    window.traceToken = traceTokenCallback;
    window.tokenRequestFailedCallback = onTokenRequestFailed;

    window.entitlementLoaded = function() {
        var channel = 'sprout';
        accessEnabler.setRequestor(channel);
        accessEnabler.checkAuthentication();
    };
}
var google;
/**
 * Sprout Video Ads
 * @return {Sprout.Pages.splash} A Sprout Splash page object
 */
Sprout.Components['videoAd'] = function (handle) {
    // Copyright 2013 Google Inc. All Rights Reserved.
    // You may study, modify, and use this example for any purpose.
    // Note that this example is provided "as is", WITHOUT WARRANTY
    // of any kind either expressed or implied.
    var adsManager,
        adsLoader,
        adsRequest,
        adDisplayContainer,
        intervalTimer,
        videoContent,
        adContainer,
        adCountdown,
        messagesTargetWindow,
        messagesTargetHost,
        lastMessage,
        options = Sprout.Utils.getDataOptions(handle);


    // extend options
    options = _.extend({
        'videoContent': '#sproutAdsVideoContainer',
        'adContainer': '#sproutAdsContainer',
        'videoWrapper': '#sproutVideoIframe',
        'countdown': '#sproutAdsCountdown',
        'inline': true
    }, options);

    videoContent = handle.querySelector(options.videoContent);
    adContainer = handle.querySelector(options.adContainer);
    adCountdown = handle.querySelector(options.countdown);

    function createAdDisplayContainer() {
        // We assume the handle is the DOM id of the element that will house
        // the ads.
        adDisplayContainer =
            new google.ima.AdDisplayContainer(adContainer, videoContent);
    }

    function initializeMessages() {
        messagesTargetHost = 'http://player.theplatform.com';
        if (options.inline) {
            messagesTargetHost = options.url;
        }

        if (options.inline) {
            messagesTargetWindow = window;
        } else {
            messagesTargetWindow = document.querySelector(options.videoWrapper).contentWindow;
        }
        window.addEventListener("message", processVideoAdsMessages, false);
    }

    function initialize() {
        // Create the ad display container.
        createAdDisplayContainer();
        //videoContent.load();
        // Create ads loader.
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);
        // Listen and respond to ads loaded and error events.
        adsLoader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            onAdsManagerLoaded,
            false);
        adsLoader.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            onAdError,
            false);

        // Request video ads.
        adsRequest = new google.ima.AdsRequest();

        var customParams = 'pos=video&' +
            's1=' + options.s1 + '&' +
            's2=' + options.s2 + '&' +
            'show=' + options.show;

        if (options.episode) {
            customParams += '&episodeid=' + options.episode;
        }

        if (options.test) {
            customParams += '&test=' + options.test;
        }

        adsRequest.adTagUrl =
            'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&' +
            'iu=5184/sprout.main/' + options.s1 + '&gdfp_req=1&' +
            'impl=s&env=vp&cmsid=&vid=&output=xml_vast2&unviewed_position_start=1&' +
            'description_url=http://sproutonline.com&' +
            'cust_params=' + encodeURIComponent(customParams) + '&' +
            //'url=[referrer_url]&' +
            'url=' + options.url + '&' +
            'correlator=[timestamp]&' +
            '';

        //adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';

        // Specify the linear and nonlinear slot sizes. This helps the SDK to
        // select the correct creative if multiple are returned.
        adsRequest.linearAdSlotWidth = 640;
        adsRequest.linearAdSlotHeight = 480;

        adsRequest.nonLinearAdSlotWidth = 640;
        adsRequest.nonLinearAdSlotHeight = 150;
    }

    function requestAds() {
        // Initialize the container. Must be done via a user action on mobile devices.
        adDisplayContainer.initialize();
        adsLoader.requestAds(adsRequest);
    }

    function onAdsManagerLoaded(adsManagerLoadedEvent) {
        // Get the ads manager.
        var adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        // videoContent should be set to the content video element.
        adsManager = adsManagerLoadedEvent.getAdsManager(
            videoContent, adsRenderingSettings);

        // Add listeners to the required events.
        adsManager.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            onAdError);
        adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
            onContentPauseRequested);
        adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
            onContentResumeRequested);
        adsManager.addEventListener(
            google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            onAdEvent);

        // Listen to any additional events, if necessary.
        adsManager.addEventListener(
            google.ima.AdEvent.Type.LOADED,
            onAdEvent);
        adsManager.addEventListener(
            google.ima.AdEvent.Type.STARTED,
            onAdEvent);
        adsManager.addEventListener(
            google.ima.AdEvent.Type.COMPLETE,
            onAdEvent);

        try {
            // Initialize the ads manager. Ad rules playlist will start at this time.
            adsManager.init(640, 480, google.ima.ViewMode.NORMAL);

            // Call play to start showing the ad. Single video and overlay ads will
            // start at this time; the call will be ignored for ad rules.
            adsManager.start();
        } catch (adError) {
            // An error may be thrown if there was a problem with the VAST response.
            //videoContent.play();
            onContentResumeRequested();
        }
    }

    function displayAdLoader(show) {
        var loaderElement = handle.querySelector('.loader');
        if (show) {
            $(loaderElement).addClass('active');
        } else {
            $(loaderElement).removeClass('active');
        }
    }

    function onAdEvent(adEvent) {
        // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
        // don't have ad object associated.
        var ad = adEvent.getAd();
        var showLabel = false;
        displayAdLoader(false);

        switch (adEvent.type) {
        case google.ima.AdEvent.Type.LOADED:
            // This is the first event sent for an ad - it is possible to
            // determine whether the ad is a video ad or an overlay.
            displayAdLoader(true);
            showLabel = true;
            adCountdown.innerHTML = '';
            if (!ad.isLinear()) {
                // Position AdDisplayContainer correctly for overlay.
                // Use ad.width and ad.height.
                //videoContent.play();
                onContentResumeRequested();
            }
            break;
        case google.ima.AdEvent.Type.STARTED:
            // This event indicates the ad has started - the video player
            // can adjust the UI, for example display a pause button and
            // remaining time.
            onContentPauseRequested();
            showLabel = true;
            if (ad.isLinear()) {
                // For a linear ad, a timer can be started to poll for
                // the remaining time.
                intervalTimer = setInterval(
                    function () {
                        var remainingTime = adsManager.getRemainingTime();
                        var sRemaining = Sprout.Utils.fillString(Math.floor(remainingTime / 60).toString(), 2, '0');
                        sRemaining += ':' + Sprout.Utils.fillString(Math.floor(remainingTime % 60).toString(), 2, '0');
                        adCountdown.innerHTML = sRemaining;
                    },
                    300); // every 300ms
            }
            break;
        case google.ima.AdEvent.Type.COMPLETE:
            // This event indicates the ad has finished - the video player
            // can perform appropriate UI actions, such as removing the timer for
            // remaining time detection.
            onContentResumeRequested();
            if (ad.isLinear()) {
                clearInterval(intervalTimer);
                intervalTimer = null;
            }
            break;
        case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
            // This event indicates the ad has finished - the video player
            // can perform appropriate UI actions, such as removing the timer for
            // remaining time detection.
            onContentResumeRequested();
            if (ad.isLinear()) {
                clearInterval(intervalTimer);
                intervalTimer = null;
            }
            break;
        }
        if (showLabel) {
            $(handle).addClass('show-label');
        } else {
            $(handle).removeClass('show-label');
        }
    }

    function onAdError(adErrorEvent) {
        // Handle the error logging.
        onContentResumeRequested();
        if (adsManager) {
            adsManager.destroy();
        }
    }

    function onContentPauseRequested() {
        sendMessageToPlayer('adPauseRequested');
        //videoContent.pause();
        // This function is where you should setup UI for showing ads (e.g.
        // display ad timer countdown, disable seeking etc.)
        // setupUIForAds();
        $(handle).addClass('active');
    }

    function onContentResumeRequested() {
        sendMessageToPlayer('adResumeRequested');
        //videoContent.play();
        // This function is where you should ensure that your UI is ready
        // to play content. It is the responsibility of the Publisher to
        // implement this function when necessary.
        // setupUIForContent();
        $(handle).removeClass('active');
        if (intervalTimer) {
            clearInterval(intervalTimer);
            intervalTimer = null;
        }
    }

    function sendMessageToPlayer(msg) {
        messagesTargetWindow.postMessage(msg, messagesTargetHost);
    }

    function processVideoAdsMessages(e) {
        // Do we trust the sender of this message?
        if (messagesTargetHost.indexOf(e.origin) !== 0) {
            return;
        }

        if (lastMessage !== e.data) {
            lastMessage = e.data;
            switch (e.data) {
            case 'showAdsCard':
                $(handle).addClass('active');
                break;
            case 'initializeVideoAds':
                $(handle).addClass('active');
                requestAds();
                break;
            case 'videoCompleted':
                break;
            }
        }
    }
    if ( google ) {
        initialize();
        initializeMessages();
    }
};

/**
 * View Panel controller to handle Sprout View panels filter logic
 * @param  {HTMLElement} handle         The DOM element to contain the filter
 * @return {void}
 */
Sprout.Components.viewPanel = function(handle, options) {
    var lastRequest = null;
    var loaderTimer = null;
    if (!options) {
        options = Sprout.Utils.getDataOptions(handle);
    }

    var panelName = handle.getAttribute("aria-labelledby");
    var pageTabHandle = Sprout.Utils.getParentMatch(handle, '.tab-component');

    //Choose a view depending on the device
    if(Sprout.Utils.isTablet && options.viewTablet) {
        options.view = options.viewTablet;
    }
    if(Sprout.Utils.isMobile && options.viewMobile) {
        options.view = options.viewMobile;
    }

    // extend options
    options = _.extend({
        'container': '.view',
        'content': '.view-list ul',
        'onupdate': 'viewPanelUpdate',
        'pager': '.show-more',
        'autoScroll': false
    }, options);

    var filters = handle.querySelectorAll('.filter');

    var viewPanelUpdateEvent = document.createEvent('Event');
    viewPanelUpdateEvent.initEvent(options.onupdate, true, true);

    function updateContent(data, append) {
        var viewContainer = handle.querySelector(options.content);

        if (!viewContainer) {
            viewContainer = handle.querySelector(options.container);
        }

        if (viewContainer && data) {
            var pager = viewContainer.querySelector(options['pager']);
            if (append) {
                viewContainer.removeChild(pager);
                viewContainer.innerHTML += data;
            } else {
                viewContainer.innerHTML = data;
            }

            //Scroll page down to results if filters from the URL
            if (options.autoScroll && window.location.search.length > 0) {
                var viewList = handle.querySelector('.view-list');
                Sprout.Utils.scrollPage(viewList);
            }

            //Start filters components
            Sprout.Components._init(viewContainer);
            filters = handle.querySelectorAll('.filter');
            setFilterEvents();
        }
    }

    function hasContent() {
        var viewContainer = handle.querySelector(options.container);
        return (viewContainer && viewContainer.innerHTML.trim() !== '');
    }

    function onUpdateViewPanel(event, data, append) {
        updateContent(data, append);
        setTimeout(function() {
            handle.dispatchEvent(viewPanelUpdateEvent);
        }, 0);
    }

    function updateUrlFromCurrentFilters(replace) {
        var filtersValues = {};
        var filtersValuesUrl = {};
        var selectedOption;
        _.each(filters, function(filter){
            if (filter.filter && filter.filter.getActive()) {
                selectedOption = filter.filter.getActive();
                var filterKey = Sprout.Utils.getDataValue(filter, 'filter');
                var filterOption = Sprout.Utils.getDataOptions(selectedOption);
                filtersValuesUrl[filterKey] = filterOption;
                filtersValues[filterKey] = filterOption.id;
            }
        });

        /*@group update the url*/
        changeUrlFromFilter(filtersValuesUrl, replace);
        /*@end update the url*/

        return filtersValues;
    }

    function _updateViewPanel(reloadData, page, reRender, popBackData, replace) {
        var selectedOption;
        var filtersValues = {};

        if (reRender === undefined){
            reRender = false;
        }

        if (!reRender){
            filtersValues = updateUrlFromCurrentFilters(replace);
        } else {
            _.each(filters, function(filter, key){
                if (filter.filter) {
                    filter.filter.setActive(popBackData.filters[filter.filter.filterKey]);
                }
            });
            _.each(popBackData.filters, function(renderFilter, key){
                filtersValues[key] = renderFilter.id;
            });
            selectedOption = null;
        }

        if (hasContent()) {
            if (replace) {
                Sprout.Utils.emptyElement(handle.querySelector(options.container));
            } else {
                filtersValues.vmode = 'clean';
                if (page) {
                    filtersValues.page = page;
                }
            }
        }

        if (reloadData && options.view) {
            //AJAX CALL
            lastRequest = filtersValues;
            if (!loaderTimer) {
                loaderTimer = setTimeout(function() {
                    $(handle).addClass('loading');
                    loaderTimer = null;
                }, 1000);

            }
            Sprout.Services.getView(options.view, filtersValues, function(event, data) {
                if (loaderTimer) {
                    clearTimeout(loaderTimer);
                    loaderTimer = null;
                }
                $(handle).removeClass('loading');

                if (replace || lastRequest === filtersValues) {
                    onUpdateViewPanel(event, data, page);
                    lastRequest = null;
                }

            });
        }

    }
    var updateViewPanel = _.debounce(_updateViewPanel, 200);

    function changeUrlFromFilter(filters, replace) {
        //Featured mobile view should not update the url
        if (!panelName) {
            return;
        }

        var urlParams = [];
        var historyUrl = window.location.pathname;

        switch (panelName) {
            case "featured":
                break;
            case "shows":
                if (options.view.indexOf('watch/byshow') < 0) {
                    urlParams.push('mode=byshow');
                }
                break;
            default:
                urlParams.push('mode=by' + panelName);
                break;
        }

        //Reduce long switch by mapping the filters params into string url params
        _.each(filters, function(value, key) {
            if (value.name.toLowerCase() !== 'all' && value.name.toLowerCase() !== 'all ages') {
                urlParams.push(key + '=' + value.name);
            }
        });

        // Store active panel name
        var pushStateObj = {
            panel: panelName,
            filters: filters
        };

        if (urlParams.length > 0) {
            historyUrl += '?' + urlParams.join('&');
        }

        //Only add the push state when url is different to the current one
        if ((window.location.pathname + window.location.search) !== historyUrl || replace)
        {
            if (history.pushState) {
                //Store params for popstate event usage
                if (replace) {
                    history.replaceState(pushStateObj, "", historyUrl);
                } else {
                    history.pushState(pushStateObj, "", historyUrl);
                }
            }
        }
    }

    function isChildrenFilter(target) {
        return Array.prototype.some.call(filters, function(element) {
            return element === target;
        });
    }

    function onFilterChange(event) {
        if (isChildrenFilter(event.target)) {
            updateViewPanel(true);

            var viewContainer = handle.querySelector(options.content);
            if (Sprout.Utils.getDataValue(event.target, 'filter') === 'show') {
                Sprout.Utils.scrollPage(viewContainer);
            }
        }
    }

    function onFilterInit(event) {
        if (isChildrenFilter(event.target)) {
            updateUrlFromCurrentFilters(true);
        }
    }

    function onTabChange(event) {
        if (handle ===  event.target.tabPanel.getActive().panel) {
            updateViewPanel(!hasContent());
        }
    }

    function setFilterEvents() {
        var pager, pagerOptions;

        handle.removeEventListener('filterchange', onFilterChange);
        handle.addEventListener('filterchange', onFilterChange);

        //Init Pager
        var viewContainer = handle.querySelector(options.content);
        if (viewContainer) {
            pager = viewContainer.querySelector(options['pager']);
            if (pager) {
                pagerOptions = Sprout.Utils.getDataOptions(pager);
                if (pagerOptions.next) {
                    pager.addEventListener('click', function(event){
                        updateViewPanel(true, pagerOptions.next);
                    });
                }
            }
        }
    }

    setFilterEvents();

    if(options.updateOnPageLoad) {
        setTimeout(function() {
            $(handle).addClass('first-load');
            _updateViewPanel(true, 0, false, null, true);
            $(handle).removeClass('first-load');
        });
    } else if ($(handle).hasClass('selected')) {
        if (filters.length) {
            //Filters events
            handle.removeEventListener('filterinit', onFilterInit);
            handle.addEventListener('filterinit', onFilterInit);
        } else {
            updateUrlFromCurrentFilters(true);
        }
    }

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.panel === panelName) {
            var currentNode = window.location.pathname;

            if (currentNode !== '/watch'){
                pageTabHandle.tabPanel.setActive(panelName);
            }
            _updateViewPanel(true, 0, true, event.state);
        }
    });

    //Tabs events
    document.addEventListener('tabchange', onTabChange);
};


/**
 * Webform controller
 * @return {Sprout.Webform} Webform object
 */
Sprout.Webform = function(id, type, anonymous) {
    this.id = id;
    this.anonymous = anonymous;

    this.user = null;

    this.type = type;
};
Sprout.Webform.prototype = {
    /**
     * Submit webform
     * @param  {Object}     data
     * @param  {function}   callback
     * @return {void}
     */
    submit: function(data, callback) {
        var self = this;
        if (this.anonymous || this.user) {
            this.doSubmit(data, callback);
        } else if (Sprout.Utils.isUserAuthenticated) {
            Sprout.Services.getUser(function(event, userData) {
                self.user = userData;
                self.doSubmit(data, callback);
            });
        }
    },

    doSubmit: function(data, callback) {
        data = this.sanitizeData(data);
        switch (this.type) {
            case 'entityform':
                data.uid = this.user.uid;
                data.type = this.id;
                Sprout.Services.entityformSubmission(data, callback);
                break;
            case 'create-account':
                Sprout.Services.register(data, callback);
                break;
            case 'update-account':
                Sprout.Services.updateAccount(this.user.uid, data, callback);
                break;
            case 'forgotPassword':
                Sprout.Services.forgotPassword(data, callback);
                break;
            case 'create_sproutlet':
                data.hostEntityId = this.user.uid;
                Sprout.Services.addSproutlet(data, callback);
                break;
            default:
                Sprout.Services.webformSubmission(this.id, data, callback);
                break;
        }
    },

    /**
     * Sanitizes data to prevent XSS
     * @param data
     * @returns {*}
     */
    sanitizeData: function (data) {
        var self = this;
        for (var p in data) {
            if (typeof data[p] === 'object' && typeof data[p].und === 'object' && data[p].und !== null) {
                for (var i = 0; i < data[p].und.length; i++) {
                    switch (typeof data[p].und[i].value) {
                        case 'object':
                            data[p].und[i].value = self.sanitizeData(data[p].und[i].value);
                            break;
                        case 'undefined':
                            data[p].und[i] = self.sanitizeData(data[p].und[i]);
                            break;
                        default:
                            data[p].und[i].value = Sprout.Utils.htmlEscape(data[p].und[i].value);
                            break;
                    }
                }
            } else {
                if (typeof data[p] === 'string') {
                    data[p] = Sprout.Utils.htmlEscape(data[p]);
                }
            }
        }
        return data;
    }
};;
