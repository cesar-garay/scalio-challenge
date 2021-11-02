import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface SearchFormResult {
  login: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  loginControl!: FormControl;
  @Output() searchFormValues: EventEmitter<SearchFormResult> = new EventEmitter();

  ngOnInit(): void {
    this.loginControl = new FormControl('', Validators.required);
    this.searchForm = new FormGroup({
      'login': this.loginControl
    });
  }

  triggerSearch() {
    if (this.searchForm.valid) {
      this.searchFormValues.next(this.searchForm.getRawValue());
    }
  }
}
