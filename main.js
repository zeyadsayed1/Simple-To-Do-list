let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];
// check if localstorage has tasks
if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.tasks);
}

getDataFromLocalStorage();
submit.onclick = () => {
  if (input.value.trim("").length !== 0) {
    AddTasksToArray(input.value);
    input.value = "";
  }
};

tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("delete")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }

  // toggle class
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("id"));
    e.target.classList.toggle("done");
  }
});

function AddTasksToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  // add tasks to page
  addTasksToPage(arrayOfTasks);
  //add tasks to localStorage
  addTasksToLocalStorage(arrayOfTasks);
}

function addTasksToPage(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let taskEle = document.createElement("div");
    taskEle.className = "task";
    if (task.completed) {
      taskEle.className = "task done";
    }
    let delBtn = document.createElement("button");
    let text = document.createElement("div");
    delBtn.className = "delete";
    text.className = "text";
    taskEle.id = task.id;
    text.textContent = task.title;
    delBtn.textContent = "Delete";
    taskEle.appendChild(text);
    taskEle.appendChild(delBtn);
    tasksDiv.appendChild(taskEle);
  });
}
function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    addTasksToPage(JSON.parse(data));
  }
}
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id !== Number(taskId));
  addTasksToLocalStorage(arrayOfTasks);
}
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addTasksToLocalStorage(arrayOfTasks);
}
