import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Notifications } from "../../components/ClientHomePage/Notifications";
import { Loader } from "../../components/essentials/Loader";
import { Dropdown } from "../../components/Home/Calculator/Dropdown";
import { dependeciesObj, TimeArrange } from "../../functions/TimeArrange";
import { useAction } from "../../redux/hooks/useAction";
import { useTypedSelector } from "../../redux/hooks/useTypedSelector";
import { BalanceTypeEnum, BalanceType, IAccounts } from "../../redux/types/AccountsType";

// @ https://stackoverflow.com/questions/71429342/react-chart-js-2-in-combination-with-typescript-for-linecharts-uncaught-error

import "chart.js/auto";
import { Patterns } from "../../components/ClientHomePage/Patterns";
import { Ads } from "../../components/ClientHomePage/Ads";
import { Balance } from "../../components/ClientHomePage/Balance";
import { KeysOfUnion } from "../../interfaces/ICalculator";

export const ClientHomePage: React.FC = () => {
  const user = useTypedSelector((state) => state.auth);
  const userInfo = useTypedSelector((state) => state.userInfo);
  const { getUserInfo } = useAction();

  const [balance, setBalance] = useState<keyof IAccounts | null>(/*Object.keys(userInfo.state!.accounts)[0]*/ null);
  const [phrase, setPhrase] = useState<(string | undefined)[] | null>(null);

  useEffect(() => {
    if (user.state !== null && user.state.id !== null && userInfo.state === null) {
      getUserInfo(user.state.id);
    }

    setInterval(() => {
      return setTimeout(() => setPhrase(TimeArrange(timeDep)), (60 - new Date().getMinutes()) * 60000);
    }, 3600000);
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

  const idk = (key: KeysOfUnion<BalanceTypeEnum>) => {};

  return userInfo.state ? (
    <div className='main-content background-limit client-homepage'>
      <div className='main-header'>
        <h1>
          {phrase}, {user.state?.names.first}
        </h1>
        <Notifications notifications={userInfo.state?.notifications} />
      </div>
      <div className='main-news'>
        <Ads />
        <Patterns />
        <div style={{ width: "13%", height: "100%" }}>&nbsp;</div>
      </div>
      <div className='main-balance'>
        <div className='balance-header'>
          <div className='current-balance'>
            <h2>Текущий счёт</h2>
            <Dropdown
              ChangeChoice={(choice) => setBalance(choice)}
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
          {balance ? (
            <div className='actions'>
              <h2>Доступные действия</h2>
              <div className='actions-wrapper'>
                {Object.keys(BalanceType[userInfo.state.accounts[balance!].type]).length < 4 ? (
                  Object.keys(BalanceType[userInfo.state.accounts[balance!].type]).map((el) => {
                    return (
                      <div className='action-default'>{BalanceType[userInfo.state!.accounts[balance!].type][el]}</div>
                    );
                  })
                ) : (
                  <>
                    <div className='action-default'>
                      {
                        BalanceType[userInfo.state!.accounts[balance!].type][
                          Object.keys(BalanceType[userInfo.state!.accounts[balance!].type])[0]
                        ]
                      }
                    </div>
                    <div className='action-default'>
                      {
                        BalanceType[userInfo.state!.accounts[balance!].type][
                          Object.keys(BalanceType[userInfo.state!.accounts[balance!].type])[1]
                        ]
                      }
                    </div>
                    <div className='action-default'>
                      {
                        BalanceType[userInfo.state!.accounts[balance!].type][
                          Object.keys(BalanceType[userInfo.state!.accounts[balance!].type])[2]
                        ]
                      }
                    </div>
                    <div className='other-actions'>Другое ...</div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Balance currentAccount={balance} />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loader text='Информация загружается, пожалуйста, подождите' />
  );
};
