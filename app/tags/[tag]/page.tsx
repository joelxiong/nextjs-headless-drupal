import { DrupalNode, DrupalTaxonomyTerm} from "next-drupal" 
import { slug } from 'github-slugger'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { drupal } from "lib/drupal"
import { notFound } from 'next/navigation'

export default async function TagPage({ params }: { params: { tag: string, page: string } }) {
  const tagDecoded = decodeURI(params.tag)

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
  const filteredPosts = allBlogs.filter((post) => post.field_blog_tags && post.field_blog_tags.map((t) => slug(t.name)).includes(tagDecoded))

  const pagination = {
    currentPage: 1,
    totalPages: 1
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

  if (filteredPosts.length === 0) {
    return notFound()
  }
  return <ListLayoutWithTags 
    posts={filteredPosts}
    tags={tags}
    title="All Posts"
    initialDisplayPosts={filteredPosts}
    pagination={pagination}
  />
}
