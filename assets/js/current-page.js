$('document').ready(function(){
    let activeLinkText = $(".active").text()
    $(".active").html(`<i class=\"fas fa-caret-right\"></i> ${activeLinkText}`)
});
