(function () {
  var root = document.documentElement;
  document.getElementById("themeToggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  var phrases = [
    "building multi-agent systems",
    "evaluating LLM reliability",
    "studying at UW, Seattle",
    "turning data into decisions"
  ];
  var hacks = ["LA Hacks", "UW Datathon", "Databricks × UW", "Philips Code to Care"];
  var hackEl = document.getElementById("hackName"), h = 0;
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(function () {
      hackEl.classList.add("out");
      setTimeout(function () {
        h = (h + 1) % hacks.length;
        hackEl.textContent = hacks[h];
        hackEl.classList.remove("out");
      }, 300);
    }, 2000);
  } else {
    hackEl.textContent = hacks.join(" · ");
  }

  var el = document.getElementById("typed");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var p = 0, i = phrases[0].length, deleting = true;
  function tick() {
    i += deleting ? -1 : 1;
    el.textContent = phrases[p].slice(0, i);
    if (deleting && i === 0) { deleting = false; p = (p + 1) % phrases.length; }
    else if (!deleting && i === phrases[p].length) { deleting = true; return setTimeout(tick, 2200); }
    setTimeout(tick, deleting ? 35 : 70);
  }
  setTimeout(tick, 2200);
})();
