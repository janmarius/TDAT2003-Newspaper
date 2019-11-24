// @flow

import * as React from 'react';
import { Component } from 'react-simplified';

import { Category } from '../services';
import { Article } from '../services';

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
