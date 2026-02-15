/* ================================================================
   Tutorial Detail Page — Load MD, render with marked.js, copy btn
   ================================================================ */

(function () {
    // Get tutorial ID from URL
    var params = new URLSearchParams(window.location.search);
    var tutorialId = params.get('id');

    if (!tutorialId) {
        showError();
        return;
    }

    // Configure marked
    marked.setOptions({
        breaks: true,
        gfm: true,
        highlight: function (code, lang) {
            if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }
            if (typeof hljs !== 'undefined') {
                return hljs.highlightAuto(code).value;
            }
            return code;
        }
    });

    // Load tutorial index
    fetch('content/tutorials/index.json')
        .then(function (res) { return res.json(); })
        .then(function (tutorials) {
            var currentIndex = -1;
            var tutorial = null;

            for (var i = 0; i < tutorials.length; i++) {
                if (tutorials[i].id === tutorialId) {
                    tutorial = tutorials[i];
                    currentIndex = i;
                    break;
                }
            }

            if (!tutorial) {
                showError();
                return;
            }

            // Update page title
            document.title = tutorial.title_zh + ' · 斯乌苏';

            // Render header
            renderHeader(tutorial);

            // Render prev/next nav
            renderNav(tutorials, currentIndex);

            // Load and render markdown
            return fetch(tutorial.md)
                .then(function (res) {
                    if (!res.ok) throw new Error('MD not found');
                    return res.text();
                })
                .then(function (md) {
                    renderContent(md);
                });
        })
        .catch(function () {
            showError();
        });

    function renderHeader(tutorial) {
        var header = document.getElementById('tutorial-header');
        if (!header) return;

        header.innerHTML =
            '<a href="tutorials.html" class="back-link" data-zh="&larr; 返回教程列表" data-en="&larr; Back to Tutorials" onclick="event.preventDefault(); if (history.length > 1) { history.back(); } else { location.href=\'tutorials.html\'; }">&larr; 返回教程列表</a>' +
            '<h1 data-zh="' + tutorial.title_zh + '" data-en="' + tutorial.title_en + '">' + tutorial.title_zh + '</h1>' +
            '<div class="tutorial-detail-meta">' +
                '<span class="tutorial-card-date" data-zh="' + tutorial.date + '" data-en="' + tutorial.date_en + '">' + tutorial.date + '</span>' +
                '<span class="tutorial-card-tag" data-zh="' + tutorial.tag_zh + '" data-en="' + tutorial.tag_en + '">' + tutorial.tag_zh + '</span>' +
                (tutorial.xiaohongshu
                    ? '<a href="' + tutorial.xiaohongshu + '" target="_blank" rel="noopener" class="xhs-link" data-zh="在小红书查看视频 &rarr;" data-en="Watch on Xiaohongshu &rarr;">在小红书查看视频 &rarr;</a>'
                    : '') +
            '</div>';
    }

    function renderContent(md) {
        var container = document.getElementById('tutorial-content');
        if (!container) return;

        container.innerHTML = marked.parse(md);

        // Add copy buttons to all code blocks
        container.querySelectorAll('pre').forEach(function (pre) {
            var wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';

            var btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.textContent = '复制';
            btn.setAttribute('data-zh', '复制');
            btn.setAttribute('data-en', 'Copy');

            btn.addEventListener('click', function () {
                var code = pre.querySelector('code');
                var text = code ? code.textContent : pre.textContent;
                navigator.clipboard.writeText(text).then(function () {
                    btn.textContent = '已复制!';
                    btn.classList.add('copied');
                    setTimeout(function () {
                        btn.textContent = typeof currentLang !== 'undefined' && currentLang === 'en' ? 'Copy' : '复制';
                        btn.classList.remove('copied');
                    }, 2000);
                });
            });

            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
            wrapper.appendChild(btn);
        });
    }

    function renderNav(tutorials, currentIndex) {
        var nav = document.getElementById('tutorial-nav');
        if (!nav) return;

        var prev = currentIndex < tutorials.length - 1 ? tutorials[currentIndex + 1] : null;
        var next = currentIndex > 0 ? tutorials[currentIndex - 1] : null;

        var html = '';

        if (prev) {
            html += '<a href="tutorial.html?id=' + prev.id + '" class="tutorial-nav-item prev">' +
                '<span class="tutorial-nav-label" data-zh="上一篇" data-en="Previous">上一篇</span>' +
                '<span class="tutorial-nav-title" data-zh="' + prev.title_zh + '" data-en="' + prev.title_en + '">' + prev.title_zh + '</span>' +
            '</a>';
        } else {
            html += '<div></div>';
        }

        if (next) {
            html += '<a href="tutorial.html?id=' + next.id + '" class="tutorial-nav-item next">' +
                '<span class="tutorial-nav-label" data-zh="下一篇" data-en="Next">下一篇</span>' +
                '<span class="tutorial-nav-title" data-zh="' + next.title_zh + '" data-en="' + next.title_en + '">' + next.title_zh + '</span>' +
            '</a>';
        }

        nav.innerHTML = html;
    }

    function showError() {
        var content = document.getElementById('tutorial-content');
        if (content) {
            content.innerHTML = '<div style="text-align:center;padding:4rem 0;color:var(--text-secondary);">' +
                '<p style="font-size:1.1rem;margin-bottom:1rem;" data-zh="教程未找到" data-en="Tutorial not found">教程未找到</p>' +
                '<a href="tutorials.html" class="btn btn-outline" data-zh="返回教程列表" data-en="Back to Tutorials">返回教程列表</a>' +
            '</div>';
        }
    }
})();
