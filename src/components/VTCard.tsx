import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Liver } from '../types/Liver.ts'

type Props = {
  vtuber: Liver
}

const VTCard: React.FC<Props> = (props: Props) => {
  const iconBasePath = import.meta.env.BASE_URL + '/icon/'

  // ロングタップで似ている人を探す機能をつけたい
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
