// ===== Função para criar partículas em qualquer canvas =====
function startParticles(canvasId, num = 80) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: num }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      dx: Math.random() - 0.5,
      dy: Math.random() - 0.5
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

// ===== Inicializa para desktop e mobile =====
startParticles("particles-desk", 100); // desktop
startParticles("particles-mob", 60);   // mobile


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

// Script simples para rolar até a seção correta (desktop ou mobile)
document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Evita pular direto

    // Pega o ID base (ex: "about")
    const baseId = this.getAttribute('href').substring(1);

    // Se a tela for pequena, tenta o "-mob"
    const isMobile = window.innerWidth <= 768;
    const targetId = isMobile ? baseId + '-mob' : baseId;

    // Procura a seção
    const section = document.getElementById(targetId);

    // Se achou, rola suavemente até lá
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }

    // Fecha o menu mobile (se existir)
    const menuLinks = document.querySelector('.menu-links');
    if (menuLinks) {
      menuLinks.classList.remove('open');
    }
  });
});

