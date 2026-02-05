const CONFIG = {
    rows: 3,
    cols: 5,
    totalPieces: 15,
    snapDistance: 30,
    boardWidth: 1000,
    boardHeight: 600,
    musicUrl: "https://www.bensound.com/bensound-music/bensound-romantic.mp3",
};

const proposalMessages = [
    "Shivani Jain,\n\nEvery piece of my life makes more sense with you in it.\nWill you keep choosing me, today and always?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nYou are the calm in my chaos and the spark in my days.\nWill you be my forever Valentine?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nThis puzzle is tiny compared to how you complete me.\nWill you keep building this life with me?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nI found my favorite place in the world, right beside you.\nWill you be my always?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nYou are my missing piece, my safe place, my best decision.\nWill you keep being my forever?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nEvery day with you feels like a new chapter I never want to end.\nWill you keep writing it with me?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nIf love is a puzzle, you are the piece that makes it whole.\nWill you stay my forever Valentine?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nI promise to choose you in all the small moments and the big ones.\nWill you keep choosing me too?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nYou turn ordinary days into my favorite memories.\nWill you be my forever?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nWith you, I feel at home, no matter where we are.\nWill you be my always and forever?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nI want to keep building a life that makes us both proud.\nWill you do it with me?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nYour love is the best part of my story.\nWill you keep writing it with me?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nYou are my favorite person, my best friend, my everything.\nWill you be my forever Valentine?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nNo matter how life changes, I want my hand in yours.\nWill you be my always?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nEvery piece of us fits perfectly, even when we are different.\nWill you keep fitting your life with mine?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nYou make me believe in magic, in timing, and in us.\nWill you be my forever?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nI want to love you in ways that keep surprising you.\nWill you keep letting me?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nI do not have all the answers, but I know you are mine.\nWill you be my always and forever?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nI want to celebrate every win and hold you through every storm.\nWill you be my forever Valentine?\n\nWith all my love,\nIshaan",
    "Shivani Jain,\n\nI choose you in every version of my future.\nWill you choose me too?\n\nWith all my love,\nIshaan",
];

const puzzleImages = [
    "../Images/Propose Day/roka.png",
    "../Images/Propose Day/roka 2.png",
    "../Images/Propose Day/roka 3.png",
    "../Images/Propose Day/pre wed 4.JPG",
    "../Images/Propose Day/pre wed 5.JPG",
];

const state = {
    started: false,
    placedCount: 0,
    selectedMessage: null,
    pieces: [],
    dragging: null,
};

const dom = {
    landing: document.getElementById("landing"),
    startButton: document.getElementById("start-button"),
    game: document.getElementById("game"),
    board: document.getElementById("puzzle-board"),
    tray: document.getElementById("piece-tray"),
    gameArea: document.getElementById("game-area"),
    progressCount: document.getElementById("progress-count"),
    progressFill: document.getElementById("progress-fill"),
    completion: document.getElementById("completion-overlay"),
    proposalMessage: document.getElementById("proposal-message"),
    restartButton: document.getElementById("restart-button"),
    musicToggle: document.getElementById("music-toggle"),
    audio: document.getElementById("background-music"),
};

const baseImage = {
    dataUrl: "",
    width: CONFIG.boardWidth,
    height: CONFIG.boardHeight,
};

function init() {
    dom.startButton.addEventListener("click", startPuzzle);
    dom.restartButton.addEventListener("click", restartPuzzle);
    dom.musicToggle.addEventListener("click", toggleMusic);

    dom.audio.src = CONFIG.musicUrl;
    dom.audio.volume = 0.35;

    window.addEventListener("resize", () => {
        if (state.started) {
            layoutPieces();
        }
    });

    state.selectedMessage = proposalMessages[Math.floor(Math.random() * proposalMessages.length)];
    baseImage.dataUrl = encodeURI(puzzleImages[Math.floor(Math.random() * puzzleImages.length)]);
    dom.proposalMessage.textContent = state.selectedMessage;

}

function startPuzzle() {
    state.started = true;
    dom.landing.classList.add("hidden");
    dom.game.classList.remove("hidden");
    resetGame();
    tryAutoPlay();
}

function restartPuzzle() {
    dom.completion.classList.remove("active");
    resetGame();
}

function resetGame() {
    state.placedCount = 0;
    updateProgress();
    dom.board.innerHTML = "";
    clearPieces();
    createPieces();
    layoutPieces();
}

function clearPieces() {
    state.pieces.forEach((piece) => piece.el.remove());
    state.pieces = [];
}


function createPieces() {
    const pieceWidth = baseImage.width / CONFIG.cols;
    const pieceHeight = baseImage.height / CONFIG.rows;

    for (let row = 0; row < CONFIG.rows; row++) {
        for (let col = 0; col < CONFIG.cols; col++) {
            const piece = document.createElement("div");
            piece.className = "puzzle-piece";
            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;
            piece.style.backgroundImage = `url(${baseImage.dataUrl})`;
            piece.style.backgroundSize = `${baseImage.width}px ${baseImage.height}px`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;

            const id = `${row}-${col}`;
            piece.dataset.id = id;

            dom.gameArea.appendChild(piece);

            const data = {
                id,
                row,
                col,
                el: piece,
                correctX: 0,
                correctY: 0,
                placed: false,
            };

            attachDragHandlers(data);
            state.pieces.push(data);
        }
    }
}

function layoutPieces() {
    const boardRect = dom.board.getBoundingClientRect();
    const gameRect = dom.gameArea.getBoundingClientRect();
    const trayRect = dom.tray.getBoundingClientRect();

    const boardWidth = boardRect.width;
    const boardHeight = boardRect.height;
    const pieceWidth = boardWidth / CONFIG.cols;
    const pieceHeight = boardHeight / CONFIG.rows;
    const trayPadding = 20;

    const unplacedPieces = state.pieces.filter((piece) => !piece.placed);
    const shuffledPieces = shuffleArray([...unplacedPieces]);
    const trayCols = Math.max(1, Math.floor((trayRect.width - trayPadding * 2) / (pieceWidth + 10)));
    const trayRows = Math.max(1, Math.ceil(shuffledPieces.length / trayCols));
    const slotWidth = (trayRect.width - trayPadding * 2) / trayCols;
    const slotHeight = (trayRect.height - trayPadding * 2) / trayRows;

    state.pieces.forEach((piece) => {
        piece.el.style.width = `${pieceWidth}px`;
        piece.el.style.height = `${pieceHeight}px`;
        piece.el.style.backgroundSize = `${boardWidth}px ${boardHeight}px`;
        piece.el.style.backgroundPosition = `-${piece.col * pieceWidth}px -${piece.row * pieceHeight}px`;

        piece.correctX = boardRect.left - gameRect.left + piece.col * pieceWidth;
        piece.correctY = boardRect.top - gameRect.top + piece.row * pieceHeight;

        if (piece.placed) {
            piece.el.style.left = `${piece.correctX}px`;
            piece.el.style.top = `${piece.correctY}px`;
            return;
        }
    });

    shuffledPieces.forEach((piece, index) => {
        const row = Math.floor(index / trayCols);
        const col = index % trayCols;
        const baseX = trayRect.left - gameRect.left + trayPadding + col * slotWidth;
        const baseY = trayRect.top - gameRect.top + trayPadding + row * slotHeight;
        const jitterX = Math.max(0, slotWidth - pieceWidth) * 0.5;
        const jitterY = Math.max(0, slotHeight - pieceHeight) * 0.5;
        const randomX = baseX + (Math.random() * jitterX * 2 - jitterX);
        const randomY = baseY + (Math.random() * jitterY * 2 - jitterY);
        const minX = trayRect.left - gameRect.left + trayPadding;
        const minY = trayRect.top - gameRect.top + trayPadding;
        const maxX = trayRect.left - gameRect.left + trayRect.width - trayPadding - pieceWidth;
        const maxY = trayRect.top - gameRect.top + trayRect.height - trayPadding - pieceHeight;

        piece.el.style.left = `${clamp(randomX, minX, maxX)}px`;
        piece.el.style.top = `${clamp(randomY, minY, maxY)}px`;
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function attachDragHandlers(piece) {
    piece.el.addEventListener("pointerdown", (event) => {
        if (piece.placed) return;
        piece.el.setPointerCapture(event.pointerId);
        piece.el.classList.add("dragging");

        const rect = piece.el.getBoundingClientRect();
        const gameRect = dom.gameArea.getBoundingClientRect();
        state.dragging = {
            piece,
            offsetX: event.clientX - rect.left,
            offsetY: event.clientY - rect.top,
            gameLeft: gameRect.left,
            gameTop: gameRect.top,
            gameWidth: gameRect.width,
            gameHeight: gameRect.height,
        };
    });

    piece.el.addEventListener("pointermove", (event) => {
        if (!state.dragging || state.dragging.piece !== piece) return;
        const x = event.clientX - state.dragging.gameLeft - state.dragging.offsetX;
        const y = event.clientY - state.dragging.gameTop - state.dragging.offsetY;
        const maxX = state.dragging.gameWidth - piece.el.offsetWidth;
        const maxY = state.dragging.gameHeight - piece.el.offsetHeight;
        const clampedX = clamp(x, 0, maxX);
        const clampedY = clamp(y, 0, maxY);
        piece.el.style.left = `${clampedX}px`;
        piece.el.style.top = `${clampedY}px`;
        checkProximity(piece);
    });

    piece.el.addEventListener("pointerup", () => {
        if (!state.dragging || state.dragging.piece !== piece) return;
        finishDrag(piece);
    });

    piece.el.addEventListener("pointercancel", () => {
        if (!state.dragging || state.dragging.piece !== piece) return;
        finishDrag(piece);
    });
}

function checkProximity(piece) {
    const rect = piece.el.getBoundingClientRect();
    const gameRect = dom.gameArea.getBoundingClientRect();
    const currentX = rect.left - gameRect.left;
    const currentY = rect.top - gameRect.top;
    const distance = Math.hypot(piece.correctX - currentX, piece.correctY - currentY);
    const snapThreshold = window.innerWidth <= 768 ? CONFIG.snapDistance + 12 : CONFIG.snapDistance;

    if (distance <= snapThreshold) {
        piece.el.classList.add("near");
        return true;
    }

    piece.el.classList.remove("near");
    return false;
}

function finishDrag(piece) {
    piece.el.classList.remove("dragging");
    if (checkProximity(piece)) {
        snapPiece(piece);
    }
    state.dragging = null;
}

function snapPiece(piece) {
    piece.el.classList.remove("near");
    piece.el.classList.add("placed");
    piece.el.style.left = `${piece.correctX}px`;
    piece.el.style.top = `${piece.correctY}px`;
    piece.placed = true;
    state.placedCount += 1;
    updateProgress();

    if (state.placedCount === CONFIG.totalPieces) {
        showCompletion();
    }
}

function updateProgress() {
    dom.progressCount.textContent = String(state.placedCount);
    const percent = (state.placedCount / CONFIG.totalPieces) * 100;
    dom.progressFill.style.width = `${percent}%`;
}

function showCompletion() {
    dom.completion.classList.add("active");
}

function toggleMusic() {
    if (dom.audio.paused) {
        dom.audio.play().catch(() => { });
    } else {
        dom.audio.pause();
    }
}

function tryAutoPlay() {
    dom.audio.play().catch(() => { });
}

init();
