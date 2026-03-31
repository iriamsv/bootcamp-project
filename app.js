console.log("JS funcionando");

/* -------------------- ELEMENTOS -------------------- */

const taskList = document.getElementById("tasks");
const filterButtons = document.querySelectorAll("#filtersBar button");
const filtersBar = document.getElementById("filtersBar"); // ✅ FIX

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
let selectedDate = null;
let searchText = "";

/* -------------------- FUNCIONES AUXILIARES -------------------- */

/**
 * Guarda las tareas en localStorage
 */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Cambia el estado de una tarea
 */
function toggleTask(task) {
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
  renderCalendar();
}

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

  // ✅ VALIDACIÓN MEJORADA
  if (!title) {
    alert("El título es obligatorio");
    return;
  }

  if (title.length < 3) {
    alert("El título debe tener al menos 3 caracteres");
    return;
  }

  const task = {
    id: Date.now(),
    title: title,
    category: modalCategory.value,
    date: modalDate.value,
    completed: false,
    important: false
  };

  tasks.push(task);
  saveTasks();

  modalTitle.value = "";
  modalDate.value = "";
  modal.classList.add("hidden");

  renderTasks();
  renderCalendar();
});

/* -------------------- RENDERIZAR TAREAS -------------------- */

/**
 * Renderiza las tareas aplicando filtros y orden
 */
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = [...tasks];

  filteredTasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;

    return new Date(a.date) - new Date(b.date);
  });

  if (currentFilter === "pending") {
    filteredTasks = filteredTasks.filter(t => !t.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = filteredTasks.filter(t => t.completed);
  }

  if (currentCategory !== "all") {
    filteredTasks = filteredTasks.filter(t => t.category === currentCategory);
  }

  if (searchText) {
    filteredTasks = filteredTasks.filter(t =>
      t.title.toLowerCase().includes(searchText)
    );
  }

  if (selectedDate) {
    filteredTasks = filteredTasks.filter(task => {
      if (!task.date) return false;

      const taskDate = new Date(task.date);

      return (
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className =
      "task flex items-center gap-4 border-2 border-black dark:border-white rounded-[20px] px-5 py-4";

    li.draggable = true;
    li.dataset.id = task.id;

    li.addEventListener("dragstart", () => {
      li.classList.add("dragging");
    });

    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");
      saveNewOrder();
    });

    const checkbox = document.createElement("div");
    checkbox.className = "custom-checkbox cursor-pointer";
    checkbox.tabIndex = 0;

    if (task.completed) checkbox.classList.add("checked");

    checkbox.addEventListener("click", () => toggleTask(task));

    checkbox.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTask(task);
      }
    });

    const span = document.createElement("span");
    span.textContent = task.title;

    if (task.completed) {
      span.classList.add("line-through", "opacity-50");
    }

    if (task.important) {
      li.style.borderColor = "#e85d75";
      li.style.backgroundColor = "#fff0f3";
    }

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

    const importantBtn = document.createElement("button");
      importantBtn.textContent = "♥";

      if (task.important) {
        importantBtn.style.color = "#e85d75";
      } else {
        importantBtn.style.color = "#1d1d1d";
      }

      importantBtn.addEventListener("click", () => {
        task.important = !task.important;
        saveTasks();
        renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.className =
      "bg-black text-white rounded-full px-4 py-1 text-sm hover:opacity-80";

    deleteBtn.addEventListener("click", () => {
      li.classList.add("removing");

      setTimeout(() => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
        renderCalendar();
      }, 250);
    });

    li.appendChild(checkbox);
    li.appendChild(textContainer);
    li.appendChild(importantBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateStats();
}

function saveNewOrder() {
  const newOrder = [];

  document.querySelectorAll("#tasks li").forEach(li => {
    const id = Number(li.dataset.id);
    const task = tasks.find(t => t.id === id);
    if (task) newOrder.push(task);
  });

  tasks = newOrder;
  saveTasks();
}

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

    const clickedDate = new Date(year, month, d);

    day.addEventListener("click", () => {
      if (
        selectedDate &&
        clickedDate.getTime() === selectedDate.getTime()
      ) {
        selectedDate = null;
      } else {
        selectedDate = clickedDate;
      }

      renderTasks();
    });

    if (
      selectedDate &&
      d === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    ) {
      day.classList.add("bg-black", "text-white");
    }

    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      day.classList.add("today");
    }

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

renderTasks();
renderCalendar();