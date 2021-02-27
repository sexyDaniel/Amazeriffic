var main = function () {
    var messages = ["первое сообщение", "второе сообщение", "третье","четвертое"];
    var displayMessage = function (messageIndex) {
        var $message = $("<p>").text(messages[messageIndex]).hide();
        $(".message").empty();
        $(".message ").append($message);
        $message.fadeIn();
        setTimeout(function () {
            messageIndex = messageIndex + 1;
            displayMessage(messageIndex);
        }, 3000);
    };
    displayMessage(0);
}
$(document).ready(()=>{
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=car&format=json&jsoncallback=?", function(data) {
        console.log(data)
    });
    main()
});