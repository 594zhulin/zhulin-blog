/**
 * @flow
 */
import React, { Component } from 'react';
import { transformDate } from '../../utils/commonFunction';

type Props = {
  blogInfo: Object,
  showDetail: Function
};

export default class BlogItem extends Component<Props> {
  render() {
    const { blogInfo } = this.props;
    return (
      <div className="blog-item" onClick={()=>this.props.showDetail(blogInfo)}>
        <img alt={blogInfo.cover} className="blog-cover" src={blogInfo.cover} />
        <div className="comment-count">{blogInfo.comments}</div>
        <h2 className="blog-title">{blogInfo.title}</h2>
        <div className="blog-date">{transformDate(blogInfo.create_time)}</div>
        <div className="blog-category">{blogInfo.category}</div>
      </div>
    );
  }
}
