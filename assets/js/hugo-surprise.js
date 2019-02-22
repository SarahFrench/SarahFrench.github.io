function updateKeyPressHistory(key){
  keyPressHistory.push(key);
}

function refreshKeyPressHistory(refreshInProgress){
  if (!refreshInProgress){
    setTimeout(keyPressHistory=[], 2000)
    // setTimeout(refreshInProgress= false, 2000)
    refreshInProgress = true;
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
var konamiCode= [keycode.up,keycode.up,keycode.down, keycode.down, keycode.left, keycode.right,keycode.left, keycode.right,keycode.b, keycode.a];

$(document).ready(function () {

    $('body').on('keydown', function( e ) {
      var keyPressHistory =[];
      updateKeyPressHistory(e.which)
      // refreshKeyPressHistory(refreshInProgress)

    });

});
