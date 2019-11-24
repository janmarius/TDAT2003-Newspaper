// @flow
import category from './routes/category.js';
import articles from './routes/articles.js';
import comment from './routes/comment.js';
import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';

const public_path = path.join(__dirname, '/../../client/public');
const app = express();
const helmet = require('helmet');

type Request = express$Request;
type Response = express$Response;

// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());
app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

app.get('/api/categories', (req: Request, res: Response) => {
  category.getAllCategories(req, res);
});

app.get('/api/articles', (req: Request, res: Response) => {
  articles.getAllArticles(req, res);
});

app.post('/api/articles', (req: Request, res: Response) => {
  articles.createNewArticle(req, res);
});

app.get('/api/articles/category/:category', (req: Request, res: Response) => {
  articles.getAllArticlesInCategory(req, res);
});

app.get('/api/articles/category/:category/id/:id', (req: Request, res: Response) => {
  articles.getArticleInCategoryById(req, res);
});

app.put('/api/articles/category/:category/id/:id', (req: Request, res: Response) => {
  articles.updateArticle(req, res);
});

app.put('/api/articles/category/:category/id/:id/likes', (req: Request, res: Response) => {
  articles.updateArticleLikes(req, res);
});

app.delete('/api/articles/category/:category/id/:id', (req: Request, res: Response) => {
  articles.deleteArticle(req, res);
});

app.get('/api/comments/article_id/:article_id', (req: Request, res: Response) => {
  comment.getAllComments(req, res);
});

app.post('/api/comments/article_id/:atricle_id/new', (req: Request, res: Response) => {
  comment.addComment(req, res);
});

// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

export let application = app;

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
  app.listen(3000, (error: any) => {
    if (error) reject(error.message);
    console.log('Server started');
    resolve();
  });
});
