import React from 'react'
import Togglable from './Togglable'

export default function LoginForm ({username, password, handleSubmit, handleUsernameChange, handlePasswordChange}){
    
    return (
        <Togglable buttonLabel='Show Login'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type='text'
                        value={username}
                        name='Username'
                        placeholder='Username'
                        onChange={handleUsernameChange}
                    />
                    </div>
                    <div>
                    <input 
                        type='password'
                        value={password}
                        name='Password'
                        placeholder='Password'
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id='form-login-button'>
                    Login
                </button>
            </form>
        </Togglable>
    )
}