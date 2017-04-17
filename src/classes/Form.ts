import Vue from 'vue'
import Component from 'vue-class-component'
import Field from './Field'
import IsValid from 'interfaces/IsValid'

@Component
export default class Form extends Vue implements IsValid {
  fields: { [x: string]: Field|Form } = {}

  get isValid (): boolean {
    return Object.values(this.fields).every(field => field.isValid)
  }
}
