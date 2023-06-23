import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import axios from 'axios';
import Kirdi from './assets/kirdi.jpeg';
import Kirmadi from './assets/kirmadi.jpeg';
import { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';

const SUPER_DUPER_SECRET_API_KEY = import.meta.env.VITE_CURRENCY_KEY;

function App() {
  const [euroToday, setEuroToday] = useState(0);
  const [euroYesterday, setEuroYesterday] = useState(0);
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const yesterday = subDays(new Date(year, month, day), 1);
    const formatYesterday = format(yesterday, 'yyyy-MM-dd');

    const getRates = async () => {
      try {
        const data = await axios.get(
          `https://api.currencybeacon.com/v1/latest?api_key=${SUPER_DUPER_SECRET_API_KEY}&base=EUR&symbols=TRY`
        );
        const yesterdayData = await axios.get(
          `https://api.currencybeacon.com/v1/historical?api_key=${SUPER_DUPER_SECRET_API_KEY}&base=EUR&symbols=TRY&date=${formatYesterday}`
        );
        const rates = Number(data.data.response.rates.TRY.toFixed(2));
        const yesterdayRates = Number(
          yesterdayData.data.response.rates.TRY.toFixed(2)
        );
        setEuroToday(rates);
        setEuroYesterday(yesterdayRates);
      } catch (err) {
        alert(err);
      }
    };
    getRates();
  }, []);
  return (
    <div className="container mx-auto h-dvh flex flex-col justify-center items-center ">
      <h1 className="text-4xl sm:text-6xl text-center">
        Euro Bugün Rekor Kırdı Mı?
      </h1>
      <div className="flex-grow flex flex-col justify-center items-center sm:gap-12 gap-4">
        {euroYesterday < euroToday ? (
          <>
            <h2 className="text-2xl sm:text-4xl text-center">
              Kırdı 😱😱😱 Euro bey ne yapıyorsunuz..!
            </h2>
            <div className="overflow-hidden">
              <m.img
                className="sm:h-96 h-52"
                animate={{ x: 0, rotate: '360deg' }}
                initial={{ x: '300%', rotate: '0deg' }}
                transition={{ duration: 2 }}
                src={Kirdi}
                alt="Kırdı :(("
              />
            </div>
            <p className="text-md">Dün: 1€ = {euroYesterday}₺</p>
            <p className="text-2xl">Bugün: 1€ = {euroToday}₺ </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl sm:text-4xl">Kırmadı 🥲</h2>
            <div className="overflow-hidden">
              <m.img
                animate={{ x: 0, rotate: '360deg' }}
                initial={{ x: '300%', rotate: '0deg' }}
                transition={{ duration: 2 }}
                src={Kirmadi}
                alt="Kırmadı :))"
              />
            </div>
            <p className="text-md">Dün: 1€ = {euroYesterday}₺</p>
            <p className="text-2xl">Bugün: 1€ = {euroToday}₺ </p>
          </>
        )}
      </div>
      <p>Copyright © 2023 || Ömer F. Altun</p>
    </div>
  );
}

export default App;
