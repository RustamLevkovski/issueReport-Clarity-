import { IssuesService } from './../issues.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../issue';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {

  @Output() formClose = new EventEmitter();
  public issueForm: FormGroup | undefined;
  public suggestions: Issue[] = [];

  constructor(
    private builder: FormBuilder,
    private issueService: IssuesService
  ) { }

  ngOnInit(): void {
    this.createForm();
    console.log('suggestion',this.suggestions);

    this.issueForm?.controls['title'].valueChanges.subscribe((title: string) => {
      console.log('title', title);
      this.suggestions = this.issueService.getSuggestions(title);
    })
  }

  public addIssue(): void {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return
    }
    this.issueService.createIssue(this.issueForm?.value);
    this.formClose.emit();
  }

  private createForm(): void {
    this.issueForm = this.builder.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      type: ['', Validators.required]
    })
  }
}
