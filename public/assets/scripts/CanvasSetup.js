    function setupCanvas() {
        var canvas = document.getElementById("game");
        canvas.width = 800;
        canvas.height = 600;
        stage = new createjs.Stage(canvas); 

        stage.on("stagemousemove", function (evt) {
            mousetext.text = "X: " + roundToTenth(evt.stageX) + " Y: " + roundToTenth(evt.stageY);
        });
    }