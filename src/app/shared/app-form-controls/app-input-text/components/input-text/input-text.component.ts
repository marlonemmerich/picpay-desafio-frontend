import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { InputValidationService } from 'src/app/core/validations/inputValidation/inputValidation.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() title: string;
  @Input() type: string;
  @Input() isReadonly: boolean = false;
  @Input() isOptional: boolean = false;
 
  constructor(public validation: InputValidationService) {}
 
  ngOnInit(): void {}
 
  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
