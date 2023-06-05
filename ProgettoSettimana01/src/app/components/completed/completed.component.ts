import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  constructor(private todoSrv: TodoService) { }

  newList: Todo[]=[];
  newTask!: string;
  check: boolean = true;

  async prova() {
    console.log(this.check);
    this.newList = await this.todoSrv.getFiltered(true);
    if (this.newList != undefined) {
        this.check = true;
    }
  }

  ngOnInit(): void {
    this.prova();
  }

  ngOnChange(): void {}

  async add() {
    const task: Todo = {
        id: 1,
        title: this.newTask,
        completed: true,
    };
    console.log(this.newTask);
    this.todoSrv.add(task);
    this.prova();
}

async delete(id: number) {
  const task: Todo = { id: id, title: 'go', completed: true };
  this.todoSrv.remove(task);
  this.prova();
  console.log(this.newList);
}

}
