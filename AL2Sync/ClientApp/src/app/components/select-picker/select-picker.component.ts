import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserResponse } from 'src/app/models/responses/userResponse.model';

@Component({
  selector: 'app-select-picker',
  templateUrl: './select-picker.component.html',
  styleUrls: ['./select-picker.component.scss']
})
export class SelectPickerComponent implements OnInit {

  selectedValue: Array<UserResponse> = [];
  @Input() list: Array<any> = [];
  @Input() currentSelection: Array<UserResponse> = [];

  @Output() success = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  showAddUserForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.currentSelection.forEach(us => {
      this.addUser(us);
    })
  }

  closePicker() {
    this.close.emit(true);
  }
  confirm() {
    this.success.emit(this.selectedValue);
  }

  addUser(user) {
    if (user) {
      const isNew = this.list.find(us => us.cuit == user.cuit) ? false : true;
      if (isNew) {
        this.list.push(user);
      }
      const index = this.selectedValue.findIndex(sv => sv.cuit == user.cuit);
      if (index >= 0) {
        this.selectedValue.splice(index, 1);
      } else {
        this.selectedValue.push(user);
        const index = this.list.findIndex(us => us.cuit == user.cuit);
        setTimeout(() =>{
          const input = document.getElementById('opt' + index) as HTMLInputElement;
          input.checked = true;
        }, 100)
      }
    }
    this.showAddUserForm = false;
  }

  checkCurrentSelection(index: number, user) {
    if(this.currentSelection ) {
      const isInCurrentSelection = this.currentSelection.find(cs => cs.cuit == user.cuit) ? true : false;
      return isInCurrentSelection;
    };
    const isInSelectedList = this.selectedValue.find(sv => sv.cuit == user.cuit) ? true : false;
    return isInSelectedList;
  }
}

