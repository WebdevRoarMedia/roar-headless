'use client'

import { useQuery } from '@apollo/client'
import { GET_HOME_MAIN_VIDEO } from '@/app/graphql/queries/GET_HOME_VIDEOS'
import { Suspense } from 'react'
import './style.css';


function VideoPlayer({ videoUrl }) {
  return (
    <video autoPlay muted>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default function HomeMainHero() {
  const { data, error } = useQuery(GET_HOME_MAIN_VIDEO)

  if (error) return <p>Error loading video</p>
  if (!data) return null

  return (
    <Suspense fallback={<div className="aspect-video bg-gray-200" />}>
      <VideoPlayer videoUrl={data.page.homeMainVideo.homeMainVideoUrl} />
    </Suspense>
  )
}