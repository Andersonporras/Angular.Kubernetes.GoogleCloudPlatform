import { firebaseConfig } from './firebase.config';

export const environment = {
  production: false,
  name:'dev',
  firebase: {
    config: firebaseConfig
  },
  url: 'http://localhost:5000/'

};
