import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../actions';

let LoginForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      component="input"
      type="text"
      name="email"
    />
    <Field
      component="input"
      name="password"
      type="password"
    />
    <button type="submit">Login</button>
  </form>
);
LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

class Login extends React.Component {
  handleSubmit = formData => {
    console.log('formData', formData);
    this.props.login(formData);
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  login: formData => dispatch(login(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
