import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss']
})
export class SearchDropdownComponent implements OnInit {
  isDropdownActive: boolean = false;
  inputSelected : string = '';
  filteredSearchList!: any;
  @Input() inputText: string= '';
  @Input() searchList!: any;
  @Input() searchFilter!: string;
  @Output() inputTextChange = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputText']) {
      let searchRegex: any;
      let list = this.getFullSearchList();
      if (this.inputText || !this.inputText) {
        if (!this.inputText) {
          this.isDropdownActive = false;
          this.inputSelected  = '';
          return;
        }
        // if matched, do nothing
        if (this.inputSelected === this.inputText ) return;
        searchRegex = new RegExp(this.inputText, 'gi');
        const searchList = list.filter((item: any)=> item.match(searchRegex));
        // If in edit mode, do nothing until value changes
        if (searchList.length === 1 && searchList[0].toLowerCase() === this.inputText.toLowerCase()) return;
        // show list for suggestions
        if (searchList.length) {
          this.filteredSearchList = searchList;
          this.isDropdownActive = true;
        } else {
          this.filteredSearchList = list;
          this.isDropdownActive = false;
        }
      }
    }
  }

  selectText(e: any) {
    if (e.target.tagName === "LI") {
      this.inputTextChange.emit(e.target.innerText);
      this.inputSelected = e.target.innerText;
      this.filteredSearchList = this.searchList;
      this.isDropdownActive = false;
    }
  }

  getFullSearchList() {
    if (Array.isArray(this.searchList)) {
      return this.searchList;
    }
    if (this.searchFilter) return this.searchList[this.searchFilter] || [];
    const ObjectKeys = Object.keys(this.searchList);
    let arr: any = [];
    ObjectKeys.forEach(key => {
      arr.push(this.searchList[key]);
    })
    return arr.reduce((first: any, second: any)=> {
      return first.concat(second)
    })
  }
}
