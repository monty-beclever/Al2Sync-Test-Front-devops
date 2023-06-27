import { Component, HostBinding, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';

import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translateY(0%)'
      })),
      state('closed', style({
        transform: 'translateY(-100%)'
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.4s')
      ]),
    ])
  ]
})
export class NotificationComponent implements OnInit {
  active: boolean = false;
  constructor(public errorService: ErrorService) { }

  ngOnInit(): void {
  }
  onAnimationEvent(event: AnimationEvent) {
    if (event.phaseName === "done" && event.toState === "closed") {
      this.active = false;
      this.errorService.clearNotification();
    }
    if (event.phaseName === "start" && event.toState === "open") {
      this.active = true;
      setTimeout(()=> {
        this.errorService.closeNotification()
      }, 2000)
    }
  }

  getClasses() {
    return {
      "notification": true,
      "error": this.errorService.notificationType === "error",
      "login-error": this.errorService.notificationType === "login-error",
      "success": this.errorService.notificationType === "success",
      "inactive": !this.active
    }
  }

}
