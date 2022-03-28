import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOn, Subscription } from 'rxjs';
import { User } from '../user';
import { Task } from '../task';
import { UtilsService } from '../utils.service';
import { Post } from '../post';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private ar : ActivatedRoute,
     private srv : UtilsService,
     private utils : UtilsService,
     private router : Router) { }

  idParam : string = '';

  subParams : Subscription = new Subscription();

  subUpdateTask : Subscription = new Subscription();

  subTask : Subscription = new Subscription();

  subPost : Subscription = new Subscription();

  tasks : Task[] = [{id:0, title:'', completed:true}];

  posts : Post[] = [{id:0, title:'', body:''}];

  complete(id :  number) {
  this.tasks.map(task => {
    if (task.id == id) {
      task.completed = true;
    }
  })
  this.subUpdateTask = this.srv.updateUserTodos(this.idParam, this.tasks)
  .subscribe(() => {});
}

addPost() {
this.router.navigate(["newPost/" + this.idParam]);
}

addTask() {
  this.router.navigate(["newTask/" + this.idParam]);
}

  ngOnInit(): void {
  this.subParams =  this.ar.params.subscribe(params => {
        let id = params['id'];
        this.idParam = id;

        this.subTask  = this.srv.getUser(this.idParam).subscribe((data:User) => {
          this.tasks = data.tasks; 
        });
        this.subPost  = this.srv.getUser(this.idParam).subscribe((data:User) => {
          this.posts = data.posts; 
        });
    });
  }

  ngOnDestroy() {
    this.subParams.unsubscribe();
    this.subPost.unsubscribe();
    this.subUpdateTask.unsubscribe();
  }

}
