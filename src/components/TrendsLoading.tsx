import React from 'react'

function TrendsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {[1,2,3,4,5,6].map((k)=>{
        return(
            <div key={k} className='h-64
             bg-muted animate-pulse'>

            </div>
        )                                
    })}
</div>
  )
}

export default TrendsLoading
