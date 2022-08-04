import '../styles/colours.css'
import '../styles/values.css'
import '../styles/variables.css'
import '../styles/fonts.css'
import '../styles/base.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
