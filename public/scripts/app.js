$(document).ready(function() {

  const data = [
    {
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
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 14611159088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 14689819368
    }
  ];



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

renderTweets(data);

});