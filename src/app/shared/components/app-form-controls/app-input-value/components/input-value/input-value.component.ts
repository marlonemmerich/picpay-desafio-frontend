import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { InputValidationService } from 'src/app/shared/validations/input-validation/input-validation.service';

@Component({
  selector: 'app-input-value',
  templateUrl: './input-value.component.html'
})
export class InputValueComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() title: string;
  @Input() isOptional: boolean = false;
  @Input() placeholder: string = '';
 
  constructor(public validation: InputValidationService) {}
 
  ngOnInit(): void {}
 
  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
