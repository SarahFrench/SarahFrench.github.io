$("document").ready(function(){
  $.getJSON( "https://sarahfrench.github.io/assets/json/timeline.json", function( data ) {

    // Use info from the JSON file to make an array of html snippets, each a timeline entry
    let timelineItems = [];
    let leftPositionBoolean = true;
    $.each( data, function( key, val ) {
      //alternates left and right positioning
      if (leftPositionBoolean == true){
        positionClass = 'left';
        leftPositionBoolean = false;
      } else {
        positionClass = 'right';
        leftPositionBoolean = true;
      }

      let html =`<div class="timeline-container ${positionClass}">\n\t<div class="content">\n\t\t<h2>${val.date}</h2>\n\t\t<p>${val.text}</p>\n\t</div>\n</div>`
      timelineItems.push(html);
    });

    //Remove any 'default' timeline entries that are hard coded in the html file being edited
    $("div").remove(".timeline-container");

    //Append child elements inside .timeline container
    $.each(timelineItems, function (index, element) {
      $( ".timeline" ).append( element );
    })

  });
});
