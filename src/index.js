import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import RouterWrap from './routers/route';

const store = createStore(reducer, applyMiddleware(thunk));
moment.locale('zh-cn');

const App = () => (
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
        <RouterWrap />
    </LocaleProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
