var wordsBits;exports.init=function(t){wordsBits=t.toString(),wordsBits=wordsBits.split(",")},exports.test=function(t){function n(){function t(){return s}function n(t){return s[Math.floor(t/32)]>>>t%32&1}function r(t){s[Math.floor(t/32)]|=1<<t%32}function e(t){s=t}var s=[];return{test:n,set:r,get:t,setBits:e}}function r(){var t=Math.floor(18.27926539796161)+32;return function(n){for(var r=1,e=0;e<n.length;++e)r=t*r+n.charCodeAt(e)&2147483647;return r}}function e(t,r){function e(n){for(var e=0;e<r.length;++e)u.set(r[e](n)%t)}function s(n){for(var e=0;e<r.length;++e)if(!u.test(r[e](n)%t))return!1;return!0}function i(){return u.get()}function o(t){u.setBits(t)}var u=n();return{add:e,test:s,get:i,setBits:o}}var s=t,i=s.slice(-2);"'s"==i&&(s=s.slice(0,t.length-2));var o=s.slice(-1);"s"==o&&(s=s.slice(0,t.length-1));var u=e(430000,[r(),r()]);return u.setBits(wordsBits),u.test(s)};