import { Footer as FlowbiteFooter } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function Footer() {
  return (
    <FlowbiteFooter container className="border-t border-[#3a3a3a] w-full">
      <div className="w-full p-4 py-6 lg:py-8 bg-[#1a1a1a]">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#e6b17e]">
                Food and Restaurant
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-[#e6b17e]">About</h2>
              <ul className="text-gray-300">
                <li className="mb-4">
                  <a
                    href="https://www.100jsprojects.com"
                    className="hover:text-[#e6b17e] transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Feedback
                  </a>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#e6b17e] transition-colors duration-300">
                    Food and Restaurant
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-[#e6b17e]">Legal</h2>
              <ul className="text-gray-300">
                <li className="mb-4">
                  <a href="#" className="hover:text-[#e6b17e] transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#e6b17e] transition-colors duration-300">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-[#e6b17e]">Follow Us</h2>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#e6b17e] transition-colors duration-300">
                    <BsFacebook className="w-5 h-5" />
                    <span className="sr-only">Facebook page</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#e6b17e] transition-colors duration-300">
                    <BsInstagram className="w-5 h-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#e6b17e] transition-colors duration-300">
                    <BsTwitter className="w-5 h-5" />
                    <span className="sr-only">Twitter page</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <span className="text-sm text-gray-300">
            © {new Date().getFullYear()} Food and Restaurant. All Rights Reserved.
          </span>
        </div>
      </div>
    </FlowbiteFooter>
  );
}
