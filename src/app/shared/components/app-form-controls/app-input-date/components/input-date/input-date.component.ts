import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { InputValidationService } from 'src/app/shared/validations/input-validation/input-validation.service';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html'
})
export class InputDateComponent implements OnInit {

  //faCalendarWeek = faCalendarWeek;
 
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() title: string;
 
  constructor(public validation: InputValidationService) {}
 
  ngOnInit(): void {}
 
  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
 
  dateValidator(control: AbstractControl) {
    if (this.validation.isValid(control) && !this.validation.hasErrorValidator(control, 'required')) {
      return true;
    } else {
      return false;
    }
  }

}
 
 

