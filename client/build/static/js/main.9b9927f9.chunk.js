(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){e.exports=a(23)},20:function(e,t,a){},23:function(e,t,a){"use strict";a.r(t);var n=a(6),c=a.n(n),l=a(3),r=a(7),o=a(8),i=a(5),m=a(0),s=a.n(m),u=(a(20),a(2)),d=a(9),p=a(12),E={true:function(e,t){return e.id===t?!e.commented:e.commented},false:function(e,t){return e.id!==t}},f="http://boysthings.top:9999",b=Object(d.b)(function(e){var t=e.value,a=e.onToggle,n=t.line,c=t.commented;return s.a.createElement("li",{className:c?"commented":""},s.a.createElement("div",{className:"item"},s.a.createElement("button",{className:"comment",onMouseDown:a},Boolean(c)?s.a.createElement("span",{className:"material-icons material-icons-outlined"},"add"):s.a.createElement("span",{className:"material-icons material-icons-outlined"},"remove")),s.a.createElement("p",{className:"multiline"},n),s.a.createElement("span",{className:"drag material-icons material-icons-outlined"},"drag_indicator")))}),g=Object(d.a)(function(e){var t=e.children;return s.a.createElement("ul",null,t)});function v(e){var t=e.items,a=e.multiple,n=e.onItemsChanged,c=Object(m.useState)(t),r=Object(u.a)(c,2),o=r[0],i=r[1];return s.a.createElement("div",{className:"content ".concat(a&&"multiple")},s.a.createElement(g,{onSortEnd:function(e){var t=e.oldIndex,a=e.newIndex,c=Object(p.a)(o,t,a);i(c),n(c)},useWindowAsScrollContainer:!0},o.map(function(e,t){return s.a.createElement(b,{key:"item-".concat(e.id),index:t,value:e,onToggle:(c=e.id,function(){var e=o.map(function(e){return Object(l.a)({},e,{commented:E[a](e,c)})});i(e),n(e)})});var c})))}var h=function(e){var t=e.value,a=e.onToggle,n=t.line,c=t.commented;return s.a.createElement("li",{className:c?"commented":""},s.a.createElement("div",{className:"item"},s.a.createElement("button",{className:"comment",onMouseDown:a},Boolean(c)?s.a.createElement("span",{className:"material-icons material-icons-outlined"},"add"):s.a.createElement("span",{className:"material-icons material-icons-outlined"},"remove")),s.a.createElement("p",{className:"multiline"},n)))};function w(e){var t=e.items,a=e.multiple,n=e.onItemsChanged,c=Object(m.useState)(t),r=Object(u.a)(c,2),o=r[0],i=r[1];return s.a.createElement("ul",{className:"undraggable ".concat(a&&"multiple")},o.map(function(e){return s.a.createElement(h,{key:"item-".concat(e.id),value:e,onToggle:(t=e.id,function(){var e=o.map(function(e){return Object(l.a)({},e,{commented:E[a](e,t)})});i(e),console.log(e),n(e)})});var t}))}function N(e){var t=e.links,a=e.text;return s.a.createElement(s.a.Fragment,null,s.a.createElement("p",null,"\u0412\u0435\u0440\u043d\u043e!"),s.a.createElement("p",null,a),s.a.createElement("ui",null,t.map(function(e,t){var a=e.text,n=e.link;return s.a.createElement("li",{key:t},s.a.createElement("a",{href:n,target:"_blank"},a))})),s.a.createElement("p",null,"\u041f\u043e\u0443\u0447\u0430\u0441\u0442\u0432\u0443\u0439 \u0432 \u0440\u043e\u0437\u044b\u0433\u0440\u044b\u0448\u0435 \u0432\u0430\u0442\u0440\u0443\u0448\u043a\u0438 \u0434\u043b\u044f \u0437\u0438\u043c\u043d\u0438\u0445 \u043a\u0430\u0442\u0430\u043d\u0438\u0439! \u041e\u0441\u0442\u0430\u0432\u044c \u0441\u0432\u043e\u0438 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u044b ",s.a.createElement("a",{href:"https://docs.google.com/forms/d/1_qOo9r05XTCCKvgIGJChXD3FlPAzOBLYdkxjxsJb55U/edit",target:"_blank"},"\u0422\u0443\u0442")," \u0438 \u0436\u0434\u0438 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432 \u0441\u0435\u0433\u043e\u0434\u043d\u044f \u0432 19:00"))}function O(e){e.links,e.text;window.localStorage.setItem("acquainted",!0);return s.a.createElement(s.a.Fragment,null,s.a.createElement("a",{href:"https://www.devexperts.com/"},s.a.createElement("img",{alt:"devexperts.com",src:"/static/logo.svg",width:"150",height:"40"})),s.a.createElement("p",null,"\u041c\u0435\u0436\u0434\u0443\u043d\u0430\u0440\u043e\u0434\u043d\u0430\u044f \u043a\u0430\u0440\u044c\u0435\u0440\u0430 \u0432 Fintech:"),s.a.createElement("p",null,s.a.createElement("a",{href:"https://devexperts.com/about-devexperts/",target:"_blank"},"\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435 \u043e \u043d\u0430\u0448\u0438\u0445 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430\u0445 \u0438 \u043a\u043e\u043c\u0430\u043d\u0434\u0435")),s.a.createElement("p",null,s.a.createElement("a",{href:"https://careers.devexperts.com/vacancies/?country=ru&remote=true",target:"_blank"},"\u041d\u0430\u0448\u0438 \u0432\u0430\u043a\u0430\u043d\u0441\u0438\u0438")),s.a.createElement("p",null,'\u041f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043f\u0440\u0435\u0434\u043b\u0430\u0433\u0430\u0435\u0442 \u0440\u0435\u0448\u0438\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443. \u0414\u043b\u044f \u043f\u0440\u043e\u043f\u0443\u0441\u043a\u0430 \u043d\u0443\u0436\u043d\u043e \u043d\u0430\u0447\u0430\u0442\u044c \u0414\u0430\u043b\u0435\u0435. \u0414\u043b\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438 \u043d\u0430 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0443 \u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c. \u0414\u043b\u044f \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f/\u0440\u0430\u0441\u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u0441\u0442\u0440\u043e\u043a\u0438 \u043d\u0443\u0436\u043d\u043e \u043d\u0430\u0436\u0430\u0442\u044c \u043d\u0430 "-/+" \u0414\u043e\u043f\u0443\u0441\u0442\u0438\u043c\u044b \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0435 \u0442\u0438\u043f\u044b \u0437\u0430\u0434\u0430\u043d\u0438\u0439:'),s.a.createElement("span",{className:"badge sort"},s.a.createElement("span",{className:"badge_icon material-icons material-icons-outlined"},"sort"),"\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u043e\u0442\u0441\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"),s.a.createElement("span",{className:"badge multiple"},s.a.createElement("span",{class:"badge_icon material-icons material-icons-outlined"},"checklist_rtl"),"\u041d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u043e\u0432"),s.a.createElement("button",{className:"go",onClick:function(){window.location.reload()}},"\u041d\u0430\u0447\u0430\u0442\u044c!"))}var j={true:function(e){return s.a.createElement(v,e)},false:function(e){return s.a.createElement(w,e)}};function k(e){var t=e.poll,a=e.description,n=e.blocks,o=e.multiple,i=e.sortable,d=e.id,p=Object(m.useState)(void 0),E=Object(u.a)(p,2),b=E[0],g=E[1],v=Object(m.useState)(!1),h=Object(u.a)(v,2),w=h[0],k=h[1],x=!Boolean(window.localStorage.getItem("acquainted")),C=function(){var e=Object(r.a)(c.a.mark(function e(){var a,n,l;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(f+"/result/"+t,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({question:d,lines:I.filter(function(e){return!e.commented}).map(function(e){return e.id})})});case 2:return a=e.sent,e.next=5,a.text();case 5:n=e.sent,l=Boolean(n)?JSON.parse(n):void 0,g(l),k(!Boolean(l));case 9:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),S=function(){window.location.reload()},_=o?n.map(function(e){return Object(l.a)({},e,{commented:Math.random()<.5})}):n.map(function(e){return Object(l.a)({},e,{commented:e===n[0]})}),y=Object(m.useState)(_),B=Object(u.a)(y,2),I=B[0],T=B[1];Object(m.useEffect)(function(){document.title="Code Puzzle"},[]);var J=j[i]({items:_,onItemsChanged:T,multiple:o});return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"legend"},Boolean(i)&&s.a.createElement("span",{className:"legend-badge sort"},s.a.createElement("span",{className:"badge_icon material-icons material-icons-outlined"},"sort")),Boolean(o)&&s.a.createElement("span",{className:"legend-badge multiple"},s.a.createElement("span",{class:"badge_icon material-icons material-icons-outlined"},"checklist_rtl")),s.a.createElement("button",{className:"help",onClick:function(){window.localStorage.removeItem("acquainted"),window.location.reload()}},"\u041f\u0440\u0430\u0432\u0438\u043b\u0430")),s.a.createElement("p",{className:"description multiline"},a),s.a.createElement("button",{className:"next",onClick:S},"\u0414\u0430\u043b\u044c\u0448\u0435"),s.a.createElement("button",{className:"submit",onClick:C},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"),s.a.createElement("div",{className:"alert ".concat(w?"alert-shown":"alert-hidden"),onTransitionEnd:function(){console.log("onTransitionEnd"),k(!1)}},s.a.createElement("strong",null,"\u0418\u0437\u0432\u0438\u043d\u0438\u0442\u0435. \u041d\u0435 \u043f\u0440\u0438\u043d\u044f\u0442\u043e!")),J,Boolean(b)&&s.a.createElement("div",{className:"result"},s.a.createElement("button",{onClick:S},"\u0414\u0430\u043b\u044c\u0448\u0435"),s.a.createElement(N,b)),Boolean(x)&&s.a.createElement("div",{className:"about"},s.a.createElement(O,null)))}a.d(t,"swapInArray",function(){return x});var x=function(e,t,a){var n=Object(o.a)(e),c=[e[a],e[t]];return n[t]=c[0],n[a]=c[1],n};Object(r.a)(c.a.mark(function e(){var t,a,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=window.location.pathname.replace("/",""),e.next=3,fetch(f+"/rndpoll/"+t);case 3:return a=e.sent,e.next=6,a.json();case 6:n=e.sent,n=Object(l.a)({},n,{poll:t}),Object(i.render)(s.a.createElement(k,n),document.getElementById("root"));case 9:case"end":return e.stop()}},e)}))()}},[[13,1,2]]]);
//# sourceMappingURL=main.9b9927f9.chunk.js.map