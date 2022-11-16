import { useAuth0 } from "@auth0/auth0-react"

const useLoginEmail = ()=>{
    const { user } = useAuth0();
    if(user) return user.email
    return false
}

export default useLoginEmail;