    function startScore() {
        score = 0;
        scoretext.visible = true;
    }

    function updateScore() {
        score += 1;
        scoretext.text = "Score: " + score;
    }