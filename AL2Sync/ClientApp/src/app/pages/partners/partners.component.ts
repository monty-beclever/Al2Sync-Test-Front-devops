import { WebUIService } from 'src/app/services/webUI.service';
import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { DataService } from 'src/app/services/data.service';
import { GetPartnersRequest } from 'src/app/models/request/getPartnersRequest.model';
import { GetPartnersResponse } from 'src/app/models/responses/getPartnersResponse.model';
import { ErrorService } from 'src/app/services/error.service';
import { CooperativaResponse } from 'src/app/models/responses/cooperativaResponse.model';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit, DoCheck {

  sociosData: Array<GetPartnersResponse> = [];
  sorting: boolean = false;
  filtering: boolean = false;
  inputSearchEvent: string = "";
  importing: boolean = false;

  @ViewChild('tableId') private parentRef!: ElementRef;

  partnersHeads: string[] = [
    "NOMBRE",
    "COOPERATIVA",
    "CUIT",
    "ESTADO",
    "SOCIO",
    "ACUERDO CRÉDITO",
    "CUENTA CONTABLE"
  ];

  /* Use this one, in case you don't want to sort for all the heads */
  /* As you see, you use the same number of elements, but leave blank the ones you are not going to use */

  partnersHeadsForSorting: string[] = [
    "CUIT",
    "",
    "",
    "NOMBRE",
    "APELLIDO",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ];
  /* End of mock */

  filterElements: any;
  filters: GetPartnersRequest = new GetPartnersRequest();

  partnersBackUp: any[] = [];
  isMobile: boolean = false;

  width540: boolean = false;

  selectedItem: number = -1;

  errors: any = null;
  loginError: boolean = false;

  coops: Array<CooperativaResponse> = [];
  constructor(public sharedService: SharedService,
    private dataService: DataService,
    private webUiService: WebUIService,
    private errorService: ErrorService) {

  }

  ngOnInit(): void {
    // this.getPartners();
    this.getCoops();
    this.isMobile = this.sharedService.isMobile;
    this.sharedService.initialValue = 1;
    this.sharedService.lastValue = 6;
    if (window.innerWidth >= 462) {
      this.width540 = true;
    }
  }

  ngDoCheck(): void {
    if (this.sharedService.closingModal) {
      this.sharedService.closingModal = false;
      if (this.sharedService.sortingValue != "" && this.sorting) {
        this.sorting = false;
        this.sharedService.sortingDirection = 'asc';
        if (this.sharedService.sortingValue != this.sharedService.previousSortingValue) {
          this.sharedService.previousSortingValue = this.sharedService.sortingValue;
          this.sortArray();
        }
      }
      if (this.filtering) {
        this.filtering = false;
        if (this.sharedService.filterObject) {
          this.filters.cooperativaId = this.sharedService.filterObject[0].value;
          this.filters.nombre = this.sharedService.filterObject[1].value;
          this.filters.apellido = this.sharedService.filterObject[2].value;
          this.filters.cuit = this.sharedService.filterObject[3].value;
          this.getPartners()
        }
      }
    }

    if (this.sharedService.selectedItem == -1) {
      this.selectedItem = -1;
    }
  }

  displayWindowSize(e: any) {
    this.sharedService.tablewidth();
  }

  showItem(num: number) {
    this.sharedService.showItem(num, this.parentRef);
  }

  captureInput(e: any) {
    if (e.length > 3) {
      // const checkProperties = ["cuit", "nombre", "apellido"];
      this.filters.apellido = e;
      this.filters.nombre = e;
      this.filters.cuit = e;
      this.filters.strict = false;
      this.getPartners();
      // this.sociosData = this.sharedService.captureInput(e, checkProperties, this.partnersBackUp);
    }
  }

  sortArray() {
    this.sociosData = this.sharedService.sortArray(this.sociosData);
    this.partnersBackUp = this.sharedService.sortArray(this.partnersBackUp);
  }

  addNew(tblName: string) {
    this.sharedService.addNew(tblName);
  }

  getPartners() {
    this.webUiService.getPartners(this.filters).subscribe((result: Array<GetPartnersResponse>) => {
      this.sociosData = result;
      this.partnersBackUp = this.sociosData;
      if (this.sociosData && this.sociosData.length > 0) {
        this.sharedService.sortingValue = '3';
        this.sortArray();
        this.getNumeroCuenta();
      }
    }, (error) => {
      console.error(error);
      this.errors = error;
      this.loginError = true;
      this.errorService.sendNotification("error", "partners_loading_error");
    });
  }

  getNumeroCuenta() {
    this.sociosData.forEach(partner => {
      partner.numeroCuenta = partner.cuentacontable.find(cc => cc.tipoCuenta == 1).NumeroCuenta;
    })
  }

  selectIndex(i: number) {
    if (this.isMobile) {
      this.selectedItem = i;
      this.sharedService.selectedItem = i;
    }
  }

  getCoops() {
    this.webUiService.getCooperativas().subscribe((coops: Array<CooperativaResponse>) => {
      this.coops = coops;
    }, (error) => {
      console.error(error);
      this.errors = error;
      this.loginError = true;
      this.errorService.sendNotification("error", "coops_loading_error");
    });
  }


  setFilters() {
    this.filtering = true;
    this.filters.strict = true;
    this.filterElements = [
      {
        type: 'selected',
        title: "Cooperativa",
        options: [{ key: 'Todas', value: null }].concat(this.coops.map(coop => { return { key: coop.nombre, value: coop.id } })),
        value: this.sharedService.filterObject ? this.sharedService.filterObject[0].value : null
      },
      {
        type: 'input',
        title: "Nombre",
        value: this.sharedService.filterObject ? this.sharedService.filterObject[1].value : null
      },
      {
        type: 'input',
        title: "Apellido",
        value: this.sharedService.filterObject ? this.sharedService.filterObject[2].value : null
      },
      {
        type: 'input',
        title: "CUIT",
        value: this.sharedService.filterObject ? this.sharedService.filterObject[3].value : null
      }
    ];
    this.sharedService.filterObject = this.filterElements;
  }

  getUploadedFile(file: any) {
    console.log(file);
  }

}
