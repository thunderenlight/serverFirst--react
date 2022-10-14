import React from 'react'

const AuthBox = ({ register }) => {
    return (
        <div className="auth">
           <div className="auth__box">
                <div className="auth__header">
                   <h1>{register ? "Sign Up" : "Login"}</h1>
                </div>
                <form>
                    { register && (
                    <div className="auth__field">
                        <label>Name</label>
                        <input type="text" name="" id=""/>
                            
                    </div>
                    )}
                    <div className="auth__field">
                        <label>Email</label>
                        <input type="text" name="" id=""/>
                            
                    </div>
                    <div className="auth__field">
                        <label>Password</label>
                        <input type="password" name="" id=""/>
                    </div>
                    { register && (
                    <div className="auth__field">
                        <label> Confirm Password</label>
                        <input type="password" name="" id=""/>
                        <p className="auth__error">
                            Something went wrong
                        </p>
                    </div>
                    
                    )}

                    <div className="auth__footer">
                    <p className="auth__error">Something Went Wrong</p>
                        <button className="btn">{register? "Signup" : "Login"}</button>
                    </div>
                </form>     
           </div> 
        </div>
    );
};

export default AuthBox;