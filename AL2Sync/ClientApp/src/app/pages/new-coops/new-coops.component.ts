import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';
import { WebUIService } from 'src/app/services/webUI.service';
import { MaeCooperativaResponse } from 'src/app/models/responses/maeCooperativaResponse.model';
import { AddCooperativaRequest } from 'src/app/models/request/addCooperativasRequest.model';
import { UserResponse } from 'src/app/models/responses/userResponse.model';
import { ErrorService } from 'src/app/services/error.service';
import { UpdateCooperativaRequest } from 'src/app/models/request/updateCooperativasRequest.model';
import { ConsultarUsuariosRequest } from 'src/app/models/request/consultarUsuariosRequest.model';
import { environment } from 'src/environments/environment';
import { ContractsResponse } from 'src/app/models/responses/contractsResponse.model';

@Component({
  selector: 'app-new-coops',
  templateUrl: './new-coops.component.html',
  styleUrls: ['./new-coops.component.scss']
})
export class NewCoopsComponent implements OnInit {
  mode: any;
  coopID: any;
  selectPickerActive: boolean = false;
  resetFileInput: boolean = false;
  fileInputStatus: string = '';
  fileInputProgress: number = 0;

  coop: any = {
    nombre: '',
    cuit: '',
    activo: false,
    contracts: [],
    provincia: '',
    localidad: '',
    telefono: '',
    mail: '',
    users: [],
    credit_amnt: 0
  }

  // tipoOptions = [{ name: 'CORRIENTE', value: 1 }];

  form: FormGroup = new FormGroup({});
  maeCoop: Array<MaeCooperativaResponse> = [];
  maeCoopNames: Array<string> = [];
  users: Array<UserResponse> = [];
  listContracts: Array<ContractsResponse> = [];

  errors: any = null;
  loginError: boolean = false;
  maxCreditAmnt: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    public sharedService: SharedService,
    private errorService: ErrorService,
    private service: WebUIService
  ) { }

  ngOnInit(): void {
    this.maxCreditAmnt = environment.maxCreditAmnt;
    
    this.mode = this.route.snapshot.paramMap.get('mode');

    if (this.mode == "new") {
      this.getCoops();
    }
    this.getUsers();
    this.setCoopsData();
    this.form = new FormGroup({
      nombre: new FormControl(''),
      cuit: new FormControl(''),
      activo: new FormControl(''),
      contract: new FormControl(''),
      cuentaCorriente: new FormControl(''),
      provincia: new FormControl(''),
      localidad: new FormControl(''),
      telefono: new FormControl(''),
      mail: new FormControl(''),
      user: new FormControl(''),
      credit_amnt: new FormControl(''),
      tipo: new FormControl(''),
    }, {
      validators: [this.validPhone('telefono'), this.validEmail('mail'), this.validCreditAmnt('credit_amnt')]
    });
    
    
    this.form.get('nombre')?.dirty
    this.form.get('tipo').setValue(1);
    this.form.get('activo').setValue(true);
    this.setEditMode();

    console.log("ngOnInit");

  }

  validPhone(nombre: string): any {
    return (formGroup: FormGroup) => {
      const telefono = formGroup.controls[nombre];
      if (/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g.test(telefono.value)) {
        telefono.setErrors(null)
      } else {
        telefono.setErrors({ telefonoInvalido: true })
      }
    }
  }

  validEmail(nombre: string): any {
    return (formGroup: FormGroup) => {
      const mail = formGroup.controls[nombre];
      if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail.value)) {
        mail.setErrors(null)
      } else {
        mail.setErrors({ telefonoInvalido: true })
      }
    }
  }

  validCreditAmnt(nombre: string): any {
    return (formGroup: FormGroup) => {
      const credit_amnt = formGroup.controls[nombre];
      if (credit_amnt.value > 0 && credit_amnt.value <= this.maxCreditAmnt) {
        credit_amnt.setErrors(null)
      } else {
        credit_amnt.setErrors({ credit_amntInvalido: true })
      }
    }
  }

  getCoops() {
    this.service.getMaeCooperativas().subscribe((result: Array<MaeCooperativaResponse>) => {
      this.maeCoop = result;
      this.maeCoopNames = this.maeCoop.map(coop => { return coop.nombre });
    }, (error) => {
      console.error(error);
    })
  }

  getCoopsContracts() {
    this.service.getCooperativaContract(this.coop.id).subscribe((result: Array<ContractsResponse>) => {
      this.coop.contracts = result;
    }, (error) => {
      console.error(error);
    })
  }

  getUsers() {
    this.service.getUsers().subscribe((result: Array<UserResponse>) => {
      this.users = result || [];
    }, (error) => {
      console.error(error);
    });
  }

  coopSelected(coop) {
    const maeCoop = this.maeCoop.find(x => x.nombre == coop);
    if (maeCoop) {
      this.form.get('nombre').setValue(maeCoop.nombre);
      this.form.get('cuit').setValue(maeCoop.cuit);
      this.form.get('provincia').setValue(maeCoop.localidad.split(" - ")[1]);
      this.form.get('localidad').setValue(maeCoop.localidad.split(" - ")[0]);
      this.form.get('tipo').setValue(maeCoop.tipo);
      this.form.get('cuentaCorriente').setValue(maeCoop.cuentaCorriente);
    }
  }

  submit() {
    if (this.form.invalid) return;

    this.coop = { ...this.coop, ...this.form.value };

    if (this.mode === 'edit') {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const newData: AddCooperativaRequest = {
      name: this.coop['nombre'],
      cuit: this.coop['cuit'],
      active: this.coop['activo'],
      contracts: this.coop.contracts,
      acct_number: this.coop['cuentaCorriente'].toString(),
      provincia: this.coop['provincia'],
      localidad: this.coop['localidad'],
      phone: this.coop['telefono'],
      email: this.coop['mail'],
      users: this.coop.users ? this.coop.users : [],
      credit_amnt: this.coop['credit_amnt'],
      tipo: parseInt(this.coop['tipo'])
    }
    this.submitting();
    this.service.addCooperativa(newData).subscribe((result) => {
      this.exitForm();
    }, (error) => {
      console.error(error);
      var msg = "add_coops_error";
      if (error && error.error && error.error.errors && error.error.errors.length > 0) {
        msg = error.error.errors[0].Message;
      }
      this.errors = error;
      this.loginError = true;
      this.errorService.sendNotification("error", msg);
    })
  }

  checkService(str: string) {
    //Call service to check coop nombre, Valid CUIT, etc and do logic hear
  }

  update() {
    var req = new UpdateCooperativaRequest();
    
    req.id = this.coop['id'];
    req.phone = this.coop['telefono'];
    req.email = this.coop['mail'];
    req.credit_amnt = this.coop['credit_amnt'];
    req.contracts = this.coop.contracts,

    this.service.updateCooperativa(req).subscribe((result) => {
      this.exitForm();
    }, (error) => {
      console.error(error);
      var msg = "update_coops_error";
      if (error && error.error && error.error.errors && error.error.errors.length > 0) {
        msg = error.error.errors[0].Message;
      }
      this.errors = error;
      this.loginError = true;
      this.errorService.sendNotification("error", msg);
    })
  }

  goBack() {
    console.log("goBack")
    this.router.navigate(['/cooperativas']);
  }

  async getFile(data: any) {
    this.coop.contracts.push({
      titulo: data.name,
      docNombre: data.name,
      docTamano: data.size,
      tipoMime: data.type,
      docContenido: await this.getBase64(data)
    })
  }

  getBase64 = file => new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      console.error('Error: ', error);
      reject('');
    };
  })

  toggleSelectPicker(value: boolean) {
    this.selectPickerActive = value;
  }

  getSelection(data: any) {
    this.coop.users = [... data];
    this.selectPickerActive = false;
  }

  updateCoop(obj: any) {
    for (let key of Object.keys(this.form.value)) {
      this.form.controls[key].setValue(obj[key]);
    }
    this.coopSelected(obj.nombre);
    this.form.controls['nombre'].disable();
    this.form.controls['cuit'].disable();
    this.form.controls['activo'].disable();
    // this.form.controls['contract'].disakble();
    this.form.controls['cuentaCorriente'].disable();
    this.form.controls['provincia'].disable();
    this.form.controls['localidad'].disable();
    // this.form.controls['telefono'].disable();
    // this.form.controls['mail'].disable();
    this.form.controls['user'].disable();
    // this.form.controls['credit_amnt'].disable();
    this.form.controls['tipo'].disable();
    this.getCoopsContracts();
  }

  submitting() {
    this.fileInputStatus = 'uploading';
  }
  exitForm() {
    this.resetFileInput = true;
    this.fileInputStatus = ''
    this.resetFileInput = false;
    this.goBack();
  }

  setCoopsData() {
    if (!this.dataService.data) {
      this.dataService.setData();
    }
  }

  setEditMode() {
    if (this.mode !== "new" && this.sharedService.dataForEdit) {
      this.coopID = this.route.snapshot.paramMap.get('id');
      this.coop = { ...this.coop, ...this.sharedService.dataForEdit };
      this.updateCoop(this.sharedService.dataForEdit);
    }
  }
}
