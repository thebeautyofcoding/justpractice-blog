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
            console.log(data)
            setValues({ ...values, buttonText: 'Sent', error: '', sent: true, name: '', email: '' })

        } catch (err) {
            console.log(err.response.data)
        }


    }

    const handleChange = (name) => e => {
        setValues({ ...values, [name]: e.target.value, error: false, success: false })
    }

    return <form onSubmit={onSubmitHandler} className="container__column mt-small">
        <input type="text" onChange={handleChange('name')} className="input " value={name} name="name" placeholder="Please type your name..." required></input>
        <input type="email" onChange={handleChange('email')} className="input mt-small" value={email} name="email" required placeholder="Please type your email..."></input>
        <textarea rows={10} type="text" onChange={handleChange('message')} required className="input mt-small" value={message} name="message" placeholder="Please type your message..."></textarea>

        <button className="Button mt-small" type="submit">{buttonText}</button>
    </form>



}


export default Contact