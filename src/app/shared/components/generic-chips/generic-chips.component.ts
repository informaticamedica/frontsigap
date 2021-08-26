import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-generic-chips',
  templateUrl: './generic-chips.component.html',
  styleUrls: ['./generic-chips.component.scss'],
})
export class GenericChipsComponent {
  @Input() dataList: string[] | undefined = [''];
  @Input() dataChip: string[] | undefined = [''];
  @Output() dataSelected = new EventEmitter<string[]>();
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // fruitCtrl = new FormControl();
  reactiveForm = new FormGroup({
    chips: new FormControl('', [Validators.required]),
  });
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;

  constructor() {
    this.dataList ??= [''];
    this.filteredFruits = this.reactiveForm.get('chips')!.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.dataList!.slice()
      )
    );
  }
  ngOnInit() {
    // console.log('this.fruitCtrl', this.fruitCtrl);
    // this.reactiveForm.get('chips')!.valueChanges.subscribe((selectedValue) => {
    //   console.log('firstname value changed');
    //   console.log(selectedValue); //latest value of firstname
    //   console.log(this.reactiveForm.get('chips')!.value); //latest value of firstname
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.dataList ??= [''];
    this.filteredFruits = this.reactiveForm.get('chips')!.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.dataList!.slice()
      )
    );
    // console.log(' this.dataList', this.dataList);
  }

  dataList2dataChip(selected: any) {
    return this.dataChip![this.dataList!.indexOf(selected)] ?? selected;
  }

  eliminarDiacriticosEs(texto: string) {
    return texto
      .normalize('NFD')
      .replace(
        /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
        '$1'
      )
      .normalize();
  }

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   // Add our fruit
  //   if (value) {
  //     this.fruits.push(value);
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();
  //   this.reactiveForm.reset();
  // }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput!.nativeElement.value = '';
    this.reactiveForm.reset();
    this.dataSelected.emit(this.fruits);
  }

  private _filter(value: string): string[] {
    const filterValue = this.eliminarDiacriticosEs(value.toLowerCase());
    // console.log('value', value);

    this.dataList ??= [''];
    return this.dataList!.filter((fruit) =>
      this.eliminarDiacriticosEs(fruit.toLowerCase()).includes(filterValue)
    );
  }
}
