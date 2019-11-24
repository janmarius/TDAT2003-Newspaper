// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { Article } from '../services';
import { ArticleCategoryList } from '../index';

let FontAwesome = require('react-fontawesome');

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
                  <p className={'card-text likeButton'}>
                    {article.likes}{' '}
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="button"
                      aria-pressed="true"
                      autocomplete="off"
                      onClick={() => {
                        {
                            let articleCategoryList = ArticleCategoryList.instance();
                            if (articleCategoryList) articleCategoryList.save(article, article.id, article.category);
                        }
                      }}
                    >
                      <FontAwesome name="thumbs-up" />
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
