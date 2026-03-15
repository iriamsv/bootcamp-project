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
const filtersBar = document.getElementById("filtersBar");
const searchContainer = document.getElementById("searchContainer");


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

  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

});

/* ------------------ DESPLEGABLE CATEGORIAS ----------------- */

categoryButton.addEventListener("click", () => {
  categorySelect.classList.toggle("hidden");
});

categorySelect.addEventListener("change", () => {
  currentCategory = categorySelect.value;
  renderTasks();
  renderCalendar();
});

/* ----------------------- BÚSQUEDAS ----------------------- */

searchButton.addEventListener("click", () => {

  const isHidden = searchInput.classList.contains("hidden");

  if (isHidden) {

    // mostrar buscador
    searchInput.classList.remove("hidden");
    searchInput.classList.remove("pointer-events-none");

    // ocultar filtros
    document.querySelectorAll("#filtersBar button")
      .forEach(btn => btn.classList.add("hidden"));

    searchInput.focus();

  } else {

    // ocultar buscador
    searchInput.classList.add("hidden");
    searchInput.classList.add("pointer-events-none");

    // volver a mostrar filtros
    document.querySelectorAll("#filtersBar button")
      .forEach(btn => btn.classList.remove("hidden"));

    searchInput.value = "";
    searchText = "";
    renderTasks();

  }

});


searchInput.addEventListener("input", () => {

  searchText = searchInput.value.toLowerCase();

  renderTasks();

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
  modalCategory.value = "";
  modalDate.value = "";

  modal.classList.add("hidden");

  renderTasks();
  renderCalendar();
});

/* -------------------- RENDERIZAR TAREAS -------------------- */

function renderTasks() {

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "pending") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  if (currentCategory !== "all") {
    filteredTasks = filteredTasks.filter(task => task.category === currentCategory);
  }

  if (searchText !== "") {
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchText)
    );
  }

  filteredTasks.forEach(task => {

  const li = document.createElement("li");

  li.className =
  "task flex items-center gap-4 border-2 border-black dark:border-white rounded-[20px] px-5 py-4 cursor-pointer";








  if (task.completed) {
    li.classList.add("completed");
  }

  /* CHECKBOX PERSONALIZADO */

  const customCheckbox = document.createElement("div");
  customCheckbox.className = "custom-checkbox cursor-pointer";

  if (task.completed) {
    customCheckbox.classList.add("checked");
  }

  customCheckbox.addEventListener("click", () => {

    task.completed = !task.completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
    renderCalendar();

  });

  /* TITULO */

  const span = document.createElement("span");
  span.textContent = task.title;

  span.addEventListener("dblclick", () => {

    const newTitle = prompt("Editar tarea:", task.title);

    if (newTitle !== null && newTitle.trim() !== "") {

      task.title = newTitle.trim();

      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
      renderCalendar();
    }

  });

  /* CATEGORIA */

  const category = document.createElement("span");
  category.textContent = task.category || "";

  /* FECHA */

  const date = document.createElement("span");
  date.textContent = task.date || "";

  /* CONTENEDOR TEXTO */

  const textContainer = document.createElement("div");
  textContainer.className = "flex flex-col flex-1";

  const meta = document.createElement("div");
  meta.className = "flex gap-3 text-xs text-gray-500";

  meta.appendChild(category);
  meta.appendChild(date);

  textContainer.appendChild(span);
  textContainer.appendChild(meta);

  /* BOTON ELIMINAR */

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Eliminar";

  deleteBtn.className =
  "bg-black text-white rounded-full px-4 py-1 text-sm hover:opacity-80";

  deleteBtn.addEventListener("click", () => {

    li.classList.add("removing");

    setTimeout(() => {

       const index = tasks.findIndex(t => t.id === task.id);

       tasks.splice(index, 1);

       localStorage.setItem("tasks", JSON.stringify(tasks));

       renderTasks();
       renderCalendar();

    }, 250); // mismo tiempo que la animación

  });


  /* AÑADIR ELEMENTOS */

  li.appendChild(customCheckbox);
  li.appendChild(textContainer);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);

});

  /* -------------------- ESTADISTICAS -------------------- */

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
    pendingTasks.textContent = pending;

/* progreso */

  if (total === 0) {
    progressBar.style.width = "0%";
  } else {
    const percent = (completed / total) * 100;
    progressBar.style.width = percent + "%";
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

    // marcar día actual
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

      return taskDate.getDate() === d &&
             taskDate.getMonth() === month &&
             taskDate.getFullYear() === year;
    });

    if (hasTask) {
      day.classList.add("has-task");
    }

    calendar.appendChild(day);
  }
}

/* -------------------- INICIALIZAR -------------------- */

renderTasks();
renderCalendar();