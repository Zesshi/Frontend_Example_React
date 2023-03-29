import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostForm from "../../../components/PostForm";
import PostsAPI from "../../../lib/api/Posts";

export default function EditPost() {

    const router = useRouter()
    const { id } = router.query
    const [post, setPost] = useState(null)

    useEffect(() => {
        let isMounted = true

        if (!router.isReady) return

        const loadPost = async () => {
            const post = await PostsAPI.read(id)
            if (isMounted) {
                setPost(post)
            }
        }
        loadPost()

        return () => isMounted = false

    }, [router])

    return (
        <div>
            <h1 className="text-white">Edit Post</h1>
            <PostForm postToEdit={post} title />
        </div>
    )
}
