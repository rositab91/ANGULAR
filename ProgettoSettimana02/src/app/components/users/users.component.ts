import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { Users } from 'src/app/models/users.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

users: Users[] = [];

  constructor(private usersSrv: UsersService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.usersSrv.recupera().subscribe((_users: Users[]) =>{
        this.users = _users;
      });
    }, 1000);
  }
}

