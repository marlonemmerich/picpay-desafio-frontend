import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
 
@Injectable({
  providedIn: 'root',
})
export class InputValidationService {
  constructor() {}
 
  hasErrorValidator(control: AbstractControl, errorName: string): boolean {
    if ((control.dirty || control.touched) && this.hasError(control, errorName)) {
      return true;
    }
    return false;
  }
 
  hasError(control: AbstractControl, errorName: string): boolean {
    return control.hasError(errorName);
  }
 
  isValid(control: AbstractControl) {
    return !control.valid && control.touched;
  }
 
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}