(() => {
  const layer = document.querySelector("[data-search-layer]");
  const openButtons = document.querySelectorAll("[data-search-open]");
  const closeButton = document.querySelector("[data-search-close]");
  const input = document.querySelector(".search-input");
  const results = document.querySelector("[data-search-results]");

  const tasteSearchIndex = [
    {
      title: "North London, Finally",
      href: "#top",
      desc: "阿森纳 2025/26 英超冠军第二版，85 分收官。"
    },
    {
      title: "二十二年等待",
      href: "#season",
      desc: "从接近冠军到真正赢下冠军，阿森纳完成身份更新。"
    },
    {
      title: "David Raya",
      href: "#facts",
      desc: "19 场零封，金手套，冠军防线的安静底线。"
    },
    {
      title: "冠军质感",
      href: "#craft",
      desc: "防守、压力管理、重复动作，构成这支球队的冠军质感。"
    },
    {
      title: "官方来源",
      href: "#sources",
      desc: "英超官方冠军确认、赛季总结与捧杯说明。"
    }
  ];

  const render = (items) => {
    if (!results) return;
    results.innerHTML = "";
    items.forEach((item) => {
      const link = document.createElement("a");
      link.className = "search-result";
      link.href = item.href;
      link.innerHTML = `<strong>${item.title}</strong><small>${item.desc}</small>`;
      link.addEventListener("click", closeSearch);
      results.appendChild(link);
    });
  };

  function openSearch() {
    if (!layer || !input) return;
    layer.classList.add("active");
    layer.setAttribute("aria-hidden", "false");
    input.value = "";
    render(tasteSearchIndex);
    input.focus();
  }

  function closeSearch() {
    if (!layer) return;
    layer.classList.remove("active");
    layer.setAttribute("aria-hidden", "true");
  }

  openButtons.forEach((button) => button.addEventListener("click", openSearch));
  closeButton?.addEventListener("click", closeSearch);
  layer?.addEventListener("click", (event) => {
    if (event.target === layer) closeSearch();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSearch();
  });

  input?.addEventListener("input", (event) => {
    const term = event.target.value.trim().toLowerCase();
    const matches = tasteSearchIndex.filter((item) => {
      return `${item.title} ${item.desc}`.toLowerCase().includes(term);
    });
    render(term ? matches : tasteSearchIndex);
  });

  const revealItems = document.querySelectorAll("section, .fact-run article, .mosaic-note, .line-item");
  revealItems.forEach((item) => item.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }
})();
