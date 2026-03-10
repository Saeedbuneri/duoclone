import fs from 'fs';
import path from 'path';

const pages = ['info', 'approach', 'efficacy', 'careers', 'blog', 'store', 'investors', 'terms', 'privacy'];

const domainMap = {
    'blog': 'https://blog.duolingo.com',
    'careers': 'https://careers.duolingo.com',
    'store': 'https://store.duolingo.com',
    'investors': 'https://investors.duolingo.com',
    'info': 'https://www.duolingo.com',
    'approach': 'https://www.duolingo.com',
    'efficacy': 'https://www.duolingo.com',
    'terms': 'https://www.duolingo.com',
    'privacy': 'https://www.duolingo.com'
};

pages.forEach(p => {
    const scrapedFile = `duo_${p}_scraped.html`;
    const htmlFile = `duo_${p}_main.html`;

    if (!fs.existsSync(scrapedFile)) return;

    let html = fs.readFileSync(scrapedFile, 'utf8');
    const baseDomain = domainMap[p] || 'https://www.duolingo.com';

    // 1. Remove large headers
    html = html.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, (match) => {
        if (match.length < 500) return match;
        return '';
    });

    // 2. Disable ALL links (Internal & External) as per user request
    const anchorRegex = /<a\s+([\s\S]*?)>/gi;
    html = html.replace(anchorRegex, (match, attrs) => {
        const classMatch = attrs.match(/class=(["'])(.*?)\1/i);
        const idMatch = attrs.match(/id=(["'])(.*?)\1/i);
        const styleMatch = attrs.match(/style=(["'])(.*?)\1/i);

        let preserved = '';
        if (classMatch) preserved += ` class="${classMatch[2]}"`;
        if (idMatch) preserved += ` id="${idMatch[2]}"`;

        // Merge styles if existing
        let styleContent = "cursor: default; text-decoration: none;";
        if (styleMatch) {
            styleContent = `${styleMatch[2]}; ${styleContent}`;
        }
        preserved += ` style="${styleContent}"`;

        return `<a${preserved} href="javascript:void(0)" onclick="event.preventDefault();">`;
    });

    // 3. Remove scripts
    html = html.replace(/<script[^>]*src=["'][^"']*(duolingo\.com|shopify\.com|google-analytics\.com|googletagmanager\.com)[^"']*["'][^>]*>[\s\S]*?<\/script>/gi, '');

    // 4. Fix Image URLs
    html = html.replace(/src=["']\/\//g, 'src="https://');
    html = html.replace(/srcset=["']\/\//g, 'srcset="https://');
    html = html.replace(/src=["']\/([^\/\s][^"']*)["']/gi, `src="${baseDomain}/$1"`);
    html = html.replace(/data-src=["']\/([^\/\s][^"']*)["']/gi, `data-src="${baseDomain}/$1"`);
    html = html.replace(/data-bgset=["']\/([^\/\s][^"']*)["']/gi, `data-bgset="${baseDomain}/$1"`);

    html = html.replace(/srcset=(["'])([^"']+)\1/gi, (m, q, content) => {
        const parts = content.split(',').map(part => {
            const trimmed = part.trim();
            if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
                return `${baseDomain}${trimmed}`;
            }
            return trimmed;
        });
        return `srcset=${q}${parts.join(', ')}${q}`;
    });

    // 5. Hide broken images
    html = html.replace(/<img\s+/gi, '<img onerror="this.style.display=\'none\'" ');

    // 6. Final Cleanup
    html = html.replace(/Access Denied/gi, 'Protected Content');
    html = html.replace(/Permission Denied/gi, 'Protected Content');

    fs.writeFileSync(htmlFile, html);
});

console.log("Re-refined: Updated link disabling with merged styles.");
