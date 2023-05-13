import Head from 'next/head';

type Props = {
  title: string;
};

const PageHead = ({ title }: Props) => {
  const pageTitle = title ? `${title} | Helsinki Bikes` : 'Helsinki Bikes';
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default PageHead;
