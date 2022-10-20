import { Provider } from 'react-redux';
import { useStore } from '../store';
import Layout from '../components/Layout';
import '..//styles/globals.css'; //TODO: remove this? seems like its not used since the path is incorrect?
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  return (
    <Provider store={store}>
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial="initialState"
            animate="animateState"
            exit="exitState"
            className="base-page-size"
            variants={{
              initialState: {
                opacity: 1,
              },
              animateState: {
                opacity: 1,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%',
                transition: {
                  duration: 0.45,
                },
              },
              exitState: {
                clipPath: 'polygon(50% 0, 50% 0%, 50% 100%, 50% 100%',
                transition: {
                  duration: 0.45,
                },
              },
            }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </Provider>
  );
}

export default MyApp;
