import { SharedService } from 'src/app/services/shared.service';
import { DataService } from 'src/app/services/data.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-action-modal',
  templateUrl: './table-action-modal.component.html',
  styleUrls: ['./table-action-modal.component.scss']
})
export class TableActionModalComponent implements OnInit {

  @Input() tableRow: any = {};
  @Input() tableName: string = "";
  @Input() tableRowIndex!: number;
  @Input() canDelete: boolean = false;
  @Output() delete: EventEmitter<boolean> = new EventEmitter();

  confirmDeletion: boolean = false;

  name:string = "";

  constructor(private service: SharedService,
    private dataService: DataService, private router: Router) {

  }

  ngOnInit(): void {
    switch (this.tableName){
      case 'coops':
        this.name = "cooperativa";
        break;
      case 'socios':
        this.name = "socio";
        break;
      case 'users':
        this.name = "usuario";
        break;
      default:
        this.name = "";
      break;
    }
  }

  deleteItem(){
    // const targetIndex = this.dataService.data[this.tableName].findIndex((x:any) => x.uid === this.tableRow.uid);
    // if(targetIndex > -1){
    //   this.dataService.deleteData(this.tableName, targetIndex);
    // }
    this.confirmDeletion = false;
    // this.removeActive();
    this.delete.emit(true)
  }

  removeActive(){
    let elements = document.getElementsByClassName('active');
    for(let i = 0; i < elements.length; i++){
      elements[i].classList.remove('active');
    }
    this.service.selectedItem = -1;
  }

  goToEdit() {
    this.router.navigate([`/${this.tableName}/${this.tableRowIndex}/edit`]);
  }

}
