import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post';
import { UtilsService } from '../utils.service';
import { User } from '../user';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private ar : ActivatedRoute, private srv : UtilsService) { }

  subParams : Subscription  = new Subscription();

  subPost : Subscription = new Subscription();

  idParam : string = '';

  post : Post = {id:0, title:'', body:''};

  posts : Post[] = [{id:0, title:'', body:''}];

  create(title: string, body: string) {
    let newPost = {title: title, body: body};
    
  }

  ngOnInit(): void {
    this.subParams =  this.ar.params.subscribe(params => {
      this.idParam = params["id"];

      this.subPost  = this.srv.getUser(this.idParam).subscribe((data:User) => {
        this.posts = data.posts; 

        console.log(this.posts)
      });
    })
  }
}
