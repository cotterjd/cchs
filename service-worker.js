if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const c=e=>i(e,o),u={module:{uri:o},exports:l,require:c};s[o]=Promise.all(n.map((e=>u[e]||c(e)))).then((e=>(r(...e),l)))}}define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"Vine"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.831c80ea.css",revision:null},{url:"/css/chunk-vendors.e57df5c1.css",revision:null},{url:"/fonts/primeicons.29151a74.woff",revision:null},{url:"/fonts/primeicons.5f5d08cd.ttf",revision:null},{url:"/fonts/primeicons.964f445f.eot",revision:null},{url:"/img/color.dae87a04.png",revision:null},{url:"/img/primeicons.76044b1c.svg",revision:null},{url:"/index.html",revision:"b427fea06192ac0c9353f87e0275b2f2"},{url:"/js/about.71a5fbcb.js",revision:null},{url:"/js/app.ed9d3718.js",revision:null},{url:"/js/chunk-vendors.d34ad96e.js",revision:null},{url:"/manifest.json",revision:"27f6d8b0c779c3ce5db8c9050c0dd17e"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
