import { useGlobalContext } from "../store"

export default function ProfilePage() {
    const { session } = useGlobalContext()
    return (
        <div style={{ overflow: "hidden" }}>
            <pre>{JSON.stringify(session, null, 4)}</pre>
        </div>
    )
}
