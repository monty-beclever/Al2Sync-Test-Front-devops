import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import mockData from '../data.mock';
import { ErrorService } from './error.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any;
  dataKeys: any;

  constructor(private errorService: ErrorService) { }

  // Set & Manage Data
  setData(): Observable<any> {
    this.data = this.setDataWithUniqueIds(mockData);
    this.dataKeys = this.setKeys(mockData);
    return of(this.data);
  }
  getUniqueData(property: string, index: number): Observable<any> {
    this.checkIfDataPropertyExists(property);
    const hasOwnProperty = this.data && this.data.hasOwnProperty(property);
    const returnedData = hasOwnProperty ? this.data[property][index] : {};
    return of(returnedData);
  }
  addData(property: string, value: any) {
    this.checkIfDataPropertyExists(property);
    return new Promise((resolve: any, reject: any)=> {
      if (!this.checkIfDataExists(property, value)) {
        this.data[property].push({...value, uid: uuidv4()});
        this.errorService.sendNotification("success", `add_${property}`);
      } else {
        this.errorService.sendNotification("error", "saveError");
      }
      resolve(this.data[property])
    })
  }
  updateData(property: string, index: number, value: any) {
    return new Promise((resolve: any, reject: any)=> {
      this.data[property][index] = value;
      this.errorService.sendNotification("success", "saveSuccess");
      resolve(this.data);
    })
  }
  deleteData(property: string, index: number) {
    this.data[property].splice(index, 1);
    this.errorService.sendNotification("success", `delete_${property}`);
    return this.data[property];
  }
  checkIfDataExists(property: string, value: any) {
    const userExists = this.data[property].findIndex((obj: any)=> obj.uid === value.uid);
    return userExists > -1;
  }

  checkIfDataPropertyExists(property: string) {
    if (!this.data[property]) {
      this.data[property] = [];
    }
  }

  setKeys(mockData: any) {
    const keyObject: any = {};
    Object.keys(mockData).forEach((key)=> {
      keyObject[key] = Object.keys(mockData[key][0]);
    })
    return keyObject
  }
  setDataWithUniqueIds(mockData: any) {
    const newData: any = {};
    Object.keys(mockData).forEach((key)=> {
      newData[key] = mockData[key].map((item: any)=> {
        return {...item, uid: uuidv4()}
      });
    })
    return newData || {};
  }

  // file management
  returnFileData(file: any, property?: string) {
    return property ? file[property] : file;
  }
}
