import { slug } from 'github-slugger'
import Link from "next/link"
import { genPageMetadata } from 'app/seo'
import { drupal } from "lib/drupal"
import { DrupalTaxonomyTerm } from "next-drupal"

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
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
    <>
      {tags?.length ? (
        <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-4xl md:leading-14">
            Tags
          </h1>
        </div>
        {tags.map((tag) => {
          return (
            <div key={tag.id} className="mb-2 mr-5 mt-2">
              <Link
                href={`/tags/${slug(tag.name)}`}
                className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                aria-label={`View posts tagged ${tag.name}`}
              >
                {tag.name}
              </Link>
            </div>
          )
        })}        
        </div>
      ) : (
        <div className="flex max-w-lg flex-wrap">No Tags found</div>
      )}
    </>
  )
}
