const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

let quotesData;

function fetchQuote() {
  return $.ajax({
    type: "GET",
    url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",

    success: function (response) {
      const json = JSON.parse(response);
      quotesData = json.quotes;
    },
  });
}

function getRandomQuote() {
  const randomNum = Math.floor(Math.random() * quotesData.length);
  return quotesData[randomNum];
}

function getRandomColor() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}

function getQuote() {
  const randomQuote = getRandomQuote();

  const quote = randomQuote.quote;
  const author = randomQuote.author;

  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
      encodeURIComponent('"' + quote + '" ' + author)
  );

  $("#quote-box__text").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#text").text(quote);
    $("#author").text(author);
  });

  let color = colors[Math.floor(Math.random() * colors.length)];

  $(".quote-box-wrapper").animate(
    {
      backgroundColor: color,
      color: color,
    },
    1000
  );

  $("button").animate({
    backgroundColor: color,
  });
}

$(document).ready(() => {
  fetchQuote().then(() => {
    getQuote();
  });

  $("#new-quote").click(function () {
    getQuote();
  });
});
