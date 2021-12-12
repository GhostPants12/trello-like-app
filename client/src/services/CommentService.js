import $api from '../http';

export default class CommentService {
  static postComment = async (cardId, text) => {
    return $api
      .post('c/' + cardId + '/comments', { text: text })
      .then((response) => console.log(response));
  };

  static deleteComment = async (commentId) => {
    return $api
      .delete('comments/' + commentId)
      .then((response) => console.log(response));
  };

  static putComment = async (commentId, text) => {
    return $api
      .put('comments/' + commentId, { text: text })
      .then((response) => console.log(response));
  };
}
