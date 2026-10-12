import { firebaseConfig } from './firebase.config';

export const environment = {
  production: true,
  name:'prod',
  firebase: {
    config: firebaseConfig
  },
  url: 'http://localhost:5000/'
};
