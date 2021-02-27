var main = function (images) {
    var displayImages = function (imgIndex) {
    var $img = $("<img>").attr('src', images[imgIndex]).hide();
     $(".message").empty();
    $(".message ").append($img);
    $img.fadeIn();
    setTimeout(function () {
         imgIndex = imgIndex + 1;
        displayImages(imgIndex);
        }, 3000);
    }
    displayImages(0)
}
$(document).ready(()=>{
    $(".tagSearch").on("click",()=>{
        let tag = $(".tagInput").val()
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags="+tag+"&format=json&jsoncallback=?", function(data) {
            var images = data.items.map(item=>{
                return item.media.m
            })
            main(images)
        });
    })
});