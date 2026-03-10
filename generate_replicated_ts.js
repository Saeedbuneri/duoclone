import fs from 'fs';

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

let tsFile = "export const replicatedContent: Record<string, { html: string, css: string }> = {\n";

pages.forEach(p => {
    const htmlFile = `duo_${p}_main.html`;
    const cssFile = `duo_${p}_full_styles.css`;
    const baseDomain = domainMap[p] || 'https://www.duolingo.com';

    if (fs.existsSync(htmlFile) && fs.existsSync(cssFile)) {
        let html = fs.readFileSync(htmlFile, 'utf8');
        let css = fs.readFileSync(cssFile, 'utf8');

        // Fix root-relative URLs in CSS: url("/assets/...") -> url("https://.../assets/...")
        // Matches url("/") but NOT url("//")
        css = css.replace(/url\((["'])\/([^\/][^"')]*)["']\)/gi, `url($1${baseDomain}/$2$1)`);
        css = css.replace(/url\(\/([^\/][^"')]*)\)/gi, `url(${baseDomain}/$1)`);

        // Escape backslashes first to prevent \25bc errors
        const cleanHtml = html
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`').replace(/\$/g, '\\$');
        const cleanCss = css
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`').replace(/\$/g, '\\$');

        tsFile += `  "${p}": {\n    html: \`${cleanHtml}\`,\n    css: \`${cleanCss}\`\n  },\n`;
    }
});

tsFile += "};\n";

fs.writeFileSync('src/replicatedContent.ts', tsFile);
console.log("Generated src/replicatedContent.ts with backslash escaping and CSS URL fixes");
