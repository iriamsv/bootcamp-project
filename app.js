console.log("JS funcionando");
const tasks = [];
const form = document.getElementById("task-form");
const input = document.getElementById("task-title");
const taskList = document.getElementById("tasks");

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

  input.value = "";

  renderTasks();

});

function renderTasks() {

  taskList.innerHTML = "";

  tasks.forEach(task => {

    const li = document.createElement("li");
    li.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    deleteBtn.addEventListener("click", () => {
      const index = tasks.findIndex(t => t.id === task.id);
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

  });

}

checkbox.addEventListener("change", () => {
  task.completed = checkbox.checked;

});


