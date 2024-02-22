$(document).ready(function () {
    
    var images = [];
    for (var i = 1; i <= 24; i++) {
        images.push("path/to/image" + i + ".jpg");
    }

    
    var cards = [];
    for (var i = 0; i < images.length; i++) {
        cards.push({ image: images[i], matched: false });
        cards.push({ image: images[i], matched: false });
    }

    
    var cardHtml = "";
    for (var i = 0; i < cards.length; i++) {
        cardHtml += '<a id="' + i + '" href="#" class="card"><img src="path/to/back_of_card.jpg" alt="" /></a>';
    }

   
    $("#cards").html(cardHtml);

    
    var flippedCards = [];
    $(".card").on("click", function () {
        var cardIndex = $(this).attr("id");

       
        if (!cards[cardIndex].matched && flippedCards.length < 2) {
            
            $(this).children("img").attr("src", cards[cardIndex].image);
            flippedCards.push({ index: cardIndex, image: cards[cardIndex].image });

            
            if (flippedCards.length === 2) {
                setTimeout(function () {
                    if (flippedCards[0].image === flippedCards[1].image) {
                        
                        cards[flippedCards[0].index].matched = true;
                        cards[flippedCards[1].index].matched = true;
                    } else {
                        
                        $(".card img").delay(500).fadeOut(500);
                    }
                    flippedCards = [];
                }, 1000);
            }
        }
    });

    
    $("#save_settings").on("click", function () {
        var playerName = $("#player_name").val();
        var numCards = $("#num_cards").val();

        
        sessionStorage.setItem("playerName", playerName);
        sessionStorage.setItem("numCards", numCards);

        
        location.reload();
    });

  
    var playerName = sessionStorage.getItem("playerName") || "Player";
    var highScore = localStorage.getItem("highScore") || 0;

    $("#player").text("Player: " + playerName);
    $("#high_score").text("High Score: " + highScore);

    
    function updateScore() {
        var correctSelections = cards.filter(card => card.matched).length;
        var percentage = (correctSelections / (cards.length / 2)) * 100;
        var highScore = localStorage.getItem("highScore") || 0;

        $("#correct").text("Percentage: " + percentage.toFixed(2) + "%");

        if (percentage > highScore) {
            localStorage.setItem("highScore", percentage);
            $("#high_score").text("High Score: " + percentage.toFixed(2) + "%");
        }
    }

   
    $("#new_game a").on("click", function (e) {
        e.preventDefault();
        location.reload();
    });
});
