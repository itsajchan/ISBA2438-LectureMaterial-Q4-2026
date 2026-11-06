const listEl = document.getElementById("todo-list");
const formEl = document.getElementById("todo-form");
const inputEl = document.getElementById("todo-input");

function renderTodos(todos) {
  listEl.innerHTML = "";
  if (todos.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No todos yet. Add one above!";
    listEl.appendChild(li);
    return;
  }
  todos.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(index));
    li.appendChild(deleteBtn);
    listEl.appendChild(li);
  });
}

async function loadTodos() {
  const res = await fetch("/api/todos");
  const data = await res.json();
  renderTodos(data.todos);
}

async function deleteTodo(index) {
  const res = await fetch(`/api/todos/${index}`, { method: "DELETE" });
  const data = await res.json();
  renderTodos(data.todos);
}

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const task = inputEl.value.trim();
  if (!task) return;

  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  });
  const data = await res.json();

  renderTodos(data.todos);
  inputEl.value = "";
  inputEl.focus();
});

loadTodos();
