import { Box } from '@mui/material'
import React from 'react'
import VideoBackgroundPath from '../../assets/videos/video-dark-clouds.webm'

const Background = () => {
  return (
    <Box
      sx={{
        background: `linear-gradient(
        rgba(2,16,68,0.9), rgba(0, 43, 24,0.9)
        )`,
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: -10,
      }}
    >
      <video
        autoPlay
        muted
        loop
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.3,
        }}
      >
        <source src={VideoBackgroundPath} type='video/webm' />
      </video>
    </Box>
  )
}

export default Background
