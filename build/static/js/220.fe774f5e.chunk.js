(self.webpackChunkanalyzer=self.webpackChunkanalyzer||[]).push([[220],{9492:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>b});var s=n(7528),a=n(1970),i=(n(6196),n(2860)),r=n.n(i),o=n(579);function c(e){let{JsonObject:t,Highcharts:n,HighchartsReact:s}=e;r()(n);const a=t.users,i=a.filter((e=>1===e.active)),c=a.filter((e=>0===e.active)),l={chart:{type:"variablepie"},title:{text:"Distinzione utenti (tra attivi e non) considerati i "+(i.length+c.length)+" presenti"},series:[{minPointSize:40,innerSize:"30%",zMin:0,data:[{name:"Utenti attivi",y:i.length},{name:"Utenti inattivi",y:c.length}]}],credits:{enabled:!1},exporting:{enabled:!0,menuItems:["downloadPNG","downloadJPEG","downloadPDF","downloadSVG"]}};return(0,o.jsx)(s,{highcharts:n,options:l})}function l(e){let{JsonObject:t,Highcharts:n,HighchartsReact:s}=e,a={new_tickets:t.new_tickets,tickets_pending:t.tickets_pending,tickets_closed:t.tickets_closed},i={};for(let o in a)for(let e in a[o]){let t=new Date(a[o][e].date_time_insert),n=t.toLocaleString("it-IT",{month:"long"});n=n.charAt(0).toUpperCase()+n.slice(1);let s=t.getFullYear(),r="".concat(s,"-").concat(("0"+(t.getMonth()+1)).slice(-2)," ").concat(n);i[r]||(i[r]=0),i[r]++}let r=Object.keys(i).sort(),c=[];for(let o=0;o<r.length;o++){let e=r[o];c[o]={},c[o].mese="".concat(e.slice(8)," ").concat(e.slice(0,4)),c[o].qta=i[e]}const l={chart:{type:"bar"},title:{text:"Ticket inseriti per mese"},xAxis:{categories:c.map((e=>e.mese)),title:{text:"Mese"}},yAxis:{min:0,title:{text:"Quantit\xe0"}},series:[{name:"Quantit\xe0",data:c.map((e=>e.qta))}],credits:{enabled:!1},exporting:{enabled:!0,menuItems:["downloadPNG","downloadJPEG","downloadPDF","downloadSVG"]}};return(0,o.jsx)(s,{highcharts:n,options:l})}var d,j=n(3488),g=n.n(j),h=n(4999),p=n.n(h),u=n(3665),m=n.n(u),x=n(7459),w=n.n(x),f=n(927);const k=f.Ay.div(d||(d=(0,s.A)(["\nmargin-left:5vw;\ndisplay: grid;\ngrid-template-columns: repeat(1, 1fr);\ngrid-template-rows: ;\ngrid-column-gap: 0px;\ngrid-row-gap: 0px;\n"]))),v=e=>{let{JsonObject:t}=e;m()(g()),w()(g());const n={JsonObject:t,Highcharts:g(),HighchartsReact:p()};return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(k,{children:[(0,o.jsx)(c,{...n}),(0,o.jsx)(l,{...n})]})})};var y;const q=f.Ay.div(y||(y=(0,s.A)(["\nmargin-top: 5vh;\n// margin-left: 5vw;\ntransition: all 0.3s ease;\n"]))),b=e=>{let{isFetched:t,data:n}=e;return(0,o.jsx)(o.Fragment,{children:t?(0,o.jsx)(q,{children:(0,o.jsx)(v,{JsonObject:n})}):(0,o.jsx)(a.A,{})})}},7549:(e,t,n)=>{var s={".":6196,"./":6196,"./Helpers":1286,"./Helpers.js":1286,"./LICENSE":8783,"./Matcher":7889,"./Matcher.js":7889,"./QueryManager":5220,"./QueryManager.js":5220,"./README.md":3537,"./index":6196,"./index.js":6196,"./package":6269,"./package.json":6269,"js-jsonq":6196,"js-jsonq/":6196,"js-jsonq/Helpers":1286,"js-jsonq/Helpers.js":1286,"js-jsonq/LICENSE":8783,"js-jsonq/Matcher":7889,"js-jsonq/Matcher.js":7889,"js-jsonq/QueryManager":5220,"js-jsonq/QueryManager.js":5220,"js-jsonq/README.md":3537,"js-jsonq/index":6196,"js-jsonq/index.js":6196,"js-jsonq/package":6269,"js-jsonq/package.json":6269};function a(e){var t=i(e);return n(t)}function i(e){if(!n.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}a.keys=function(){return Object.keys(s)},a.resolve=i,e.exports=a,a.id=7549}}]);
//# sourceMappingURL=220.fe774f5e.chunk.js.map