document.addEventListener('DOMContentLoaded', function() {
    const petalsContainer = document.getElementById('petals');
    const cta = document.querySelector('.cta');
    
    if (cta) {
        cta.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const size = Math.random() * 8 + 6;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 4000 + 6000;
        const delay = Math.random() * 2000;
        
        petal.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}px;
            animation-duration: ${duration}ms;
            animation-delay: ${delay}ms;
        `;
        
        petalsContainer.appendChild(petal);
        
        setTimeout(() => petal.remove(), duration + delay);
    }
    
    for (let i = 0; i < 20; i++) {
        setTimeout(createPetal, i * 300);
    }
    
    setInterval(createPetal, 800);
});

console.log('%c 🌸 AsterIDE — Blooming Soon ', 'background: linear-gradient(135deg, #ff82b4, #ff5a96); color: #1a0f14; font-size: 14px; padding: 10px 20px; border-radius: 8px; font-weight: 600;');
