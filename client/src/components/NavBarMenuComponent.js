// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { Category } from '../services';

export class NavBarMenu extends Component<{ categories: Category[] }> {
  render() {
    return (
      <table className={'navbar navbar-expand-lg navbar-light bg-light sticky-top'}>
        <tbody>
          <tr>
            <td>
              <a className="navbar-brand" href="#">
                <img
                  src="https://raw.githubusercontent.com/janmarius/TDAT2003-Newspaper/master/res/logo.png"
                  width="60"
                  height="40"
                  className="d-inline-block align-top"
                  alt=""
                />
              </a>
            </td>
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
