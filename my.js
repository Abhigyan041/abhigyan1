
"use strict";

const $ = id => document.getElementById(id);

// =================================
// 1. SECRET LETTER
// =================================

$("openLetter").addEventListener("click", () => {
    $("letterText").classList.toggle("show");

    $("openLetter").textContent =
        $("letterText").classList.contains("show")
        ? "Close Letter"
        : "Open My Letter";
});

// =================================
// 2. CATCH THE HEARTS GAME
// =================================

let playing = false;
let score = 0;
let time = 30;
let spawnTimer;
let countTimer;

function spawnHeart() {
    if (!playing) return;

    const heart = document.createElement("button");

    heart.className = "heart-target";
    heart.textContent =
        ["💗", "💖", "💕", "💘", "💝"][
            Math.floor(Math.random() * 5)
        ];

    heart.style.left = Math.random() * 88 + "%";
    heart.style.top = Math.random() * 75 + "%";

    heart.onclick = () => {
        if (!playing) return;

        score++;
        $("score").textContent = score;
        heart.remove();
    };

    $("gameArea").appendChild(heart);

    setTimeout(() => heart.remove(), 2800);
}

function endGame() {
    playing = false;

    clearInterval(spawnTimer);
    clearInterval(countTimer);

    $("startGame").disabled = false;
    $("startGame").textContent = "Play Again";

    $("gameResult").textContent =
        `Time up! You caught ${score} hearts! 💗`;

    $("gameHint").textContent = "Well Played!";
}

$("startGame").addEventListener("click", () => {
    if (playing) return;

    playing = true;
    score = 0;
    time = 30;

    $("score").textContent = score;
    $("time").textContent = time;

    $("gameResult").textContent = "Catch as many as possible!";
    $("gameHint").textContent = "";

    $("startGame").disabled = true;
    $("startGame").textContent = "Game Running...";

    $("gameArea").querySelectorAll(".heart-target")
        .forEach(h => h.remove());

    spawnHeart();

    spawnTimer = setInterval(spawnHeart, 650);

    countTimer = setInterval(() => {
        time--;

        $("time").textContent = time;

        if (time <= 0) endGame();
    }, 1000);
});

// =================================
// 3. MEMORY MATCH GAME
// =================================

const memorySymbols = [
    "💗", "🌷", "⭐", "🦋",
    "💗", "🌷", "⭐", "🦋"
];

function setupMemory() {
    const grid = $("memoryGrid");

    grid.innerHTML = "";

    let cards = [...memorySymbols]
        .sort(() => Math.random() - 0.5);

    let first = null;
    let lock = false;
    let pairs = 0;

    $("memoryStatus").textContent =
        "Find all matching pairs!";

    cards.forEach(symbol => {
        const button = document.createElement("button");

        button.className = "memory-tile";
        button.textContent = "?";

        button.onclick = () => {
            if (lock || button.disabled || button === first) return;

            button.textContent = symbol;

            if (!first) {
                first = button;
                return;
            }

            if (
                first.textContent === button.textContent
            ) {
                button.disabled = true;
                first.disabled = true;

                first = null;
                pairs++;

                if (pairs === 4) {
                    $("memoryStatus").textContent =
                        "All pairs matched! 🎉";
                }
            } else {
                lock = true;

                const previous = first;
                first = null;

                setTimeout(() => {
                    button.textContent = "?";
                    previous.textContent = "?";
                    lock = false;
                }, 700);
            }
        };

        grid.appendChild(button);
    });
}

$("memoryReset").addEventListener("click", setupMemory);

setupMemory();

// =================================
// 4. LUCKY WHEEL GAME
// =================================

let wheelTurns = 0;

$("spinWheel").addEventListener("click", () => {
    const outcomes = [
        "A little extra happiness 💖",
        "A virtual bouquet 🌷",
        "A big reason to smile ✨",
        "A sweet surprise ⭐",
        "A day full of good vibes 🦋",
        "You are awesome! 💗"
    ];

    wheelTurns++;

    $("wheel").style.transform =
        `rotate(${wheelTurns * 720 + Math.random() * 360}deg)`;

    $("wheelResult").textContent =
        outcomes[Math.floor(Math.random() * outcomes.length)];
});

// =================================
// 5. QUIZ GAME
// =================================

$("quizOptions").addEventListener("click", event => {
    if (event.target.tagName !== "BUTTON") return;

    const replies = {
        rainy: "Rainy day vibes! 🌧️",
        sunny: "Sunshine energy! ☀️",
        cozy: "Cozy days are the best! 🧸"
    };

    $("quizResult").textContent =
        replies[event.target.dataset.answer];
});

// =================================
// 6. PHOTO UPLOAD
// =================================

function addPhotoPreview(inputId, frameId) {
    const input = $(inputId);
    const frame = $(frameId);

    input.addEventListener("change", () => {
        const file = input.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image.");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            frame.innerHTML = "";

            const img = document.createElement("img");

            img.src = reader.result;
            img.alt = "Selected photo";

            frame.appendChild(img);
        };

        reader.readAsDataURL(file);
    });
}

addPhotoPreview("myPhotoInput", "myPhotoFrame");
addPhotoPreview("herPhotoInput", "herPhotoFrame");

// =================================
// 7. CONFETTI CELEBRATION
// =================================

function confetti() {
    const symbols = [
        "💗", "✨", "🌸", "💖", "⭐", "🌷"
    ];

    for (let i = 0; i < 75; i++) {
        const item = document.createElement("span");

        item.className = "spark";

        item.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        item.style.left = Math.random() * 100 + "vw";

        item.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        item.style.fontSize =
            (14 + Math.random() * 20) + "px";

        item.style.animationDelay =
            Math.random() * 1.5 + "s";

        document.body.appendChild(item);

        setTimeout(() => item.remove(), 8000);
    }
}

// =================================
// 8. FINAL PROPOSAL
// =================================

$("yesBtn").addEventListener("click", () => {

    $("answers").classList.add("hidden");
    $("answerMsg").classList.add("hidden");

    $("finale").classList.add("show");

    $("finale").querySelector(".script").textContent =
        "I Love You, My Devi Ji 💗";

    $("finale").querySelector("h3").textContent =
        "You Just Made This Moment Unforgettable!";

    $("finale").querySelector("p").textContent =
        "Thank you Aditi! Here's to more smiles and beautiful memories together. ✨";

    confetti();
});

// NO OPTION
$("noBtn").addEventListener("click", () => {

    $("answerMsg").textContent =
        "Thank you for being honest, Aditi. I respect your answer and your feelings. 🌷";

});
