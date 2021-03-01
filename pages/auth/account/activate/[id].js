
import { useState, useEffect} from 'react'

import { signup } from '../../../../actions/auth'
import { withRouter } from 'next/router'
import jwt from 'jsonwebtoken'

const ActivateAccount = ({router}) => {
    
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        loading: false,
        success: false,
        showButton:true
    })

    useEffect(() => {
        let token = router.query.id;
        console.log(jwt.decode(token))
        if (token) {
            const { name } = jwt.decode(token)
            setValues({...values, token, name})
        }
    }, [router.query.id])
    

    const onClickHandler = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false })
        
        signup({ token }).then(data => {
            if (data.data.error) {
                setValues({ ...values, error: data.error, loading: false, showButton:true})
            } else {
                setValues({ ...values,success:true, loading: false, showButton:false})
            }
        })
    }

    const { name, token, error, loading, success, showButton } = values
    
const showLoading=()=> loading? (<h2>Loading...</h2>): ''
    
        return (
            <div className="container__column m-big">
                <h3>Hey {name}, ready to activiate your account?</h3>
                {showLoading()}
                {error && error}
               <div className="success"> {success && 'You have successfully activated your account. Please sign in.'}</div>
                {showButton && <button onClick={onClickHandler} className="btn btn--red">Activate your account</button>}

            </div>)


}


export default withRouter(ActivateAccount);