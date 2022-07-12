import React, { useEffect, useState } from 'react'

const DynamicSvgIcon = ({ name, height }: { name: string; height: number }) => {
  const [icon, setIcon] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const importedIcon = await import(`assets/icons/${name}.svg`)
      setIcon(importedIcon.default)
    })()
  }, [name])

  if (!icon) {
    return <span>X</span>
  }
  return <img height={height} src={icon} alt='icon' />
}

export default DynamicSvgIcon
