import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOn, Subscription } from 'rxjs';
import { User } from '../user';
import { Task } from '../task';
import { UtilsService } from '../utils.service';
import { Post } from '../post';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(
    private ar: ActivatedRoute,
    private srv: UtilsService,
    private router: Router
  ) {}

  subParams: Subscription = new Subscription();

  subUpdateTask: Subscription = new Subscription();

  postClicked: boolean = false;

  taskClicked: boolean = false;

  subTask: Subscription = new Subscription();

  subPost: Subscription = new Subscription();

  tasks: Task[] = [{ id: 0, title: '', completed: true }];

  posts: Post[] = [{ id: 0, title: '', body: '' }];

  @Input()
  userId: string = '';

  complete(id: number) {
    this.tasks.map((task) => {
      if (task.id == id) {
        task.completed = true;
      }
    });
    this.subUpdateTask = this.srv
      .updateUserTodos(this.userId, this.tasks)
      .subscribe(() => {});
  }

  addPost() {
    this.postClicked = !this.postClicked;
  }

  addTask() {
    this.taskClicked = !this.taskClicked;
  }

  ngOnInit(): void {
    this.subTask  = this.srv.getUser(this.userId).subscribe((data:User) => {
      this.tasks = data.tasks;
    });
    this.subPost  = this.srv.getUser(this.userId).subscribe((data:User) => {
      this.posts = data.posts;
    });
  }

  ngOnDestroy() {
    this.subParams.unsubscribe();
    this.subPost.unsubscribe();
    this.subUpdateTask.unsubscribe();
  }
}
