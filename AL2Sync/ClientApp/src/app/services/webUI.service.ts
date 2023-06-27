import { EntidadStatusResponse } from './../models/responses/entidadStatusResponse.model';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCooperativaRequest } from '../models/request/addCooperativasRequest.model';
import { AddPartnersRequest } from '../models/request/addPartnersRequest.model';
import { AddUserRequest } from '../models/request/addUserRequest.model';
import { AuthenticateRequest } from '../models/request/authenticateRequest.model';
import { ConsultarTransaccionRequest } from '../models/request/consultarTransaccionRequest.model';
import { GetPartnersRequest } from '../models/request/getPartnersRequest.model';
import { AddPartnersResponse } from '../models/responses/addPartnersResponse.model';
import { AuthenticateResponse } from '../models/responses/authenticateResponse.model';
import { ConsultarTransaccionResponse } from '../models/responses/consultarTransaccionResponse.model';
import { CooperativaResponse } from '../models/responses/cooperativaResponse.model';
import { GetPartnersResponse } from '../models/responses/getPartnersResponse.model';
import { MaeCooperativaResponse } from '../models/responses/maeCooperativaResponse.model';
import { UserResponse } from '../models/responses/userResponse.model';
import { BaseService } from './base.service';
import { UpdatePartnersRequest } from '../models/request/updatePartnersRequest.model';
import { UpdateCooperativaRequest } from '../models/request/updateCooperativasRequest.model';
import { UpdateUserRequest } from '../models/request/updateUserRequest.model';
import { ConsultarUsuariosRequest } from '../models/request/consultarUsuariosRequest.model';
import { UpdateCooperativasResponse } from '../models/responses/updateCooperativasResponse.model';
import { ContractsResponse } from '../models/responses/contractsResponse.model';

@Injectable({
  providedIn: 'root'
})
export class WebUIService extends BaseService {

  constructor(http: HttpClient) {
    super(http)
  }

  updatePartners(req: UpdatePartnersRequest) {
    let url = this.baseUrl + "updateacsocio";
    const _headers = new HttpHeaders();
    const headers = _headers.append('Content-Type', 'application/json')
    return super._post(url, req, { headers: headers }, AddPartnersResponse, false);
  }

  addPartners(req: AddPartnersRequest) {
    let url = this.baseUrl + "registrarsocio";
    const _headers = new HttpHeaders();
    const headers = _headers.append('Content-Type', 'application/json')
    return super._post(url, req, { headers: headers }, AddPartnersResponse, false);
  }

  importPartners(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}importarSocios`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getPartners(req: GetPartnersRequest) {
    let url = this.baseUrl + "consultarsocios";
    const _headers = new HttpHeaders();
    const headers = _headers.append('Content-Type', 'application/json')
    return super._post(url, req, { headers: headers }, GetPartnersResponse, false);
  }

  addCooperativa(coop: AddCooperativaRequest) {
    let url = this.baseUrl + "api/Cooperatives/AddCooperative";
    const _headers = new HttpHeaders();
    const headers = _headers.append('Content-Type', 'application/json')
    console.log(coop);
    return super._post(url, coop, { headers: headers }, CooperativaResponse, false);

    
    //return super._get(url, CooperativaResponse, false);

    
  }

  updateCooperativa(coop: UpdateCooperativaRequest) {
    let url = this.baseUrl + "api/Cooperatives/UpdateCooperative";
    const _headers = new HttpHeaders();
    const headers = _headers.append('Content-Type', 'application/json')
    return super._post(url, coop, { headers: headers }, UpdateCooperativasResponse, false);
  }

  addUser(user: AddUserRequest) {
    let url = this.baseUrl + "api/Users/AddUser";
    const _headers = new HttpHeaders();
    const headers = _headers.append('Content-Type', 'application/json')
    return super._post(url, user, { headers: headers }, UserResponse, false);
  }

  updateUser(user: UpdateUserRequest) {
    let url = this.baseUrl + "api/Users/UpdateUser";
    const _headers = new HttpHeaders();
    const headers = _headers.append('Content-Type', 'application/json')
    return super._put(url, user, { headers: headers }, UserResponse, false);
  }

  getUsers(req: ConsultarUsuariosRequest = new ConsultarUsuariosRequest()) {

     
    let url = this.baseUrl + "api/Users/GetUsers";
    const _headers = new HttpHeaders();
    const headers = _headers.append('Content-Type', 'application/json')

    let paramtQuery = [];

    if (req.cooperativaId)
      paramtQuery.push("CooperativaId=" + req.cooperativaId);
    if (req.nombre)
      paramtQuery.push("Nombre=" + req.nombre);
    if (req.apellido)
      paramtQuery.push("Apellido=" + req.apellido);

    paramtQuery.forEach((element, index) => {

      if (index === 0) {
        url = url + "?" + element;
      }
      else
        url = url + "&" + element;
        
    });


    //url = url + "?CooperativaId=" + cooperativaId + "&Nombre=" + req.nombre + "&Apellido=" + req.apellido;
    return super._get(url, UserResponse, false);

  }

  getEntidadStatus() {
    let url = this.baseUrl + "getEntidadStatus";
    return super._get(url, EntidadStatusResponse, true);
  }

  getCooperativas() {
    let url = this.baseUrl + "api/Cooperatives/GetCooperatives";
    return super._get(url, CooperativaResponse, true);
  }

  getCooperativaContract(coopId: string) {
    //let url = this.baseUrl + "getCoopContract";
    let url = this.baseUrl + "api/Cooperatives/GetContratosForCooperativa";
    
    url += "?coopId=" + coopId;
    return super._get(url, ContractsResponse, true);
  }

  getMaeCooperativas() {
    let url = this.baseUrl + "api/Cooperatives/GetMaeCooperatives";
    return super._get(url, MaeCooperativaResponse, true);
  }

  getTransactions(req: ConsultarTransaccionRequest) {
    let url = this.baseUrl + "consultartransacciones";
    const _headers = new HttpHeaders();
    const headers = _headers.append('Content-Type', 'application/json')
    return super._post(url, req, { headers: headers }, ConsultarTransaccionResponse, false);
  }

  deleteUser(userId: string) {
    let url = this.baseUrl + "api/Users/DeleteUser";
    //url += "?userId=" + userId;
    url += "?Id=" + userId;
    return super._delete(url);
  }
}
