!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("redux-saga/effects")):"function"==typeof define&&define.amd?define(["redux-saga/effects"],n):t["roadhog-saga"]=n(t.reduxSaga_effects)}(this,function(t){"use strict";var n=function(t,n,r){return{type:"API_"+t+"_"+n,payload:r}},r=function(r,e,o){return regeneratorRuntime.mark(function u(i){var c;return regeneratorRuntime.wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return c=void 0,u.prev=1,u.next=4,t.put(n(r,"STARTED"));case 4:return u.next=6,e(i);case 6:if((c=u.sent).ok||!o){u.next=9;break}throw new Error("the fetch response has an error : "+c.status+" - "+c.statusText);case 9:u.next=15;break;case 11:return u.prev=11,u.t0=u.catch(1),u.next=15,t.put(n(r,"ERROR",u.t0));case 15:return u.next=17,t.put(n(r,"END"));case 17:return u.abrupt("return",c);case 18:case"end":return u.stop()}},u,this,[[1,11]])})},e=function(t){if(!/.*_.*/.test(t))throw new Error("Wrong format for action: '"+t+"'. should be '<METHOD_NAME>_<RESOURCE_NAME>' (ie: GET_USERS)")},o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t},i=function(){function t(t,n){var r=[],e=!0,o=!1,u=void 0;try{for(var i,c=t[Symbol.iterator]();!(e=(i=c.next()).done)&&(r.push(i.value),!n||r.length!==n);e=!0);}catch(t){o=!0,u=t}finally{try{!e&&c.return&&c.return()}finally{if(o)throw u}}return r}return function(n,r){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return t(n,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),c=function(t){if(Array.isArray(t)){for(var n=0,r=Array(t.length);n<t.length;n++)r[n]=t[n];return r}return Array.from(t)},a=function(t){return t.config},f=function(t){return a(t).api},s=function(t){return a(t).mocks},p=function(t){return function(n){return f(n)[t]}},d=function(t){return function(n){return function(r){return p(t)(r)[n]}}},y=function(t){return function(n){return function(r){var e=f(r),o=p(t)(r),i=d(t)(n)(r),c={method:n};return e.options&&(c=u({},c,e.options)),o.options&&(c=u({},c,o.options)),i&&i.options&&(c=u({},c,i.options)),c}}},h=function(t){return function(n){return function(r){var e=p(t)(r),o=d(t)(n)(r);return void 0===o?e:"string"==typeof o?o:o.url}}},l=function(t){return function(n){return function(r){var e=s(r);if(e)return([].concat(c(e.filter(function(t){return t.method===n})),c(e.filter(function(t){return void 0===t.method})),c(e.filter(function(t){return t.method!==n&&void 0!==t.method}))).find(function(n){return n.match.test(t)})||{}).fallback}}},m=function(t){return Array.isArray(t)?t.map(function(t){return encodeURIComponent(t)}):encodeURIComponent(t)},b=function(t){return!t||"object"===(void 0===t?"undefined":o(t))&&0===Object.keys(t).length||Array.isArray(t)&&0===t.length},v=function(t){return function(n){return b(n)?t:t+(t.endsWith("/")?"":"/")+m(n).join("/")}},x=function(t){return function(n){if(b(n))return t;var r=Object.keys(n).map(function(t){return t+"="+m(n[t])}),e=t.endsWith("/")||t.endsWith("&")||t.endsWith("?")?"":"/",o=t.endsWith("&")||t.endsWith("?")?"":"?";return""+t+e+o+r.join("&")}},g=function(n){return regeneratorRuntime.mark(function r(){var e,o,c,a,f,s,p=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return e=n.split(/_(.+)/),o=i(e,2),c=o[0],a=o[1],r.next=3,t.select(y(a)(c));case 3:return f=r.sent,f=u({},f,{body:p.body}),r.next=7,t.select(h(a)(c));case 7:return s=r.sent,s=v(s)(p.path),s=x(s)(p.query),r.abrupt("return",[s,f]);case 11:case"end":return r.stop()}},r,this)})};return function(n){return regeneratorRuntime.mark(function o(u){var c,a,f,s,p,d;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return e(n),o.next=3,g(n)(u);case 3:return c=o.sent,a=i(c,2),f=a[0],s=a[1],o.next=9,t.select(l(f)(s.method));case 9:return p=o.sent,o.next=12,r(n,function(){return fetch(f,s)},!p)();case 12:if(!(d=o.sent).ok){o.next=17;break}return o.next=16,d.json();case 16:return o.abrupt("return",o.sent);case 17:return o.abrupt("return",p);case 18:case"end":return o.stop()}},o,this)})}});
//# sourceMappingURL=index.js.map
