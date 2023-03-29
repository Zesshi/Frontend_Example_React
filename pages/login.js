import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Users from "../lib/api/Users"
import { useGlobalContext } from "../store"
import styles from "./login.module.css"
import Link from "next/link"
import { toast } from "react-toastify"


function DefaultModel() {
    this.email = ''
    this.password = ''
}

export default function LoginPage() {

    const { session, logout, login } = useGlobalContext()
    const [user, setUser] = useState(new DefaultModel())
    const [errors, setErrors] = useState(new DefaultModel())
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleChange = async (e) => {
        const name = e.target.name
        const value = e.target.value
        user[name] = value
        setUser(user)
    }

    useEffect(() => {
        if (session) {
            logout()
        }
    }, [])

    function validateUser(user) {
        let errors = new DefaultModel()

        var isValid = true

        if (user.email.trim().length === 0) {
            errors.email = "Email cant't be empty"
            isValid = false
        }

        if (user.password.trim().length === 0) {
            errors.password = "Password cant't be empty"
            isValid = false
        }

        return { errors, isValid }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        setErrors(new DefaultModel())

        const result = validateUser(user)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }
        try {
            const resp = await Users.login(user)
            login(resp)
            router.push("/")
        } catch (e) {
            console.error(e)
            toast.error("Login Failed")
            setIsLoading(false)
        }

        setIsLoading(false)
    }

    return (
        <div className={styles['login-container']}>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <input onChange={handleChange} type="email" name="email" placeholder="Email" />
                </div>

                <div>
                    <input onChange={handleChange} type="password" name="password"  placeholder="Password" />
                </div>
                <button disabled={isLoading}>
                    {isLoading ? "...Loading" : "Login"}
                </button>
            </form>
            {/*<p>Don't Have An Account? <Link href='/signup'>Sign Up</Link></p>*/}
        </div>
    )
}