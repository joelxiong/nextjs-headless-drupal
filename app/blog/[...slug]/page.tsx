import { DrupalNode} from "next-drupal" 
import { drupal } from "lib/drupal"
import { slug } from 'github-slugger'
import 'css/prism.css'
import 'katex/dist/katex.css'
import PostLayout from '@/layouts/PostLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

const defaultLayout = 'PostLayout'
const layouts = {
  PostLayout,
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slugDecoded = decodeURI(params.slug.join('/'))
  const posts = await drupal.getResourceCollection<DrupalNode[]>(
    "node--blog",
    {
      params: {
        "filter[status]": 1,
        "fields[node--blog]": "title,path,body,uid,created,field_image,field_blog_tags",
        include: "field_blog_tags,uid",
        sort: "-created",
      },
    }
  ) 
  const postIndex = posts.findIndex((post) => slug(post.title) === slugDecoded)
  if (postIndex === -1) {
    return
  }  
  const post = posts[postIndex]

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: './',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  }
}

export default async function Page({ params }: { params: { slug: string[] } }) { 
  const slugDecoded = decodeURI(params.slug.join('/'))
  const posts = await drupal.getResourceCollection<DrupalNode[]>(
    "node--blog",
    {
      params: {
      "filter[status]": 1,
      "fields[node--blog]": "title,path,body,uid,created,field_image,field_blog_tags",
      include: "field_blog_tags,uid",
      sort: "-created",
    },
  }
) 
  const postIndex = posts.findIndex((post) => slug(post.title) === slugDecoded)
  if (postIndex === -1) {
    return notFound()
  }
  
  const post = posts[postIndex]
  const prev = posts[postIndex + 1]
  const next = posts[postIndex - 1]
  const Layout = layouts[post.layout || defaultLayout]
  return (
    <>
      <Layout content={post} next={next} prev={prev}></Layout>
    </>
  )
}
