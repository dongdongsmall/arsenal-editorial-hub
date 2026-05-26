(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const savedTheme = localStorage.getItem("arsenal-champions-theme");

  if (savedTheme === "night") {
    root.setAttribute("data-theme", "night");
    themeToggle?.setAttribute("aria-pressed", "true");
  }

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "night" ? "day" : "night";
    if (next === "night") {
      root.setAttribute("data-theme", "night");
      localStorage.setItem("arsenal-champions-theme", "night");
      themeToggle.setAttribute("aria-pressed", "true");
    } else {
      root.removeAttribute("data-theme");
      localStorage.setItem("arsenal-champions-theme", "day");
      themeToggle.setAttribute("aria-pressed", "false");
    }
  });

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 80);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealItems = document.querySelectorAll(
    ".chapter, .metric-card, .person-card, .keyword-grid article, .timeline li"
  );
  revealItems.forEach((item) => item.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const overlay = document.querySelector("[data-search-overlay]");
  const openSearchButtons = document.querySelectorAll("[data-search-open]");
  const closeSearchButton = document.querySelector("[data-search-close]");
  const searchInput = document.querySelector(".search-input");
  const searchResults = document.querySelector("[data-search-results]");

  const searchIndex = [
    {
      title: "阿森纳 2025/26 英超冠军",
      href: "#top",
      desc: "85 分收官，7 分领先曼城，二十二年后再次赢得英超。"
    },
    {
      title: "赛季主线",
      href: "#chapter-season",
      desc: "从连续三季亚军到冠军，阿尔特塔把接近变成抵达。"
    },
    {
      title: "最终积分",
      href: "#chapter-table",
      desc: "阿森纳 85 分，曼城 78 分，冠军优势为 7 分。"
    },
    {
      title: "David Raya",
      href: "#chapter-people",
      desc: "Raya 以 19 场零封获得 2025/26 英超金手套。"
    },
    {
      title: "Mikel Arteta",
      href: "#chapter-people",
      desc: "阿尔特塔带领阿森纳结束 22 年英超冠军等待。"
    },
    {
      title: "2003/04 与 2025/26",
      href: "#chapter-tactics",
      desc: "不败赛季的影子仍在，但 2026 是另一代人的冠军。"
    },
    {
      title: "官方来源",
      href: "#chapter-sources",
      desc: "英超官方冠军确认、赛季总结、捧杯日说明与 Unsplash 图片来源。"
    }
  ];

  const renderResults = (items) => {
    if (!searchResults) return;
    searchResults.innerHTML = "";
    items.forEach((item) => {
      const link = document.createElement("a");
      link.className = "search-result";
      link.href = item.href;
      link.innerHTML = `<strong>${item.title}</strong><small>${item.desc}</small>`;
      link.addEventListener("click", closeSearch);
      searchResults.appendChild(link);
    });
  };

  function openSearch() {
    if (!overlay || !searchInput) return;
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    searchInput.value = "";
    renderResults(searchIndex);
    searchInput.focus();
  }

  function closeSearch() {
    if (!overlay) return;
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
  }

  openSearchButtons.forEach((button) => button.addEventListener("click", openSearch));
  closeSearchButton?.addEventListener("click", closeSearch);
  overlay?.addEventListener("click", (event) => {
    if (event.target === overlay) closeSearch();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSearch();
  });

  searchInput?.addEventListener("input", (event) => {
    const term = event.target.value.trim().toLowerCase();
    if (!term) {
      renderResults(searchIndex);
      return;
    }
    const results = searchIndex.filter((item) => {
      return `${item.title} ${item.desc}`.toLowerCase().includes(term);
    });
    renderResults(results);
  });
})();
