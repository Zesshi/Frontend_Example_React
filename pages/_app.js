import '../styles/globals.css'
import Layout from '../components/layout'
import GlobalContextProvider from '../store'

export default function App({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  )
}
