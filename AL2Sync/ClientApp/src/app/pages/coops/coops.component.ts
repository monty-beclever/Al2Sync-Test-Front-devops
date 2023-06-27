import { CooperativaResponse } from 'src/app/models/responses/cooperativaResponse.model';
import { Component, OnInit, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { DataService } from 'src/app/services/data.service';
import { WebUIService } from 'src/app/services/webUI.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-coops',
  templateUrl: './cooperatives.component.html',
  styleUrls: ['./cooperatives.component.scss']
})
export class CoopsComponent implements OnInit, DoCheck {

  @ViewChild('tableId') private parentRef!: ElementRef;

  cooperativas: Array<CooperativaResponse> = [];
  sorting: boolean = false;
  inputSearchEvent: any;

  coopsHeads: string[] = [
    "COOPERATIVA",
    "CUIT",
    "ACTIVO",
    "CONTRATO",
    "CUENTA",
    "PROVINCIA",
    "LOCALIDAD",
    "TELÉFONO",
    "E-MAIL",
    "USUARIO",
    "ACUERDO CRÉDITO"
  ];

  /* Use this one, in case you don't want to sort for all the heads */
  /* As you see, you use the same number of elements, but leave blank the ones you are not going to use */
  
  coopsHeadForSorting: string[] = [
    "",
    "COOPERATIVA",
    "CUIT",
    "",
    "ACTIVO",
    "",
    "LOCALIDAD",
    "PROVINCIA",
    "",
    "",
    "",
    ""
  ];
  /* End of mock */

  filterElements: any;
  isMobile: boolean = false;

  width540: boolean = false;

  coopsBackUp: any[] = [];

  selectedItem: number = -1;
  user: any;

  constructor(
    public sharedService: SharedService,
    private dataService: DataService,
    private service: WebUIService,
    private authService: AuthService) {
      this.user = authService.authenticatedUser;
  }

  ngOnInit(): void {
    this.getCooperativas();
    this.isMobile = this.sharedService.isMobile;
    this.sharedService.initialValue = 1;
    this.sharedService.lastValue = 10;
    if (window.innerWidth >= 462) {
      this.width540 = true;
    }
  }

  ngDoCheck(): void {
    if (this.sharedService.closingModal) {
      this.sharedService.closingModal = false;
      this.sorting = false;
      this.sharedService.sortingDirection = 'asc';
      if (this.sharedService.sortingValue != this.sharedService.previousSortingValue) {
        this.sharedService.previousSortingValue = this.sharedService.sortingValue;
        this.sortArray();
      }
    }

    if (this.sharedService.selectedItem == -1) {
      this.selectedItem = -1;
    }

  }

  displayWindowSize(e: any) {
    this.sharedService.tablewidth();
  }

  getTowns() {
    let towns: string[] = [];
    this.cooperativas.forEach((coop: any) => {
      if (!towns.includes(coop.localidad)) {
        towns.push(coop.localidad);
      }
    });
    return towns;
  }

  showItem(num: number) {
    this.sharedService.showItem(num, this.parentRef);
  }

  captureInput(e: any) {
    const checkProperties = ["nombre", "cuit", "provincia", "localidad", "cuentaCorriente"];
    this.cooperativas = this.sharedService.captureInput(e, checkProperties, this.coopsBackUp);

  }

  sortArray() {
    this.cooperativas = this.sharedService.sortArray(this.cooperativas);
    this.coopsBackUp = this.sharedService.sortArray(this.coopsBackUp);
  }

  addNew(tblName: string) {
    this.sharedService.addNew(tblName);
  }

  getCooperativas() {
    this.service.getCooperativas().subscribe((result: Array<CooperativaResponse>) => {
      this.cooperativas = result;
      this.coopsBackUp = this.cooperativas;
      this.sharedService.sortingValue = '1';
      this.sortArray();
    }, (error) => {
      console.error(error);
    });
  }

  selectIndex(i: number) {
    if (this.isMobile) {
      this.selectedItem = i;
      this.sharedService.selectedItem = i;
    }
  }
}
