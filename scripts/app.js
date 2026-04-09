const toggle = document.getElementById("seatToggle");
const ticketPopup = document.getElementById("ticketPopup");
const openTicketButtons = document.querySelectorAll(".js-open-ticket");
const closeTicketButtons = document.querySelectorAll(".js-close-ticket");
const listingPopup = document.getElementById("listingPopup");
const closeListingPopupButtons = document.querySelectorAll(".js-close-listing-popup");

if (toggle) {
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("on");
  });
}

const stadiumCanvas = document.getElementById("stadiumCanvas");
const listingCards = document.getElementById("listingCards");
const listingCount = document.getElementById("listingCount");

if (stadiumCanvas && listingCards && listingCount) {
  const ctx = stadiumCanvas.getContext("2d");
  const centerX = 410;
  const centerY = 320;

  const sections = [
    { id: "A", label: "North Stand A 3rd Flr.", start: -2.8, end: -2.15, available: true },
    { id: "B", label: "North Stand B 2nd Flr.", start: -2.1, end: -1.45, available: false },
    { id: "C", label: "North Stand C 3rd Flr.", start: -1.4, end: -0.82, available: true },
    { id: "D", label: "North Stand D 3rd Flr.", start: -0.78, end: -0.22, available: true },
    { id: "E", label: "South Stand D 3rd Flr.", start: 0.3, end: 0.95, available: true },
    { id: "F", label: "South Stand C 2nd Flr.", start: 1.02, end: 1.7, available: false },
    { id: "G", label: "South Stand B 3rd Flr.", start: 1.76, end: 2.36, available: true },
    { id: "H", label: "South Stand A 3rd Flr.", start: 2.42, end: 3.0, available: true }
  ];

  const listingData = {
    A: [
      {
        section: "Section North Stand A 3rd Flr.",
        row: "Row U",
        together: "2 tickets together",
        price: "€13",
        oldPrice: "€17",
        score: "10.0 Amazing",
        discount: "Only 3 left",
        tags: ["Best price", "Last tickets"]
      },
      {
        section: "Section North Stand A 2nd Flr.",
        row: "Row T",
        together: "2 tickets together",
        price: "€18",
        oldPrice: "€24",
        score: "",
        discount: "25% off",
        tags: ["Last tickets"]
      }
    ],
    C: [
      {
        section: "Section North Stand C 3rd Flr.",
        row: "Row M",
        together: "2 tickets together",
        price: "€30",
        oldPrice: "€42",
        score: "",
        discount: "30% off",
        tags: ["Last tickets", "Only 4 left"]
      }
    ],
    D: [
      {
        section: "Section North Stand D 3rd Flr.",
        row: "Row K",
        together: "2 tickets together",
        price: "€34",
        oldPrice: "€49",
        score: "",
        discount: "30% off",
        tags: ["Last tickets", "Only 4 left"]
      }
    ],
    E: [
      {
        section: "Section South Stand D 3rd Flr.",
        row: "Row H",
        together: "2 tickets together",
        price: "€44",
        oldPrice: "€84",
        score: "",
        discount: "47% off",
        tags: ["Last tickets"]
      }
    ],
    G: [
      {
        section: "Section South Stand B 3rd Flr.",
        row: "Row L",
        together: "2 tickets together",
        price: "€36",
        oldPrice: "€54",
        score: "",
        discount: "33% off",
        tags: ["Only 2 left"]
      }
    ],
    H: [
      {
        section: "Section South Stand A 3rd Flr.",
        row: "Row N",
        together: "2 tickets together",
        price: "€34",
        oldPrice: "€48",
        score: "",
        discount: "29% off",
        tags: ["Last tickets"]
      }
    ]
  };

  let selectedSectionId = "A";

  const drawArc = (innerR, outerR, start, end, fill, stroke = "#ffffff") => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerR, start, end);
    ctx.arc(centerX, centerY, innerR, end, start, true);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawStadium = () => {
    ctx.clearRect(0, 0, stadiumCanvas.width, stadiumCanvas.height);
    ctx.fillStyle = "#f1f3f5";
    ctx.fillRect(0, 0, stadiumCanvas.width, stadiumCanvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, 250, 0, Math.PI * 2);
    ctx.fillStyle = "#f6f8f9";
    ctx.fill();

    sections.forEach((section) => {
      const isSelected = section.id === selectedSectionId;
      const baseColor = section.available ? "#d9efc5" : "#e5e7eb";
      const activeColor = section.available ? "#95d16a" : "#d1d5db";
      drawArc(178, 244, section.start, section.end, isSelected ? activeColor : baseColor);
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 170, 0, Math.PI * 2);
    ctx.fillStyle = "#2f9e46";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(centerX - 10, centerY - 42, 20, 84);
    ctx.fillStyle = "#e3bf79";
    ctx.fill();

    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Segoe UI";
    ctx.fillText("NORTH STAND", centerX - 52, 92);
    ctx.fillText("SOUTH STAND", centerX - 52, 556);
  };

  const renderListings = () => {
    const cards = listingData[selectedSectionId] || [];
    listingCount.textContent = `${cards.length} listings`;

    if (!cards.length) {
      listingCards.innerHTML =
        '<div class="empty-tip">Is section me abhi seats available nahi hain. Kisi green section par click karke try karein.</div>';
      return;
    }

    listingCards.innerHTML = cards
      .map((item) => {
        const tags = item.tags
          .map((tag) => {
            const cls = tag.toLowerCase().includes("best") ? "listing-tag-green" : "listing-tag-pink";
            return `<span class="listing-tag ${cls}">${tag}</span>`;
          })
          .join("");

        const scoreHtml = item.score ? `<span class="listing-score">${item.score}</span>` : "";
        const discountHtml = item.discount
          ? `<span class="listing-tag listing-tag-pink">${item.discount}</span>`
          : "";

        return `
          <article class="listing-card">
            <h4 class="listing-title">${item.section}</h4>
            <p class="listing-row">${item.row}</p>
            <div class="listing-meta">
              <span>👥 ${item.together}</span>
              <span>⚡ Instant Download</span>
              <span>◉ Clear view</span>
            </div>
            <div class="listing-tags">${tags}${discountHtml}</div>
            <div class="listing-price">
              <div class="listing-price-left">
                <span class="listing-old-price">${item.oldPrice}</span>
                <span>${item.price}</span>
              </div>
              ${scoreHtml}
            </div>
          </article>
        `;
      })
      .join("");
  };

  const getClickedSection = (offsetX, offsetY) => {
    const dx = offsetX - centerX;
    const dy = offsetY - centerY;
    const radius = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx);

    if (radius < 178 || radius > 244) {
      return null;
    }

    if (angle < -Math.PI) {
      angle += Math.PI * 2;
    }

    return sections.find((section) => angle >= section.start && angle <= section.end) || null;
  };

  stadiumCanvas.addEventListener("click", (event) => {
    const rect = stadiumCanvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * stadiumCanvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * stadiumCanvas.height;
    const section = getClickedSection(x, y);

    if (!section || !section.available) {
      return;
    }

    selectedSectionId = section.id;
    drawStadium();
    renderListings();
  });

  drawStadium();
  renderListings();
}

if (ticketPopup && openTicketButtons.length) {
  const openPopup = () => {
    ticketPopup.classList.add("open");
    ticketPopup.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    ticketPopup.classList.remove("open");
    ticketPopup.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openTicketButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openPopup();
    });
  });

  closeTicketButtons.forEach((button) => {
    button.addEventListener("click", closePopup);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && ticketPopup.classList.contains("open")) {
      closePopup();
    }
  });
}

if (listingPopup) {
  const openListingPopup = () => {
    listingPopup.classList.add("open");
    listingPopup.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-modal-open");
    document.body.style.overflow = "hidden";
  };

  const closeListingPopup = () => {
    listingPopup.classList.remove("open");
    listingPopup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-modal-open");
    document.body.style.overflow = "";
  };

  openListingPopup();

  const continueButton = listingPopup.querySelector(".continue-btn");
  if (continueButton) {
    continueButton.addEventListener("click", closeListingPopup);
  }
}
