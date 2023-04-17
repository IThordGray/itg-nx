import {
  Component,
  ContentChildren,
  inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { SearchComponent } from '../search/search.component';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mat-search-wrapper',
  templateUrl: './mat-search-wrapper.component.html',
  styleUrls: [ './mat-search-wrapper.component.scss' ],
  imports: [
    SearchComponent,
    MatButtonModule
  ]
})
export class MatSearchWrapperComponent implements OnInit, OnDestroy {
  readonly #onDestroy$ = new Subject<void>();
  readonly #renderer = inject(Renderer2);
  readonly #matSelect = inject(MatSelect);

  @ContentChildren(MatOption) private _options?: QueryList<MatOption>;
  @ViewChild(SearchComponent) private _search?: SearchComponent;

  @Input() heading?: string;
  @Input() searchLabel?: string;
  @Input() searchPredicate?: (option: MatOption, searchValue: string) => boolean;

  clearAll(): void {
    this.#matSelect.value = undefined;
  }

  doFilter(searchValue: string): void {
    this._options?.forEach(option => {
      this.searchPredicate ??= (option: MatOption, searchValue: string) => option.viewValue.toLowerCase().includes(searchValue?.trim().toLowerCase() ?? '');
      this.searchPredicate(option, searchValue)
        ? this.#renderer.setStyle(option._getHostElement(), 'display', '')
        : this.#renderer.setStyle(option._getHostElement(), 'display', 'none');
    });
  }

  ngOnInit(): void {
    this.#matSelect._openedStream.pipe(
      takeUntil(this.#onDestroy$)
    ).subscribe(() => this._search?.focus());

    this.#matSelect._closedStream.pipe(
      takeUntil(this.#onDestroy$)
    ).subscribe(() => this._search?.reset());
  }

  ngOnDestroy(): void {
    this.#onDestroy$.next();
    this.#onDestroy$.complete();
  }
}
