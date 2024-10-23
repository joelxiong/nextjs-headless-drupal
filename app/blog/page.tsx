import { DrupalNode, DrupalTaxonomyTerm} from "next-drupal" 
import { drupal } from "lib/drupal"
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 6

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
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
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }
  const tags = await drupal.getResourceCollection<DrupalTaxonomyTerm[]>(
    "taxonomy_term--tags",
    {
      params: {
        "filter[status]": 1,
        include: "vid"
      },
    }
  ) 

  return (
    <ListLayout
      posts={posts}
      tags={tags}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
