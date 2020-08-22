import React from 'react'

const FullPageLoader = () => {
    return (
        <div className="loading-full_page" delay-hide="50000">
          <div >
            <img className="fullpage_loader_icon " src="/icon/logo.svg" />
         </div>
        </div>
    )
}

export default FullPageLoader