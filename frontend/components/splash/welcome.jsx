import React from 'react'
import { Link } from 'react-router-dom'
import { RiLightbulbFill } from 'react-icons/ri'

const Welcome = () => {
    return (
        <div className="welcome-page">

            <div className='welcome-header'>
                {/* most likely will change the main-title to a logo */}
                <span className='main-logo'>
                    <div className='test'> < RiLightbulbFill size="2.5em" color="#29A82C" /></div>
                    <h2 className='main-title'>Clevernote</h2>
                </span>
                <Link className='login-form-link' to="/login"> <div id='login-form-link'>Login</div></Link>
            </div>
            <div className='welcome-body'>
                <div className='phase-one'>
                    <h1 className='first-sent'>Tame your work, organize your life</h1>
                    <h5 className='second-sent'>
                        Remember everything and tackle any project with your notes, tasks, and schedule all in one place.
                    </h5>
                    <p>
                   
                            <Link className='signup-form-link' to="/signup"><span id='signup-form-link'>Sign up for free</span> </Link>
                          
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Welcome 