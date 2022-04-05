import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private srv : UtilsService) { }

  sub : Subscription = new Subscription();

  ngOnInit(): void {
    this.sub = this.srv.getUsers().subscribe((data:any) => {
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
