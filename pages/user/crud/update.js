

import Private from '../../../components/auth/Private'
import Link from 'next/link'
import ProfileUpdate from '../../../components/auth/ProfileUpdate'

const UserProfileUpdate = () => {
    return(
      
            <Private>
               

                       <ProfileUpdate/>

                 
              
                
            </Private>
  
    )
}

export default UserProfileUpdate