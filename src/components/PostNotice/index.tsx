import React from 'react'
import { translate } from '@docusaurus/Translate'
import Admonition from '@theme/Admonition'
import PostNotice from './PostNotice.module.css'

const title = translate({ message: 'Old Post Ahead!' })

type Props = {
  frontMatter: any
  assets: any
  metadata: any
  isBlogPostPage: any
  children: any
}

const bulletOneFront = translate({
  message: 'I wrote this post more than ',
})
const bulletOneBackSingular = translate({
  message: ' year ago.',
})
const bulletOneBackPlural = translate({
  message: ' years ago.',
})

const bulletTwo = translate({
  message: "That's enough time for things to change.",
})

const bulletThree = translate({
  message: 'I might not agree with this post anymore.',
})

const translateCallToAction = translate({
  message: 'Google Latest Articles Instead',
})

const isOldPost = (date: string) => {
  const now = new Date()
  const postDate = new Date(date)
  if (now.getTime() - postDate.getTime() > 365 * 24 * 60 * 60 * 1000) {
    return true
  }
  return false
}

const howManyYearsAgo = (date: string) => {
  const now = new Date()
  const postDate = new Date(date)
  const diff = now.getTime() - postDate.getTime()
  const years = Math.floor(diff / (365 * 24 * 60 * 60 * 1000))
  return years
}

const urlify = (text: string) => {
  return text.replace(/\s/g, '+')
}

const SearchGoogleButton = (props) => (
  <a
    role='button'
    className={PostNotice.searchGoogleButton}
    href={`https://www.google.com/search?q=${urlify(props.title)}&tbs=qdr:y`}
    target='_blank'
    rel='noopener noreferrer'
  >
    {translateCallToAction}
  </a>
)

const index = (props: Props) => {
  const { metadata } = props
  return (
    isOldPost(metadata.date) && (
      <Admonition type='caution' title={title} icon='📜'>
        <ul>
          <li>
            {bulletOneFront}
            {howManyYearsAgo(metadata.date)}
            {howManyYearsAgo(metadata.date) > 1 ? bulletOneBackPlural : bulletOneBackSingular}
          </li>
          <li>{bulletTwo}</li>
          <li>{bulletThree}</li>
        </ul>
        <SearchGoogleButton title={metadata.title} />
      </Admonition>
    )
  )
}

export default index
