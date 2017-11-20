if (typeof ScoreName === "undefined") {
    const ScoreName = require("./src/ScoreNamesEnum");
}

if (typeof RegularScorePrinter === "undefined") {
    const RegularScorePrinter = require("./src/RegularScorePrinter");
}

if (typeof AdvantageScorePrinter === "undefined") {
    const AdvantageScorePrinter = require("./src/AdvantageScorePrinter");
}

const SCORE_SEPARATOR = "-";
let _playerOneName, _playerTwoName;

var TennisGame1 = function(playerOneName, playerTwoName) {
    this.scores = {};
    this.scores[playerOneName] = 0;
    this.scores[playerTwoName] = 0;
    _playerOneName = playerOneName;
    _playerTwoName = playerTwoName;
};

TennisGame1.prototype.playerOneScore = function() {
    return this.scores[_playerOneName];
};

TennisGame1.prototype.playerTwoScore = function() {
    return this.scores[_playerTwoName];
};

TennisGame1.prototype.wonPoint = function(playerName) {
    this.scores[playerName] += 1;
};

TennisGame1.prototype.scoreIsEqual = function() {
    return this.playerOneScore() === this.playerTwoScore();
}

TennisGame1.prototype.scoreIsAdvantage = function() {
    return this.playerOneScore() >= 4 || this.playerTwoScore() >= 4;
}

TennisGame1.prototype.highestScoringPlayer = function() {
    if (this.scoreIsEqual()) return null;
    return this.playerOneScore() > this.playerTwoScore() ? _playerOneName : _playerTwoName;
}

TennisGame1.prototype.isWon = function() {
    return this.differenceBetweenPlayerScores() >= 2 && this.scoreIsAdvantage();
}

TennisGame1.prototype.getScore = function() {
    if (this.isWon()) {
        const winnerScorePrinter = new WinnerScorePrinter({
            playerOneName: _playerOneName,
            playerTwoName: _playerTwoName,
            playerOneScore: this.playerOneScore(),
            playerTwoScore: this.playerTwoScore()
        });
        
        return winnerScorePrinter.print();
    }
    
    if (this.scoreIsEqual()) {
        const equalsScorePrinter = new EqualsScorePrinter({
            playerOneName: _playerOneName,
            playerTwoName: _playerTwoName,
            playerOneScore: this.playerOneScore(),
            playerTwoScore: this.playerTwoScore()
        });
        
        return equalsScorePrinter.print();
    } 

    if (this.scoreIsAdvantage()) {
        const advantageScorePrinter = new AdvantageScorePrinter({
            playerOneName: _playerOneName,
            playerTwoName: _playerTwoName,
            playerOneScore: this.playerOneScore(),
            playerTwoScore: this.playerTwoScore()
        });
        
        return advantageScorePrinter.print();
    }
    
    const regularScorePrinter = new RegularScorePrinter({
        playerOneName: _playerOneName,
        playerTwoName: _playerTwoName,
        playerOneScore: this.playerOneScore(),
        playerTwoScore: this.playerTwoScore()
    });

    return regularScorePrinter.print();
};

TennisGame1.prototype.differenceBetweenPlayerScores = function() {
    return Math.abs(this.scores[_playerOneName] - this.scores[_playerTwoName]);
}

if (typeof window === "undefined") {
    module.exports = TennisGame1;
}
