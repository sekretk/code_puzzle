(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(19)},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var c=n(8),a=n(0),o=n.n(a),r=(n(18),n(5)),m=n(3),i=n(12),u=n(9),d=n.n(u),l=n(10),s=n(4),f=function(e,t,n,c,a){return function(o){return t&&o===n?{y:100*c+a,scale:1.1,zIndex:"1",shadow:15,immediate:function(e){return"y"===e||"zIndex"===e}}:{y:100*e.indexOf(o),scale:1,zIndex:"0",shadow:1,immediate:!1}}},p=function(e){e.key;var t=e.item,n=t.name,c=t.commented,a=e.onToggle;return o.a.createElement("div",{className:"item"},o.a.createElement("button",{onMouseDown:function(e){e.stopPropagation(),console.log(),a()}},"togglecomment"),o.a.createElement("p",{className:c?"commented":""},n))};function b(e){var t=e.items,n=Object(a.useState)(t.map(function(e,t){return Object(r.a)({},e,{id:t})})),c=Object(m.a)(n,2),u=c[0],b=c[1],g=Object(a.useRef)(t.map(function(e,t){return t})),O=Object(s.c)(u.length,f(g.current)),j=Object(m.a)(O,2),x=j[0],h=j[1],w=Object(l.a)(function(e){var t=Object(m.a)(e.args,1)[0],n=e.down,c=Object(m.a)(e.delta,2)[1],a=g.current.indexOf(t),o=Object(i.a)(Math.round((100*a+c)/100),0,u.length-1),r=d()(g.current,a,o);h(f(r,n,t,a,c)),n||(g.current=r)}),y=function(e){return function(){console.log("to toggle",e),b(u.map(function(t){return Object(r.a)({},t,{commented:t.id===e?!t.commented:t.commented})}))}};return o.a.createElement("div",null,o.a.createElement("div",{className:"content",style:{height:50*u.length}},x.map(function(e,t){var n=e.zIndex,c=e.shadow,a=e.y,r=e.scale;return o.a.createElement(s.a.div,Object.assign({},w(t),{key:t,style:{zIndex:n,boxShadow:c.interpolate(function(e){return"rgba(0, 0, 0, 0.15) 0px ".concat(e,"px ").concat(2*e,"px 0px")}),transform:Object(s.b)([a,r],function(e,t){return"translate3d(0,".concat(e,"px,0) scale(").concat(t,")")})}}),o.a.createElement(p,{item:u[t],onToggle:y(t)}))})))}Object(c.render)(o.a.createElement(b,{items:[{name:"compact",commented:!1},{name:"takeWhile",commented:!1},{name:"filter",commented:!0},{name:"skip(1)",commented:!1},{name:"shareReply",commented:!0}]}),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.81278694.chunk.js.map