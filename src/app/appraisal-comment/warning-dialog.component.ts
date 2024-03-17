import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-appraisal-warning-dialog',
  template: `
    <div class="dialog">
      <h2>Warning</h2>
      <p>The valuation is final and cannot be undone. Valuation request will be removed once valuated.</p>
      <div class="button-group">
        <button (click)="closeDialog(true)">OK</button>
        <button (click)="closeDialog(false)" class="cancel-button">Cancel</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog {
      width: 500px;
      padding: 20px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #f44336;
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .button-group {
      text-align: right;
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #007bff;
      color: #fff;
      margin-left: 10px;
    }

    .cancel-button {
      background-color: #dc3545;
    }

    button:hover {
      opacity: 0.8;
    }
  `]
})
export class AppraisalWarningDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AppraisalWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
