import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import {getAllPosts, getPostBySlug} from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'

type Props = {
    post: PostType
    morePosts: PostType[]
    preview?: boolean
}

export default function Post({post, morePosts, preview}: Props) {
    const router = useRouter()
    const title = `${post.title} | Finance 360.`
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404}/>
    }
    const content = post.content.replace(/(<([^>]+)>)/gi, "");
    const key_words = post.key_words.join(', '.toString())
    return (
        <Layout preview={preview}>
            <Container>
                <Header/>
                {router.isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <>
                        <article className="mb-32">
                            <Head>
                                <title>{title}</title>
                                <meta property="og:image" content={post.ogImage.url}/>
                                <meta name='slug' property="slug" content={post.slug}/>
                                <meta name='description' property="description"
                                      content={post.description}/>
                                <meta name='content' property="content" content={content}/>
                                <meta name='date' property="date" content={post.date}/>
                                <meta name='author' property="author" content={post.author.name}/>
                                <meta name='excerpt' property="excerpt" content={post.excerpt}/>
                                <meta name='keywords' property="keywords" content={key_words}/>
                            </Head>
                            <PostHeader
                                title={post.title}
                                coverImage={post.coverImage}
                                date={post.date}
                                author={post.author}
                            />
                            <PostBody content={post.content}/>
                        </article>
                    </>
                )}
            </Container>
        </Layout>
    )
}

type Params = {
    params: {
        slug: string
    }
}

export async function getStaticProps({params}: Params) {
    const post = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'ogImage',
        'coverImage',
        `description`,
        `excerpt`,
        'key_words'
    ])
    const content = await markdownToHtml(post.content || '')

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}
