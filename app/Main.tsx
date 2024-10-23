import siteMetadata from '@/data/siteMetadata'
import Link from "next/link"
import { slug } from 'github-slugger'
import Tag from '@/components/Tag'
import { formatDate } from "lib/utils"

const MAX_DISPLAY = 6

export default function Main({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Digital CMS Development Services
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'} 
          {posts.slice(0, MAX_DISPLAY).map((node) => {
            return (
              <li key={node.id} className="py-12">
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        {formatDate(node.created)}
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href= {`/blog/${slug(node.title)}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {node.title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {node.field_blog_tags.map((tag) => (
                              <Tag key={tag.id} text={tag.name} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {node.body?.summary && (
                            <div
                              dangerouslySetInnerHTML={{ __html: node.body?.summary }}
                              className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2"
                            />
                          )}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href= {`/blog/${slug(node.title)}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${node.title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
