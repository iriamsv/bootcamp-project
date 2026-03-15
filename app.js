console.log("JS funcionando");

/* -------------------- ELEMENTOS -------------------- */

const taskList = document.getElementById("tasks");
const filterButtons = document.querySelectorAll("#filtersBar button");

const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const pendingTasks = document.getElementById("pending-tasks");
const progressBar = document.getElementById("progressBar");

const openModal = document.getElementById("openModal");
const modal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");

const saveTask = document.getElementById("saveTask");
const modalTitle = document.getElementById("modalTaskTitle");
const modalCategory = document.getElementById("modalTaskCategory");
const modalDate = document.getElementById("modalTaskDate");

const categoryButton = document.getElementById("categoryButton");
const categorySelect = document.getElementById("categorySelect");

const calendar = document.getElementById("calendar");

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

/* -------------------- ESTADO -------------------- */

let currentCategory = "all";
let currentFilter = "all";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let searchText = "";

/* -------------------- DARK MODE -------------------- */

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

themeToggle.addEventListener("click", () => {

  document.documentElement.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

});

/* ------------------ CATEGORÍAS ----------------- */

categoryButton.addEventListener("click", () => {
  categorySelect.classList.toggle("hidden");

  document.addEventListener("click", (e) => {

  const clickedInsideButton = categoryButton.contains(e.target);
  const clickedInsideSelect = categorySelect.contains(e.target);

  if (!clickedInsideButton && !clickedInsideSelect) {
    categorySelect.classList.add("hidden");
  }

});


});

categorySelect.addEventListener("change", () => {

  currentCategory = categorySelect.value;

  categorySelect.classList.add("hidden");

  renderTasks();
  renderCalendar();

});

/* ----------------------- BÚSQUEDA ----------------------- */

searchButton.addEventListener("click", () => {

  const hidden = searchInput.classList.contains("hidden");

  if (hidden) {

    searchInput.classList.remove("hidden");

    filtersBar.querySelectorAll("button").forEach(btn => {
      btn.classList.add("hidden");
    });

    searchInput.classList.add("search-appear");

    searchInput.focus();

  } else {

    searchInput.classList.add("hidden");

    filtersBar.querySelectorAll("button").forEach(btn => {
      btn.classList.remove("hidden");
    });

    searchInput.classList.remove("search-appear");

    searchInput.value = "";
    searchText = "";

    renderTasks();
  }

});


/* -------------------- FILTROS -------------------- */

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    currentFilter = button.dataset.filter;
    renderTasks();
    renderCalendar();

  });

});

/* -------------------- MODAL -------------------- */

openModal.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

/* -------------------- CREAR TAREA -------------------- */

saveTask.addEventListener("click", () => {

  const title = modalTitle.value.trim();
  if (title === "") return;

  const task = {
    id: Date.now(),
    title: title,
    category: modalCategory.value,
    date: modalDate.value,
    completed: false
  };

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  modalTitle.value = "";
  modalDate.value = "";

  modal.classList.add("hidden");

  renderTasks();
  renderCalendar();

});

/* -------------------- RENDERIZAR TAREAS -------------------- */

function renderTasks() {

  taskList.innerHTML = "";

  let filteredTasks = [...tasks];

  /* ordenar tareas */

  filteredTasks.sort((a, b) => {

    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;

    return new Date(a.date) - new Date(b.date);

  });

  /* filtros */

  if (currentFilter === "pending") {
    filteredTasks = filteredTasks.filter(t => !t.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = filteredTasks.filter(t => t.completed);
  }

  if (currentCategory !== "all") {
    filteredTasks = filteredTasks.filter(t => t.category === currentCategory);
  }

  if (searchText !== "") {
    filteredTasks = filteredTasks.filter(t =>
      t.title.toLowerCase().includes(searchText)
    );
  }

  /* render */

  filteredTasks.forEach(task => {

    const li = document.createElement("li");

    li.className =
    "task flex items-center gap-4 border-2 border-black dark:border-white rounded-[20px] px-5 py-4";

    li.draggable = true;
    li.dataset.id = task.id;

    /* drag */

    li.addEventListener("dragstart", () => {
      li.classList.add("dragging");
    });

    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");
      saveNewOrder();
    });

    /* checkbox */

    const checkbox = document.createElement("div");
    checkbox.className = "custom-checkbox cursor-pointer";
    checkbox.tabIndex = 0;

    if (task.completed) checkbox.classList.add("checked");

    checkbox.addEventListener("click", toggleTask);

    checkbox.addEventListener("keydown", e => {

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTask();
      }

    });

    function toggleTask() {

      task.completed = !task.completed;

      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
      renderCalendar();

    }

    /* texto */

    const span = document.createElement("span");
    span.textContent = task.title;

    const textContainer = document.createElement("div");
    textContainer.className = "flex flex-col flex-1";

    const meta = document.createElement("div");
    meta.className = "flex gap-3 text-xs text-gray-500";

    const category = document.createElement("span");
    category.textContent = task.category;

    const date = document.createElement("span");
    date.textContent = task.date;

    meta.appendChild(category);
    meta.appendChild(date);

    textContainer.appendChild(span);
    textContainer.appendChild(meta);

    /* eliminar */

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Eliminar";

    deleteBtn.className =
    "bg-black text-white rounded-full px-4 py-1 text-sm hover:opacity-80";

    deleteBtn.addEventListener("click", () => {

      li.classList.add("removing");

      setTimeout(() => {

        tasks = tasks.filter(t => t.id !== task.id);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTasks();
        renderCalendar();

      }, 250);

    });

    li.appendChild(checkbox);
    li.appendChild(textContainer);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

  });

  updateStats();

}

/* -------------------- DRAGOVER -------------------- */

taskList.addEventListener("dragover", e => {

  e.preventDefault();

  const dragging = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(taskList, e.clientY);

  if (afterElement == null) {
    taskList.appendChild(dragging);
  } else {
    taskList.insertBefore(dragging, afterElement);
  }

});

/* -------------------- ORDEN -------------------- */

function getDragAfterElement(container, y) {

  const elements = [...container.querySelectorAll(".task:not(.dragging)")];

  return elements.reduce((closest, child) => {

    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }

  }, { offset: Number.NEGATIVE_INFINITY }).element;

}

function saveNewOrder() {

  const newOrder = [];

  document.querySelectorAll("#tasks li").forEach(li => {

    const id = Number(li.dataset.id);
    const task = tasks.find(t => t.id === id);

    if (task) newOrder.push(task);

  });

  tasks = newOrder;

  localStorage.setItem("tasks", JSON.stringify(tasks));

}

/* -------------------- ESTADÍSTICAS -------------------- */

function updateStats() {

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  pendingTasks.textContent = pending;

  if (progressBar) {

    progressBar.style.width =
      total === 0 ? "0%" : (completed / total) * 100 + "%";

  }

}

/* -------------------- CALENDARIO -------------------- */

function renderCalendar() {

  if (!calendar) return;

  calendar.innerHTML = "";

  const days = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  days.forEach(day => {
    const el = document.createElement("div");
    el.classList.add("day-name");
    el.textContent = day;
    calendar.appendChild(el);
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= totalDays; d++) {

    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = d;

    /* marcar día actual */

    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      day.classList.add("today");
    }

    /* comprobar si hay tarea ese día */

    const hasTask = tasks.some(task => {

      if (!task.date || task.completed) return false;

      const taskDate = new Date(task.date);

      return (
        taskDate.getDate() === d &&
        taskDate.getMonth() === month &&
        taskDate.getFullYear() === year
      );

    });

    if (hasTask) {
      day.classList.add("has-task");
    }

    calendar.appendChild(day);

  }

}

/* -------------------- ESC -------------------- */

document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {

    // cerrar buscador
    if (!searchInput.classList.contains("hidden")) {

      searchInput.classList.add("hidden");

      filtersBar.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("hidden");
      });

      searchInput.value = "";
      searchText = "";
      renderTasks();
    }

    // cerrar categorías
    if (!categorySelect.classList.contains("hidden")) {
      categorySelect.classList.add("hidden");
    }

    // cerrar modal
    if (!modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
    }

  }

});


/* -------------------- INICIALIZAR -------------------- */

renderTasks();
renderCalendar();
