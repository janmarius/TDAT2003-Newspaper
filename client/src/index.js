// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';

// Components
import { Alert } from './widgets';
import { NavBarMenu } from './components/NavBarMenuComponent';
import { LiveNewsFeed } from './components/LiveNewsFeedComponent';
import { AllArticles } from './components/FrontPageArticlesComponent';
import { AddCommentForm } from './components/AddCommentComponent';
import { AllArticlesOfOneCategory } from './components/CategoryArticlesComponent';
import { ArticleDetailsView } from './components/ArticleDetailsViewComponent';
import { EditArticleForm } from './components/EditArticleComponent';
import { DeleteArticleForm } from './components/DeleteArticleComponent';
import { AddNewArticleForm } from './components/CreateArticleComponent';
import { Footer } from './components/FooterComponent';

// Services
import { Comment } from './services';
import { Category } from './services';
import { Article } from './services';
import { article } from './services';
import { comment } from './services';
import { articleService } from './services';
import { categoryService } from './services';
import { commentService } from './services';

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

class Menu extends Component {
  categories: Category[] = [];

  render() {
    return <NavBarMenu categories={this.categories} />;
  }

  mounted() {
    categoryService
      .getAllCategories()
      .then(categories => (this.categories = categories))
      .catch((error: Error) => Alert.danger(error.message));
  }
}

export class Home extends Component {
  articles: Article[] = [];

  render() {
    return (
      <div>
        <LiveNewsFeed articles={this.articles} maxNumberOfArticles={5} />
        <AllArticles articles={this.articles} maxNumberOfArticles={20} inputObject={this} />
      </div>
    );
  }

  mounted() {
    articleService
      .getAllArticles()
      .then(articles => (this.articles = articles))
      .catch((error: Error) => Alert.danger(error.message));
  }

  save(article: Article, id: number, category: string) {
    articleService
      .updateArticlesLikes(article, id, category)
      .then(() => {
        let home = Home.instance();
        if (home) home.mounted();
        if (article) history.push('/');
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class ArticleAddComment extends Component<{ match: { params: { id: number, category: string } } }> {
  comment: Comment = comment;

  render() {
    return (
      <AddCommentForm
        comment={this.comment}
        addMethod={this.add}
        article_id={Number(this.props.match.params.id)}
        formId={'addCommentForm'}
      />
    );
  }

  add() {
    if (!this.comment) return null;

    let form = document.getElementById('addCommentForm');
    // $FlowFixMe
    if (form.checkValidity()) {
      commentService
        .addComments(this.props.match.params.id, this.comment)
        .then(() => {
          let articleDetails = ArticleDetails.instance();
          if (articleDetails) articleDetails.mounted(); // Update articleDetails
          if (this.comment)
            history.push('/category/' + this.props.match.params.category + '/id/' + this.props.match.params.id);
        })
        .catch((error: Error) => Alert.danger(error.message));
    }
  }
}

export class ArticleCategoryList extends Component<{ match: { params: { category: string } } }> {
  articles: Article[] = [];

  render() {
    return <AllArticlesOfOneCategory articles={this.articles} />;
  }

  mounted() {
    articleService
      .getAllOfCategory(this.props.match.params.category)
      .then(articles => (this.articles = articles))
      .catch((error: Error) => Alert.danger(error.message));
  }

  save(article: Article, id: number, category: string) {
    articleService
      .updateArticlesLikes(article, id, category)
      .then(() => {
        let articleCategoryList = ArticleCategoryList.instance();
        if (articleCategoryList) articleCategoryList.mounted();
        if (article) history.push('/category/' + this.props.match.params.category);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}

export class ArticleDetails extends Component<{ match: { params: { id: number, category: string } } }> {
  article = null;
  comments: Comment[] = [];

  render() {
    if (!this.article) return null;
    return <ArticleDetailsView article={this.article} comments={this.comments} />;
  }

  mounted() {
    commentService
      .getAllComments(this.props.match.params.id)
      .then(comments => (this.comments = comments))
      .catch((error: Error) => Alert.danger(error.message));
    articleService
      .getOneArticles(this.props.match.params.id, this.props.match.params.category.toLowerCase())
      .then(article => (this.article = article))
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class ArticleEdit extends Component<{ match: { params: { id: number, category: string } } }> {
  categories: Category[] = [];
  article: Article = article;

  render() {
    if (!this.article) return null;
    if (!this.categories) return null;

    return (
      <EditArticleForm categories={this.categories} article={this.article} saveMethod={this.save} formId={'editForm'} />
    );
  }

  mounted() {
    categoryService
      .getAllCategories()
      .then(categories => (this.categories = categories))
      .catch((error: Error) => Alert.danger(error.message));
    articleService
      .getOneArticles(this.props.match.params.id, this.props.match.params.category)
      .then(article => (this.article = article))
      .catch((error: Error) => Alert.danger(error.message));
  }

  save() {
    if (!this.article) return null;

    let form = document.getElementById('editForm');
    // $FlowFixMe
    if (form.checkValidity()) {
      articleService
        .updateArticles(this.article, this.props.match.params.id, this.props.match.params.category)
        .then(() => {
          let articleDetails = ArticleDetails.instance();
          if (articleDetails) articleDetails.mounted(); // Update articleDetails
          if (this.article) history.push('/category/' + this.article.category + '/id/' + this.article.id);
        })
        .catch((error: Error) => Alert.danger(error.message));
    }
  }
}

class ArticleDelete extends Component<{ match: { params: { id: number, category: string } } }> {
  article: Article = article;

  render() {
    if (!this.article) return null;

    return <DeleteArticleForm deleteMethod={this.delete} undoMethod={this.undo} />;
  }

  mounted() {
    articleService
      .getOneArticles(this.props.match.params.id, this.props.match.params.category)
      .then(article => (this.article = article))
      .catch((error: Error) => Alert.danger(error.message));
  }

  delete() {
    articleService
      .deleteArticles(this.props.match.params.id, this.props.match.params.category)
      .then(() => {
        let articleCategoryList = ArticleCategoryList.instance();
        if (articleCategoryList) articleCategoryList.mounted(); // Update ArticleCategoryList-component
        if (this.article) history.push('/category/' + this.props.match.params.category);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }

  undo() {
    history.push('/category/' + this.props.match.params.category + '/id/' + this.props.match.params.id);
  }
}

class ArticleAdd extends Component {
  categories = [];
  article = article;

  render() {
    return (
      <AddNewArticleForm categories={this.categories} article={this.article} addMethod={this.add} formId={'addForm'} />
    );
  }

  mounted() {
    categoryService
      .getAllCategories()
      .then(categories => (this.categories = categories))
      .catch((error: Error) => Alert.danger(error.message));
  }

  add() {
    if (!this.article) return null;

    let form = document.getElementById('addForm');
    // $FlowFixMe
    if (form.checkValidity()) {
      articleService
        .addArticles(this.article)
        .then(() => {
          let articleCategoryList = ArticleCategoryList.instance();
          if (articleCategoryList) articleCategoryList.mounted(); // Update ArticleCategoryList-component
          if (this.article) history.push('/category/' + this.article.category);
        })
        .catch((error: Error) => Alert.danger(error.message));
    }
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/new" component={ArticleAdd} />
        <Route exact path="/category/:category" component={ArticleCategoryList} />
        <Route exact path="/category/:category/id/:id" component={ArticleDetails} />
        <Route exact path="/category/:category/id/:id/edit" component={ArticleEdit} />
        <Route exact path="/category/:category/id/:id/delete" component={ArticleDelete} />
        <Route exact path="/category/:category/id/:id/comments/new" component={ArticleAddComment} />
        <Footer />
      </div>
    </HashRouter>,
    root
  );
