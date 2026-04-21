

function addTask() {
  let input = document.getElementById("taskInput");
  let value = input.value;

  if (value === "") return;

  let li = document.createElement("li");
  li.innerText = value;

  // ✅ Toggle complete
  li.onclick = function() {
    if (li.style.textDecoration === "line-through") {
      li.style.textDecoration = "none";
    } else {
      li.style.textDecoration = "line-through";
    }
    saveData();
  };

  // ✅ Delete button
  let btn = document.createElement("button");
  btn.innerText = "Delete";

  btn.onclick = function(e) {
    e.stopPropagation(); // prevent li click
    li.remove();
    saveData();
  };

  li.appendChild(btn);

  document.getElementById("list").appendChild(li);

  input.value = "";

  saveData();
}

// ✅ Save function
function saveData() {
  localStorage.setItem("tasks", document.getElementById("list").innerHTML);
}

// ✅ Load data on refresh
window.onload = function() {
  let list = document.getElementById("list");
  list.innerHTML = localStorage.getItem("tasks");

  // 🔁 Fix delete buttons
  let buttons = document.querySelectorAll("li button");

  buttons.forEach(function(btn) {
    btn.onclick = function(e) {
      e.stopPropagation();
      btn.parentElement.remove();
      saveData();
    };
  });

  // 🔁 Fix toggle
  let items = document.querySelectorAll("li");

  items.forEach(function(li) {
    li.onclick = function() {
      if (li.style.textDecoration === "line-through") {
        li.style.textDecoration = "none";
      } else {
        li.style.textDecoration = "line-through";
      }
      saveData();
    };
  });
};
