import { DrupalNode, DrupalTaxonomyTerm} from "next-drupal" 
import { drupal } from "lib/drupal"
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 6

export const generateStaticParams = async () => {
  const allBlogs = await drupal.getResourceCollection<DrupalNode[]>(
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
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page({ params }: { params: { page: string } }) {
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
  const pageNumber = parseInt(params.page as string)
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
    <ListLayoutWithTags
      posts={posts}
      tags={tags}
      title="All Posts"
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
    />
  )
}
