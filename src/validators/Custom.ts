import Validator from 'classes/Validator'
import PartialDictionary from 'types/PartialDictionary'

interface IValidatorFunction {
  (value: any): boolean
}

export class Custom extends Validator {
  validator: IValidatorFunction

  constructor (validator: IValidatorFunction, dictionary: string|PartialDictionary) {
    super(dictionary)
    this.validator = validator
  }

  protected isValid (value: any): boolean {
    return this.validator(value)
  }
}

export function custom (validator: IValidatorFunction, dictionary: string|PartialDictionary) {
  return new Custom(validator, dictionary)
}
