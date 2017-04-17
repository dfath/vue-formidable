import Vue from 'vue'
import Component from 'vue-class-component'
import { Inject, Prop, Watch } from 'vue-property-decorator'
import Field from 'classes/Field'
import template from './template.html'

@Component({ template })
export default class extends Vue {
  @Prop(String)
  label: string

  @Prop({ type: Object, required: true })
  field: Field

  withIcon: boolean = false

  mounted () {
    if (this.$slots.default.length === 1) {
      const tag = this.$slots.default[0].tag
      if (tag && ['input', 'textarea'].includes(tag)) {
        this.withIcon = true
      }
    }
  }

  @Watch('field.isValid')
  onIsValidChanged (value: boolean) {
    if (this.$slots.default.length === 1) {
      this.$nextTick(() => {
        const el = this.$slots.default[0].elm
        if (el instanceof HTMLElement) {
          el.classList.toggle('is-danger', !value)
        }
      })
    }
  }
}
