import Dictionary from 'interfaces/Dictionary'

type PartialDictionary = {
  [x in keyof Dictionary]?: string
}

export default PartialDictionary
