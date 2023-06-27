import { SessionmanagerService } from 'src/app/services/sessionmanager.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { ChangePasswordRequest } from 'src/app/models/request/changePasswordRequest.model';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  @Output() closeModal = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});
  changePasswordReq = new ChangePasswordRequest();
  errors: any = null;

  constructor(private service: SessionmanagerService,
    private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl(''),
      newpassword: new FormControl(''),
      repetePassword: new FormControl(''),
    }, {
      validators: [this.validPassword('newpassword', 'repetePassword')]
    });
  }

  validPassword(password: string, repetePassword: string): any {
    return (formGroup: FormGroup) => {
      const password1 = formGroup.controls[password];
      const password2 = formGroup.controls[repetePassword];
      if (password1.value.length <= 0) {
        return password1.setErrors({ passwordInvalido: true })
      }
      if (password1.value == password2.value) {
        password1.setErrors(null);
        password2.setErrors(null);
      }
      else {
        password2.setErrors({ passwordInvalido: true });
      }
    }
  }

  closingModal() {
    this.closeModal.emit(false);
  }

  save() {
    if (this.form.valid) {
      this.changePasswordReq.password = this.form.get('password').value;
      this.changePasswordReq.newPassword = this.form.get('newpassword').value;
    }
    this.service.changePassword(this.changePasswordReq).subscribe((result) => {
      this.closingModal();
    }, error => {
      console.error(error);
      this.errors = error;
      this.errorService.sendNotification("login-error", "loginError");
    });
  }

}
