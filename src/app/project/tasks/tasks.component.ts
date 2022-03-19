import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(private ar : ActivatedRoute, private srv : UtilsService) { }

  param : string = '';

  subParams : Subscription = new Subscription();

  subTask : Subscription = new Subscription();

  subPost : Subscription = new Subscription();

  tasks : Task[] = [{id:0, title:'', completed:true}];

  posts : Post[] = [{id:0, title:'', body:''}];

  ngOnInit(): void {
  this.subParams =  this.ar.params.subscribe(params => {
        let id = params['id'];
        this.param = id;

        this.subTask  = this.srv.getUser(this.param).subscribe((data:User) => {
          this.tasks = data.tasks; 
        });
        this.subPost  = this.srv.getUser(this.param).subscribe((data:User) => {
          this.posts = data.posts; 
        });
    });
  }

  ngOnDestroy() {
    this.subParams.unsubscribe();
    this.subPost.unsubscribe();
  }

}
