const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

function menu() {
  console.log("\n....To Do List......");
  console.log("1. Add a task");
  console.log("2. View tasks");
  console.log("3. Exit");

  rl.question("Choose an option: ", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter a task: ", (task) => {
          tasks.push(task);
          console.log(`Task added: ${task}`);
          menu();
        });
        break;

      case "2":
        if (tasks.length === 0) {
          console.log("\nNo tasks available.");
        } else {
          console.log("\nYour Tasks: ");
          tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
          });
        }
        menu();
        break;
      case "3":
        console.log("Exiting the application. Bye!");
        rl.close();
        break;
      default:
        console.log("Invalid choice. try again.");
        menu();
        break;
    }
  });
}

menu();
