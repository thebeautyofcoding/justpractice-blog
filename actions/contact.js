
import axios from'axios'
import { API } from '../config';
export const emailContactForm = async(data) => {

  console.log(APIwas )
    let emailEndpoint;
    console.log(data)
    if (data.authEmail) emailEndpoint = `${API}/contact-blog-author`
    else emailEndpoint = `${API}/contact`
    
    const response = await axios.post(emailEndpoint,
    
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data
      })

    return response
}