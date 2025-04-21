let timeData = [];

fetch("./data.json")
  .then((response) => {
    if (!response.ok) return console.log("Oops! Something went wrong");
    return response.json();
  })
  .then((data) => {
    console.log(data);
    timeData = data;
    renderCards("weekly");
  });

function renderCards(timeframe) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  timeData.forEach((item) => {
    const { title, timeframes } = item;
    const current = timeframes[timeframe].current;
    const previous = timeframes[timeframe].previous;
    const titleClass = title.toLowerCase().replace(/\s+/g, "-");
    const card = document.createElement("div");
    card.className = `activity background ${titleClass}`;

    card.innerHTML = `
    
          <div class="stat-grid">
            <div class="title">
              <p class="text-preset-5-m">${title}</p>
              <img src="./images/icon-ellipsis.svg" alt="Ellipsis Icon" />
            </div>
            <div class="stats">
              <p class="text-preset-3">${current}hrs</p>
              <p class="text-preset-6">Last ${
                timeframe === "daily"
                  ? "day"
                  : timeframe === "weekly"
                  ? "Week"
                  : "month"
              }: ${previous}hrs</p>
            </div>
          </div>
    
    `;

    container.appendChild(card);
  });
}

document.querySelectorAll("#timeframe-controls button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.timeframe;
    renderCards(selected);

    document
      .querySelectorAll("#timeframe-controls button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
