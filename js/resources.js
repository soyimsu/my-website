/* ================================================================
   Resources Page — Tab switching + load markdown files
   ================================================================ */

(function () {
    // Configure marked
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            breaks: true,
            gfm: true
        });
    }

    // ========== Tab Switching ==========
    var tabs = document.querySelectorAll('.resource-tab');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            // Deactivate all tabs and panels
            tabs.forEach(function (t) { t.classList.remove('active'); });
            document.querySelectorAll('.resource-panel').forEach(function (p) { p.classList.remove('active'); });

            // Activate clicked tab and corresponding panel
            tab.classList.add('active');
            var panelId = 'panel-' + tab.getAttribute('data-panel');
            var panel = document.getElementById(panelId);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });

    // ========== Load Markdown ==========
    var sections = [
        { id: 'resource-bloggers', file: 'content/resources/bloggers.md' },
        { id: 'resource-videos',   file: 'content/resources/videos.md' },
        { id: 'resource-tools',    file: 'content/resources/tools.md' }
    ];

    sections.forEach(function (section) {
        fetch(section.file)
            .then(function (res) {
                if (!res.ok) throw new Error('Not found');
                return res.text();
            })
            .then(function (md) {
                var container = document.getElementById(section.id);
                if (container && typeof marked !== 'undefined') {
                    container.innerHTML = marked.parse(md);
                    // Make all external links open in new tab
                    container.querySelectorAll('a').forEach(function (a) {
                        if (a.hostname !== window.location.hostname) {
                            a.setAttribute('target', '_blank');
                            a.setAttribute('rel', 'noopener');
                        }
                    });
                }
            })
            .catch(function () {
                var container = document.getElementById(section.id);
                if (container) {
                    container.innerHTML = '<p style="color:var(--text-secondary);">暂无内容</p>';
                }
            });
    });
})();
