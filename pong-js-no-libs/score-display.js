function ScoreDisplay() {
    var scoreDisplay = {
        htmlElement: null,
        score: 0,
        updateScore: function() {
            this.htmlElement.innerHTML = this.score;
        }
    }

    return scoreDisplay;
}