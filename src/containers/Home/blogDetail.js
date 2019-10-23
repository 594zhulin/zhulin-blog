/**
 * @flow
 */
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import CommentItem from './commentItem';
import { transformDate } from '../../utils/commonFunction';

const FormItem = Form.Item;

type Props = {
  blogInfo: Object,
  commentList: Array<Object>,
  form: Object,
  reply: Function
};

class BlogDetail extends Component<Props> {
  /**
   * @description 发表评论
   */
  reply = () => {
    const { form, blogInfo } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.reply({
        blog_id: blogInfo.id,
        nick_name: values.nick_name,
        email: values.email,
        content: values.content
      });
    });
  };
  render() {
    const { blogInfo, commentList } = this.props;
    const { getFieldDecorator } = this.props.form;
    const commentItem =
    commentList.length > 0 &&
    commentList.map(item => {
        return <CommentItem commentInfo={item} key={item.id}/>;
      });
    return (
      <div className="blog-detail">
        {/* <img alt="" src={blogInfo.cover} /> */}
        {/* <div className="comment-count">{blogInfo.comments}</div> */}
        <h2 className="blog-title">{blogInfo.title}</h2>
        <div className="blog-date">{transformDate(blogInfo.create_time)}</div>
        <div className="blog-category">{blogInfo.category}</div>
        <div
            className="content"
            dangerouslySetInnerHTML={{ __html: blogInfo.content }}
        />
        <div className="blog-img-copyright">图片来自网络</div>
        <div className="blog-tag">
          <span>标签：</span>
          {blogInfo.tags}
        </div>
        <h3 className="comment-title">{commentList.length}条评论</h3>
        <div className="blog-comments">
          {commentItem}
        </div>
        <div className="blog-reply">
          <h3 className="reply-title">发表评论</h3>
          <p className="reply-title-supply">
            您的电子邮件地址不会被公开。必填字段标有*
          </p>
          <div className="reply-form">
            <Form>
              <FormItem label="评论">
                {getFieldDecorator('content', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请填写评论'
                    }
                  ]
                })(<textarea />)}
              </FormItem>
              <FormItem label="昵称">
                {getFieldDecorator('nick_name', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请填写昵称'
                    }
                  ]
                })(<Input />)}
              </FormItem>
              <FormItem label="邮箱">
                {getFieldDecorator('email', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请填写邮箱'
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Form>
            <Button className="reply-btn" onClick={this.reply}>发表评论</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(BlogDetail);
