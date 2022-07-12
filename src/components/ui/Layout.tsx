import { Box } from '@mui/material'
import React, { FC, MutableRefObject, ReactNode, useRef } from 'react'
import VideoBackgroundPath from '../../assets/videos/video-dark-clouds.webm'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const videoRef = useRef<HTMLVideoElement>() as MutableRefObject<HTMLVideoElement>
  const setPlayBack = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1
    }
  }
  return (
    <Box
      sx={{
        background: 'blue',
        minHeight: '100vh',
      }}
    >
      <video
        autoPlay
        muted
        loop
        ref={videoRef}
        onCanPlay={() => setPlayBack()}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.5,
        }}
      >
        <source src={VideoBackgroundPath} type='video/webm' />
      </video>
      {children}
    </Box>
  )
}

export default Layout