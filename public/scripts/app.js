/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweetObject) {
  let $tweet = $('<article>').addClass('tweet showIndicators');

  let $header = $('<header>').append('<h2>' + tweetObject.user.name + '</h2>');
  let $main = $('<main>').text(tweetObject.content.text);
  let $footer = $('<footer>');
  let $avatar = $("<img class='avatar' src='" + tweetObject.user.avatars.small + ">");

  $header.append('<h4>' + tweetObject.user.handle + '</h4>');
  $header.append($avatar);

  $footer.append("<p>" + "days ago<span class='indicators'>&#9873; &#8644; &hearts;</span></p>");

  $tweet.append($header);
  $tweet.append($main);
  $tweet.append($footer);

  return $tweet;
 }



// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.