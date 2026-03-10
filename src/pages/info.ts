import { AppLayout } from '../components';

export function createStaticPage(title: string, content: string) {
  return () => ({
    html: AppLayout('', `
      <div class="static-page animate-in" style="padding: 40px 20px; max-width: 800px; margin: 0 auto; background: white; border-radius: 16px; border: 2px solid #E5E5E5; margin-top: 20px; text-align: left;">
        <h1 style="font-size: 32px; font-weight: 800; color: #4B4B4B; margin-bottom: 20px; border-bottom: 2px solid #E5E5E5; padding-bottom: 10px;">${title}</h1>
        <div style="font-size: 16px; color: #4B4B4B; line-height: 1.6; font-weight: 600;">
          ${content}
        </div>
      </div>
    `),
    init() {
      window.scrollTo(0, 0);
    }
  });
}

export const AboutPage = createStaticPage('About Us', `
  <p style="margin-bottom: 16px;">Welcome to Duolingo Pakistan Edition! We are proudly operating from the heart of Lahore, Pakistan.</p>
  <p style="margin-bottom: 16px;">Our mission is to develop the best education in the world and make it universally available. With our dedicated engineering and design team in Islamabad and Karachi, we bring localized learning to the vibrant communities of Pakistan. We aim to break language barriers worldwide.</p>
`);

export const BlogPage = createStaticPage('Blog', `
  <p style="margin-bottom: 16px;">Read the latest updates from our tech teams across Lahore, Karachi, and Islamabad.</p>
  <div style="padding: 16px; border: 2px solid #E5E5E5; border-radius: 12px; margin-bottom: 16px;">
    <h3 style="color: #1CB0F6; font-weight: 800;">Learning Regional Languages with AI</h3>
    <p style="font-size: 14px; margin-top: 8px; font-weight: 500;">How our engineers in the Islamabad office are incorporating localized dialects into the AI learning model to bring you Sindhi, Pashto, Balochi, and more!</p>
  </div>
  <button class="btn btn-blue">LOAD MORE POSTS</button>
`);

export const StorePage = createStaticPage('Store', `
  <p style="margin-bottom: 16px;">Get official plushies, t-shirts, and mugs. Delivery available all across Pakistan via Leopards Courier and TCS.</p>
  <p style="margin-bottom: 16px;">Prices are listed in <strong>PKR (Pakistani Rupee)</strong>.</p>
  <div style="display:flex;gap:16px;">
    <div style="border:2px solid #E5E5E5;border-radius:12px;padding:16px;text-align:center;">
      <div style="font-size:40px;margin-bottom:8px;">🦉</div>
      <h4 style="font-weight:800;">Duo Plushie</h4>
      <p style="color:#58CC02;font-weight:800;margin-top:8px;">Rs. 4,500</p>
      <button class="btn btn-green btn-sm" style="margin-top: 12px;" onclick="duoAlert('Duo Plushie added to cart! 💜', '🛒', 'AWESOME!')">ADD TO CART</button>
    </div>
  </div>
`);

export const EfficacyPage = createStaticPage('Efficacy', `
  <p style="margin-bottom: 16px;">Our courses are designed to help you quickly pass standard exams. Many students from Pakistan take IELTS, PTE, and TOEFL every year to study abroad, and we are developing specialized courses to make this journey smoother!</p>
`);

export const CareersPage = createStaticPage('Careers', `
  <p style="margin-bottom: 16px;">Join our team in Pakistan! We are actively hiring for the following roles:</p>
  <ul style="list-style-type: none; padding-left: 0; margin-bottom: 24px;">
    <li style="margin-bottom: 12px; border: 2px solid #E5E5E5; border-radius: 12px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <strong style="color: #4B4B4B; font-size: 16px;">Senior Software Engineer</strong>
        <div style="font-size: 14px; color: #AFAFAF;">Islamabad (Hybrid)</div>
      </div>
      <button class="btn btn-blue btn-sm" onclick="duoAlert('Your application has started! We will contact you shortly.', '📧', 'GOT IT')">APPLY</button>
    </li>
    <li style="margin-bottom: 12px; border: 2px solid #E5E5E5; border-radius: 12px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <strong style="color: #4B4B4B; font-size: 16px;">Product Designer</strong>
        <div style="font-size: 14px; color: #AFAFAF;">Lahore (On-site)</div>
      </div>
      <button class="btn btn-blue btn-sm" onclick="duoAlert('Your application has started! We will contact you shortly.', '📧', 'GOT IT')">APPLY</button>
    </li>
    <li style="margin-bottom: 12px; border: 2px solid #E5E5E5; border-radius: 12px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <strong style="color: #4B4B4B; font-size: 16px;">Marketing Manager</strong>
        <div style="font-size: 14px; color: #AFAFAF;">Karachi (Remote)</div>
      </div>
      <button class="btn btn-blue btn-sm" onclick="duoAlert('Your application has started! We will contact you shortly.', '📧', 'GOT IT')">APPLY</button>
    </li>
  </ul>
`);

export const InvestorsPage = createStaticPage('Investors', `
  <p style="margin-bottom: 16px;">Duolingo PK is backed by leading venture capital firms across the MENAP region. For investor relations in Pakistan, please contact our Lahore headquarters.</p>
  <button class="btn btn-white" onclick="duoAlert('Q1 2026 financial reports are not yet available. Check back in April!', '📈', 'GOT IT')">VIEW Q1 2026 FINANCIALS</button>
`);

export const TermsPage = createStaticPage('Terms of Service', `
  <p style="margin-bottom: 16px;">By using our app, you agree to these Terms of Service. These terms are governed by the laws of the Islamic Republic of Pakistan.</p>
  <p style="margin-bottom: 16px;">Any disputes will be subjected to the jurisdiction of the courts located in Lahore, Punjab.</p>
`);

export const PrivacyPage = createStaticPage('Privacy Policy', `
  <p style="margin-bottom: 16px;">Your privacy is important to us. Information collected is stored securely and processed in compliance with the Personal Data Protection laws of Pakistan and international standards.</p>
  <p style="margin-bottom: 16px;">We do not share your data with unauthorized third parties. For any inquiries regarding data excision, reach out to our local compliance team.</p>
`);
