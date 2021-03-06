
import axios from'axios'
import { API } from '../config';
export const emailContactForm = async(data) => {


    let emailEndpoint;
    console.log(data)
    if (data.authorEmail) emailEndpoint = `${API}/contact-blog-author`
    else emailEndpoint = `${API}/contact`
    
  const response = await axios.post(emailEndpoint, 
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })

    return response
}