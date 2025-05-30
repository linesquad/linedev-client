import React from 'react'

function MainWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-[#0E0C15] max-w-[1440px] mx-auto'>
      {children}
    </div>
  )
}

export default MainWrapper