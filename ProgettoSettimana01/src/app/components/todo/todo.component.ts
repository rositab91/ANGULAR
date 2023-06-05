import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  newList: Todo[] = [];
  newTask!: string;
  check: boolean = false;

  constructor(private todoSrv: TodoService) { }

  ngOnInit(): void {
    this.prova();
  }

  ngOnChange(): void {}

  prova(): void {
    console.log(this.check);
    this.todoSrv.getFiltered(false).then((filteredTasks) => {
      this.newList = filteredTasks;
      if (this.newList !== undefined) {
        this.check = true;
      }
    });
  }

  add(): void {
    if (this.newTask.trim() !== '') {
      const task: Todo = {
        id: this.newList.length + 1,
        title: this.newTask,
        completed: false,
      };
      console.log(this.newTask);
      this.todoSrv.add(task).then(() => {
        this.prova();
      });
      this.newTask = '';
    } else {
      this.newTask = '';
    }
  }

  update(id: number): void {
    this.todoSrv.update(id);
    this.prova();
  }

  delete(id: number): void {
    const task: Todo = { id: id, title: 'go', completed: true };
    this.todoSrv.remove(task);
    this.prova();
    console.log(this.newList);
  }
}
