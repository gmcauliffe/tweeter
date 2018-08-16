$(document).ready(function() {



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

  $( "#compose-button" ).click(function() {
    $( "section.new-tweet" ).slideToggle( "slow", function() {
    // Animation complete.
  });


  });

  $('form#newTweetForm').on( "submit", function(event) {
    event.preventDefault();
    let newTweet = $(this).serialize();
    var tweet = $('#tweettext').val();
    if (tweet.trim().length < 1) {
      alert("What would you like to tweet?");
    } else if (tweet.length > 140) {
      alert("Your tweet should be less than 140 characters.\nPlease try again.");
    } else {
      $.post('/tweets', newTweet).done(function() {
        loadTweets();
        $('form#newTweetForm textarea').val('');
      });
    }
  });


  function renderTweets(tweets) {
    for (var i =0; i < tweets.length; i++) {
      console.log(tweets[i]);
      var newTweet = createTweetElement(tweets[i]);
      $('#tweets-container').append(newTweet);
    }
  }


  function convertToDays(milliseconds) {
    var days = (milliseconds / (1000*60*60*24));
    return Math.floor(days);
  }


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