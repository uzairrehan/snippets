Here are 4 different responsive footer layouts built with Tailwind CSS and Next.js. Each layout is unique, modern, and suitable for various use cases. I'll include code for all four in one Next.js component for convenience.

### Code for Footer Layouts

```tsx
import React from "react";

const FooterLayouts = () => {
  return (
    <div className="space-y-20">
      {/* Footer Layout 1: Simple Links and Copyright */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-bold">BrandName</h2>
          </div>
          <nav className="flex space-x-6">
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#" className="hover:text-gray-400">About</a>
            <a href="#" className="hover:text-gray-400">Services</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </nav>
          <p className="text-sm text-gray-500">© 2025 BrandName. All rights reserved.</p>
        </div>
      </footer>

      {/* Footer Layout 2: Newsletter with Links */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold">Subscribe to our Newsletter</h3>
            <p className="text-sm mt-2">Stay updated with the latest news and offers.</p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-lg w-full md:w-auto focus:outline-none"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Support</a>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm mt-2">123 Main Street, Karachi, Pakistan</p>
            <p className="text-sm">Email: support@example.com</p>
            <p className="text-sm">Phone: +92-300-1234567</p>
          </div>
        </div>
      </footer>

      {/* Footer Layout 3: Three Column Grid */}
      <footer className="bg-gray-700 text-gray-100 py-12">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-lg">About Us</h4>
            <p className="text-sm mt-2 text-gray-300">
              We provide top-notch services to help your business grow.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Important Links</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Partnerships</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Follow Us</h4>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-500"><i className="fab fa-facebook"></i> Facebook</a>
              <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i> Twitter</a>
              <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram"></i> Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Layout 4: Centered with Socials */}
      <footer className="bg-gray-900 text-gray-100 py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold">BrandName</h2>
          <p className="text-sm mt-2">Empowering your future.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-blue-500">Facebook</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-pink-500">Instagram</a>
          </div>
          <p className="text-sm text-gray-500 mt-6">© 2025 BrandName. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FooterLayouts;
```

### Explanation
1. **Layout 1**: Minimalistic footer with links and copyright info.
2. **Layout 2**: Newsletter subscription with quick links and contact info.
3. **Layout 3**: Three-column grid for company, links, and social media.
4. **Layout 4**: Centered footer with social icons and branding.

Each layout uses Tailwind's responsive utilities to adapt for different screen sizes. You can customize these styles further according to your needs!







































Here are **4 additional responsive footer layouts** built using Tailwind CSS and Next.js. Each layout is distinct and tailored for different design needs.

### Code for Additional Footer Layouts

```tsx
import React from "react";

const MoreFooterLayouts = () => {
  return (
    <div className="space-y-20">
      {/* Footer Layout 5: Split Footer with Logo, Links, and Socials */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div>
            <h2 className="text-2xl font-bold text-white">BrandLogo</h2>
            <p className="mt-2 text-sm">
              Delivering excellence since 2025. Your trusted partner for growth.
            </p>
          </div>
          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Our Services</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-500"><i className="fab fa-facebook"></i> Facebook</a>
              <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i> Twitter</a>
              <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram"></i> Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Layout 6: Full-Width Links with Subsections */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section 1 */}
          <div>
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
            </ul>
          </div>
          {/* Section 2 */}
          <div>
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">API Reference</a></li>
            </ul>
          </div>
          {/* Section 3 */}
          <div>
            <h3 className="text-lg font-bold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
          {/* Section 4 */}
          <div>
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">support@example.com</a></li>
              <li><a href="#" className="hover:text-white">+1 234 567 890</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Footer Layout 7: Large Centered CTA */}
      <footer className="bg-gray-700 text-gray-100 py-12">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <p className="text-gray-300">Subscribe to our newsletter to get the latest updates and offers.</p>
          <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg focus:outline-none w-full md:w-auto"
            />
            <button className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </footer>

      {/* Footer Layout 8: Minimal Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2025 BrandName. All rights reserved.</p>
          <nav className="flex space-x-4">
            <a href="#" className="hover:text-gray-100">Privacy Policy</a>
            <a href="#" className="hover:text-gray-100">Terms</a>
            <a href="#" className="hover:text-gray-100">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default MoreFooterLayouts;
```

---

### Explanation of Layouts

1. **Layout 5**:  
   - Split into three sections: brand logo with description, quick links, and social media links.
   - Perfect for professional businesses.

2. **Layout 6**:  
   - Four-column grid with distinct sections for company info, resources, legal, and contact.
   - Ideal for large-scale websites or SaaS platforms.

3. **Layout 7**:  
   - Large centered call-to-action (CTA) for newsletter subscriptions.
   - Suitable for blogs, e-commerce, or community platforms.

4. **Layout 8**:  
   - Minimalist design with links and copyright info.
   - Great for lightweight personal or portfolio sites.

### Customization
Each footer can be styled further by changing colors, fonts, spacing, or adding icons (e.g., Font Awesome or Lucide React). These layouts are responsive and adapt well to different screen sizes.