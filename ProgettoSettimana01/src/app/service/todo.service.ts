import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  task: Todo[] = [];

  constructor() {}

  getTask() {
    return this.task;
  }

  add(todo: Omit<Todo, 'id'>): Promise<Todo> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const newTodo: Todo = { ...todo, id: this.task.length + 1 };
        this.task.push(newTodo);
        res(newTodo);
      }, 2000);
    });
  }

  remove(tod: Omit<Todo, 'completed'>): Promise<number> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        this.task = this.task.filter((todo) => todo.id !== tod.id);
        res(tod.id);
      }, 2000);
    });
  }

  update(id: number): Promise<Todo> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        this.task[id - 1].completed = true;
        res(this.task[id - 1]);
      }, 2000);
    });
  }

  getFiltered(a: boolean): Promise<Todo[]> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (res) {
          res(this.task.filter((p) => p.completed === a));
        } else {
          rej('');
        }
      }, 2000);
    });
  }
}

