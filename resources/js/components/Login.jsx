import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveToken } from '../helpers/token';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      errors: [],
    };
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value,
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

  handleSubmit(event) {
    event.preventDefault();

    const { history } = this.props;
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post('/api/login', user)
      .then(response => {
        saveToken(response.data.user.api_token);
        // redirect to the homepage
        history.push('/articles');
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        });
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ margin: '2rem auto', width: '60%' }}>
        <h4 className="text-center">Log In</h4>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
            className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
            name='email'
            value={this.state.email}
            onChange={this.handleFieldChange}
          />
          {this.renderErrorFor('email')}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='text'
            className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
            name='password'
            value={this.state.password}
            onChange={this.handleFieldChange}
          />
          {this.renderErrorFor('password')}
        </div>
        <button type="submit" className='btn btn-primary btn-lg'>Log In</button>
        <div style={{ margin: '1rem' }}>
          Don't have an account?
          <Link
            className="btn btn-primary btn-sm mb-3"
            style={{ margin: '.5rem' }}
            to="/register"
          >
            Register
          </Link>
        </div>
      </form>
    );
  }
};

export default Login;
