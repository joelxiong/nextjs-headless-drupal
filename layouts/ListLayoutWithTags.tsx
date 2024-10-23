/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from "lib/utils"
import Tag from '@/components/Tag'
import Link from 'next/link'
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal" 

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: DrupalNode[]
  tags: DrupalTaxonomyTerm[]
  title: string
  initialDisplayPosts: DrupalNode[] 
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  tags,
  title,
  initialDisplayPosts,
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const displayPosts = initialDisplayPosts?.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  All Posts
                </Link>
              )}
              <ul key="1">
              {tags?.map((tag) => {
                  return (
                    <li key={tag.id} className="my-3">
                      {decodeURI(pathname.split('/tags/')[1]) === slug(tag.name) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                          {tag.name} 
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(tag.name)}`}
                          className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${tag.name}`}
                        >
                          {tag.name} 
                        </Link>
                      )}
                    </li>
                  )
                })}   
              </ul>
            </div>
          </div>
          <div>
            <ul key="2">
              {displayPosts?.map((post) => {
                return (
                  <li key={post.id} className="py-5">
                    <div className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            {formatDate(post.created)}
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link key={`$post.id`} href={`/blog/${slug(post.title)}`} className="text-gray-900 dark:text-gray-100">
                              {post.title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                           {post.field_blog_tags?.map((tag) => <Tag key={tag.id} text={tag.name} />)}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {post.body?.summary && (
                            <div
                              dangerouslySetInnerHTML={{ __html: post.body?.summary }}
                              className="prose max-w-none text-gray-500 dark:text-gray-400"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
