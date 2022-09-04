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
                <Link className='login-form-link' to="/login"><div id='login-form-link'>Login</div></Link>
            </div>
            <div className='welcome-body'>
                <div className='phase-one'>
                    <h1 className='first-sent'>Tame your work, organize your life</h1>
                    <h5 className='second-sent'>
                        Remember everything and tackle any project with your notes, tasks, and schedule all in one place.
                    </h5>
                    <p>
                        <Link className='signup-form-link' to="/signup"><span id='signup-form-link'>Sign up for free</span> </Link>
                        <Link className='link-to-login-form' to='/login'><p>Already have an account? Log in</p></Link>
                    </p>
                </div>
            </div>
            <div className='body-info'>
                <div className='mid-page-image'>
                    <img className='screenshot-image' src="/images/Screen_shot.png" alt="" />
                </div>
                <div className='text-info'>
                        <p id="title">WORK ANYWHERE</p>
                        <p id="description">Keep important info handy-your notes sync automatically to all your devices.</p>
                        <p id="title">REMEBER EVERYTHING</p>
                        <p id='description'>Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
                        <p id='title'>TURN TO-DO INTO DONE</p>
                        <p id='description'>Bring your notes, tasks, and schedules together to get things done more easily.</p>
                        <p id='title'>FIND THINGS FAST</p>
                        <p id='description'>Get what you need, when you need it with powerful, flexible search capabilities.</p>   
                </div>  
            </div>
        </div>
    )
}

export default Welcome 