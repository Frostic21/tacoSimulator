window.onload = function (){
    if(getCookie("score")){
        score = parseInt(getCookie("score"));
    }
    if (getCookie("autoUpdate2")) {
        autoUpdate2 = parseInt(getCookie("autoUpdate"));
    }
    if (getCookie("autobuythingy")) {
        autobuythingy = parseInt(getCookie("autobuythingy"));
    }
    if(getCookie("update")){
        update = parseInt(getCookie("update"));
    }
    if(getCookie("autoUpdate")){
        autoUpdate = parseInt(getCookie("autoUpdate"));
    }
    if(getCookie("bonus")){
        bonus = parseInt(getCookie("bonus"));
        bonusCounter = parseInt(getCookie("bonus"));
    }
    if(getCookie("shopRequirement")){
        shopRequirement = parseInt(getCookie("shopRequirement"));
    }
    if(getCookie("autoRequirement")){
        autoRequirement = parseInt(getCookie("autoRequirement"));
    }
    if(getCookie("toppingsRequirement")){
        toppingsRequirement = parseInt(getCookie("toppingsRequirement"));
    }
    if (bonusCounter >= 5) {
        pfpbuy.textContent = `Maxed Out`;
        randomButtonMashCounter = randomButtonMashCounter + 1;
    }
    totalTacos.textContent = `Total Tacos Sold per Click: ${update * bonus}`;
    scoreList.textContent = `Money: $${score}`;
    shop.textContent = `More Tacos: $${shopRequirement}`;
    mult.textContent = `Tacos Sold per Click: ${update}`;
    automatic.textContent = `Total Earnings per Second: 0`;
    pfpbuy.textContent = `Better Toppings: $${toppingsRequirement}`;
    buyAuto.textContent = `Hire Worker: $${autoRequirement}`;
    pfp.textContent = `Toppings Quality Multiplier: ${bonus}`
}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Function to set a cookie
function setCookie(name, value) {
    document.cookie = `${name}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

const debug = false;
if (debug) {
    let button = document.createElement('button');
    button.id = 'cheater'
    button.className = 'colorButton'
    button.textContent = 'Cheater';
    document.getElementById('debug').appendChild(button);
}
let score= 0;
let autoUpdate2 = 0;
let counter = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 60;
let taxMaxCounter= 60;
let autoUpdate = 0;
let autobuythingy=0;
let bonusCounter = 0;
let bonus=1;
let update = 1;
let autoRequirement= 5000;
let shopRequirement= 20;
let randomButtonMashCounter = 0;
let eventImmune;
let randomEvent;
let taxTimerConst;
let autoUpdateConst;
let button1;
let payTaxes;
let randomNumber = 0;
let toppingsRequirement = 2000;
let taxAmount = 0;
let fancy = 1;
let fancyRequirement = 50000
const taco = document.getElementById('taco');
const scoreList = document.getElementById('score');
const shop = document.getElementById('shop');
const mult = document.getElementById('mult');
const pfp = document.getElementById('pfp');
const pfpbuy = document.getElementById('pfpbuy');
const totalTacos = document.getElementById('total');
const cheater = document.getElementById('cheater');
const automatic= document.getElementById('auto');
const buyAuto = document.getElementById('buyAuto');
const event = document.getElementById('events');
const reset = document.getElementById('reset');
save.addEventListener('click', function () {
    funcAutoSave();
    alert('Game Saved!');
});
const resturant = document.getElementById('resturant');
const buyResturant = document.getElementById('buyResturant');

taco.addEventListener('click', function(){
    if (score < 2300000000000){
        score = score + (update * bonus);
        scoreList.textContent = `Money: $${score}`;
    } else{
        if (score >= 2300000000000){
            scoreList.textContent = 'Money: Max Amount';
        }
    }
});

buyAuto.addEventListener('click', automaticTacoMaker);

shop.addEventListener('click', buyShop);

pfpbuy.addEventListener('click', bonusUpdater);

reset.addEventListener('click', function(){
    counter = 0;
    counter2 = 0;
    counter3 = 0;
    score= 0;
    autoUpdate2 = 0;
    taxMaxCounter= 60;
    autoUpdate = 0;
    autobuythingy=0;
    bonusCounter = 0;
    bonus=1;
    update = 1;
    autoRequirement= 5000;
    shopRequirement= 20;
    update = 1;
    autoRequirement= 5000;
    shopRequirement= 20;
    toppingsRequirement = 2000;
    totalTacos.textContent = `Total Tacos Sold per Click: ${update * bonus}`;
    scoreList.textContent = `Money: $${score}`;
    shop.textContent = `More Tacos: $${shopRequirement}`;
    mult.textContent = `Tacos Sold per Click: ${update}`;
    automatic.textContent = `Total Earnings per Second: 0`;
    pfpbuy.textContent = `Better Toppings: $${toppingsRequirement}`;
    buyAuto.textContent = `Hire Worker: $${autoRequirement}`;
    pfp.textContent = `Toppings Quality Multiplier: ${bonus}`
    setCookie("autoUpdate", autoUpdate);
    setCookie("bonus", bonus);
    setCookie("update", update);
    setCookie("score", score);
    setCookie("shopRequirement", shopRequirement);
    setCookie("autoUpdate2", autoUpdate2);
    setCookie("autobuythingy", autobuythingy);
    setCookie("autoRequirement", autoRequirement);
    setCookie("toppingsRequirement", toppingsRequirement);

})

eventImmune = setInterval(eventImmunity, 1000);

function eventImmunity(){
    counter3++
    if(counter3 >= 60){
        randomEvent = setInterval(randomEvents, 10000);
        clearInterval(eventImmune);
    }
}

function workerBuy() {
    counter4--;
    if (score >= 2300000000000){
        scoreList.textContent = 'Money: Max Amount';
    }else{
        if (autobuythingy >= 1){
            autoUpdate = (update * bonus) * autoUpdate2;
            automatic.textContent = `Total Earnings per Second: ${autoUpdate}`;
        }
        score = score + autoUpdate;
        scoreList.textContent = `Money: $${score}`;
    }
}

function randomEvents() {
    randomNumber = Math.floor(Math.random() * 101);
    if (counter2 >= 1) {

    } else {
        if (randomNumber >= 1 && randomNumber <= 5){
            taxMaxCounter = 60;
            taxAmount = score * 2;
            event.textContent = `Your taxes are due in ${taxMaxCounter} seconds. (${taxAmount})`;
            taxTimerConst = setInterval(taxTimer, 1000);
            counter2 = 1;
        }
        if(randomNumber >=6 && randomNumber <= 10){
            score = score/2;
            scoreList.textContent = `Money: $${score}`;
            event.textContent = 'Oh No!!! A robber mugged you. :C'
        }
    }
}

function bonusUpdater() {
    if (bonusCounter >= 5) {
        pfpbuy.textContent = `Maxed Out`;
        randomButtonMashCounter = randomButtonMashCounter + 1;
    } else {
        if (score >= toppingsRequirement){
            score = score- toppingsRequirement;
            toppingsRequirement = toppingsRequirement * 2;
            bonusCounter = bonusCounter+1;
            bonus = bonus + 1;
            automatic.textContent = `Total Earnings per Second: ${autoUpdate}`;
            scoreList.textContent = `Money: $${score}`;
            pfp.textContent = `Toppings Multiplier: ${bonus}`
            pfpbuy.textContent = `Better Toppings: $${toppingsRequirement}`;
            totalTacos.textContent = `Total Tacos Sold per Click: ${update * bonus}`;
        }
    }
}

function taxTimer() {
    taxMaxCounter = taxMaxCounter - 1;
    event.textContent = `Your taxes are due in ${taxMaxCounter} seconds. (${taxAmount})`;
    if (taxMaxCounter <= 0) {
        if(taxAmount <= score){
            score = score - taxAmount;
            clearInterval(taxTimerConst);
            counter2 = 0;
            scoreList.textContent = `Money: $${score}`;
            event.textContent = `Hooray no more taxes!!!`;
        } else{
            counter2 = 0;
            clearInterval(autoUpdateConst);
            clearInterval(taxTimerConst);
            taxMaxCounter = 60;
            score = 0;
            totalTacos.textContent = `Total Tacos Sold per Click: ${update * bonus}`;
            scoreList.textContent = `Money: $${score}`;
            shop.textContent = `More Tacos: $${shopRequirement}`;
            mult.textContent = `Tacos Sold per Click: ${update}`;
            automatic.textContent = `Total Earnings per Second: ${autoUpdate}`;
            pfpbuy.textContent = `Better Toppings: $${toppingsRequirement}`;
            buyAuto.textContent = `Hire Worker: $${autoRequirement}`;
            pfp.textContent = `Toppings Quality Multiplier: ${bonus}`
            event.textContent = 'Uh Oh :('
        }
    }
}
function buyShop(){
    if (score>= shopRequirement){
        update= update + 1;
        score= score-shopRequirement;
        shopRequirement= shopRequirement * 2;
        automatic.textContent = `Total Earnings per Second: ${autoUpdate}`;
        scoreList.textContent = `Money: $${score}`;
        shop.textContent= `More Tacos: $${shopRequirement}`;
        mult.textContent= `Tacos Sold per Click: ${update}`;
        totalTacos.textContent= `Total Tacos Sold per Click: ${update * bonus}`;
    }
}

function automaticTacoMaker(){
    if(score >= autoRequirement){
        autoUpdate2++
        score = score-autoRequirement;
        autoRequirement = autoRequirement * 3;
        if (autobuythingy >= 1){
            autoUpdate = (update * bonus) * autoUpdate2;
        } else{
            autoUpdate = update * bonus;
        }
        autobuythingy = autobuythingy + 1 ;
        buyAuto.textContent = `Hire Worker: $${autoRequirement}`;
        scoreList.textContent = `Money: $${score}`;
        automatic.textContent = `Total Earnings per Second: ${autoUpdate}`;
    }
}

function funcAutoSave(){
    setCookie("autoUpdate", autoUpdate);
    setCookie("bonus", bonus);
    setCookie("update", update);
    setCookie("score", score);
    setCookie("shopRequirement", shopRequirement);
    setCookie("autoUpdate2", autoUpdate2);
    setCookie("autobuythingy", autobuythingy);
    setCookie("autoRequirement", autoRequirement);
    setCookie("toppingsRequirement", toppingsRequirement);
}

cheater.addEventListener('click', function(e){
    score+= 2299999999999;
    scoreList.textContent = `Money: $${score}`;
});