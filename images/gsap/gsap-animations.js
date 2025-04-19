// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for the first set of scrolling text animations
    const textTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.scrolling-text-container',
            start: 'top 65%',
            end: 'bottom 65%',
            scrub: 1.5,
            markers: true
        }
    });

    // Add animations to the timeline for continuous scrolling
    textTimeline
        .to('.left-to-right', {
            x: '100%', // Move completely to the right
            ease: 'none', // Linear movement for continuous effect
            duration: 1,
            repeat: -1 // Infinite repetition
        })
        .to('.right-to-left', {
            x: '-100%', // Move completely to the left
            ease: 'none', // Linear movement for continuous effect
            duration: 1,
            repeat: -1 // Infinite repetition
        }, '<'); // Start at the same time as previous animation

    // Create a timeline for the second set of scrolling text animations
    const textTimeline2 = gsap.timeline({
        scrollTrigger: {
            trigger: '.scrolling-text-container2',
            start: 'top 65%',
            end: 'bottom 65%',
            scrub: 1.5,
            markers: true
        }
    });

    // Add animations to the second timeline for continuous scrolling
    textTimeline2
        .to('.left-to-right2', {
            x: '100%',
            ease: 'none',
            duration: 1,
            repeat: -1
        })
        .to('.right-to-left2', {
            x: '-100%',
            ease: 'none',
            duration: 1,
            repeat: -1
        }, '<');

    // Add a subtle fade-in effect for the text
    gsap.from('.scroll-text', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.scrolling-text-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Fade-in section animation
    gsap.to('.fade-in-section', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.fade-in-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}); 