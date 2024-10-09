const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold snowflakes
let snowflakesArray = [];
const numSnowflakes = 20;

// Snowflake class
class Snowflake {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size; // Size of the snowflake
        this.speed = speed; // Falling speed
    }
    update() {
        this.y += this.speed; // Move downwards
        if (this.y > canvas.height) {
            this.y = 0; // Reset to top
            this.x = Math.random() * canvas.width; // Random x position
        }
    }
    draw() {
        ctx.font = `${this.size}px Arial`; // Set font size
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // White color
        ctx.fillText('❄️', this.x, this.y); // Draw snowflake
    }
}

// Initialize snowflakes
function init() {
    for (let i = 0; i < numSnowflakes; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 20 + 10; // Random size between 10 and 30
        const speed = Math.random() * 2 + 1; // Random speed between 1 and 3
        snowflakesArray.push(new Snowflake(x, y, size, speed));
    }
}

// Animate snowflakes
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    snowflakesArray.forEach((snowflake) => {
        snowflake.update();
        snowflake.draw();
    });
    requestAnimationFrame(animate);
}

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    snowflakesArray = [];
    init();
});

// Initialize and animate
init();
animate();