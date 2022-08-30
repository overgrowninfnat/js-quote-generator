const quoteContainer = document.getElementById('quote-container');
const authorText = document.getElementById('quote-author');
const quoteText = document.getElementById('quote-text');
const tweetBtn = document.getElementById('tweet-btn');
const newQuoteBtn = document.getElementById('new-quote-btn');
const loader = document.getElementById('loader');

let quotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Complete Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
    loading();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // Check if author field is blank and replace it with unknown
    authorText.textContent = !randomQuote.author ? 'Unknown' : randomQuote.author;
    // Check quote lenght to determine the styling
    if(randomQuote.text.length > 120 ) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set the quote and hide the loader
    quoteText.textContent = randomQuote.text;
    complete();
}

// Get Quotes From https://type.fit/api/quotes
async function getQuotes() {
    loading();
    const API_URL = "https://type.fit/api/quotes";
    try {
      const response = await fetch(API_URL);
      quotes = await response.json();
      newQuote();
    } catch (error) {
        alert(error);
    }
}

// Tweet Quote
function tweetQuote() {
    const TWITTER_URL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(TWITTER_URL, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
tweetBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();