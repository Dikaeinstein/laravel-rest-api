import React, { Component } from 'react'
import axios from 'axios'
import ArticleForm from './ArticleForm';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';

class UpdateArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {},
    };
    this.handleUpdateArticle = this.handleUpdateArticle.bind(this);
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
  }

  handleUpdateArticle (event) {
    event.preventDefault();

    const { history } = this.props;
    const articleId = history.location.state.article.id;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...setAuthorizationToken(),
    };

    const article = {
      title: event.target.title.value,
      body: event.target.body.value,
    };
    axios.put(`/api/articles/${articleId}`, article, { headers })
      .then((response) => {
        // redirect to the homepage
        history.push('/articles');
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data,
        });
      });
  }

  hasErrorFor (field) {
    return !!this.state.errors[field];
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <div style={{ color: '#dc3545', marginBottom: '.5rem' }}>
          <span>
            <strong>
              {this.state.errors[field]}
            </strong>
          </span>
        </div>
      );
    }
  }

  render () {
    const { article } = this.props.history.location.state;

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Update article</div>
              <div className='card-body'>
                <ArticleForm
                  handleSubmit={this.handleUpdateArticle}
                  hasErrorFor={this.hasErrorFor}
                  renderErrorFor={this.renderErrorFor}
                  title={article.title}
                  body={article.body}
                  action="Update"
                  articleId={article.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UpdateArticle.propTypes = {
  
};

export default UpdateArticle;
