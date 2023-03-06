import store from '../store';
import { configErrorHandler } from '.';
import { signOut } from '../store/auth';

configErrorHandler(() => store.dispatch(signOut({ skipRevoke: true })));
