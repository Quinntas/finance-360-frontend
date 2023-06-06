import type Author from './author'

type PostType = {
    slug: string
    key_words: string[]
    description: string
    title: string
    date: string
    coverImage: string
    author: Author
    excerpt: string
    ogImage: {
        url: string
    }
    content: string
}

export default PostType
