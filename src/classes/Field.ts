import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import IsValid from 'interfaces/IsValid'
import Validator from './Validator'
import ValidationError from 'exceptions/ValidationError'

@Component
export default class Field extends Vue implements IsValid {
  @Prop
  validators: Array<Validator>|null

  @Prop
  valueGetter: Function|null

  errors: Array<string> = []
  submitted: boolean = false
  focusedOut: boolean = false

  @Watch('focusedOut')
  onFocusedOutChanged () {
    this._validate()
  }

  get isValid (): boolean {
    return this.errors.length === 0
  }

  private _validate (): void {
    this.errors = []
    if ((this.submitted || this.focusedOut) &&
        (this.validators && this.valueGetter))
    {
      const value = this.valueGetter()
      for (let validator of this.validators) {
        try {
          validator.validate(value)
        } catch (e) {
          if (e instanceof ValidationError) {
            this.errors.push(e.message)
            if (validator.stopValidation) {
              break
            }
          }
          else {
            throw e
          }
        }
      }
    }
  }

  public validate (submitted: boolean): void {
    this.submitted = submitted
    this._validate()
  }
}
