import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => ({
    errors: state.errors.session,
    formType: "singup",
    navLink: <Link to="/login">log in instead</Link>,
})

const mapDispatchToProps = dispatch => ({
    processForm: user => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);