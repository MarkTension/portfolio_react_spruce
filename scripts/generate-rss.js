const RSS = require('rss');
const fs = require('fs');
const path = require('path');
const posts = require('../src/markdowns/index.json');

const feed = new RSS({
  title: "Mark Tensen's Blog",
  description: "On finding synergies in programming, music, AI, artificial life, and design",
  site_url: 'https://marktension.nl',
  feed_url: 'https://marktension.nl/rss.xml',
  language: 'en',
  pubDate: new Date(),
  ttl: 60,
});

posts.files
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .forEach((post) => {
    feed.item({
      title: post.title,
      description: post.slug || post.title,
      url: `https://marktension.nl/blog/${post.key}`,
      date: new Date(post.date),
      categories: post.tags,
    });
  });

// Ensure public directory exists
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write RSS feed to public directory
fs.writeFileSync(
  path.join(publicDir, 'rss.xml'),
  feed.xml({ indent: true })
);

console.log('RSS feed generated successfully at /public/rss.xml');