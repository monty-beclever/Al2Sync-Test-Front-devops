import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-table-content-message',
  templateUrl: './table-content-message.component.html',
  styleUrls: ['./table-content-message.component.scss']
})

export class TableContentMessageComponent implements OnInit {
  @Input() data: any;
  @Input() searchTextEvent: any;
  @Input() exclude?: any = [];
  
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  omit(name: string) {
    return this.exclude.includes(name);
  }

}
