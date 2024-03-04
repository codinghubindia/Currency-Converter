const api_key = "fca_live_ACF03qEAR6IqrlrOEaWGfgDJozsTVJQi9uwojkmg";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let amt = document.querySelector(".amount input");

for (let select of dropdowns){
    for (currCode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currCode;
        newoption.value = currCode;
        select.append(newoption);
        if(select.name === "from" && currCode === "USD"){
            newoption.selected = "selected";
        } 
        else if(select.name === "to" && currCode === "INR"){
            newoption.selected = "selected";
        } 
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
};

const updateFlag = (element) => {
    let currCode = element.value;
    let flagCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${flagCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",async (e) => {
    e.preventDefault();
    let amtVal = amt.value;
    if(amtVal < 1 || amtVal === ""){
        amt.value = 1;
        amtVal = 1;
    }
    // const URL = `${base_URL}&currencies=${toCurr.value}&base_currency=${fromCurr.value}.json`;
    const URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${api_key}&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;
    let response = await fetch(URL);
    let response_data = await response.json();
    let toCurrency = toCurr.value;
    let rate = response_data.data[toCurrency];
    let CurrCvsRate = parseFloat((amtVal * rate).toFixed(2));
    let change_msg = document.querySelector(".msg");
    change_msg.innerText = `${amtVal} ${fromCurr.value} = ${CurrCvsRate} ${toCurr.value}`;
    document.querySelector("#myform input").value = "";
});
