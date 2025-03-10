import { countryList } from "./currencyCountryCodes.js";


let baseURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let fromCurr=document.querySelector(".from select")
let toCurr=document.querySelector(".To select")
let msg=document.getElementById("msg")
//console.log("initial currency codes",fromCurr.value,toCurr.value)
fromCurr=fromCurr.value
toCurr=toCurr.value
//console.log("after transforming:",fromCurr,toCurr)


let btn=document.getElementById("btn")
//let btn=document.querySelector("form button")
let dropDowns=document.querySelectorAll(".dropdown select");

for(let select of  dropDowns){
   // console.log("in select drop",select.value);
for(let currencyCode in countryList){
    //console.log(code,":",countryList[code])
    let newOption=document.createElement("option")
    newOption.innerText=currencyCode;
    newOption.value=currencyCode;
    select.append(newOption)

    if(select.name==="from" && currencyCode==="USD"){
        select.slected="selected"
    }
    else if(select.name==="to" && currencyCode==="INR"){
        select.slected="selected"
    }
}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target,select)

})
}

const updateFlag=(element,select)=>{
   let currCode=element.value; //get currency code and then based on it get country code
   let countryCode=countryList[currCode];
   //console.log("in update flag",currCode,countryCode);
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img")
   img.src=newSrc;
   //console.log(select)
   if(select.name==="from"){
   fromCurr= currCode ;
   //console.log("inside update flag-fron currency:",fromCurr);
   }
   if(select.name==="to"){
   toCurr=  currCode;
   //console.log("inside update flag-to currency:",toCurr)
}


}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input")
   let amountVal=amount.value;
   
   if(amountVal==="" || amountVal<1){
    amountVal=1
    amount.value="1"
   }
   //console.log(amount.value)
   fromCurr=fromCurr.toLowerCase();
   toCurr=toCurr.toLowerCase();
   //console.log(`from:${fromCurr} exchange to:${toCurr}`);
let url=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr}.json`;

let response= await fetch(url);
let data=await response.json();
let exchangerate=data[fromCurr][toCurr];
let resultValue=amountVal*data[fromCurr][toCurr]

//console.log("exchange rete=",exchangerate,"result value=",resultValue);
//console.log(msg.innerText)
msg.innerText=`${amountVal} ${fromCurr.toUpperCase()} = ${resultValue} ${toCurr.toUpperCase()}`;
//console.log(msg.innerText);
})


