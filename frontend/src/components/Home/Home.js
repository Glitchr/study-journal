import React from 'react';
import { Carousel, Image } from 'react-bootstrap';

import './Home.css';

const slogans = [
  {
    main: 'Organiza tus estudios y triunfa con Study Journal',
    sub: 'Study Journal te ayuda a planificar tus cursos, asignaturas y tareas de forma fácil y divertida.'
  },
  {
    main: 'Crea tus propios cursos, asignaturas y tareas a tu tiempo',
    sub: 'Study Journal se adapta a tu nivel y te ofrece feedback y consejos para mejorar.'
  },
  {
    main: 'Aprende a tu ritmo con Study Journal',
    sub: 'Study Journal: tu compañero de estudios ideal'
  },
  {
    main: 'Study Journal te acompaña en tu camino hacia el éxito académico y personal',
    sub: 'Motivandote a alcanzar tus metas y a disfrutar del proceso de aprendizaje'
  }
];

function Home() {
  return (
    <div>
      <Carousel className="w-100">
        {slogans.map((slogan, index) => (
          <Carousel.Item
            key={index}
            className="bg-primary-100"
            style={{ backgroundImage: 'url(https://source.unsplash.com/random)' }}
          >
            <div className="carousel-caption">
              <h1 className='home-text text-center'>{slogan.main}</h1>
              <h4 className="text-center mb-5">{slogan.sub}</h4>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className='d-flex justify-content-center mt-5'>
        <Image
            alt="Logo"
            src={process.env.PUBLIC_URL + '/logo.svg'}
            width="150"
            height="150"
            className="d-inline-block align-top"
          />
      </div>
    </div>
  );
}

export default Home;
