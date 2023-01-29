import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './digits.css';
import { digitController } from '../../controllers/digitController';
import { Digit } from '../../interfaces/digitInterfaces';

export const Digits = () => {
  const [digitsList, setdigitsList] = useState([] as Digit[]);
  const [digit, setDigit] = useState('');
  const [negative, setNegative] = useState(false);
  const [fraction, setFraction] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    (async () => {
      setdigitsList(await digitController.getAllDigits());
    })();
  }, []);

  const handleDigit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDigit(value);
    if (value) {
      const isNumberReg = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
      const valid = isNumberReg.test(value) 
      setIsValid(valid);
      setNegative(valid && /-/.test(value));
      setFraction(valid && /\./.test(value));
    }
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    setdigitsList(await digitController.createNewDigitString(+digit));
    setDigit('');
    setNegative(false);
    setFraction(false);
  };

  return (
    <section className="digit-screen">
      <button className="ancor"><Link to="/">Доска сообщений</Link></button>
      <form className="submit" onSubmit={handleSubmit}>
        <label htmlFor="number" className="enter">Введите число:</label>
        <input name="number" id="number" value={digit} onChange={handleDigit} className={isValid ? '' : 'err-color'} />
        <div className="checkbox">
          <label htmlFor="negative">
            <input type="checkbox" name="negative" id="negative" disabled checked={negative}/>
            <span>Отрицательное</span>
          </label>
          <label htmlFor="fraction">
            <input type="checkbox" name="fraction" id="fraction" disabled checked={fraction} />
            <span>Дробное</span>
          </label>
        </div>
        <button>Отправить и получить среднее</button>
      </form>
      {!!digitsList.length && 
      <>
        <div className="title">
          <p className="text">Предыдущее число</p>
          <p className="text">Введенное число</p>
          <p className="text">Среднее арифметическое</p>
        </div>
        <div className="results">
          {
            digitsList.map((digitItem, index) => (
              <div className="result" key={index}>
                <div className="digit">{digitItem.prev || '-'}</div>
                <div className="digit">{digitItem.cur}</div>
                <div className="digit">{digitItem.middle}</div>
              </div>
            ))
          }
        </div>
      </>}
    </section>

  );
}