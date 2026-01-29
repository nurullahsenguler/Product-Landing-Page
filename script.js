const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.getElementById("overlay");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.style.display = navMenu.classList.contains("active")
      ? "block"
      : "none";
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "auto";
  });
}

// Menü dışına veya linke tıklayınca kapansın
[overlay, ...document.querySelectorAll(".nav-menu a")].forEach((el) => {
  if (el) {
    el.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }
});

// 1. Performanslı Scroll Reveal Fonksiyonu
const handleScrollAnimation = () => {
  const elements = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-up"
  );

  elements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100; // Biraz daha erken başlasın ki kullanıcı beklemesin

    if (elementTop < triggerPoint) {
      el.classList.add("active");
    }
  });
};

// 2. Event Listeners (Scroll Kontrolü)
window.addEventListener("scroll", () => {
  // requestAnimationFrame ile tarayıcıyı yormadan animasyonları tetikle
  window.requestAnimationFrame(handleScrollAnimation);

  // Navbar ve Back to Top kontrolü
  const navbar = document.querySelector(".navbar");
  const backToTopBtn = document.querySelector("#backToTop");

  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);

  // Back to top butonu varsa çalıştır
  if (backToTopBtn) {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }
});

// 3. Sayfa içi linklere yumuşak kaydırma (EKLENEBİLECEK ŞIK ÖZELLİK)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 4. Back to Top Click (Kontrollü)
const backToTopBtn = document.querySelector("#backToTop");
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 5. FAQ Sistemi
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  if (question) {
    question.addEventListener("click", () => {
      item.classList.toggle("active");
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove("active");
      });
    });
  }
});

// Sayfa ilk açıldığında çalıştır
window.addEventListener("load", handleScrollAnimation);
