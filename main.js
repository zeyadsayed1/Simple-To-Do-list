
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let ArrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  ArrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
GetDataFromLocalStorage();

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    DeleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
        ToggleStatusTaskWith(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
  }
});

submit.onclick = function () {
  if (input.value !== "") {
    AddTasksToArray(input.value);
    input.value = "";
  }
};
function AddTasksToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  ArrayOfTasks.push(task);
  addElementsToPageFrom(ArrayOfTasks);
  AddTasksToLocalStorageFrom(ArrayOfTasks);
}
function addElementsToPageFrom(ArrayOfTasks) {
  tasks.innerHTML = "";
  ArrayOfTasks.forEach((el) => {
    if (el.completed) {
      div.className = "task done";
    }
    let div = document.createElement("div");
    let span = document.createElement("button");
    span.className = "del";
    span.innerHTML = "Delete";
    div.className = "task";
    div.setAttribute("data-id", el.id);
    div.appendChild(document.createTextNode(el.title));
    div.appendChild(span);
    tasks.append(div);
  });
}
function AddTasksToLocalStorageFrom(ArrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(ArrayOfTasks));
}
function GetDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let task = JSON.parse(data);
    addElementsToPageFrom(task);
  }
}
function DeleteTaskWith(taskId) {
  ArrayOfTasks = ArrayOfTasks.filter((task) => task.id != taskId);
  AddTasksToLocalStorageFrom(ArrayOfTasks);
}
function ToggleStatusTaskWith(taskId) {
    for (let i = 0; i < ArrayOfTasks.length; i++) {
      if (ArrayOfTasks[i].id == taskId) {
        ArrayOfTasks[i].completed == false
          ? (ArrayOfTasks[i].completed = true)
          : (ArrayOfTasks[i].completed = false);
      }
    }
    AddTasksToLocalStorageFrom(ArrayOfTasks);
  }