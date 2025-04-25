document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for the animations
    // Check if the device is mobile
    const isMobile = window.innerWidth <= 768;

    // Create a timeline for the animations with different settings for mobile and desktop
    const textTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.scrolling-text-container',
            start: isMobile ? 'top 80%' : 'top 100%',
            end: isMobile ? 'bottom 100%' : 'bottom -230%',
            repeat: -1,
            scrub: isMobile ? 0.8 : 1.2,
            markers: false
        }
    });

    // Add animations to the timeline with adjusted values for mobile
    textTimeline
        .to('.left-to-right', {
            x: isMobile ? '0%' : '150%',
            ease: 'power2.out',
        })
        .to('.right-to-left', {
            x: isMobile ? '0%' : '-150%',
            ease: 'power2.out',
        }, '<');

    // Add a subtle fade-in effect when the text comes into view
    gsap.from('.scroll-text', {
        y: isMobile ? 10 : 20,
        duration: isMobile ? 0.8 : 1,
        scrollTrigger: {
            trigger: '.scrolling-text-container',
            start: isMobile ? 'top 90%' : 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    

// mam

 // Fixed position animation for the first scroll-text element (logo)
 gsap.from(".scroll-text.opacity0-1", {
    opacity: 0,
    y: 100,
    duration: 1,
    scrollTrigger: {
      trigger: ".scroll-text.opacity0-1", // Trigger element
      start: "top -50%", // Start when the element is 80% from the top of the viewport
      end: "top -20%",   // End when the element is near the top of the viewport
      scrub: 1.2,      // Link animation to scroll position
      markers: false,    // Show markers for debugging (optional)
      pin: true,        // Pin the element in place while scrolling
      pinSpacing: false, // Optional: removes extra spacing when the element is pinned
   
     
    }
  });

  // Fixed position animation for the second scroll-text element (Dr. Manimegalai Mohan)
  gsap.from(".scroll-text.right-to-left2", {
    opacity: 0,
    x: "100%",
    duration: 1,
    scrollTrigger: {
      trigger: ".scroll-text.right-to-left2", // Trigger element
      start: "top 80%", // Start when the element is 80% from the top of the viewport
      end: "top 20%",   // End when the element is near the top 50% of the viewport
      scrub: true,      // Link animation to scroll position
      markers: false,    // Show markers for debugging (optional)
      pin: true,        // Pin the element during scrolling
      pinSpacing: false // Optional: removes extra spacing when the element is pinned
    }
  });
// Base animation setup with controllers
gsap.set(".panel.gradient-blue", {
    autoAlpha: 0, // Start with opacity 0
    y: window.innerHeight, // Start from offscreen (bottom)
    height: "auto" // Make sure the element has an auto height so it's not collapsed
});

// Create a timeline with ScrollTrigger
const panelTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".wrapper",
        start: "top top", // Trigger when the top of the wrapper hits the top of the viewport
        end: "+=100%", // Make the animation last over 200% of the wrapper's height
        scrub: 1, // Smooth scrubbing effect
        pin: true, // Pin the element during the scroll
        markers: false, // Show markers for debugging
        toggleActions: "play pause reverse pause", // Control animation play state
        onEnter: () => console.log("Animation started"),
        onLeave: () => console.log("Animation ended"),
        onEnterBack: () => console.log("Animation reversed"),
        onLeaveBack: () => console.log("Animation completed")
    }
});

// Add animation sequences to timeline
panelTl.to(".box", {
    autoAlpha: 1, // Fade in the box
    duration: 1,
    ease: "power1.inOut"
})
.to(".panel.gradient-blue", {
    autoAlpha: 1, // Fade in the panel
    y: 0, // Move it into view (y: 0)
    duration: 1,
    ease: "none"
})
.to(".panel.gradient-blue", {
    autoAlpha: 1, // Set opacity to 1 at the bottom
    y: 0, // Keep panel at final position
    duration: 1,
    ease: "none",
    scrollTrigger: {
        trigger: ".wrapper",
        start: "top top", // Start when the top of the wrapper hits the top of the viewport
        end: "bottom bottom", // End when the bottom of the wrapper hits the bottom of the viewport
        scrub: 1, // Smooth scrubbing effect
        markers: false, // Show markers for debugging
        onUpdate: (self) => {
            // Calculate opacity based on the scroll progress
            const opacity = gsap.utils.mapRange(0, 0.7, 0, 1, self.progress); // Map scroll progress to opacity from 0 to 1 (70% scroll)
            gsap.to(".panel.gradient-blue", { opacity: opacity });
        }
    }
});

// Add controls for debugging
ScrollTrigger.addEventListener("refresh", () => {
    console.log("ScrollTrigger refreshed");

});






// gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);
const $container = $(".gallery");
const $items = $(".cards");

const getMaxWidthHeight = function () {
  maxWidth = $items.width();
  maxHeight = $items.height();
};
getMaxWidthHeight();

ScrollTrigger.addEventListener("refreshInit", getMaxWidthHeight);

const sliderTl = gsap.timeline().to($items, {   
  x: function () {
    return -maxWidth;
  },
  ease: "none"
});

// Ensure interaction with iframe during scroll animation
gsap
  .timeline({
    ease: "linear",
    scrollTrigger: {
      trigger: $container,
      pin: true,
      end: function () {
        return "+=" + maxWidth;
      },
      scrub: 1,
      invalidateOnRefresh: true,
      onEnter: () => {
        // Enable pointer events when entering the scroll area
        $items.css('pointer-events', 'auto');
      },
      onLeave: () => {
        // Disable pointer events when leaving the scroll area to prevent interaction with hidden content
        $items.css('pointer-events', 'none');
      }
    }
  })
  .add(sliderTl);



// scroll smoothere















// const $container2 = $(".gallery2");
// const $items2 = $(".cards2");

// const getMaxWidthHeight2 = function () {
//   maxWidth = $items2.width();
//   maxHeight = $items2.height();
// };
// getMaxWidthHeight2();

// ScrollTrigger.addEventListener("refreshInit", getMaxWidthHeight2);

// var tl = gsap.timeline().to($items2, {
//   x: function () {
//     return -maxWidth;
//   },
//   ease: "none"
// });

// gsap
//   .timeline({
//     ease: "linear",
//     scrollTrigger: {
//       trigger: $container2,
//       pin: true,
//       end: function () {
//         return "+=" + maxWidth;
//       },
//       scrub: 1,
//       invalidateOnRefresh: true
//     }
//   })
//   .add(tl);














// Function to create typewriter animation for any element
// Animation 1
gsap.timeline({
    scrollTrigger: {
        trigger: ".heading-1",
        start: "top 100%",
        end: "top 50%",
        markers: false,
        toggleActions: "play none none reverse"
    }
})
.fromTo(".heading-1", {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0
}, {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    duration: 1.2,
    delay: 0,
    ease: "power2.inOut"
})
.fromTo(".heading-1", 0.5, {
    "border-right-color": "rgba(255,255,255,0.9)"
}, {
    "border-right-color": "rgba(255,255,255,0)",
    repeat: -1,
    ease: "none"
}, 0);

// Animation 2
gsap.timeline({
    scrollTrigger: {
        trigger: ".heading-2",
        start: "top 80%",
        end: "top 50%",
        markers: false,
        toggleActions: "play none none reverse"
    }
})
.fromTo(".heading-2", {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0
}, {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.inOut"
})
.fromTo(".heading-2", 0.5, {
    "border-right-color": "rgba(255,255,255,0.8)"
}, {
    "border-right-color": "rgba(255,255,255,0)",
    repeat: -1,
    ease: "none"
}, 0);

// Animation 3
gsap.timeline({
    scrollTrigger: {
        trigger: ".heading-3",
        start: "top 80%",
        end: "top 50%",
        markers: false,
        toggleActions: "play none none reverse"
    }
})
.fromTo(".heading-3", {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0
}, {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.inOut"
})
.fromTo(".heading-3", 0.5, {
    "border-right-color": "rgba(255,255,255,0.7)"
}, {
    "border-right-color": "rgba(255,255,255,0)",
    repeat: -1,
    ease: "none"
}, 0);

// Animation 4
gsap.timeline({
    scrollTrigger: {
        trigger: ".heading-4",
        start: "top 80%",
        end: "top 50%",
        markers: false,
        toggleActions: "play none none reverse"
    }
})
.fromTo(".heading-4", {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0
}, {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.inOut"
})
.fromTo(".heading-4", 0.5, {
    "border-right-color": "rgba(255,255,255,0.6)"
}, {
    "border-right-color": "rgba(255,255,255,0)",
    repeat: -1,
    ease: "none"
}, 0);

// Animation 5
gsap.timeline({
    scrollTrigger: {
        trigger: ".heading-5",
        start: "top 80%",
        end: "top 50%",
        markers: false,
        toggleActions: "play none none reverse"
    }
})
.fromTo(".heading-5", {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0
}, {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.inOut"
})
.fromTo(".heading-5", 0.5, {
    "border-right-color": "rgba(255,255,255,0.5)"
}, {
    "border-right-color": "rgba(255,255,255,0)",
    repeat: -1,
    ease: "none"
}, 0);

// Animation 6
gsap.timeline({
    scrollTrigger: {
        trigger: ".heading-6",
        start: "top 80%",
        end: "top 50%",
        markers: false,
        toggleActions: "play none none reverse"
    }
})
.fromTo(".heading-6", {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0
}, {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.inOut"
})
.fromTo(".heading-6", 0.5, {
    "border-right-color": "rgba(255,255,255,0.4)"
}, {
    "border-right-color": "rgba(255,255,255,0)",
    repeat: -1,
    ease: "none"
}, 0);

// Animation 7
gsap.timeline({
    scrollTrigger: {
        trigger: ".heading-7",
        start: "top 80%",
        end: "top 50%",
        markers: false,
        toggleActions: "play none none reverse"
    }
})
.fromTo(".heading-7", {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0
}, {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.inOut"
})
.fromTo(".heading-7", 0.5, {
    "border-right-color": "rgba(255,255,255,0.3)"
}, {
    "border-right-color": "rgba(255,255,255,0)",
    repeat: -1,
    ease: "none"
}, 0);

// Animation 8
gsap.timeline({
    scrollTrigger: {
        trigger: ".heading-8",
        start: "top 80%",
        end: "top 50%",
        markers: false,
        toggleActions: "play none none reverse"
    }
})
.fromTo(".heading-8", {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0
}, {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.inOut"
})
.fromTo(".heading-8", 0.5, {
    "border-right-color": "rgba(255,255,255,0.2)"
}, {
    "border-right-color": "rgba(255,255,255,0)",
    repeat: -1,
    ease: "none"
}, 0);



// Pink wrapper background animation
gsap.timeline({
    scrollTrigger: {
        trigger: ".pink-wraper",
        start: "top 0%",
        end: "top 30%",
        markers: false,
        scrub: true,
        toggleActions: "play none none reverse"
        }
    })
    .fromTo(".pink-wraper", {
        backgroundSize: "80%"
    }, {
        backgroundSize: "640%",
        backgroundPosition: "center 0px",
        duration: 1,
        ease: "power1.inOut"
    });
});




