// @flow

import { Article, Category, Comment, sync } from '../src/models.js';


beforeAll(async () => {
  await sync;
});

describe("Category.findAll() {order: [['priority', 'ASC']]} test", () => {
  it('correct data', async () => {
    let category = await Category.findAll({
      order: [['priority', 'ASC']]
    });
    expect(
      category.map(category => category.toJSON()).map(category => ({
        category: category.category,
        priority: category.priority
      }))
    ).toEqual([
      {
        category: 'News',
        priority: 1
      },
      {
        category: 'Sport',
        priority: 2
      },
      {
        category: 'Culture',
        priority: 3
      },
      {
        category: 'Tech',
        priority: 4
      }
    ]);
  });
});

describe('Article.findAll() test', () => {
  it('correct data', async () => {
    let article = await Article.findAll();
    expect(
      article.map(article => article.toJSON()).map(article => ({
        id: article.id,
        title: article.title,
        body: article.body,
        image: article.image,
        important: article.important,
        category: article.category
      }))
    ).toEqual([
      {
        id: 1,
        title: 'NewsTitle1',
        body: 'NewsBody1',
        image:
          'https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5966fbd4a3212dc13c7ad81c4d665354&auto=format&fit=crop&w=1350&q=80',
        important: true,
        category: 'News'
      },
      {
        id: 2,
        title: 'SportTitle1',
        body: 'SportBody1',
        image:
          'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=10794df94c2543bee8f590b3681452c7&auto=format&fit=crop&w=1350&q=80',
        important: false,
        category: 'Sport'
      },
      {
        id: 3,
        title: 'SportTitle2',
        body: 'SportBody2',
        image:
          'https://images.unsplash.com/photo-1513907450027-b9926e160c2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=825b2571e6253b4336f0fba4604e6443&auto=format&fit=crop&w=1349&q=80',
        important: true,
        category: 'Sport'
      }
    ]);
  });
});

describe('Article.create() test', () => {
  it('correct data', async () => {
    await Article.create({
      title: 'CultureTitle1',
      body: 'CultureBody1',
      image:
        'https://images.unsplash.com/photo-1515900959941-d1cce424f5c4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c9c593bad87f0e4db0fdb8fcb965a90&auto=format&fit=crop&w=1351&q=80',
      important: true,
      category: 'Culture'
    });

    let article = await Article.findAll();
    expect(
      article.map(article => article.toJSON()).map(article => ({
        id: article.id,
        title: article.title,
        body: article.body,
        image: article.image,
        important: article.important,
        category: article.category
      }))
    ).toEqual([
      {
        id: 1,
        title: 'NewsTitle1',
        body: 'NewsBody1',
        image:
          'https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5966fbd4a3212dc13c7ad81c4d665354&auto=format&fit=crop&w=1350&q=80',
        important: true,
        category: 'News'
      },
      {
        id: 2,
        title: 'SportTitle1',
        body: 'SportBody1',
        image:
          'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=10794df94c2543bee8f590b3681452c7&auto=format&fit=crop&w=1350&q=80',
        important: false,
        category: 'Sport'
      },
      {
        id: 3,
        title: 'SportTitle2',
        body: 'SportBody2',
        image:
          'https://images.unsplash.com/photo-1513907450027-b9926e160c2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=825b2571e6253b4336f0fba4604e6443&auto=format&fit=crop&w=1349&q=80',
        important: true,
        category: 'Sport'
      },
      {
        id: 4,
        title: 'CultureTitle1',
        body: 'CultureBody1',
        image:
          'https://images.unsplash.com/photo-1515900959941-d1cce424f5c4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c9c593bad87f0e4db0fdb8fcb965a90&auto=format&fit=crop&w=1351&q=80',
        important: true,
        category: 'Culture'
      }
    ]);
  });
});

describe("Article.findAll() where: {category: 'Sport'} test", () => {
  it('correct data', async () => {
    let article = await Article.findAll({
      where: {
        category: 'Sport'
      }
    });
    expect(
      article.map(article => article.toJSON()).map(article => ({
        id: article.id,
        title: article.title,
        body: article.body,
        image: article.image,
        important: article.important,
        category: article.category
      }))
    ).toEqual([
      {
        id: 2,
        title: 'SportTitle1',
        body: 'SportBody1',
        image:
          'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=10794df94c2543bee8f590b3681452c7&auto=format&fit=crop&w=1350&q=80',
        important: false,
        category: 'Sport'
      },
      {
        id: 3,
        title: 'SportTitle2',
        body: 'SportBody2',
        image:
          'https://images.unsplash.com/photo-1513907450027-b9926e160c2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=825b2571e6253b4336f0fba4604e6443&auto=format&fit=crop&w=1349&q=80',
        important: true,
        category: 'Sport'
      }
    ]);
  });
});

describe('Article.findOne() where: {id: 1} test', () => {
  it('correct data', async () => {
    // Flow gave an error when using sequelize .findOne method, couldn't find the cause. Used flow fix me to ignore the error.
    // $FlowFixMe
    let article = await Article.findOne({ where: { id: 1 } });
    let articleAsArray = [article];

    expect(
      articleAsArray.map(article => article.toJSON()).map(article => ({
        id: article.id,
        title: article.title,
        body: article.body,
        image: article.image,
        important: article.important,
        category: article.category
      }))
    ).toEqual([
      {
        id: 1,
        title: 'NewsTitle1',
        body: 'NewsBody1',
        image:
          'https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5966fbd4a3212dc13c7ad81c4d665354&auto=format&fit=crop&w=1350&q=80',
        important: true,
        category: 'News'
      }
    ]);
  });
});

describe('Article.update() test', () => {
  it('correct data', async () => {
    await Article.update(
      {
        title: 'NewsTitle1Edited',
        body: 'NewsBody1Edited',
        image:
          'https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5966fbd4a3212dc13c7ad81c4d665354&auto=format&fit=crop&w=1350&q=80',
        important: true,
        category: 'News'
      },
      {
        where: { id: 1 }
      }
    );

    let article = await Article.findAll();
    expect(
      article.map(article => article.toJSON()).map(article => ({
        id: article.id,
        title: article.title,
        body: article.body,
        image: article.image,
        important: article.important,
        category: article.category
      }))
    ).toEqual([
      {
        id: 1,
        title: 'NewsTitle1Edited',
        body: 'NewsBody1Edited',
        image:
          'https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5966fbd4a3212dc13c7ad81c4d665354&auto=format&fit=crop&w=1350&q=80',
        important: true,
        category: 'News'
      },
      {
        id: 2,
        title: 'SportTitle1',
        body: 'SportBody1',
        image:
          'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=10794df94c2543bee8f590b3681452c7&auto=format&fit=crop&w=1350&q=80',
        important: false,
        category: 'Sport'
      },
      {
        id: 3,
        title: 'SportTitle2',
        body: 'SportBody2',
        image:
          'https://images.unsplash.com/photo-1513907450027-b9926e160c2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=825b2571e6253b4336f0fba4604e6443&auto=format&fit=crop&w=1349&q=80',
        important: true,
        category: 'Sport'
      },
      {
        id: 4,
        title: 'CultureTitle1',
        body: 'CultureBody1',
        image:
          'https://images.unsplash.com/photo-1515900959941-d1cce424f5c4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c9c593bad87f0e4db0fdb8fcb965a90&auto=format&fit=crop&w=1351&q=80',
        important: true,
        category: 'Culture'
      }
    ]);
  });
});

describe('Article.destroy() test', () => {
  it('correct data', async () => {
    await Article.destroy({
      where: { id: 4 }
    });

    let article = await Article.findAll();
    expect(
      article.map(article => article.toJSON()).map(article => ({
        id: article.id,
        title: article.title,
        body: article.body,
        image: article.image,
        important: article.important,
        category: article.category
      }))
    ).toEqual([
      {
        id: 1,
        title: 'NewsTitle1Edited',
        body: 'NewsBody1Edited',
        image:
          'https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5966fbd4a3212dc13c7ad81c4d665354&auto=format&fit=crop&w=1350&q=80',
        important: true,
        category: 'News'
      },
      {
        id: 2,
        title: 'SportTitle1',
        body: 'SportBody1',
        image:
          'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=10794df94c2543bee8f590b3681452c7&auto=format&fit=crop&w=1350&q=80',
        important: false,
        category: 'Sport'
      },
      {
        id: 3,
        title: 'SportTitle2',
        body: 'SportBody2',
        image:
          'https://images.unsplash.com/photo-1513907450027-b9926e160c2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=825b2571e6253b4336f0fba4604e6443&auto=format&fit=crop&w=1349&q=80',
        important: true,
        category: 'Sport'
      }
    ]);
  });
});

describe('Comment.findAll() {where: {article_id: 1}} test', () => {
  it('correct data', async () => {
    let comment = await Comment.findAll({
      where: { article_id: 1 }
    });
    expect(
      comment.map(comment => comment.toJSON()).map(comment => ({
        article_id: comment.article_id,
        nickname: comment.nickname,
        comment: comment.comment
      }))
    ).toEqual([
      {
        article_id: 1,
        nickname: 'anonym88',
        comment: 'Freedom...'
      }
    ]);
  });
});

describe('Comment.create() test', () => {
  it('correct data', async () => {
    await Comment.create({
      article_id: 1,
      nickname: 'anonymNew',
      comment: 'NewComment'
    });

    let comment = await Comment.findAll({
      where: { article_id: 1 }
    });
    expect(
      comment.map(comment => comment.toJSON()).map(comment => ({
        article_id: comment.article_id,
        nickname: comment.nickname,
        comment: comment.comment
      }))
    ).toEqual([
      {
        article_id: 1,
        nickname: 'anonym88',
        comment: 'Freedom...'
      },
      {
        article_id: 1,
        nickname: 'anonymNew',
        comment: 'NewComment'
      }
    ]);
  });
});
