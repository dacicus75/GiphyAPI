$( document ).ready(function() {
  var giphy = ["Stargate-SG1", "Stargate-Atlantis", "Stargate-Universe", "Stargate", "Babylon-5"];
console.log(giphy);

  function displayGiphyButton() {
    $("#giphyButtons").empty();
    for (var i = 0; i < giphy.length; i++){
      var giphyButton = $('<button>');
      giphyButton.addClass("giph");
      giphyButton.addClass("btn btn-primary")
      giphyButton.attr("data-name", giphy[i]);
      giphyButton.text(giphy[i]);
      $("#giphyButtons").append(giphyButton);
    }
  }
  function addNewButton(){
    $("#addGiphy").on("click", function(){
    var giph = $("#shows-input").val().trim();
    if (giph == ""){
      return false; // added so user cannot add a blank button
    }
    giphy.push(giph);

    displayGiphyButton();
    return false;
    });
}

 function displayGiphy() {
    var giph = $(this).attr("data-name");
 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giph + "&api_key=gwxPwqcQGPdSgU9zR0G40rLh0VR5C1NK&limit=10";
      console.log(queryURL);
        // ajax request call
        $.ajax({
          url: queryURL,
          method: "GET"
        })

        .then(function(response) {
          console.log(response);
          $("#giphyButtons").empty();
        	var results = response.data;
          console.log(results);
          if (results == ""){
            alert("There aren't any giphs for this button");
          }
        	for (var i = 0; i < results.length; i++) {
        	
          var showsDiv = $("<div>");
          showsDiv.addClass("showsDiv");
          var giphRating = $("<p>").text("Rating: " + results[i].rating);
            showsDiv.append(giphRating);

        	
        	var giphImage = $("<img>");
        	

        	giphImage.attr("src", results[i].images.fixed_height_small_still.url); 
          giphImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
          giphImage.attr("data-animate",results[i].images.fixed_height_small.url); 
          giphImage.attr("data-state", "still"); 
          giphImage.addClass("image");
        	showsDiv.append(giphImage);
        	$("#giphyView").prepend(showsDiv);

        }
  });
}
displayGiphyButton();
addNewButton();

        $(document).on("click", ".giph", displayGiphyButton);
        $(document).on("click", ".image", function() {
      
            
            var state = $(this).attr("data-state");
           
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        });
    
    
          
