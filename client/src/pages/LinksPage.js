import React, { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../components/Loader"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { LinksList } from "../components/LinksList"

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)

    const getLinks = useCallback(async () => {
        try{
            const fethcedLinks = await request('app/link', "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fethcedLinks)
        }catch(e){}
    },[token, request])

    useEffect(() => {
        getLinks()
    },[getLinks])

    if(loading){
        return <Loader/>
    }

    return(
        <div>
            {!loading && <LinksList links={links}/>}
        </div>
    )
}