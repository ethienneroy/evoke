import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script'
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-Z5Y2JFF0HX" />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-Z5Y2JFF0HX');
        `}
          </Script>
        </Head>
        <body>

          <Main />
          <NextScript />

        </body>
      </Html>
    );
  }
}

export default MyDocument;
