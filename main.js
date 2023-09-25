(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.disabled=!0}function n(e,n){var r=e.querySelector(n.buttonSelector);t(r),e.addEventListener("reset",(function(){t(r)})),e.querySelectorAll(n.inputSelector).forEach((function(o){o.addEventListener("input",(function(){(function(e,t){var n=e.validationMessage;e.validity.valid?function(e,t){var n="error-".concat(e.id);document.getElementById(n).textContent="",e.classList.remove(t.invalidTextClass)}(e,t):function(e,t,n){var r="error-".concat(e.id);document.getElementById(r).textContent=t,e.classList.add(n.invalidTextClass)}(e,n,t)})(o,n),function(e,n){e.checkValidity()?n.disabled=!1:t(n)}(e,r)}))}))}function r(e){e.target.classList.contains("popup_opened")&&a(e.target)}function o(e){"Escape"===e.key&&a(document.querySelector(".popup_opened"))}function c(e){e.classList.add("popup_opened"),document.addEventListener("keydown",o),document.addEventListener("mousedown",r)}function a(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",o),document.removeEventListener("mousedown",r)}function i(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function u(e,n){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";n.preventDefault();var c=n.submitter,u=c.textContent;i(!0,c,u,o),e().then((function(){r&&n.target.reset(),a(n.target.closest(".popup")),t(c)})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){i(!1,c,u)}))}e.d({},{E:()=>C,k:()=>U});var l={url:"https://nomoreparties.co/v1/wbf-cohort-12",headers:{authorization:"5970e7b5-fad8-4b45-bc23-ee4a5f3f9441","Content-Type":"application/json"}};function d(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}function s(e,t){return fetch(e,t).then(d)}var f=document.querySelector("#card-template").content,m=document.getElementById("full-card"),v=m.querySelector(".full-card__image"),p=m.querySelector(".full-card__caption");function y(e,t,n,r,o){var a=f.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__title"),d=a.querySelector(".card__like"),y=a.querySelector(".card__like-amount"),E=a.querySelector(".card__delete"),b=n.length;return i.src=t,i.alt=e,u.textContent=e,y.textContent=b,o._id!==U&&E.remove(),E.addEventListener("click",(function(){var e;(e=r,s("".concat(l.url,"/cards/").concat(e),{method:"DELETE",headers:l.headers})).then((function(){return a.remove()})).catch((function(){return console.log(err)}))})),n.some((function(e){return e._id===U}))&&d.classList.add("card__like_active"),d.addEventListener("click",(function(){d.classList.contains("card__like_active")?_(d,y,r):h(d,y,r)})),i.addEventListener("click",(function(){!function(e,t){c(m),v.src=e,v.alt=t,p.textContent=t}(t,e)})),i.addEventListener("click",(function(){c(m)})),function(e){C.prepend(e)}(a),a}var h=function(e,t,n){var r;(r=n,s("".concat(l.url,"/cards/likes/").concat(r),{method:"PUT",headers:l.headers})).then((function(n){e.classList.add("card__like_active"),t.textContent=n.likes.length})).catch(console.error)},_=function(e,t,n){var r;(r=n,s("".concat(l.url,"/cards/likes/").concat(r),{method:"DELETE",headers:l.headers})).then((function(n){e.classList.remove("card__like_active"),t.textContent=n.likes.length})).catch(console.error)};function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var b,g=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),k=document.querySelectorAll(".popup__close"),L=document.getElementById("edit-profile-window"),q=document.getElementById("add-new-place-window"),C=document.querySelector(".cards"),w=document.getElementById("place"),x=document.getElementById("url"),I=document.forms["new-card-form"],j=document.forms["edit-profile-form"],A=document.querySelector(".profile__text"),B=A.querySelector(".profile__title"),O=A.querySelector(".profile__subtitle"),T=document.querySelector(".profile__avatar"),P=document.getElementById("name"),N=document.getElementById("job"),D=document.getElementById("new-avatar"),J=document.forms["new-avatar-form"],H=document.querySelector(".profile__avatar_edit"),M=document.getElementById("link"),U="";Promise.all([s("".concat(l.url,"/users/me"),{headers:l.headers}),s("".concat(l.url,"/cards"),{headers:l.headers})]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?E(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];B.textContent=o.name,O.textContent=o.about,T.src=o.avatar,U=o._id,c.reverse(),c.forEach((function(e){y(e.name,e.link,e.likes,e._id,e.owner)}))})).catch(console.error),g.addEventListener("click",(function(){P.value=B.textContent,N.value=O.textContent,c(L)})),S.addEventListener("click",(function(){c(q)})),k.forEach((function(e){return e.addEventListener("click",(function(e){a(e.target.closest(".popup"))}))})),H.addEventListener("click",(function(){c(D)})),I.addEventListener("submit",(function(e){u((function(){return(e=w.value,t=x.value,s("".concat(l.url,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify({name:e,link:t})})).then((function(e){y(e.name,e.link,e.likes,e._id,e.owner)}));var e,t}),e)})),b={buttonSelector:".popup__button",formSelector:".popup__form",invalidTextClass:"popup__field_invalid",inputSelector:".popup__field"},document.querySelectorAll(b.formSelector).forEach((function(e){return n(e,b)})),j.addEventListener("submit",(function(e){u((function(){return(e=P.value,t=N.value,s("".concat(l.url,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:e,about:t})})).then((function(e){B.textContent=e.name,O.textContent=e.about}));var e,t}),e)})),J.addEventListener("submit",(function(e){u((function(){return(e=M.value,s("".concat(l.url,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:e})})).then((function(e){T.src=e.avatar}));var e}),e)}))})();