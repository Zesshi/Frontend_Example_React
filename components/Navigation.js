import Link from "next/link";
import styles from "./Navigation.module.css"
import { useGlobalContext } from "../store";
import { useRouter } from "next/router";

export default function Navigation() {

    const { session, logout } = useGlobalContext()
    const router = useRouter()

    return (
        <div className={styles.navigation}>
            <div>
                <ul>
                    <li>
                        {session && <Link href="/posts/create">Create</Link>}
                    </li>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    {session && <li><Link href="/profile">Profile</Link></li>}
                    <li>
                        {session ? <Link href="/login" onClick={(e) => logout()} className="nav-link">Logout</Link> : <Link href="/login" className={"nav-link " + (router.pathname == "/login" && "active")}>Login</Link>}
                    </li>
                </ul>
            </div>
        </div>
    )
}
