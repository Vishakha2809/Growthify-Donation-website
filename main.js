// Contact details (change here if the number or email changes)
const CONTACT = {
  whatsapp: "918989282885", // country code + number, no "+"
  email: "support@growthifyservices.in",
};

// ---------------------------------------------------------------- header
const nav = document.querySelector(".nav");
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");

const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const setMenu = (open) => {
  links.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};

toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
links.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

// ---------------------------------------------------------------- reveal
const revealTargets = document.querySelectorAll(
  ".feature, .step, .compare__card, .faq details, .receipt, .secure, .contact-card, .demo__form"
);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

// ---------------------------------------------------------------- demo form
// The site has no server: the request is sent to Growthify on WhatsApp or by
// email, with all the details already filled in.
const form = document.getElementById("demo-form");
const errorBox = document.getElementById("form-error");
let submitVia = "whatsapp";

form.querySelectorAll("button[type=submit]").forEach((btn) =>
  btn.addEventListener("click", () => {
    submitVia = btn.dataset.via;
  })
);

const showError = (message, field) => {
  errorBox.textContent = message;
  errorBox.hidden = false;
  if (field) {
    field.setAttribute("aria-invalid", "true");
    field.focus();
  }
};

form.addEventListener("input", (e) => {
  e.target.removeAttribute("aria-invalid");
  errorBox.hidden = true;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(
    [...new FormData(form)].map(([key, value]) => [key, String(value).trim()])
  );

  if (!data.name) return showError("Please enter your name.", form.name);
  if (!data.org) return showError("Please enter your NGO or trust name.", form.org);
  if (data.phone.replace(/\D/g, "").length < 10) {
    return showError("Please enter a valid mobile number.", form.phone);
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return showError("Please enter a valid email or leave it empty.", form.email);
  }

  const lines = [
    "Hello Growthify, I would like a demo of the NGO software.",
    "",
    `Name: ${data.name}`,
    `NGO / Trust: ${data.org}`,
    `Mobile: ${data.phone}`,
    data.city ? `City: ${data.city}` : null,
    data.email ? `Email: ${data.email}` : null,
    data.size ? `Donations per month: ${data.size}` : null,
    data.message ? `Message: ${data.message}` : null,
  ];
  const text = lines.filter((line) => line !== null).join("\n");

  if (submitVia === "email") {
    const subject = `Demo request: ${data.org}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(text)}`;
  } else {
    window.open(
      `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );
  }
});
