// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Category } from '../services';
import { Article } from '../services';

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
