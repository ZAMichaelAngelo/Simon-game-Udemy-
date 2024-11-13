let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let highScore = 0;
let started = false;

// Detect any key press to start the game
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        $("#high-score").text("High Score: " + highScore);
        nextSequence();
        started = true;
    }
});

// Detect button clicks
$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

// Check user's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Generate the next color in the sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // Highlight level-up effect
    $("body").addClass("level-up");
    setTimeout(() => $("body").removeClass("level-up"), 300);

    if (level > highScore) {
        highScore = level;
        playSound("level-up");
        $("#high-score").text("High Score: " + highScore);
    }

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Play sound based on color or effect
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animate button press with pulse effect
function animatePress(color) {
    $("#" + color).addClass("pressed pulse");
    setTimeout(function() {
        $("#" + color).removeClass("pressed pulse");
    }, 100);
}

// Reset the game on failure
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
