import { DiscussionEmbed } from 'disqus-react'

export default function Comments({ post }) {
  const disqusConfig = {
    url: `https://somethingaboutmusic.com/posts/${post.slug}`,
    identifier: post.slug,
    title: post.title,
  }

  return <DiscussionEmbed shortname="something-about-music" config={disqusConfig} />
}