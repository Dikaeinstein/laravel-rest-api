import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Article = ({ article }) => (
  <div
    className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
    key={article.id}
    title="Click to view article detail"
  >
    {article.title}
    <Link
      className='btn btn-primary btn-sm mb-3'
      to={`articles/${article.id}`}
    >
      View Detail
    </Link>
  </div>
);

Article.propTypes = {
  article: PropTypes.objectOf(
    PropTypes.string.isRequired,
  ),
};

export default Article;
