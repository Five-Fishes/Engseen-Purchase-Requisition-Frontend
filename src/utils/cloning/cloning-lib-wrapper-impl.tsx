import { CloningLib } from './cloning-lib-wrapper';
import lodash from 'lodash';

export class LodashCloningLib implements CloningLib {
  deepClone<T>(input: T) {
    return lodash.cloneDeep<T>(input);
  }
  shallowClone<T>(input: T) {
    return lodash.clone<T>(input);
  }
}
