// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';

import { Category } from './models.js';
import { Article } from './models.js';
import { Comment } from './models.js';

type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');

let app = express();

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

app.get('/categories', (req: Request, res: Response) => {
  return Category.findAll({
    order: [['priority', 'ASC']]
  }).then(categories => res.send(categories));
});

app.get('/articles', (req: Request, res: Response) => {
  return Article.findAll({
    order: [['updatedAt', 'DESC']]
  }).then(articles => res.send(articles));
});

app.post('/articles', (req: Request, res: Response) => {
  if (
    !req.body ||
    typeof req.body.title != 'string' ||
    typeof req.body.body != 'string' ||
    typeof req.body.image != 'string' ||
    typeof req.body.category != 'string' ||
    typeof req.body.important != 'boolean'
  )
    return res.sendStatus(400);

  return Article.create({
    title: req.body.title,
    body: req.body.body,
    image: req.body.image,
    important: req.body.important,
    category: req.body.category
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(409))); // 409 conflict
});

app.get('/articles/category/:category', (req: Request, res: Response) => {
  return Article.findAll({
    where: {
      category: req.params.category
    },
    order: [['updatedAt', 'DESC']]
  }).then(article => res.send(article));
});

app.get('/articles/category/:category/id/:id', (req: Request, res: Response) => {
  return Article.findOne({ where: { id: Number(req.params.id), category: req.params.category } }).then(
    article => (article ? res.send(article) : res.sendStatus(404))
  );
});

app.put('/articles/category/:category/id/:id', (req: Request, res: Response) => {
  if (
    !req.body ||
    typeof req.body.id != 'number' ||
    typeof req.body.title != 'string' ||
    typeof req.body.body != 'string' ||
    typeof req.body.image != 'string' ||
    typeof req.body.category != 'string' ||
    typeof req.body.important != 'boolean'
  )
    return res.sendStatus(400);

  return Article.update(
    {
      title: req.body.title,
      body: req.body.body,
      image: req.body.image,
      important: req.body.important,
      category: req.body.category
    },
    { where: { id: Number(req.params.id), category: req.params.category } }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/articles/category/:category/id/:id', (req: Request, res: Response) => {
  return Article.destroy({ where: { id: Number(req.params.id), category: req.params.category } }).then(
    article => (article ? res.send() : res.status(500).send())
  );
});

app.get('/comments/article_id/:article_id', (req: Request, res: Response) => {
  return Comment.findAll({
    where: {
      article_id: req.params.article_id
    },
    order: [['createdAt', 'DESC']]
  }).then(comments => res.send(comments));
});

app.post('/comments/article_id/:atricle_id/new', (req: Request, res: Response) => {
  if (
    !req.body ||
    typeof req.body.nickname != 'string' ||
    typeof req.body.comment != 'string' ||
    typeof req.body.article_id != 'number'
  )
    return res.sendStatus(400);

  return Comment.create({
    nickname: req.body.nickname,
    comment: req.body.comment,
    article_id: req.body.article_id
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
  app.listen(3000, (error : any) => {
    if (error) reject(error.message);
    console.log('Server started');
    resolve();
  });
});
