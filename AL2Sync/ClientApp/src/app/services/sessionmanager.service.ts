import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticateRequest } from '../models/request/authenticateRequest.model';
import { ChangePasswordRequest } from '../models/request/changePasswordRequest.model';
import { AuthenticateResponse } from '../models/responses/authenticateResponse.model';
import { IsAdminModel } from '../models/responses/web.ui.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SessionmanagerService extends BaseService {

  constructor(http: HttpClient) {
    super(http)
  }


  authenticate(req: AuthenticateRequest) {

    let url = this.baseUrl + "api/Session/Login";

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return super._post(url, req, { headers: headers }, AuthenticateResponse, false);


    /*let url = this.baseUrl + "Login?username="+ req.username +"&password="+ req.password ;
    return super._get(url, AuthenticateResponse, false);*/
  }

  changePassword(req: ChangePasswordRequest) {
    let url = this.baseUrl + "change-password";

    
    const headers = new HttpHeaders({
      "Content-Type": "application/json"      
    });
    return super._post(url, req, { headers: headers }, null, false);
  }

  isAdmin() {
    let url = this.baseUrl + "api/Users/isadmin";
    return super._get(url, IsAdminModel, false ); 
    
    /*const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return super._post(url, null, { headers: headers }, IsAdminModel, false);*/
  }
}

