/**
 * @flow
 */
import React, { Component } from 'react';
import { Avatar, Button } from 'antd';
import { transformDate } from '../../utils/commonFunction';

type Props = {
  commentInfo: Object
};

export default class CommentItem extends Component<Props> {
  render() {
    const { commentInfo } = this.props;
    return (
      <div className="comment-item">
        <Avatar size={48} />
        <div className="comment-info">
          <div className="comment-author">{commentInfo.nick_name}</div>
          <div className="comment-date">
            {transformDate(commentInfo.create_time)}
          </div>
          <div className="comment-content">{commentInfo.content}</div>
          <Button className="answer-btn" onClick={this.answer}>回复</Button>
        </div>
      </div>
    );
  }
}
