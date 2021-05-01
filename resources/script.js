
// Store quote API URLs in constants

const tayQuoteUrl = 'https://api.taylor.rest/'
const yeQuoteUrl = 'https://api.kanye.rest/'

// Attach mp3 soundbites to constants

var kanyeYes = new Audio('media/kanyeYes.mp3');
var kanyeNo = new Audio('media/kanyeNo.mp3');
var taylorYes = new Audio('media/taylorYes.mp3');
var taylorNo = new Audio('media/taylorNo.mp3');



// Declare needed variables and set score to 0

let trueMeansTay
let score = 0

// Functions that request a quote from the Swift and West quote APIs
// and then change the displayed quote to the newly received quote

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
// and calls the corresponding quote request and display function

function tayOrYe() {
    trueMeansTay = Math.random() < 0.5
    if (trueMeansTay) {
        getTayQuote()
    } else {
        getYeQuote()
    }
}

// Functions for the Swift and West button/picture even listeners
// Steps the score, shows a correct/incorrect message, plays a corresponding soundbite
// Re-runs the main function to get a new quote and coninue the game

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

// If the Swift or West pictures are clicked, the correspoding funtion is called

kanyePic.addEventListener("click", onKanyeClick)
taylorPic.addEventListener("click", onTaylorClick)

// Calls the main function when the site loads, which displays the first quote

tayOrYe()


