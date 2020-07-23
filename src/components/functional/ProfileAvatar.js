import React from "react"
import { get_initials } from "../../utils/common_utilities"

const ProfileAvatar = (props) => {
    return (<div>
        {/* <img  src="" ></img> */}
         <span className="profile_avatar_span">{get_initials(props.name)}</span>
    </div>)
}

export default ProfileAvatar