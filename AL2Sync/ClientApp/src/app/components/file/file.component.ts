import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ContractsResponse } from 'src/app/models/responses/contractsResponse.model';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  selectedFile!: any;
  dropzoneDragged: boolean = false;
  fileStatus: string = 'import'; // import, uploading, error
  // disable: boolean = false;

  @Input() progress!: number;
  @Input() status!: string;
  @Input() files!: Array<ContractsResponse>;
  @Input() inputFileName!: string;
  @Input() reset!: boolean;
  @Output() file = new EventEmitter<any>();

  @Input() csvAllowed!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const {reset, status} = changes;
    if (reset && reset.currentValue) {
      this.resetInput();
    }
    if (status && status.currentValue !== status.previousValue) {
      this.fileStatus = status.currentValue;
    }
  }

  dragOn(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.dropzoneDragged){
        this.dropzoneDragged = true;
    }
  }
  dragOff(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (this.dropzoneDragged){
      this.dropzoneDragged = false;
    }
  }
  drop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dropzoneDragged = false;
    const files = e.dataTransfer ? Array.from(e.dataTransfer.files) : []
    this.handleFiles(files);
  }

  fileChange(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.target ? Array.from(e.target.files) : [];
    this.handleFiles(files);
  }


  handleFiles(files: any) {
    const previewTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'text/csv'];
    const checkIfAppropriateFile = (file: any)=> {
      const isIncorrectExtension = !(/\.(pdf|jpg|jpeg|png|csv)$/i).test(file.name.toLowerCase());
      const isIncorrectFileType = previewTypes.indexOf(files[i].type) < 0;
      return isIncorrectExtension || isIncorrectFileType
    }
    for (var i = 0; i < files.length; i++) {
      if (checkIfAppropriateFile(files[i])) {
        this.fileStatus = 'error';
        return;
      }
    }
    if (this.fileStatus === "error") {
      this.fileStatus = "import"
    }

    this.selectedFile = files[0];
    this.file.emit(files[0]);
  }

  resetInput() {
    this.fileStatus = 'import';
    this.selectedFile = '';
  }

  setLabelClasses() {
    return {
      "label--loading": this.fileStatus === 'uploading',
      "label--active": this.dropzoneDragged,
    }
  }

  openFile(contract: ContractsResponse) {
    // window.open(contract.docContenido, "_blank");
    var pdf_newTab = window.open("");
    pdf_newTab.document.write(

      "<html><head><title>" + contract.docNombre + "</title></head><body style='margin:0px;'><iframe title='" + contract.docNombre + "'  width='100%' height='100%' src='" + encodeURI(contract.docContenido) + "'></iframe></body></html>"

    );
  }
}
