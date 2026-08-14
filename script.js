const weddingDate = new Date("2027-01-01T14:00:00+08:00");
const header = document.querySelector(".site-header");
const headerKicker = document.querySelector(".header-kicker");
const countdownFields = {
  days: document.querySelector('[data-countdown="days"]'),
  hours: document.querySelector('[data-countdown="hours"]'),
  minutes: document.querySelector('[data-countdown="minutes"]'),
};

function updateHeader() {
  const isSolid = window.scrollY > 80;
  header.classList.toggle("is-solid", isSolid);
  headerKicker.textContent = isSolid
    ? "IDY & STEPHEN ｜ TOGETHER IN CHRIST"
    : "TOGETHER IN CHRIST";
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const diff = Math.max(weddingDate.getTime() - Date.now(), 0);
  const minutesTotal = Math.floor(diff / 60000);
  const days = Math.floor(minutesTotal / 1440);
  const hours = Math.floor((minutesTotal % 1440) / 60);
  const minutes = minutesTotal % 60;

  countdownFields.days.textContent = String(days).padStart(3, "0");
  countdownFields.hours.textContent = pad(hours);
  countdownFields.minutes.textContent = pad(minutes);
}

function scrollToAnchor(hash, updateUrl = false) {
  if (hash === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (updateUrl) history.pushState(null, "", hash);
    return;
  }

  const target = document.querySelector(hash);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  if (updateUrl) history.pushState(null, "", hash);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    if (!hash || hash.length <= 1) return;
    event.preventDefault();
    scrollToAnchor(hash, true);
  });
});

window.addEventListener("load", () => {
  if (location.hash) {
    setTimeout(() => scrollToAnchor(location.hash), 80);
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
updateCountdown();
setInterval(updateCountdown, 60000);
