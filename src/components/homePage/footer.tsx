import React from 'react';
import x from '@/layouts/homePage/footer.module.css';

export default function Footer() {
  return (
    <footer className={x['footer']}>
      <div className={x['footer-content']}>
        <p>&copy; {new Date().getFullYear()} Migii TOPIK. All rights reserved.</p>
        <nav className={x['footer-nav']}>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
}