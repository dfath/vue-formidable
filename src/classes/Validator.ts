import ValidationError from 'exceptions/ValidationError'
import TranslationNotFound from 'exceptions/TranslationNotFound'
import PartialDictionary from 'types/PartialDictionary'
import config from 'config'

class Validator {
  stopValidation = false

  constructor (readonly dictionary: string|PartialDictionary) {}

  protected isValid (value: any): boolean {
    throw new Error('Not implemented')
  }

  protected getMessage (message: string): string {
    return message
  }

  public validate (value: any): void {
    if (!this.isValid(value)) {
      const message = typeof this.dictionary === 'string' ?
        this.dictionary :
        this.dictionary[config.language]
      if (!message) {
        throw new TranslationNotFound()
      }
      throw new ValidationError(this.getMessage(message))
    }
  }
}

export default Validator
