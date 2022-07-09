
// Game Section
const gameBoard = document.querySelector('.game-field');
const resultLabel = document.querySelector('.game-field__result-label');
const resetBtn = document.querySelector('.game-section__restart-btn');
const gameBoardList = [];
const gameSquares = 9;
let gameTurns = 0;
let currentFigure = document.querySelector('.game-section__current-figure'); //img

// Skins
const skinsSectionAreaes = document.querySelectorAll('.game-section__skins');
let activeCross = document.querySelector('#cross');
let activeCircle = document.querySelector('#circle');

skinsSectionAreaes[0].addEventListener('click', (evt) => {
    let chosenSkin = evt.target;
    if (chosenSkin.tagName == 'IMG') {
        activeCross.classList.toggle('game-section__skin_active');
        chosenSkin.classList.toggle('game-section__skin_active');
        activeCross = chosenSkin;
        console.log(activeCross)
    }
});
skinsSectionAreaes[1].addEventListener('click', (evt) => {
    let chosenSkin = evt.target;
    if (chosenSkin.tagName == 'IMG') {
        activeCircle.classList.toggle('game-section__skin_active');
        chosenSkin.classList.toggle('game-section__skin_active');
        activeCircle = chosenSkin;
    };
});

// Game scripts
for (let i = 1; i <= gameSquares; i++) {
    let gameSquare = document.createElement('div');
    gameSquare.classList.add('game-field__game-square');
    gameBoardList.push(gameSquare);
    gameBoard.append(gameSquare);
};

const checkTarget = (evt) => {
    let targetSquare = evt.target;
    if (!targetSquare.classList.contains('cross') && (!targetSquare.classList.contains('circle')) && (targetSquare.classList.contains('game-field__game-square') && (!resultLabel.classList.contains('active')))) {
        gameTurns++;

        if ((gameTurns % 2) == 0) {
            targetSquare.classList.toggle('circle');
            targetSquare.innerHTML = `${activeCircle.outerHTML}`;
            currentFigure.innerHTML = `<h2>Current figure:</h2> ${activeCross.outerHTML} `;
            return 'circle';
        } else {
            targetSquare.classList.toggle('cross');
            targetSquare.innerHTML = `${activeCross.outerHTML}`;
            currentFigure.innerHTML = `<h2>Current figure:</h2> ${activeCircle.outerHTML} `;
            return 'cross';
        };
    };
};

const checkWin = (figure) => {
    let figuresOnBoardList = [];
    gameBoardList.forEach((item) => {
        figuresOnBoardList.push(item.classList.contains(`${figure}`));
    });
    if ((figuresOnBoardList[0] && figuresOnBoardList[1] && figuresOnBoardList[2]) |
        (figuresOnBoardList[3] && figuresOnBoardList[4] && figuresOnBoardList[5]) |
        (figuresOnBoardList[6] && figuresOnBoardList[7] && figuresOnBoardList[8]) |
        (figuresOnBoardList[0] && figuresOnBoardList[3] && figuresOnBoardList[6]) |
        (figuresOnBoardList[1] && figuresOnBoardList[4] && figuresOnBoardList[7]) |
        (figuresOnBoardList[2] && figuresOnBoardList[5] && figuresOnBoardList[8]) |
        (figuresOnBoardList[0] && figuresOnBoardList[4] && figuresOnBoardList[8]) |
        (figuresOnBoardList[2] && figuresOnBoardList[4] && figuresOnBoardList[6])) {
        if (figure == 'circle') {
            resultLabel.innerHTML = `${activeCircle.outerHTML} <h2>Won!</h2>`;
            resultLabel.classList.toggle('active');
            resultLabel.style.display = 'flex';
        } else if (figure == 'cross') {
            resultLabel.innerHTML = `${activeCross.outerHTML} <h2>Won!</h2>`;
            resultLabel.classList.toggle('active');
            resultLabel.style.display = 'flex';
        };
        return true;
    }
};

gameBoard.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('game-field__result-label')) {
        gameTurns = 0;
        gameBoardList.forEach((item) => {
            item.classList.remove('cross');
            item.classList.remove('circle');
            item.innerHTML = '';
        });
    } else {
        let currentFigure = checkTarget(evt);
        if (!checkWin(currentFigure)) {
            if (gameTurns == 9) {
                resultLabel.innerHTML = '<h2>TIE</h2>';
                resultLabel.classList.toggle('active');
                resultLabel.style.display = 'flex';
            };
        };
    };
});

resetBtn.addEventListener('click', () => {
    gameTurns = 0;
    resultLabel.classList.remove('active');
    resultLabel.style.display = 'none';
    gameBoardList.forEach((item) => {
        item.classList.remove('cross');
        item.classList.remove('circle');
        item.innerHTML = '';
    });
});