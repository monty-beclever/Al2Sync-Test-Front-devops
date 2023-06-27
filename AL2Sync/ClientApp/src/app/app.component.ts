import { Component } from '@angular/core';
import { ErrorService } from './services/error.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'al2sync';

  constructor(public errorService: ErrorService) {    
  }
}
