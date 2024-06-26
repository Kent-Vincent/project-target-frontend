import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { WorkspaceForm } from 'src/app/commons/forms/public.form';
import { CurrentUserService } from 'src/app/commons/services/current-user.service';
import { WorkspaceService } from 'src/app/commons/services/workspace.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-workspace-modal',
  templateUrl: './create-workspace-modal.component.html',
  styleUrls: ['./create-workspace-modal.component.css']
})
export class CreateWorkspaceModalComponent {
  Form = new WorkspaceForm();

  constructor(
    private workspaceService: WorkspaceService,
    private current_user: CurrentUserService,
    private router: Router,
    public dialogRef: MatDialogRef<CreateWorkspaceModalComponent>,
  ) {}

  create(form: WorkspaceForm['form']): void {
    const currentUserId = this.current_user.getCurrentUserID();
    const userIdList = [currentUserId];
    const formValueWithUserId = { ...form.value, users: userIdList };

    this.workspaceService.createWorkspace(formValueWithUserId)
      .pipe(
        catchError(error => {
          console.log('Error occurred:', error);
          throw error;
        })
      )
      .subscribe(response => {
        console.log(response);
        this.dialogRef.close('created');
        this.router.navigate(['/boards']);
      });
  }
}
