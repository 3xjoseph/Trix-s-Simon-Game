var buttonColors = [
    "red",
    "blue",
    "green",
    "yellow"
];
var gamePattern = [];
var userClickedPattern = [];
var delayInMilliseconds = 500;
var level = 0;
var isStarted = false;

$(document).on("keydown", function(event) {
    if (event.code === "Space" && !isStarted) {
        isStarted = true;
        $(".level-title").text("Level " + level);
        nextSequence();
    }
});

$(".button").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animationPress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);

        $(".level-title").text("Game Over, Press SPACE Key to Restart");
        startOver();
    }
} 


function nextSequence() {
    userClickedPattern = [];
    level++;
    $(".level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animationPress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, delayInMilliseconds);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    isStarted = false;
}