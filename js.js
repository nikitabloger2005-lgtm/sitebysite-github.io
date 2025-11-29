// Main JavaScript for NikTweaker website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Screenshot Tabs
    const navBtns = document.querySelectorAll('.nav-btn');
    const screenshotTabs = document.querySelectorAll('.screenshot-tab');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active button
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab
            screenshotTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === `${tabName}-tab`) {
                    tab.classList.add('active');
                }
            });
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Download Buttons
    const downloadBtns = document.querySelectorAll('.btn-download');
    const downloadModal = document.getElementById('downloadModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelDownload = document.getElementById('cancelDownload');
    const fileName = document.getElementById('fileName');
    const progress = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const version = this.getAttribute('data-version');
            const fileNames = {
                'desktop': 'NikTweaker-Setup-v1.0.exe',
                'portable': 'NikTweaker-Portable-v1.0.exe'
            };
            
            fileName.textContent = fileNames[version] || 'NikTweaker.exe';
            downloadModal.style.display = 'block';
            
            // Simulate download progress
            simulateDownload();
        });
    });

    // Close modal events
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            downloadModal.style.display = 'none';
        });
    }

    if (cancelDownload) {
        cancelDownload.addEventListener('click', function() {
            downloadModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === downloadModal) {
            downloadModal.style.display = 'none';
        }
    });

    // Download progress simulation
    function simulateDownload() {
        let progressValue = 0;
        progress.style.width = '0%';
        progressText.textContent = 'Подготовка...';
        
        const interval = setInterval(() => {
            progressValue += Math.random() * 10;
            if (progressValue >= 100) {
                progressValue = 100;
                clearInterval(interval);
                progressText.textContent = 'Загрузка завершена!';
                
                // Redirect to actual download after completion
                setTimeout(() => {
                    downloadModal.style.display = 'none';
                    // In a real scenario, you would start the actual download here
                    alert('В реальном сценарии здесь началась бы загрузка файла');
                }, 1000);
            } else {
                progressText.textContent = `Загрузка... ${Math.round(progressValue)}%`;
            }
            progress.style.width = `${progressValue}%`;
        }, 200);
    }

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .download-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typewriter after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 50);
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Theme switcher (optional)
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.background = 'var(--primary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.fontSize = '1.2rem';
    themeToggle.style.boxShadow = 'var(--shadow)';
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(themeToggle);
});

// Additional utility functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Text copied to clipboard');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Export functions for global use
window.NikTweaker = {
    copyToClipboard: copyToClipboard
};