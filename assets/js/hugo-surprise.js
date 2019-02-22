function updateKeyPressHistory(key){
  keyPressHistory.push(key);
}

function checkForHugo(keyPressHistory){
  if (keyPressHistory.length >= 4){
    var lastFourKeystrokes = keyPressHistory.slice(keyPressHistory.length-4,keyPressHistory.length).toString()
    if (lastFourKeystrokes === "72,85,71,79"){
      console.log("Hi Hugo!")
      $("h1").html('<h1>Hi Hugo!</h1>')
      $(".surprise").append(`<img src="./assets/img/hugo.gif">`)
    }
  }
}

var keyPressHistory = [];

$(document).ready(function () {

    $('body').on('keydown', function( e ) {
      updateKeyPressHistory(e.which)
      checkForHugo(keyPressHistory)
    });

});
