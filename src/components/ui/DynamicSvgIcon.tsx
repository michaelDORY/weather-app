import React, { memo, useEffect, useState } from 'react'
import DefaultIcon from 'assets/icons/default-weather-icon.svg'

const DynamicSvgIcon = memo(({ name, height }: { name: string; height: number }) => {
  const [icon, setIcon] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const importedIcon = await import(`assets/icons/${name}.svg`)
      setIcon(importedIcon.default)
    })()
  }, [name])

  if (!icon) {
    return <img height={height} src={DefaultIcon} alt='icon' />
  }
  return <img height={height} src={icon} alt='icon' />
})
DynamicSvgIcon.displayName = 'DynamicSvgIcon'

export default DynamicSvgIcon
