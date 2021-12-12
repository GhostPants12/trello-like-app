import $api from '../http';

export default class AuthService {
  static login = async (username, password) => {
    return $api
      .post('auth/login', { username, password })
      .then((response) => response.data.access_token);
  };

  static loginGoogle = async () => {
    return $api.get('auth/login/google');
  };

  static register = async (username, email, password) => {
    return $api
      .post('auth/register', { username, email, password })
      .then((response) => response.data.access_token);
  };

  static user = async () => {
    return $api.get('user', {}).then((response) => {
      console.log(response);
      return response.data;
    });
  };
}
