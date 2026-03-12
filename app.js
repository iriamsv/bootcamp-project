console.log("JS funcionando");


const form = document.getElementById("task-form");
const input = document.getElementById("task-title");
const taskList = document.getElementById("tasks");
const filterButtons = document.querySelectorAll(".filters button");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const pendingTasks = document.getElementById("pending-tasks");
let currentFilter = "all";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

form.addEventListener("submit", function (event) {

  event.preventDefault();

  const title = input.value.trim();

  if (title === "") return;

  const task = {
    id: Date.now(),
    title: title,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";

  renderTasks();

});

function renderTasks() {

  taskList.innerHTML = "";
  let filteredTasks = tasks;

    if (currentFilter === "pending") {
     filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
     filteredTasks = tasks.filter(task => task.completed);
    }


  filteredTasks.forEach(task => {

    const li = document.createElement("li");
    li.classList.add("task");

    if (task.completed) {
          li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.title;
    span.addEventListener("dblclick", () => {

     const newTitle = prompt("Editar tarea:", task.title);

        if (newTitle !== null && newTitle.trim() !== "") {
            task.title = newTitle.trim();

         localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTasks();
        }


    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;

      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
    });

    deleteBtn.addEventListener("click", () => {
      const index = tasks.findIndex(t => t.id === task.id);
      tasks.splice(index, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

  });

    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;

}

renderTasks();


