// Particle Animation for Background
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Fade in and out
            this.opacity += Math.random() * 0.02 - 0.01;
            if (this.opacity < 0.3) this.opacity = 0.3;
            if (this.opacity > 0.8) this.opacity = 0.8;
        }

        draw() {
            ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }

    animate();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
// Initialize Particle Animation on Page Load
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('.submit-button');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Formaning standart yuborilishini to'xtatamiz

        // Submit tugmasini vaqtincha o'chirib qo'yamiz
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // Formadan ma'lumotlarni olish
        const formData = new FormData(form);

        // SMS-consent checkbox qiymatini "Yes" yoki "No" sifatida o'zgartirish
        formData.set('sms-consent', formData.get('sms-consent') ? 'Yes' : 'No');

        // Apps Script URL'ga so'rov yuborish
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            if (result === 'Success') {
                // Muvaffaqiyatli xabar ko'rsatish
                alert('Thank you! Your message has been sent successfully.');
                form.reset(); // Formani tozalash
            } else {
                // Xato xabarini ko'rsatish
                alert('Error: ' + result);
            }
        })
        .catch(error => {
            // Tarmoq xatosi bo'lsa
            alert('Error: Something went wrong. Please try again later.');
            console.error('Error:', error);
        })
        .finally(() => {
            // Submit tugmasini qayta faollashtirish
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        });
    });
});