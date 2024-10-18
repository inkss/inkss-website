let SearchService=(()=>{const e={queryText:null,data:null,template:'<div id="u-search">\n  <div class="modal">\n    <header class="modal-header" class="clearfix">\n      <form id="u-search-modal-form" class="u-search-form" name="uSearchModalForm">\n        <input type="text" id="u-search-modal-input" class="u-search-input" />\n        <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit">\n          <span class="fa-solid fa-search"></span>\n        </button>\n      </form>\n      <a id="u-search-btn-close" class="btn-close"> <span class="fa-solid fa-times"></span> </a>\n    </header>\n    <main class="modal-body">\n      <ul class="modal-results"></ul>\n    </main>\n  </div>\n  <div id="modal-overlay" class="modal-overlay"></div>\n</div>\n',init:()=>{let t=document.createElement("div");t.innerHTML+=e.template,document.body.append(t),document.querySelectorAll(".u-search-form").forEach((t=>{t.addEventListener("submit",e.onSubmit,!1)})),document.querySelector("#u-search-modal-input").addEventListener("input",e.onSubmit),document.querySelector("#u-search-btn-close").addEventListener("click",e.close,!1),document.querySelector("#modal-overlay").addEventListener("click",e.close,!1)},onSubmit:t=>{t.preventDefault();let a=t.target.querySelector(".u-search-input");e.queryText=a?a.value:t.target.value,e.queryText&&e.search()},search:async()=>{document.querySelectorAll(".u-search-input").forEach((t=>{t.value=e.queryText})),document.querySelector("#u-search").style.display="block",e.data||(e.data=await e.fetchData());let t="";t+=e.buildResultList(e.data.pages),t+=e.buildResultList(e.data.posts),""===t&&(t=`<div id="resule-hits-empty"><i class="fa-solid fa-box-open"></i><p>${volantis.GLOBAL_CONFIG.languages.search.hits_empty.replace(/\$\{query}/,e.queryText)}</p></div>`),document.querySelector("#u-search .modal-results").innerHTML=t,window.pjax&&pjax.refresh(document.querySelector("#u-search")),document.addEventListener("keydown",(function t(a){"Escape"===a.code&&(e.close(),document.removeEventListener("keydown",t))}))},close:()=>{document.querySelector("#u-search").style.display="none"},fetchData:()=>fetch(volantis.GLOBAL_CONFIG.search.dataPath).then((e=>e.text())).then((e=>JSON.parse(e))),buildResultList:t=>{let a="";return t.forEach((t=>{t.text&&(t.text=t.text.replace(/12345\d*/g,"")),!t.title&&t.text&&(t.title=t.text.trim().slice(0,15)),e.contentSearch(t)&&(a+=e.buildResult(t.permalink,t.title,t.digest))})),a},contentSearch:t=>{let a=t.title.trim().toLowerCase(),s=t.text.trim().toLowerCase(),r=e.queryText.trim().toLowerCase().split(/[-\s]+/),n=!1,l=-1,i=-1,c=-1;return a&&s&&r.forEach(((e,u)=>{if(l=a.indexOf(e),i=s.indexOf(e),l<0&&i<0?n=!1:(n=!0,i<0&&(i=0),0===u&&(c=i)),n){s=t.text.trim();let e=0,a=0;if(c>=0){e=Math.max(c-40,0),a=0===e?Math.min(200,s.length):Math.min(c+120,s.length);let n=s.substring(e,a);r.forEach((function(e){let t=new RegExp(e,"gi");n=n.replace(t,"<b mark>"+e+"</b>")})),t.digest=n+"......"}else a=Math.min(200,s.length),t.digest=s.trim().substring(0,a)}})),n},buildResult:(t,a,s)=>{let r="";return r+="<li>",r+="<a class='result' href='"+e.getUrlRelativePath(t)+"?keyword="+e.queryText+"'>",r+="<span class='title'>"+a+"</span>",""!==s&&(r+="<span class='digest'>"+s+"</span>"),r+="</a>",r+="</li>",r},getUrlRelativePath:function(e){let t=e.split("//"),a=t[1].indexOf("/"),s=t[1].substring(a);return-1!=s.indexOf("?")&&(s=s.split("?")[0]),s}};return{init:()=>{e.init()},setQueryText:t=>{e.queryText=t},search:()=>{e.search()}}})();Object.freeze(SearchService),SearchService.init(),document.addEventListener("pjax:success",SearchService.init),document.addEventListener("pjax:send",(function(){document.querySelector("#u-search").style.display="none"}));