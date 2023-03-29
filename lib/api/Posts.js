import { deleteJSON, getJSON, postJSON, putJSON, BASE_URL } from "."

const URL = `${BASE_URL}/posts`

const PostsAPI = {
    create(post, token) {
        const data = postJSON(URL, { body: post, token })
        return data
    },
    readAll() {
        return getJSON(`${URL}?_sort=id&_order=desc`)
    },
    read(id) {
        return getJSON(`${URL}/${id}`)
    },
    update(post, token) {
        const data = putJSON(`${URL}/${post.id}`, { body: post, token })
        return data
    },
    delete(post, token) {
        try {
            data = deleteJSON(`${URL}/${post.id}`, { token })
        } catch (error) {
        }
        return data
    }
}

export default PostsAPI
