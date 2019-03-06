//adapted from https://javascript.info/js-animation

$("#facebook").mouseover( function() {
  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    let opacity = 1 - (timePassed/1000);
    $("#facebook").css( "opacity", opacity )

    if (timePassed > 1000) clearInterval(timer);
  }, 20);
})

$("#instagram").mouseover( function() {
  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    let opacity = 1 - (timePassed/1000);
    $("#instagram").css( "opacity", opacity )

    if (timePassed > 1000) clearInterval(timer);
  }, 20);
})

$("#linkedin").mouseover( function() {
  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    let opacity = 1 - (timePassed/1000);
    $("#linkedin").css( "opacity", opacity )

    if (timePassed > 1000) clearInterval(timer);
  }, 20);
})

$("#email").mouseover( function() {
  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    let opacity = 1 - (timePassed/1000);
    $("#email").css( "opacity", opacity )

    if (timePassed > 1000) clearInterval(timer);
  }, 20);
})

$("#github").mouseover( function() {
    $("#github").css( "color", '#1E90FF' )
})
