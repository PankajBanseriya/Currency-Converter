const countryList = {
    AED: "AE",
    AUD: "AU",
    CAD: "CA",
    EGP: "EG",
    EUR: "FR",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    KRW: "KR",
    LKR: "LK",
    NPR: "NP",
    NZD: "NZ",
    PKR: "PK",
    USD: "US",
    ZAR: "ZA",
    ZWD: "ZW",
};

const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const message = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangeRate();
})

for (const select of dropdown) {
    for (const currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        changeFlag(evt.target)
    });
}

const changeFlag = (element) => {
    let currCode = element.value;
    let conCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${conCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}



btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    if (amtVal === "" || amtVal < 0) {
        amtVal = 1;
        amount.value = "1"
    }
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()]
    let getcurr = tocurr.value.toLowerCase();
    for (const key in rate) {
        if (key === getcurr) {
            let finalAmt = amtVal * rate[key];
            message.innerHTML = `${amtVal} ${fromcurr.value} = ${finalAmt} ${tocurr.value}`;
        }

    }

}