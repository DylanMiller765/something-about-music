import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share'

export default function ShareButtons({ url, title }) {
  return (
    <div className="flex space-x-4 my-4">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  )
}