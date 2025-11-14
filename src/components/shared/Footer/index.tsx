import './Footer.css';

const Footer = () => {
  const fallbackSecurityLinks = [
    { id: 0, name: 'Privacy policy', href: '#' },
    { id: 1, name: 'Terms and Conditions', href: '#' },
    { id: 2, name: 'Responsible Gaming', href: '#' },
    { id: 3, name: 'Betting Rules', href: '#' },
    { id: 4, name: 'Cookies Policy', href: '#' },
  ];

  const fallbackQuickLinks = [
    { id: 5, name: 'Customer Login', href: '#' },
    { id: 6, name: 'Customer Sign up', href: '#' },
    { id: 7, name: 'Sportsbook', href: '#' },
    { id: 8, name: 'FAQ', href: '#' },
    { id: 9, name: 'Help', href: '#' },
  ];

  const fallbackDescription = `The NFT sports exchange platform is a dynamic marketplace for trading digital sports collectibles,
    leveraging blockchain for secure, transparent transactions. It offers fans unique assets like player cards and game
    highlights, fostering deep engagement with favourite teams and esports players.
  
    The platform supports peer-to-peer trading and ensures asset authenticity, creating a vibrant community for
    sports enthusiasts. It's designed to be user-friendly, scalable, and environmentally conscious, positioning
    itself at the forefront of digital sports memorabilia.`;

  return (
    <footer className="footer-container flex flex-col gap-6 mt-2 md:mt-14 lg:mt-[52px] px-4 md:px-8 lg:px-5 pb-14 text-gray-400 text-xs leading-4s">
      <img
        className="block ml-0 mt-0 w-auto h-auto max-w-[88px]"
        src="/icons/logo.svg"
        alt="Ossino Logo"
      />
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-[172px] gap-3">
          <p className="white-p text-sm font-medium text-white leading-[18px]">
            Security & Privacy
          </p>
          <ul className="flex flex-col gap-2">
            {fallbackSecurityLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="text-left hover:text-white transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col w-[172px] gap-3">
          <p className="white-p text-sm font-medium text-white leading-[18px]">
            Quick links
          </p>
          <ul className="flex flex-col gap-2">
            {fallbackQuickLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="text-left hover:text-white transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex flex-col gap-3 md:mt-4">
          <p className="white-p text-sm font-medium text-white leading-[18px]">
            Contact Us
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="tel: +000987654321">000-987654321</a>
            </li>
            <li>
              <a href="mailto: support@ossino.com">support@ossino.com</a>
            </li>
          </ul>
          <div className="flex flex-row gap-2">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.svg" alt="Facebook Icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.svg" alt="Instagram Icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="pr-1">
        <p>{fallbackDescription}</p>
      </div>
    </footer>
  );
};

export default Footer;