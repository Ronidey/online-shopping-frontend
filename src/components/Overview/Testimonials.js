import React, { useState, useEffect, useRef } from 'react';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import './Testimonials.css';

const Slide = ({ user, current }) => (
  <div>
    <div className='testimonial-card'>
      <p className={`comment ${current ? 'animate' : ''}`}>
        <ImQuotesLeft /> <span>{user.comment}&nbsp;</span> <ImQuotesRight />
      </p>
      <div className='user'>
        <img src={`/images/users/${user.img}`} alt='' />
        <p className='name'>{user.name}</p>
      </div>
    </div>
  </div>
);

function Testimonials() {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  const userReviews = [
    {
      name: 'Max',
      img: 'img-1.jpg',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam quibusdam, hic ea assumenda quos sequi sit beatae, quae dolorem autem facilis, dicta mollitia a excepturi'
    },
    {
      name: 'Natasha',
      img: 'img-2.jpg',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam quibusdam, hic ea assumenda quos sequi sit beatae, quae dolorem autem facilis, dicta mollitia a excepturi'
    },
    {
      name: 'Julia',
      img: 'img-3.jpg',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam quibusdam, hic ea assumenda quos sequi sit beatae, quae dolorem autem facilis, dicta mollitia a excepturi'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((idx) => {
        if (sliderRef.current.children.length - 1 > idx) {
          return idx + 1;
        }
        return 0;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    sliderRef.current.style.transform = `translateX(${100 * -slideIndex}%)`;
  }, [slideIndex]);

  return (
    <section className='Testimonials' id='testimonials'>
      <h2 className='Testimonials__heading'>What our customers have to say</h2>

      <div ref={sliderRef} className='Testimonials__slider'>
        {userReviews.map((user, idx) => (
          <Slide key={user.name} user={user} current={idx === slideIndex} />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
