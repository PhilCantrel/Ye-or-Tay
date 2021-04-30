
// Store quote API URLs in constants

const tayQuoteUrl = 'https://api.taylor.rest/'
const yeQuoteUrl = 'https://api.kanye.rest/'

// Attach mp3 soundbites to constants

var kanyeYes = new Audio('kanyeYes.mp3');
var kanyeNo = new Audio('kanyeNo.mp3');
var taylorYes = new Audio('taylorYes.mp3');
var taylorNo = new Audio('taylorNo.mp3');



// Declare quote variables

let trueMeansTay, tayOrYeQuote
let score = 0

// Functions that request a quote from the Swift & West quote APIs

function getTayQuote() {
    fetch(tayQuoteUrl)
        .then(response => response.json())
        .then(quote => changeInnerText(quote.quote))
}

function getYeQuote() {
    fetch(yeQuoteUrl)
        .then(response => response.json())
        .then(quote => changeInnerText(quote.quote))
}

function changeInnerText(quote) {
    quoteP.innerText = quote
}

// Set up all needed constants to point to their relevant page elements

const quoteP = document.querySelector("p.quote")
const kanyePic = document.querySelector("img.kanye")
const taylorPic = document.querySelector("img.taylor")
const scoreP = document.querySelector("p.score")
const resultP = document.querySelector("p.result")

// Function that randomly generates a boolean (true means tay, false for ye)
// and calls the corresponding quote generation function, then displays the quote

function tayOrYe() {
    trueMeansTay = Math.random() < 0.5
    if (trueMeansTay) {
        getTayQuote()
        console.log(trueMeansTay)
    } else {
        getYeQuote()
        console.log(trueMeansTay)
    }
}

function onKanyeClick() {
    if (trueMeansTay) {
        score--
        scoreP.innerText = `Score: ${score}`
        resultP.innerText = "Bad Luck, Taylor Said that"
        kanyeNo.play()
        tayOrYe()
    } else {
        score++
        scoreP.innerText = `Score: ${score}`
        resultP.innerText = "Good Work! That was Kanye!"
        kanyeYes.play()
        tayOrYe()
    }
}

function onTaylorClick() {
    if (trueMeansTay) {
        score++
        scoreP.innerText = `Score: ${score}`
        resultP.innerText = "Yep! Taylor sure did say that"
        taylorYes.play()
        tayOrYe()
    } else {
        score--
        scoreP.innerText = `Score: ${score}`
        resultP.innerText = "Taylor would never say that..."
        taylorNo.play()
        tayOrYe()
    }
}



kanyePic.addEventListener("click", onKanyeClick)
taylorPic.addEventListener("click", onTaylorClick)

tayOrYe()


