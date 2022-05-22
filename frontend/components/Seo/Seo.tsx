import Head from 'next/head';

interface SeoProps {
  metaTitle: string;
  metaDescription: string;
  shareImage: string;
  article?: boolean;
}

export const Seo = ({
  metaTitle,
  metaDescription,
  shareImage,
  article,
}: SeoProps) => {
  return (
    <Head>
      {metaTitle && (
        <>
          <title>{metaTitle}</title>
          <meta property="og:title" content={metaTitle} />
          <meta name="twitter:title" content={metaTitle} />
        </>
      )}
      {metaDescription && (
        <>
          <meta name="description" content={metaDescription} />
          <meta property="og:description" content={metaDescription} />
          <meta name="twitter:description" content={metaDescription} />
        </>
      )}
      {shareImage && (
        <>
          <meta property="og:image" content={shareImage} />
          <meta name="twitter:image" content={shareImage} />
          <meta name="image" content={shareImage} />
        </>
      )}
      {article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
