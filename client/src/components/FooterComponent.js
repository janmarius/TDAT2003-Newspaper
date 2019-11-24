// @flow

import * as React from 'react';
import { Component } from 'react-simplified';

let FontAwesome = require('react-fontawesome');

export class Footer extends Component<{}> {
  render() {
    return (
      <div className="footer pt-4 mt-4">
        <hr className="footer-line-style" />
        <div className="text-center sosial-media-buttons">
          <a href="https://www.facebook.com/">
            <FontAwesome className="sosial-media-buttons" name="facebook" />
          </a>{' '}
          <a href="https://www.instagram.com/">
            <FontAwesome className="sosial-media-buttons" name="instagram" />
          </a>{' '}
          <a href="https://www.spotify.com/">
            <FontAwesome className="sosial-media-buttons" name="spotify" />
          </a>{' '}
          <a href="https://www.itunes.com/">
            <FontAwesome className="sosial-media-buttons" name="apple" />
          </a>
        </div>
        <div className="text-center">
          <div fluid="true">
            <a className="contact-info contact-info-margin " href="janmariv@stud.ntnu.no">
              janmariv@stud.ntnu.no
            </a>
            <a className="contact-info contact-info-margin " href="tel:+4799998888">
              +4799998888
            </a>
          </div>
        </div>
      </div>
    );
  }
}
