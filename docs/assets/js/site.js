(() => {
  const doc = document.documentElement;
  const storedTheme = localStorage.getItem("arsenal-theme");
  if (storedTheme) {
    doc.setAttribute("data-theme", storedTheme);
  }

  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = doc.getAttribute("data-theme") === "dark" ? "light" : "dark";
      doc.setAttribute("data-theme", current);
      localStorage.setItem("arsenal-theme", current);
      toggle.setAttribute("aria-pressed", current === "dark" ? "true" : "false");
    });
  }

  const searchOverlay = document.querySelector(".search-overlay");
  const searchOpeners = document.querySelectorAll("[data-search-open]");
  const searchClose = document.querySelector("[data-search-close]");
  const searchInput = document.querySelector(".search-input");
  const resultsEl = document.querySelector(".search-results");

  const searchIndex = [
    {
      title: "Arteta: Control the Game in Phases",
      url: "article-arteta-presser.html",
      section: "News Hub · Press Conference",
      snippet: "Arteta highlights emotional control, five-lane spacing, and protecting the box.",
      tags: ["press", "arteta", "tactical"]
    },
    {
      title: "League Cup Semi: Arsenal 2-0 Chelsea",
      url: "article-cup-win.html",
      section: "News Hub · Reports",
      snippet: "Disciplined mid-block, set-piece leverage, and standout performances seal the win.",
      tags: ["report", "league cup", "chelsea"]
    },
    {
      title: "Next Fixture: Sunderland Preview",
      url: "match-sunderland.html",
      section: "Match Center · Previews",
      snippet: "Rotation considerations, press triggers, and match tempo targets.",
      tags: ["preview", "sunderland", "fixture"]
    },
    {
      title: "Standings Snapshot",
      url: "match-standings.html",
      section: "Match Center · Standings",
      snippet: "Points gap analysis and form trend line for the top four.",
      tags: ["table", "standings", "snapshot"]
    },
    {
      title: "Squad: Player Detail - Bukayo Saka",
      url: "player-saka.html",
      section: "Squad · First Team",
      snippet: "Role profile, key traits, and tactical usage map.",
      tags: ["player", "saka"]
    },
    {
      title: "Squad: Player Detail - Martin Odegaard",
      url: "player-odegaard.html",
      section: "Squad · First Team",
      snippet: "Creative hub, press leadership, and passing lanes.",
      tags: ["player", "odegaard"]
    },
    {
      title: "Club: Community Impact",
      url: "club-community.html",
      section: "Club · Community",
      snippet: "示例内容: grassroots coaching, education programs, and social initiatives.",
      tags: ["club", "community"]
    },
    {
      title: "News: Transfer Desk",
      url: "news-transfers.html",
      section: "News Hub · Transfers",
      snippet: "示例内容: roster balance, scouting reports, and window priorities.",
      tags: ["transfers", "news"]
    },
    {
      title: "Match Center: Fixtures",
      url: "match-fixtures.html",
      section: "Match Center · Fixtures",
      snippet: "Upcoming fixtures with key tactical hooks and broadcast notes.",
      tags: ["fixtures"]
    }
  ];

  const openSearch = () => {
    if (!searchOverlay) return;
    searchOverlay.classList.add("active");
    searchOverlay.setAttribute("aria-hidden", "false");
    if (searchInput) {
      searchInput.value = "";
      renderResults(searchIndex);
      searchInput.focus();
    }
  };

  const closeSearch = () => {
    if (!searchOverlay) return;
    searchOverlay.classList.remove("active");
    searchOverlay.setAttribute("aria-hidden", "true");
  };

  const renderResults = (items) => {
    if (!resultsEl) return;
    resultsEl.innerHTML = "";
    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "notice";
      empty.textContent = "No matches. Try a broader term.";
      resultsEl.appendChild(empty);
      return;
    }
    items.forEach((item) => {
      const link = document.createElement("a");
      link.className = "search-result";
      link.href = item.url;
      link.innerHTML = `<strong>${item.title}</strong><small>${item.section}</small><span>${item.snippet}</span>`;
      resultsEl.appendChild(link);
    });
  };

  searchOpeners.forEach((btn) => btn.addEventListener("click", openSearch));
  if (searchClose) searchClose.addEventListener("click", closeSearch);
  if (searchOverlay) {
    searchOverlay.addEventListener("click", (event) => {
      if (event.target === searchOverlay) closeSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const term = event.target.value.toLowerCase().trim();
      const results = searchIndex.filter((item) => {
        return (
          item.title.toLowerCase().includes(term) ||
          item.section.toLowerCase().includes(term) ||
          item.snippet.toLowerCase().includes(term) ||
          item.tags.some((tag) => tag.toLowerCase().includes(term))
        );
      });
      renderResults(term ? results : searchIndex);
    });
  }

  const page = document.body.getAttribute("data-page");
  if (page) {
    document.querySelectorAll(`.bottom-nav a[data-page="${page}"]`).forEach((link) => {
      link.classList.add("active");
    });
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.body.classList.add("is-loading");
  window.addEventListener("load", () => {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-loaded");
  });

  if (!prefersReduced) {
    document.querySelectorAll("a[href]").forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }
      anchor.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        document.body.classList.add("is-leaving");
        setTimeout(() => {
          window.location.href = href;
        }, 220);
      });
    });
  }
})();
