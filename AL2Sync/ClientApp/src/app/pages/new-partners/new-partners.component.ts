import { WebUIService } from 'src/app/services/webUI.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';
import { AddPartnersRequest } from 'src/app/models/request/addPartnersRequest.model';
import { CooperativaResponse } from 'src/app/models/responses/cooperativaResponse.model';
import { ErrorService } from 'src/app/services/error.service';
import { UpdatePartnersRequest } from 'src/app/models/request/updatePartnersRequest.model';

@Component({
  selector: 'app-new-partners',
  templateUrl: './new-partners.component.html',
  styleUrls: ['./new-partners.component.scss']
})
export class NewPartnersComponent implements OnInit {
  mode: any;
  coopID: any;

  form: FormGroup = new FormGroup({});
  coopSearchList = [];
  coops: Array<CooperativaResponse> = [];

  errors: any = null;
  loginError: boolean = false;
  selectedCoop: CooperativaResponse;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    public sharedService: SharedService,
    private errorService: ErrorService,
    private service: WebUIService) {
    this.getCoops();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      cuit: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      activo: new FormControl('', Validators.required),
      acuerdoCredito: new FormControl('', Validators.required),
      cuentaCorrientePropia: new FormControl(''),
      esccc: new FormControl(''),
      cooperativa: new FormControl('', Validators.required)
    }, {
      validators: [this.validCuit('cuit')]
    });
    this.mode = this.route.snapshot.paramMap.get('mode');
    // this.setSociosData();
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
    })
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

  coopSelected(coop) {
    const coops = this.coops.find(x => x.nombre == coop);
    this.selectedCoop = coops;
    this.form.get('cooperativa').setValue(coops.nombre);
    if (this.selectedCoop.tipo != 2) {
      this.form.get('cuentaCorrientePropia').setValidators(null);
    } else {
      this.form.get('cuentaCorrientePropia').setValidators(Validators.required);
    }
  }

  submit() {
    if (this.mode === 'edit') {
      this.save(this.form.controls);
    } else {
      this.create(this.form.value);
    }
  }

  create(obj: any) {
    const coop = this.coops.find(x => x.nombre == obj.cooperativa);
    const newData: AddPartnersRequest = {
      cooperativaId: coop.id,
      cuit: obj.cuit,
      nombre: obj.nombre,
      apellido: obj.apellido,
      activo: obj.activo,
      acuerdoCredito: obj.acuerdoCredito,
      cuentaCorriente: obj.cuentaCorrientePropia.toString(),
      esccc: true,
    }
    this.service.addPartners(newData).subscribe((result) => {
      console.log(result);
      this.goBack();
    }, (error) => {
      console.error(error);
      var msg = "add_socios_error";
      if (error && error.error && error.error.errors && error.error.errors.length > 0) {
        msg = error.error.errors[0].Message;
      }
      this.errors = error;
      this.loginError = true;
      this.errorService.sendNotification("error", msg);
    });
  }

  save(obj: any) {
    const coop = this.coops.find(x => x.nombre == obj.cooperativa.value);
    const data: UpdatePartnersRequest = {
      userName: "",
      cuit: obj.cuit.value,
      cooperativaId: coop.id,
      acuerdoCredito: obj.acuerdoCredito.value,
      cuentaCorriente: obj.cuentaCorrientePropia.value? obj.cuentaCorrientePropia.value : 0
    }
    this.service.updatePartners(data).subscribe((result) => {
      console.log(result);
      this.goBack();
    }, (error) => {
      console.error(error);
      var msg = "update_socios_error";
      if (error && error.error && error.error.errors && error.error.errors.length > 0) {
        msg = error.error.errors[0].Message;
      }
      this.errors = error;
      this.loginError = true;
      this.errorService.sendNotification("error", msg);
    });
  }

  goBack() {
    this.router.navigate(['/socios']);
  }

  updateSocio(obj: any) {
    for (let key of Object.keys(this.form.value)) {
      this.form.controls[key].setValue(obj[key]);
    }
    this.coopSelected(obj.cooperativa.nombre);
    this.form.controls['cuit'].disable();
    this.form.controls['nombre'].disable();
    this.form.controls['apellido'].disable();
    this.form.controls['activo'].disable();
    this.form.controls['esccc'].disable();
    this.form.controls['cooperativa'].disable();
  }

  setEditMode() {
    if (this.mode !== "new") {
      this.coopID = this.route.snapshot.paramMap.get('id');
      this.updateSocio(this.sharedService.dataForEdit);
    }
  }
}
