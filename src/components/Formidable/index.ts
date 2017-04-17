import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import Rules from 'interfaces/Rules'
import Form from 'classes/Form'
import Field from 'classes/Field'
import Validator from 'classes/Validator'
import template from './template.html'

@Component({ template })
export default class extends Vue {
  @Prop({ type: Object, required: true })
  model: object

  @Prop({ type: Object, required: true })
  rules: Rules

  submitted = false
  form: Form
  fields: Array<Field> = []

  @Watch('model', { immediate: true, deep: true })
  onModelChanged (value: object, old: object) {
    if (value !== old) {
      this.fields = []
      const makeForm = (model: object, rules: Rules|null): Form => {
        const form = new Form()
        for (let [key, value] of Object.entries(model)) {
          let validators = rules ? rules[key] : null
          if (value instanceof Object && !(value instanceof Array)) {
            form.fields[key] = makeForm(value, <Rules> validators)
          } else {
            if (validators instanceof Validator) {
              validators = [validators]
            }
            const field = new Field({
              propsData: {
                validators,
                valueGetter: () => model[key]
              }
            })
            form.fields[key] = field
            this.fields.push(field)
          }
        }
        return form
      }
      this.form = makeForm(this.model, this.rules)
    }
    this.validate()
  }

  validate (): void {
    for (let field of this.fields) {
      field.validate(this.submitted)
    }
  }

  submit (): void {
    this.submitted = true
    this.validate()
    if (this.form.isValid)
      this.$emit('submit')
  }
}
