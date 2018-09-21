import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveToken } from '../helpers/token';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      name: '',
      password_confirmation: '',
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };

    axios.post('/api/register', user)
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
        <h4 className="text-center">Register Now</h4>
        <div className='form-group'>
          <label htmlFor='email'>Name</label>
          <input
            id='name'
            type='text'
            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
            name='name'
            value={this.state.name}
            onChange={this.handleFieldChange}
          />
          {this.renderErrorFor('name')}
        </div>
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
        <div className='form-group'>
          <label htmlFor='email'>Confirm Password</label>
          <input
            id='password_confirmation'
            type='text'
            className={`form-control ${this.hasErrorFor('password_confirmation') ? 'is-invalid' : ''}`}
            name='password_confirmation'
            value={this.state.password_confirmation}
            onChange={this.handleFieldChange}
          />
          {this.renderErrorFor('password_confirmation')}
        </div>
        <button type="submit" className='btn btn-primary'>Register</button>
      </form>
    );
  }
};

export default Register;
