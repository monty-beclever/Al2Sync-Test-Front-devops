import { ErrorService } from 'src/app/services/error.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { SessionmanagerService } from 'src/app/services/sessionmanager.service';
import { AuthenticateRequest } from 'src/app/models/request/authenticateRequest.model';
import { AuthenticateResponse } from 'src/app/models/responses/authenticateResponse.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {
    username: "",
    password: "",
    termsAgreement: false
  }
  errors: any = null;
  loginError: boolean = false;
  tyc = false;


  constructor(private router: Router, private authService: AuthService, private errorService: ErrorService, private sessionmanagerService: SessionmanagerService) {
    if (authService.isAuthenticated()) {
      router.navigate(['/inicio']);
    }
  }

  ngOnInit(): void {
  }

  acceptTyc(e: any) {
    this.user.termsAgreement = e.target.checked;
  }


  loginUser(usr: NgForm) {
    
    if (this.user.termsAgreement) {
      const req = new AuthenticateRequest();
      req.username = this.user.username;
      req.password = this.user.password;
            
      this.sessionmanagerService.authenticate(req).subscribe((result: AuthenticateResponse) => {        
        if (result) {
          this.errors = null;
          this.authService.login(result)
        }
      }, error => {
        
        this.errors = error;
        this.loginError = true;
        this.errorService.sendNotification("login-error", "loginError");
        console.log(this.errors)
      });
      
       /*this.authService.authenticateUser(this.user.username, this.user.password)
         .then((res: any) => {
           this.errors = null;
         }).catch(err => {
           this.errors = err;
           this.loginError = true;
           this.errorService.sendNotification("login-error", "loginError");
            console.log(this.errors)
         })*/
    }

  }

  showTyC() {
    this.download_file(environment.tyc_url, "Terminos y Condiciones.pdf");
  }

  download_file(fileURL, fileName) {
    // for non-IE
    if (!(window as any).ActiveXObject) {
      var save = document.createElement('a');
      save.href = fileURL;
      save.target = '_blank';
      var filename = fileURL.substring(fileURL.lastIndexOf('/') + 1);
      save.download = fileName || filename;
      if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
        document.location = save.href;
        // window event not working here
      } else {
        var evt = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': false
        });
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      }
    }

    // for IE < 11
    else if (!!(window as any).ActiveXObject && document.execCommand) {
      var _window = window.open(fileURL, '_blank');
      _window.document.close();
      _window.document.execCommand('SaveAs', true, fileName || fileURL)
      _window.close();
    }
  }

}
