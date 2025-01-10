import React from 'react';
import x from '@/layout/homePage/feedBack.module.css';

export default function FeedBack() {
  const feedbacks = [
    {
      name: 'Elon Musk',
      feedback: 'Migii Topik is an extremely useful TOPIK exam preparation application for students studying abroad like me. The application has an intuitive interface, easy to use, and provides all the necessary features needed for exam preparation',
      avatar: 'https://dddn.1cdn.vn/2022/11/16/diendandoanhnghiep.vn-media-uploaded-493-2022-11-15-_screenshot-2022-11-15-203313-enternews-1668519246.jpg'
    },
    {
      name: 'Mark Zuckerberg',
      feedback: 'Migii Topik is the most satisfactory exam preparation app Ive ever had. The app is easy to use, and provides all the necessary features for exam preparation',
      avatar: 'https://kinhtechungkhoan.vn/stores/news_dataimages/2025/012025/09/16/mark-zuckerberg20250109160807.jpg?rt=20250109160818'
    },
    {
      name: 'Jeff Bezos',
      feedback: 'Migii Topik is a useful TOPIK preparation app, which helps me improve my Korean language and boosts my confidence in communicating with tourists',
      avatar: 'https://hcmussh.edu.vn/img/news/68273404.jpg?t=68273405'
    }
  ];

  return (
    <div className={x['feedback-container']}>
      <h3 className={x['feedback-title']}>What our students say about Migii</h3>
      <div className={x['feedback-list']}>
        {feedbacks.map((item, index) => (
          <div key={index} className={x['feedback-item']}>
            <img src={item.avatar} alt={item.name} className={x['feedback-avatar']} />
            <div className={x['feedback-content']}>
              <h4 className={x['feedback-name']}>{item.name}</h4>
              <p className={x['feedback-text']}>{item.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}