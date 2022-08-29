var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


$(document).keypress(function () {
  if (gameStarted === false) {
    nextSequence();
  }
  gameStarted = true;
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  $("h4").hide();
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(gamePattern);
  console.log(userClickedPattern);
});

function nextSequence() {
  $("h4").hide();
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColor[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(1000)
    .fadeOut(300)
    .fadeIn(300);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("." + color).addClass("pressed");
  setTimeout(function () {
    $("." + color).removeClass("pressed");
  }),
    1000;
}

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("passed");
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gamePattern = [];
    level = 0;
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    gameStarted = false;
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 400);
  }
}

function onHintPress() {
  if (gameStarted == true) {
    $("h4").show();
    $("h4").text(
      "Yo have pressed  " +
        userClickedPattern.length +
        "  You have to press  " +
        (gamePattern.length - userClickedPattern.length) +
        "  more to complete these round"
    );
  }
}

