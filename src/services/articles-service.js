/* eslint-disable class-methods-use-this */
import { instance, authInstance } from './instances';

export default class ArticleService {
  getArticlesWithoutAuth(page = 1, limit = 5) {
    const offset = page * 5 - 5;
    return instance.get(`articles?offset=${offset}&limit=${limit}`);
  }

  getArticlesWithAuth(page = 1, limit = 5) {
    const offset = page * 5 - 5;
    return authInstance.get(`articles?offset=${offset}&limit=${limit}`);
  }

  getArticleWithoutAuth(slug) {
    return instance.get(`articles/${slug}`);
  }

  getCurrentArticleWithAuth(slug) {
    return authInstance.get(`articles/${slug}`);
  }

  sendArticle(data) {
    return authInstance.post('articles', data);
  }

  deleteArticle(slug) {
    return authInstance.delete(`articles/${slug}`);
  }

  editArticle(slug, data) {
    return authInstance.put(`articles/${slug}`, data);
  }
}
