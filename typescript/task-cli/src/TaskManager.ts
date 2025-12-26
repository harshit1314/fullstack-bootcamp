import { Task, Priority } from "./types.js";
import { createTask, markCompleted } from "./operations.js";
import { Storage } from "./storage.js";
import { TaskQuery, QueryResult } from "./query.js";
import { TaskPlugin, PluginHooks } from "./plugins.js"; // Import Plugins

export class TaskManager {
  private tasks: Map<string, Task>;
  private hooks: PluginHooks[] = []; // Store active plugins

  constructor(private storage: Storage<Task[]>) {
    this.tasks = new Map();
  }

  // --- NEW: Plugin Registration ---
  use(plugin: TaskPlugin) {
    const pluginHooks: PluginHooks = {};
    plugin.setup(pluginHooks); // Let the plugin define its hooks
    this.hooks.push(pluginHooks); // Save them
  }

  async load(): Promise<void> {
    const saved = await this.storage.load();
    if (saved) saved.forEach(t => this.tasks.set(t.id, t));
  }

  async add(title: string, priority: Priority = "medium"): Promise<Task> {
    const newTask = createTask(title, priority);
    this.tasks.set(newTask.id, newTask);
    await this.storage.save(this.getAll());

    // --- TRIGGER HOOKS ---
    this.hooks.forEach(h => h.onAdd?.(newTask));
    
    return newTask;
  }

  async complete(id: string): Promise<boolean> {
    const task = this.tasks.get(id);
    if (!task) return false;
    
    const updatedTask = markCompleted(task);
    this.tasks.set(id, updatedTask);
    await this.storage.save(this.getAll());

    // --- TRIGGER HOOKS ---
    this.hooks.forEach(h => h.onComplete?.(id));
    
    return true;
  }

  getAll(): Task[] {
    return Array.from(this.tasks.values());
  }

  query(filters: TaskQuery): QueryResult<Task> {
    // ... (Query logic remains same, condensed for brevity)
    let results = this.getAll();
    if (filters.completed !== undefined) results = results.filter(t => t.completed === filters.completed);
    return { data: results, count: results.length };
  }
}
