const CONFIG = {
    rows: 4,
    cols: 5,
    totalPieces: 20,
    snapDistance: 30,
    boardWidth: 1000,
    boardHeight: 800,
    musicUrl: "https://www.bensound.com/bensound-music/bensound-romantic.mp3",
};

const proposalMessages = [
    "Shivani Jain,\n\nEvery piece of my life makes more sense with you in it.\nWill you keep choosing me, today and always?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nYou are the calm in my chaos and the spark in my days.\nWill you be my forever Valentine?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nThis puzzle is tiny compared to how you complete me.\nWill you keep building this life with me?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nI found my favorite place in the world, right beside you.\nWill you be my always?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nYou are my missing piece, my safe place, my best decision.\nWill you keep being my forever?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nEvery day with you feels like a new chapter I never want to end.\nWill you keep writing it with me?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nIf love is a puzzle, you are the piece that makes it whole.\nWill you stay my forever Valentine?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nI promise to choose you in all the small moments and the big ones.\nWill you keep choosing me too?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nYou turn ordinary days into my favorite memories.\nWill you be my forever?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nWith you, I feel at home, no matter where we are.\nWill you be my always and forever?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nI want to keep building a life that makes us both proud.\nWill you do it with me?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nYour love is the best part of my story.\nWill you keep writing it with me?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nYou are my favorite person, my best friend, my everything.\nWill you be my forever Valentine?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nNo matter how life changes, I want my hand in yours.\nWill you be my always?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nEvery piece of us fits perfectly, even when we are different.\nWill you keep fitting your life with mine?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nYou make me believe in magic, in timing, and in us.\nWill you be my forever?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nI want to love you in ways that keep surprising you.\nWill you keep letting me?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nI do not have all the answers, but I know you are mine.\nWill you be my always and forever?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nI want to celebrate every win and hold you through every storm.\nWill you be my forever Valentine?\n\nAll my love,\nIshaan",
    "Shivani Jain,\n\nI choose you in every version of my future.\nWill you choose me too?\n\nAll my love,\nIshaan",
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
    dom.proposalMessage.textContent = state.selectedMessage;

    generateBaseImage();
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

function generateBaseImage() {
    const canvas = document.createElement("canvas");
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, baseImage.width, baseImage.height);
    gradient.addColorStop(0, "#e8d5f2");
    gradient.addColorStop(1, "#b19cd9");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, baseImage.width, baseImage.height);

    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    for (let c = 1; c < CONFIG.cols; c++) {
        const x = (baseImage.width / CONFIG.cols) * c;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, baseImage.height);
        ctx.stroke();
    }
    for (let r = 1; r < CONFIG.rows; r++) {
        const y = (baseImage.height / CONFIG.rows) * r;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(baseImage.width, y);
        ctx.stroke();
    }

    ctx.fillStyle = "rgba(63, 55, 83, 0.9)";
    ctx.font = "bold 72px 'Playfair Display'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let counter = 1;
    for (let row = 0; row < CONFIG.rows; row++) {
        for (let col = 0; col < CONFIG.cols; col++) {
            const centerX = (col + 0.5) * (baseImage.width / CONFIG.cols);
            const centerY = (row + 0.5) * (baseImage.height / CONFIG.rows);
            ctx.fillText(String(counter), centerX, centerY);
            counter += 1;
        }
    }

    baseImage.dataUrl = canvas.toDataURL("image/png");
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

    state.pieces.forEach((piece, index) => {
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

        const trayPadding = 20;
        const maxX = trayRect.width - pieceWidth - trayPadding;
        const maxY = trayRect.height - pieceHeight - trayPadding;
        const randomX = trayRect.left - gameRect.left + trayPadding + (index % CONFIG.cols) * (maxX / CONFIG.cols);
        const randomY = trayRect.top - gameRect.top + trayPadding + Math.floor(index / CONFIG.cols) * (maxY / CONFIG.rows);

        piece.el.style.left = `${randomX}px`;
        piece.el.style.top = `${randomY}px`;
    });
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
        };
    });

    piece.el.addEventListener("pointermove", (event) => {
        if (!state.dragging || state.dragging.piece !== piece) return;
        const x = event.clientX - state.dragging.gameLeft - state.dragging.offsetX;
        const y = event.clientY - state.dragging.gameTop - state.dragging.offsetY;
        piece.el.style.left = `${x}px`;
        piece.el.style.top = `${y}px`;
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

    if (distance <= CONFIG.snapDistance) {
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
