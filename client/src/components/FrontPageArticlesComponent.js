// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { article, Article, Category } from '../services';

let FontAwesome = require('react-fontawesome');

export class AllArticles extends Component<{
  articles: Article[],
  maxNumberOfArticles: number
}> {
  startArticle: number = 0;
  currentPage: number = 1;

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
            .splice(this.startArticle, this.props.maxNumberOfArticles)}
        </div>
        <div className={'centerFrontPageNav'}>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="button"
            aria-pressed="false"
            autocomplete="off"
            onClick={() => {
              if (this.startArticle >= this.props.maxNumberOfArticles) {
                this.startArticle -= this.props.maxNumberOfArticles;
                this.currentPage -= 1;
              }
            }}
          >
            <FontAwesome name="arrow-left" />
          </button>{' '}
          Page: {this.currentPage} of {Math.ceil(this.props.articles.length / this.props.maxNumberOfArticles)}{' '}
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="button"
            aria-pressed="true"
            autocomplete="off"
            onClick={() => {
              console.log(this.startArticle + this.props.maxNumberOfArticles);
              console.log(this.props.articles.length);

              if (this.startArticle + this.props.maxNumberOfArticles < this.props.articles.length) {
                this.startArticle += this.props.maxNumberOfArticles;
                this.currentPage += 1;
              }
            }}
          >
            <FontAwesome name="arrow-right" />
          </button>
        </div>
      </div>
    );
  }
}
