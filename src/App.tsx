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
          'http://data.fixer.io/api/latest?access_key=77808a15fa9c62e7428c3c4157a03e1b&base=EUR&symbols=TRY'
        );
        const yesterdayData = await axios.get(
          `http://data.fixer.io/api/${formatYesterday}?access_key=77808a15fa9c62e7428c3c4157a03e1b&base=EUR&symbols=TRY`
        );
        setEuroToday(data.data.rates.TRY);
        setEuroYesterday(yesterdayData.data.rates.TRY);
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
