import { Component } from '@angular/core';
import {StoreService} from "./store/services/StoreService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StoreService]
})
export class AppComponent {
  title = 'frontend';
}
