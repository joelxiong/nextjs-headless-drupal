import { DrupalNode } from "next-drupal" 
import { drupal } from "lib/drupal"
import { NodeAuthor } from "components/node--author"

export default async function Page() {
 const nodes = await drupal.getResourceCollection<DrupalNode[]>(
    "node--author",
    {
      params: {
        "filter[status]": 1,
        "fields[node--author]": "title,path,body,field_avatar,uid,created,field_name,field_occupation,field_company,field_email,field_github,field_linkedin,field_twitter",
        include: "field_avatar,uid",
        sort: "-created",
      },
    }
  ) 
  return (
    <>
      {nodes?.length ? (
        nodes.map((node) => (
          <div key={node.id}>
            <NodeAuthor node={node} />
          </div>
        ))
      ) : (
        <p className="py-4">No Author found</p>
      )}
    </>
  )
}
