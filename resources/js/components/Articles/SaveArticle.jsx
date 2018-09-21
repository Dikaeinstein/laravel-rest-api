import React, { Component } from 'react'
import axios from 'axios'
import ArticleForm from './ArticleForm';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';

class SaveArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {},
    };
    this.handleSaveNewArticle = this.handleSaveNewArticle.bind(this);
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
  }

  handleSaveNewArticle (event) {
    event.preventDefault();

    const { history } = this.props;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...setAuthorizationToken(),
    };

    const article = {
      title: event.target.title.value,
      body: event.target.body.value,
    };

    axios.post('/api/articles', article, { headers })
      .then(response => {
        // redirect to the homepage
        history.push('/articles');
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        });
      });
  }

  hasErrorFor (field) {
    return !!this.state.errors[field];
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      );
    }
  }

  render () {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Add new article</div>
              <div className='card-body'>
                <ArticleForm
                  handleSubmit={this.handleSaveNewArticle}
                  hasErrorFor={this.hasErrorFor}
                  renderErrorFor={this.renderErrorFor}
                  title={this.state.title}
                  body={this.state.body}
                  action="Save"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SaveArticle;
