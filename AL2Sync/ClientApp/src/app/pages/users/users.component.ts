import { Component, OnInit, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { DataService } from 'src/app/services/data.service';
import { WebUIService } from 'src/app/services/webUI.service';
import { UserResponse } from 'src/app/models/responses/userResponse.model';
import { ConsultarUsuariosRequest } from 'src/app/models/request/consultarUsuariosRequest.model';
import { ErrorService } from 'src/app/services/error.service';
import { CooperativaResponse } from 'src/app/models/responses/cooperativaResponse.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, DoCheck {

  @ViewChild('tableId') private parentRef!: ElementRef;

  users: Array<UserResponse> = [];
  sorting: boolean = false;
  filtering: boolean = false;
  inputSearchEvent: any;

  usersHeads: string[] = [
    "USUARIO",
    "APELLIDO",
    "NOMBRE",
    "CUIT",
    "CARGO",
    "COOPERATIVA",
    "ESTADO"
  ]

  /* Use this one, in case you don't want to sort for all the heads */
  /* As you see, you use the same number of elements, but leave blank the ones you are not going to use */

  usersHeadForSorting: string[] = [
    "",
    "NOMBRE",
    "APELLIDO",
    "USUARIO",
    "",
    "",
    "",
    "COOPERATIVA",
    ""
  ];
  /* End of mock */

  filterElements: any;
  filters: ConsultarUsuariosRequest = new ConsultarUsuariosRequest();

  isMobile: boolean = false;

  width540: boolean = false;

  usersBackUp: any[] = [];

  selectedItem: number = -1;

  errors: any = null;
  loginError: boolean = false;

  coops: Array<CooperativaResponse> = [];
  constructor(public sharedService: SharedService,
    private webUiServices: WebUIService,
    private dataService: DataService,
    private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getCoops();
    this.isMobile = this.sharedService.isMobile;
    this.sharedService.initialValue = 1;
    this.sharedService.lastValue = 5;
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
          this.getUsers()
        }
      }
    }

    if (this.sharedService.selectedItem == -1) {
      this.selectedItem = -1;
    }
  }

  getTowns() {
    let towns: string[] = [];
    this.users.forEach((coop: any) => {
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
    const checkProperties = ["user", "cuit", "nombre", "apellido", "cooperativa"];
    this.users = this.sharedService.captureInput(e, checkProperties, this.usersBackUp);
  }

  sortArray() {
    this.users = this.sharedService.sortArray(this.users);
    this.usersBackUp = this.sharedService.sortArray(this.usersBackUp);
  }

  addNew(tblName: string) {
    this.sharedService.addNew(tblName);
  }

  getUsers() {
    this.webUiServices.getUsers(this.filters).subscribe((result: Array<UserResponse>) => {
      this.users = result || [];

      this.usersBackUp = this.users;
      if (this.users && this.users.length > 0) {
        this.sharedService.sortingValue = '1';
        this.sortArray();
      }
    }, (error) => {
      console.error(error);
      this.errors = error;
      this.loginError = true;
      this.errorService.sendNotification("error", "add_users_error");
    })
  }

  getCoops() {
    this.webUiServices.getCooperativas().subscribe((coops: Array<CooperativaResponse>) => {
      this.coops = coops;
    }, (error) => {
      console.error(error);
      this.errors = error;
      this.loginError = true;
      this.errorService.sendNotification("error", "coops_loading_error");
    });
  }

  deleteUser(userId: string) {
    this.webUiServices.deleteUser(userId).subscribe(result => {
      this.getUsers();
    }, (error) => {
      console.error(error);
      var msg = "delete_users_error";
      if (error && error.error && error.error.errors && error.error.errors.length > 0) {
        msg = error.error.errors[0].Message;
      }
      this.errors = error;
      this.loginError = true;
      this.errorService.sendNotification("error", msg);
    })
  }

  selectIndex(i: number) {
    if (this.isMobile) {
      this.selectedItem = i;
      this.sharedService.selectedItem = i;
    }
  }

  setFilters() {
    
    this.filtering = true;
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
