// @flow

import * as React from 'react';
import { Component } from 'react-simplified';

export class DeleteArticleForm extends Component<{ deleteMethod: any, undoMethod: any }> {
  render() {
    return (
      <div>
        <div className={'container container-extra'}>
          <div className={'row'}>
            <div className={'col-sm-12 col-md-12 col-lg-12'}>
              <div className={'card card-extra'}>
                <div className={'card-body'}>
                  <h5 className={'card-title deleteArticleStyle'}>
                    Are you sure you want to permanently remove this item?
                  </h5>
                  <div className={'deleteButtonStyle'}>
                    <button className={'btn btn-danger '} type="button" onClick={this.props.deleteMethod}>
                      Yes
                    </button>
                    <button className={'btn btn-secondary '} type="button" onClick={this.props.undoMethod}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
