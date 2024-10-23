import { DrupalNode } from "next-drupal" 
import { drupal } from "lib/drupal"
import Main from './Main'

export default async function Page() {
  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
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
  return (<Main posts={nodes} />)
}
