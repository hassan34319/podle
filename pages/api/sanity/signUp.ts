import { signUpHandler } from 'next-auth-sanity';

import { client } from '../../../app/utils/client';

export default signUpHandler(client);