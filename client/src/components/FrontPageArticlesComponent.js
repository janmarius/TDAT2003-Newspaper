// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { Article } from '../services';

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
