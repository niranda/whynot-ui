import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateLendingComponent } from '../create-lending/create-lending.component';
import { CloseLendingComponent } from '../close-lending/close-lending.component';
import { BiblioLendingInfoService } from 'src/app/services/http/biblio-lending-info.service';
import { BiblioLendingInfo } from 'src/app/models/biblioLending';
import { LendingStatusPipe } from 'src/app/shared/pipes/lending-status.pipe';

@Component({
  selector: 'app-lending',
  templateUrl: './lending.component.html',
  styleUrls: ['./lending.component.css']
})
export class LendingComponent implements OnInit {
  infos: BiblioLendingInfo[] = [];

  constructor(private dialog: MatDialog, private lendingService: BiblioLendingInfoService) {}

  ngOnInit(): void {
    this.getInfos();
  }

  getInfos() {
    this.lendingService.getBookInfos().subscribe(data => {
      this.infos = data;
    });
  }

  openCreateLendingDialog() {
    const dialogRef = this.dialog.open(CreateLendingComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInfos();
      
      if (result) {
        console.log('New lending added:', result);
      }
    });
  }

  openFinishLendingDialog() {
    const dialogRef = this.dialog.open(CloseLendingComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInfos();

      if (result) {
        console.log('Lending was finished:', result);
      }
    });
  }
}
