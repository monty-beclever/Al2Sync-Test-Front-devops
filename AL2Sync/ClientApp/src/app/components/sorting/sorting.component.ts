import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit, AfterViewInit {

  @Input() tableHeads: string [] = [];

  persistingSorting: boolean = false;

  constructor(private service: SharedService) { }


  ngAfterViewInit(): void {
    if(this.service.sortingValue != ""){
      let el:any = document.getElementById(this.tableHeads[parseInt(this.service.sortingValue)]);
      if(el){
        el['checked'] = true;
        this.persistingSorting = true;
      }

    }
  }

  ngOnInit(): void {

  }



  setValue(e:any){
    if(e.target.checked){
      this.service.sortingValue = e.target.value;
    }
  }

  closingModal(val:boolean){
    if(val){
    } else {
      this.service.sortingValue = this.service.previousSortingValue;
    }
    this.service.closingModal = true;
  }

}
