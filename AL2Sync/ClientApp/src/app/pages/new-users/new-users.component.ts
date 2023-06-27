import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';
import { WebUIService } from 'src/app/services/webUI.service';
import { CooperativaResponse } from 'src/app/models/responses/cooperativaResponse.model';
import { ErrorService } from 'src/app/services/error.service';
import { AddUserRequest } from 'src/app/models/request/addUserRequest.model';
import { UpdateUserRequest } from 'src/app/models/request/updateUserRequest.model';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.scss']
})
export class NewUsersComponent implements OnInit {
  @Input() mode: any;
  @Input() coopID: any;
  @Output() returnUser = new EventEmitter<any>();

  coopSearchList = [];
  coops: Array<CooperativaResponse> = [];

  cargoOptions = ['Empleado', 'Gerente', 'Dev'];
  roleOptions = [
    { key: 'ROLE_WEBAL2ADMIN', value: 'Administrador AL2' },
    { key: 'ROLE_WEBAL2COOP', value: 'Administrador Cooperativa' },
    { key: 'ROLE_ROOT', value: 'Usuario de Web Services' },
  ];

  estadoOptions = ['procesado'];

  form: FormGroup = new FormGroup({});

  errors: any = null;
  loginError: boolean = false;
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private service: WebUIService,
    private errorService: ErrorService,
    public sharedService: SharedService) {
      this.getCoops();
    }


  ngOnInit(): void {
    if (!this.mode) {
      this.mode = this.route.snapshot.paramMap.get('mode');
    }
    this.setUsersData();
    
    this.form = new FormGroup({
      user: new FormControl(''),
      password: new FormControl(''),
      repetePassword: new FormControl(''),
      cuit: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      cooperativa: new FormControl(''),
      cargo: new FormControl(''),
      acceso: new FormControl(''),
    }, {
      validators: [this.validCuit('cuit'), this.validPassword('password', 'repetePassword')]
    });
  }

  getCoops() {
    this.service.getCooperativas().subscribe((coops: Array<CooperativaResponse>) => {
      this.coops = coops;
      this.coopSearchList = this.coops.map(coop => { return coop.nombre });
      this.setEditMode();
    }, (error) => {
      console.error(error);
      this.errors = error;
      this.loginError = true;
      this.errorService.sendNotification("error", "coops_loading_error");
    });
  }

  coopSelected(coop) {
    const maeCoop = this.coops.find(x => x.nombre == coop);
    this.form.get('cooperativa').setValue(maeCoop.nombre);
  }

  validCuit(name: string): any {
    return (formGroup: FormGroup) => {
      const cuit = formGroup.controls[name];
      if (cuit.value.length != 11) {
        return cuit.setErrors({ cuitInvalido: true })
      }

      var acumulado = 0;
      var digitos = cuit.value.split("");
      var digito = digitos.pop();

      for (var i = 0; i < digitos.length; i++) {
        acumulado += digitos[9 - i] * (2 + (i % 6));
      }

      var verif = 11 - (acumulado % 11);
      if (verif == 11) {
        verif = 0;
      } else if (verif == 10) {
        verif = 9;
      }

      if (digito == verif) {
        cuit.setErrors(null)
      }
      else {
        cuit.setErrors({ cuitInvalido: true })
      }
    }
  }

  validPassword(password: string, repetePassword: string): any {
    return (formGroup: FormGroup) => {
      const password1 = formGroup.controls[password];
      const password2 = formGroup.controls[repetePassword];
      if (this.mode != "edit" && (!password1 || !password1.value || password1.value.length <= 0)) {
        return password1.setErrors({ passwordInvalido: true })
      }
      if (password2 && password1.value == password2.value) {
        password1.setErrors(null);
        password2.setErrors(null);
      }
      else {
        password2.setErrors({ passwordInvalido: true });
      }
    }
  }

  newPassword() {
    if (this.form.get('password').value) {
      this.form.get('password').setValidators(Validators.required);
      this.form.get('repetePassword').setValidators(Validators.required);
    } else {
      this.form.get('password').setValidators(null);
      this.form.get('repetePassword').setValidators(null);
      this.form.get('password').setErrors(null);
      this.form.get('repetePassword').setErrors(null);
    }
  }

  submit() {
    if (this.form.invalid) return;
    if (this.mode === 'edit') {
      this.save(this.form.value);
    } else {
      this.create(this.form.value);
    }
  }

  create(obj: any) {

    let coop = null

    if (obj.role != 'ROLE_WEBAL2ADMIN') {
      coop = this.coops.find(x => x.nombre == obj.cooperativa);
    }
    const newData: AddUserRequest = {
      username: obj.user,
      password: obj.password,
      cuit: obj.cuit,
      estado: 0,
      name: obj.nombre,
      lastName: obj.apellido,
      cooperativaId: coop ? coop.id : null,
      acceso: obj.acceso,
      cargo: obj.cargo
    }

    if (this.mode != 'addToCoop') {
      this.service.addUser(newData).subscribe((result) => {
        this.goBack();
      }, (error) => {
        console.error(error);
        var msg = "add_users_error";
        if (error && error.error && error.error.errors && error.error.errors.length > 0) {
          msg = error.error.errors[0].Message;
        }
        this.errors = error;
        this.loginError = true;
        this.errorService.sendNotification("error", msg);
      })
    } else {
      this.returnUser.emit(newData);
    }
  }

  save(obj: any) {
    const newData: UpdateUserRequest = {
      id: this.user.id,
      newPassword: obj.password,
      cuit: obj.cuit,
      estado: this.user.xstatus,
      name: obj.nombre,
      lastName: obj.apellido,
      cargo: obj.cargo,
      acceso: obj.acceso
    }

    this.service.updateUser(newData).subscribe((result) => {
      this.goBack();
    }, (error) => {
      console.error(error);
      var msg = "update_users_error";
      if (error && error.error && error.error.errors && error.error.errors.length > 0) {
        msg = error.error.errors[0].Message;
      }
      this.errors = error;
      this.loginError = true;
      this.errorService.sendNotification("error", msg);
    })
  }

  goBack() {
    if (this.mode != 'addToCoop') {
      this.router.navigate(['/users']);
    } else {
      this.returnUser.emit(null);
    }
  }

  updateUser(obj: any) {
    for (let key of Object.keys(this.form.value)) {
      this.form.controls[key].setValue(obj[key]);
    }
    this.coopSelected(obj.cooperativa.nombre);
    this.form.controls['user'].disable();
    this.form.controls['cooperativa'].disable();
    if (this.form.get('acceso').value) {
      this.form.get('acceso').setValue(obj.acceso == "MICROSERVICIOS" ? "ROLE_ROOT" : "ROLE_WEBAL2COOP")
      this.form.controls['acceso'].disable();
    }
  }

  setUsersData() {
    if (!this.dataService.data) {
      this.dataService.setData();
    }
  }

  setEditMode() {
    if (this.mode == "edit" && this.sharedService.dataForEdit) {
      this.coopID = this.route.snapshot.paramMap.get('id');
      this.user = { ...this.user, ...this.sharedService.dataForEdit };
      this.updateUser(this.sharedService.dataForEdit);
    }
  }

}
