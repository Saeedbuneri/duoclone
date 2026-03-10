import { replicatedContent } from '../replicatedContent.ts';

function createReplicatedPage(key: string) {
  const data = replicatedContent[key] || { html: '<p>Content not found.</p>', css: '' };

  return () => ({
    html: `
      <style>
        /* Pre-scoped styles for replicated content */
        #replicated-container-${key} {
          all: initial;
          display: block;
          font-family: "din-round", "lucida grande", "lucida sans unicode", "lucida sans", "verdana", "sans-serif";
          line-height: 1.2;
          -webkit-font-smoothing: antialiased;
        }
        #replicated-container-${key} * {
          box-sizing: border-box;
        }
        ${data.css}
        
        /* Fixes for overlapping our layout */
        #replicated-container-${key} header {
          position: sticky !important;
        }
        
        /* If there's a footer in the replicated content, it might overlap ours. 
           But actually we want their full page experience. */
      </style>
      <div id="replicated-container-${key}" class="replicated-page">
        ${data.html}
      </div>
    `,
    init() {
      window.scrollTo(0, 0);
      // Clean up our app's sidebar/main layout padding if necessary
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        (contentArea as HTMLElement).style.padding = '0';
        (contentArea as HTMLElement).style.maxWidth = 'none';
      }
      const appLayout = document.querySelector('.app-layout');
      if (appLayout) {
        // We might want to hide our sidebar for these "full page" replicas
        // or keep it. User said "footer pages", usually they are full pages.
        // Let's hide the sidebar for these pages.
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = 'none';

        const mainContent = document.querySelector('.main-content');
        if (mainContent) (mainContent as HTMLElement).style.marginLeft = '0';
      }
    }
  });
}

export const AboutPage = createReplicatedPage('info');
export const ApproachPage = createReplicatedPage('approach');
export const EfficacyPage = createReplicatedPage('efficacy');
export const CareersPage = createReplicatedPage('careers');
export const BlogPage = createReplicatedPage('blog');
export const StorePage = createReplicatedPage('store');
export const InvestorsPage = createReplicatedPage('investors');
export const TermsPage = createReplicatedPage('terms');
export const PrivacyPage = createReplicatedPage('privacy');
