import { LodashCloningLib } from './cloning-lib-wrapper-impl'

export interface CloningLib {
  deepClone: <T>(input: T) => T
  shallowClone: <T>(input: T) => T
}

const CLONING_LIB: CloningLib = new LodashCloningLib()

export default CLONING_LIB
