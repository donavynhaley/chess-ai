import axios from 'axios';
// process.env.REACT_APP_BE_URL

const backend = axios.create({
    baseURL: process.env.REACT_APP_BE_URL
})


const register = userCredentials => {
    
    const promise = axios.post(
        `https://chess-ai-visualizer.herokuapp.com/register`,
        userCredentials,
    );

    const dataPromise = promise.then(res => {
        console.log(res.data)
        return res.data;
    });

    return dataPromise;
}

const login = userCredentials => {
    
    const promise = axios.post(
        `https://chess-ai-visualizer.herokuapp.com/login`,
        userCredentials,
    );

    const dataPromise = promise.then(res => {
        localStorage.setItem('token', res.data.token)
        console.log(res.data)
        return res.data;
    });

    return dataPromise;
}

export { register, login }
