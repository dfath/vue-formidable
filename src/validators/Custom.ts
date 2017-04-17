import Validator from 'classes/Validator'
import IDictionary from 'interfaces/IDictionary'

interface IValidatorFunction {
  (value: any): boolean
}

export class Custom extends Validator {
  validator: IValidatorFunction

  constructor (validator: IValidatorFunction, dictionary: string|IDictionary) {
    super(dictionary)
    this.validator = validator
  }

  protected isValid (value: any): boolean {
    return this.validator(value)
  }
}

export function custom (validator: IValidatorFunction, dictionary: string|IDictionary) {
  return new Custom(validator, dictionary)
}
