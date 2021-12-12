import $api from '../http';

export default class ListService {
  static postList = async (boardId, name) => {
    return $api
      .post('b/' + boardId + '/lists', { name: name })
      .then((response) => {
        console.log(response);
      });
  };

  static getList = async (listId) => {
    return $api.get('l/' + listId).then((response) => response.data);
  };
}
