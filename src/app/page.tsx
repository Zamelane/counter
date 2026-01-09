"use client";

import Image from "next/image";
import { useState } from "react";

type HistoryShow = {
  show: boolean;
};

export default function Home() {
  const [money, setMoney] = useState({
    total: 1_400_000,
    current: 190_000,
    monthMoneyAdd: 40_000,
  });

  const [deposit, setDeposit] = useState({
    money: 190_000,
    percent: 16.5,
  });

  const [showes, setShowes] = useState<HistoryShow[]>([]);

  const percentCompleted = Math.round((money.current / money.total) * 100);
  const percentRemaining = 100 - percentCompleted;

  const calc = calculateDays(
    money.total,
    money.current,
    deposit.money,
    deposit.percent,
    money.monthMoneyAdd
  );

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-black">
      <main className="flex min-h-screen w-full max-w-96 flex-col my-5 items-center justify-center mx-2 bg-black">
        <Image
          src="/home_2.png"
          alt=""
          width="64"
          height="64"
          className="-mb-1"
        />
        <div className="bg-[#121212] p-3 flex flex-col items-center rounded-2xl w-full">
          <p className="text-[#6F6F6F] text-sm">Накоплено всего</p>
          <p className="text-3xl">{moneyFormat(money.current)} ₽</p>
          <p className="text-[#6F6F6F] text-lg">
            {moneyFormat(money.total - money.current)} осталось накопить
          </p>

          <div className="min-w-full flex flex-col gap-3.5 mt-5">
            <div className="w-full h-32 bg-[#3557F0] rounded-xl overflow-clip relative">
              <div
                className="bg-[#449FF7] h-full w-1/2"
                style={{
                  width: `${percentCompleted}%`,
                }}
              />
            </div>

            <div className="flex">
              <div className="flex flex-col pr-8 border-r border-r-[#222222]">
                <p>Всего накоплено</p>
                <div className="flex items-center gap-1">
                  <div className="bg-[#449FF7] size-3.5 rounded-sm" />{" "}
                  <p>{percentCompleted}%</p>
                </div>
              </div>
              <div className="flex flex-col pl-3">
                <p>Осталось накопить</p>
                <div className="flex items-center gap-1">
                  <div className="bg-[#3557F0] size-3.5 rounded-sm" />{" "}
                  <p>{percentRemaining}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#121212] p-3 flex items-center rounded-2xl w-full mt-5">
          <p>Пока что накопил на это :)</p>
          <Image
            src="/home_3.png"
            alt=""
            width="64"
            height="64"
            className="ml-auto"
          />
        </div>

        <div className="bg-[#121212] p-3 flex flex-col rounded-2xl w-full mt-5">
          <p>
            <b>На вкладе:</b> {moneyFormat(deposit.money)}
          </p>
          <p>
            <b>Под процентом:</b> {moneyFormat(deposit.percent, "%")}
          </p>

          <p className="self-center">
            Накоплю через {calc.monthesTotal} месяцев
          </p>
        </div>

        <p className="pt-5">Рост по месяцам:</p>
        <p className="pt-0 text-sm text-[#6F6F6F]">
          <i>*без учёта иного дохода</i>
        </p>
        {calc.monthes.map((month, i) => {
          let currShow = showes[i];
          if (currShow == undefined) {
            currShow = {
              show: false,
            };
            setShowes((s) => {
              return [...s, currShow];
            });
          }

          return currShow.show ? (
            <div
              key={i}
              className={`bg-[#121212] p-3 ${
                month.current ? "mt-3" : "mt-4"
              } flex flex-col rounded-2xl w-full select-none cursor-pointer`}
              onClick={() =>
                setShowes((s) => {
                  const newS = [...s];
                  newS[i].show = false;
                  return newS;
                })
              }
            >
              <p>
                <i>{monthName(i)}</i>
              </p>
              <p>
                Будет накоплено: {moneyFormat(month.total)} (+
                {moneyFormat(
                  month.depositPercentMoney + (i > 0 ? money.monthMoneyAdd : 0)
                )}
                )
              </p>
              <p>
                Из них вклад: {moneyFormat(month.deposit)} (+
                {moneyFormat(month.depositPercentMoney)})
              </p>
              <p>
                Из них месячное пополнение:{" "}
                {moneyFormat(i > 0 ? money.monthMoneyAdd : 0)}
              </p>
            </div>
          ) : (
            <div
              key={i}
              className={`bg-[#121212] p-3 ${
                month.current ? "mt-3" : "mt-4"
              } flex justify-between rounded-2xl w-full select-none cursor-pointer`}
              onClick={() =>
                setShowes((s) => {
                  const newS = [...s];
                  newS[i].show = true;
                  return newS;
                })
              }
            >
              <p>
                <i>{monthName(i)}</i>
              </p>
              <p>
                {moneyFormat(month.total)} (+
                {moneyFormat(
                  month.depositPercentMoney + (i > 0 ? money.monthMoneyAdd : 0)
                )}
                )
              </p>
            </div>
          );
        })}
      </main>
    </div>
  );
}

function monthName(monthNumber: number) {
  if (monthNumber == 0) {
    return "Текущий месяц";
  } else if (monthNumber == 1) {
    return "Следующий месяц";
  } /* else if (monthNumber == 2) {
    return 'Через 1 месяц';
  } */

  return `${monthNumber} месяц`;
}

function moneyFormat(money: number, suffix = " ₽") {
  return new Intl.NumberFormat("ru-RU").format(money) + suffix;
}

function calculateDays(
  total: number,
  current: number,
  deposit: number,
  depositPercent: number,
  monthMoneyAdd: number
) {
  const totalLeft = total - current;
  const noDepositMoney = current - deposit;
  let depositPercentMoney = 0;

  let monthesTotal = 0;
  let monthes = [];

  while (total > current + depositPercentMoney) {
    monthesTotal++;

    if (monthesTotal == 1) {
      monthes.push({
        current: monthesTotal == 1,
        total: current,
        deposit: deposit,
        depositPercentMoney: 0,
      });
    }

    deposit += monthesTotal > 1 ? monthMoneyAdd : 0;
    depositPercentMoney = deposit + depositPercentMoney;

    depositPercentMoney = ((depositPercentMoney / 100) * depositPercent) / 12;
    current += monthMoneyAdd;

    monthes.push({
      current: monthesTotal == 1,
      total: current + depositPercentMoney,
      deposit: deposit + depositPercentMoney,
      depositPercentMoney,
    });
  }
  return {
    monthesTotal,
    monthes,
  };
}
