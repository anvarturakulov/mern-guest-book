import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

export const useAuth = () =>{
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isReady, setIsReady] = useState(false)
    const [userEmail, setUserEmail] = useState('')

    const getUserEmail = async (userId) => {
        try {
            
            if (userId === null) {return}
            await axios.get(`https://blooming-ocean-32461.herokuapp.com/api/auth/user/${userId}`, {userId}, {
                headers:{
                    'Content-Type': 'application/json'
                }   
            })
            .then(response => {
                // setContents(response.data)
                // console.log('user emailll')
                // console.log(response.data[0]['email'])
                setUserEmail(response.data[0]['email'])
            })
        } catch (error) {
            console.log();
        } 
    }


    const login = useCallback(
            (jwtToken, id) => {
                setToken(jwtToken);
                setUserId(id);
                getUserEmail(id);

                localStorage.setItem('userData', JSON.stringify({
                    userId : id,
                    token : jwtToken,
                    }))
            }, 
        [])

    // const login = (jwtToken, id) => {
    //         setToken(jwtToken);
    //         setUserId(id);
    //         localStorage.setItem('userData', JSON.stringify({
    //             userId : id,
    //             token : jwtToken
    //             }))
    //     }

    const logout = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData')
        // console.log("Анвар Ака")
    }

    useEffect( () => {
        const data = JSON.parse(localStorage.getItem('userData'));
        if (data && data.token) {
            login(data.token, data.userId)
            setIsReady(true);
        }
        
    }, [login])

    
    return {login, logout, token, userId, isReady, userEmail}
}