import "bootstrap/dist/css/bootstrap.css";

export default ({ Component, pageProps }) => {
  //when route to index.js this call as Component is index.js or other page on pages...(warper)
  return <Component {...pageProps} />;
};
