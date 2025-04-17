(function ($) {
  "use strict";

  // MENU
  $(".navbar-collapse a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // CUSTOM LINK
  $(".smoothscroll").click(function () {
    var el = $(this).attr("href");
    var elWrapped = $(el);
    var header_height = $(".navbar").height();

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $("body,html").animate(
        {
          scrollTop: totalScroll,
        },
        300
      );
    }
  });
  function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
  }

  function closeMenu() {
    document.getElementById("navLinks").classList.remove("show");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav-links");

    // Toggle the menu when clicking the hamburger button
    menuButton.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("show");
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    let animatedElements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right"
    );

    function checkVisibility() {
      animatedElements.forEach((element) => {
        let rect = element.getBoundingClientRect();
        let screenHeight = window.innerHeight;

        if (rect.top < screenHeight * 0.85 && rect.bottom > 0) {
          element.classList.add("visible");
          element.classList.remove("hidden"); // Ensure visibility
        }
      });
    }

    document.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Run on page load
  });

  document.addEventListener("DOMContentLoaded", function () {
    let animatedElements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right"
    );

    function checkVisibility() {
      animatedElements.forEach((element) => {
        let rect = element.getBoundingClientRect();
        let screenHeight = window.innerHeight;

        // Check if the element is in the viewport
        if (rect.top < screenHeight * 0.85 && rect.bottom > 0) {
          element.classList.add("visible");
          element.classList.remove("hidden");
        } else {
          // If the element is scrolled out, fade it out
          element.classList.remove("visible");
          element.classList.add("hidden");
        }
      });
    }

    document.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Run on page load in case elements are already in view
  });

  // SMOOTH SCROLL
  $(function () {
    $(".smoothscroll").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $($(this).attr("href")).offset().top,
        },
        1000,
        "easeInOutExpo"
      );
    });
  });
})(window.jQuery);

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".navbar-toggler");
  const navLinks = document.querySelector(".navbar-collapse");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
});
// Gallery Functionality
document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("gallery-main");
  const imageCaption = document.querySelector(".image-caption");

  // Caption texts corresponding to each image
  const captions = [
    "Spacious Living Area with Panoramic Views",
    "Luxurious Master Bedroom Suite",
    "Infinity Pool Overlooking Dubai Marina",
  ];

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", function () {
      // Update main image
      const fullSizeUrl = this.getAttribute("data-full");
      mainImage.src = fullSizeUrl;

      // Update active state
      thumbnails.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Update caption
      imageCaption.textContent = captions[index];

      // Add fade effect
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.style.opacity = 1;
      }, 300);
    });
  });

  let currentIndex = 0;
  function rotateImages() {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    thumbnails[currentIndex].click();
  }

  setInterval(rotateImages, 5000);
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".content-left, .content-right").forEach((el) => {
  observer.observe(el);
});
