import { BASE_URL, getJSON, postJSON } from "."
//import SignUpPage from "../../pages/signup"

const URL = "http://localhost:3001"

const AuthenticationAPI =  {
    login(user) {
        return postJSON(`${BASE_URL}/login`, { body: user })
    },
    /*signUp(user) {
        return postJSON(`${BASE_URL}/signup`, { body: user })
    }*/
}

export default AuthenticationAPI 
