import Validator from 'classes/Validator'
import IDictionary from 'interfaces/IDictionary'

const defaultDictionary: IDictionary = {
  en: 'This field is required',
  es: 'El campo es requerido'
}

export class Required extends Validator {
  constructor (dictionary?: string|IDictionary) {
    super(dictionary || defaultDictionary)
    this.stopValidation = true
  }

  protected isValid (value: any): boolean {
    return value != null && value.toString().trim() !== ''
  }
}

export function required (dictionary?: string|IDictionary) {
  return new Required(dictionary)
}
