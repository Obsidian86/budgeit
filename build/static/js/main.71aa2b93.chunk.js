(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,n){e.exports=n(38)},32:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(15),l=n.n(o),i=(n(31),n(32),n(3)),c=n(16),u=n(22),s=n(17),m=n(23),p=r.a.createContext({contextLoaded:!1}),d={green:"#1bcf21",darkGray:"#444",lightGray:"#c9c9c9",vBlue:"#00bbd4",vBlueDark:"#0e85b3",fBlue:"#dbfdff"},g=["red","orange","green","yellow","pink","blue","tan","teal","salmon","Tomato","DodgerBlue","MediumSeaGreen","SlateBlue","Violet"],b=function(e){if(!parseFloat(e))return"$00.00";var t=(e=parseFloat(e).toFixed(2)).toString().split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),"$"+t[0]+"."+t[1]},f=function(e){var t={w:"Per week",m:"Per month",y:"Per year",bw:"Bi-weekly"};return t[e]?t[e]:e},y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"m",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"m",a={m:12,w:52,bw:26,y:1};e*=a[t],e/=a[n];for(var r=arguments.length,o=new Array(r>3?r-3:0),l=3;l<r;l++)o[l-3]=arguments[l];var i=o.includes("money")?b(e):e;return o.includes("appendRec")&&(i+=" ".concat(n(n))),i},v=function(e){return localStorage.setItem("bData",JSON.stringify(e))},h=function(){var e=localStorage.getItem("bData");return e?JSON.parse(e):null};function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var x=function(e,t){var n={},a=0,r=0;return e.forEach(function(e,o){n[e.category]?(n[e.category].items.push(O({id:e.id?e.id:"bi-".concat(o)},e)),n[e.category].total=n[e.category].total+parseFloat(e.amount)):(n[e.category]={items:[O({id:e.id?e.id:"bi-".concat(o)},e)],color:t[r],total:parseFloat(e.amount)},++r===t.length&&(r=0)),a+=parseFloat(e.amount)}),{budget:n,total:a}},w=function(e,t,n,a){var r,o=O({},e);return o[t].items.forEach(function(e){e.id!==n||(r=e)}),a=parseFloat(a)-parseFloat(r.amount),1===o[t].items.length?delete o[t]:o[t]=O({},e[t],{items:o[t].items.filter(function(e){return e.id!==r.id}),total:parseFloat(o[t].total)-parseFloat(r.amount)}),{budget:o,total:a}},j=function(e,t,n,a){var r=O({},e);return a=parseFloat(a)+parseFloat(t.amount),r[t.category]?(r[t.category].total=parseFloat(r[t.category].total)+parseFloat(t.amount),r[t.category].items.push()):r[t.category]={color:Object.keys(r).length>=n.length?n[Object.keys(r).length%n.length]:n[Object.keys(r).length+1],items:[O({},t,{amount:parseFloat(t.amount)})],total:parseFloat(t.amount)},{budget:r,total:a}},k=function(e,t,n,a,r){var o=O({},e);return r=parseFloat(r)-parseFloat(t.amount)+parseFloat(n.amount),o[t.category].total=parseFloat(o[t.category].total)-parseFloat(t.amount),t.category===n.category?o[n.category].items[function(e,t,n){for(var a,r=0;r<e.length;r++)if(e[r][t]===n){a=r;break}return a}(o[t.category].items,"id",n.id)]=O({},n):(o[t.category].items=o[t.category].items.filter(function(e){return e.id!==n.id}),o[n.category]?o[n.category].items.push(n):o[n.category]={color:Object.keys(o).length>=a.length?a[Object.keys(o).length%a.length]:a[Object.keys(o).length],items:[O({},n,{amount:parseFloat(n.amount)})],total:parseFloat(n.amount)},o[t.category].items.length<1&&delete o[t.category]),o[n.category].total=parseFloat(o[n.category].total)+parseFloat(n.amount),{budget:o}},A=n(4),S=n(2),C=n(5);function B(){var e=Object(A.a)(["\n        .dialogContainer{\n            position: fixed;\n            top: 0;\n            left: 0;\n            height: 100vh;\n            width: 100%;\n            background-color: rgba(0, 0, 0, .6);\n            box-shadow: 0 0 4px #000;\n            z-index: 1000 !important;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            opacity: 0;\n            transition: opacity 120s;\n            &.mountedDialog{\n                opacity: 1;\n            }\n            .dialogContent{\n                background-color: #fff;\n                width: 800px;\n                border: 1px solid gray;\n                box-shadow: 0 0 0 8px #fff;\n                h3{\n                    padding-left: 20px;\n                    padding-bottom: 17px;\n                    border-bottom: 1px solid gray;\n                }\n                p{\n                    text-align: center;\n                    width: 100%;\n                    padding: 20px;\n                    ","\n                    font-size: 1.05rem;\n                }\n                div{\n                    padding: 16px;\n                    padding-right: 0;\n                    padding-top: 0;\n                    button { margin-left: 20px; }\n                }\n            }\n        }\n        \n    "]);return B=function(){return e},e}var P=function(e){var t=e.data,n=e.setDialog,o=Object(a.useState)(!1),l=Object(S.a)(o,2),i=l[0],c=l[1];Object(a.useEffect)(function(){c(!0)},[]);var u=t.header,s=t.message,m=t.confirm,p=t.reject,d=C.a.div(B(),!u&&"padding-top: 36px;"),g=function(e){e(),n({open:!1})};return r.a.createElement(d,null,r.a.createElement("div",{className:"dialogContainer ".concat(i&&"mountedDialog")},r.a.createElement("div",{className:"dialogContent"},u&&r.a.createElement("h3",null,u),s&&r.a.createElement("p",null,s),(m||p)&&r.a.createElement("div",{className:"grouping right"},m&&r.a.createElement("button",{onClick:function(){return g(m)},className:"btn"},"Yes"),p&&r.a.createElement("button",{onClick:function(){return g(p)},className:"btn red"},"Cancel")))))};function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var D=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(s.a)(t).call(this))).componentDidMount=function(){return e.setState(h(),function(){return e.setState(x([],g))})},e.saveState=function(t){return e.setState(t,function(){return v(e.state)})},e.updateAmount=function(t){return e.saveState({amount:y(t.initialAmount,t.initialRec,"w")})},e.updateViewBy=function(t){return e.saveState({viewBy:t})},e.setDialog=function(t){return e.setState({dialog:t})},e.addBudgetItem=function(t){return e.saveState(j(e.state.budget,t,g,e.state.total))},e.deleteBudgetItem=function(t,n){return e.saveState(w(e.state.budget,t,n,e.state.total))},e.updateBudgetItem=function(t,n){return e.saveState(k(e.state.budget,t,n,g,e.state.total))},e.updateSavingsTables=function(t){return e.saveState({savingsTable:t})},e.render=function(){return r.a.createElement(r.a.Fragment,null,e.state.dialog.open&&r.a.createElement(P,{data:e.state.dialog,setDialog:e.setDialog}),r.a.createElement(p.Provider,{value:e.state},e.props.children))},e.defaultVals={amount:null,viewBy:"m",theme:d,budget:{},total:1,dialog:{open:!1},savingsTable:[{0:{stAmount:0,interest:0,deposit:0}}]},e.methods={updateAmount:e.updateAmount,updateViewBy:e.updateViewBy,addBudgetItem:e.addBudgetItem,deleteBudgetItem:e.deleteBudgetItem,updateBudgetItem:e.updateBudgetItem,updateSavingsTables:e.updateSavingsTables,setDialog:e.setDialog},e.state=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},e.defaultVals,{},e.methods),e}return Object(m.a)(t,e),t}(r.a.Component);function F(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var R=function(e){var t=e.render,n=e.defaultFormData,o=void 0===n?{}:n,l=e.reDefault,c=void 0!==l&&l,u=Object(a.useState)(o),s=Object(S.a)(u,2),m=s[0],p=s[1],d=Object(a.useState)(!1),g=Object(S.a)(d,2),b=g[0],f=g[1];Object(a.useEffect)(function(){!b&&p(o),!c&&f(!0)},[o,b,c]);return r.a.createElement(r.a.Fragment,null,t(function(e){return p(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?F(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):F(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},m,Object(i.a)({},e.target.name,e.target.value)))},m))},T=n(6),I=n(7);function q(){var e=Object(A.a)(["\n    border-bottom: 1px solid;\n    box-shadow: ",";\n    position: relative;\n    padding: 10px 20px;\n    cursor: pointer;\n    & ul {\n      z-index: 1;\n      list-style-type: none;\n      list-style-position: outside;\n      margin: 0;\n      padding: 0;\n      position: absolute;\n      top: 100%;\n      left: 0;\n      width: 100%;\n      box-shadow: ",";\n      & li {\n        padding: 10px 10px;\n        background-color: #fff;\n        &:hover {\n          color: #fff;\n          cursor: pointer;\n          background-color: #c3c3c3;\n        }\n      }\n    }\n    ","\n  "]);return q=function(){return e},e}var z=function(e){var t=e.options,n=e.callBack,o=e.isSet,l=e.icon,i=e.styles,c=Object(a.useState)(!1),u=Object(S.a)(c,2),s=u[0],m=u[1],p=C.a.ul(q(),s?"0 3px 5px #c4c4c4":"",s?"0 5px 5px #c4c4c4":"",i);return r.a.createElement(p,{onClick:function(){return m(!s)}},l&&r.a.createElement(r.a.Fragment,null,l," \xa0"),r.a.createElement("span",null,o?function(e,t){for(var n=e,a=0;a<t.length;a++)if(t[a].v===e){n=t[a].d;break}return n}(o,t):"Pick one"),r.a.createElement("ul",{style:{display:s?"block":"none"}},t.map(function(e,t){return r.a.createElement("li",{key:t,onClick:function(){m(!1),n&&n(e.v)}}," ",e.d," ")})),"\xa0\xa0",r.a.createElement(T.a,{icon:I.b,style:{position:"absolute",right:"10px"}}))};function G(){var e=Object(A.a)(["\n  list-style-type: none;\n  padding: 0;\n  margin-top: 30px;\n  margin-bottom: 20px;\n  li {\n    padding: 12px 12px;\n    padding-left: 16px;\n    display: ",";\n    justify-content: space-between;\n    &:nth-child(odd) {\n      background-color: #e9e9e9;\n    }\n  }\n"]);return G=function(){return e},e}var M=function(e){var t=e.children,n=e.split,a=C.a.ul(G(),n?"flex":"block");return r.a.createElement(a,null,t)},V=[{v:"y",d:"Yearly"},{v:"m",d:"Monthly"},{v:"w",d:"Weekly"},{v:"bw",d:"Bi-weekly"}];function L(){var e=Object(A.a)(["\n    color: ",";\n    margin-top: 5px;\n    margin-left: 15px;\n    font-size: 1.4rem;\n    border: 1px solid ",";\n    border-top: none;\n    border-left: none;\n    padding: 24px 30px 17px 30px;\n    float: left;\n    position: absolute;\n    top: -12px;\n    left: -22px;\n    &:after {\n      border: 1px solid ",';\n      border-left: none;\n      height: 12px;\n      width: 13px;\n      position: absolute;\n      bottom: -8px;\n      left: 0px;\n      content: "";\n    }\n    &:before {\n      border: 1px solid ',';\n      border-top: none;\n      height: 13px;\n      width: 12px;\n      position: absolute;\n      right: -7px;\n      top: 0px;\n      content: "";\n    }\n  ']);return L=function(){return e},e}var W=function(e){var t=e.title,n=Object(a.useContext)(p),o=C.a.h2(L(),n.theme.green,n.theme.lightGray,n.theme.lightGray,n.theme.lightGray);return r.a.createElement(r.a.Fragment,null,r.a.createElement(o,null,t),r.a.createElement("p",{style:{clear:"both",height:"0",width:"0",background:"none"}}))},Y=function(e){var t=e.children,n=e.title,o=e.exClass,l=void 0===o?"":o,i=e.exStyles,c=void 0===i?{}:i,u=Object(a.useState)(!0),s=Object(S.a)(u,2),m=s[0],p=s[1],d={fontSize:"3rem",display:"block",textAlign:"center",cursor:"pointer",color:"darkgray",top:"10px",right:"12px",position:"absolute",width:"40px",height:"40px",marginTop:m?"-5px":"0"};return r.a.createElement("div",{className:"contentBox ".concat(l),style:c},r.a.createElement("span",{onClick:function(){return p(!m)},style:d},m?"-":"+"),r.a.createElement(W,{title:n}),m&&t)},H=function(e){var t=e.error;return r.a.createElement("span",{style:{color:"red",fontStyle:"italic",marginTop:"-8px",display:"block",textAlign:"right",width:"97%"}},t)},J=function(){var e=Object(a.useContext)(p),t=e.updateAmount,n=e.theme,o=Object(a.useState)(null),l=Object(S.a)(o,2),i=l[0],c=l[1];return r.a.createElement(Y,{title:"Takehome amount",exClass:"sm",exStyles:{borderTop:"8px solid ".concat(n.green)}},r.a.createElement("br",null),r.a.createElement(R,{defaultFormData:{initialAmount:e.amount,initialRec:"w"},render:function(e,n){return r.a.createElement("div",{className:"initial-form"},r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{htmlFor:"initialAmount"},"Enter Amount"),r.a.createElement("input",{type:"number",name:"initialAmount",id:"initialAmount",value:n.initialAmount?n.initialAmount:"",placeholder:"input amount to begin",onChange:function(t){return e(t)}}),i&&i.initialAmount&&r.a.createElement(H,{error:i.initialAmount}),r.a.createElement("label",{htmlFor:"initialRec"},"Recurrence"),r.a.createElement(z,{options:V,styles:"width: 89%; margin: 20px auto",isSet:n.initialRec?n.initialRec:"",callBack:function(t){var n={};n.target={value:t,name:"initialRec"},e(n)}})),r.a.createElement("span",{className:"grouping right"},r.a.createElement("button",{className:"btn",onClick:function(){return function(e){var n={};if(e.initialAmount){var a=e.initialAmount.split(" ").join("");isNaN(a)&&(n.initialAmount="Please input a number")}else n.initialAmount="Please input an amount";if(c(n),Object.keys(n).length<1)return t(e)}(n)}},"Submit")),n.initialAmount&&parseFloat(n.initialAmount)>0?r.a.createElement(M,{split:!0},r.a.createElement("li",null,r.a.createElement("strong",null,"Weekly:"," "),r.a.createElement("span",null,y(n.initialAmount,n.initialRec,"w","money"))),r.a.createElement("li",null,r.a.createElement("strong",null,"Bi-Weekly:"," "),r.a.createElement("span",null,y(n.initialAmount,n.initialRec,"bw","money"))),r.a.createElement("li",null,r.a.createElement("strong",null,"Monthly:"," "),r.a.createElement("span",null,y(n.initialAmount,n.initialRec,"m","money"))),r.a.createElement("li",null,r.a.createElement("strong",null,"Yearly:"," "),r.a.createElement("span",null,y(n.initialAmount,n.initialRec,"y","money")))):"")}}))};function _(){var e=Object(A.a)(["\n    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);\n    background-color: white;\n    padding: 0;\n    color: ",";\n    position: fixed;\n    top: 0;\n    width: 100%;\n    z-index: 100;\n    p,\n    ul {\n      margin: 0;\n      padding-top: 7px;\n      font-weight: bold;\n    }\n    .logo {\n      background-color: ",";\n      padding: 7px 10px 7px 10px;\n      border-radius: 4px;\n      color: white;\n    }\n    & div {\n      padding-top: 10px;\n      padding-bottom: 10px;\n      width: 96%;\n      margin: 0 auto;\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;\n    }\n  "]);return _=function(){return e},e}var U=function(){var e=Object(a.useContext)(p),t=C.a.div(_(),e.theme.green,e.theme.green);return r.a.createElement(t,null,r.a.createElement("div",null,r.a.createElement("p",{className:"logo"},r.a.createElement(T.a,{icon:I.c}),"\xa0 Budge-it"),r.a.createElement(z,{icon:r.a.createElement(T.a,{icon:I.a}),options:V,isSet:f(e.viewBy),callBack:function(t){return e.updateViewBy(t)}}),r.a.createElement("p",null,e.amount&&y(e.amount,"w",e.viewBy,"money"))))};function $(){var e=Object(A.a)(["",""]);return $=function(){return e},e}var K=function(e){var t=e.children,n=e.className,a=e.pattern,o=void 0===a?[40,30]:a,l=e.onClick,i=e.tData,c=C.a.div($(),function(){var e="";if(o.length>2)for(var t=2;t<o.length+1;t++)e+=" &:nth-child(".concat(t,"){ \n          width: ").concat(o[t-1],"%;\n        }");return"\n    cursor: ".concat(l?"pointer":"",";\n    display: flex;\n    justify-content: space-between;\n    width: 100%;\n    margin: 0 auto;\n    border-radius: 0;\n    border-left: 3px solid ").concat(d.vBlue,";\n    &:nth-child(odd) {\n      background-color: ").concat(d.fBlue,";\n    }\n    div {\n      width: ").concat(o.length>1?o[1]:o[0],"%;\n      text-align: right;\n      padding: 13px 10px;\n      &:first-child {\n        text-align: left;\n        width: ").concat(o[0],"%;\n      }\n      ").concat(e,"\n    }\n    &.headerRow {\n      background-color:  ").concat(d.vBlue,";\n      font-weight: bold;\n      color: #fff;\n      border-color: ").concat(d.vBlue,";\n    }\n    &:not(.headerRow):hover {\n      background-color: ").concat(d.lightGray,";\n      color: #000;\n      border-color: ").concat(d.lightGray,";\n      z-index: 1;\n    }\n    \n  ")}());return r.a.createElement(c,{className:n,onClick:l||null},i&&i.map(function(e,t){return r.a.createElement("div",{key:t},e)}),t)},Q={Giving:[8,10],Savings:[10,15],Food:[10,15],utilities:[5,10],Housing:[25,30],Transportation:[8,10],Health:[5,10],Insurance:[10,25],Recreation:[5,10],Personal:[5,10],Miscellaneous:[5,10]},X=function(){var e=Object(a.useContext)(p);return r.a.createElement(Y,{title:"Recommended",exClass:"lg"},r.a.createElement("div",{className:"row mt-40"},r.a.createElement("p",{className:"sm"},"Suggested budget categories are based upon recommended percentages pulled from various resources. They are just guidelines. The exact amount will vary based on location, age, situations and lifestyle choices. "),r.a.createElement("div",{className:"lg"},r.a.createElement("div",null,r.a.createElement(K,{className:"headerRow"},r.a.createElement("div",null,"Category"),r.a.createElement("div",null,"Low"),r.a.createElement("div",null,"High")),Object.keys(Q).map(function(t,n){return r.a.createElement(K,{key:n},r.a.createElement("div",null,t),Q[t].map(function(t,n){return r.a.createElement("div",{key:n},t,"% ",r.a.createElement("br",null),y((a=t,o=e.amount,a/100*o),"w",e.viewBy,"money"));var a,o}))})))))},Z=n(20),ee=n.n(Z),te=function(e){var t=e.styles,n=e.data;return r.a.createElement("div",{style:t},r.a.createElement(ee.a,{animate:!0,textAnchor:!0,data:n}))},ne=function(e){var t=e.color,n=void 0===t?"gray":t,a=e.size,o=void 0===a?17:a,l={backgroundColor:n,height:"".concat(o,"px"),width:"".concat(o,"px"),display:"block",border:"2px solid #fff",borderRadius:"50%",marginRight:"8px",float:"left"};return r.a.createElement("i",{style:l})},ae=function(e){var t=e.title,n=void 0===t?"test":t,a=e.percent,o=void 0===a?50:a,l={border:"1px solid red",height:"".concat(32,"px"),width:"100%",position:"relative",backgroundColor:"pink"},i={backgroundColor:"red",position:"absolute",left:"0",height:"".concat(32,"px"),top:"0",width:"".concat(o>100?100:o,"%")},c={zIndex:"2",width:"100%",textAlign:"center",padding:"0",paddingTop:"".concat(32/3-5,"px"),fontWeight:"bold",margin:"0",position:"relative",color:"#fff",textShadow:"0 0 4px red",fontSize:"1.1rem"};return r.a.createElement("div",{style:l},r.a.createElement("p",{style:c},n),r.a.createElement("div",{style:i}))};function re(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function oe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?re(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):re(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var le=function(e){var t=e.editItem,n=e.onSubmit,a=e.catOptions,o=e.deleteBudgetItem,l=e.updateEditItem,i=e.setDialog,c=e.errors;return r.a.createElement(R,{defaultFormData:t?oe({},t,{newCategory:"off"}):{newCategory:"off"},reDefault:!0,render:function(e,t){return r.a.createElement(r.a.Fragment,null,r.a.createElement("label",null,"Category "),"on"===t.newCategory?r.a.createElement("input",{type:"text",name:"category",onChange:function(t){return e(t)},value:t&&t.category?t.category:""}):r.a.createElement(z,{options:a,styles:"width: 89%; margin: 20px auto",isSet:t.category?t.category:"",callBack:function(t){return e({target:{value:t,name:"category"}})}}),r.a.createElement("label",{className:"cu_checkBox"},r.a.createElement("input",{type:"checkbox",name:"newCategory",onChange:function(){return e({target:{name:"newCategory",value:"off"===t.newCategory?"on":"off"}})}})," ",r.a.createElement("span",null),"New Category"),r.a.createElement("label",null,"Budget Item"),r.a.createElement("input",{type:"text",name:"item",onChange:function(t){return e(t)},value:t&&t.item?t.item:""}),c&&c.item&&r.a.createElement(H,{error:c.item}),r.a.createElement("label",null,"Amount"),r.a.createElement("input",{type:"number",name:"amount",onChange:function(t){return e(t)},value:t&&t.amount?t.amount:""}),c&&c.amount&&r.a.createElement(H,{error:c.amount}),r.a.createElement("label",null,"Recurrence"),r.a.createElement(z,{options:V,styles:"width: 91%; margin: 20px auto",isSet:"m",callBack:function(t){var n={};n.target={value:t,name:"initialRec"},e(n)}}),r.a.createElement("div",{className:"grouping right"},r.a.createElement("button",{onClick:function(){return i({open:!0,header:"Delete item",message:r.a.createElement(r.a.Fragment,null,"Are you sure you want to delete this item? ",r.a.createElement("br",null)," This can not be undone."),confirm:function(){l(null),o(t.category,t.id)},reject:function(){return null}})},className:"btn red"},"Delete"),r.a.createElement("button",{type:"submit",className:"btn",onClick:function(){return n(t)}},"Submit")))}})};function ie(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var ce=function(e){var t=e.step,n=Object(a.useContext)(p),o=Object(a.useState)(!1),l=Object(S.a)(o,2),c=l[0],u=l[1],s=Object(a.useState)(null),m=Object(S.a)(s,2),d=m[0],g=m[1],b=Object(a.useState)(null),v=Object(S.a)(b,2),h=v[0],E=v[1],O=[],x=y(n.amount,"w",n.viewBy)-y(n.total,"m",n.viewBy),w=y(n.total,"m",n.viewBy)/y(n.amount,"w",n.viewBy)*100,j=[],k=[];return Object.keys(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ie(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ie(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},n.budget,{},Q)).forEach(function(e){var t=e.toLowerCase();k.includes(t)||(j.push({d:t,v:t}),k.push(t))}),O.push({title:"Unallocated",value:isNaN(w)?100:100-w,color:"gray"}),Object.keys(n.budget).forEach(function(e){O.push({title:e,value:y(n.budget[e].total,"m",n.viewBy)/y(n.amount,"w",n.viewBy)*100,color:n.budget[e].color})}),r.a.createElement(Y,{title:"Your budget"},r.a.createElement("div",{className:"row mt-40"}," ",r.a.createElement("div",{className:"sm"},r.a.createElement(te,{data:O,styles:{maxWidth:"400px",margin:"0 auto"}}),r.a.createElement("div",{className:"contentBox row",style:{padding:"10px",marginTop:"25px"}},r.a.createElement("p",{className:"text-left w-100"},r.a.createElement("strong",null,y(n.total,"m",n.viewBy,"money"))," budgeted of",r.a.createElement("strong",null," ",y(n.amount,"w",n.viewBy,"money"))),r.a.createElement(ae,{percent:w,title:w.toFixed(2)+"%"}),r.a.createElement("p",{className:"text-right w-100"},r.a.createElement("strong",null,y(x,n.viewBy,n.viewBy,"money"))," Remianing"," ",f(n.viewBy))))," ",r.a.createElement("div",{className:"md"},t<2?r.a.createElement("h2",{style:{textAlign:"center",marginTop:"75px"}},"Add a budget item"):Object.keys(n.budget).map(function(e){return r.a.createElement("div",{key:e,style:{marginBottom:"33px"}},r.a.createElement(K,{className:"headerRow"},r.a.createElement("div",null,r.a.createElement(ne,{color:n.budget[e].color,size:"13"})," ",(o=e).charAt(0).toUpperCase()+o.slice(1)),r.a.createElement("div",null,r.a.createElement("span",{style:{paddingRight:"12px"}},(t=n.budget[e].total,a=y(n.amount,"w","m"),"".concat((t/a*100).toFixed(2),"%"))," \xa0\xa0 |"),y(n.budget[e].total,"m",n.viewBy,"money"))),n.budget[e].items.map(function(e,t){return r.a.createElement(K,{onClick:function(){g(e),u(!0)},key:t+"-"+e.name},r.a.createElement("div",null,e.item),r.a.createElement("div",null,y(e.amount,"m",n.viewBy,"money")))}));var t,a,o})),r.a.createElement("div",{className:"sm"},r.a.createElement("span",{className:"right"},r.a.createElement("button",{className:"btn ".concat(c&&"red"),onClick:function(){g(null),u(!c)}},r.a.createElement(T.a,{icon:I.d,style:{rotate:c?"deg(35)":"deg(0)"}}),"\xa0\xa0 ",c?"Cancel":"Add"," budget item")),c&&r.a.createElement(le,{catOptions:j,editItem:d,updateEditItem:g,deleteBudgetItem:n.deleteBudgetItem,setDialog:n.setDialog,errors:h,onSubmit:function(e){if(!function(e){var t={};return[{name:"amount",req:!0,type:"number"},{name:"item",req:!0,type:"text"}].forEach(function(n){if(n.req&&!e[n.name]&&(t[n.name]="Field is required"),"number"===n.type){var a=e[n.name].split(" ").join("");isNaN(a)&&(t[n.name]="Please input a number")}}),E(t),0===Object.keys(t).length}(e))return null;!d&&n.addBudgetItem(e),d&&n.updateBudgetItem(d,e),g(null),u(!1)}}))))},ue=n(21),se=function(e){var t=e.open,n=e.message,o=e.children,l=Object(a.useState)(!0),i=Object(S.a)(l,2),c=i[0],u=i[1],s=Object(a.useState)(!1),m=Object(S.a)(s,2),p=m[0],g=m[1];Object(a.useEffect)(function(){!p&&null!==t&&u(!t),g(!0)},[t,p]);var b={textAlign:"center",padding:"3px",cursor:"pointer",backgroundColor:d.lightGray,border:"1px solid ".concat(d.darkGray),color:d.darkGray,borderRadius:"5px",width:"80%",margin:"20px auto"},f=n||r.a.createElement("p",{style:b,onClick:function(){return u(!c)}},"Click to view content");return r.a.createElement("span",null,!c&&r.a.createElement("p",{onClick:function(){return u(!c)},style:{padding:"0",textAlign:"center",color:"#fff",margin:"3px auto",width:"98%",cursor:"pointer",backgroundColor:d.lightGray}},"Click to hide content"),c?f:o)};function me(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var pe=function(e){var t=e.step,n=Object(a.useContext)(p),o=Object(a.useState)(null),l=Object(S.a)(o,2),c=l[0],u=l[1],s=function(e){Object.keys(e).forEach(function(t){return e[t]=parseFloat(e[t])});for(var t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?me(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):me(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},n.savingsTable[0]),a={},r=e.stAmount,o=1;o<e.years+1;o++){var l=e.startAge+o,c={stAmount:r,interest:r*(e.rate/100),deposit:e.depAmount};a[l]=c,t[l]?(t[l].stAmount=t[l].stAmount+r,t[l].interest=t[l].interest+r*(e.rate/100),t[l].deposit=t[l].deposit+e.depAmount):t[l]=c,r=r+e.depAmount+r*(e.rate/100)}var u=Object(ue.a)(n.savingsTable);u[0]=t,u.push(a),n.updateSavingsTables(u)};return r.a.createElement(Y,{title:"Savings estimator",exClass:0===t&&"lg"},r.a.createElement("div",{className:"row"},r.a.createElement("p",{className:"sm"},"Estimate how much you'll have by retirement. ",r.a.createElement("br",null)," The breakdown of each account will display in a new table. The totals will display in the first table. "),r.a.createElement("div",{className:0===t?"lg":"sm"},r.a.createElement(R,{render:function(e,t){return r.a.createElement(r.a.Fragment,null,r.a.createElement("label",null,"Starting amount"),r.a.createElement("input",{type:"number",onChange:e,name:"stAmount",value:t.stAmount}),c&&c.stAmount&&r.a.createElement(H,{error:c.stAmount}),r.a.createElement("label",null,"Starting age"),r.a.createElement("input",{type:"number",onChange:e,name:"startAge",value:t.startAge}),c&&c.stAge&&r.a.createElement(H,{error:c.stAge}),r.a.createElement("label",null,"Amount each deposit"),r.a.createElement("input",{type:"number",onChange:e,name:"depAmount",value:t.depAmount}),c&&c.depAmount&&r.a.createElement(H,{error:c.depAmount}),r.a.createElement("label",null,"Every ___ Month/s (12 = 1 year)"),r.a.createElement("input",{type:"number",onChange:e,name:"per",value:t.per}),c&&c.per&&r.a.createElement(H,{error:c.per}),r.a.createElement("label",null,"Percent rate (number only)"),r.a.createElement("input",{type:"number",onChange:e,name:"rate",value:t.rate}),c&&c.rate&&r.a.createElement(H,{error:c.rate}),r.a.createElement("label",null,"For how many years?"),r.a.createElement("input",{type:"number",onChange:e,name:"years",value:t.years}),c&&c.years&&r.a.createElement(H,{error:c.years}),r.a.createElement("div",{className:"grouping right"},r.a.createElement("button",{className:"btn",onClick:function(){return function(e){var t={};if([{name:"stAmount",req:!0,type:"number"},{name:"startAge",req:!0,type:"number"},{name:"depAmount",req:!0,type:"number"},{name:"per",req:!0,type:"number"},{name:"rate",req:!0,type:"number"},{name:"years",req:!0,type:"number"}].forEach(function(n){if(n.req&&!e[n.name]&&(t[n.name]="Field is required"),"number"===n.type){console.log(e),console.log(n.name);var a=e[n.name].split?e[n.name].split(" ").join(""):e[n.name];isNaN(a)&&(t[n.name]="Please input a number")}}),u(t),Object.keys(t).length>0)return t;s(e)}(t)}},"Submit")))}})),n.savingsTable.length>1||0===t?n.savingsTable.map(function(e,t){return r.a.createElement(r.a.Fragment,{key:t}," ",function(e,t){var a=[6,25,16,24,25];if(1===Object.keys(e).length&&e[0])return null;var o=Object.keys(e).map(function(t){return 0===t||"0"===t?null:r.a.createElement(K,{pattern:a,key:t,tData:[t,b(e[t].stAmount),b(e[t].interest),b(e[t].deposit),b(e[t].stAmount+e[t].interest+e[t].deposit)]})});return r.a.createElement("div",{className:"md",style:{marginBottom:"20px"}},r.a.createElement("label",{style:{fontSize:"1.1rem",backgroundColor:n.theme.vBlueDark,color:"#fff",padding:"6px 10px 3px 10px",borderRadius:"5px 5px 0 0",width:"120px",textAlign:"center",marginLeft:"30px"}},0===t?"Totals":"Table ".concat(t)),r.a.createElement(K,{pattern:a,className:"headerRow",tData:["Age","Starting Amount","Interest","Deposited","End"]}),r.a.createElement(se,{open:0===t},o))}(e,t)," ")}):r.a.createElement("h2",{className:"md",style:{textAlign:"center",marginTop:"75px"}},"Add a budget item")))},de=function(){return r.a.createElement("div",{style:{width:"100%",paddingTop:"1px",paddingBottom:"20px",textAlign:"center",fontSize:".8rem"}}," ",r.a.createElement("br",null),"\xa9 ",(new Date).getFullYear()," ","All Rights Reserved. 0.03")},ge=function(){var e=Object(a.useContext)(p),t=e.total,n={};return Object.keys(e.budget).forEach(function(a){a&&(a.toLowerCase().includes("saving")||a.toLowerCase().includes("save"))&&(n[a]=e.budget[a],t-=parseFloat(e.budget[a].total))}),r.a.createElement(Y,{title:"Emergency Funds",exClass:"lg"},r.a.createElement("div",{className:"row mt-40"},r.a.createElement("p",{className:"sm"},"Having an emergency fund is an important part of financial independence. Be adequately prepared for unforeseen circumstances by saving at least 3 months of monthly expenses."),r.a.createElement("div",{className:"lg"},r.a.createElement(M,{split:!0},r.a.createElement("li",null,r.a.createElement("strong",null,"Monthly expenditure"),r.a.createElement("span",null,b(e.total))),Object.keys(n).map(function(e){return r.a.createElement("li",{key:e},r.a.createElement("strong",null,e)," ",r.a.createElement("span",null,"-",b(n[e].total)))}),r.a.createElement("li",null,r.a.createElement("strong",null,"Monthly living living expenses"),b(t)," "),r.a.createElement("li",null,r.a.createElement("strong",null,"Target emergency funds"),b(3*t)," ")))))};var be=function(){var e=Object(a.useContext)(p),t=0;return null!==e.amount&&t++,Object.keys(e.budget).length>0&&t++,r.a.createElement("div",{className:"App container"},r.a.createElement(U,null),r.a.createElement("div",{className:"row"},r.a.createElement(J,null),t>0&&r.a.createElement(X,null),t>0&&r.a.createElement(ce,{step:t}),r.a.createElement(pe,{step:t}),t>0&&r.a.createElement(ge,null)),r.a.createElement(de,null))};l.a.render(r.a.createElement(D,null,r.a.createElement(be,null)),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.71aa2b93.chunk.js.map