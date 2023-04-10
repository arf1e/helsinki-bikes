import Head from 'next/head';

type Props = {
  title: string;
};

const PageHead = ({ title }: Props) => {
  const pageTitle = title ? `${title} | Bike App` : 'Bike App';
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default PageHead;
