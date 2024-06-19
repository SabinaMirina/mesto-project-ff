(()=>{"use strict";var e={path:"https://nomoreparties.co/v1",cohortId:"wff-cohort-17",headers:{authorization:"1d7c5a36-10fe-4288-b8a8-123b41ec80c9","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=document.querySelector("#card-template").content,o=document.querySelector(".places__list");function r(o,r,c){var a=c.handleImageClick,i=c.openDeleteModal,u=n.querySelector(".places__item").cloneNode(!0),l=u.querySelector(".card__image");u.querySelector(".card__title").textContent=o.name,l.alt=o.name,l.src=o.link;var s=u.querySelector(".card__like-count"),d=u.querySelector(".card__like-button");return s.textContent=o.likes.length,l.addEventListener("click",(function(){a(o.link,o.name)})),o.likes.some((function(e){return e._id===r}))&&d.classList.add("card__like-button_is-active"),u.querySelector(".card__like-button").addEventListener("click",(function(n){var r;d.classList.contains("card__like-button_is-active")?(r=o._id,fetch("".concat(e.path,"/").concat(e.cohortId,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers}).then(t)).then((function(e){d.classList.toggle("card__like-button_is-active"),s.textContent=e.likes.length})).catch((function(e){return console.error("Ошибка удаления лайка:",e)})):function(n){return fetch("".concat(e.path,"/").concat(e.cohortId,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}(o._id).then((function(e){d.classList.toggle("card__like-button_is-active"),s.textContent=e.likes.length})).catch((function(e){return console.error("Ошибка добавления лайка:",e)}))})),u.querySelector(".card__delete-button").addEventListener("click",(function(){return i(u,o._id)})),u.dataset.id=o._id,u}var c=function(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),1),document.addEventListener("keydown",i)};function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)}function i(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&a(t)}}document.querySelector(".popup__form"),document.querySelector(".popup__input"),document.querySelector(".popup__button");var u=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},l=function(e,t,n){t.forEach((function(t){t.disabled=!0,function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!0,t.classList.add(n.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))}))},s=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=Array.from(e.querySelectorAll(t.submitButtonSelector));n.forEach((function(n){u(e,n,t),n.value=""})),l(n,o,t)};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var p,f=document.querySelector(".profile__add-button"),m=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),v=document.forms["new-place"],y=v.elements["place-name"],S=v.elements.link,b=document.forms["edit-profile"],q=b.elements.name,E=b.elements.description,L=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),k=document.querySelector(".popup__image"),C=document.querySelector(".popup__caption"),A=document.querySelector(".popup_type_image"),I=document.querySelector(".profile__image"),x=document.querySelector(".profile__image-button"),T=document.querySelector(".popup_type_new-avatar"),w=document.querySelector(".popup__input_type-vatar-link"),D="",O=null,j=document.querySelector(".popup_type_submit-delete-card"),M=j.querySelector(".popup__button"),B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"button_inactive",inputErrorClass:"form__input-error",errorClass:"form__input-error_active"};p=B,Array.from(document.querySelectorAll(p.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=Array.from(e.querySelectorAll(t.submitButtonSelector));l(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),l(n,o,t)}))}))}(e,p)}));var P=function(e,t){k&&(k.src=e,k.alt=t,C.textContent=t),c(A)};function N(e,t){O=t,c(j)}var J=function(e){document.querySelectorAll(".popup__button").forEach((function(t){"Да"!==t.textContent&&(t.textContent=e?"Сохранение..":"Сохранить")}))};Promise.all([fetch("".concat(e.path,"/").concat(e.cohortId,"/users/me"),{method:"GET",headers:e.headers}).then(t),fetch("".concat(e.path,"/").concat(e.cohortId,"/cards"),{method:"GET",headers:e.headers}).then(t)]).then((function(e){var t,n,c=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],i=c[1];L.textContent=a.name,g.textContent=a.about,I.style.backgroundImage="url(".concat(a.avatar,")"),D=a._id,i.forEach((function(e){var t=r(e,D,{handleImageClick:P,openDeleteModal:N});e.owner._id!==D&&t.querySelector(".card__delete-button").remove(),o.append(t)}))})).catch((function(e){console.error("Произошла ошибка",e)})),document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".popup").forEach((function(e){e.querySelectorAll(".popup__close").forEach((function(t){t.addEventListener("click",(function(){return a(e)}))})),e.addEventListener("click",(function(t){t.target===e&&a(e)}))}))})),M.addEventListener("click",(function(){var n;(n=O,fetch("".concat(e.path,"/").concat(e.cohortId,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)).then((function(){var e=document.querySelector('[data-id="'.concat(O,'"]'));e?e.remove():console.error("Карточка с id ".concat(O," не найдена")),a(j)})).catch((function(e){console.error("Ошибка удаления карточки:",e)}))})),b.addEventListener("submit",(function(n){var o,r;n.preventDefault(),(o=q.value,r=E.value,fetch("".concat(e.path,"/").concat(e.cohortId,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:r})}).then(t)).then((function(e){return L.textContent=e.name,g.textContent=e.about,e})).catch((function(e){console.error("Произошла ошибка при обновлении данных пользователя",e)})),a(h)})),m.addEventListener("click",(function(){q.value=L.textContent,E.value=g.textContent,c(h),s(h,B)})),f.addEventListener("click",(function(){c(_),s(_,B)})),v.addEventListener("submit",(function(n){n.preventDefault();var c,i,u=y.value,l=S.value;J(!0),(c=u,i=l,fetch("".concat(e.path,"/").concat(e.cohortId,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:c,link:i})}).then(t)).then((function(e){o.prepend(r(e,D,{handleImageClick:P,openDeleteModal:N}))})).catch((function(e){console.error("Произошла ошибка при добавлении карточки",e)})).finally((function(){J(!1)})),a(_),n.target.reset()})),I.addEventListener("mouseover",(function(){x.classList.add("profile__image-button_active")})),I.addEventListener("mouseout",(function(e){I.contains(e.relatedTarget)||x.classList.remove("profile__image-button_active")})),x.addEventListener("click",(function(){c(T),s(T,B)})),T.addEventListener("submit",(function(n){n.preventDefault();var o=w.value;J(!0),function(n){return fetch("".concat(e.path,"/").concat(e.cohortId,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then(t)}(o).then((function(e){I.style.backgroundImage="url(".concat(e.avatar,")"),a(T)})).catch((function(e){console.error("Произошла ошибка при замене аватара",e)})).finally((function(){J(!1)})),n.target.reset()}))})();
//# sourceMappingURL=main.js.map