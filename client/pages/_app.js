import App from "next/app";
import ErrorPage from "next/error";
import { QueryClient, QueryClientProvider } from "react-query";
import 'tailwindcss/tailwind.css';
import { getStrapiURL } from "../utils";
import { getLocalizedParams } from "../utils/localize";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/global.css'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const { global } = pageProps;
  if (global === null) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
        />
      </QueryClientProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { locale } = getLocalizedParams(appContext.ctx.query);

  const appProps = await App.getInitialProps(appContext);

  try {
    const res = await fetch(
      getStrapiURL(
        `/global?populate[navigation][populate]=*&populate[footer][populate]=*,terms.link,privacy.link&populate[footerColumns][populate]=*&locale=${locale}`
      )
    );

    const globalData = await res.json();
    const globalDataAttributes = globalData.data.attributes;
    // localStorage.setItem('globalData', JSON.stringify(globalDataAttributes))

    return { ...appProps, pageProps: { global: globalDataAttributes } };
  } catch (error) {
    return { ...appProps };
  }
};

export default MyApp;
