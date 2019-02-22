function updateKeyPressHistory(key){
  keyPressHistory.push(key);
}

function checkForKonami(keyPressHistory){
  if (keyPressHistory.length >= 10){
    var lastTenKeystrokes = keyPressHistory.slice(keyPressHistory.length-10,keyPressHistory.length).toString()
    if (lastTenKeystrokes === konamiCode){
      console.log("Konami!")
      $("h1").html('<h1>KONAMI!</h1>')
      $(".surprise").append(`<img src="./assets/img/konami.jpg" class="surprise_img">`)
    }
  }
}

var refreshInProgress = false;
var keyPressHistory = [];
var keycode = {
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  b: 66,
  a: 65
};
var konamiCode = [keycode.up,keycode.up,keycode.down, keycode.down, keycode.left, keycode.right,keycode.left, keycode.right,keycode.b, keycode.a].toString();

$(document).ready(function () {

    $('body').on('keydown', function( e ) {
      // var keyPressHistory =[];
      updateKeyPressHistory(e.which)
      checkForKonami(keyPressHistory)
    });

});
