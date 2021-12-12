import $api from '../http';

export default class BoardService {
  static getBoards = async (query) => {
    return $api
      .get('user/boards', { params: { search: query } })
      .then((response) => response.data);
  };

  static getBoard = async (id) => {
    return $api.get('b/' + id).then((response) => response.data);
  };

  static postBoard = async (board) => {
    return $api.post('b', board).then((response) => console.log(response));
  };

  static putBoard = async (id, board) => {
    return $api.put('b/' + id, board).then((response) => console.log(response));
  };

  static postUser = async (id, username) => {
    return $api
      .post('b/' + id + '/user/' + username)
      .then((response) => console.log(response));
  };
}
