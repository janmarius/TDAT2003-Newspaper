// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Comment } from '../services';

export class AddCommentForm extends Component<{
  comment: Comment,
  addMethod: any,
  article_id: number,
  formId: string
}> {
  render() {
    this.props.comment.article_id = Number(this.props.article_id);
    return (
      <div className="container container-extra">
        <form id={this.props.formId}>
          <div className="form-group">
            <label htmlFor="nicknameAdd">Nickname</label>
            <input
              className="form-control"
              id="nicknameAdd"
              type="text"
              placeholder="Nickname"
              maxLength="10"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.props.comment) this.props.comment.nickname = event.target.value;
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="commentAdd">Comment</label>
            <textarea
              className="form-control"
              id="commentAdd"
              type="text"
              placeholder="Comment"
              cols="30"
              rows="10"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.props.comment) this.props.comment.comment = event.target.value;
              }}
              required
            />
          </div>
          <div className="form-group">
            <input type="submit" className="form-control" value="Save changes" onClick={this.props.addMethod} />
          </div>
        </form>
      </div>
    );
  }
}
