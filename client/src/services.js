// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

export class Article {
  id: number;
  title: string;
  body: string;
  image: string;
  important: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
}
export let article = new Article();

class ArticleService {
  getAllArticles(): Promise<Article[]> {
    return axios.get('/api/articles');
  }

  getAllOfCategory(category: string): Promise<Article[]> {
    return axios.get('/api/articles/category/' + category);
  }

  getOneArticles(id: number, category: string): Promise<Article> {
    return axios.get('/api/articles/category/' + category + '/id/' + id);
  }

  updateArticles(article: Article, id: number, category: string): Promise<void> {
    return axios.put('/api/articles/category/' + category + '/id/' + id, article);
  }

  deleteArticles(id: number, category: string): Promise<void> {
    return axios.delete('/api/articles/category/' + category + '/id/' + id);
  }

  addArticles(article: Article): Promise<Article> {
    return axios.post('/api/articles', article);
  }
}
export let articleService = new ArticleService();

export class Category {
  category: string;
  priority: number;
}
export let category = new Category();

class CategoryService {
  getAllCategories(): Promise<Category[]> {
    return axios.get('/api/categories');
  }
}
export let categoryService = new CategoryService();

export class Comment {
  id: number;
  article_id: number;
  nickname: string;
  comment: string;
  createdAt: string;
  article_id: number;
}
export let comment = new Comment();

class CommentService {
  getAllComments(article_id: number): Promise<Comment[]> {
    return axios.get('/api/comments/article_id/' + article_id);
  }

  addComments(article_id: number, comment: Comment): Promise<Comment> {
    return axios.post('/api/comments/article_id/' + article_id + '/new', comment);
  }
}
export let commentService = new CommentService();
