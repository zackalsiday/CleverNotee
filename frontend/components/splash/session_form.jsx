import React from 'react'
// import { FaRegLightbulb } from 'react-icons/fa'
import { RiLightbulbFill } from 'react-icons/ri'

class SessionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    renderErrors() {
        return (
            <ul className='form-errors'>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (

            <div className="login-signup-page">
                {/* <div className='test'> < RiLightbulbFill size="2em" color="#29A82C4F" repeat='repeat'/></div> */}

                <div className='login-signup-form-box'>
                    <form onSubmit={this.handleSubmit} className="login-signup-form">
                        <div className='from-heading'>
                            <div className='form-logo'> < RiLightbulbFill size="3.5em" color="#29A82C" /></div>
                            <h2 className='form-title'>Clevernote</h2>
                            <p className='form-intro'>Remember everything important.</p>
                        </div>
                        <br />

                        {this.renderErrors()}
                        <div className="login-signup-form">
                            <br />
                            <div className='form-inputs'>
                                <input type="text"
                                    value={this.state.username}
                                    onChange={this.update('username')}
                                    className="login-signup-input"
                                    placeholder='Username'
                                />



                                <input type="password"
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    className="password-input"
                                    placeholder='Password'
                                />
                            </div>



                            <input className="session-submit" type="submit" value={this.props.formType} />
                        </div>
                        <div className='form-toggle'>Please {this.props.formType} or <span id='the-link-on-bottom-of-form' >{this.props.navLink}</span></div>


                    </form>
                </div>

            </div>
        );
    }

}

export default SessionForm 