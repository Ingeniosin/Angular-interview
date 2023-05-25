import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private observablePrivate: Subject<void> = new Subject();

  get observable() {
    return this.observablePrivate.asObservable();
  }

  notify() {
    this.observablePrivate.next();
  }
}
