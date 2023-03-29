import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PostsAPI from "../lib/api/Posts"
import styles from "./PostForm.module.css"

const defaultModel = {
    title: "",
    text: ""
}

export default function PostForm({ postToEdit = null }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [post, setPost] = useState(defaultModel)

    useEffect(() => {
        if (postToEdit !== null) {
            setPost(postToEdit)
        }
    }, [postToEdit])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPost({
            ...post,
            ...{ [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (post.id) {
            post.updatedAt = new Date().toISOString()
            const updatedPost = await PostsAPI.update(post)
            setPost(updatedPost)
            router.push(`/posts/${post.id}`)
        } else {
            post.createdAt = new Date().toISOString()
            post.updatedAt = new Date().toISOString()
            const newPost = await PostsAPI.create(post)
            router.push(`/posts/${newPost.id}`)
        }
        setIsLoading(false)
    }

    return (
        <div className={styles['form-container-styling']}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <div>
                        <input onChange={handleChange} value={post.title} type="text" name="title" id="title" placeholder="Title" />
                    </div>
                </div>

                <div>
                    <label htmlFor="text">Text</label>
                    <div>
                        <textarea onChange={handleChange} value={post.text} type="text" name="text" id="text" placeholder="Text" rows="10" />
                    </div>
                </div>

                <button className={"button"} disabled={isLoading}>
                    {isLoading ? "...Loading" : "Submit"}
                </button>
            </form>
        </div>
    )
}
