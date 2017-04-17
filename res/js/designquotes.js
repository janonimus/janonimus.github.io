$('#getQuoteOnDesignV4').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data) {
      var post = data.shift(); // The data is an array of posts. Grab the first one.
      viewV4.displayQuote(post.content, post.title, post.link);
    },
    cache: false
  });
});

var viewV4 = {
  displayQuote: function displayQuote(quote, author, link) {
    var quoteText = document.querySelector('.qod-text');
    var quoteAuthor = document.querySelector('.qod-author');
    var quoteSrc = document.querySelector('.qod-src');
    var tweet = document.getElementById('tweet');

    quote = quote.replace(/<p>/gi, '');
    quote = quote.replace(/<\/p>/gi, '');
    quote = quote.trim();
    quoteText.innerHTML = '&quot;' + quote + '&quot;';

    quoteAuthor.innerHTML = '&mdash;' + author;

    quoteSrc.href = link;
    quoteSrc.innerHTML = '[source]';

    var TWEET_LENGTH = 140;
    var suffix = ' ';
    //var goTweet = "https://twitter.com/home?status=";
    var goTweet = "https://twitter.com/intent/tweet?text=";
    var tempLength = quote.length + suffix.length + link.length;

    if (tempLength > TWEET_LENGTH) {
      suffix = '... ';
      quote = quote.substr(0, TWEET_LENGTH - suffix.length - link.length);
    }

    quote += suffix;
    goTweet += escape(quote);
    goTweet += link;

    tweet.href = goTweet;
  }
};

$(document).ready(function() {
  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(post) {
    viewV4.displayQuote(post[0].content, post[0].title, post[0].link);
  });
});
