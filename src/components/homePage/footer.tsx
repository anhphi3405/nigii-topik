'use client'
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import x from '@/layout/homePage/footer.module.css'
import Link from 'next/link';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className={x.footer}>
      <Container>
        <Row>
          <Col md="4" className={x.footer__section}>
            <h5>About Migii</h5>
            <p>
            Migii TOPIK - A specialized TOPIK test prep app, helping you study easily and effectively with a massive library of resources and personalized learning paths tailored to each learners level.
            </p>
          </Col>
          <Col md="4" className={x.footer__section}>
            <h5>Everyone care</h5>
            <ul>
              <li><Link href="/">About Migii</Link></li>
              <li><Link href="/">Term & Conditions</Link></li>
            </ul>
          </Col>
          <Col md="4" className={x.footer__section}>
          
            <h5>Contact Us</h5>
            <p>Email: ikarus.pham@gmail.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Main Street, Anytown, USA</p>
            <div className={x.footer__social}>
                <FontAwesomeIcon 
                className={x['footer__social__icon']}
                icon={faFacebook} 
                onClick={() => window.open('https://www.facebook.com/')}
                />
                <FontAwesomeIcon 
                className={x['footer__social__icon']}
                icon={faInstagram}
                onClick={() => window.open('https://www.instagram.com/')}
                 />
                <FontAwesomeIcon 
                className={x['footer__social__icon']}
                icon={faTwitter}
                onClick={() => window.open('https://twitter.com/')}
                />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className={x.footer__copyright}>
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}