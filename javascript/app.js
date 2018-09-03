$(document).ready(function(){

    var cartoons = ["spongebob", "kermit", "simpsons", "looney toons", "rugrats", "hey arnold", "bobs burgers", "muppets", "minions", "power puff girls", "family guy" ]


    function createButtons() {
        $(".search-buttons").empty();
        for(var i = 0; i<cartoons.length; i++ ) {
            var searchBtn = $("<button>").text(cartoons[i]).addClass("s-buttons").addClass("btn btn-danger");
            searchBtn.attr("data-name", cartoons[i]);
            $(".search-buttons").append(searchBtn);
        };
    }
    
    createButtons();
    $("#add-cartoon").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var newCartoon = $("#cartoon-input").val().trim();

        // The movie from the textbox is then added to our array
        if (cartoons.indexOf(newCartoon)=== -1){
          cartoons.push(newCartoon);
        }
        
        $("#cartoon-input").val("");
        // Calling renderButtons which handles the processing of our movie array
        createButtons();
      });
    $(document).on("click", ".s-buttons", showGifs);

    function showGifs(){
        
      var character = $(this).attr("data-name");

        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?api_key=47QTRPGf9rZmL39o486xyWDtv5W6eHpy&q=" + character + "&limit=10",
            method: "GET"
            }).then(function(response){
            console.log(response);
            
            for(var i=0; i<response.data.length; i++){
                var div = $("<div class = 'gif-div'>");
                var rating = $("<h6>").text("Rating: " + response.data[i].rating);
                var gif = $("<img class = 'gif-image'>").attr("src", response.data[i].images.fixed_width_still.url);
                var favorites = $("<button>").addClass("btn btn-sm btn-outline-danger favorite").attr("data-gif", response.data[i].images.fixed_width.url).html("<i class='far fa-heart'></i>");
                gif.attr("data-animate", response.data[i].images.fixed_width.url);
                gif.attr("data-still", response.data[i].images.fixed_width_still.url);
                gif.attr("data-state", "still");
                rating.append(favorites);
                div.append(rating, gif);
                $(".gifs").prepend(div);
            }    
        
            })       

    }
    
    $(document).on("mouseover", ".gif-image", function(){
        
        var state = $(this).attr("data-state")
        console.log(state);
        

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

    $(document).on("click", ".favorite", function(){
        var faveImg = $("<img class = fave-img>").attr("src", $(this).attr("data-gif"))
        $("#favorites").append(faveImg);

    })
  
    $(".clear").on("click", function(){
        $("#favorites").empty();
    })
})


