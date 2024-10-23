import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { absoluteUrl } from "lib/utils"
import { DrupalNode } from "next-drupal"  

interface NodeAuthorProps {
  node: DrupalNode
}

export function NodeAuthor({ node }: NodeAuthorProps) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            About 
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
              {node.field_avatar && (
                <figure className="my-4">
                  <Image
                    src={absoluteUrl(node.field_avatar.uri.url)}
                    width={192}
                    height={192}
                    className="h-48 w-48 rounded-full"
                    alt={node.field_avatar.resourceIdObjMeta.alt}
                  />
                </figure>
              )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{node.field_name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{node.field_occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{node.field_company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${node.field_email}`} />
              <SocialIcon kind="github" href={node.field_github} />
              <SocialIcon kind="linkedin" href={node.field_linkedin} />
              <SocialIcon kind="x" href={node.field_twitter} />
            </div>
          </div>
          {node.body?.processed && (
          <div
            dangerouslySetInnerHTML={{ __html: node.body?.processed }}
            className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2"
          />
          )}
        </div>
      </div>
    </>
  )
}
