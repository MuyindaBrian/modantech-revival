import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const contentDir = path.join(projectRoot, 'src', 'content', 'blog');
// Write to dist/ so generated feeds are included in the deployed build (Netlify publishes dist/)
const outputDir = path.join(projectRoot, 'dist');

const SITE_URL = process.env.SITE_URL || 'https://example.com';

function readMarkdownPosts() {
	const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
	const posts = files.map(fileName => {
		const fullPath = path.join(contentDir, fileName);
		const raw = fs.readFileSync(fullPath, 'utf8');
		const { data, content } = matter(raw);
		const baseName = fileName.replace(/\.md$/, '');
		const slug = baseName.replace(/^\d{4}-\d{2}-\d{2}-/, '');
		return {
			slug,
			title: data.title ?? slug,
			description: data.description ?? '',
			author: data.author ?? 'ModanTech',
			date: data.date ? new Date(data.date) : new Date(),
			image: data.image ?? '/images/uploads/placeholder.jpg',
			tags: Array.isArray(data.tags) ? data.tags : [],
			content,
			url: `${SITE_URL}/blog/${slug}`,
			fileName,
		};
	}).sort((a, b) => b.date.getTime() - a.date.getTime());
	return posts;
}

function generateSitemap(posts) {
	const urls = [
		'/',
		'/services',
		'/projects',
		'/team',
		'/blog',
		'/contact',
		...posts.map(p => `/blog/${p.slug}`),
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
		urls.map(u => {
			const loc = `${SITE_URL}${u}`;
			return `\n  <url>\n    <loc>${loc}</loc>\n  </url>`;
		}).join('') +
		`\n</urlset>\n`;

	fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), xml, 'utf8');
}

function escapeXml(str) {
	return str.replace(/[<>&'\"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','\'':'&apos;','\"':'&quot;'}[c]));
}

function generateRss(posts) {
	const now = new Date().toUTCString();
	const items = posts.map(p => `\n    <item>\n      <title>${escapeXml(p.title)}</title>\n      <link>${p.url}</link>\n      <guid>${p.url}</guid>\n      <pubDate>${p.date.toUTCString()}</pubDate>\n      <description>${escapeXml(p.description || '')}</description>\n    </item>`).join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>ModanTech Blog</title>\n    <link>${SITE_URL}</link>\n    <description>Latest articles from ModanTech</description>\n    <lastBuildDate>${now}</lastBuildDate>${items}\n  </channel>\n</rss>\n`;

	fs.writeFileSync(path.join(outputDir, 'rss.xml'), xml, 'utf8');
}

function main() {
	if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
	const posts = readMarkdownPosts();
	generateSitemap(posts);
	generateRss(posts);
	console.log(`Generated sitemap.xml and rss.xml for ${posts.length} posts at ${outputDir}`);
}

main();


