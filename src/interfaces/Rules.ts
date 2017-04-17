import Validator from 'classes/Validator'

interface Rules {
  [x: string]: Validator|Array<Validator>|Rules
}

export default Rules
