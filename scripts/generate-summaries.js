const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'src', 'markdowns', 'index.json');
const markdownsDir = path.join(__dirname, '..', 'src', 'markdowns');

const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

indexData.files = indexData.files.map(post => {
  const mdPath = path.join(markdownsDir, `${post.key}.md`);
  let content = fs.readFileSync(mdPath, 'utf-8');

  // Remove markdown H1 title if present
  if (content.startsWith('# ')) {
    content = content.substring(content.indexOf('\n') + 1);
  }

  // Strip HTML tags (leading blocks like <p align="center">, <div>, <video> ...)
  content = content.replace(/<[^>]*>?/gm, '');
  // Strip markdown links, keep text
  content = content.replace(/\[([^\]]+)\]\([^)]+\)/gm, '$1');
  // Strip heading markers
  content = content.replace(/#/g, '');

  // Take first 20 words
  content = content.trim().split(/\s+/).slice(0, 20).join(' ');

  post.summary = content;
  return post;
});

fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 4) + '\n');
console.log(`Generated summaries for ${indexData.files.length} posts.`);
