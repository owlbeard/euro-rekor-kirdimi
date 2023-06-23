import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import axios from 'axios';
import Kirdi from './assets/kirdi.jpeg';
import Kirmadi from './assets/kirmadi.jpeg';
import { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';

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
    console.log(formatYesterday);
    const getRates = async () => {
      try {
        const data = await axios.get(
          'https://openexchangerates.org/api/latest.json?app_id=4c0dcadfda5d4675b8eb28379744a08e&base=USD&symbols=TRY,EUR&prettyprint=false&show_alternative=false'
        );
        const yesterdayData = await axios.get(
          `https://openexchangerates.org/api/historical/${formatYesterday}.json?app_id=4c0dcadfda5d4675b8eb28379744a08e&base=USD&symbols=TRY,EUR&show_alternative=false&prettyprint=false`
        );
        const rates = Number(
          (
            ((100 + (100 - data.data.rates.EUR * 100)) * data.data.rates.TRY) /
            100
          ).toFixed(2)
        );
        const yesterdayRates = Number(
          (
            ((100 + (100 - yesterdayData.data.rates.EUR * 100)) *
              yesterdayData.data.rates.TRY) /
            100
          ).toFixed(2)
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
    <div className="h-screen flex flex-col justify-center items-center gap-12">
      <h1 className="text-6xl">Euro Bugün Rekor Kırdı Mı?</h1>
      {euroYesterday < euroToday ? (
        <>
          <h2 className="text-4xl">Kırdı 😱😱😱 Euro bey ne yapıyorsunuz..!</h2>
          <m.img
            animate={{ x: 0, rotate: '360deg' }}
            initial={{ x: '300%', rotate: '0deg' }}
            transition={{ duration: 2 }}
            className="h-96"
            src={Kirdi}
            alt="Kırdı :(("
          />
          <p className="text-md">Dün: 1€ = {euroYesterday}₺</p>
          <p className="text-2xl">Bugün: 1€ = {euroToday}₺ </p>
        </>
      ) : (
        <>
          <h2 className="text-4xl">Kırmadı 🥲</h2>
          <m.img
            animate={{ x: 0, rotate: '360deg' }}
            initial={{ x: '300%', rotate: '0deg' }}
            transition={{ duration: 2 }}
            src={Kirmadi}
            alt="Kırmadı :))"
          />
          <p className="text-md">Dün: 1€ = {euroYesterday}₺</p>
          <p className="text-2xl">Bugün: 1€ = {euroToday}₺ </p>
        </>
      )}
    </div>
  );
}

export default App;
