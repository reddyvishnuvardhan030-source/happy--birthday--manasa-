/* ========================================
   INITIALIZE APPLICATION
   ======================================== */

let currentSection = 1;
const totalSections = 5;
let audio = null;
let isAudioPlaying = false;
let candlesBlown = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAudio();
    createStars();
    createBalloons();
    createFloatingElements();
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
    }, 3000);
});

/* ========================================
   AUDIO MANAGEMENT
   ======================================== */

function initializeAudio() {
    audio = document.getElementById('bgMusic');
    const audioToggle = document.getElementById('audioToggle');

    // Try to autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                isAudioPlaying = true;
                updateAudioToggle();
            })
            .catch(() => {
                isAudioPlaying = false;
                updateAudioToggle();
            });
    }

    audioToggle.addEventListener('click', toggleAudio);
}

function toggleAudio() {
    if (isAudioPlaying) {
        audio.pause();
        isAudioPlaying = false;
    } else {
        audio.play().catch(() => {});
        isAudioPlaying = true;
    }
    updateAudioToggle();
}

function updateAudioToggle() {
    const audioToggle = document.getElementById('audioToggle');
    const icon = audioToggle.querySelector('.audio-icon');
    icon.textContent = isAudioPlaying ? '🔊' : '🔇';
}

/* ========================================
   STARS CREATION
   ======================================== */

function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = window.innerWidth > 768 ? 100 : 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

/* ========================================
   BALLOONS CREATION
   ======================================== */

function createBalloons() {
    const container = document.querySelector('.balloons-container');
    const balloonCount = window.innerWidth > 768 ? 8 : 5;
    const colors = ['#ff6b9d', '#9b59b6', '#ffd700', '#ff8fab', '#c9a3e0'];

    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.bottom = '-100px';
        balloon.style.backgroundColor = colors[i % colors.length];
        balloon.style.animationDelay = i * 0.2 + 's';
        balloon.style.animationDuration = (4 + Math.random() * 2) + 's';
        container.appendChild(balloon);
    }
}

/* ========================================
   FLOATING ELEMENTS CREATION
   ======================================== */

function createFloatingElements() {
    createButterflies();
    createPetals();
    createSparkles();
}

function createButterflies() {
    const container = document.getElementById('butterfliesContainer');
    const count = window.innerWidth > 768 ? 5 : 2;

    for (let i = 0; i < count; i++) {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        butterfly.textContent = '🦋';
        butterfly.style.left = Math.random() * 100 + '%';
        butterfly.style.top = Math.random() * 60 + '%';
        butterfly.style.animationDelay = i * 1.5 + 's';
        butterfly.style.animationDuration = (8 + Math.random() * 4) + 's';
        container.appendChild(butterfly);

        setTimeout(() => {
            createButterflies();
        }, 12000 + Math.random() * 5000);
    }
}

function createPetals() {
    const container = document.getElementById('petalsContainer');
    const count = window.innerWidth > 768 ? 8 : 4;
    const petals = ['🌸', '🌺', '🌼', '🌻'];

    for (let i = 0; i < count; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.top = '-50px';
        petal.style.animationDelay = Math.random() * 2 + 's';
        petal.style.animationDuration = (6 + Math.random() * 2) + 's';
        container.appendChild(petal);
    }
}

function createSparkles() {
    const container = document.getElementById('sparklesContainer');
    const count = window.innerWidth > 768 ? 15 : 8;

    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (1 + Math.random() * 1) + 's';
        container.appendChild(sparkle);
    }
}

/* ========================================
   SECTION NAVIGATION
   ======================================== */

function nextSection() {
    if (currentSection < totalSections) {
        changeSection(currentSection + 1);
    }
}

function prevSection() {
    if (currentSection > 1) {
        changeSection(currentSection - 1);
    }
}

function changeSection(sectionNumber) {
    // Remove active class from current section
    document.getElementById(`section${currentSection}`).classList.remove('active');

    // Add active class to new section
    currentSection = sectionNumber;
    document.getElementById(`section${currentSection}`).classList.add('active');

    // Update button states
    updateNavigationButtons();

    // Handle section-specific events
    if (currentSection === 2) {
        candlesBlown = false;
        resetCandles();
    } else if (currentSection === 3) {
        if (!candlesBlown) {
            // Auto show celebration
        }
    } else if (currentSection === 4) {
        openLetter();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevButton');
    const nextBtn = document.getElementById('nextButton');

    prevBtn.style.display = currentSection > 1 ? 'block' : 'none';
    nextBtn.style.display = currentSection < totalSections ? 'block' : 'none';
}

/* ========================================
   CANDLES LOGIC
   ======================================== */

function resetCandles() {
    const flames = document.querySelectorAll('.flame');
    const candles = document.querySelectorAll('.candle');

    candles.forEach(candle => {
        candle.classList.remove('blown');
    });

    flames.forEach(flame => {
        flame.style.animation = 'flicker 0.15s ease-in-out infinite';
    });
}

function blowCandles() {
    candlesBlown = true;
    const candles = document.querySelectorAll('.candle');
    const blowButton = document.getElementById('blowButton');

    blowButton.disabled = true;
    blowButton.style.opacity = '0.5';

    candles.forEach((candle, index) => {
        setTimeout(() => {
            candle.classList.add('blown');
            const flame = candle.querySelector('.flame');
            flame.style.animation = 'extinguish 0.5s ease-out forwards';
        }, index * 100);
    });

    setTimeout(() => {
        // Trigger celebrations
        launchFireworks();
        createCelebrationConfetti();
        createCelebrationHearts();

        // Auto-advance after celebration
        setTimeout(() => {
            changeSection(3);
        }, 2000);
    }, 400);
}

/* ========================================
   CONFETTI & HEARTS
   ======================================== */

function createCelebrationConfetti() {
    const container = document.getElementById('confettiContainer');
    const confettiCount = window.innerWidth > 768 ? 50 : 30;
    const colors = ['#ff6b9d', '#9b59b6', '#ffd700', '#ff8fab', '#c9a3e0'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 1) + 's';
        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3500);
    }
}

function createCelebrationHearts() {
    const container = document.getElementById('heartsContainer');
    const heartCount = window.innerWidth > 768 ? 30 : 15;
    const hearts = ['❤️', '💕', '💖', '💝', '💗'];

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        heart.style.animationDuration = (3 + Math.random() * 1) + 's';
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4500);
    }
}

/* ========================================
   LETTER ANIMATION
   ======================================== */

function openLetter() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');

    // Show letter
    setTimeout(() => {
        letter.style.visibility = 'visible';
    }, 600);

    // Add click to close letter
    letter.addEventListener('click', (e) => {
        if (e.target === letter) {
            closeLetter();
        }
    });
}

function closeLetter() {
    const letter = document.getElementById('letter');
    letter.style.visibility = 'hidden';
}

/* ========================================
   FIREWORKS ANIMATION
   ======================================== */

function launchFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 15;
            this.vy = (Math.random() - 0.5) * 15 - 5;
            this.ax = 0;
            this.ay = 0.2;
            this.life = 1;
            this.decay = Math.random() * 0.015 + 0.01;
            this.color = ['#ff6b9d', '#9b59b6', '#ffd700', '#ff8fab', '#c9a3e0'][
                Math.floor(Math.random() * 5)
            ];
            this.size = Math.random() * 4 + 2;
        }

        update() {
            this.vx += this.ax;
            this.vy += this.ay;
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function createExplosion(x, y) {
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(x, y));
        }
    }

    // Create multiple explosions
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height * 0.6) + canvas.height * 0.1;
            createExplosion(x, y);
        }, i * 200);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);

            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

/* ========================================
   REPLAY FUNCTIONALITY
   ======================================== */

function replaySurprise() {
    // Reset to section 1
    document.getElementById(`section${currentSection}`).classList.remove('active');
    currentSection = 1;
    document.getElementById('section1').classList.add('active');

    // Reset candles
    resetCandles();
    candlesBlown = false;

    // Clear any lingering particles
    document.getElementById('confettiContainer').innerHTML = '';
    document.getElementById('heartsContainer').innerHTML = '';
    document.getElementById('fireworksCanvas').getContext('2d').clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Hide letter
    document.getElementById('letter').style.visibility = 'hidden';

    // Update navigation
    updateNavigationButtons();

    // Restart music if it's paused
    if (!isAudioPlaying && audio) {
        audio.play().catch(() => {});
        isAudioPlaying = true;
        updateAudioToggle();
    }
}

/* ========================================
   WINDOW RESIZE HANDLER
   ======================================== */

window.addEventListener('resize', () => {
    const canvas = document.getElementById('fireworksCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* ========================================
   KEYBOARD NAVIGATION
   ======================================== */

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSection();
    if (e.key === 'ArrowLeft') prevSection();
    if (e.key === 'Escape') closeLetter();
});

/* ========================================
   INITIAL SETUP
   ======================================== */

// Initialize navigation buttons
updateNavigationButtons();