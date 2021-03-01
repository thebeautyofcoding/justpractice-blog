
import '../node_modules/react-quill/dist/quill.snow.css'
import '../sass/main.scss'

import {Provider}from 'react-redux'
import store from '../redux/store'
import { createWrapper } from 'next-redux-wrapper'
import Layout from '../components/Layout'
  



function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
   <Layout><Component {...pageProps} /></Layout>
  </Provider>
  
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore)
export default wrapper.withRedux(MyApp)
