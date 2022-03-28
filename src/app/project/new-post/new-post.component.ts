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

  subPosts : Subscription = new Subscription();

  subPost : Subscription  = new Subscription();

  idParam : string = '';

  post : Post = {id:0, title:'', body:''};

  posts : Post[] = [{id:0, title:'', body:''}];

  postId : number = 5;

  setId = () => {
    this.postId = this.postId++
    return this.postId
  }

  create(title: string, body: string) {
    this.post.body = body;
    this.post.title = title;
    this.post.id = this.setId();  

    this.posts = [...this.posts, this.post];

    this.subPost = this.srv.updateUserPosts(this.idParam, this.posts)
  .subscribe((data) => {console.log(data)});

  console.log(this.posts);
  console.log(this.idParam)
  }

  ngOnInit(): void {
    this.subParams =  this.ar.params.subscribe(params => {
      this.idParam = params["id"];

      this.subPosts  = this.srv.getUser(this.idParam).subscribe((data:User) => {
        this.posts = data.posts; 

      });
    })
  }


  ngOnDestroy() {
    this.subParams.unsubscribe();
    this.subPost.unsubscribe();
    this.subPosts.unsubscribe();
  }
}
