import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private utils: UtilsService) {}

  sub: Subscription = new Subscription();

  subCreate: Subscription = new Subscription();

  users: User[] = [];

  clicked: boolean = false;

  filteredUsers: User[] = [];

  search(str: string) {
    this.filteredUsers = this.users.filter(
      (user) => user.name.startsWith(str) || user.email.startsWith(str)
    );
  }

  createUser(name: string, email: string) {
    let user = { name: name, email: email };
    this.subCreate = this.utils.createUser(user).subscribe(() => {
      alert('User created');
    });
    this.clicked = false;
  }

  cancelCreate() {
    this.clicked = false;
  }

  ngOnInit(): void {
    this.sub = this.utils.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  ngOnDestroy() {
    this.subCreate.unsubscribe();
  }
}
