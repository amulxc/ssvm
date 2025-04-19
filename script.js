// Burger menus
document.addEventListener('DOMContentLoaded', function() {
    // open
    const burger = document.querySelectorAll('.navbar-burger');
    const menu = document.querySelectorAll('.navbar-menu');

    if (burger.length && menu.length) {
        for (var i = 0; i < burger.length; i++) {
            burger[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }

    // close
    const close = document.querySelectorAll('.navbar-close');
    const backdrop = document.querySelectorAll('.navbar-backdrop');

    if (close.length) {
        for (var i = 0; i < close.length; i++) {
            close[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }

    if (backdrop.length) {
        for (var i = 0; i < backdrop.length; i++) {
            backdrop[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }
    
    // Initialize GSAP animations
    initGSAPAnimations();
});

// Function to initialize all GSAP animations
// function initGSAPAnimations() {
//     // Register ScrollTrigger plugin
//     gsap.registerPlugin(ScrollTrigger);

//     // Timeline for handling the horizontal scroll and scale animations
//     const tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: ".scroll-main",
//             pin: true,  // Pin the scroll area while scrolling horizontally
//             scrub: true,  // Sync animation with the scroll
//             end: () => "+=" + document.querySelector(".scroll-main")?.offsetWidth || 0,  // End based on the width of the section
//             markers: false,  // Debugging markers
//         }
//     });

//     // Scroll effect for horizontal movement
//     tl.to(".scroll-main", {
//         xPercent: -100 * 2,  // Move the sections horizontally (two full sections)
//         ease: "none",
//     });

//     // Scale the cards based on their position on the screen as the user scrolls
//     gsap.utils.toArray(".card").forEach(card => {
//         ScrollTrigger.create({
//             trigger: card,
//             start: "left center",  // Start the animation when the card enters the center of the viewport
//             end: "right center",  // End when the card leaves the center of the viewport
//             scrub: true,  // Synchronize animation with scroll
//             onUpdate: self => {
//                 const progress = self.progress;  // Get scroll progress

//                 // If the card is on the left or right, scale to 0.8
//                 if (progress < 0.5) {
//                     gsap.to(card, { scale: 0.8 });  // Scale down when on the left
//                 } else if (progress >= 0.5 && progress <= 1) {
//                     gsap.to(card, { scale: 1 });  // Scale up to normal size when in the center
//                 }
//             }
//         });
//     });

//     var images = gsap.utils.toArray(".scroll-img-w-text .zoomer .img-container");

//     images.forEach((image, i) => {
//         gsap.fromTo(
//             image,
//             { scale: 0.6 },
//             {
//                 scale: 1,
//                 ease: "none",
//                 force3D: true,
//                 scrollTrigger: {
//                     pin: ".scroll-img-w-text",
//                     trigger: ".scroll-img-w-text",
//                     start: "top top",
//                     end: "bottom top",
//                     scrub: 0.5,
//                     markers: true,
//                 },
//             }
//         );
//     });
//     // Pin the text container initially
//     gsap.to(".scroll-img-w-text .zoomer .text-container", {
//         yPercent: -100, // Start with the text above the viewport
//         ease: "none",
//         scrollTrigger: {
//             trigger: ".scroll-img-w-text",
//             start: $('.scroll-img-w-text .zoomer .text-container').offsetTop, // Start when .img-container reaches 100vw
//             end: () => {
//                 // Calculate the point where the text should stop scrolling
//                 const viewportHeight = window.innerHeight;
//                 const textContainerHeight = document.querySelector(".scroll-img-w-text .zoomer .text-container").offsetHeight;
//                 const stopScrollingPoint = viewportHeight - (5 * window.innerWidth) / 100 - textContainerHeight;

//                 return `+=${stopScrollingPoint}`;
//             },
//             scrub: 0.5,
//             markers: true,
//         },
//     });
// }

//   first section
// Add this script at the bottom of your index.html
// document.addEventListener("DOMContentLoaded", function() {
//     gsap.registerPlugin(ScrollTrigger);

//     // Select the text elements
//     const text1 = document.querySelector('.text1');
//     const text2 = document.querySelector('.text2');
//     const text3 = document.querySelector('.text3');

//     // Log to check if elements are selected
//     console.log(text1, text2, text3);

//     // Create the animation
//     gsap.fromTo([text1, text2, text3], 
//         { x: 0, y: 0 }, // Starting position
//         { 
//             x: 100, // Change to desired x position
//             y: 100, // Change to desired y position
//             scrollTrigger: {
//                 trigger: text1, // Element that triggers the animation
//                 start: "top top", // When the top of the trigger hits the center of the viewport
//                 end: "bottom top", // When the bottom of the trigger hits the top of the viewport
//                 scrub: true // Smooth scrubbing
//             }
//         }
//     );
// });

// // Scrolling Text Animation
// document.addEventListener('DOMContentLoaded', function() {
//     // Register ScrollTrigger plugin
//     gsap.registerPlugin(ScrollTrigger);

//     // Create a timeline for the animations
//     const textTimeline = gsap.timeline({
//         scrollTrigger: {
//             trigger: '.scrolling-text-container',
//             start: 'top center',
//             end: 'bottom center',
//             scrub: 1.5, // Increased for smoother animation
//             markers: false
//         }
//     });

//     // Add animations to the timeline
//     textTimeline
//         .to('.left-to-right', {
//             x: '100%',
//             ease: 'none',
//             duration: 1
//         })
//         .to('.right-to-left', {
//             x: '-100%',
//             ease: 'none',
//             duration: 1
//         }, '<'); // Start at the same time as the previous animation

//     // Add a subtle fade-in effect when the text comes into view
//     gsap.from('.scroll-text', {
//         opacity: 0,
//         y: 20,
//         duration: 1,
//         stagger: 0.2,
//         scrollTrigger: {
//             trigger: '.scrolling-text-container',
//             start: 'top 80%',
//             toggleActions: 'play none none reverse'
//         }
//     });
// });