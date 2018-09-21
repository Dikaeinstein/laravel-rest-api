import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Articles from '../components/Articles/ArticleList';
import SaveArticle from '../components/Articles/SaveArticle';
import UpdateArticle from '../components/Articles/UpdateArticle';
import ArticleDetail from '../components/Articles/ArticleDetail';
import Login from './Login';
import Register from './Register';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/create' component={SaveArticle} />
            <Route exact path='/update' component={UpdateArticle} />
            <Route exact path='/articles' component={Articles} />
            <Route exact path='/articles/:id' component={ArticleDetail} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}

export default App;
