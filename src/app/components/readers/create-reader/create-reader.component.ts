import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BiblioReaderService } from 'src/app/services/http/biblio-reader.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { BiblioDiscount, BiblioReader } from 'src/app/models/biblioReader';

@Component({
  selector: 'app-create-reader',
  templateUrl: './create-reader.component.html',
  styleUrls: ['./create-reader.component.css']
})
export class CreateReaderComponent {
  selectedReader: any;
  addForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    discountAmount: new FormControl(''),
  });

  constructor(
    private readerService: BiblioReaderService,
    private dialogRef: MatDialogRef<CreateReaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  addReader() {
    const biblioDiscount: BiblioDiscount = {
      discountAmount: this.addForm.controls['discountAmount'].value
    };

    const addReader: BiblioReader = {
      firstName: this.addForm.controls['firstName'].value,
      lastName: this.addForm.controls['lastName'].value,
      surName: this.addForm.controls['surname'].value,
      email: this.addForm.controls['email'].value,
      address: this.addForm.controls['address'].value,
      phone: this.addForm.controls['phone'].value,
      discount: biblioDiscount,
      biblioFines: [],
      biblioLendingInfos: []
    }

    this.readerService.createReader(addReader).subscribe(createdReader => {
      this.dialogRef.close(createdReader);
    }, error => {
      console.error('Error updating reader:', error);
    });
  }
}
