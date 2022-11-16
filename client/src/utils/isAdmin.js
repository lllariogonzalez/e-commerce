import axios from "axios";

const isAdmin = async (getToken)=>{
    try {
        const token = await getToken();
        const response = await axios("/authorization",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.data.message === "authorized") return true;
        return false;   
    } catch (error) {
        return false
    }
}

export default isAdmin;