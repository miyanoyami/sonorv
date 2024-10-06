import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { VT } from '../types/Vt'

type Props = {
  vtuber: VT
}

const VTCard: React.FC<Props> = (props: Props) => {
  const iconBasePath = process.env.GITHUB_PAGES ? '/sonorv/dist/icon/' : '/sonorv/icon/'

  return (
    <a href={props.vtuber.yt} target="_blank" className="has-text-black">
    <div className="card mt-2">
    <div className="media">
    <div className="media-left">
    <figure className="image is-96x96">
    <LazyLoadImage className="is-rounded" src={iconBasePath + props.vtuber.iconFile} />
    </figure>
    </div>

    <div className="media-content">
    <p className="has-text-weight-semibold is-size-5 mt-5">
    {props.vtuber.name}
    </p>
    </div>
    </div>
    </div>
    </a>
  )
}

export default VTCard
