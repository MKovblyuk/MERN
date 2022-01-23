import React, {useState, useEffect, useContext} from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const AuthPage = () => {
    const [form, setForm] = useState({
        email: "", password: ""
    })
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const authContext = useContext(AuthContext)

    const changeHandler = event => {
        setForm({...form, [event.target.name]: [event.target.value]})
    }

    const registerHandler = async () => {
        try{
            const data = await request('app/auth/register', 'POST', {...form})
            message(data.message)
            console.log("Data", data)
        }catch(e){}
    }

    const loginHandler = async () => {
        try{
            const data = await request('app/auth/login', 'POST', {...form})
            authContext.login(data.token, data.userId)
        }catch(e){}
    }

    useEffect(() => {
        message(error)
        clearError()
    },[error, message, clearError])

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Authorization Page</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>

                            <div className="input-field">
                                <input 
                                    placeholder="Enter email" 
                                    id="email" 
                                    type="text"
                                    name="email" 
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input 
                                    placeholder="Enter password" 
                                    id="password" 
                                    type="password"
                                    name="password" 
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            style={{marginRight: 30}}
                            disabled={loading}
                            onClick={loginHandler}
                        >Sign In</button>
                        <button 
                            className="btn grey lighten-1"
                            onClick={registerHandler}
                            disabled={loading}
                        >Log In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}