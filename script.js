// ==========================================================================
// CONFIGURATION - Silakan sesuaikan data di bawah ini!
// ==========================================================================
const config = {
    // Tanggal Jadian / Pertama Kali Ketemu (Format: YYYY-MM-DD)
    anniversaryDate: "2024-10-15", 
    
    // Nomor WhatsApp kamu (Gunakan format kode negara, misal 62812xxx)
    whatsappNumber: "6281234567890", 
    
    // Surat cinta kasual/manis bergaya tulisan tangan asli
    loveLetterText: `Hai ganteng... ❤️

Selamat ulang tahun ya! Akhirnya bertambah juga umur kamu hehe.

Di hari spesial ini, aku cuma mau bilang makasih banyak udah selalu sabar ngadepin semua mood aku yang kadang suka naik turun, selalu ada saat aku butuh, dan selalu bikin aku ngerasa disayang banget setiap harinya.

Semoga kamu sehat-sehat terus ya, segala cita-cita dan keinginan kamu bisa tercapai satu per satu. Dan semoga, kita bisa terus bareng-bareng buat ngerayain ulang tahun kamu di tahun-tahun berikutnya.

I love you more than words can say! Happy birthday, sayangku. 🥰🔒`,

    // Pesan WhatsApp otomatis yang dikirim pacar ke kamu setelah tiup lilin
    whatsappMessage: "Sayang, makasih banyak ya buat ucapan ulang tahunnya! Web-nya lucu banget, aku suka. Aku sayang kamu juga! ❤️🥰"
};

// ==========================================================================
// HEART & CONFETTI CANVAS PARTICLES SYSTEM
// ==========================================================================
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y, type = "heart") {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = Math.random() * 10 + 5;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = type === "heart" ? -(Math.random() * 1.2 + 0.4) : Math.random() * 5 - 2.5;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
        this.color = this.getRandomColor();
        this.gravity = type === "confetti" ? 0.12 : 0;
        this.sway = Math.random() * 0.04;
        this.swaySpeed = Math.random() * 0.015;
    }

    getRandomColor() {
        if (this.type === "heart") {
            // Hati pastel hangat (soft coral, peach, terracotta)
            const colors = [
                "hsla(350, 75%, 75%, ", // Soft Pink
                "hsla(10, 70%, 70%, ",  // Soft Coral
                "hsla(330, 65%, 75%, ", // Rose Pink
                "hsla(20, 60%, 75%, "   // Peach
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        } else {
            // Confetti dengan warna palet scrapbook (hijau sage, terracotta, kuning lembut, krem tua)
            const colors = [
                `hsla(350, 70%, 70%, `, // Terracotta
                `hsla(150, 30%, 65%, `, // Sage Green
                `hsla(45, 60%, 70%, `,  // Warm Yellow
                `hsla(25, 50%, 75%, `   // Soft Orange
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color + this.opacity + ")";

        if (this.type === "heart") {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
            ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
            ctx.fill();
        } else {
            ctx.fillRect(-this.size / 2, -this.size / 3, this.size, this.size / 1.5);
        }
        ctx.restore();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.type === "heart") {
            this.speedX += Math.sin(Date.now() * this.swaySpeed) * this.sway;
            if (this.y < -20) {
                this.y = canvas.height + 20;
                this.x = Math.random() * canvas.width;
            }
        } else {
            this.speedY += this.gravity;
            this.opacity -= 0.004;
        }
    }
}

function initBackgroundHearts() {
    for (let i = 0; i < 25; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, "heart"));
    }
}

function spawnBurst(x, y, count = 30, type = "heart") {
    for (let i = 0; i < count; i++) {
        const p = new Particle(x, y, type);
        p.speedX = (Math.random() - 0.5) * 7;
        p.speedY = (Math.random() - 0.5) * 7 - (type === "confetti" ? 4 : 1.5);
        particles.push(p);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].type === "confetti" && (particles[i].opacity <= 0 || particles[i].y > canvas.height)) {
            particles.splice(i, 1);
        }
    }
    requestAnimationFrame(animate);
}

initBackgroundHearts();
animate();

// ==========================================================================
// BACKGROUND MUSIC LOGIC (RETRO VINYL)
// ==========================================================================
const bgMusic = document.getElementById("bgMusic");
const musicPlayer = document.getElementById("musicPlayer");
const musicBtn = document.getElementById("musicBtn");

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            musicPlayer.classList.add("playing");
        }).catch(err => console.log("Gagal memutar musik: ", err));
    } else {
        bgMusic.pause();
        musicPlayer.classList.remove("playing");
    }
}

musicBtn.addEventListener("click", toggleMusic);

// ==========================================================================
// NAVIGATION SLIDES LOGIC
// ==========================================================================
const slides = document.querySelectorAll(".slide");
let currentSlideIndex = 0;

function showSlide(index) {
    slides.forEach((slide, idx) => {
        if (idx === index) {
            slide.classList.add("active");
            if (slide.id === "slide-4") {
                startTypewriter();
            }
        } else {
            slide.classList.remove("active");
        }
    });
    currentSlideIndex = index;
}

// Slide 1 - Buka Amplop
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("open-btn");

function openEnvelope() {
    envelope.classList.add("open");
    
    // Ledakan hati
    const rect = envelope.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    spawnBurst(x, y, 35, "heart");

    // Putar musik
    if (bgMusic.paused) {
        toggleMusic();
    }

    setTimeout(() => {
        showSlide(1);
    }, 1400);
}

envelope.addEventListener("click", openEnvelope);
openBtn.addEventListener("click", openEnvelope);

// Tombol Next & Back
document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const nextIndex = currentSlideIndex + 1;
        if (nextIndex < slides.length) {
            showSlide(nextIndex);
        }
    });
});

document.querySelectorAll(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const prevIndex = currentSlideIndex - 1;
        if (prevIndex >= 0) {
            showSlide(prevIndex);
        }
    });
});

// ==========================================================================
// SLIDE 2: ANNIVERSARY COUNTER LOGIC
// ==========================================================================
function updateLoveCounter() {
    const startDate = new Date(config.anniversaryDate);
    const now = new Date();
    
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    document.getElementById("days").textContent = String(diffDays).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

setInterval(updateLoveCounter, 1000);
updateLoveCounter();

// ==========================================================================
// SLIDE 4: TYPEWRITER LOVE LETTER LOGIC
// ==========================================================================
const typewriterText = document.getElementById("typewriter-text");
const letterNextBtn = document.getElementById("letter-next-btn");
const letterBox = typewriterText.parentElement;
let letterIndex = 0;
let hasTyped = false;

function startTypewriter() {
    if (hasTyped) return;
    hasTyped = true;
    typewriterText.innerHTML = "";
    letterIndex = 0;
    
    function type() {
        if (letterIndex < config.loveLetterText.length) {
            const char = config.loveLetterText.charAt(letterIndex);
            
            if (char === "\n") {
                typewriterText.innerHTML += "<br>";
            } else {
                typewriterText.innerHTML += char;
            }
            
            letterIndex++;
            letterBox.scrollTop = letterBox.scrollHeight;
            
            setTimeout(type, 35); // Kecepatan mengetik sedikit lebih cepat agar dinamis
        } else {
            // Tampilkan tombol lanjut
            letterNextBtn.style.opacity = "1";
            letterNextBtn.style.pointerEvents = "all";
            
            // Ledakan partikel kecil
            const boxRect = typewriterText.getBoundingClientRect();
            spawnBurst(boxRect.left + boxRect.width / 2, boxRect.top + boxRect.height / 2, 12, "heart");
        }
    }
    
    setTimeout(type, 500);
}

// ==========================================================================
// SLIDE 5: CELEBRATION & BLOW CANDLE LOGIC
// ==========================================================================
const candle = document.getElementById("candle-1");
const cakeTitle = document.getElementById("cake-title");
const cakeSubtitle = document.getElementById("cake-subtitle");
const wishReveal = document.getElementById("wish-reveal");
const waBtn = document.getElementById("wa-btn");
const cakeBackBtn = document.getElementById("cake-back-btn");

let isBlown = false;

candle.addEventListener("click", () => {
    if (isBlown) return;
    isBlown = true;
    
    candle.classList.add("blown");
    cakeBackBtn.classList.add("hidden");

    cakeTitle.textContent = "Permohonan Dikabulkan! ✨";
    cakeSubtitle.textContent = "Semoga harapan kamu terkabul ya sayang.";
    
    wishReveal.classList.remove("hidden");
    
    const waUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage)}`;
    waBtn.setAttribute("href", waUrl);
    waBtn.classList.remove("hidden");

    // Ledakan confetti & hati bertema warna hangat
    const rect = candle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    spawnBurst(x, y, 60, "confetti");
    spawnBurst(x, y - 20, 20, "heart");

    setTimeout(() => {
        spawnBurst(70, canvas.height - 80, 25, "confetti");
        spawnBurst(canvas.width - 70, canvas.height - 80, 25, "confetti");
    }, 250);
});
