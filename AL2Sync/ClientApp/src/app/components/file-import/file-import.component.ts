import { WebUIService } from 'src/app/services/webUI.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ImportPartnersRequest } from 'src/app/models/request/importPartnersRequest.model';
import { AddPartnersResponse } from 'src/app/models/responses/addPartnersResponse.model';
import { ImportPartnersResponse } from 'src/app/models/responses/importPartnersResponse.model';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.scss']
})
export class FileImportComponent implements OnInit {
  file!: any;
  fileInputProgress: number = 0;
  fileInputStatus: string = '';
  disable: boolean = false;
  resetFileInput: boolean = false;

  @Output() close = new EventEmitter<any>();
  @Output() data = new EventEmitter<any>();

  result: ImportPartnersResponse = null;
  message: string;

  constructor(private webUIService: WebUIService) { }

  ngOnInit(): void {
  }

  uploadFile() {
    this.disable = true;
    this.resetFileInput = false;
    this.fileInputStatus = "uploading";
    this.uploadFileToServer();

    // this.uploadFileToServer(this.file).then(()=>{
    //   this.resetFormState();
    // });
  }

  mockUploadFileToServer() {
    let timer = setInterval(() => {
      this.fileInputProgress += 1;
      if (this.fileInputProgress == 100) {
        clearInterval(timer);
        this.resetFormState();
      }
    }, 10)
  }

  uploadFileToServer() {
    this.fileInputProgress = 0;
    if (this.file) {
      this.webUIService.importPartners(this.file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.fileInputProgress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            console.log(event);
            this.result = event.body;
            if (this.result.errors.length <= 0) {
              this.resetFormState();
            }
            // this.message = event.body.message;
            // this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          // this.fileInputProgress = 0;
          if (err.error && err.error.detail) {
            console.error(err);
            // this.resetFormState();
            this.message = err.error.detail
          } else {
            // this.message = 'Could not upload the file!';
          }
          this.file = undefined;
        });
      this.file = undefined;
    }
  }

  getFile(file: any) {
    this.file = file;
    this.data.emit(this.file);
  }

  resetFormState() {
    this.close.emit();
    this.disable = false;
    this.file = '';
    this.resetFileInput = true;
    this.fileInputProgress = 0;
    this.fileInputStatus = "";
  }

}
