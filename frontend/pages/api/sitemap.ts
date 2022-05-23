import { NextApiRequest, NextApiResponse } from 'next';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

/*
 * An array with all routes links
 * - url: URL of the page
 * - changefreq: Frequency of page changes
 * - priority: Priority of the page into the app
 */
const commonLinks = [
  {
    url: `/`,
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    url: `/app`,
    changefreq: 'daily',
    priority: 0.8,
  },
  {
    url: `/app/gallery`,
    changefreq: 'daily',
    priority: 1,
  },
  {
    url: `/app/profile`,
    changefreq: 'daily',
    priority: 0.5,
  },
  {
    url: `/app/mint`,
    changefreq: 'daily',
    priority: 0.4,
  },
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Create a stream to write to
  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  });

  const xmlString = await streamToPromise(
    Readable.from(commonLinks).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};
