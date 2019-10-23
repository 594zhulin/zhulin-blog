/**
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBlogList, getCommentList, postComment } from './reducer';
import { Pagination, Spin, message } from 'antd';
import BlogItem from './blogItem';
import BlogDetail from './blogDetail';
import './index.less';

type Props = {
  getBlogList: typeof getBlogList,
  getCommentList: typeof getCommentList,
  postComment: typeof postComment,
  blogList: Array<Object>,
  commentList: Array<Object>,
  total: number,
  loading: boolean
};

type State = {
  currentPage: number,
  pageSize: number,
  content: string,
  isDetail: boolean,
  blogInfo: Object
};

class Home extends Component<Props, State> {
  state = {
    currentPage: 1,
    pageSize: 10,
    content: '',
    isDetail: false,
    blogInfo: {}
  };
  componentDidMount() {
    this.getBlogList();
  }
  /**
   * @description 获取博文列表
   */
  getBlogList = () => {
    const { currentPage, pageSize, content } = this.state;
    this.props.getBlogList({ pageIndex: currentPage, pageSize, content });
  };

  showDetail = (blogInfo) => {
    this.setState({
      isDetail: true,
      blogInfo
    },()=>{
      this.props.getCommentList({ pageIndex: 1, pageSize: 1000, content: '' })
    })
  }

  reply = query => {
    this.props.postComment({ ...query }).then(res => {
      if (res.code === 0) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  }

  render() {
    const { blogList, commentList, total, loading } = this.props;
    const { isDetail, blogInfo } = this.state;
    const blogItem =
      blogList.length > 0 &&
      blogList.map(item => {
        return <BlogItem blogInfo={item} key={item.id} showDetail={this.showDetail}/>;
      });
    return (
      <div id="blog-container">
        {isDetail?
        <BlogDetail  blogInfo={blogInfo} commentList={commentList} reply={this.reply}/>:
        <Spin spinning={loading}>
          <div className="blog-list">{blogItem}</div>
          <Pagination className="blog-pagination" defaultCurrent={1} total={total} />
        </Spin>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { blogList, commentList, total, loading } = state.blog;
  return {
    blogList,
    commentList,
    total,
    loading
  };
};

const mapDispatchToProps = {
  getBlogList,
  getCommentList,
  postComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
