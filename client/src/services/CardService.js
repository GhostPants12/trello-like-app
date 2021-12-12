import $api from '../http';

export default class CardService {
  static postCard = async (listId, name, description) => {
    return $api
      .post('l/' + listId + '/cards', { name: name, description: description })
      .then((response) => console.log(response));
  };

  static getCard = async (id) => {
    return $api.get('c/' + id).then((response) => response.data);
  };

  static moveCard = async (listId, cardId) => {
    return $api
      .put('l/' + listId + '/c/' + cardId)
      .then((response) => console.log(response));
  };

  static putCard = async (id, name, description) => {
    return $api
      .put('c/' + id, { name: name, description: description })
      .then((response) => console.log(response));
  };
}
