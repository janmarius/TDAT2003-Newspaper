// @flow

import * as React from 'react';

// Widgets
import { Alert } from '../src/widgets.js';
import { NavBarMenu } from '../src/components/NavBarMenuComponent';
import { AllArticles } from '../src/components/FrontPageArticlesComponent';

import { shallow, mount } from 'enzyme';
import { NavLink } from 'react-router-dom';
import { Home } from '../src/index';

let FontAwesome = require('react-fontawesome');

let home = new Home();

describe('Alert tests', () => {
  const wrapper = shallow(<Alert />);

  it('initially', () => {
    let instance: ?Alert = Alert.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expect(instance.alerts).toEqual([]);

    expect(wrapper.find('button.close')).toHaveLength(0);
  });

  it('after danger', done => {
    Alert.danger('test');

    setTimeout(() => {
      let instance: ?Alert = Alert.instance();
      expect(typeof instance).toEqual('object');
      if (instance) expect(instance.alerts).toEqual([{ text: 'test', type: 'danger' }]);

      expect(wrapper.find('button.close')).toHaveLength(1);

      done();
    });
  });

  it('after clicking close button', () => {
    wrapper.find('button.close').simulate('click');

    let instance: ?Alert = Alert.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expect(instance.alerts).toEqual([]);

    expect(wrapper.find('button.close')).toHaveLength(0);
  });
});

describe('NavBarMeny test', () => {
  const wrapper = shallow(
    <NavBarMenu
      categories={[
        // Flow want me to use the real object type, I ignored this for the test by using flow fix me
        // $FlowFixMe
        { category: 'Test1' },
        // $FlowFixMe
        { category: 'Test2' }
      ]}
    />
  );

  it('initially', () => {
    expect(
      wrapper.containsAllMatchingElements([
        <NavLink className={'navbar-brand'} activeStyle={{ color: 'darkblue' }} to={'/category/Test1'}>
          Test1
        </NavLink>,
        <NavLink className={'navbar-brand'} activeStyle={{ color: 'darkblue' }} to={'/category/Test2'}>
          Test2
        </NavLink>
      ])
    ).toBe(true);
  });
});

describe('AllArticles test', () => {
  const wrapper = shallow(
    <AllArticles
      articles={[
        // Flow want me to use the real object type, I ignored this for the test by using flow fix me
        // $FlowFixMe
        {
          id: 1,
          important: true,
          category: 'News',
          image: 'https://www.google.no/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
          title: 'NewsTitle',
          likes: 0
        },
        // $FlowFixMe
        {
          id: 2,
          important: false,
          category: 'News2',
          image: 'https://www.google.no/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
          title: 'NewsTitle2',
          likes: 0
        }
      ]}
      maxNumberOfArticles={3}
      inputObject={home}
    />
  );

  it('correct AllArticles', () => {
    expect(
      wrapper.containsAllMatchingElements([
        <div className={'col-sm-12 col-md-6 col-lg-6'} key={1}>
          <div className={'card  card-extra'}>
            <NavLink exact to={'/category/news/id/1'}>
              <img
                className={'card-img-top'}
                src={'https://www.google.no/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'}
                alt={'Card image cap'}
              />
            </NavLink>
            <div className={'card-body'}>
              <NavLink
                className={'card-title-extra'}
                activeStyle={{ color: 'darkblue' }}
                exact
                to={'/category/news/id/1'}
              >
                <h2 className={'card-title card-title-extra'}>{'NewsTitle'}</h2>
              </NavLink>
              <p className={'card-text likeButton'}>
                {0}{' '}
                <button>
                  <FontAwesome name="thumbs-up" />
                </button>
              </p>
            </div>
          </div>
        </div>
      ])
    ).toBe(true);
  });
});
