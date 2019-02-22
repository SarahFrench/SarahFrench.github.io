var GIPHY_API_KEY ='lDP1N91b3crbFDWjwtQqOHmUCN30SAnq';

//javascript, jQuery
var xhr = $.get(`http://api.giphy.com/v1/gifs/search?q=french&api_key=${GIPHY_API_KEY}&limit=5`);
xhr.done(function(data){
  console.log("success got data");
  data.data.forEach( gif => {
    let imageURL = gif.images.fixed_height.url;
    jQuery(".giphy").append(`<div class="giphyGIF-container"><img src="${imageURL}" class="giphyGIF"></div>`)
  })
  // jQuery("giphy-container").append(<img src="">)
});
