/* BSides Limburg — site behaviour. Content toggles live in config.js. */
(function () {
  "use strict";
  var C = window.BSIDES || {};
  var base = document.body.getAttribute("data-base") || "";
  var page = document.body.getAttribute("data-page") || "";
  var home = base + "index.html";
  var onHome = page === "home";
  var h = function (anchor) { return onHome ? anchor : home + anchor; };

  function ticketHref() {
    var t = C.tickets || {};
    if (t.status === "live" && t.shopUrl) return t.shopUrl;
    return h("#tickets");
  }

  /* ---------- Header ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var links = [
      ["About", base + "about.html", "about"],
      ["Tickets", h("#tickets"), ""],
      ["Schedule", base + "schedule.html", "schedule"],
      ["CFP", h("#cfp"), ""],
      ["Venue", h("#venue"), ""],
      ["Sponsors", h("#sponsors"), ""],
    ];
    var nav = links.map(function (l) {
      return '<a class="nav-link" href="' + l[1] + '"' + (l[2] && l[2] === page ? ' aria-current="page"' : "") + ">" + l[0] + "</a>";
    }).join("");
    var here = location.pathname.replace(/\/$/, "/index.html");
    var archiveItems = (C.archive || []).map(function (e) {
      var cur = here.slice(-e.path.length) === e.path;
      return '<a class="dd-link" href="' + base + e.path + '"' + (cur ? ' aria-current="page"' : "") + ">" + e.label + "</a>";
    }).join("") + '<a class="dd-link dd-all" href="' + h("#editions") + '">All editions</a>';
    nav += '<div class="nav-dd">' +
      '<button class="nav-link dd-toggle" type="button" aria-expanded="false" aria-controls="archive-menu"' + (page === "archive" ? ' aria-current="page"' : "") + '>Archive<svg class="dd-caret" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<div class="dd-menu" id="archive-menu">' + archiveItems + "</div>" +
    "</div>";
    var external = (C.tickets && C.tickets.status === "live" && C.tickets.shopUrl) ? ' target="_blank" rel="noopener"' : "";
    header.className = "site-header";
    header.innerHTML =
      '<div class="tricolour" aria-hidden="true"><span></span><span></span><span></span></div>' +
      '<div class="wrap bar">' +
        '<a class="brand" href="' + home + '" aria-label="BSides Limburg home">' +
          '<img src="' + base + 'assets/img/logo-dark.png" alt="" width="61" height="44">' +
          '<span class="brand-text"><b>BSides Limburg</b>' + (C.eventDateLabel || "") + "</span>" +
        "</a>" +
        '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span></button>' +
        '<nav class="nav" id="site-nav" aria-label="Main">' + nav +
          '<a class="btn btn-sm" href="' + ticketHref() + '"' + external + ">Get tickets</a>" +
        "</nav>" +
      "</div>";

    var toggle = header.querySelector(".menu-toggle");
    var navEl = header.querySelector(".nav");
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      navEl.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
    };
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
    navEl.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setMenu(false); setDd(false); } });

    // Archive dropdown
    var dd = header.querySelector(".nav-dd");
    var ddBtn = dd.querySelector(".dd-toggle");
    var setDd = function (open) { ddBtn.setAttribute("aria-expanded", String(open)); dd.classList.toggle("open", open); };
    ddBtn.addEventListener("click", function (e) { e.stopPropagation(); setDd(ddBtn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("click", function (e) { if (!dd.contains(e.target)) setDd(false); });
    dd.addEventListener("focusout", function (e) { if (!dd.contains(e.relatedTarget)) setDd(false); });

    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Footer ---------- */
  var footer = document.getElementById("site-footer");
  if (footer) {
    var ct = C.contact || {};
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          "<div>" +
            '<img src="' + base + 'assets/img/logo-dark.png" alt="BSides Limburg" width="100" height="72">' +
            "<p>A non-profit, volunteer-run security conference in Hasselt. Part of the worldwide Security BSides community.</p>" +
          "</div>" +
          "<div><h4>Event</h4><ul>" +
            '<li><a href="' + h("#tickets") + '">Tickets</a></li>' +
            '<li><a href="' + base + 'schedule.html">Schedule</a></li>' +
            '<li><a href="' + h("#cfp") + '">Call for Papers</a></li>' +
            '<li><a href="' + h("#venue") + '">Venue</a></li>' +
            '<li><a href="' + h("#faq") + '">FAQ</a></li>' +
          "</ul></div>" +
          "<div><h4>Community</h4><ul>" +
            '<li><a href="' + base + 'about.html">About</a></li>' +
            '<li><a href="' + base + 'code-of-conduct.html">Code of Conduct</a></li>' +
            '<li><a href="' + h("#sponsors") + '">Sponsors</a></li>' +
            '<li><a href="' + h("#editions") + '">Previous editions</a></li>' +
          "</ul></div>" +
          "<div><h4>Contact</h4><ul>" +
            (ct.email ? '<li><a href="mailto:' + ct.email + '">' + ct.email + "</a></li>" : "") +
            (ct.linkedin ? '<li><a href="' + ct.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></li>' : "") +
            '<li><a href="https://bsides.org/" target="_blank" rel="noopener">Security BSides</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " BSides Limburg</span><span>Made in Limburg · Hosted on GitHub Pages</span></div>" +
      "</div>";
  }

  /* ---------- Generic bindings from config ---------- */
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    var path = el.getAttribute("data-bind").split(".");
    var v = path.reduce(function (o, k) { return o ? o[k] : undefined; }, C);
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-href]").forEach(function (el) {
    var path = el.getAttribute("data-href").split(".");
    var v = path.reduce(function (o, k) { return o ? o[k] : undefined; }, C);
    if (v) el.setAttribute("href", v);
  });

  /* ---------- Countdown ---------- */
  var cd = document.querySelector("[data-countdown]");
  if (cd && C.eventStart) {
    var target = new Date(C.eventStart).getTime();
    var units = { d: cd.querySelector("[data-d]"), h: cd.querySelector("[data-h]"), m: cd.querySelector("[data-m]"), s: cd.querySelector("[data-s]") };
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var tick = function () {
      var diff = target - Date.now();
      if (diff <= 0) {
        cd.outerHTML = '<p class="countdown-done">// Doors are open. See you at ' + ((C.venue && C.venue.name) || "the venue") + ".</p>";
        return false;
      }
      units.d.textContent = Math.floor(diff / 864e5);
      units.h.textContent = pad(Math.floor(diff / 36e5) % 24);
      units.m.textContent = pad(Math.floor(diff / 6e4) % 60);
      units.s.textContent = pad(Math.floor(diff / 1e3) % 60);
      return true;
    };
    if (tick()) { var iv = setInterval(function () { if (!tick()) clearInterval(iv); }, 1000); }
  }

  /* ---------- Status helpers ---------- */
  function pill(el, cls, text) { if (!el) return; el.className = "pill" + (cls ? " " + cls : ""); el.textContent = text; }

  /* ---------- Tickets (Weezevent) ---------- */
  var t = C.tickets || {};
  var ticketState = {
    soon: ["", "Opening soon", "Ticket sale opens soon"],
    live: ["live", "On sale now", "Tickets on sale"],
    soldout: ["closed", "Sold out", "Sold out"],
  }[t.status] || ["", "Opening soon", "Ticket sale opens soon"];
  document.querySelectorAll("[data-ticket-pill]").forEach(function (el) { pill(el, ticketState[0], ticketState[1]); });
  document.querySelectorAll("[data-ticket-label]").forEach(function (el) { el.textContent = ticketState[2]; });
  document.querySelectorAll("[data-ticket-link]").forEach(function (el) {
    el.setAttribute("href", ticketHref());
    if (t.status === "live" && t.shopUrl) { el.target = "_blank"; el.rel = "noopener"; }
  });

  var tw = document.getElementById("ticket-widget");
  if (tw && t.status === "live" && t.widgetSrc) {
    // Official Weezevent "neo" widget integration: an anchor that weez.js
    // replaces with a responsive iframe.
    var m = t.widgetSrc.match(/\/ticket\/E?(\d+)/);
    tw.innerHTML =
      '<div class="embed-light">' +
        '<a title="Weezevent ticketing" href="' + (t.shopUrl || "https://www.weezevent.com/?c=sys_widget") + '" class="weezevent-widget-integration"' +
        ' data-src="' + t.widgetSrc + '"' +
        (m ? ' data-id="' + m[1] + '"' : "") +
        ' data-width="650" data-height="600" data-resize="1" data-width_auto="1" data-noscroll="0" data-use-container="yes" data-type="neo" target="_blank">' +
        "Open the ticket shop</a>" +
      "</div>";
    var ws = document.createElement("script");
    ws.src = "https://widget.weezevent.com/weez.js";
    ws.async = true;
    document.body.appendChild(ws);
  } else if (tw && t.status === "live" && t.shopUrl) {
    var h3 = tw.querySelector("h3"); if (h3) h3.textContent = "Tickets are on sale";
    var tp = tw.querySelector("[data-ticket-placeholder-text]"); if (tp) tp.textContent = "Tickets are sold through our Weezevent shop.";
    var sb = tw.querySelector("[data-shop-btn]"); if (sb) { sb.href = t.shopUrl; sb.hidden = false; }
    var fb = tw.querySelector("[data-follow-btn]"); if (fb) fb.classList.add("btn-ghost");
  } else if (tw && t.status === "soldout") {
    var ph = tw.querySelector("h3"); if (ph) ph.textContent = "Sold out";
    var pp = tw.querySelector("[data-ticket-placeholder-text]"); if (pp) pp.textContent = "All tickets are gone. Keep an eye on LinkedIn: returned tickets are re-released there.";
  }

  /* ---------- CFP ---------- */
  var cfp = C.cfp || {};
  var cfpState = {
    soon: ["", "Opening soon", "The Call for Papers opens soon. Start drafting: we want talks from first-time speakers as much as from seasoned ones."],
    open: ["live", "Open now", "Submissions are open" + (cfp.deadline ? " until " + cfp.deadline : "") + ". Pitch us a talk, a demo or a war story."],
    closed: ["closed", "Closed", "The Call for Papers is closed. Thanks to everyone who submitted. The schedule is coming soon."],
  }[cfp.status] || ["", "Opening soon", ""];
  document.querySelectorAll("[data-cfp-pill]").forEach(function (el) { pill(el, cfpState[0], cfpState[1]); });
  document.querySelectorAll("[data-cfp-text]").forEach(function (el) { el.textContent = cfpState[2]; });
  document.querySelectorAll("[data-cfp-label]").forEach(function (el) {
    el.textContent = { soon: "Opens soon", open: "Open now", closed: "Closed" }[cfp.status] || "Opens soon";
  });
  document.querySelectorAll("[data-cfp-link]").forEach(function (el) {
    if (cfp.url) el.setAttribute("href", cfp.url);
    if (cfp.status === "open") el.textContent = el.getAttribute("data-open-text") || el.textContent;
  });

  /* ---------- Schedule (pretalx widget) ---------- */
  var s = C.schedule || {};
  document.querySelectorAll("[data-schedule-pill]").forEach(function (el) { pill(el, s.live ? "live" : "", s.live ? "Published" : "Coming soon"); });
  document.querySelectorAll("[data-schedule-label]").forEach(function (el) { el.textContent = s.live ? "Schedule is out" : "Announced after the CFP"; });

  var sw = document.getElementById("schedule-widget");
  if (sw && s.live && s.pretalxEvent) {
    var ev = s.pretalxEvent.replace(/\/?$/, "/");
    sw.innerHTML =
      '<div class="embed-light">' +
        '<pretalx-schedule event-url="' + ev + '" locale="en" format="grid" style="--pretalx-clr-primary: #0a0a0b"></pretalx-schedule>' +
        '<noscript><div class="pretalx-widget"><div class="pretalx-widget-info-message">JavaScript is disabled in your browser. ' +
        'To access our schedule without JavaScript, please <a target="_blank" href="' + ev + 'schedule/">click here</a>.</div></div></noscript>' +
      "</div>";
    var ps = document.createElement("script");
    ps.src = ev + "widgets/schedule.js";
    document.body.appendChild(ps);
  }
  document.querySelectorAll("[data-pretalx-link]").forEach(function (el) {
    if (s.pretalxEvent) el.setAttribute("href", s.pretalxEvent.replace(/\/?$/, "/") + "schedule/");
  });
})();
