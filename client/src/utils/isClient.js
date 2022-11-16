import axios from "axios";

const isClient = async (user)=>{
    const data = {
        name: user.name,
        email: user.email,
    }
    try {
        const response = await axios(`/user/check/${user.email}`);
        if(response.data.block===true) return false;
        if(response.data.block===null) await axios.post('/user', data);
        return true;   
    } catch (error) {
        return false
    }
}

export default isClient;