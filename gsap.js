document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for the animations
    const textTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.scrolling-text-container',
            start: 'top 100%',
            end: 'bottom -230%',
            repeat: -1,
            scrub: 1.2,
            markers: true
        }
    });

    // Add animations to the timeline
    textTimeline
        .to('.left-to-right', {
            x: '150%',
            ease: 'power2.out',
            // duration: 1
        })
        .to('.right-to-left', {
            x: '-150%',
            ease: 'power2.out',
            // duration: 1
        }, '<');

    // Add a subtle fade-in effect when the text comes into view
    gsap.from('.scroll-text', {
        // opacity: 0,
        y: 20,
        duration: 1,
        // stagger: 0.2,
        scrollTrigger: {
            trigger: '.scrolling-text-container',
            start: 'top 80%',
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
      markers: true,    // Show markers for debugging (optional)
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
      markers: true,    // Show markers for debugging (optional)
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
        markers: true, // Show markers for debugging
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
        markers: true, // Show markers for debugging
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


// Create a reusable text reveal animation function for repeated sections
function createTextRevealAnimation(selector, options = {}) {
    const defaults = {
        duration: 3.5,
        delay: 0,
        ease: "power2.inOut",
        cursorColor: "rgba(255,255,255,0.75)"
    };
    
    const settings = { ...defaults, ...options };
    
    const tl = gsap.timeline({ paused: true });
    
    // Create unique ScrollTrigger for each instance
    const st = ScrollTrigger.create({
        trigger: selector,
        start: "bottom top", // Start when bottom of element hits top of viewport
        end: "top 20%", // End when top of element hits 20% from top of viewport
        onEnter: () => {
            // Text reveal animation
            tl.fromTo(selector, {
                clipPath: "inset(0 100% 0 0)", // Start fully clipped from right
                opacity: 0
            }, {
                clipPath: "inset(0 0% 0 0)", // Reveal to full width
                opacity: 1,
                duration: settings.duration,
                delay: settings.delay,
                ease: settings.ease
            }, 0);
            
            // Text cursor animation
            tl.fromTo(selector, 0.5, {
                "border-right-color": settings.cursorColor
            }, {
                "border-right-color": "rgba(255,255,255,0)",
                repeat: -1,
                ease: "none"
            }, 0);
            
            tl.play();
        },
        // Add markers for debugging
        markers: true,
        // Add toggle actions for better control
        toggleActions: "play pause reverse pause"
    });
    
    // Store ScrollTrigger instance for cleanup
    tl.scrollTrigger = st;
    
    return tl;
}

// Initialize text reveal animations for different sections with custom options
const typewriterAnim = createTextRevealAnimation(".anim-typewriter", {
    duration: 1.2,
    delay: 0.2
});

const lineAnim = createTextRevealAnimation(".line-1", {
    duration: 1.5,
    cursorColor: "rgba(255,255,255,0.9)"
});

// Add cleanup function
    function cleanupAnimations() {
        [typewriterAnim, lineAnim].forEach(anim => {
            if (anim.scrollTrigger) {
                anim.scrollTrigger.kill();
            }
        });
    }
//slider

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
      invalidateOnRefresh: true
    }
  })
  .add(sliderTl);


});




