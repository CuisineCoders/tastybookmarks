import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'tasty-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogClose
  ],
  standalone: true
})
export class DeleteConfirmationDialogComponent {
}
