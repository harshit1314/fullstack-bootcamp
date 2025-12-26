import { Task } from "./types.js";

// 1. Define Valid Hooks (Events a plugin can listen to)
export interface PluginHooks {
  onAdd?: (task: Task) => void;
  onComplete?: (taskId: string) => void;
}

// 2. The Plugin Interface
export interface TaskPlugin {
  name: string;
  version: string;
  setup: (hooks: PluginHooks) => void;
}

// 3. A Simple "Logger" Plugin (Example)
export const LoggerPlugin: TaskPlugin = {
  name: "SimpleLogger",
  version: "1.0.0",
  setup: (hooks) => {
    // When a task is added, print a message
    hooks.onAdd = (task) => {
      console.log(`[PLUGIN-LOG] New Task Created: "${task.title}"`);
    };
    
    // When a task is completed, celebrate
    hooks.onComplete = (id) => {
      console.log(`[PLUGIN-LOG] Task ${id} was finished! 🚀`);
    };
  }
};
