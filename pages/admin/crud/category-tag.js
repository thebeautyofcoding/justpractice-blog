
import Category from '../../../components/crud/Category'

import Tag from '../../../components/crud/Tag'

import Admin from '../../../components/auth/Admin';
const CategoryTag = () => {
    return <div className="container__row center">
        <Admin>
            
        <Category />
            <Tag />
            </Admin>
            </div>
           
 

}


export default CategoryTag