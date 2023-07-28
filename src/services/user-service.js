/* eslint-disable class-methods-use-this */
import { instance, authInstance } from './instances';

export default class UserService {
  registration(user) {
    return instance.post('users', user);
  }

  login(user) {
    return instance.post('users/login', user);
  }

  updateProfileValues(user) {
    return authInstance.put('user', user);
  }
}
