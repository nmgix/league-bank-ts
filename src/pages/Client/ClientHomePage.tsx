import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Notifications } from "../../components/ClientHomePage/Notifications";
import { Loader } from "../../components/essentials/Loader";
import { Dropdown } from "../../components/Home/Calculator/Dropdown";
import { dependeciesObj, TimeArrange } from "../../functions/TimeArrange";
import { useAction } from "../../redux/hooks/useAction";
import { useTypedSelector } from "../../redux/hooks/useTypedSelector";
import { IAccounts } from "../../redux/types/UserType";
import { Doughnut } from "react-chartjs-2";

// @ https://stackoverflow.com/questions/71429342/react-chart-js-2-in-combination-with-typescript-for-linecharts-uncaught-error

import "chart.js/auto";

export const ClientHomePage: React.FC = () => {
  const user = useTypedSelector((state) => state.auth);
  const userInfo = useTypedSelector((state) => state.userInfo);
  const { getUserInfo } = useAction();

  const [balance, setBalance] = useState<keyof IAccounts | null>(/*Object.keys(userInfo.state!.accounts)[0]*/ null);
  const [phrase, setPhrase] = useState<(string | undefined)[] | null>(null);

  useEffect(() => {
    if (user.state !== null && user.state.id !== null) {
      getUserInfo(user.state.id);
    }

    setInterval(() => {
      const dateMin = new Date().getMinutes();

      return setTimeout(() => setPhrase(TimeArrange(timeDep)), (60 - dateMin) * 60000);
    }, 3600000);
    console.log(TimeArrange(timeDep));
    setPhrase(TimeArrange(timeDep));
  }, []);

  const timeDep: dependeciesObj = {
    "Доброе утро": {
      min: 4,
      max: 12,
    },
    "Добрый день": {
      min: 12,
      max: 18,
    },
    "Добрый вечер": {
      min: 18,
      max: 24,
    },
    "Доброй ночи": {
      min: 0,
      max: 4,
    },
    // " и привет": {
    //   min: 0,
    //   max: 4,
    // },
  };

  // const data = {
  //   labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: [10, 20, 50, 30, 40],
  //       backgroundColor: ["#f1c40f", "#e67e22", "#16a085", "#2980b9"],
  //     },
  //   ],
  // };

  // const config = {
  //   type: "doughnut",
  //   data: data,
  //   options: {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         position: "top",
  //       },
  //       title: {
  //         display: true,
  //         text: "Chart.js Doughnut Chart",
  //       },
  //     },
  //   },
  // };

  return (
    <div className='main-content background-limit client-homepage'>
      <div className='main-header'>
        <h1>
          {phrase}, {user.state.names.first}
        </h1>

        {userInfo.state ? (
          <>{userInfo.state.notifications && <Notifications notifications={userInfo.state.notifications} />}</>
        ) : (
          <Loader text='Информация загружается, пожалуйста, подождите' />
        )}
      </div>
      <div className='main-news'>
        <div className='ads'>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='pattern'>
          <h3>Шаблоны</h3>
          <div className='pattern-wrapper'>
            <button className='pattern-default'>Перевод Константину К.</button>
            <button className='pattern-default'>Опалата “коммуналки”</button>
            <button className='pattern-default'>Оплата колледжа</button>
            <button className='pattern-default'>Перевод с “обычная” на “на будущее”</button>
            <button className='other-patterns'>Другие шаблоны...</button>
          </div>
        </div>
        <div style={{ width: "13%", height: "100%" }}>&nbsp;</div>
      </div>
      <div className='main-balance'>
        <div className='balance-header'>
          <div className='current-balance'>
            <h2>Текущий счёт</h2>
            <Dropdown
              ChangeChoice={() => setBalance(balance)}
              defaultValue={"Выберите баланс"}
              cases={
                userInfo.state?.accounts
                  ? // @ https://stackoverflow.com/questions/19874555/how-do-i-convert-array-of-objects-into-one-object-in-javascript
                    Object.assign(
                      {},
                      ...Object.keys(userInfo.state.accounts).map((account) => {
                        return { [account]: userInfo.state!.accounts[account].name };
                      })
                    )
                  : {}
              }
            />
          </div>
          <div className='actions'>
            <h2>Доступные дейстивия</h2>
            <div className='actions-wrapper'>
              <div className='action-default'>Перевод</div>
              <div className='action-default'>Зачисление</div>
              <div className='action-default'>Выписка</div>
              <div className='other-actions'>Другое ...</div>
            </div>
          </div>
        </div>
        <div className='balance-info-wrapper'>
          <div className='balance-info'>
            <div className='chart'>
              <Doughnut
                data={{
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: ["#2c36f2", "#1f1e25", "rgb(212, 1, 1)"],
                      borderColor: "#FFF",
                      data: [10, 5, 2, 20, 30, 45],
                    },
                  ],
                }}
                options={{ cutout: 120 }}
              />
              <div>
                {/* див будет ставиться в середину доната чтобы текст можно было копировать */}
                <h2>100000 USD</h2>
                <span>10 395 000 RUB</span>
              </div>
            </div>
            <div className='chart-details'>
              <div className='income active' style={{ flex: "1 1 auto" }}>
                <h3>
                  Доходы <span className='positive'>(+20%)</span>
                </h3>
                <div className='details-wrapper'>
                  <span className='detail'>
                    <div className='color-marker'></div>30% - Повышение ставки
                  </span>
                  <span className='detail'>
                    <div className='color-marker'></div>
                    30% - <button className='history-reference'>Начисление наличных</button>
                  </span>
                  <span className='detail'>
                    <div className='color-marker'></div>
                    30% - <button className='history-reference'>Переводы с других счетов</button>
                  </span>
                  <span className='detail'>
                    <div className='color-marker'></div>
                    10% - <button className='history-reference'>Остальное</button>
                  </span>
                </div>
              </div>
              <div className='outcome negative' style={{ flex: "0 1 auto" }}>
                <h3>
                  Расходы <span className='negative'>(-10%)</span>
                </h3>
              </div>
            </div>
          </div>
          <div className='balance-history'>
            <h2>История</h2>
            <div className='balance-history-wrapper'>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
              <div className='history-default'>
                <div className='history-default-wrapper'>
                  <h3>Зачисление 5000 RUB наличными</h3>
                  <span>Код атм №3962545</span>
                </div>
                <span className='history-default-date'>15:10:43 18/03/2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
