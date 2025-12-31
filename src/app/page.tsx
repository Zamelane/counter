'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [money, setMoney] = useState({
    total: 1_400_000,
    current: 190_000
  })

  const percentCompleted = Math.round((money.current / money.total) * 100);
  const percentRemaining = 100 - percentCompleted;

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-black">
      <main className="flex min-h-screen w-full max-w-96 flex-col items-center justify-center py-32 mx-2 bg-black">
        <Image src="/home_2.png" alt="" width="64" height="64" className="-mb-1" />
        <div className="bg-[#121212] p-3 flex flex-col items-center rounded-2xl w-full">
          <p className="text-[#6F6F6F] text-sm">Накоплено всего</p>
          <p className="text-3xl">{new Intl.NumberFormat('ru-RU').format(money.current)} ₽</p>
          <p className="text-[#6F6F6F] text-lg">{new Intl.NumberFormat('ru-RU').format(money.total - money.current)} ₽ осталось накопить</p>

          <div className="min-w-full flex flex-col gap-3.5 mt-5">
            <div className="w-full h-32 bg-[#3557F0] rounded-xl overflow-clip relative">
              <div className="bg-[#449FF7] h-full w-1/2" style={{
                width: `${percentCompleted}%`
              }}/>
            </div>

            <div className="flex">
              <div className="flex flex-col pr-8 border-r border-r-[#222222]">
                <p>Всего накоплено</p>
                <div className="flex items-center gap-1">
                  <div className="bg-[#449FF7] size-3.5 rounded-sm"/> <p>{percentCompleted}%</p>
                </div>
              </div>
              <div className="flex flex-col pl-3">
                <p>Осталось накопить</p>
                <div className="flex items-center gap-1">
                  <div className="bg-[#3557F0] size-3.5 rounded-sm"/> <p>{percentRemaining}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#121212] p-3 flex items-center rounded-2xl w-full mt-5">
          <p>Пока что накопил на это :)</p>
          <Image src="/home_3.png" alt="" width="64" height="64" className="ml-auto" />
        </div>
      </main>
    </div>
  );
}
