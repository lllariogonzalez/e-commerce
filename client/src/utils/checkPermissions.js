import axios from "axios";

const checkPermissions = async (getToken, history)=>{
    try {
        const token = await getToken();
        const response = await axios("/authorization",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.data.message === "authorized") return;   
    } catch (error) {
        history.goBack();
        alert("You dont have the necessary permissions");
    }
}

export default checkPermissions;