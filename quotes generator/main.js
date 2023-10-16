let quotes = [];

async function onLoad() {
  showLoading();

  quotes = await loadQuotesFile();
  const quote = pickRandomQuote(quotes);
  displayQuote(quote);
  
  stopLoading();
};

// ** LOAD QUOTES DATA FROM API **
async function loadQuotesFile() {
  const api ="https://jacintodesign.github.io/quotes-api/data/quotes.json";
  let quotes = [];
  await axios.get(api)
    .then((response) => {
      quotes = response.data;
    })
    .catch((error) => {
      quotes = [{text: "none", author: "unknown"}];
    });
  return quotes;
}

// ** LOADING ANIMATION **
function showLoading() {
  $('#loader').attr('hidden', false);
  $('#quote-container').attr('hidden', true);
}
function stopLoading() {
  $('#loader').attr('hidden', true);
  $('#quote-container').attr('hidden', false);
}

// ** DISPLAY QUOTES **
function pickRandomQuote(quotes) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
function displayQuote(quote) {
  $('#quote-text').text(quote.text);
  $('#quote-author').text(quote.author);
}

// ** EVENTS **
function getAndDisplayNewQuote() {
  showLoading();
  const quote = pickRandomQuote(quotes);
  displayQuote(quote);
  stopLoading();
}
function intentToTwitter() {
  const text = $('#quote-text').text();
  const api = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(api, "_blank");
}

// ** ADD EVENT **
$('#new-quote-button').click(getAndDisplayNewQuote);
$('#facebook-button').click(intentToTwitter);

// ** EXECUTION **
onLoad();