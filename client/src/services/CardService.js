import $api from '../http';

export default class CardService {
  static postCard = async (listId, name, description) => {
    return $api
      .post('l/' + listId + '/cards', { name: name, description: description })
      .then((response) => console.log(response));
  };
}
