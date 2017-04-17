import Validator from 'classes/Validator'
import PartialDictionary from 'types/PartialDictionary'

const defaultDictionary: PartialDictionary = {
  en: 'Must be at least {min}',
  es: 'Debe ser al menos {min}'
}

export class Min extends Validator {
  min: number

  constructor (min: number, dictionary?: string|PartialDictionary) {
    super(dictionary || defaultDictionary)
    this.min = min
  }

  protected isValid (value: number|Array<any>|null): boolean {
    return value != null && (
      (value instanceof Array && value.length >= this.min) ||
      (value >= this.min))
  }

  protected getMessage (message: string): string {
    return message.replace('{min}', this.min.toString())
  }
}

export function min (min: number, dictionary?: string|PartialDictionary) {
  return new Min(min, dictionary)
}