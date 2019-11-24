// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { Article } from '../services';

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
