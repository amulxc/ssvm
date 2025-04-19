document.addEventListener('DOMContentLoaded', function() {

    // DOM Elements

    const daysEl = document.getElementById('days');

    const hoursEl = document.getElementById('hours');

    const minutesEl = document.getElementById('minutes');

    const secondsEl = document.getElementById('seconds');

    const currentYearEl = document.getElementById('currentYear');

    const yearSelect = document.getElementById('yearSelect');

    const progressBar = document.getElementById('progressBar');

    const progressText = document.getElementById('progressText');

    const messageEl = document.getElementById('message');

    const fireworksButton = document.getElementById('fireworksButton');

    const themeToggle = document.getElementById('themeToggle');

    const celebrationEl = document.getElementById('celebration');

    

    // Initialize particles.js

    if (typeof particlesJS !== 'undefined') {

        particlesJS('particles-js', {

            particles: {

                number: { value: 80, density: { enable: true, value_area: 800 } },

                color: { value: "#ffffff" },

                shape: { type: "circle" },

                opacity: { value: 0.5, random: true },

                size: { value: 3, random: true },

                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },

                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }

            },

            interactivity: {

                detect_on: "canvas",

                events: {

                    onhover: { enable: true, mode: "repulse" },

                    onclick: { enable: true, mode: "push" }

                }

            }

        });

    }

    

    // Populate year select options

    const currentYear = new Date().getFullYear();

    for (let i = currentYear; i <= currentYear + 10; i++) {

        const option = document.createElement('option');

        option.value = i;

        option.textContent = i;

        yearSelect.appendChild(option);

        

        if (i === currentYear + 1) {

            option.selected = true;

        }

    }

    

    // Set initial year

    let selectedYear = parseInt(yearSelect.value);

    currentYearEl.textContent = selectedYear;

    

    // Theme toggle

    themeToggle.addEventListener('click', function() {

        document.body.classList.toggle('dark-theme');

        const icon = themeToggle.querySelector('i');

        if (document.body.classList.contains('dark-theme')) {

            icon.classList.remove('fa-moon');

            icon.classList.add('fa-sun');

        } else {

            icon.classList.remove('fa-sun');

            icon.classList.add('fa-moon');

        }

    });

    

    // Year selection change

    yearSelect.addEventListener('change', function() {

        selectedYear = parseInt(this.value);

        currentYearEl.textContent = selectedYear;

        updateCountdown();

    });

    

    // Update countdown

    function updateCountdown() {

        const now = new Date();

        const newYear = new Date(`January 1, ${selectedYear} 00:00:00`);

        

        // Check if we've passed the selected new year

        if (now > newYear) {

            selectedYear++;

            yearSelect.value = selectedYear;

            currentYearEl.textContent = selectedYear;

            return updateCountdown();

        }

        

        const diff = newYear - now;

        

        // Calculate time units

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        

        // Update DOM

        daysEl.textContent = days.toString().padStart(2, '0');

        hoursEl.textContent = hours.toString().padStart(2, '0');

        minutesEl.textContent = minutes.toString().padStart(2, '0');

        secondsEl.textContent = seconds.toString().padStart(2, '0');

        

        // Calculate year progress

        const startOfYear = new Date(`January 1, ${selectedYear - 1} 00:00:00`);

        const endOfYear = new Date(`January 1, ${selectedYear} 00:00:00`);

        const totalYearDuration = endOfYear - startOfYear;

        const elapsed = now - startOfYear;

        const progressPercent = (elapsed / totalYearDuration) * 100;

        

        progressBar.style.width = `${progressPercent}%`;

        progressText.textContent = `${progressPercent.toFixed(6)}% of the year has passed`;

        

        // Update message based on time remaining

        updateMessage(days);

        

        // Request animation frame for smooth updates

        requestAnimationFrame(updateCountdown);

    }

    

    // Update motivational message

    function updateMessage(days) {

        let message = '';

        

        if (days > 60) {

            message = `There are ${days} days left until ${selectedYear}. Plenty of time to achieve your goals!`;

        } else if (days > 30) {

            message = `Only ${days} days until ${selectedYear}! Keep working on your resolutions.`;

        } else if (days > 7) {

            message = `${days} days to go! The new year is approaching fast. Make every day count!`;

        } else if (days > 1) {

            message = `Just ${days} days left! Get ready to welcome ${selectedYear} with open arms.`;

        } else if (days === 1) {

            message = "One day left! The countdown is almost over. Prepare for an amazing new year!";

        } else {

            const hours = parseInt(hoursEl.textContent);

            if (hours > 12) {

                message = "Less than a day to go! The new year is almost here!";

            } else if (hours > 6) {

                message = "Only hours remain! The excitement is building!";

            } else if (hours > 1) {

                message = "The final countdown! Get ready to celebrate!";

            } else {

                message = "It's almost time! Happy New Year!";

            }

        }

        

        messageEl.textContent = message;

    }

    

    // Fireworks celebration

    fireworksButton.addEventListener('click', function() {

        celebrate();

    });

    

    function celebrate() {

        celebrationEl.classList.add('active');

        

        // Create confetti

        for (let i = 0; i < 200; i++) {

            createConfetti();

        }

        

        // Create snowflakes

        for (let i = 0; i < 50; i++) {

            createSnowflake();

        }

        

        // Play celebration sound (if allowed)

        playCelebrationSound();

        

        // Remove celebration after animation

        setTimeout(() => {

            celebrationEl.classList.remove('active');

            celebrationEl.innerHTML = '';

        }, 5000);

    }

    

    function createConfetti() {

        const confetti = document.createElement('div');

        confetti.classList.add('confetti');

        

        // Random properties

        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

        const color = colors[Math.floor(Math.random() * colors.length)];

        const size = Math.random() * 10 + 5;

        const left = Math.random() * window.innerWidth;

        const animationDuration = Math.random() * 3 + 2;

        

        confetti.style.backgroundColor = color;

        confetti.style.width = `${size}px`;

        confetti.style.height = `${size}px`;

        confetti.style.left = `${left}px`;

        confetti.style.animationDuration = `${animationDuration}s`;

        

        celebrationEl.appendChild(confetti);

        

        // Remove after animation

        setTimeout(() => {

            confetti.remove();

        }, animationDuration * 1000);

    }

    

    function createSnowflake() {

        const snowflake = document.createElement('div');

        snowflake.classList.add('snowflake');

        snowflake.innerHTML = '❄';

        

        // Random properties

        const size = Math.random() * 20 + 10;

        const left = Math.random() * window.innerWidth;

        const animationDuration = Math.random() * 10 + 5;

        const delay = Math.random() * 5;

        const opacity = Math.random() * 0.5 + 0.5;

        

        snowflake.style.fontSize = `${size}px`;

        snowflake.style.left = `${left}px`;

        snowflake.style.animationDuration = `${animationDuration}s`;

        snowflake.style.animationDelay = `${delay}s`;

        snowflake.style.opacity = opacity;

        

        celebrationEl.appendChild(snowflake);

        

        // Remove after animation

        setTimeout(() => {

            snowflake.remove();

        }, (animationDuration + delay) * 1000);

    }

    

    function playCelebrationSound() {

        // In a real implementation, you would play an audio file here

        // For this example, we'll just log to console

        console.log("Playing celebration sound!");

    }

    

    // Social share functionality

    document.querySelectorAll('.social-icon').forEach(icon => {

        icon.addEventListener('click', function(e) {

            e.preventDefault();

            const platform = this.classList.contains('facebook') ? 'Facebook' : 

                           this.classList.contains('twitter') ? 'Twitter' : 'WhatsApp';

            alert(`Sharing to ${platform} would be implemented here!`);

        });

    });

    

    // Initialize countdown

    updateCountdown();

    

    // Check if it's exactly new year to auto-celebrate

    function checkForNewYear() {

        const now = new Date();

        if (now.getMonth() === 0 && now.getDate() === 1 && now.getHours() === 0 && now.getMinutes() < 1) {

            celebrate();

        }

    }

    

    checkForNewYear();

    

    // Add responsive adjustments

    window.addEventListener('resize', function() {

        // Any responsive adjustments can be made here

    });

});

