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

  task: Task = { id: 0, title: '', completed: false };

  tasks: Task[] = [{ id: 0, title: '', completed: true }];

  post: Post = { id: 0, title: '', body: '' };

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

  createPost(title: string, body: string) {
    this.post.body = body;
    this.post.title = title;
    this.posts = [...this.posts, this.post];
    this.subPost = this.srv
      .updateUserPosts(this.userId, this.posts)
      .subscribe((data) => {
      });
      alert("Post created!");
      this.postClicked = false;
    }

  createTask(title: string) {
    this.task.completed = false;
    this.task.title = title;
    this.tasks = [...this.tasks, this.task];
    this.subTask = this.srv.updateUserTodos(this.userId, this.tasks)
      .subscribe((data) => {
      });
      alert("Task created!");
      this.taskClicked = false;
  }

  ngOnInit(): void {
    this.subTask = this.srv.getUser(this.userId).subscribe((data: User) => {
      this.tasks = data.tasks;
    });
    this.subPost = this.srv.getUser(this.userId).subscribe((data: User) => {
      this.posts = data.posts;
    });
  }

  ngOnDestroy() {
    this.subParams.unsubscribe();
    this.subPost.unsubscribe();
    this.subUpdateTask.unsubscribe();
  }
}
