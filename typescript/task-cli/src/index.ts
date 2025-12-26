import { TaskManager } from "./TaskManager.js";
import { JsonStorage } from "./storage.js";
import { Task } from "./types.js";
import { printTasks } from "./operations.js";
import inquirer from "inquirer";
import chalk from "chalk";

async function main() {
  const storage = new JsonStorage<Task[]>("tasks.json");
  const manager = new TaskManager(storage);
  await manager.load();

  console.clear();
  console.log(chalk.blue.bold("🚀 Task CLI Manager v1.0 🚀"));

  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          { name: "📝 Add Task", value: "add" },
          { name: "📋 List All", value: "list" },
          { name: "✅ Complete Task", value: "complete" },
          { name: "🚪 Exit", value: "exit" },
        ],
      },
    ]);

    if (action === "exit") {
      console.log(chalk.green("Bye! 👋"));
      break;
    }

    if (action === "list") {
      console.log(chalk.bold("\nYour Tasks:"));
      printTasks(manager.getAll());
      console.log(""); 
    }

    if (action === "add") {
      const answers = await inquirer.prompt([
        { type: "input", name: "title", message: "Task Title:" },
        { type: "list", name: "priority", message: "Priority:", choices: ["high", "medium", "low"] }
      ]);
      await manager.add(answers.title, answers.priority);
      console.log(chalk.green("Task Created! ✨\n"));
    }

    if (action === "complete") {
      const pending = manager.query({ completed: false }).data;
      if (pending.length === 0) {
        console.log(chalk.yellow("No pending tasks!\n"));
        continue;
      }
      const { taskId } = await inquirer.prompt([
        {
          type: "list",
          name: "taskId",
          message: "Select task to complete:",
          choices: pending.map(t => ({ name: t.title, value: t.id }))
        }
      ]);
      await manager.complete(taskId);
      console.log(chalk.green("Task Completed! 🎉\n"));
    }
  }
}

main().catch(console.error);
