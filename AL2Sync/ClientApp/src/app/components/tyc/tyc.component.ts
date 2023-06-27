import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tyc',
  templateUrl: './tyc.component.html',
  styleUrls: ['./tyc.component.scss']
})
export class TyCComponent implements OnInit {
  @Output() closeModal = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  closingModal() {
    this.closeModal.emit(false);
  }
}
