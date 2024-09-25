import { AbstractControl } from "@angular/forms";

export function minusculoValidators(control: AbstractControl) {
  const autoria = control.value as string;
  if(autoria !== autoria?.toLowerCase()) {
    return { minusculo: true };
  } else {
    return null
  }
}
