import { Task, Priority } from "./types.js";

// 1. Partial Search Criteria
// This means "I can search by ANY of these fields, but I don't have to provide all of them"
export interface TaskQuery {
  completed?: boolean;
  priority?: Priority;
  search?: string; // matches title
}

// 2. Generic Query Result (for future pagination)
export interface QueryResult<T> {
  data: T[];
  count: number;
}
