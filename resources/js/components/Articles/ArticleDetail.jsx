import React, { Component } from 'react';
import axios from 'axios';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';

class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      isLoading: false,
      fetchArticleError: null,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const articleId = this.props.match.params.id;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...setAuthorizationToken(),
    };

    this.setState({ isLoading: true });
    axios.get(`/api/articles/${articleId}`, { headers })
      .then(response => {
        this.setState({
          article: response.data.article,
          isLoading: false,
        });
      });
  }

  handleUpdate(event) {
    event.preventDefault();

    this.props.history.push({
      pathname: '/update',
      state: { article: this.state.article },
    });
  }

  handleDelete() {
    const articleId = this.props.match.params.id;
    const { history } = this.props;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...setAuthorizationToken(),
    };

    const willDelete = window
      .confirm('Do you want to delete article?');
  
    if (willDelete) {
      axios.delete(`/api/articles/${articleId}`, { headers })
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
  }

  render() {
    const { article } = this.state;
    const btnStyle = { margin: '.25rem' };

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    if (this.state.fetchArticleError) {
      return <div>Error fetching article detail</div>
    }

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <h4 className='card-header'>{article.title}</h4>
              <div className='card-body'>
                <p>{article.body}</p>

                <button
                  className="btn btn-primary btn-sm"
                  style={btnStyle}
                  onClick={this.handleUpdate}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  style={btnStyle}
                  onClick={this.handleDelete}
                >
                  Delete
                </button>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleDetail;
