(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(28)},22:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var a=n(6),c=n.n(a),r=n(5),o=n(9),i=n(10),l=n(4),u=n(1),s=n.n(u),m=(n(22),n(2)),d=n(11),p=n(14),f=n(15),b=Object(d.b)(function(e){var t=e.value,n=e.onToggle,a=t.line,c=t.commented;return s.a.createElement("li",{className:c?"commented":""},s.a.createElement("div",{className:"item"},s.a.createElement("button",{onMouseDown:n},"com"),s.a.createElement("p",{className:"multiline"},a),s.a.createElement(f.a,{icon:"fa-solid fa-grip-dots-vertical"})))}),j=Object(d.a)(function(e){var t=e.children;return s.a.createElement("ul",null,t)});function E(e){var t=e.items,n=e.onItemsChanged,a=Object(u.useState)(t),c=Object(m.a)(a,2),o=c[0],i=c[1];return s.a.createElement("div",{className:"content"},s.a.createElement(j,{onSortEnd:function(e){var t=e.oldIndex,a=e.newIndex;i(Object(p.a)(o,t,a)),n(o)},useWindowAsScrollContainer:!0},o.map(function(e,t){return s.a.createElement(b,{key:"item-".concat(e.id),index:t,value:e,onToggle:(a=e.id,function(){i(o.map(function(e){return Object(r.a)({},e,{commented:e.id===a?!e.commented:e.commented})})),n(o)})});var a})))}function O(e){var t=e.poll,n=e.description,a=e.blocks,i=e.multiple,l=e.id,d=Object(u.useState)(void 0),p=Object(m.a)(d,2),f=p[0],b=p[1],j=Object(u.useState)(!1),O=Object(m.a)(j,2),v=(O[0],O[1]),w=function(){var e=Object(o.a)(c.a.mark(function e(){var n,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://boysthings.top:9999/result/"+t,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:l,lines:k.filter(function(e){return!e.commented}).map(function(e){return e.id})})});case 2:return n=e.sent,e.next=5,n.text();case 5:a=e.sent,b(a),v(!Boolean(a));case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),h=function(){window.location.reload()},g=i?a.map(function(e){return Object(r.a)({},e,{commented:Math.random()<.5})}):a.map(function(e){return Object(r.a)({},e,{commented:!1})}),x=Object(u.useState)(g),y=Object(m.a)(x,2),k=y[0],S=y[1];return Object(u.useEffect)(function(){document.title="Code Puzzle"},[]),s.a.createElement(s.a.Fragment,null,s.a.createElement("p",{className:"description multiline"},n),s.a.createElement("button",{onClick:h},"\u0414\u0430\u043b\u044c\u0448\u0435"),s.a.createElement("button",{onClick:w},"Submit"),s.a.createElement(E,{items:g,onItemsChanged:S}),Boolean(f)&&s.a.createElement("div",{className:"result"},s.a.createElement("button",{onClick:h},"\u0414\u0430\u043b\u044c\u0448\u0435"),s.a.createElement("p",null,f),s.a.createElement("p",null,"Any text")))}n.d(t,"swapInArray",function(){return v});var v=function(e,t,n){var a=Object(i.a)(e),c=[e[n],e[t]];return a[t]=c[0],a[n]=c[1],a};Object(o.a)(c.a.mark(function e(){var t,n,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=window.location.pathname.replace("/",""),e.next=3,fetch("http://boysthings.top:9999/rndpoll/"+t);case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,a=Object(r.a)({},a,{poll:t}),Object(l.render)(s.a.createElement(O,a),document.getElementById("root"));case 9:case"end":return e.stop()}},e)}))()}},[[16,1,2]]]);
//# sourceMappingURL=main.ad84cd6b.chunk.js.map