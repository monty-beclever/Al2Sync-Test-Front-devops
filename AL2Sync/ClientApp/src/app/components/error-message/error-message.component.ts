import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() type: string = ''; // auth, data-fetch
  @Output() reEnter = new EventEmitter<any>();

  constructor(private router: Router,
              private location: Location) { }

  ngOnInit(): void {
  }

  reEnterUserInput() {
    if (this.type === "error") {
      location.reload();
      return;
    }
    this.reEnter.emit();
  }

  goBack() {
    this.reEnter.emit();
    this.location.back()
  }

  closeBtn() {
    if (this.type === "auth") {
      this.reEnterUserInput();
    } else if (this.type === "error") {
      this.goBack();
    }
  }

  backToPrevious(e: any) {
    e.preventDefault();
    this.goBack();
  }

  backToHomePage() {
    this.reEnter.emit();
    this.router.navigate(['/inicio'])
  }

  setClasses() {
    return {
      'container': true,
      'general-error': this.type === "error"
    }
  }

}
