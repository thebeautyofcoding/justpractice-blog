import { useState } from 'react'


import { emailContactForm } from '../../actions/contact'


const Contact = ({authorEmail}) => {

    const [values, setValues] = useState({
     
        message: '',
        email: '',
        name: '',
        sent: false,
        error: false,
        buttonText: 'Send your message'
    
    })
    const { message, email, name, sent, error, buttonText } = values
    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            setValues({ ...values, buttonText: 'Sending...' })
            const data = await emailContactForm({authorEmail,name, email, message})
           
            setValues({ ...values, buttonText: 'Sent', error: '', sent: true, name: '', email: '', message:'' })
            // setTimeout(() => {
            //     setValues({...values, sent:false})
            // }, 3000)

        } catch (err) {
            setValues({...values, error: err.response.data.error})
        }


    }

    const handleChange = (name) => e => {
        setValues({ ...values, [name]: e.target.value, error: false, success: false })
        
    }

   const resetButtonTextAndSentStatus = () => {
        if(sent) setValues({...values, sent:false, buttonText:'Another message?'})
    }

    const sendEmailToUser = () => {
        return (!authorEmail && <form onKeyUp={resetButtonTextAndSentStatus} onSubmit={onSubmitHandler} className="flex flex--col mt-small">
            <input type="text" onChange={handleChange('name')} className="input " value={name} name="name" placeholder="Please type your name..." required></input>
            <input type="email" onChange={handleChange('email')} className="input mt-small" value={email} name="email" required placeholder="Please type the email of the recipient..."></input>
            <textarea rows={10} type="text" onChange={handleChange('message')} required className="input mt-small" value={message} name="message" placeholder="Please type your message..."></textarea>

            <button className="Button mt-small" type="submit">{buttonText}</button>
        </form>
    )
    }

    const sendEmailToBlogAuthor = () => {
         return (authorEmail && <form onKeyUp={resetButtonTextAndSentStatus} onSubmit={onSubmitHandler} className="flex flex--col mt-small">
            <input type="text" onChange={handleChange('name')} className="input " value={name} name="name" placeholder="Please type your name..." required></input>
             <input type="email" onChange={handleChange('email')} className="input mt-small" value={email} name="email" required placeholder="Please type your email..."></input>
            <textarea rows={10} type="text" onChange={handleChange('message')} required className="input mt-small" value={message} name="message" placeholder="Please type your message..."></textarea>

            <button className="Button mt-small" type="submit">{buttonText}</button>
        </form>
    )
    }
    return (<div>
        <div className="center error">{error}</div>
        {sendEmailToUser()}
    {sendEmailToBlogAuthor()}</div>)
   
    



}


export default Contact