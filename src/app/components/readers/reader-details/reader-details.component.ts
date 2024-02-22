import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BiblioReaderService } from 'src/app/services/http/biblio-reader.service';

@Component({
  selector: 'app-reader-details',
  templateUrl: './reader-details.component.html',
  styleUrls: ['./reader-details.component.css']
})
export class ReaderDetailsComponent {
  selectedReader: any;

  constructor(
    public dialogRef: MatDialogRef<ReaderDetailsComponent>,
    private readerService: BiblioReaderService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedReader = { ...data.reader };
  }

  editReader() {
    this.readerService.updateReader(this.selectedReader).subscribe(updatedReader => {
      this.selectedReader = updatedReader;
      this.dialogRef.close();
      this.snackBar.open('Reader updated successfully', 'Close', {
        duration: 2000
      });
    }, error => {
      console.error('Error updating reader:', error);
      this.snackBar.open('Error updating reader', 'Close', {
        duration: 2000
      });
    });
  }

  deleteReader() {
    this.readerService.deleteReader(this.selectedReader.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open('Reader deleted successfully', 'Close', {
        duration: 2000
      });
    }, error => {
      console.error('Error deleting reader:', error);
      this.snackBar.open('Error deleting reader', 'Close', {
        duration: 2000
      });
    });
  }
}
