import x from '@/layout/homePage/homePage.module.css'
import Image from 'next/image'


export default function Home() {
  const topikList = ['Topik 1', 'Topik 2', 'Topik 3', 'Topik 4', 'Topik 5', 'Topik 6'];
  const features =[
    {
      title :   'Personalized Learning',
      img: 'https://topik.migii.net/images/migii/feature_topik_en/1.webp'
    },
    {
      title :   'Personalized Learning',
      img: 'https://topik.migii.net/images/migii/feature_topik_en/1.webp'
    },
    {
      title :   'Personalized Learning',
      img: 'https://topik.migii.net/images/migii/feature_topik_en/1.webp'
    }

  ]

  return (
    <div className={x['homePage']}> 
        <div className={x['banner']}>
          
        </div>
        <h1 className={x['learningPathH1']}>Migii: Your 3-month fast track to language mastery!</h1>
        <div className={x['topikList']}>
            {topikList.map((topik, index) => (
              <div key={index} className={x['topikItem']}>
                <h1 className={x['topikItem__title']}>{topik}</h1>
              </div> 
            ))}
        </div>
        <h1 className={x['learningPathH1']}>KEY FEATURES</h1>
        <div className={x['features__list']}>
            {features.map((features, index) => (
              <div key={index} className={x['features__item']}>
                <Image 
                src={features.img} alt="features" className={x['features__item__img']}
                width={200}
                height={470}
                />
                <h1 className={x['features__item__title']}>{features.title}</h1>
              </div> 
            ))}
        </div>
    </div >
  );
}
