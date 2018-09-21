import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Article from './Article';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';

class ArticleList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      articles: [],
      isLoading: false,
      fetchArticlesError: null,
    };
  }

  componentDidMount () {
    this.setState({ isLoading: true });
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...setAuthorizationToken(),
    };

    axios.get('/api/articles', { headers })
      .then(response => {
        this.setState({
          articles: response.data.articles,
          isLoading: false,
          fetchArticlesError: null,
        });
      })
      .catch(error => {
        this.setState({ fetchArticlesError: error, isLoading: false });
      });
  }

  renderArticleList(articles) {
    const articlesList = articles.map(article => (
      <Article key={article.id} article={article} />
    ));

    return (
      <ul className='list-group list-group-flush'>
        {articlesList}
      </ul>
    );
  }

  render () {
    const { articles } = this.state
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    if (this.state.fetchArticlesError) {
      return <div>Error fetching articles</div>
    }

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>All Articles</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                  Create new article
                </Link>
                {this.renderArticleList(this.state.articles)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleList;
