import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { Post } from '../post';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  constructor(private srv : UtilsService) { }

  @Input()
  userId : string = ' ';

  tasks: Task[] = [{ id: 0, title: '', completed: true }];

  posts: Post[] = [{ id: 0, title: '', body: '' }];

  subTask : Subscription = new Subscription();

  subPost : Subscription = new Subscription();

  subUpdateTask : Subscription = new Subscription();

  taskClicked : boolean = false;

  postClicked : boolean = false;


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
    console.log("Yeah its arrived here")
  }

  ngOnDestroy() {
    this.subUpdateTask.unsubscribe();
    this.subPost.unsubscribe();
    this.subTask.unsubscribe();
  }

}
