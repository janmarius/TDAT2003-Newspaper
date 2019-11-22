// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { Comment } from './services';
import { Category } from './services';
import { Article } from './services';

const dateFormat = require('dateformat');

export class NavBarMenu extends Component<{ categories: Category[] }> {
  render() {
    return (
      <table className={'navbar navbar-expand-lg navbar-light bg-light sticky-top'}>
        <tbody>
          <tr>
            <td>
              <NavLink className={'navbar-brand'} activeStyle={{ color: 'darkblue' }} exact to="/">
                Home
              </NavLink>
            </td>
            {this.props.categories.map(category => (
              <td key={category.category}>
                <NavLink
                  className={'navbar-brand'}
                  activeStyle={{ color: 'darkblue' }}
                  to={'/category/' + category.category}
                >
                  {category.category}
                </NavLink>
              </td>
            ))}
          </tr>
        </tbody>
        <tbody className="ml-auto">
          <tr>
            <td>
              <NavLink className={'navbar-brand'} activeStyle={{ color: 'darkblue' }} to="/new">
                Add new article
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export class LiveNewsFeed extends Component<{ articles: Article[], maxNumberOfArticles: number }> {
  render() {
    return (
      <div>
        <marquee>
          <h3 className="newsFeedHead">Breaking news:</h3>
          {this.props.articles
            .map(article => (
              <div className="newsFeedArticleBox" key={article.id}>
                <NavLink exact to={'/category/' + article.category.toLocaleLowerCase() + '/id/' + article.id}>
                  <h3 className="newsFeedArticle">
                    {dateFormat(article.updatedAt, 'd.m.yy HH:MM - ')}
                    {article.title}
                  </h3>
                </NavLink>
              </div>
            ))
            .splice(0, this.props.maxNumberOfArticles)}
        </marquee>
      </div>
    );
  }
}

export class AllArticles extends Component<{ articles: Article[], maxNumberOfArticles: number }> {
  render() {
    return (
      <div className={'container'}>
        <div className={'row'}>
          {this.props.articles
            .filter(article => article.important)
            .map(article => (
              <div className={'col-sm-12 col-md-6 col-lg-6'} key={article.id}>
                <div className={'card  card-extra'}>
                  <NavLink exact to={'/category/' + article.category.toLocaleLowerCase() + '/id/' + article.id}>
                    <img className={'card-img-top'} src={article.image} alt={'Card image cap'} />
                  </NavLink>
                  <div className={'card-body'}>
                    <NavLink
                      className={'card-title-extra'}
                      activeStyle={{ color: 'darkblue' }}
                      exact
                      to={'/category/' + article.category.toLocaleLowerCase() + '/id/' + article.id}
                    >
                      <h2 className={'card-title card-title-extra'}>{article.title}</h2>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))
            .splice(0, this.props.maxNumberOfArticles)}
        </div>
      </div>
    );
  }
}

export class AddCommentForm extends Component<{
  comment: Comment,
  addMethod: any,
  article_id: number,
  formId: string
}> {
  render() {
    this.props.comment.article_id = Number(this.props.article_id);
    return (
      <div className="container container-extra">
        <form id={this.props.formId}>
          <div className="form-group">
            <label htmlFor="nicknameAdd">Nickname</label>
            <input
              className="form-control"
              id="nicknameAdd"
              type="text"
              placeholder="Nickname"
              maxLength="10"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.props.comment) this.props.comment.nickname = event.target.value;
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="commentAdd">Comment</label>
            <textarea
              className="form-control"
              id="commentAdd"
              type="text"
              placeholder="Comment"
              cols="30"
              rows="10"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.props.comment) this.props.comment.comment = event.target.value;
              }}
              required
            />
          </div>
          <div className="form-group">
            <input type="submit" className="form-control" value="Save changes" onClick={this.props.addMethod} />
          </div>
        </form>
      </div>
    );
  }
}

export class AllArticlesOfOneCategory extends Component<{ articles: Article[] }> {
  render() {
    return (
      <div className={'container container-extra'}>
        <div className={'row'}>
          {this.props.articles.map(article => (
            <div className={'col-sm-12 col-md-6 col-lg-4'} key={article.id}>
              <div className={'card card-extra'}>
                <NavLink exact to={'/category/' + article.category.toLocaleLowerCase() + '/id/' + article.id}>
                  <img className={'card-img-top'} src={article.image} alt={'Card image cap'} />
                </NavLink>
                <div className={'card-body'}>
                  <NavLink
                    className={'card-title-extra'}
                    activeStyle={{ color: 'darkblue' }}
                    exact
                    to={'/category/' + article.category.toLocaleLowerCase() + '/id/' + article.id}
                  >
                    <h5 className={'card-title card-title-extra'}>{article.title}</h5>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export class ArticleDetailsView extends Component<{ article: Article, comments: Comment[] }> {
  render() {
    return (
      <div>
        <div className={'container container-extra'}>
          <div className={'row'}>
            <div className={'col-sm-12 col-md-12 col-lg-12'}>
              <div className={'card card-extra'}>
                <img className={'card-img-top'} src={this.props.article.image} alt={'Card image cap'} />
                <div className={'card-body'}>
                  <h1 className={'card-title card-title-extra'}>{this.props.article.title}</h1>
                  <p className={'card-text'}>{dateFormat(this.props.article.updatedAt, 'd.m.yy HH:MM')}</p>
                  <p className="card-text">{this.props.article.body}</p>

                  <NavLink
                    className={'btn btn-outline-dark articleButtonColor'}
                    activeStyle={{ color: 'darkblue' }}
                    to={
                      '/category/' +
                      this.props.article.category.toLowerCase() +
                      '/id/' +
                      this.props.article.id +
                      '/delete'
                    }
                  >
                    delete
                  </NavLink>
                  <NavLink
                    className={'btn btn-outline-dark articleButtonColor'}
                    activeStyle={{ color: 'darkblue' }}
                    to={
                      '/category/' +
                      this.props.article.category.toLowerCase() +
                      '/id/' +
                      this.props.article.id +
                      '/edit'
                    }
                  >
                    edit
                  </NavLink>
                  <NavLink
                    className={'btn btn-outline-dark articleButtonColor'}
                    activeStyle={{ color: 'darkblue' }}
                    to={
                      '/category/' +
                      this.props.article.category.toLowerCase() +
                      '/id/' +
                      this.props.article.id +
                      '/comments/new'
                    }
                  >
                    add comment
                  </NavLink>
                </div>
              </div>
            </div>
            {this.props.comments.map(comment => (
              <div className={'col-sm-12 col-md-12 col-lg-12'} key={comment.id}>
                <div className={'card card-extra'}>
                  <div className={'card-body'}>
                    <p className={'card-text'}>{dateFormat(comment.createdAt, 'd.m.yy HH:MM')}</p>
                    <h5 className={'card-title card-title-extra'}>{comment.nickname}</h5>
                    <p className={'card-text'}>{comment.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export class EditArticleForm extends Component<{
  categories: Category[],
  article: Article,
  saveMethod: any,
  formId: string
}> {
  render() {
    return (
      <div className="container container-extra">
        <form id={this.props.formId}>
          <div className="form-group imageContainer">
            <img src={this.props.article.image} alt="" className="imagePreviewer" />
          </div>
          <div className="form-group">
            <label htmlFor="imageEdit">Image URL</label>
            <input
              className="form-control"
              id="imageEdit"
              type="text"
              placeholder="https://..."
              pattern="https?://.+"
              value={this.props.article.image}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.props.article) this.props.article.image = event.target.value;
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="titleEdit">Title</label>
            <input
              className="form-control"
              id="titleEdit"
              type="text"
              placeholder="Title"
              maxLength="100"
              value={this.props.article.title}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.props.article) this.props.article.title = event.target.value;
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bodyEdit">Body</label>
            <textarea
              className="form-control"
              id="bodyEdit"
              type="text"
              placeholder="Enter article body here.."
              cols="30"
              rows="10"
              value={this.props.article.body}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.props.article) this.props.article.body = event.target.value;
              }}
              required
            />
          </div>
          <div className="form-group">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="categoryEdit">
                  Category
                </label>
              </div>
              <select
                className="custom-select"
                id="categoryEdit"
                defaultValue={this.props.article.category}
                onChange={(event: SyntheticInputEvent<HTMLSelectElement>) => {
                  if (this.props.article) this.props.article.category = event.target.value;
                }}
              >
                {this.props.categories.map(category => (
                  <option value={category.category} key={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-check-label" htmlFor="importantEdit">
              Front page
            </label>
            <input
              className="form-control"
              id="importantEdit"
              type="checkbox"
              checked={this.props.article.important}
              onChange={() => {
                if (this.props.article) this.props.article.important = !this.props.article.important;
              }}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="form-control" value="Save changes" onClick={this.props.saveMethod} />
          </div>
        </form>
      </div>
    );
  }
}

export class DeleteArticleForm extends Component<{ deleteMethod: any, undoMethod: any }> {
  render() {
    return (
      <div>
        <div className={'container container-extra'}>
          <div className={'row'}>
            <div className={'col-sm-12 col-md-12 col-lg-12'}>
              <div className={'card card-extra'}>
                <div className={'card-body'}>
                  <h5 className={'card-title deleteArticleStyle'}>
                    Are you sure you want to permanently remove this item?
                  </h5>
                  <div className={'deleteButtonStyle'}>
                    <button className={'btn btn-danger '} type="button" onClick={this.props.deleteMethod}>
                      Yes
                    </button>
                    <button className={'btn btn-secondary '} type="button" onClick={this.props.undoMethod}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class AddNewArticleForm extends Component<{
  categories: Category[],
  article: Article,
  addMethod: any,
  formId: string
}> {
  render() {
    this.props.article.important = false;
    return (
      <div className="container container-extra">
        <form id="addForm">
          <div className="form-group imageContainer">
            <img src={this.props.article.image} alt="" className="imagePreviewer" />
          </div>
          <div className="form-group">
            <label htmlFor={this.props.formId}>Image URL</label>
            <input
              className="form-control"
              id="imageAdd"
              type="text"
              placeholder="https://..."
              pattern="https?://.+"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.props.article) this.props.article.image = event.target.value;
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="titleAdd">Title</label>
            <input
              className="form-control"
              id="titleAdd"
              type="text"
              placeholder="Title"
              maxLength="100"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.props.article) this.props.article.title = event.target.value;
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bodyAdd">Body</label>
            <textarea
              className="form-control"
              id="bodyAdd"
              type="text"
              placeholder="Enter article body here.."
              cols="30"
              rows="10"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.props.article) this.props.article.body = event.target.value;
              }}
              required
            />
          </div>
          <div className="form-group">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="categoryAdd">
                  Category
                </label>
              </div>
              <select
                className="custom-select"
                id="categoryAdd"
                onChange={(event: SyntheticInputEvent<HTMLSelectElement>) => {
                  if (this.props.article) this.props.article.category = event.target.value;
                }}
                required
              >
                <option selected value="">
                  Choose...
                </option>
                {this.props.categories.map(category => (
                  <option value={category.category} key={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-check-label" htmlFor="importantAdd">
              Front page
            </label>
            <input
              className="form-control"
              id="importantAdd"
              type="checkbox"
              // onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              //     console.log("Test ", event.target.value);
              //     if (event.target.value) {
              //         this.props.article.important = true;
              //     }
              // }}
              onChange={() => {
                if (this.props.article) this.props.article.important = !this.props.article.important;
              }}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="form-control" value="Save changes" onClick={this.props.addMethod} />
          </div>
        </form>
      </div>
    );
  }
}

/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
  alerts: { text: React.Node, type: string }[] = [];

  render() {
    return (
      <>
        {this.alerts.map((alert, i) => (
          <div key={i} className={'alert alert-' + alert.type} role="alert">
            {alert.text}
            <button
              className="close"
              onClick={() => {
                this.alerts.splice(i, 1);
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </>
    );
  }

  static success(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'success' });
    });
  }

  static info(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'info' });
    });
  }

  static warning(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'warning' });
    });
  }

  static danger(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'danger' });
    });
  }
}
