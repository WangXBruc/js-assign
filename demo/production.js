// const test = () =>  {
//     const state = {
//         fruits: ['apple', 'banana'],
//         price: null,
//         balance: void 0
//     }
//     const { fruits = [], price = 100, balance = 20 } = GUtils.proxy(state);
//     console.log(fruits, price, balance);
// }
// test();
// const store = {
//     company: 'Apple',
//     name: null,
//     staffs: 10000,
//     country: void 0
// }
// const { company = 'MS', name = 'bill', staffs = 9999, country = 'US'} = store;
// console.log(company, name, staffs, country);
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import Index from 'scripts/components/home';
import Routes from 'scripts/routes';
import 'antd/dist/antd.min.css';
import { renderRoutes } from 'react-router-config';

if (GUtils.getThemeByUrl() === 'scm') {
  require('styles/scm/base.less');
} else {
  require('styles/base.less');
} // // 全局STORE列表，开发时，页面加载注册store


window.stores = window.stores || {};
window.CONFIG = require('scripts/config').default; // class Root extends React.Component {
//     render () {
//         console.log('Current React version is ' + React.version);
//         return (
//             <BrowserRouter>
//                 <Switch>
//                     {/* <Route path='/login' component={Login}/>*/}
//                     <Index>
//                         {renderRoutes(Routes)}
//                     </Index>
//                 </Switch>
//             </BrowserRouter>
//         );
//     }
// }

export default Root;