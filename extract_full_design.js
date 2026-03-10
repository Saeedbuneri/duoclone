import fs from 'fs';

const pages = ['info', 'approach', 'efficacy', 'careers', 'blog', 'store', 'investors', 'terms', 'privacy'];

pages.forEach(p => {
  const file = 'duo_' + p + '_scraped.html';
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');

    // Extract everything inside main or body
    let content = '';
    const mainSection = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (mainSection) {
      content = `<main class="original-duo-design" id="${p}-original-main">` + mainSection[1] + `</main>`;
    } else {
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) {
        content = `<div class="original-duo-design" id="${p}-original-body">` + bodyMatch[1] + `</div>`;
      } else {
        content = html;
      }
    }

    // Convert class to original-class just in case, wait no, keep original classes so css works if we append it
    fs.writeFileSync('duo_' + p + '_main.html', content);

    // Extract <style> blocks
    const styles = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
    let css = '';
    styles.forEach(styleTag => {
      let sc = styleTag.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      if (sc && sc[1]) css += sc[1] + '\n';
    });

    fs.writeFileSync('duo_' + p + '_styles.css', css);
  }
});
