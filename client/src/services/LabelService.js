import $api from '../http';

export default class LabelService {
  static postLabel = async (cardId, text) => {
    $api
      .post('c/' + cardId + '/labels', { text: text })
      .then((response) => console.log(response));
  };
}
