// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Comment } from '../services';
import { Article } from '../services';
import { ArticleDetails } from '../index';

const dateFormat = require('dateformat');

let FontAwesome = require('react-fontawesome');

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
                  <ReactMarkdown source={this.props.article.body} />

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
                  <p className={'card-text likeButton'}>
                    {this.props.article.likes}{' '}
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      data-toggle="button"
                      aria-pressed="true"
                      autocomplete="off"
                      onClick={() => {
                        {
                          let articleDetails = ArticleDetails.instance();
                          if (articleDetails)
                            articleDetails.save(this.props.article, this.props.article.id, this.props.article.category);
                        }
                      }}
                    >
                      <FontAwesome name="thumbs-up" />
                    </button>
                  </p>
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
