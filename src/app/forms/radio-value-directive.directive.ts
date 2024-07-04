import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[radioValue]',
  standalone: true
})
export class RadioValueDirectiveDirective {

  @Output() radioValueChange = new EventEmitter<string>();

  @HostListener('change', ['$event.target.value'])
  onChange(value: string) {
    this.radioValueChange.emit(value);
  }

}
