import Validator from 'classes/Validator'
import PartialDictionary from 'types/PartialDictionary'

const defaultDictionary: PartialDictionary = {
  en: 'This field is required',
  es: 'El campo es requerido'
}

export class Required extends Validator {
  constructor (dictionary?: string|PartialDictionary) {
    super(dictionary || defaultDictionary)
    this.stopValidation = true
  }

  protected isValid (value: any): boolean {
    return value != null && value.toString().trim() !== ''
  }
}

export function required (dictionary?: string|PartialDictionary) {
  return new Required(dictionary)
}
