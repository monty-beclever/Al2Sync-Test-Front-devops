import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() cardName: string = "";
  @Input() cardIcon: string = "";
  @Input() cardTitle: string = "";
  @Input() cardDescription: string = "";

  constructor() {
  }

}
