const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }

        else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", e => {
        updateFlag(e.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amtVal = amount.value;

    if (amtVal === '' || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    let fromCurrency = fromCurr.value.toLowerCase();
    let toCurrency = toCurr.value.toLowerCase();

    const URL = `${BASE_URL}/currencies/${fromCurrency}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurrency][toCurrency];
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
