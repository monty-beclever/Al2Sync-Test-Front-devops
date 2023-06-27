import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JsonConvert, ValueCheckingMode } from "json2typescript";
import { environment } from 'src/environments/environment';

export class BaseService {
  // Esta es la url donde esta la api
  protected baseUrl = environment.api_url;
  protected jsonConvert: JsonConvert = new JsonConvert();

  constructor(protected http: HttpClient) {
    this.jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
  }

  /**
   * El método GET se utiliza para obtener datos desde una API
   * @param url       Dirección de la api y el método al cual queremos hacer la llamada, puede contener queryParameters
   * @param type      Nombre de la clase que va devolver la llamada (Opcional)
   * @param isArray   Se especifica si la respuesta va a ser un array de elementos (Opcional)
   * @param headers   Los headers de la llamada (Ej. Authorization)
   * @returns         Respuesta de la llamada
   */
  _get<T>(url: string, type?: new () => T, isArray?: boolean, headers?: HttpHeaders) {
    console.log(url);
    return this.http.get(url, { headers }
    ).pipe(map((res) => type != null
      ? (isArray
        ? this.jsonConvert.deserializeArray((<Array<any>>res), type)
        : this.jsonConvert.deserialize((<any>res), type)
      )
      : res)
    );
  }

  /**
   * Con el método POST podemos hacer llamadas complejas a la api, por ejemplo podemos enviarle un Objeto Usuario para que la api lo agregue en la base de datos
   * @param url       Dirección de la api y el método al cual queremos hacer la llamada, puede contener queryParameters
   * @param body      Se especifica el contenido de la llamada (Ej. Un Objeto)
   * @param options   Datos adicionales que se necesiten enviar (Ej. Headers)
   * @param type      Nombre de la clase que va devolver la llamada (Opcional)
   * @param isArray   Se especifica si la respuesta va a ser un array de elementos (Opcional)
   * @returns         Respuesta de la llamada
   */
  _post<T>(url: string, body: any, options: any, type?: new () => T, isArray?: boolean) {
    return this.http.post(url, JSON.stringify(body), options)
      .pipe(map((res: any) => type != null
        ? (isArray
          ? this.jsonConvert.deserializeArray(res, type)
          : this.jsonConvert.deserialize(res, type)
        )
        : res));
  }
   /**
   * El método GET se utiliza para obtener datos desde una API
   * @param url       Dirección de la api y el método al cual queremos hacer la llamada, puede contener queryParameters
   * @param type      Nombre de la clase que va devolver la llamada (Opcional)
   * @param isArray   Se especifica si la respuesta va a ser un array de elementos (Opcional)
   * @param headers   Los headers de la llamada (Ej. Authorization)
   * @returns         Respuesta de la llamada
   */
    _delete<T>(url: string, type?: new () => T, isArray?: boolean, headers?: HttpHeaders) {
      return this.http.delete(url, { headers }
      ).pipe(map((res) => type != null
        ? (isArray
          ? this.jsonConvert.deserializeArray((<Array<any>>res), type)
          : this.jsonConvert.deserialize((<any>res), type)
        )
        : res)
      );
    }

  /**
   * El método PUT se utiliza para editar/actualizar un registro existente en la base de datos
   * @param url       Dirección de la api y el método al cual queremos hacer la llamada, puede contener queryParameters
   * @param body      Se especifica el contenido de la llamada (Ej. Un Objeto)
   * @param options   Datos adicionales que se necesiten enviar (Ej. Headers)
   * @param type      Nombre de la clase que va devolver la llamada (Opcional)
   * @param isArray   Se especifica si la respuesta va a ser un array de elementos (Opcional)
   * @returns         Respuesta de la llamada
   */
  _put<T>(url: string, body: any, options: any, type?: new () => T, isArray?: boolean) {
    return this.http.put(url, JSON.stringify(body), options)
      .pipe(map((res: any) => type != null
        ? (isArray
          ? this.jsonConvert.deserializeArray(res, type)
          : this.jsonConvert.deserialize(res, type)
        )
        : res));
  }

  /**
   * El método PATCH se utiliza para editar/actualizar un registro existente en la base de datos
   * @param url       Dirección de la api y el método al cual queremos hacer la llamada, puede contener queryParameters
   * @param body      Se especifica el contenido de la llamada (Ej. Un Objeto)
   * @param options   Datos adicionales que se necesiten enviar (Ej. Headers)
   * @param type      Nombre de la clase que va devolver la llamada (Opcional)
   * @param isArray   Se especifica si la respuesta va a ser un array de elementos (Opcional)
   * @returns         Respuesta de la llamada
   */
  _patch<T>(url: string, body: any, options: any, type?: new () => T, isArray?: boolean) {
    return this.http.patch(url, JSON.stringify(body), options)
      .pipe(map((res: any) => type != null
        ? (isArray
          ? this.jsonConvert.deserializeArray(res, type)
          : this.jsonConvert.deserialize(res, type)
        )
        : res));
  }
}
