import { WebUIService } from 'src/app/services/webUI.service';
import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { DataService } from 'src/app/services/data.service';
import { ConsultarTransaccionRequest } from 'src/app/models/request/consultarTransaccionRequest.model';
import { ConsultarTransaccionResponse } from 'src/app/models/responses/consultarTransaccionResponse.model';
import { EntidadStatusResponse } from 'src/app/models/responses/entidadStatusResponse.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactionsData: Array<ConsultarTransaccionResponse> = [];
  sorting: boolean = false;
  filtering: boolean = false;
  inputSearchEvent: any;

  @ViewChild('tableId') private parentRef!: ElementRef;

  /* Mock Data  */

  transactionsHeads: string[] = [
    "SOCIO",
    "CUIT DÉBITO",
    "CUIT CRÉDITO",
    "ID",
    "FECHA",
    "IMPORTE",
    "TIPO",
    "DETALLE",
    "ESTADO"
  ];

  transactionsHeadsForSorting: string[] = [
    "Id DE TRANSACCIÓN",
    "",
    "",
    "CUIT DÉBITO",
    "CUIT CRÉDITO",
    "",
    "",
    "",
    "",
    "",
    "Socio",
    "",
    ""
  ];

  filterElements: any;
  filters: ConsultarTransaccionRequest = new ConsultarTransaccionRequest();

  transactionsBackUp: any[] = [];

  listOfKeys: any[] = [];
  isMobile: boolean = false;

  width540: boolean = false;

  entidadStatus: Array<EntidadStatusResponse> = [];

  constructor(public sharedService: SharedService,
    private dataService: DataService,
    private service: WebUIService) {
  }

  ngOnInit(): void {
    const currentDate = new Date();
    this.filters.fechaDesde = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1).toJSON();
    this.filters.fechaHasta = currentDate.toJSON(),
    this.setTransactionsData();
    this.getEntidadStatus();
    this.isMobile = this.sharedService.isMobile;
    // this.listOfKeys = this.dataService.dataKeys.transactions;
    this.sharedService.initialValue = 1;
    this.sharedService.lastValue = 8;
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
          this.filters.fechaDesde = this.sharedService.filterObject[0].value.startDate;
          this.filters.fechaHasta = this.sharedService.filterObject[0].value.endDate;
          this.filters.trnStatus = this.sharedService.filterObject[1].value ? this.sharedService.filterObject[1].value : 0;
          this.filters.trnId = this.sharedService.filterObject[2].value && this.sharedService.filterObject[2].value.length > 0 ? this.sharedService.filterObject[2].value : null;
          this.filters.trnInternalId = this.sharedService.filterObject[3].value;
          this.setTransactionsData();
        }
      }
    }
  }

  displayWindowSize(e: any) {
    this.sharedService.tablewidth();
  }

  showItem(num: number) {
    this.sharedService.showItem(num, this.parentRef);
  }

  captureInput(e: any) {
    const checkProperties = ["socio", "cuitDebito", "cuitCredito", "trnid"];
    this.transactionsData = this.sharedService.captureInput(e, checkProperties, this.transactionsBackUp);

  }

  sortArray() {
    this.transactionsData = this.sharedService.sortArray(this.transactionsData);
    this.transactionsBackUp = this.sharedService.sortArray(this.transactionsBackUp);
  }

  setTransactionsData() {
    this.service.getTransactions(this.filters).subscribe((result: Array<ConsultarTransaccionResponse>) => {
      this.transactionsData = result;
      this.transactionsBackUp = this.transactionsData;
      if (this.transactionsData && this.transactionsData.length > 0) {
        this.setStatus();
        this.sharedService.sortingValue = '5';
        this.sharedService.sortingDirection = 'desc';
        this.sortArray();
      }
    }, (error) => {
      console.error(error);
    });
  }

  getEntidadStatus() {
    this.service.getEntidadStatus().subscribe((result: Array<EntidadStatusResponse>) => {
      this.entidadStatus = result;
    }, (error) => {
      console.error(error);
    });
  }

  setStatus() {
    this.transactionsData.forEach(trs => {
      const status = this.entidadStatus.find(es => es.id == trs.trnStatus);
      if (status) {
        trs.status = status.title;
      }
    })
  }

  setFilters() {
    this.filtering = true;
    this.filterElements = [
      {
        type: 'date-range',
        title: "Rango de Fechas",
        value: {
          startDate: this.filters.fechaDesde,
          endDate: this.filters.fechaHasta
        }
      },
      {
        type: 'selected',
        title: "Estado",
        options: [{ key: 'Todos', value: 0 }].concat(this.entidadStatus.map(status => { return { key: status.title, value: status.id } })),
        value: this.sharedService.filterObject ? this.sharedService.filterObject[1].value : null
      },
      {
        type: 'input',
        title: "Id Transaccion",
        value: this.sharedService.filterObject ? this.sharedService.filterObject[2].value : null
      },
      {
        type: 'input',
        title: "Id Interno de Transaccion",
        value: this.sharedService.filterObject ? this.sharedService.filterObject[3].value : null
      },
      // {
      //   type: 'radio',
      //   title: "estado",
      //   options: [
      //     { key: 'No Activo', value: '0'},
      //     { key: 'Activo', value: '1'},
      //   ],
      //   value: null
      // },
    ];
    this.sharedService.filterObject = this.filterElements;
  }

}
