(this.webpackJsonpmern=this.webpackJsonpmern||[]).push([[0],{131:function(e,t,a){e.exports=a(313)},136:function(e,t,a){},154:function(e,t,a){},159:function(e,t,a){},160:function(e,t,a){},161:function(e,t,a){},163:function(e,t,a){"use strict";var n=a(164);function o(e,t,a){this.amount=e,this.interest=t/12,this.months=12*a}o.prototype.fixedMonthlyPayment=function(){var e=this.amount,t=this.interest,a=this.months;return(e*(t*Math.pow(1+t,a)/(Math.pow(1+t,a)-1))).toFixed(2)},o.prototype.remainingLoanBalance=function(e){var t=e,a=this.amount,n=this.interest,o=this.months;return(a*((Math.pow(1+n,o)-Math.pow(1+n,t))/(Math.pow(1+n,o)-1))).toFixed(2)},o.prototype.amortizationTable=function(){for(var e=this.amount,t=this.interest,a=this.fixedMonthlyPayment(),o=0,s=0,r=[],l=0;l<this.months;l++){var i=n.round(e*t),c=n.round(a-i);o=n.round(o+i),s=n.round(s+c),e=n.round(e-c),r.push([a,c,i,o,e])}return r},e.exports=o},164:function(e,t,a){"use strict";t.round=function(e){return t="round",a=e,"undefined"===typeof(n=-2)||0===+n?Math[t](a):(a=+a,n=+n,isNaN(a)||"number"!==typeof n||n%1!==0?NaN:(a=a.toString().split("e"),+((a=(a=Math[t](+(a[0]+"e"+(a[1]?+a[1]-n:-n)))).toString().split("e"))[0]+"e"+(a[1]?+a[1]+n:n))));var t,a,n}},165:function(e,t,a){},302:function(e,t,a){},309:function(e,t,a){},312:function(e,t,a){},313:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(29),r=a.n(s),l=a(21),i=a(22),c=(a(136),a(4)),m=a(5),u=a(7),d=a(6),h=a(8),p=a(3),g=a.n(p),f=(a(154),a(49),a(31)),v=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("tbody",null,o.a.createElement("tr",{className:"table-data"},o.a.createElement("td",null,this.props.name),o.a.createElement("td",null,this.props.value),o.a.createElement("td",null,this.props.category),o.a.createElement("td",null,this.props.frequency),o.a.createElement("td",{id:this.props.id,onClick:function(){return e.props.handleClick(e.props.id)},className:"icon-style"},o.a.createElement(f.a,null)))))}}]),t}(o.a.Component),E=a(317),y=a(315),b=a(126),w=a(318),S=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(d.a)(t).call(this))).onChange=function(t){var a=e.state;a[t.target.name]=t.target.value,e.setState(a)},e.state={name:"",value:"",category:"",frequency:"",expenses:[]},e}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state,t=e.name,a=e.value,n=e.category,s=e.frequency;return o.a.createElement(E.a,{className:"mt-2",onSubmit:this.props.handleSubmit},o.a.createElement(y.a,{className:"mb-2"},o.a.createElement(b.a,{className:"mr-1"},o.a.createElement(E.a.Label,null,"Expense"),o.a.createElement(E.a.Control,{size:"sm",type:"text",className:"form-control",placeholder:"Loan",name:"name",value:t,onChange:this.onChange,required:!0})),o.a.createElement(b.a,{className:"mr-1"},o.a.createElement(E.a.Label,null,"Amount"),o.a.createElement(E.a.Control,{size:"sm",type:"text",className:"form-control",placeholder:"$4,000",name:"value",value:a,onChange:this.onChange,required:!0})),o.a.createElement(b.a,{className:"mr-1"},o.a.createElement(E.a.Label,null,"Category"),o.a.createElement(E.a.Control,{size:"sm",type:"text",className:"form-control",placeholder:"School",name:"category",value:n,onChange:this.onChange,required:!0})),o.a.createElement(b.a,{className:"mr-1"},o.a.createElement(E.a.Label,{htmlFor:"inputFrequency"},"Frequency"),o.a.createElement(E.a.Control,{size:"sm",as:"select",value:s,onChange:this.onChange,name:"frequency",id:"sel1"},o.a.createElement("option",{value:"monthly"},"Monthly"),o.a.createElement("option",{value:"bi-monthly"},"Bi-Monthly"),o.a.createElement("option",{value:"annual"},"Annual"),o.a.createElement("option",{value:"semi-annual"}," Semi-Annual")))),o.a.createElement(w.a,{className:"d-flex justify-content-center mt-2 mb-4",variant:"primary",type:"submit"},"Add Expense"))}}]),t}(n.Component),C=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e)))._isMounted=!1,a.handleSubmit=function(e){e.preventDefault();var t=e.target,n=t.name,o=t.value,s=t.category,r=t.frequency,l={};sessionStorage.getItem("user")&&(l=JSON.parse(sessionStorage.getItem("user")));var i={name:n.value,category:s.value,value:o.value,frequency:r.value,id:l.id};g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.post("/api/expenses",i).then((function(e){a._isMounted&&Array.isArray(e.data)&&(a.setState({expenses:e.data}),window.dispatchEvent(new CustomEvent("expenses-changed")),window.dispatchEvent(new CustomEvent("update-KeyMetricsChart")),window.dispatchEvent(new CustomEvent("incomes-changed")),console.log(e.data.length))})).catch((function(e){console.log("error",e),401===e.response.status&&window.location.assign("/")}))},a.handleClick=function(e){console.log("delete expense:",e);var t={};sessionStorage.getItem("user")&&(t=JSON.parse(sessionStorage.getItem("user"))),g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.delete("/api/expenses/"+t.id,{data:{expense_id:e}}).then((function(e){console.log(e.data),a._isMounted&&Array.isArray(e.data)&&(console.log(e.data.length),a.setState({expenses:e.data}),window.dispatchEvent(new CustomEvent("expenses-changed")),window.dispatchEvent(new CustomEvent("update-KeyMetricsChart")))})).catch((function(e){console.log("error",e),401===e.response.status&&window.location.assign("/")}))},a.state={expenses:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0;var t={};sessionStorage.getItem("user")&&(t=JSON.parse(sessionStorage.getItem("user"))),g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.get("/api/expenses/"+t.id).then((function(t){e._isMounted&&Array.isArray(t.data)&&(console.log("expenses:",t.data),e.setState({expenses:t.data}))}))}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-12"},o.a.createElement("h2",null,"Add Expenses"),o.a.createElement("div",null,o.a.createElement("div",{className:"row"},o.a.createElement("table",{className:"expense-table"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Expense"),o.a.createElement("th",null,"Amount"),o.a.createElement("th",null,"Category"),o.a.createElement("th",null,"Frequency"),o.a.createElement("th",null,"Remove"))),this.state.expenses.map((function(t,a){return o.a.createElement(v,{key:a,id:t._id,name:t.name,category:t.category,value:t.value,frequency:t.frequency,handleClick:e.handleClick})})))))),o.a.createElement("div",null,o.a.createElement(S,{handleSubmit:this.handleSubmit}))))}}]),t}(o.a.Component),N=(a(50),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("tbody",null,o.a.createElement("tr",{className:"table-data"},o.a.createElement("td",null,this.props.name),o.a.createElement("td",null,this.props.value),o.a.createElement("td",null,this.props.frequency),o.a.createElement("td",{id:this.props.id,onClick:function(){return e.props.handleClick(e.props.id)},className:"icon-style"},o.a.createElement(f.a,null)))))}}]),t}(o.a.Component)),j=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(d.a)(t).call(this))).onChange=function(t){var a=e.state;a[t.target.name]=t.target.value,e.setState(a)},e.state={name:"",value:"",frequency:"",incomes:[]},e}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state,t=e.name,a=e.value,n=e.frequency;return o.a.createElement(E.a,{onSubmit:this.props.handleSubmit},o.a.createElement(y.a,{className:"mb-2 mt-2"},o.a.createElement(b.a,{className:"mr-1"},o.a.createElement(E.a.Label,null,"Income Name"),o.a.createElement(E.a.Control,{size:"sm",type:"text",className:"form-control",placeholder:"Loan",name:"name",value:t,onChange:this.onChange,required:!0})),o.a.createElement(b.a,{className:"mr-1"},o.a.createElement(E.a.Label,null,"Amount"),o.a.createElement(E.a.Control,{size:"sm",type:"text",className:"form-control",placeholder:"$4,000",name:"value",value:a,onChange:this.onChange,required:!0})),o.a.createElement(b.a,{className:"mr-1"},o.a.createElement(E.a.Label,null,"Frequency"),o.a.createElement(E.a.Control,{size:"sm",as:"select",value:n,onChange:this.onChange,name:"frequency",id:"sel1"},o.a.createElement("option",{value:"monthly"},"Monthly"),o.a.createElement("option",{value:"bi-monthly"},"Bi-Monthly"),o.a.createElement("option",{value:"annual"},"Annual"),o.a.createElement("option",{value:"semi-annual"}," Semi-Annual")))),o.a.createElement(w.a,{className:"d-flex justify-content-center mt-2",variant:"primary",type:"submit"},"Add Income"))}}]),t}(n.Component),O=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e)))._isMounted=!1,a.handleSubmit=function(e){e.preventDefault();var t=e.target,n=t.name,o=t.value,s=t.frequency,r={};sessionStorage.getItem("user")&&(r=JSON.parse(sessionStorage.getItem("user")));var l={name:n.value,value:o.value,frequency:s.value,id:r.id};g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.post("/api/incomes",l).then((function(e){a._isMounted&&Array.isArray(e.data)&&(a.setState({incomes:e.data}),window.dispatchEvent(new CustomEvent("incomes-changed")),window.dispatchEvent(new CustomEvent("update-KeyMetricsChart")))})).catch((function(e){console.log("error",e),401===e.response.status&&window.location.assign("/")}))},a.handleClick=function(e){console.log("delete income:",e);var t={};sessionStorage.getItem("user")&&(t=JSON.parse(sessionStorage.getItem("user"))),g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.delete("/api/incomes/"+t.id,{data:{income_id:e}}).then((function(e){console.log(e.data),a._isMounted&&Array.isArray(e.data)&&(console.log(e.data.length),a.setState({incomes:e.data}),window.dispatchEvent(new CustomEvent("expenses-changed")),window.dispatchEvent(new CustomEvent("update-KeyMetricsChart")))})).catch((function(e){console.log("error",e),401===e.response.status&&window.location.assign("/")}))},a.state={incomes:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0;var t={};sessionStorage.getItem("user")&&(t=JSON.parse(sessionStorage.getItem("user"))),g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.get("/api/incomes/"+t.id).then((function(t){e._isMounted&&Array.isArray(t.data)&&(console.log("incomes:",t.data),e.setState({incomes:t.data}))}))}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-12"},o.a.createElement("h2",null,"Add Income"),o.a.createElement("div",null,o.a.createElement("div",{className:"row"},o.a.createElement("table",{className:"income-table"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Income"),o.a.createElement("th",null,"Amount"),o.a.createElement("th",null,"Frequency"),o.a.createElement("th",null,"Remove"))),this.state.incomes.map((function(t,a){return o.a.createElement(N,{key:a,id:t._id,name:t.name,value:t.value,frequency:t.frequency,handleClick:e.handleClick})})))))),o.a.createElement("div",null,o.a.createElement(j,{handleSubmit:this.handleSubmit}))))}}]),t}(o.a.Component),x=(a(159),function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(d.a)(t).call(this))).onChange=function(t){var a=e.state;a[t.target.name]=t.target.value,e.setState(a)},e.state={name:"",value:"",interest:"",studentLoans:[]},e}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state,t=e.name,a=e.value,n=e.interest;return o.a.createElement(E.a,{onSubmit:this.props.handleSubmit},o.a.createElement(y.a,{className:"mb-2"},o.a.createElement(b.a,{className:"mr-1"},o.a.createElement(E.a.Label,null,"Loan Name"),o.a.createElement(E.a.Control,{size:"sm",type:"text",className:"form-control",placeholder:"Loan",name:"name",value:t,onChange:this.onChange,required:!0})),o.a.createElement(b.a,{className:"mr-1"},o.a.createElement(E.a.Label,null,"Amount"),o.a.createElement(E.a.Control,{size:"sm",type:"text",className:"form-control",placeholder:"$4,000",name:"value",value:a,onChange:this.onChange,required:!0})),o.a.createElement(b.a,{className:"mr-1"},o.a.createElement(E.a.Label,null,"Interest"),o.a.createElement(E.a.Control,{size:"sm",type:"text",className:"form-control",placeholder:"12",name:"interest",value:n,onChange:this.onChange,required:!0}))),o.a.createElement(w.a,{className:"d-flex justify-content-center",variant:"primary",type:"submit"},"Add Loan"))}}]),t}(n.Component)),k=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("tbody",null,o.a.createElement("tr",{className:"table-data"},o.a.createElement("td",null,this.props.name),o.a.createElement("td",null,this.props.value),o.a.createElement("td",null,this.props.interest),o.a.createElement("td",{id:this.props.id,onClick:function(){return e.props.handleClick(e.props.id)},className:"icon-style"},o.a.createElement(f.a,null)))))}}]),t}(o.a.Component),I=(a(160),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e)))._isMounted=!1,a.handleSubmit=function(e){e.preventDefault();var t=e.target,n=t.name,o=t.value,s=t.interest,r={};sessionStorage.getItem("user")&&(r=JSON.parse(sessionStorage.getItem("user")));var l={name:n.value,value:o.value,interest:s.value,id:r.id};g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.post("/api/studentLoans",l).then((function(e){a._isMounted&&Array.isArray(e.data)&&(a.setState({studentLoans:e.data}),window.dispatchEvent(new CustomEvent("expenses-changed")),window.dispatchEvent(new CustomEvent("update-KeyMetricsChart")),window.dispatchEvent(new CustomEvent("loans-changed")))})).catch((function(e){console.log("error",e),401===e.response.status&&window.location.assign("/")}))},a.handleClick=function(e){console.log("delete studentLoan:",e);var t={};sessionStorage.getItem("user")&&(t=JSON.parse(sessionStorage.getItem("user"))),g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.delete("/api/studentLoans/"+t.id,{data:{studentLoan_id:e}}).then((function(e){console.log(e.data),a._isMounted&&Array.isArray(e.data)&&(console.log(e.data.length),a.setState({studentLoans:e.data}),window.dispatchEvent(new CustomEvent("expenses-changed")),window.dispatchEvent(new CustomEvent("update-KeyMetricsChart")))})).catch((function(e){console.log("error",e),401===e.response.status&&window.location.assign("/")}))},a.state={studentLoans:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0;var t={};sessionStorage.getItem("user")&&(t=JSON.parse(sessionStorage.getItem("user"))),g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.get("/api/studentLoans/"+t.id).then((function(t){e._isMounted&&Array.isArray(t.data)&&(console.log("studentLoans:",t.data),e.setState({studentLoans:t.data}))}))}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-12"},o.a.createElement("h2",null,"Add Student Loan"),o.a.createElement("div",null,o.a.createElement("div",{className:"row"},o.a.createElement("table",{className:"mb-2 loan-table"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Loan"),o.a.createElement("th",null,"Amount"),o.a.createElement("th",null,"Interest"),o.a.createElement("th",null,"Remove"))),this.state.studentLoans.map((function(t,a){return o.a.createElement(k,{key:a,id:t._id,name:t.name,value:t.value,interest:t.interest,handleClick:e.handleClick})})))))),o.a.createElement("div",null,o.a.createElement(x,{handleSubmit:this.handleSubmit}))))}}]),t}(o.a.Component)),A=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"income-expense-display"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-12"},o.a.createElement(C,null)))),o.a.createElement("div",{className:"income-expense-display"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-12"},o.a.createElement(O,null)))),o.a.createElement("div",{className:"student-loan-display mb-5"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-12"},o.a.createElement(I,null)))))}}]),t}(o.a.Component),M=(a(161),a(30));a(162),a(163);var F=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={chartDtata:[],balances:0,rate:0},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("loans-changed",(function(t){console.log("loans changed! Update AmortizationChart",t),e.getAmortizationChart()})),this.getAmortizationChart()}},{key:"getAmortizationChart",value:function(){var e=this,t={};sessionStorage.getItem("user")&&(t=JSON.parse(sessionStorage.getItem("user"))),g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.get("/api/studentLoansChart/"+t.id).then((function(t){e.setState({chartDtata:t.data})}))}},{key:"render",value:function(){return console.log("chartDtata",this.state.chartDtata),o.a.createElement("div",null,o.a.createElement(M.a,{width:"920px",height:"380px",chartType:"LineChart",loader:o.a.createElement("div",null,"Loading Chart"),data:this.state.chartDtata,options:{title:"Loan Payoff Schedule",titleTextStyle:{color:"#fff",fontSize:20},chartArea:{width:"50%"},legendTextStyle:{color:"#fff"},textStyle:{color:"white",fontsize:40,bold:!0},lineWidth:2,hAxis:{title:"Months",minValue:0,textStyle:{color:"#FFFFFF",fontsize:20,bold:!0},titleTextStyle:{color:"#fff",fontSize:14}},vAxis:{title:"Balance",minValue:0,titleTextStyle:{color:"#fff",fontSize:14},textStyle:{color:"#FFFFFF",fontsize:18,bold:!0}},legend:"none",backgroundColor:"#181818"},rootProps:{"data-testid":"1"}}))}}]),t}(o.a.Component),L=(a(165),a(166),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={networth:"",totalIncome:"",totalExpences:"",studentLoan:""},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("update-KeyMetricsChart",(function(t){console.log("expenses changed! Update KeyMetricsChart",t),e.getNetWorth()})),this.getNetWorth()}},{key:"getNetWorth",value:function(){var e=this,t={};sessionStorage.getItem("user")&&(t=JSON.parse(sessionStorage.getItem("user"))),g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.get("/api/networth/"+t.id).then((function(t){e.setState({networth:t.data.networth,totalIncome:t.data.totalIncome,totalExpenses:t.data.totalExpenses,totalInterest:t.data.totalInterest})}))}},{key:"render",value:function(){return o.a.createElement("div",{className:"key-metrics"},o.a.createElement("h3",{className:"key-title"},"Networth: "),o.a.createElement("p",null,"$",this.state.networth),o.a.createElement("h3",{className:"key-title"},"Total income: "),o.a.createElement("p",null,"$",this.state.totalIncome),o.a.createElement("h3",{className:"key-title"},"Total Expenses: "),o.a.createElement("p",null,"$",this.state.totalExpenses),o.a.createElement("h3",{className:"key-title"},"Total Interest: "),o.a.createElement("p",null,"$",this.state.totalInterest))}}]),t}(o.a.Component)),z=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={chartData:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("expenses-changed",(function(t){console.log("expenses changed! Update ExpenseCategoryPie",t),e.getExpenseChart()})),this.getExpenseChart()}},{key:"getExpenseChart",value:function(){var e=this,t={};sessionStorage.getItem("user")&&(t=JSON.parse(sessionStorage.getItem("user"))),g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.get("/api/expensechart/"+t.id).then((function(t){if(t.data[1]){for(var a=[["Expense","%"]],n=0;n<t.data[1].length;n++){var o=[];o.push(t.data[1][n][0]),o.push(parseInt(t.data[1][n][1])),a.push(o)}e.setState({chartData:a})}else e.setState({chartData:[]})})).catch((function(e){401===e.response.status&&window.dispatchEvent(new CustomEvent("unauthorized"))}))}},{key:"render",value:function(){return o.a.createElement("div",null,this.state.chartData.length>0?o.a.createElement(M.a,{width:"600px",height:"300px",chartType:"PieChart",loader:o.a.createElement("div",null,"Loading Chart"),data:this.state.chartData?this.state.chartData:[],options:{title:"Expenses by Category",titleTextStyle:{color:"#fff",fontSize:20},backgroundColor:{fill:"transparent"},legend:{textStyle:{color:"white",fontSize:16}},slices:{0:{color:"#4D58FF"},1:{color:"#99A0FF"},2:{color:"#4D58FF"},3:{color:"#4D5080"},4:{color:"#3D47CC"},5:{color:"#3942BF"},6:{color:"#262C80"},7:{color:"#131640"},8:{color:"#131640"},9:{color:"#5D3AE8"}}},rootProps:{"data-testid":"1"}}):o.a.createElement("div",null))}}]),t}(o.a.Component),T=a(32),D=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={chartData:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("incomes-changed",(function(t){console.log("incomes changed! Update NetIncomeBarComponent",t),e.getCashFlow()})),this.getCashFlow()}},{key:"getCashFlow",value:function(){var e=this,t={};sessionStorage.getItem("user")&&(t=JSON.parse(sessionStorage.getItem("user"))),g.a.defaults.headers.common.Authorization=sessionStorage.getItem("jwtToken"),g.a.get("/api/cashflow/"+t.id).then((function(t){if(t.data||e.setState({chartData:[]}),t.data.length>0){for(var a=[["Month","Income","Expenses"]],n=0;n<t.data.length;n++)a.push(t.data[n]);console.log("cashflow",a),e.setState({chartData:a})}else e.setState({chartData:[]})}))}},{key:"render",value:function(){var e,t;return o.a.createElement("div",null,this.state.chartData.length>0?o.a.createElement(M.a,{width:"900px",height:"380px",chartType:"BarChart",loader:o.a.createElement("div",null,"Loading Chart"),data:this.state.chartData?this.state.chartData:[],options:{title:"Monthly Cash Flow",textStyle:{color:"#fff"},legendTextStyle:{color:"#fff"},chartArea:{width:"50%"},titleTextStyle:{color:"#fff",fontSize:20},backgroundColor:"#181818",bar:{groupWidth:"100%"},hAxis:(e={title:"Income",titleTextStyle:{color:"#fff"}},Object(T.a)(e,"titleTextStyle",{color:"#fff",fontSize:14}),Object(T.a)(e,"minValue",0),Object(T.a)(e,"textStyle",{color:"#fff"}),e),vAxis:(t={title:"Expenses",titleTextStyle:{color:"#fff"}},Object(T.a)(t,"titleTextStyle",{color:"#fff",fontSize:14}),Object(T.a)(t,"textStyle",{color:"#fff"}),t)},rootProps:{"data-testid":"1"}}):o.a.createElement("div",null))}}]),t}(o.a.Component),q=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={incomes:[],expenses:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"graphs-display mb-2"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-3 graph-components d-flex justify-content-center"},o.a.createElement(L,null)),o.a.createElement("div",{className:"col-lg-8 graph-components d-flex justify-content-center"},o.a.createElement(z,null))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-11 mt-4 mr-2 graph-components d-flex justify-content-center"},o.a.createElement(D,null))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-11 mt-4 mr-2 graph-components d-flex justify-content-center mb-4"},o.a.createElement(F,null)))))}}]),t}(o.a.Component);var _=function(e){return o.a.createElement("div",{className:"main-display"},o.a.createElement("div",{className:"container-fluid mt-4 ml-2"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-lg-4"},o.a.createElement(A,null)),o.a.createElement("div",{className:"col-lg-8"},o.a.createElement(q,null))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-6"}),o.a.createElement("div",{className:"col-md-6"}))))},J=(a(121),a(316)),P=(a(302),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={user:{}},a.logout=function(){sessionStorage.removeItem("jwtToken"),sessionStorage.removeItem("user"),window.location.assign("/login")},a.login=function(){sessionStorage.removeItem("jwtToken"),sessionStorage.removeItem("user"),window.location.assign("/login")},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e={};sessionStorage.getItem("user")&&(e=JSON.parse(sessionStorage.getItem("user"))),this.setState({user:e})}},{key:"render",value:function(){return o.a.createElement("div",{className:"top-nav"},sessionStorage.getItem("user")?o.a.createElement(J.a,{className:"myNav"},o.a.createElement(J.a.Brand,{href:"#home",className:"navBrand"},"allot"),o.a.createElement("span",{className:"mt-3 mr-2 debt-text"},"student debt planning"),o.a.createElement(J.a.Toggle,null),o.a.createElement(J.a.Collapse,{className:"justify-content-end"},o.a.createElement(J.a.Text,null,"Signed in as:"," ",o.a.createElement("span",{className:"mr-3 this-user-name"},this.state.user.name),o.a.createElement("span",null,o.a.createElement("button",{className:"btn btn-primary mr-2 navBtn",onClick:this.logout},"Logout"))))):o.a.createElement("div",null))}}]),t}(n.Component)),B=(a(309),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).onChange=function(e){var t=a.state;t[e.target.name]=e.target.value,a.setState(t)},a.onSubmit=function(e){e.preventDefault();var t=a.state,n=t.email,o=t.password;g.a.post("/api/login",{email:n,password:o}).then((function(e){console.log("result",e),sessionStorage.setItem("jwtToken",e.data.token),a.setState({message:""}),sessionStorage.setItem("user",JSON.stringify(e.data.user)),window.location.assign("/")})).catch((function(e){401===e.response.status&&a.setState({message:"Login failed. Email or password not match"})}))},a.state={name:"",email:"",password:"",message:""},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.password,n=e.message;return o.a.createElement("div",{className:"main-body-reg"},o.a.createElement("div",{className:"container"},o.a.createElement("div",null,o.a.createElement("h1",{className:"main-title"},"allot")),o.a.createElement("form",{className:"form-signin",onSubmit:this.onSubmit},""!==n&&o.a.createElement("div",{className:"alert alert-warning alert-dismissible",role:"alert"},n),o.a.createElement("h2",{className:"form-signin-heading form-thing"},"Please Sign In"),o.a.createElement("label",{htmlFor:"inputEmail"},"Email address"),o.a.createElement("input",{type:"email",className:"form-control form-thing1",placeholder:"Email address",name:"email",value:t,onChange:this.onChange,required:!0}),o.a.createElement("label",{htmlFor:"inputPassword"},"Password"),o.a.createElement("input",{type:"password",className:"form-control form-thing",placeholder:"Password",name:"password",value:a,onChange:this.onChange,required:!0}),o.a.createElement("button",{className:"btn btn-lg btn-primary btn-block form-thing1",type:"submit"},"Login"),o.a.createElement("p",{className:"form-thing1"},"Not a member?"," ",o.a.createElement(l.b,{to:"/register"},o.a.createElement("span",{className:"glyphicon glyphicon-plus-sign","aria-hidden":"true"})," ","Register here")))))}}]),t}(n.Component)),K=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={user:{}},a.logout=function(){sessionStorage.removeItem("jwtToken"),sessionStorage.removeItem("user"),window.location.reload()},a.login=function(){sessionStorage.removeItem("jwtToken"),sessionStorage.removeItem("user"),window.location.assign("/login")},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("unauthorized",(function(e){sessionStorage.removeItem("jwtToken"),sessionStorage.removeItem("user"),window.location.assign("/login")}));var e={};sessionStorage.getItem("user")&&(e=JSON.parse(sessionStorage.getItem("user"))),this.setState({user:e})}},{key:"render",value:function(){return o.a.createElement("div",{className:"main-body-app"},o.a.createElement(P,null),sessionStorage.getItem("user")?o.a.createElement(o.a.Fragment,null,o.a.createElement(_,null)):o.a.createElement(o.a.Fragment,null,o.a.createElement(B,null)))}}]),t}(n.Component),W=(a(312),function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(d.a)(t).call(this))).onChange=function(t){var a=e.state;a[t.target.name]=t.target.value,e.setState(a)},e.onSubmit=function(t){t.preventDefault();var a=e.state,n=a.name,o=a.email,s=a.password,r=a.college;g.a.post("/api/register",{name:n,email:o,password:s,college:r}).then((function(t){e.props.history.push("/login")})).catch((function(e){console.log(e)}))},e.state={name:"",email:"",password:"",college:""},e}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state,t=e.name,a=e.email,n=e.password,s=e.college;return o.a.createElement("div",{className:"main-body-reg"},o.a.createElement("div",{className:"container"},o.a.createElement("form",{className:"form-signin",onSubmit:this.onSubmit},o.a.createElement("h2",{className:"form-signin-heading form-thing"},"Register"),o.a.createElement("label",{htmlFor:"inputName",className:"form-thing1"},"Name"),o.a.createElement("input",{type:"text",className:"form-control form-thing1",placeholder:"Full Name",name:"name",value:t,onChange:this.onChange,required:!0}),o.a.createElement("label",{htmlFor:"inputEmail",className:"form-thing1"},"Email address"),o.a.createElement("input",{type:"email",className:"form-control form-thing1",placeholder:"Email address",name:"email",value:a,onChange:this.onChange,required:!0}),o.a.createElement("label",{htmlFor:"inputPassword",className:"form-thing1"},"Password"),o.a.createElement("input",{type:"password",className:"form-control form-thing1",placeholder:"Password",name:"password",value:n,onChange:this.onChange,required:!0}),o.a.createElement("label",{htmlFor:"inputCollege",className:"form-thing1"},"College"),o.a.createElement("input",{type:"text",className:"form-control form-thing",placeholder:"College",name:"college",value:s,onChange:this.onChange}),o.a.createElement("button",{className:"btn btn-lg btn-primary btn-block form-thing1",type:"submit"},"Register"))))}}]),t}(n.Component));r.a.render(o.a.createElement(l.a,null,o.a.createElement("div",null,o.a.createElement(i.a,{exact:!0,path:"/",component:K}),o.a.createElement(i.a,{path:"/login",component:B}),o.a.createElement(i.a,{path:"/register",component:W}))),document.getElementById("root"))},49:function(e,t,a){},50:function(e,t,a){}},[[131,1,2]]]);
//# sourceMappingURL=main.1dee4a69.chunk.js.map