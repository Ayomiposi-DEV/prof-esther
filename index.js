// ===== MOBILE NAVIGATION TOGGLE =====
document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.querySelector(".hamburger");
	const navMenu = document.querySelector(".nav-menu");
	const navLinks = document.querySelectorAll(".nav-link");
	const currentPage = window.location.pathname.split("/").pop() || "index.html";

	navLinks.forEach((link) => {
		const linkPage = new URL(link.href, window.location.href).pathname.split("/").pop();
		const isCurrentPage = linkPage === currentPage;
		link.classList.toggle("active", isCurrentPage);
		if (isCurrentPage) {
			link.setAttribute("aria-current", "page");
		} else {
			link.removeAttribute("aria-current");
		}
	});

	// Toggle mobile menu
	if (hamburger) {
		hamburger.addEventListener("click", function () {
			navMenu.classList.toggle("active");
			hamburger.classList.toggle("active");
		});
	}

	// Close menu when a link is clicked
	navLinks.forEach((link) => {
		link.addEventListener("click", function () {
			navMenu.classList.remove("active");
			if (hamburger) {
				hamburger.classList.remove("active");
			}
		});
	});

	// Close menu when clicking outside
	document.addEventListener("click", function (event) {
		if (!event.target.closest(".nav-container")) {
			navMenu.classList.remove("active");
			if (hamburger) {
				hamburger.classList.remove("active");
			}
		}
	});
});

// ===== EMAILJS CONTACT FORM =====
document.addEventListener("DOMContentLoaded", function () {
	const contactForm = document.getElementById("contactForm");
	const submitButton = document.getElementById("contactSubmit");
	const formStatus = document.getElementById("formStatus");
	const emailjsPublicKey = "4uQV0JM8QRpp37Bb9";
	const serviceId = "service_14wgw2g";

	if (!contactForm || !window.emailjs) {
		return;
	}

	emailjs.init({ publicKey: emailjsPublicKey });

	contactForm.addEventListener("submit", async function (event) {
		event.preventDefault();
		const serviceId = contactForm.dataset.emailjsServiceId;
		const templateId = contactForm.dataset.emailjsTemplateId;

		if (emailjsPublicKey === "4uQV0JM8QRpp37Bb9" || serviceId === "service_14wgw2g" || templateId === "") {
			formStatus.textContent = "Please add your EmailJS public key, service ID, and template ID first.";
			formStatus.className = "form-status error";
			return;
		}

		submitButton.disabled = true;
		submitButton.textContent = "Sending...";
		formStatus.textContent = "";
		formStatus.className = "form-status";

		try {
			await emailjs.sendForm(serviceId, templateId, contactForm);
			formStatus.textContent = "Thank you for your message. I will get back to you soon.";
			formStatus.className = "form-status success";
			contactForm.reset();
		} catch (error) {
			console.error("EmailJS error:", error);
			formStatus.textContent = "Your message could not be sent. Please try again or use the email address provided.";
			formStatus.className = "form-status error";
		} finally {
			submitButton.disabled = false;
			submitButton.textContent = "Send Message";
		}
	});
});

// ===== SMOOTH SCROLL TO SECTIONS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	});
});

// ===== ADD ANIMATION ON SCROLL =====
const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.style.animation = "fadeIn 0.6s ease forwards";
			observer.unobserve(entry.target);
		}
	});
}, observerOptions);

// Observe all cards and items
document.querySelectorAll(
	".about-card, .research-item, .research-card, .community-item, .community-card, .stat-box, .publication-item, .pub-item-card",
).forEach((el) => {
	el.style.opacity = "0";
	observer.observe(el);
});
