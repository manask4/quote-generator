(function() {
  getQuotes();
})();

function getGradient() {
  let colors = ['#ef5350', '#ec407a', '#ab47bc', '#7e57c2', '#004d7a', '#5c6bc0', '#42a5f5', '#008793', '#29b6f6', '#26c6da', '#00bf72', '#26a69a', '#66bb6a', '#9ccc65', '#a8eb12', '#d4e157', '#ffee58', '#ffca28', '#ffa726', '#ff7043'];
  let colorsLength = colors.length;

  let color1 = colors[Math.floor(Math.random() * colorsLength)];
  let color2 = colors[Math.floor(Math.random() * colorsLength)];
  let color3 = colors[Math.floor(Math.random() * colorsLength)];
  let color4 = colors[Math.floor(Math.random() * colorsLength)];

  let deg = Math.floor(Math.random() * 360) + 'deg';

  return `linear-gradient(${deg}, ${color1}, ${color2}, ${color3}, ${color4})`;
}

function changeBackground() {
  let cardElement = document.querySelector('#quote-box-body');
  cardElement.animate([
    { opacity: 0.3},
    { opacity: 1},
  ], {
    duration: 500,
    easing: 'linear'
  });
  document.body.style.backgroundImage = getGradient();
}

function getQuotes() {
  let currentTime = Date.now();
  let quotesData = localStorage.getItem('quotes');
  if (quotesData === null || currentTime - quotesData.fetchTime >= 12) {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      myJson.fetchTime = Date.now();
      localStorage.setItem('quotes', JSON.stringify(myJson));
    })
    .then(function() {
      changeQuote();
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  else {
    changeQuote();
  }
}

function updateTweetHref() {
  let tweetQuote = document.getElementById('tweet-quote');
  let currentQuote = document.getElementById('text').innerText;
  let currentAuthor = document.getElementById('author').innerText;
  tweetQuote.href = 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor);
}

function changeQuote() {
  changeBackground();
  quotesData = JSON.parse(localStorage.getItem('quotes'));
  let info = quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
  document.getElementById('text').innerHTML = info.quote;
  document.getElementById('author').innerHTML = '~ ' + info.author;
  updateTweetHref();
}

document.getElementById('new-quote').onclick = changeQuote;
document.getElementById('tweet-quote').onclick = updateTweetHref;