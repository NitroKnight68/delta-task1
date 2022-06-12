var prePattern = [];
var clickPattern = [];

var tileNames = [
  "tile1",
  "tile2",
  "tile3",
  "tile4",
  "tile5",
  "tile6",
  "tile7",
  "tile8",
  "tile9",
  "tile10",
  "tile11",
  "tile12",
  "tile13",
  "tile14",
  "tile15",
  "tile16",
];

var begun = false;
var level = 0;

$(".start-btn").click(function () {
  if (!begun) {
    $(".level-div").text("LEVEL " + level);
    nextTile();
    begun = true;
  }
});

$(".tile").click(function () {
  var chosenTile = $(this).attr("id");
  clickPattern.push(chosenTile);

  soundPiano(chosenTile);
  clickFlash(chosenTile);
  checkTile(clickPattern.length - 1);
});

function nextTile() {
  clickPattern = [];
  level++;
  $(".level-div").text("LEVEL " + level);

  var randomNumber = Math.floor(Math.random() * 16);
  var randomTile = tileNames[randomNumber];
  prePattern.push(randomTile);

  prePattern.forEach(function (tile, i) {
    setTimeout(function () {
      $("#" + tile).addClass("flashed");
      setTimeout(function () {
        $("#" + tile).removeClass("flashed");
      }, 150);
      soundPiano(tile);
    }, i * 150);
  });
}

function soundPiano(name) {
  var audio = new Audio("./../sounds/" + name + ".mp3");
  audio.play();
}

function clickFlash(currentTile) {
  $("#" + currentTile).addClass("pressed");
  setTimeout(function () {
    $("#" + currentTile).removeClass("pressed");
  }, 200);
}

function checkTile(currentLevel) {
  if (prePattern[currentLevel] === clickPattern[currentLevel]) {
    if (prePattern.length === clickPattern.length) {
      setTimeout(function () {
        nextTile();
      }, 1000);
    }
  } else {
    soundPiano("siuu");
    $(".tile").addClass("game-over");
    setTimeout(function () {
      $(".tile").removeClass("game-over");
    }, 500);
    if (level > 0) {
      $(".level-div").text("YOUR SCORE IS " + (level - 1));
      $(".level-div").append("<br><br> PRESS START TO PLAY AGAIN.");
    } else {
      $(".level-div").text("YOU DIDN'T EVEN START THE GAME LOL");
    }
    startOver();
  }
}

function startOver() {
  level = 0;
  begun = false;
  prePattern = [];
}
