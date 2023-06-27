import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  isNotificationActive: boolean = false;
  notificationType: string = 'error';
  notificationMsg: string = 'No se ha podido guardar, por favor intentá nuevamente.';
  loadingError: boolean = false;
  messageList: any;
  constructor() {
    this.messageList = {
      saveError: 'No se ha podido guardar, por favor intentá nuevamente.',
      saveSuccess: 'Cambios guardados con éxito.',
      deleteError: 'No se ha podido eliminar, por favor intentá nuevamente.',
      delete_coops: 'La cooperativa ha sido eliminada.',
      delete_socios: 'El socio ha sido eliminado.',
      delete_users: 'El usuario ha sido eliminado.',
      add_users: "¡Listo! Agregaste un nuevo usuario.",
      add_users_error: "Ocurrió un error al agregar el usuario.",
      delete_users_error: "Ocurrió un error al eliminar el usuario.",
      update_users_error: "Ocurrió un error al actualizar el usuario.",
      add_coops: "¡Listo! Agregaste una nueva cooperativa.",
      add_coops_error: "Ocurrió un error al agregar la Cooperativa.",
      update_coops_error: "Ocurrió un error al actualizar la Cooperativa.",
      add_socios: "¡Listo! Agregaste un nuevo socio.",
      add_socios_error: "Ocurrió un error al agregar al socio.",
      update_socios_error: "Ocurrió un error al actualizar al socio.",
      loginError: "Las credenciales ingresadas no son válidas.",
      coops_loading_error: "Ocurrió un error al obtener las cooperativas.",
      partners_loading_error: "Ocurrió un error al obtener los socios."
    }
  }

  changeLoadingErrorState(state: boolean) {
    this.loadingError = state;
  }

  udpateNotificationStatus(state: boolean) {
    this.isNotificationActive = state;
  }

  sendNotification(type: string, messageCode: string) {
    if (this.isNotificationActive) {
      this.isNotificationActive = false;
      setTimeout(()=> {
        this.openNotification(type, messageCode)
      }, 600)
      return;
    }
    this.openNotification(type, messageCode)
  }

  closeNotification() {
    this.isNotificationActive = false;
  }

  openNotification(type: string, msg: string) {
    this.isNotificationActive = true;
    this.notificationType = type;
    this.notificationMsg = this.messageList[msg] ? this.messageList[msg] : msg;
  }

  clearNotification() {
    this.notificationType = '';
    this.notificationMsg = '';
  }
}
