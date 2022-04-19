import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class CommonService {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  showSuccessMsg(msg: string, duration = 2000): void {
    this.snackBar.open(msg, '', {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbar-container', 'success'],
    });
  }

  showErrorMsg(msg: string, duration = 2000): void {
    this.snackBar.open(msg, '', {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbar-container', 'danger'],
    });
  }

  removeEmptyProperties = (obj: any) => {
    for (const prop in obj) {
      if (obj[prop] === null || obj[prop] === undefined || obj[prop] === '') {
        delete obj[prop];
      }
    }
  };
}
