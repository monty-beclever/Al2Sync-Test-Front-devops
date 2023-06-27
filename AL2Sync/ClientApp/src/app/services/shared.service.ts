import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  arrayOfObjects: any[] = [];
  sortingValue:string = "";
  sortingDirection:string = "asc";
  previousSortingValue:string = "";
  closingModal:boolean = false;
  filterObject:any;
  backendFilter:any;

  initialValue: number = 0;
  lastValue:number = 0;

  width540: boolean = false;
  isMobile: boolean = false;

  selectedItem:number = -1;
  dataForEdit: any;

  isTablet:boolean = false;

  constructor(private router:Router) {
    this.backendFilter = {};
    if(window.innerWidth >= 462){
      this.width540 = true;
    }
    if(window.innerWidth < 992){
      this.isMobile = true;
    }

    this.tablewidth();
  }

  showItem(num:number, parentRef:any){
    let tableHead = parentRef.nativeElement.childNodes[0].childNodes[1];
    let tableBody = parentRef.nativeElement.childNodes[0].childNodes[2].childNodes;
    if(tableHead.nodeName == '#comment'){
      return;
    }
    this.moveTable(num, tableHead);
    tableBody.forEach((element: ElementRef<any>) => {
      this.removeComments(element);
      this.moveTable(num, element);
    });
    this.addNum(num);
  }

  removeComments(el:any){
    for(let i = 0; i < el.childNodes.length; i++){
      if(el.childNodes[i].nodeName == '#comment'){
        el.childNodes[i].remove();
      }
    }

    this.verifyForMoreComments(el);

  }

  verifyForMoreComments(el:any){
    el.childNodes.forEach((span:any) => {
      if(span.nodeName == '#comment'){
        this.removeComments(el);
      }
    });
  }

  calculateNum(num:number){
    if(window.innerWidth >= 462){
      if(num > 0){
        num = 2;
      } else {
        num = -2;
      }
    }
    if(this.isTablet){
      if(num > 0){
        num = 4;
      } else {
        num = -4;
      }
    }
    return num;
  }

  moveTable(num:number, el:any){
    num = this.calculateNum(num);

    if(this.initialValue + num <= 0){
      this.initialValue = 1;
      num = 0;
    }
    if(this.initialValue + num >= this.lastValue + 1){
      this.initialValue = this.lastValue;
      num = 0;
    }

    let end = this.initialValue + num;
    let count = 0;

    if(el.nodeName == '#comment'){
      return;
    }

    if(num > 0){
      for (let i = this.initialValue; i < end; i++){
        el.childNodes[i].classList.add('no-display');
        count++;
      }
      if(end+count < el.childNodes.length){
        for(let y = end; y < (end + count); y++){
          el.childNodes[y].classList.remove('no-display');
        }
      } else {
        for(let y = end; y < el.childNodes.length; y++){
          el.childNodes[y].classList.remove('no-display');
        }
      }

    } else if (num < 0){
      for (let i = this.initialValue - 1; i < el.childNodes.length; i++){
        el.childNodes[i].classList.add('no-display');
      }
      if(window.innerWidth >= 462){
        for(let y = (end-1); y < (this.initialValue-1); y++){
          el.childNodes[y].classList.remove('no-display');
        }
      } else {
        for(let y = end; y < this.initialValue; y++){
          el.childNodes[y].classList.remove('no-display');
        }
      }
    }


  }

  tablewidth(){
    if(window.innerWidth >= 768){
      this.isTablet = true;
    } else {
      this.isTablet = false;
    }
    if(window.innerWidth >= 462){
      this.width540 = true;
    } else {
      this.width540 = false;
    }
  }

  addNum(num:number){
    num = this.calculateNum(num);
    this.initialValue = this.initialValue + num;

    console.log('a');

    if(this.initialValue + num <= 0){
      this.initialValue = 1;
      num = 0;
    }
    if(this.initialValue + num >= this.lastValue + 1){
      this.initialValue = this.lastValue;
      num = 0;
    }
  }

  addNew(tblName: string) {
    this.router.navigate(['/'+tblName]);
  }

  sortArray(obj:any){
    if (!obj.length) return;
    let keys = Object.keys(obj[0]);
    obj.sort((a, b) => {
      if (this.sortingDirection == 'asc') {
        return (a[keys[parseInt(this.sortingValue)]].toString().toLowerCase() < b[keys[parseInt(this.sortingValue)]].toString().toLowerCase()) ? -1 : 1
      } else {
        return (a[keys[parseInt(this.sortingValue)]].toString().toLowerCase() > b[keys[parseInt(this.sortingValue)]].toString().toLowerCase()) ? -1 : 1
      }
    });
    return obj;
  }

  captureInput(e:any, arr:string[], objBackup:any){
    let inputSearch = e.target.value;
    const checkProperties = arr;
    let searchRegex: any;
    if (!inputSearch) {
      return objBackup;
    }
    searchRegex = new RegExp(inputSearch, 'gi');
    const filteredTransactionsData = objBackup.filter((item: any)=> {
      return checkProperties.some(property => {
        if (!item || !item[property]) {
          return null;
        } else {
          return item[property].toString().match(searchRegex);
        }
      })
    })
    return filteredTransactionsData;
  }

  setInputSearchClasses(state: boolean) {
    return {
      'inactive-input': state,
      'input-search-container': true
    }
  }
}
