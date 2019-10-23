/**
 * @flow
 */
import actionFactory, { handleActions } from '../../utils/actionFactory';

const initialState = {
  blogList: [],
  commentList: [],
  pageIndex: 1,
  pageSize: 10,
  total: 0,
  blog: {},
  loading: true
};

const Blog = actionFactory('Blog');
const getBlogListAction = Blog('GET');
const getBlogDetailAction = actionFactory('getBlogDetailAction')('GET');
const Comment = actionFactory('Comment');
const getCommentListAction = Comment('GET');
const postCommentAction = Comment('POST');

const blogReducer = handleActions(
  {
    ...getBlogListAction.createReducers({
      pending: state => ({
        ...state,
        blogList: [],
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        loading: true
      }),
      accept: (state, action) => ({
        ...state,
        blogList: action.payload.list,
        pageIndex: action.payload.pageIndex,
        pageSize: action.payload.pageSize,
        total: action.payload.total,
        loading: false
      }),
      reject: state => ({ ...state, loading: false })
    }),
    ...getBlogDetailAction.createReducers({
      pending: state => ({
        ...state,
        blog: {},
        loading: true
      }),
      accept: (state, action) => ({
        ...state,
        blog: action.payload,
        loading: false
      }),
      reject: state => ({ ...state, loading: false })
    }),
    ...getCommentListAction.createReducers({
      pending: state => ({
        ...state,
        commentList: [],
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        loading: true
      }),
      accept: (state, action) => ({
        ...state,
        commentList: action.payload.list,
        pageIndex: action.payload.pageIndex,
        pageSize: action.payload.pageSize,
        total: action.payload.total,
        loading: false
      }),
      reject: state => ({ ...state, loading: false })
    }),
    ...postCommentAction.createReducers({
      pending: state => ({
        ...state,
        loading: true
      }),
      accept: state => ({
        ...state,
        loading: false
      }),
      reject: state => ({ ...state, loading: false })
    })
  },
  initialState
);

export default blogReducer;

// 获取博文列表
type getBlogListParam = {
  pageIndex: number,
  pageSize: number,
  content?: string
};
export const getBlogList: (
  obj: getBlogListParam
) => disPromise<*> = getBlogListAction.createActions('api/blog');

// 获取博文详情
type getBlogDetailParam = {
  id: string
};
export const getBlogDetail: (
  obj: getBlogDetailParam
) => disPromise<*> = getBlogDetailAction.createActions('api/blog');

// 获取评论列表
type getCommentListParam = {
  pageIndex: number,
  pageSize: number,
  content?: string
};
export const getCommentList: (
  obj: getCommentListParam
) => disPromise<*> = getCommentListAction.createActions('api/comment');

// 发表评论
type postCommentParam = {
  nick_name: string,
  email: string,
  content: string
};
export const postComment: (
  obj: postCommentParam
) => disPromise<*> = postCommentAction.createActions('api/Comment');
