import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <>
    <div className='digit-screen submit'>
      <button className="ancor"><Link to="/">Доска сообщений</Link></button>
      <button className="ancor"><Link to="/digits">Средние числа</Link></button>
    </div>
    <h1 className='ml40'>Страница не найдена!</h1>
  </>
);