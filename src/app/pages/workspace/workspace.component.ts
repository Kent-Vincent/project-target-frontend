import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTicketModalComponent } from '../../../shared/create-ticket-modal/create-ticket-modal.component';
import { WorkspaceService } from 'src/app/commons/services/workspace.service';
import { StageService } from 'src/app/commons/services/stage.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {
  workspaceName: string = '';
  stageName: string[] = [];

  constructor(private dialog: MatDialog, private workspaceService: WorkspaceService,
    private stageService: StageService,
  ) {}
  
  ngOnInit(): void {
   
  }

  openDialog() {
    this.dialog.open(CreateTicketModalComponent,{
      
    });
  }

  // selectedCategory: TicketCategory = this.ticketCategories[0];
  // isCategoryDropdownOpen: boolean = false;

  // toggleCategoryDropdown() {
  //   this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
  // }

  // selectCategory(category: TicketCategory) {
  //   this.selectedCategory = category;
  //   this.isCategoryDropdownOpen = false;
  // }
}