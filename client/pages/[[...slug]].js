import delve from 'dlv';
import ErrorPage from 'next/error';
import Layout from '../components/layout';
import dynamic from 'next/dynamic';
const BlockManager = dynamic(
  () => import('../components/shared/BlockManager'),
  { ssr: false }
);
import { getData, handleRedirection } from '../utils';
import { getLocalizedParams } from '../utils/localize';
import CustomLink from '../components/shared/CustomLink';

const Universals = ({ global, pageData, preview }) => {
  if (pageData === null) {
    return <ErrorPage statusCode={404} />;
  }

  const blocks = delve(pageData, 'attributes.blocks');
  if (typeof window !== 'undefined') localStorage.setItem('globalData', JSON.stringify(global))
  return (
    <Layout global={global} pageData={pageData} type="pages" preview={preview}>
      {blocks && (
        <BlockManager
          blocks={blocks}
          type="collectionType"
          contentType="page"
          pageData={pageData}
        />
      )}

      <div class='sticky bottom-0 z-20'>
        <button class='bottom-0 my-8 float-right px-5 py-2 bg-primary mr-3 text-white text-sm font-bold tracking-wide rounded-full focus:outline-none'>
          <CustomLink {...delve(global, 'navigation.rightButton')} />
        </button>
      </div>
    </Layout>
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  const { slug, locale } = getLocalizedParams(context.query);

  try {
    const data = getData(
      slug,
      locale,
      'page',
      'collectionType',
      context.preview
    );
    const res = await fetch(delve(data, 'data'));
    const json = await res.json();

    if (!json.data.length) {
      return handleRedirection(context.preview, null);
    }

    return {
      props: { pageData: json.data[0], preview: context.preview || null },
    };
  } catch (error) {
    return {
      props: { pageData: null },
    };
  }
}

export default Universals;