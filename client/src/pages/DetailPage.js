import React, { useCallback, useContext, useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import { LinkCard } from "../components/LinkCard"
import { Loader } from "../components/Loader"

export const DetailPage = () => {
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)

    const getLink = useCallback(async () => {
        const fethced = await request(`/app/link/${linkId}`, "GET", null, {
            Authorization: `Bearer ${token}`
        })
        setLink(fethced)
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    },[getLink])

    if(loading){
        return <Loader/>
    }

    return(
        <div>
            {!loading && link && <LinkCard link={link}/>}
        </div>
    )
}