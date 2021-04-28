import React, { useState, useContext, useCallback , useEffect} from 'react';
import {AuthContext} from '../../../context/authContext'
import axios from 'axios';
import './main-page.scss';

const MainPage = () => {
    const [text, setText] = useState('')
    const [contents, setContents] = useState([])
    const {userId} = useContext(AuthContext)

    const getContent = useCallback( async () => {
        try {
            await axios.get('https://blooming-ocean-32461.herokuapp.com/api/content', {
                headers:{
                    'Content-Type': 'application/json'
                },
                params : {userId}
            })
            .then(response => setContents(response.data))
        } catch (error) {
            console.log();
        } 
    }, [userId])

    useEffect( () => {
        getContent()
    }, [getContent])

    const createContent = useCallback(async () => {
        try {
            if (text==='') {
                alert('Пожалуйста введите текст')
                return
            }

            await axios.post('https://blooming-ocean-32461.herokuapp.com/api/content/add', {text, userId}, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setContents([...contents], response.data)
                setText('')
                getContent()
            })
        } catch (error) {
            console.log(error);
        }
    }, [text, userId, getContent])

    const removeContent = useCallback(async (id)=> {
        try {   
                await axios.delete(`https://blooming-ocean-32461.herokuapp.com/api/content/delete/${id}`, {id}, {
                    headers:{
                        'Content-Type': 'application/json'
                    }   
                })
            .then(() => {
                getContent()
            })
        } catch (error) {
            console.log(error);
        }
    })
    

    // getContent();
    return (
        <div className='container'>
           <form className='form form-login' onSubmit= {e => e.preventDefault()}>
               
               <h5>Записи</h5>
               <div className='item-box'>
                     {
                         contents.map((content, index) => {
                             return (
                                <div className='content-item' key = {index}>
                                    <div className='content-box'>
                                        <div className='content-num'>{index+1}</div>
                                        <div className='content-container'>
                                            <div className='content-author blue-text'>Автор: <span>{content.author}</span> запись от <span> {content.dateContent}</span></div>
                                            <div className='content-text'>{content.text}</div>
                                        </div>
                                    </div>
                                    <div className='content-buttons'>
                                        {/* <i className='material-icons'>edit</i> */}
                                        <i className='material-icons red-text' onClick={() => removeContent(content._id)}>delete</i>
                                    </div>
                                </div>
                             )
                         }
                         )
                    }
                    

               </div>
                

               
               <div className='row'>
                    <div className='input-field col s12'>
                        <input
                            type='text'
                            id='text'
                            name='input'
                            className='validate'
                            placeholder='Новая запись'
                            value = {text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
               </div>
               <div className='row'>
                   <button 
                    className='waves-effect waves-ligth btn blue '
                    onClick = {createContent}
                   >Добавить запись</button>
               </div>
           </form>
        </div>
    );
}

export default MainPage;
