(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(23)},20:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var a=n(4),c=n.n(a),r=n(8),o=n(6),i=n(7),u=n(3),l=n(1),s=n.n(l),m=(n(20),n(5)),d=n(9),p=n(12),f=Object(d.b)(function(e){var t=e.value,n=e.onToggle,a=t.line,c=t.commented;return s.a.createElement("li",{className:c?"commented":""},s.a.createElement("div",{className:"item"},s.a.createElement("button",{onMouseDown:n},"com"),s.a.createElement("p",null,a)))}),b=Object(d.a)(function(e){var t=e.children;return s.a.createElement("ul",null,t)});function v(e){var t=e.items,n=e.pollId,a=e.text,i=Object(l.useState)(t),u=Object(m.a)(i,2),d=u[0],v=u[1],j=Object(l.useState)(void 0),E=Object(m.a)(j,2),O=E[0],w=E[1],h=Object(l.useState)(!1),x=Object(m.a)(h,2),g=(x[0],x[1]),k=function(){var e=Object(o.a)(c.a.mark(function e(){var t,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://boysthings.top:9999/result",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:n,lines:d.filter(function(e){return!e.commented}).map(function(e){return e.id})})});case 2:return t=e.sent,e.next=5,t.text();case 5:a=e.sent,w(a),g(!Boolean(a));case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),y=function(){window.location.reload()};return s.a.createElement(s.a.Fragment,null,s.a.createElement("p",null,a),s.a.createElement("button",{onClick:y},"\u0414\u0430\u043b\u044c\u0448\u0435"),s.a.createElement("button",{onClick:k},"Submit"),s.a.createElement("div",{className:"content"},s.a.createElement(b,{onSortEnd:function(e){var t=e.oldIndex,n=e.newIndex;v(Object(p.a)(d,t,n))}},d.map(function(e,t){return s.a.createElement(f,{key:"item-".concat(e.id),index:t,value:e,onToggle:(n=e.id,function(){v(d.map(function(e){return Object(r.a)({},e,{commented:e.id===n?!e.commented:e.commented})}))})});var n}))),Boolean(O)&&s.a.createElement("div",{className:"result"},s.a.createElement("button",{onClick:y},"\u0414\u0430\u043b\u044c\u0448\u0435"),s.a.createElement("p",null,O)))}n.d(t,"swapInArray",function(){return j});var j=function(e,t,n){var a=Object(i.a)(e),c=[e[n],e[t]];return a[t]=c[0],a[n]=c[1],a};Object(o.a)(c.a.mark(function e(){var t,n,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://boysthings.top:9999/rndpoll");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,a=n.blocks.map(function(e){return Object(r.a)({},e,{commented:Math.random()<.5})}),Object(u.render)(s.a.createElement(v,{pollId:n.id,text:n.description,items:a}),document.getElementById("root"));case 8:case"end":return e.stop()}},e)}))()}},[[13,1,2]]]);
//# sourceMappingURL=main.d5c318a5.chunk.js.map