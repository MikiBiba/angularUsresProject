import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Task } from './task';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8002/api/users';

  getUsers() {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: string) {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  createUser(obj: { name: string; email: string }) {
    return this.http.post(this.url, obj);
  }

  updateUser(id: string, obj: User) {
    return this.http.put(`${this.url}/${id}`, `${obj}`);
  }

  updateUserTodos(id: string, obj: Task[]) {
    let tasks = { "tasks": obj };
    return this.http.put(`${this.url}/${id}`, `${tasks}`);
  }

  updateUserPosts(id: string, obj: Post[]) {
    let posts = { "posts": obj };
    return this.http.put(`${this.url}/${id}`, posts);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
