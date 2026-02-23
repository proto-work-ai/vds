import { merge } from '@atlas/utils/merge';

import prod from './environment.prod';
import dev from './environment';

const env: typeof dev = process.env.NODE_ENV === 'development' ? dev : merge(dev, prod);
export default env;
