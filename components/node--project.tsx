import Image from '@/components/Image'
import { absoluteUrl } from "lib/utils"
import { DrupalNode } from "next-drupal"  
import Link from "next/link"

interface NodeProjectProps {
  node: DrupalNode
}

export function NodeProject({ node }: NodeProjectProps) {
  return (
    <div className="h-full  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
    {node.field_image && (
      <figure className="my-4">
        <Image
          src={absoluteUrl(node.field_image.uri.url)}
          width={544}
          height={306}
          className="object-cover object-center md:h-36 lg:h-48"
          alt={node.field_image.resourceIdObjMeta.alt}
        />
      </figure>
    )}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {node.href ? (
            <Link href={node.href} aria-label={`Link to ${node.title}`}>
              {node.title}
            </Link>
          ) : (
            node.title
          )}
        </h2>
        <div className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
        {node.body?.processed && (         
          <div
            dangerouslySetInnerHTML={{ __html: node.body?.processed }}
          />
          )}
        </div>

        {node.field_href && (
          <Link
            href={node.field_href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${node.title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
)}
