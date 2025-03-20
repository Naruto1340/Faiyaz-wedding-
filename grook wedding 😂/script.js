function revealInvitation() {
  const overlay = document.getElementById('welcomeOverlay');
  const container = document.getElementById('mainContainer');
  const body = document.body;
  
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });
  
  overlay.style.opacity = '0'; // Fade out start
  setTimeout(() => {
    overlay.style.display = 'none'; // Overlay hide
    container.style.display = 'block'; // Container show
    container.style.zIndex = '1'; // Container ko foreground mein lao
    setTimeout(() => {
      container.style.opacity = '1'; // Fade in container
      body.classList.add('body-scroll-enabled');
    }, 10);
    
    const weddingTune = document.getElementById('weddingTune');
    weddingTune.play().catch(error => {
      console.log('ऑडियो चलाने में दिक्कत हुई:', error);
    });
    
    AOS.init({ duration: 1000, once: true });
    animateHearts();
  }, 500); // Wait for overlay fade-out to complete
}
// Countdown Timer
function startTimer() {
  const timer = document.getElementById('eventTimer');
  const target = new Date(timer.dataset.date).getTime();
  
  setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;
    
    document.getElementById('daysLeft').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('hoursLeft').textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('minutesLeft').textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('secondsLeft').textContent = Math.floor((diff % (1000 * 60)) / 1000);
  }, 1000);
}

// Image Modal
function displayModal(img) {
  const modal = new bootstrap.Modal(document.getElementById('photoModal'));
  const carousel = document.getElementById('modalCarousel');
  const items = carousel.querySelectorAll('.carousel-item');
  
  let clickedSrc = img.src;
  items.forEach((item, index) => {
    if (item.getAttribute('data-src') === clickedSrc) {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  });
  
  modal.show();
}

// Theme Switch
function switchTheme() {
  const html = document.documentElement;
  html.setAttribute('data-theme', html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
}

// Audio Switch
function switchAudio() {
  const tune = document.getElementById('weddingTune');
  tune.paused ? tune.play().catch(error => console.log('ऑडियो नहीं चला:', error)) : tune.pause();
}

// Calendar Integration
function saveToCalendar() {
  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', 'Wedding of Faiyaz & Israt');
  url.searchParams.set('dates', '20250425T100000/20250425T130000');
  url.searchParams.set('ctz', 'Asia/Jakarta');
  url.searchParams.set('details', 'Join us for the wedding of Faiyaz & Israt!');
  window.open(url, '_blank');
}

// Guest Greeting
function greetGuest() {
  const params = new URLSearchParams(window.location.search);
  const guest = params.get('to');
  if (guest) {
    document.getElementById('guestInfo').innerHTML = `To: <strong>${decodeURIComponent(guest)}</strong>`;
  }
}

// Heart Animation
function animateHearts() {
  document.querySelectorAll('svg[data-time][data-class]').forEach((el) => {
    const time = parseInt(el.getAttribute('data-time'));
    const className = el.getAttribute('data-class');
    if (time && className) {
      setTimeout(() => el.classList.add(className), time);
    }
  });
}

// Scroll to Section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  greetGuest();
  startTimer();
});