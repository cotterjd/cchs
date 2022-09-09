(function(){"use strict";var e={442:function(e,n,t){var o=t(963),i=t(823),r=t(252);function s(e,n){const t=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(t)}var u=t(744);const l={},a=(0,u.Z)(l,[["render",s]]);var c=a,d=t(205);(0,d.z)("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var f=t(201),h=t(577),g={key:0},p={key:1},m=(0,r._)("h2",null,"Completed Units",-1),b={class:"saved-list"},v=["onClick"],C=(0,r._)("i",{class:"pi pi-sync sync-icon"},null,-1),y=[C],k=["onClick"],w=(0,r._)("i",{class:"pi pi-trash trash-icon"},null,-1),S=[w],D={class:"center"};function N(e,n,t,i,s,u){var l=(0,r.up)("input-text"),a=(0,r.up)("Button"),c=(0,r.up)("spacer-break"),d=(0,r.up)("ProgressSpinner"),f=(0,r.up)("Divider"),C=(0,r.up)("Dialog"),w=(0,r.up)("BlockUI");return(0,r.wg)(),(0,r.iD)(r.HY,null,[e.storageUser?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",g,[(0,r.Wm)(l,{modelValue:e.inputUser,"onUpdate:modelValue":n[0]||(n[0]=function(n){return e.inputUser=n}),type:"text",class:"full p-inputtext-lg",placeholder:"User name"},null,8,["modelValue"]),(0,r.Wm)(a,{onClick:e.onSaveUser,label:"Save User Name",class:"full p-button-lg"},null,8,["onClick"]),(0,r.Wm)(c)])),e.storageJob?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",p,[(0,r.Wm)(l,{modelValue:e.inputJob,"onUpdate:modelValue":n[1]||(n[1]=function(n){return e.inputJob=n}),type:"text",class:"full p-inputtext-lg",placeholder:"Property name"},null,8,["modelValue"]),(0,r.Wm)(a,{onClick:e.onSaveJob,label:"Start New Property",class:"full p-button-lg"},null,8,["onClick"]),(0,r.Wm)(c)])),(0,r.Wm)(l,{modelValue:e.unitName,"onUpdate:modelValue":n[2]||(n[2]=function(n){return e.unitName=n}),type:"text",class:"full p-inputtext-lg",placeholder:"Unit"},null,8,["modelValue"]),(0,r.Wm)(c),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.greenCodes,(function(n){return(0,r.wg)(),(0,r.iD)("div",{key:n},[(0,r.Wm)(a,{onClick:function(t){return e.onAddCode(n)},label:n,class:(0,h.C_)(["full p-button-lg",e.chosenCodes.includes(n)?"p-button-secondary":""])},null,8,["onClick","label","class"]),(0,r.Wm)(c)])})),128)),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.yellowCodes,(function(n){return(0,r.wg)(),(0,r.iD)("div",{key:n},[(0,r.Wm)(a,{onClick:function(t){return e.onAddCode(n)},label:n,class:(0,h.C_)(["full p-button-lg",e.chosenCodes.includes(n)?"p-button-secondary":"p-button-warning"])},null,8,["onClick","label","class"]),(0,r.Wm)(c)])})),128)),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.redCodes,(function(n){return(0,r.wg)(),(0,r.iD)("div",{key:n},[(0,r.Wm)(a,{onClick:function(t){return e.onAddCode(n)},label:n,class:(0,h.C_)(["full p-button-lg",e.chosenCodes.includes(n)?"p-button-secondary":"p-button-danger"])},null,8,["onClick","label","class"]),(0,r.Wm)(c)])})),128)),(0,r.Wm)(a,{onClick:e.onAddCodes,label:"Add Codes",class:"full p-button-lg p-button-success"},null,8,["onClick"]),(0,r.Wm)(c),(0,r.Wm)(a,{onClick:e.onEndJob,label:"End Job",class:"full p-button-lg p-button-help"},null,8,["onClick"]),m,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.visibleCodes,(function(n){return(0,r.wg)(),(0,r.iD)("ul",{key:n.id,class:"left-align list"},[(0,r._)("li",b,[(0,r._)("span",null,(0,h.zw)(n.unit),1),(0,r._)("span",null,(0,h.zw)(n.codes),1),n.id||e.saving!==n.unit?n.id?((0,r.wg)(),(0,r.iD)("button",{key:2,onClick:function(t){return e.onDeleteCode(n)},class:"small-btn"},S,8,k)):((0,r.wg)(),(0,r.iD)("button",{key:1,onClick:function(t){return e.onSyncCode(n)},class:(0,h.C_)("small-btn ".concat(e.syncing===n.unit?"spin":""))},y,10,v)):((0,r.wg)(),(0,r.j4)(d,{key:0,style:{height:"25px",width:"25px","margin-right":"5px"}}))]),(0,r.Wm)(f)])})),128)),(0,r.Wm)(C,{header:"Other description",visible:e.displayOtherDesc,"onUpdate:visible":n[4]||(n[4]=function(n){return e.displayOtherDesc=n})},{default:(0,r.w5)((function(){return[(0,r.Wm)(l,{type:"text",modelValue:e.otherDesc,"onUpdate:modelValue":n[3]||(n[3]=function(n){return e.otherDesc=n}),class:"full p-inputtest-lg"},null,8,["modelValue"])]})),_:1},8,["visible"]),(0,r.Wm)(w,{blocked:e.loading,"full-screen":!0},null,8,["blocked"]),(0,r.wy)((0,r._)("div",D,[(0,r.Wm)(d)],512),[[o.F8,e.loading]])],64)}var U=t(655),J=t(76),j=t(325),O=t(541),W=t(242),P=t(895),T=t(667),_="https://cchs-be.onrender.com",B=function(e){return fetch("".concat(_,"/unitcode/").concat(e),{method:"DELETE"}).then((function(e){return e.json()}))},I=function(e){return fetch("".concat(_,"/unitcodes?job=").concat(encodeURIComponent(e))).then((function(e){return e.json()}))},x=function(e){return fetch("".concat(_,"/unitcode"),{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(n){return{success:500!==n.status,unitCode:e}}))},V=t(155);const A=(0,r._)("br",null,null,-1),E=(0,r._)("br",null,null,-1);function M(e,n){return(0,r.wg)(),(0,r.iD)(r.HY,null,[A,E],64)}const Z={},R=(0,u.Z)(Z,[["render",M]]);var H=R,L=["TV","Dog","Blocked","Locked From The Inside","No Key","Key Not Work","Skip Per Management","Minor","Denied Entry","see css","OTHER"],F=["Missing Chimney Cap","Missing Damper","Broken Damper - Other","Broken Damper - stays open","Broken Damper - closed/won't open","Broken Damper - Not Connected","Missing Spark Screen","Damaged Spark Screen","Damaged Left Refractory Panel","Damaged Back Refractory Panel","Damaged Right Refractory Panel","Damaged Base Panel","Missing Left Refractory Panel","Missing Back Refractory Panel","Missing Right Refractory Panel","Missing Base Panel","see  css","Went Back"],K=["Completed. No Issues."],Y=(0,r.aZ)({name:"HomeView",components:{InputText:J.Z,Button:j.Z,Dialog:O.Z,Divider:W.Z,ProgressSpinner:P.Z,BlockUI:T.Z,SpacerBreak:H},data:function(){return{greenCodes:[],yellowCodes:[],redCodes:[],inputUser:"",inputJob:"",storageUser:"",storageJob:"",savedCodes:[],visibleCodes:[],unitName:"",chosenCodes:[],otherDesc:"",displayOtherDesc:!1,syncing:"",loading:!1,saving:""}},mounted:function(){return(0,U.mG)(this,void 0,void 0,(function(){return(0,U.Jh)(this,(function(e){return this.greenCodes=K,this.yellowCodes=F,this.redCodes=L,this.storageUser=localStorage.getItem("user")||"",this.storageJob=localStorage.getItem("job")||"",[2]}))}))},watch:{storageJob:function(){return(0,U.mG)(this,void 0,void 0,(function(){var e=this;return(0,U.Jh)(this,(function(n){return this.loading=!0,this.visibleCodes=this.getStorageCodes(),this.getSavedCodes().then((function(){e.loading=!1})),[2]}))}))}},methods:{onSaveUser:function(){localStorage.setItem("user",this.inputUser),this.storageUser=localStorage.getItem("user")||""},onSaveJob:function(){localStorage.setItem("job",this.inputJob),this.storageJob=localStorage.getItem("job")||""},onEndJob:function(){localStorage.setItem("job",""),this.inputJob="",this.storageJob=""},onAddCode:function(e){e.toLowerCase().includes("other")&&(this.displayOtherDesc=!0),this.chosenCodes=this.chosenCodes.includes(e)?this.chosenCodes.filter((function(n){return n!==e})):(0,U.ev)((0,U.ev)([],this.chosenCodes,!0),[e],!1)},onAddCodes:function(){var e=this;if(!this.storageUser)return alert("Please add your user.");if(!this.storageJob)return alert("Please add a job.");if(!this.unitName)return alert("Please add unit.");this.saving=this.unitName;var n=this.chosenCodes.map((function(n){return n.toLowerCase().includes("other")?"".concat(n," ").concat(e.otherDesc):n}));this.saveCodes(n)},onDeleteCode:function(e){var n=window.confirm("Are you sure you want to delete unit code ".concat(e.unit," ").concat(e.codes,"?"));n&&B(e.id).then(this.removeUnitCode)},onSyncCode:function(e){var n=this;this.syncing=e.unit;var t=function(e){return n.syncing=""};x(e).then(t).then(this.getSavedCodes).catch(t)},saveCodes:function(e){var n={user:this.storageUser,unit:this.unitName,codes:e.join(", "),property:this.storageJob};this.addCodeToUI(n),x(n).then(this.getSavedCodes).then(this.resetValues)},addCodeToUI:function(e){var n=this.getStorageCodes();localStorage.setItem(this.storageJob,JSON.stringify((0,U.ev)([e],n,!0))),this.visibleCodes=(0,U.ev)([e],this.visibleCodes,!0)},getSavedCodes:function(){return(0,U.mG)(this,void 0,void 0,(function(){var e,n,t;return(0,U.Jh)(this,(function(o){switch(o.label){case 0:return[4,I(this.storageJob)];case 1:return e=o.sent(),n=this.getStorageCodes(),t=V.zGw((function(e){return V.mNm(V.vgT("unit"),e)}),(function(e){return e.sort((function(e,n){return Number.isNaN(Number(e.unit))?0:Number(e.unit)-Number(n.unit)>1?-1:Number(e.unit)-Number(n.unit)<1?1:0}))}))((0,U.ev)((0,U.ev)([],e,!0),n,!0)),this.savedCodes=e,this.visibleCodes=t,[2]}}))}))},removeUnitCode:function(e){this.visibleCodes=this.visibleCodes.filter((function(n){return n.id!==e.id})),this.syncing=""},isUnsaved:function(e){var n=this.getStorageCodes();return n.some((function(n){return n.unit===e.unit}))},getStorageCodes:function(){return JSON.parse(localStorage.getItem(this.storageJob)||"[]")},resetValues:function(){this.unitName="",this.chosenCodes=[],this.syncing="",this.saving="",this.loading=!1}}});const q=(0,u.Z)(Y,[["render",N]]);var z=q,G=[{path:"/",name:"home",component:z},{path:"/about",name:"about",component:function(){return t.e(443).then(t.bind(t,994))}}],Q=(0,f.p7)({history:(0,f.r5)(),routes:G}),X=Q,$=t(907),ee=(0,$.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}});(0,o.ri)(c).use(ee).use(X).use(i.Z).mount("#app")}},n={};function t(o){var i=n[o];if(void 0!==i)return i.exports;var r=n[o]={exports:{}};return e[o](r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(n,o,i,r){if(!o){var s=1/0;for(c=0;c<e.length;c++){o=e[c][0],i=e[c][1],r=e[c][2];for(var u=!0,l=0;l<o.length;l++)(!1&r||s>=r)&&Object.keys(t.O).every((function(e){return t.O[e](o[l])}))?o.splice(l--,1):(u=!1,r<s&&(s=r));if(u){e.splice(c--,1);var a=i();void 0!==a&&(n=a)}}return n}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[o,i,r]}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,o){return t.f[o](e,n),n}),[]))}}(),function(){t.u=function(e){return"js/about.92970bfa.js"}}(),function(){t.miniCssF=function(e){}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="cchs-fe:";t.l=function(o,i,r,s){if(e[o])e[o].push(i);else{var u,l;if(void 0!==r)for(var a=document.getElementsByTagName("script"),c=0;c<a.length;c++){var d=a[c];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==n+r){u=d;break}}u||(l=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,t.nc&&u.setAttribute("nonce",t.nc),u.setAttribute("data-webpack",n+r),u.src=o),e[o]=[i];var f=function(n,t){u.onerror=u.onload=null,clearTimeout(h);var i=e[o];if(delete e[o],u.parentNode&&u.parentNode.removeChild(u),i&&i.forEach((function(e){return e(t)})),n)return n(t)},h=setTimeout(f.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=f.bind(null,u.onerror),u.onload=f.bind(null,u.onload),l&&document.head.appendChild(u)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/"}(),function(){var e={143:0};t.f.j=function(n,o){var i=t.o(e,n)?e[n]:void 0;if(0!==i)if(i)o.push(i[2]);else{var r=new Promise((function(t,o){i=e[n]=[t,o]}));o.push(i[2]=r);var s=t.p+t.u(n),u=new Error,l=function(o){if(t.o(e,n)&&(i=e[n],0!==i&&(e[n]=void 0),i)){var r=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;u.message="Loading chunk "+n+" failed.\n("+r+": "+s+")",u.name="ChunkLoadError",u.type=r,u.request=s,i[1](u)}};t.l(s,l,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,o){var i,r,s=o[0],u=o[1],l=o[2],a=0;if(s.some((function(n){return 0!==e[n]}))){for(i in u)t.o(u,i)&&(t.m[i]=u[i]);if(l)var c=l(t)}for(n&&n(o);a<s.length;a++)r=s[a],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(c)},o=self["webpackChunkcchs_fe"]=self["webpackChunkcchs_fe"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(442)}));o=t.O(o)})();
//# sourceMappingURL=app.99cd3970.js.map