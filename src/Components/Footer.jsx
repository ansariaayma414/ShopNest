import React from "react";
// import {Mail} from 'lucide-react'
import facebook from "../assets/facebook.png"
import instagram from "../assets/Instagram.png"
import twitter from "../assets/twitter.png"
import youtube from "../assets/youtube.png"
import mail from "../assets/mail.png"
import phone from "../assets/phone.png"

export const Footer = () => {
  return (
    <footer className="bg-[#1C211F] text-white w-full m-0">

      {/* Main Footer */}
      <div className="px-6 md:px-10 lg:px-16 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              🛍 ShopNest
            </h2>

            <p className="mt-3 text-sm text-gray-400 leading-6 max-w-xs">
              Shop More · Live Better
            </p>

            <p className="mt-4 text-sm text-gray-400 leading-6 max-w-xs">
              Discover fashion and lifestyle products curated
              for your everyday style.
            </p>
          </div>


          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold mb-5">
              Shop
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  New Arrivals
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Trending
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Best Sellers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Categories
                </a>
              </li>
            </ul>
          </div>


          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-semibold mb-5">
              Customer Care
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Shipping
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Returns
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>


          {/* Follow + Contact */}
          <div>

            <h3 className="text-sm font-semibold mb-5">
              Follow Us
            </h3>

            <div className="flex items-center gap-4 text-gray-400">

              <a
                href="#"
                className="hover:text-white transition"
              >
                <img src={instagram} width="30"/>
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                <img src = {facebook} width="30"/>
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
               <img src = {twitter} width="30"/>
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
               <img src = {youtube} width="30"/>
              </a>

            </div>


            <div className="mt-6 space-y-3 text-sm text-gray-400">

              <div className="flex items-center gap-2">
                <img src = {mail} width="30"/>
                <span>support@shopnest.com</span>
              </div>

              <div className="flex items-center gap-2">
                <img src = {phone} width="30"/>
                <span>+91 98765 43210</span>
              </div>

            </div>

          </div>

        </div>
      </div>


      {/* Bottom Footer */}
      <div className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-5">

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">

          <p>
            © 2026 ShopNest. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;