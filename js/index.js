"use strict";var button=function(){var e=$(".button"),t=function(e){var t=this,n=document.createElement("div"),a=Math.max(this.clientWidth,this.clientHeight),o=t.getBoundingClientRect();n.style.width=n.style.height=a+"px",n.style.left=e.clientX-o.left-a/2+"px",n.style.top=e.clientY-o.top-a/2+"px",n.classList.add("ripple"),t.appendChild(n),setTimeout(function(){t.removeChild(n)},1e3)};e.mouseenter(t),e.click(t)}(),_createClass=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Mail=function(){function n(e,t){_classCallCheck(this,n),this.lang=detectLanguage(),this.$mail={contact:$(e.selector),name:$(e.name),email:$(e.email),subject:$(e.subject),message:$(e.message)},this.$modal={selector:$(t.selector),title:$(t.title),body:$(t.body)}}return _createClass(n,[{key:"_validate",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.$mail.name.val(),t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.$mail.email.val(),n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:this.$mail.subject.val(),a=3<arguments.length&&void 0!==arguments[3]?arguments[3]:this.$mail.message.val();3<e.length&&3<n.length&&/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)&&10<a.length?(console.log(e+"\n"+t+"\n"+n+"\n"+a),this.request(e,t,n,a)):(console.log(e+"\n"+t+"\n"+n+"\n"+a),this._respond(!1))}},{key:"request",value:function(e,t,n,a){var o=!(4<arguments.length&&void 0!==arguments[4])||arguments[4],i=this;$.post("mail.php?lang="+lang+"&ajax="+o,{name:e,email:t,subject:n,message:a},function(e){JSON.parse(e).status?(i.$mail.contact.trigger("reset"),i._respond(!0)):i._respond(!1)})}},{key:"_respond",value:function(){var e=0<arguments.length&&void 0!==arguments[0]&&arguments[0],t="",n="";"pl"!=this.lang?(t=e?"Message sent correctly!":"Message didn't send correctly! Something went wrong!",n="Message status",console.log("Message status:\n"+t)):(t=e?"Wiadomość została wysłana poprawnie!":"Wiadomość nie została wysłana poprawnie! Coś poszło nie tak!",n="Status wiadomości",console.log("Status wiadomości:\n"+t));var a=this.$modal.selector,o=this.$modal.title,i=this.$modal.body;a.find(o).text(n),a.find(i).text(t),a.modal({show:!0})}},{key:"send",value:function(e,t,n,a){this._validate(e,t,n,a)}}]),n}();_createClass=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Typing=function(){function a(){var n=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"typing",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"typed";_classCallCheck(this,a),this.content=[],this.$items=$("."+e),this.endClass=t,this.$items.each(function(e,t){n.content.push($(t).text()),$(t).text("")})}return _createClass(a,[{key:"_startTyping",value:function(e,t){var n=0,a=setInterval(function(){e.length>n?(t.text(t.text()+e[n]),n++):clearInterval(a)},160)}},{key:"playAnimation",value:function(){var n=this;this.$items.each(function(e,t){$(t).hasClass(n.endClass)||$(t).offset().top<=$(window).scrollTop()+$(window).height()-$(window).height()/5&&(n._startTyping(n.content[e],$(t)),$(t).addClass(n.endClass))})}}]),a}(),throttle=function(e,t){var n=!1;return function(){n||(e(),n=!0,setTimeout(function(){n=!1},t))}},preloader=function(){$("body").addClass("loaded"),console.log("Page loaded")},detectLanguage=function(){var e="en";return-1!=window.location.href.indexOf("lang=pl")&&(e="pl"),e},createSwitcher=function(){var e=detectLanguage();$(".switch").children("a").remove();var t=$("<label>").addClass("slider").attr("for","lang");$(".switch").append("EN ",t," PL"),"pl"==e&&$("#lang").prop("checked",!0)},eventListener=function(){$(".scrollTo").on("click",function(e){var t=$(this).attr("href");$("html, body").animate({scrollTop:$(t).offset().top},1e3),console.log("Scrolling to "+t),e.preventDefault()}),$("#lang").on("click",function(){$(this).is(":checked")?setTimeout(function(){window.location.href="?lang=pl"},400):setTimeout(function(){window.location.href="?lang=en"},400)}),$(".banner").mousemove(function(e){var t=-1*e.pageX/30,n=-1*e.pageY/30;$(this).children(".content").css({transform:"translate3d("+t+"px,"+n+"px, 0) perspective(300px) rotateX("+t/3+"deg) rotateY("+n/3+"deg)","-webkit-transform":"translate3d("+t+"px,"+n+"px, 0) perspective(300px) rotateX("+t/3+"deg) rotateY("+n/3+"deg)","-ms-transform":"translate3d("+t+"px,"+n+"px, 0) perspective(300px) rotateX("+t/3+"deg) rotateY("+n/3+"deg)"})}),$("#send").on("click",function(e){mail.send(),e.preventDefault(e)}),$(window).scroll(function(){return throttle(typing.playAnimation(),200)})},typing=new Typing("typing","typed"),mailForm={selector:".contact",name:"#name",email:"#email",subject:"#subject",message:"#message"},modal={selector:"#modal-dialog",title:".modal-title",body:".modal-body"},mail=new Mail(mailForm,modal);$(document).ready(function(){preloader(),createSwitcher(),eventListener()});
//# sourceMappingURL=index.js.map
