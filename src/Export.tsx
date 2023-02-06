import React, { useEffect, useState, useRef } from 'react';
import globalState from './_config/driveAPI'
import axios from 'axios'
import Warroom from "sdk"
import { groupData, getData, getAgentId } from './helper'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, Store } from './redux/store'

interface ListNoteProps {
    thread_data: {
        _id: String,
        thread_name: String,
        thread_topic: String,
        thread_description: String,
        thread_group: String,
        agent_id: Number,
        group_id: Object,
        group_info: {
            group_name: String,
            agent_id: Number,
            thread_name: String,
            group_color: String,
        },
    }[]
}

function Export() {

    let note = useSelector((state: RootStore) => state.note.data)
    let notestate = useSelector((state: RootStore) => state)
    const noteStatus = useRef<String>("listing")

    const agent_id = Number(localStorage.getItem("agent_id"))

    const [token, setToken] = useState({
        access_token: '',
        expires_in: 0,
        refresh_token: '',
        scope: '',
        token_type: ''
    })
    const [fileId, setFileId] = useState('')
    const [isHaveDriveToken, setIsHaveDriveToken] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listNoteItem, setListNoteItem] = useState<ListNoteProps["thread_data"]>([])

    useEffect(() => {
        (async () => {
            if (process.env.REACT_APP_ENV == "prod") {
                const warroom = new Warroom();
                const applicationStatus = await warroom.init({
                    appType: "taskpane",
                    appId: "117454667",
                });
                const AgentInformation = await warroom.getCurrentAgent();
                localStorage.setItem("agent_id", AgentInformation.agent_id)
            } else {
                const AgentInformation = await getAgentId()
                localStorage.setItem("agent_id", AgentInformation.agent_id)
            }
            if (!notestate.note.data.group_id) {
                const dataNoteItem = await getData('/api/note-item/all/' + agent_id);
                setListNoteItem(dataNoteItem)
            } else {
                const dataNoteItem = await getData('/api/note-item/' + notestate.note.data.group_id + '/' + agent_id);
                setListNoteItem(dataNoteItem)
            }
        })()
        noteStatus.current = note.status;
    }, [note, notestate.note.data.group_id, notestate.noteGroup.data.status])

    const getToken = async () => {
        try {
            const token = await localStorage.getItem('token')
            if (!token) {
                setIsHaveDriveToken(false)
            } else {
                setIsHaveDriveToken(true)
                setToken(JSON.parse(token))
                getFileList(JSON.parse(token))
            }
        } catch {
            setIsHaveDriveToken(false)
        }
    }

    useEffect(() => {
        getToken()
    }, [])

    const getFileList = async (token: any) => {
        try {
            const config = {
                method: 'get',
                url: `https://www.googleapis.com/drive/v3/files?q='${globalState.FOLDER_ID}'+in+parents`,
                headers: {
                    'Authorization': `${token.token_type} ${token.access_token}`
                },
            }
            const { data } = await axios(config)
            const files: {
                id: string,
                name: string
            }[] = data.files
            const file = files.filter((el) => el.name === `${agent_id}.json`)
            if (file) {
                console.log(file[0].id)
                setFileId(file[0].id)
            }
        } catch (err) {
            console.log('getFileList', err)
        }
    }

    const onUpdateFile = async (file: any) => {
        setLoading(true)
        try {
            const config = {
                method: 'patch',
                url: `https://www.googleapis.com/upload/drive/v3/files/${fileId}`,
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Authorization': `${token.token_type} ${token.access_token}`
                },
                data: file
            }
            const { data } = await axios(config)
            // await updateFileName(file.name, data.id)
        } catch (err) {
            setIsHaveDriveToken(false)
        } finally {
            setLoading(false)
        }
    }

    const updateFileName = async (fileName: string, fileId: string) => {
        try {
            const config = {
                method: 'put',
                url: `https://www.googleapis.com/drive/v2/files/${fileId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token.token_type} ${token.access_token}`
                },
                data: {
                    title: fileName,
                    parents: [{ id: globalState.FOLDER_ID }]
                }
            }
            const { data } = await axios(config)
            console.log(data.webContentLink)
        } catch (err) {
            console.log('updateFileName Err:', err)
        }
    }

    const onUploadFile = async (file: any) => {
        setLoading(true)
        try {
            const config = {
                method: 'post',
                url: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Authorization': `${token.token_type} ${token.access_token}`
                },
                data: file
            }
            const { data } = await axios(config)
            setFileId(data.id)
            await updateFileName(file.name, data.id)
        } catch (err) {
            setIsHaveDriveToken(false)
        } finally {
            setLoading(false)
        }
    }

    const onExport = async () => {
        const blob = new Blob([JSON.stringify(listNoteItem)], { type: 'application/json' })
        const file = new File([blob], `${agent_id}.json`, { type: 'application/json' })
        if (fileId) {
            await onUpdateFile(file)
        } else {
            await onUploadFile(file)
        }
    }

    return (
        <div className="App">
            {
                !isHaveDriveToken ? (
                    <a
                        className="App-link"
                        href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${globalState.SCOPE}&response_type=${globalState.RESPONSE_TYPE}&access_type=${globalState.ACCESS_TYPE}&redirect_uri=${globalState.REDIRECT_URI}&client_id=${globalState.CLIENT_ID}`}
                        // target="_blank"
                        rel="noopener noreferrer"
                    >
                        Login with Gmail
                    </a>
                ) : (
                    <div>
                        <button onClick={onExport} disabled={loading}>Export</button>
                    </div>
                )
            }
        </div>
    );
}

export default Export;
