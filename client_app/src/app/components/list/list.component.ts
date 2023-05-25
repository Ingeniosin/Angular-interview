import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileService} from "../../service/file.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy{
  public files: string[] = [];
  private subscription: Subscription;

  constructor(private client : HttpClient, private service : FileService) {
    this.updateList();
    this.subscription = this.service.observable.subscribe(this.updateList.bind(this));
  }

  private updateList() {
    this.client.get<any>('http://localhost:3000/storage/list').subscribe(x => {
      this.files = x.data;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
