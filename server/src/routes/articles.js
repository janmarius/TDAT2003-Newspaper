// @flow

import { Article } from '../models.js';

type Request = express$Request;
type Response = express$Response;

module.exports = {
  getAllArticles: function(req: Request, res: Response) {
    return Article.findAll({
      order: [['updatedAt', 'DESC']]
    }).then(articles => res.send(articles));
  },
  createNewArticle: function(req: Request, res: Response) {
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
      category: req.body.category,
      likes: 0
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
  },
  getAllArticlesInCategory: function(req: Request, res: Response) {
    return Article.findAll({
      where: {
        category: req.params.category
      },
      order: [['updatedAt', 'DESC']]
    }).then(article => res.send(article));
  },
  getArticleInCategoryById: function(req: Request, res: Response) {
    return Article.findOne({ where: { id: Number(req.params.id), category: req.params.category } }).then(article =>
      article ? res.send(article) : res.sendStatus(404)
    );
  },
  updateArticle: function(req: Request, res: Response) {
    if (
      !req.body ||
      typeof req.body.id != 'number' ||
      typeof req.body.title != 'string' ||
      typeof req.body.body != 'string' ||
      typeof req.body.image != 'string' ||
      typeof req.body.category != 'string' ||
      typeof req.body.important != 'boolean' ||
      typeof req.body.likes != 'number'
    )
      return res.sendStatus(400);

    return Article.update(
      {
        title: req.body.title,
        body: req.body.body,
        image: req.body.image,
        important: req.body.important,
        category: req.body.category,
        likes: req.body.likes
      },
      { where: { id: Number(req.params.id), category: req.params.category } }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
  },

  updateArticleLikes: function(req: Request, res: Response) {
    if (
      !req.body ||
      typeof req.body.id != 'number' ||
      typeof req.body.title != 'string' ||
      typeof req.body.body != 'string' ||
      typeof req.body.image != 'string' ||
      typeof req.body.category != 'string' ||
      typeof req.body.important != 'boolean' ||
      typeof req.body.likes != 'number'
    )
      return res.sendStatus(400);

    return Article.update(
      {
        title: req.body.title,
        body: req.body.body,
        image: req.body.image,
        important: req.body.important,
        category: req.body.category,
        likes: req.body.likes + 1
      },
      { where: { id: Number(req.params.id), category: req.params.category } }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
  },
  deleteArticle: function(req: Request, res: Response) {
    return Article.destroy({ where: { id: Number(req.params.id), category: req.params.category } }).then(article =>
      article ? res.send() : res.status(400).send()
    );
  }
};
