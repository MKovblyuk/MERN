import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import {useNavigate} from "react-router-dom"

export const CreatePage = () => {
    const [link, setLink] = useState('')
    const {request} = useHttp()
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const pressHandler = async event => {
        if(event.key === "Enter"){
            try{
                const data = await request("app/link/generate", "POST", {from: link}, {
                    Authorization: `Bearer ${authContext.token}`
                })
                console.log(data)
                // navigate(`/detail/${data.link._id}`)
                navigate(`/detail/${data.link._id}`)
                console.log("after navigate")
            }catch(e){}
        }
    }

    return(
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: "2rem"}}>
                <div className="input-field">
                    <input 
                        placeholder="Enter link" 
                        id="link" 
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>
    )
}