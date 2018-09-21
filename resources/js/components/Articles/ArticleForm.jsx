import React from 'react';
import PropTypes from 'prop-types';

const ArticleForm = (props) => {
  const {
    handleSubmit,
    hasErrorFor,
    handleFieldChange,
    renderErrorFor,
    action,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='title'>Article title</label>
        <input
          id='title'
          type='text'
          className={`form-control ${hasErrorFor('title') ? 'is-invalid' : ''}`}
          name='title'
          defaultValue={props.title}
        />
        {renderErrorFor('title')}
      </div>
      <div className='form-group'>
        <label htmlFor='body'>Article body</label>
        <textarea
          id='body'
          className={`form-control ${hasErrorFor('body') ? 'is-invalid' : ''}`}
          name='body'
          rows='10'
          defaultValue={props.body}
        />
        {renderErrorFor('body')}
      </div>
      {renderErrorFor('error')}
      <button className='btn btn-primary'>{action} Article</button>
    </form>
  );
};

ArticleForm.defaultProps = {
  title: '', body: '',
};

ArticleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  hasErrorFor: PropTypes.func.isRequired,
  renderErrorFor: PropTypes.func.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  action: PropTypes.string.isRequired,
};

export default ArticleForm;
