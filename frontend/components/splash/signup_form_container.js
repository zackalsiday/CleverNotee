import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';
import { createNotebook } from '../../actions/notebook_actions';

const mapStateToProps = state => ({
    errors: state.errors.session,
    formType: "signup",
    navLink: <Link className='nav-link' to="/login">log in instead</Link>,
})

const mapDispatchToProps = dispatch => ({
    processForm: user => dispatch(signup(user)),
    createNotebook: notebook => (createNotebook(notebook))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);