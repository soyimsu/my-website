/* ================================================================
   斯乌苏 · AI Content Creator — Global Logic
   Navigation, language toggle, mobile menu
   ================================================================ */

// ========== Language Toggle ==========
let currentLang = 'zh';

function toggleLang() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';

    document.querySelectorAll('[data-zh]').forEach(function (el) {
        var text = el.getAttribute('data-' + currentLang);
        if (text !== null) {
            el.innerHTML = text;
        }
    });

    var langBtn = document.querySelector('.nav-lang');
    if (langBtn) {
        langBtn.textContent = currentLang === 'zh' ? 'EN / 中' : '中 / EN';
    }

    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
}

// ========== Mobile Menu Toggle ==========
function toggleMenu() {
    var navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('open');
    }
}

// Close mobile menu when clicking a nav link
document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var menu = document.querySelector('.nav-links');
            if (menu) {
                menu.classList.remove('open');
            }
        });
    });
});

// ========== Active Nav Link ==========
(function () {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.addEventListener('DOMContentLoaded', function () {
        var links = document.querySelectorAll('.nav-links a');
        links.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
})();

// ========== Reveal on Scroll ==========
document.addEventListener('DOMContentLoaded', function () {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });
});

// ========== Typewriter Effect ==========
document.addEventListener('DOMContentLoaded', function () {
    var lines = document.querySelectorAll('.hero-line');
    if (lines.length === 0) return;

    var fadeEls = document.querySelectorAll('.hero-fade');
    var lineIndex = 0;

    function typeLine(line, callback) {
        var text = line.getAttribute('data-text');
        if (!text) { if (callback) callback(); return; }
        var i = 0;
        line.textContent = '';
        line.style.width = 'auto';
        line.classList.add('typing');

        // Measure full width
        line.style.visibility = 'hidden';
        line.style.width = 'auto';
        line.textContent = text;
        var fullWidth = line.offsetWidth;
        line.textContent = '';
        line.style.visibility = '';
        line.style.width = '0';

        var speed = 80;
        function typeChar() {
            if (i < text.length) {
                line.textContent = text.substring(0, i + 1);
                line.style.width = ((i + 1) / text.length * fullWidth) + 'px';
                i++;
                setTimeout(typeChar, speed);
            } else {
                line.style.width = fullWidth + 'px';
                line.classList.remove('typing');
                line.classList.add('done');
                if (callback) setTimeout(callback, 200);
            }
        }
        typeChar();
    }

    function typeNext() {
        if (lineIndex < lines.length) {
            typeLine(lines[lineIndex], function () {
                lineIndex++;
                typeNext();
            });
        } else {
            // Show fade elements after typing completes
            fadeEls.forEach(function (el) {
                el.classList.add('visible');
            });
        }
    }

    // Start after a short delay
    setTimeout(typeNext, 400);
});
