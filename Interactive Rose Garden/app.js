// ========================================
// INTERACTIVE ROSE GARDEN FOR SHIVANI
// ========================================

// Configuration
const CONFIG = {
    wifeName: 'Shivani Jain',
    finalMessage: 'Thank you Shivani!',
    favoriteColor: 'purple',
    totalRoses: 12,
    loadingTime: 5000, // 5 seconds
};

// State
const state = {
    rosesPlanted: 0,
    notesRead: 0,
    musicPlaying: false,
    isLoading: true,
};

// Fallback love notes (used if LoveNotes.txt fails to load)
const fallbackNotes = [
    "I love how you light up when talking about things you're passionate about. The way your hands move faster, your voice gets animated, and your whole face glows—it's like watching someone come alive, and it's beautiful.",
    "I love how you remember the tiniest details about things I've mentioned in passing. You'll bring up something I said weeks ago, and it reminds me that you truly listen and care about everything I share.",
    "I love how you make everyone around you feel special and valued.",
    "I love how you take care of the people you love—not in grand gestures, but in a thousand small, thoughtful ways that show your heart is pure gold.",
    "My favorite memory with you is the first time you fell asleep on my shoulder. The trust in that simple gesture—the way you relaxed completely—made me realize I never wanted to be anywhere else but right there with you.",
    "My favorite memory with you is when we supported each other through a difficult time. Not the difficulty itself, but the realization that no matter what life throws at us, we face it together, stronger as a team.",
    "I promise to always choose you, every single day. Not because I have to, but because marrying you is the easiest and best decision I've ever made and will continue to make for the rest of my life.",
    "You are my home, my safe place, and my greatest adventure all rolled into one.",
    "I promise to always be your biggest supporter, your fiercest defender, and your most devoted partner through every season of life.",
    "I promise to never stop learning about you, growing with you, and loving you more deeply with each passing year.",
    "I promise to always make you laugh, even when times are tough. I'll be the one who brings lightness to heavy moments and reminds you that joy can coexist with whatever challenges we're facing.",
    "I promise to always pay attention to your needs, your feelings, and the subtle ways you communicate what matters to you.",
    "I promise to always make time for us, no matter how busy life gets. Date nights, adventures, conversations, quality time—these will always be priorities because we are the priority.",
    "I promise to always be honest with you, even when it's uncomfortable. Truth, vulnerability, and open communication are the foundations I'll never compromise on because you deserve nothing less.",
    "I promise to always be your safe place, the person you can come to with anything—your fears, your dreams, your doubts, your joys—without judgment or hesitation.",
    "I promise to always celebrate your successes as if they were my own, cheering you on with genuine excitement and pride.",
    "I promise to always be there for you during difficult times, offering comfort, strength, and unwavering support.",
    "I promise to always be your partner in adventure, ready to explore the world with you, try new things, and create memories that will last a lifetime.",
    "I promise to always be your confidant, the person you can share your deepest thoughts and secrets with, knowing they'll be kept safe.",
    "I promise to always be your biggest fan, believing in you even when you doubt yourself and encouraging you to reach for your dreams.",
    "I promise to always be your teammate, facing life's challenges together, supporting each other, and growing stronger as a couple.",
    "I promise to always be your partner in crime, ready for spontaneous adventures, late-night conversations, and all the fun life has to offer.",
    "I promise to always be your safe harbor, the place you can return to for comfort, love, and acceptance.",
    "I promise to always be your partner in growth, encouraging each other to become the best versions of ourselves.",
    "I promise to always be your partner in love, cherishing you, honoring you, and loving you more deeply with each passing day.",
    "I promise to always be your partner in life, through all of its seasons, challenges, and joys.",
    "I promise to always be your partner in everything, because with you, I can do anything.",
    "I promise to always be your partner in forever, because I can't imagine my life without you.",
    "I promise to always be your partner in everything, because with you, I can do anything.",
    "I promise to always be your partner in forever, because I can't imagine my life without you.",
    "You are my inspiration. The way you live, love, and approach the world motivates me to be better, do better, and give more. You make me want to be the best version of myself.",
    "You are my peace in the chaos. When the world feels overwhelming, your presence calms me. Your voice, your touch, your smile—they're like coming up for air after being underwater too long.",
    "You are my reason to believe in magic. The way we found each other, the connection we share, the love we've built—it's proof that extraordinary, once-in-a-lifetime, magical things really do exist.",
    "You are my greatest adventure. Every day with you is a new discovery, a new experience, a new reason to fall in love with you all over again. I can't wait to see where this journey takes us."
];

// Love notes loaded from LoveNotes.txt
let loveNotes = [];

// DOM Elements
let loadingScreen;
let musicToggle;
let gardenContainer;
let sky;
let backgroundMusic;

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    setupEventListeners();
    startLoadingSequence();
});

function initializeElements() {
    loadingScreen = document.getElementById('loading-screen');
    musicToggle = document.getElementById('music-toggle');
    gardenContainer = document.getElementById('garden-container');
    sky = document.querySelector('.sky');
    backgroundMusic = document.getElementById('background-music');

    // Set up royalty-free music
    // Using a placeholder URL - will be replaced with actual royalty-free music
    backgroundMusic.src = 'https://www.bensound.com/bensound-music/bensound-romantic.mp3';
    backgroundMusic.volume = 0.3;

    // Load love notes from LoveNotes.txt (fallback to embedded list)
    loadLoveNotes();
}

async function loadLoveNotes() {
    try {
        const response = await fetch('LoveNotes.txt', { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`LoveNotes.txt load failed: ${response.status}`);
        }
        const text = await response.text();
        const lines = text
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);

        if (lines.length > 0) {
            loveNotes = lines;
            console.log(`💌 Loaded ${loveNotes.length} love notes from LoveNotes.txt`);
        } else {
            loveNotes = [...fallbackNotes];
            console.log('💌 LoveNotes.txt empty, using fallback notes');
        }
    } catch (error) {
        loveNotes = [...fallbackNotes];
        console.log('💌 LoveNotes.txt unavailable, using fallback notes:', error);
    }
}

function setupEventListeners() {
    musicToggle.addEventListener('click', toggleMusic);
}

// ========================================
// LOADING SEQUENCE
// ========================================

function startLoadingSequence() {
    console.log('🌹 Starting Interactive Rose Garden for', CONFIG.wifeName);

    // Simulate loading time
    setTimeout(() => {
        finishLoading();
    }, CONFIG.loadingTime);
}

function finishLoading() {
    state.isLoading = false;

    // Fade out loading screen
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            loadingScreen.classList.add('hidden');
            initializeGarden();
        }
    });
}

// ========================================
// GARDEN BASE & ATMOSPHERIC ELEMENTS
// ========================================

function initializeGarden() {
    console.log('🌱 Initializing magical garden for', CONFIG.wifeName);

    // Generate fence posts dynamically
    generateFencePosts();

    // Generate grass blades
    generateGrassBlades();

    // Generate fireflies
    generateFireflies();

    // Initialize celestial body
    updateCelestialBody();

    // Setup planting mechanics
    setupPlantingMechanics();

    // Setup love note modal
    setupLoveNoteModal();

    // TASK 7: Setup instruction tooltip
    setupInstructionTooltip();

    // TASK 7: Add easter eggs
    setupEasterEggs();

    // Auto-play music (with user interaction fallback)
    tryAutoPlayMusic();

    console.log('✨ Garden is ready! Click the soil to plant roses');
}

// ========================================
// TASK 7: INSTRUCTION TOOLTIP
// ========================================

function setupInstructionTooltip() {
    const tooltip = document.getElementById('instruction-tooltip');
    const dismissBtn = document.getElementById('dismiss-tooltip');

    // Check if user has visited before
    const hasVisited = localStorage.getItem('gardenVisited');

    if (!hasVisited) {
        // Show tooltip on first visit
        setTimeout(() => {
            if (tooltip) {
                tooltip.classList.remove('hidden');
            }
        }, 1000);

        // Auto-dismiss after 5 seconds
        const autoDismissTimer = setTimeout(() => {
            dismissTooltip();
        }, 6000);

        // Manual dismiss
        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => {
                clearTimeout(autoDismissTimer);
                dismissTooltip();
            });
        }

        // Dismiss on first click anywhere
        const dismissOnClick = () => {
            clearTimeout(autoDismissTimer);
            dismissTooltip();
            document.removeEventListener('click', dismissOnClick);
        };

        setTimeout(() => {
            document.addEventListener('click', dismissOnClick);
        }, 1500);
    } else {
        // Hide immediately if already visited
        if (tooltip) {
            tooltip.classList.add('hidden');
        }
    }

    function dismissTooltip() {
        if (tooltip) {
            tooltip.classList.add('hidden');
            localStorage.setItem('gardenVisited', 'true');
            console.log('👋 Tooltip dismissed');
        }
    }

    console.log('💡 Instruction tooltip initialized');
}

// ========================================
// TASK 7: EASTER EGGS
// ========================================

function setupEasterEggs() {
    // Easter Egg 1: Hidden Butterfly that appears randomly
    createHiddenButterfly();

    // Easter Egg 2: Clicking fence plays a special message
    setupFenceEasterEgg();

    // Easter Egg 3: One rose will be golden (the 7th rose)
    // This will be applied when roses are planted

    console.log('🎁 Easter eggs activated!');
}

function createHiddenButterfly() {
    // Create a rare golden butterfly that appears every 30-60 seconds
    const spawnButterfly = () => {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly hidden-butterfly';
        butterfly.style.cssText = `
            position: absolute;
            top: ${Math.random() * 60 + 20}%;
            left: -50px;
            z-index: 15;
            cursor: pointer;
            animation: flyButterfly 20s linear;
        `;

        butterfly.innerHTML = '🦋';
        butterfly.style.fontSize = '2rem';
        butterfly.style.filter = 'drop-shadow(0 0 10px gold)';

        // Click to reveal message
        butterfly.addEventListener('click', () => {
            butterfly.style.animation = 'none';
            butterfly.style.transform = 'scale(2)';
            showSecretMessage('You found the magical butterfly! 🦋✨');

            setTimeout(() => {
                butterfly.remove();
            }, 2000);
        });

        document.getElementById('garden').appendChild(butterfly);

        // Remove after animation
        setTimeout(() => {
            if (butterfly.parentNode) {
                butterfly.remove();
            }
        }, 20000);
    };

    // Spawn first butterfly after 15-45 seconds
    setTimeout(() => {
        spawnButterfly();
        // Then spawn every 45-90 seconds
        setInterval(spawnButterfly, 45000 + Math.random() * 45000);
    }, 15000 + Math.random() * 30000);
}

function setupFenceEasterEgg() {
    const fence = document.getElementById('fence-container');
    let clickCount = 0;

    if (fence) {
        fence.style.cursor = 'pointer';
        fence.addEventListener('click', () => {
            clickCount++;

            if (clickCount === 1) {
                showSecretMessage('The fence protects our garden of love 🌹');
            } else if (clickCount === 3) {
                showSecretMessage('You really like this fence, huh? 😄');
            } else if (clickCount >= 5) {
                showSecretMessage('Okay, you found the easter egg! Here\'s a secret: This garden took hours to code with love 💜');
                clickCount = 0; // Reset
            }
        });
    }
}

function showSecretMessage(message) {
    const secretMsg = document.createElement('div');
    secretMsg.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 215, 0, 0.95);
        color: #000;
        padding: 1.5rem 2.5rem;
        border-radius: 15px;
        font-family: var(--font-serif);
        font-size: 1.2rem;
        font-weight: 600;
        box-shadow: 0 10px 40px rgba(255, 215, 0, 0.5);
        z-index: 2002;
        animation: tooltipBounce 0.5s ease-out;
        text-align: center;
        max-width: 80%;
    `;
    secretMsg.textContent = message;

    document.body.appendChild(secretMsg);

    // Play special sound
    playSecretSound();

    // Remove after 3 seconds
    setTimeout(() => {
        secretMsg.style.animation = 'tooltipFadeOut 0.5s ease-out forwards';
        setTimeout(() => secretMsg.remove(), 500);
    }, 3000);
}

function playSecretSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523, 659, 784, 1047]; // C, E, G, High C - magical chord

    notes.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1);

        gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * 0.1);
        gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + index * 0.1 + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.8);

        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + index * 0.1 + 0.8);
    });
}


function generateFencePosts() {
    const fenceContainer = document.getElementById('fence-container');
    const postCount = Math.floor(window.innerWidth / 35); // Posts every 35px

    for (let i = 0; i < postCount; i++) {
        const post = document.createElement('div');
        post.className = 'fence-post';
        post.style.left = `${i * 35}px`;
        post.style.animationDelay = `${i * 0.05}s`;
        fenceContainer.appendChild(post);
    }

    console.log(`🪵 Generated ${postCount} fence posts`);
}

function generateGrassBlades() {
    const grassContainer = document.getElementById('grass-container');
    const bladeCount = 50; // Number of grass blades

    for (let i = 0; i < bladeCount; i++) {
        const blade = document.createElement('div');
        blade.className = 'grass-blade';
        blade.style.left = `${Math.random() * 100}%`;
        blade.style.height = `${30 + Math.random() * 30}px`;
        blade.style.animationDelay = `${Math.random() * 3}s`;
        blade.style.animationDuration = `${2 + Math.random() * 2}s`;
        grassContainer.appendChild(blade);
    }

    console.log(`🌿 Generated ${bladeCount} grass blades`);
}

function generateFireflies() {
    const garden = document.getElementById('garden');
    const fireflyCount = 15; // Number of fireflies

    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = `${Math.random() * 100}%`;
        firefly.style.bottom = `${40 + Math.random() * 40}%`;
        firefly.style.animationDelay = `${Math.random() * 8}s`;
        firefly.style.animationDuration = `${6 + Math.random() * 4}s`;
        garden.appendChild(firefly);
    }

    console.log(`✨ Generated ${fireflyCount} fireflies`);
}

function updateCelestialBody() {
    const celestialBody = document.querySelector('.celestial-body');
    const progress = (state.rosesPlanted / CONFIG.totalRoses) * 100;

    // Transition from sun to moon as garden grows
    if (progress >= 75) {
        celestialBody.classList.add('moon');
    } else {
        celestialBody.classList.remove('moon');
    }

    console.log(`🌞→🌙 Celestial: ${progress.toFixed(0)}% complete`);
}

// ========================================
// MUSIC CONTROLS
// ========================================

function toggleMusic() {
    if (state.musicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    backgroundMusic.play()
        .then(() => {
            state.musicPlaying = true;
            updateMusicIcon();

            // Fade in music
            gsap.to(backgroundMusic, {
                volume: 0.3,
                duration: 1
            });
        })
        .catch((error) => {
            console.log('Music autoplay prevented:', error);
            // Browser blocked autoplay, will play on user interaction
        });
}

function pauseMusic() {
    // Fade out music
    gsap.to(backgroundMusic, {
        volume: 0,
        duration: 0.5,
        onComplete: () => {
            backgroundMusic.pause();
            state.musicPlaying = false;
            updateMusicIcon();
        }
    });
}

function updateMusicIcon() {
    const musicOn = musicToggle.querySelector('.music-on');
    const musicOff = musicToggle.querySelector('.music-off');

    if (state.musicPlaying) {
        musicOn.classList.remove('hidden');
        musicOff.classList.add('hidden');
    } else {
        musicOn.classList.add('hidden');
        musicOff.classList.remove('hidden');
    }
}

function tryAutoPlayMusic() {
    // Try to autoplay, but respect browser policies
    playMusic();

    // If autoplay fails, play on first user interaction
    const playOnInteraction = () => {
        if (!state.musicPlaying) {
            playMusic();
        }
        document.removeEventListener('click', playOnInteraction);
    };

    document.addEventListener('click', playOnInteraction);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function updateSkyGradient() {
    const progress = (state.rosesPlanted / CONFIG.totalRoses) * 100;

    // Remove all progress classes
    sky.classList.remove('progress-25', 'progress-50', 'progress-75', 'progress-100');

    // Add appropriate class based on progress
    if (progress >= 100) {
        sky.classList.add('progress-100');
    } else if (progress >= 75) {
        sky.classList.add('progress-75');
    } else if (progress >= 50) {
        sky.classList.add('progress-50');
    } else if (progress >= 25) {
        sky.classList.add('progress-25');
    }

    console.log(`🌤️ Sky updated: ${progress.toFixed(0)}% complete`);
}

// ========================================
// ROSE PLANTING MECHANICS
// ========================================

// Define 12 planting zones across the garden (adjusted to soil area only)
const plantingZones = [
    { x: 15, y: 78, planted: false, roseColor: 'purple', messageIndex: 0 },
    { x: 28, y: 82, planted: false, roseColor: 'coral', messageIndex: 1 },
    { x: 42, y: 80, planted: false, roseColor: 'lavender', messageIndex: 2 },
    { x: 55, y: 84, planted: false, roseColor: 'red', messageIndex: 3 },
    { x: 68, y: 79, planted: false, roseColor: 'peach', messageIndex: 4 },
    { x: 82, y: 83, planted: false, roseColor: 'pink', messageIndex: 5 },
    { x: 22, y: 86, planted: false, roseColor: 'magenta', messageIndex: 6 },
    { x: 35, y: 88, planted: false, roseColor: 'yellow', messageIndex: 7 },
    { x: 50, y: 85, planted: false, roseColor: 'white', messageIndex: 8 },
    { x: 62, y: 87, planted: false, roseColor: 'crimson', messageIndex: 9 },
    { x: 75, y: 81, planted: false, roseColor: 'lavender', messageIndex: 10 },
    { x: 88, y: 84, planted: false, roseColor: 'coral', messageIndex: 11 }
];

function setupPlantingMechanics() {
    const gardenSoil = document.querySelector('.garden-soil');

    if (!gardenSoil) {
        console.error('Garden soil not found!');
        return;
    }

    // Add click event listener to garden soil
    gardenSoil.addEventListener('click', handleSoilClick);

    // Visual indicator on hover
    gardenSoil.addEventListener('mouseenter', () => {
        gardenSoil.classList.add('planting');
    });

    gardenSoil.addEventListener('mouseleave', () => {
        gardenSoil.classList.remove('planting');
    });

    console.log('🎯 Planting mechanics initialized - click soil to plant!');
}

function handleSoilClick(event) {
    // Get click position relative to the garden container
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = ((event.clientX - rect.left) / rect.width) * 100;
    const clickY = ((event.clientY - rect.top) / rect.height) * 100;

    console.log(`Click at: ${clickX.toFixed(1)}%, ${clickY.toFixed(1)}%`);

    // Find nearest available planting zone
    const zone = findNearestAvailableZone(clickX, clickY);

    if (zone) {
        plantRose(zone, event.clientX, event.clientY);
    } else {
        console.log('❌ No available zones nearby or all roses planted!');
        // Maybe show a subtle feedback that no zone is available
    }
}

function findNearestAvailableZone(clickX, clickY) {
    let nearest = null;
    let minDistance = 25; // Maximum distance to consider (in percentage units)

    for (const zone of plantingZones) {
        if (zone.planted) continue;

        // Calculate distance
        const dx = zone.x - clickX;
        const dy = zone.y - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
            minDistance = distance;
            nearest = zone;
        }
    }

    return nearest;
}

function plantRose(zone, clickX, clickY) {
    // Mark zone as planted
    zone.planted = true;
    state.rosesPlanted++;

    console.log(`🌹 Planting rose #${state.rosesPlanted} (${zone.roseColor}) at zone (${zone.x}%, ${zone.y}%)`);

    // Create visual effects
    createSparkleEffect(clickX, clickY);
    createPlantingGlow(zone.x, zone.y);
    createSoilWetSpot(zone.x, zone.y);

    // Play planting sound
    playPlantingSound();

    // Create and grow the rose!
    createRose(zone);

    // Update garden state
    updateSkyGradient();
    updateCelestialBody();

    console.log(`📊 Progress: ${state.rosesPlanted}/${CONFIG.totalRoses} roses planted`);

    // Check if all roses are planted
    if (state.rosesPlanted >= CONFIG.totalRoses) {
        console.log('🎉 All roses planted! Garden complete!');
        // TODO: TASK 6 - Trigger completion sequence
    }
}

// ========================================
// ROSE CREATION & ANIMATION
// ========================================

function createRose(zone) {
    const garden = document.getElementById('garden');

    // Create rose container
    const rose = document.createElement('div');
    rose.className = `rose ${zone.roseColor}`;

    // TASK 7 Easter Egg: Make the 7th rose golden
    if (state.rosesPlanted === 7) {
        // Remove the original color class and replace with golden
        rose.classList.remove(zone.roseColor);
        rose.classList.add('golden');
        console.log('✨ GOLDEN ROSE PLANTED! You found the rare golden rose! ✨');
    }


    rose.style.left = `${zone.x}%`;
    rose.style.bottom = `${100 - zone.y}%`;
    rose.style.transform = 'translateX(-50%)';
    rose.dataset.messageIndex = zone.messageIndex;

    // Add random variation to height and angle
    const heightVar = 0.9 + Math.random() * 0.2; // 90% to 110% height
    const angleVar = -5 + Math.random() * 10; // -5deg to +5deg rotation
    rose.style.setProperty('--height-var', heightVar);
    rose.style.setProperty('--angle-var', `${angleVar}deg`);

    // Create stem
    const stem = document.createElement('div');
    stem.className = 'rose-stem';
    stem.style.height = `${80 * heightVar}px`;
    rose.appendChild(stem);

    // Create leaves (4 leaves, alternating left/right)
    for (let i = 0; i < 4; i++) {
        const leaf = document.createElement('div');
        leaf.className = `rose-leaf ${i % 2 === 0 ? 'left' : 'right'}`;
        stem.appendChild(leaf);
    }

    // Create flower container
    const flower = document.createElement('div');
    flower.className = 'rose-flower';
    flower.style.bottom = `${80 * heightVar}px`;

    // Create 5 layers of petals (total 15 petals, 3 per layer)
    const petalAngles = [
        [0, 120, 240],      // Layer 1 - innermost
        [60, 180, 300],     // Layer 2
        [30, 150, 270],     // Layer 3
        [90, 210, 330],     // Layer 4
        [45, 165, 285]      // Layer 5 - outermost
    ];

    petalAngles.forEach((angles, layerIndex) => {
        angles.forEach(angle => {
            const petal = document.createElement('div');
            petal.className = `rose-petal layer-${layerIndex + 1}`;
            petal.style.setProperty('--rotate', `${angle}deg`);
            flower.appendChild(petal);
        });
    });

    rose.appendChild(flower);
    garden.appendChild(rose);

    // Play growth sound
    playGrowthSound();

    // Mark as bloomed after animation completes
    setTimeout(() => {
        rose.classList.add('bloomed');
        console.log(`🌹 Rose #${state.rosesPlanted} bloomed!`);

        // Add click handler for love note
        rose.addEventListener('click', () => showLoveNote(zone.messageIndex));

        // TASK 7: Show golden rose message if it's the special rose
        if (state.rosesPlanted === 7) {
            setTimeout(() => {
                showSecretMessage('🌟 WOW! You planted the RARE GOLDEN ROSE! 🌟');
            }, 1000);
        }
    }, 2500); // Total animation time

    zone.roseElement = rose;
}

function playGrowthSound() {
    // Ascending chime sound for growth
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [400, 500, 630, 800]; // Ascending frequencies

    notes.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.15);

        gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * 0.15);
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + index * 0.15 + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.15 + 0.3);

        oscillator.start(audioContext.currentTime + index * 0.15);
        oscillator.stop(audioContext.currentTime + index * 0.15 + 0.3);
    });
}

// ========================================
// LOVE NOTE SYSTEM
// ========================================

function showLoveNote(messageIndex) {
    const overlay = document.getElementById('love-note-overlay');
    const messageEl = document.getElementById('note-message');
    const counterEl = document.getElementById('note-counter');
    const activeNotes = getActiveNotes();

    // Set the message
    messageEl.textContent = activeNotes[messageIndex] || activeNotes[0] || '';

    // Set the counter
    counterEl.textContent = `Love Note ${messageIndex + 1} of ${activeNotes.length}`;

    // Show the modal
    overlay.classList.add('active');

    // Play a soft chime
    playLoveNoteSound();

    console.log(`💌 Showing love note #${messageIndex + 1}`);
}

function getActiveNotes() {
    const sourceNotes = loveNotes.length ? loveNotes : fallbackNotes;
    return sourceNotes.slice(0, CONFIG.totalRoses);
}

function hideLoveNote() {
    const overlay = document.getElementById('love-note-overlay');
    overlay.classList.remove('active');
}

function playLoveNoteSound() {
    // Soft romantic chime
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const frequencies = [659, 784, 880]; // E5, G5, A5 - soft romantic chord

    frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + 1.5);
    });
}

// Setup love note modal event listeners
function setupLoveNoteModal() {
    const overlay = document.getElementById('love-note-overlay');
    const closeBtn = document.getElementById('close-note');

    // Close on button click
    closeBtn.addEventListener('click', hideLoveNote);

    // Close on overlay click (but not on note itself)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            hideLoveNote();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            hideLoveNote();
        }
    });

    console.log('💌 Love note modal initialized');
}

function createSparkleEffect(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-effect';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    // Create 12 sparkle particles in a circle
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'sparkle-particle';

        // Calculate random direction
        const angle = (i / 12) * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.animationDelay = `${i * 0.05}s`;

        sparkle.appendChild(particle);
    }

    document.body.appendChild(sparkle);

    // Remove after animation
    setTimeout(() => sparkle.remove(), 1200);
}

function createPlantingGlow(x, y) {
    const garden = document.getElementById('garden');
    const glow = document.createElement('div');
    glow.className = 'planting-glow';
    glow.style.left = `${x}%`;
    glow.style.bottom = `${100 - y}%`; // Fixed: Convert from top percentage to bottom percentage
    glow.style.transform = 'translate(-50%, 50%)';

    garden.appendChild(glow);

    // Remove after animation
    setTimeout(() => glow.remove(), 1600);
}

function createSoilWetSpot(x, y) {
    const garden = document.getElementById('garden');
    const wetSpot = document.createElement('div');
    wetSpot.className = 'soil-wet-spot';
    wetSpot.style.left = `${x}%`;
    wetSpot.style.bottom = `${100 - y}%`; // Fixed: Convert from top percentage to bottom percentage
    wetSpot.style.transform = 'translate(-50%, 50%)';

    garden.appendChild(wetSpot);

    // Keep wet spot visible (doesn't auto-remove)
}

function playPlantingSound() {
    // Simple audio feedback using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Create a pleasant planting sound (rising tone)
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// ========================================
// PLACEHOLDER FOR FUTURE TASKS
// ========================================

// TASK 2: Garden base design will be added here
// TASK 4: Rose growth animations will be added here
// TASK 5: Love note system will be added here
// TASK 6: Progress & completion system will be added here

console.log('🎨 Interactive Rose Garden - TASK 1 Complete');
console.log('📋 Ready for TASK 2: Garden Base Design');
