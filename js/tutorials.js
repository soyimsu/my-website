/* ================================================================
   Tutorials List Page — Load index.json, render cards, tag filter
   ================================================================ */

(function () {
    var allTutorials = [];
    var activeTag = 'all';

    fetch('content/tutorials/index.json')
        .then(function (res) { return res.json(); })
        .then(function (tutorials) {
            allTutorials = tutorials;
            renderFilterTags(tutorials);
            renderTutorials(tutorials);
        })
        .catch(function () {
            var grid = document.getElementById('tutorials-grid');
            if (grid) {
                grid.innerHTML = '<p style="text-align:center;color:var(--text-secondary);grid-column:1/-1;">暂无教程内容</p>';
            }
        });

    function renderFilterTags(tutorials) {
        var container = document.getElementById('filter-tags');
        if (!container) return;

        // Collect unique tags
        var tagsZh = ['全部'];
        var tagsEn = ['All'];
        var tagMap = { '全部': 'All' };
        tutorials.forEach(function (t) {
            if (tagsZh.indexOf(t.tag_zh) === -1) {
                tagsZh.push(t.tag_zh);
                tagsEn.push(t.tag_en);
                tagMap[t.tag_zh] = t.tag_en;
            }
        });

        var html = tagsZh.map(function (tag, i) {
            var isActive = (i === 0) ? ' active' : '';
            var dataVal = (i === 0) ? 'all' : tag;
            return '<button class="filter-tag' + isActive + '" data-tag="' + dataVal + '" data-zh="' + tag + '" data-en="' + tagsEn[i] + '">' + tag + '</button>';
        }).join('');

        container.innerHTML = html;

        // Bind click events
        container.querySelectorAll('.filter-tag').forEach(function (btn) {
            btn.addEventListener('click', function () {
                container.querySelectorAll('.filter-tag').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                activeTag = btn.getAttribute('data-tag');
                filterTutorials();
            });
        });
    }

    function filterTutorials() {
        var filtered = allTutorials;
        if (activeTag !== 'all') {
            filtered = allTutorials.filter(function (t) {
                return t.tag_zh === activeTag;
            });
        }
        renderTutorials(filtered);

        var emptyMsg = document.getElementById('tutorials-empty');
        if (emptyMsg) {
            emptyMsg.style.display = filtered.length === 0 ? 'block' : 'none';
        }
    }

    function renderTutorials(tutorials) {
        var grid = document.getElementById('tutorials-grid');
        if (!grid) return;

        if (tutorials.length === 0) {
            grid.innerHTML = '';
            return;
        }

        var lang = (typeof currentLang !== 'undefined') ? currentLang : 'zh';
        var isEn = lang === 'en';

        var html = tutorials.map(function (t) {
            var title = isEn ? t.title_en : t.title_zh;
            var date = isEn ? t.date_en : t.date;
            var tag = isEn ? t.tag_en : t.tag_zh;

            return '<a href="tutorial.html?id=' + t.id + '" class="tutorial-card reveal reveal-delay-' + (tutorials.indexOf(t) % 5) + '">' +
                '<div class="tutorial-card-cover">' +
                    '<span class="placeholder-icon">&#9997;</span>' +
                '</div>' +
                '<div class="tutorial-card-body">' +
                    '<h3 data-zh="' + t.title_zh + '" data-en="' + t.title_en + '">' + title + '</h3>' +
                    '<div class="tutorial-card-meta">' +
                        '<span class="tutorial-card-date" data-zh="' + t.date + '" data-en="' + t.date_en + '">' + date + '</span>' +
                        '<span class="tutorial-card-tag" data-zh="' + t.tag_zh + '" data-en="' + t.tag_en + '">' + tag + '</span>' +
                    '</div>' +
                '</div>' +
            '</a>';
        }).join('');

        grid.innerHTML = html;

        // Observe new cards for reveal animation
        grid.querySelectorAll('.reveal').forEach(function (el) {
            var obs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            obs.observe(el);
        });
    }
})();
