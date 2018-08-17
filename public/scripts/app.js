$(document).ready(function() {

// Hide error messages on load
  $( ".error" ).hide();

// GET request to load tweets
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: 'GET',
      success: function(result) {
        renderTweets(result);
      },
      error: function(err) {
        console.log("there was an error", err);
      }
    });
  }

  loadTweets();



// Show/hide Compose Tweet section using "Compose" button
  $( "#compose-button" ).click(function() {
    $( "section.new-tweet" ).slideToggle( "slow", function() {
    $("#tweet-text").focus();
    });
  });

//Compose new tweet input management
  $('form#newTweetForm').on( "submit", function(event) {
    event.preventDefault();
    let newTweet = $(this).serialize();
    var tweet = $('#tweet-text').val();
    if ( tweet.trim().length < 1 ) {
      $( ".empty-warning" ).show("slow");
      $("#tweet-text").click(function() {
        $( ".error" ).hide("slow");
      });
    } else if (tweet.length > 140) {
      $( ".exceed-error" ).show("slow");
      $("#tweet-text").click(function() {
        $( ".error" ).hide("slow");
      });
    } else {
      $.post('/tweets', newTweet).done(function() {
        loadTweets();
        $('form#newTweetForm textarea').val('');
      });
    }
  });

// Render new tweets by adding them to the main tweets-container
  function renderTweets(tweets) {
    for (var i =0; i < tweets.length; i++) {
      var newTweet = createTweetElement(tweets[i]);
      $('#tweets-container').prepend(newTweet);
    }
  }


  function convertToDays(milliseconds) {
    var msPassed = Date.now() - milliseconds;
    var days = (msPassed / (1000*60*60*24));
    return Math.floor(days);
  }

// Converting tweet object into organised formatted jQuery object
  function createTweetElement(tweetObject) {
    let $tweet = $('<article>').addClass('tweet showIndicators');

    let $header = $('<header>').append('<h2>' + tweetObject.user.name + '</h2>');
    let $main = $('<main>').text(tweetObject.content.text);
    let $footer = $('<footer>');
    let days = convertToDays(tweetObject.created_at);

    $header.append('<h4>' + tweetObject.user.handle + '</h4>');
    $header.append(`<img class="avatar" src="${tweetObject.user.avatars.small}">`);

    $footer.append("<p>" + days + " days ago<span class='indicators'>&#9873; &#8644; &hearts;</span></p>");

    $tweet.append($header);
    $tweet.append($main);
    $tweet.append($footer);

    return $tweet;
   }


});