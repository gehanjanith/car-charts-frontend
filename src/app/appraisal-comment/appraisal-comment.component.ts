import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppraisalWarningDialogComponent } from './warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appraisal-comment',
  templateUrl: './appraisal-comment.component.html',
  styleUrls: ['./appraisal-comment.component.scss']
})
export class AppraisalCommentComponent {
  valuation: any;
  comment: any;
  appraisalId: string;
  user: string | undefined;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AppraisalCommentComponent>
  ) {
    this.appraisalId = data.appraisalId;
    this.user = data.user;
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(AppraisalWarningDialogComponent, {
      width: 'Auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result : ',result)
      if (result) {
        console.log('user', this.user);
        const data = {
          id: this.appraisalId,
          valuation: this.valuation,
          comment: this.comment,
          appraiser: this.user
        };
        this.http
          .put<any>(
            'http://localhost:5000/add-valuation/' + this.appraisalId,
            data
          )
          .subscribe(
            response => {
              console.log('Appraisal updated:', response);
              this.dialogRef.close(response); // Close dialog after successful update
            },
            error => {
              console.error('Error updating appraisal:', error);
              // Handle error, if needed
            }
          );
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(); // Close dialog without any action
  }
}

