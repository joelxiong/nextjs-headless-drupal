import { DrupalNode } from "next-drupal" 
import { drupal } from "lib/drupal"
import { NodeProject } from "components/node--project"
import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Page() {
  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
      "node--projects",
      {
        params: {          
          "filter[status]": 1,
          "fields[node--projects]": "title,path,body,field_image,uid,created,field_sequence,field_href",
          include: "uid",
          sort: "-field_sequence",
        },
      }
    ) 
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
           Joel Xiong have worked as a full stack Drupal developer at senior/lead level for more than 12 years. He has completed several government projects in the past several years. Based on the Australian Government Digital Transformation Agency “Digital Service Standard”.
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {nodes?.length ? (
              nodes.map((node) => (
                <div key={node.id} className="md max-w-[544px] p-4 md:w-1/2">
                  <NodeProject node={node} />
                </div>
              ))
            ) : (
              <p className="py-4">No Project found</p>
            )}  
          </div>
        </div>  
      </div>
    </>
  )
}
