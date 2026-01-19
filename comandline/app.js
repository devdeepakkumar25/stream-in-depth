const readline = require("readline");
const fs = require("fs").promises;
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const FILE_PATH = path.join(__dirname, "tasks.json");
let tasks = [];

/* ---------- Utility Functions ---------- */

// Read tasks from file
async function loadTasks() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    tasks = JSON.parse(data);
  } catch (error) {
    tasks = [];
  }
}

// Save tasks to file
async function saveTasks() {
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
}

// Question wrapper for async/await
function askQuestion(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

/* ---------- Menu ---------- */

async function menu() {
  console.log("\n---- To-Do List ----");
  console.log("1. Add a task");
  console.log("2. View tasks");
  console.log("3. Edit a task");
  console.log("4. Delete a task");
  console.log("5. Exit");

  const choice = await askQuestion("Choose an option: ");

  switch (choice) {
    case "1":
      await addTask();
      break;
    case "2":
      viewTasks();
      break;
    case "3":
      await editTask();
      break;
    case "4":
      await deleteTask();
      break;
    case "5":
      console.log("Exiting the application. Bye!");
      rl.close();
      return;
    default:
      console.log("Invalid choice. Try again.");
  }

  menu();
}

/* ---------- Features ---------- */

async function addTask() {
  const task = await askQuestion("Enter the task: ");
  if (task.trim() === "") {
    console.log("Task cannot be empty.");
    return;
  }
  tasks.push(task);
  await saveTasks();
  console.log("Task added successfully.");
}

function viewTasks() {
  if (tasks.length === 0) {
    console.log("\nNo tasks available.");
    return;
  }

  console.log("\nYour Tasks:");
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
}

async function editTask() {
  viewTasks();
  if (tasks.length === 0) return;

  const index = await askQuestion("Enter task number to edit: ");
  const taskIndex = Number(index) - 1;

  if (taskIndex < 0 || taskIndex >= tasks.length) {
    console.log("Invalid task number.");
    return;
  }

  const newTask = await askQuestion("Enter new task: ");
  tasks[taskIndex] = newTask;
  await saveTasks();
  console.log("Task updated successfully.");
}

async function deleteTask() {
  viewTasks();
  if (tasks.length === 0) return;

  const index = await askQuestion("Enter task number to delete: ");
  const taskIndex = Number(index) - 1;

  if (taskIndex < 0 || taskIndex >= tasks.length) {
    console.log("Invalid task number.");
    return;
  }

  const removed = tasks.splice(taskIndex, 1);
  await saveTasks();
  console.log(`Task deleted: ${removed[0]}`);
}

/* ---------- Start App ---------- */

async function startApp() {
  await loadTasks();
  menu();
}

startApp();
