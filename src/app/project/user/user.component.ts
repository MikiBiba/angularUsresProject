import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private srv: UtilsService, private router: Router) {}

  subUpdate: Subscription = new Subscription();

  subDelete: Subscription = new Subscription();

  completed: boolean = true;

  click: boolean = false;

  otherData: boolean = false;

  @Input()
  userData: User = {
    _id: '',
    name: '',
    email: '',
    street: '',
    city: '',
    zipcode: '',
    tasks: [{ id: 0, title: '', completed: true }],
    posts: [{ id: 0, title: '', body: '' }],
  };

  update() {
    this.subUpdate = this.srv
      .updateUser(this.userData._id, this.userData)
      .subscribe(() => {
        alert('Update!');
      });
  }

  controlClick() {
    this.click = !this.click;
  }

  delete() {
    if (
      confirm(
        'Are you sure you want to delete all ' + this.userData.name + ' data?'
      )
    ) {
      this.subDelete = this.srv.deleteUser(this.userData._id).subscribe(() => {
        alert('Deleted!');
      });
    } else {
      alert('The user data is not deleted');
    }
  }

  ngOnInit(): void {
    this.userData.tasks.forEach((task) => {
      if (task.completed == false) {
        this.completed = false;
      }
    });
  }

  ngOnDestroy() {
    this.subUpdate.unsubscribe();
  }
}
