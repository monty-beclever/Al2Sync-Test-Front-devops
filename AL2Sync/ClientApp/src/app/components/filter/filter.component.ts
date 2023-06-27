import { SharedService } from 'src/app/services/shared.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filters:any;
  selected: Date = new Date();

  constructor(private service : SharedService) {

    this.setFilterObjectValues();
    this.filters = service.filterObject;
    this.service.backendFilter = {}
  }

  ngOnInit(): void {
  }

  setFilterObjectValues() {
    this.service.filterObject[0].value = null;
    this.service.filterObject[1].value = null;
    this.service.filterObject[2].value = null;
  }

  closingModal(val:boolean){
    if(val){

    } else {
      this.service.backendFilter = {};
    }
    this.service.closingModal = true;
  }

  setValue(str:string, e:any){
    this.service.backendFilter[str] = e.target.value;
  }

  deleteFilter(str:string, e:any){
    delete this.service.backendFilter[str];
    e.target.parentNode.parentNode.childNodes[0].checked = false;
  }

}
