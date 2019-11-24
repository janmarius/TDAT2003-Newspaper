// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { Article } from '../services';

const dateFormat = require('dateformat');

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
