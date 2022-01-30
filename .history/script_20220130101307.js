const btnPlay = document.querySelector('.btn-play');
const screens = document.querySelectorAll('.screen');
const trashesEl = document.querySelector('.trashes');
const gameScreen = document.querySelector('.game-screen');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const scroreEl = document.querySelector('.score');
const timeEl = document.querySelector('.time');

let minute = 0,
    second = 0,
    score = 0;

btnPlay.addEventListener('click', function () {
    screens[0].style.marginTop = '-100vh';
});

trashesEl.addEventListener('click', function (e) {
    const selectedTrashs = e.target.closest('.trash--selection');
    if (!selectedTrashs) return;
    const img = selectedTrashs.querySelector('img');
    const imgSrc = img.src;
    console.log('🚀 -> imgSrc', imgSrc);
    showGameScreen(imgSrc);
});

const getRandomPosition = function () {
    return Math.round(Math.random() * 100);
};

const getRandomRotate = function () {
    return Math.round(Math.random() * 360);
};

const loadTrash = function (imgSrc) {
    const trash = document.createElement('img');
    trash.classList.add('trash');
    trash.src = imgSrc;
    trash.style.left = `${getRandomPosition()}%`;
    trash.style.top = `${getRandomPosition()}%`;
    trash.style.transform = `translate(-50%, -50%) scale(1) rotate(${getRandomRotate()}deg)`;
    trash.addEventListener('click', function () {
        trash.style.transform = `translate(-50%, -50%) scale(0) rotate(${getRandomRotate()}deg)`;
        updateScore();
    });
    gameScreen.appendChild(trash);
    setTimeout(
        () => {
            loadTrash(imgSrc);
        },
        1000 - score * 50 > 0 ? 1000 - score * 50 : 200,
    );
};

const showMessage = function () {
    const message = document.createElement('div');
    message.classList.add('message');
    message.innerHTML = `
            <p>Mày thấy mày gà vãi loz ko 🤔</p>
    `;
    gameScreen.appendChild(message);
    console.log('append message');
};

const updateScore = function () {
    score++;
    scroreEl.innerText = `Score: ${score}`;
    if (score === 20) {
        showMessage();
    }
};

const startClock = function () {
    setInterval(() => {
        second++;
        if (second === 60) {
            minute++;
            second = 0;
        }
        timeEl.innerText = `${minute.toString().padStart(2, '0')}:${second
            .toString()
            .padStart(2, '0')}`;
    }, 1000);
};

const showGameScreen = function (imgSrc) {
    screens[1].style.marginTop = '-100vh';
    startClock();
    loadTrash(imgSrc);
};

window.addEventListener('load', function () {
    screen[0].style.marginTop = '1px';
    screen[1].style.marginTop = '0vh';
});
