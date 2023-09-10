document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");

  const coordinatesAndMessages = [
    { id: 1, x: 23, y: 70, text: "Променад", class: "blue" },
    { id: 2, x: 30, y: 23, text: "Гостиница", class: "blue" },
    { id: 3, x: 36, y: 45, text: "Стадион", class: "green" },
    { id: 4, x: 56, y: 60, text: "Столовая", class: "blue" },
    { id: 5, x: 58, y: 78, text: "Фитнес", class: "green" },
    { id: 6, x: 60, y: 37, text: "Станция", class: "green" },
    { id: 7, x: 68, y: 65, text: "Помощь", class: "green" },
    { id: 8, x: 71, y: 17, text: "ЖК", class: "blue" },
    { id: 9, x: 83, y: 70, text: "СПА", class: "blue" }
  ];

  let activeSpan = null; // Храним активный "+"

  function createPlus(parent) {
    const plusminus = document.createElement("span");
    plusminus.className = `plusminus`;
    return (parent.append(plusminus));
  }

  // Создаем "+"-спаны под координаты в процентах
  coordinatesAndMessages.forEach((coordAndMessage) => {
    const plusSpan = document.createElement("span");

    createPlus(plusSpan)

    plusSpan.className = `span-container ${coordAndMessage.class}`;
    plusSpan.setAttribute("id", coordAndMessage.id);
    plusSpan.style.left = coordAndMessage.x + "%";
    plusSpan.style.top = coordAndMessage.y + "%";

    container.appendChild(plusSpan);

  });

  container.addEventListener("click", (event) => {
    if (event.target.classList.contains("span-container") || event.target.classList.contains("plusminus")) {
      let clickedSpan;
      event.target.classList.contains("span-container") ? clickedSpan = event.target : clickedSpan = event.target.offsetParent;

      if (activeSpan === clickedSpan) {
        // Если нажат тот же, возвращем к обычному виду
        clickedSpan.textContent = "";
        createPlus(clickedSpan);
        clickedSpan.classList.remove('clicked');
        activeSpan = null;
      } else {

        // Убираем с другого выбранного 
        if (activeSpan) {
          activeSpan.textContent = "";
          createPlus(activeSpan);
          activeSpan.classList.remove('clicked');
        }

        // Нажимаем выбранный
        activeSpan = clickedSpan;
        const spanObject = coordinatesAndMessages.find(x => x.id == `${activeSpan.getAttribute("id")}`);
        clickedSpan.innerHTML += spanObject.text;
        clickedSpan.classList.add('clicked');
      }

    } else if (activeSpan) {
      // Клик снаружи "+" спана
      activeSpan.textContent = "";
      createPlus(activeSpan);
      activeSpan.classList.remove('clicked');
      activeSpan = null;
    }
  })
});