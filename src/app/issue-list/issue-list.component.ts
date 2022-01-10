import { IssuesService } from './../issues.service';
import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue';
import { issues } from 'src/assets/mock-issues';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  public issues: Issue[] = [];
  public showReportIssue: boolean = false;
  public selectedIssue: Issue | null = null;

  constructor(
    private issueService: IssuesService
  ) { }

  public ngOnInit(): void {
    this.getIssues();
  }

  public onCloseReport(): void {
    this.showReportIssue = false;
    this.getIssues();
  }

  public onConfirm(confirmed: boolean): void {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = null;
  }

  private getIssues(): void {
    this.issues = this.issueService.getPendingIssues();
  }



}
