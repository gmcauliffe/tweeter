$(document).ready(function() {
  var composeTweet = $('textarea[name=text]');
  composeTweet.on("input", function() {
//    event.preventDefault();
    var currentLength = $(this).val().length;
    var charRemaining = 140 - currentLength;
    $(this).siblings(".counter").text(charRemaining).toggleClass("exceedLimit", charRemaining < 0);
  });

});
