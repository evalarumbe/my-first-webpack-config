// Remember: Use this to clear babel's cache:
// rm -rf node_modules/.cache/babel-loader/

// maybe try it this way later: https://stackoverflow.com/questions/29766216/how-to-specify-cachedirectory-option-when-using-babel-loader-with-webpack

// Eva: No loader
// Sys: minified output is 1775 chars.
!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);const n=function(e){switch(e){case"France":return"Shakespeare & Co";case"Egypt":return"Alexandria";case"Myst":return"the tower"}};window.addEventListener("load",(function(){const e=[...document.getElementById("locations").children],t=e[Math.floor(Math.random()*e.length)].innerText;console.log("Welcome to the debug script! Here are all the possible libraries:"),console.log("France: "+n("France")),console.log("Egypt: "+n("Egypt")),console.log("Myst: "+n("Myst")),console.log(`I log therefore I am chilling at ${n(t)} in ${t}`),console.log("Do some more ES6 stuff with WeakSet");const o=new WeakSet([]);console.log(o),console.log("Behold all these posts: "+void async function(){const e=await fetch("https://jsonplaceholder.typicode.com/posts");return await e.json()}().then(e=>console.log(e))),console.log("3 ** 2? 9")}))}]);

// Eva: npm i babel-loader @babel/core
// and add the laoder to webpack.config.js
// Sys: no change, as expected, since no plugins/presets are specified
