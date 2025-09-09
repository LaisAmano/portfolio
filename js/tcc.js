
// Partículas
const canvas = document.getElementById("particles-project");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray.length = 0;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Menu transparente / sólido
const menu = document.getElementById("menu");
menu.classList.add("transparent");
window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight - 100) {
    menu.classList.add("solid");
    menu.classList.remove("transparent");
  } else {
    menu.classList.add("transparent");
    menu.classList.remove("solid");
  }
});

// Menu hamburguer mobile
const hamburger = document.querySelector(".hamburger");
const menuLinks = document.querySelector(".menu-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menuLinks.classList.toggle("active");
});

// Carrossel drag no mobile
const carousel = document.querySelector(".carousel");
let isDown = false;
let startX, scrollLeft;

if (carousel) {
  carousel.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener("mouseleave", () => { isDown = false; });
  carousel.addEventListener("mouseup", () => { isDown = false; });
  carousel.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Suporte a touch
  carousel.addEventListener("touchstart", e => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener("touchend", () => { isDown = false; });
  carousel.addEventListener("touchmove", e => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });
}
