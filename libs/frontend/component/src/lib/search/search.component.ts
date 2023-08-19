import { NgIf } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'search',
  templateUrl: './search.component.html',
  imports: [
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule
  ],
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent implements OnInit, OnDestroy {
  readonly #onDestroy$ = new Subject<void>();

  @ViewChild(MatInput) private _input!: MatInput;
  @HostBinding('class.stretch') @Input() stretch = true;

  @Input() hideIcon = false;
  @Input() label: string | undefined;
  @Output() readonly filter = new EventEmitter<string>();
  readonly search = new FormControl();

  focus(): void {
    this._input.focus();
  }

  reset(): void {
    this.search.reset();
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      takeUntil(this.#onDestroy$)
    ).subscribe(searchText => this.filter.next(searchText));
  }

  ngOnDestroy(): void {
    this.#onDestroy$.next();
    this.#onDestroy$.complete();
  }
}
