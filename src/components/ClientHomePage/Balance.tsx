import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useTypedSelector } from "../../redux/hooks/useTypedSelector";
import { expensesTypes, IAccounts, IHistory, incomeTypes } from "../../redux/types/UserType";
import { Loader } from "../essentials/Loader";

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

const colors = [
  "#12642c",
  "#cb011c",
  "#82099a",
  "#3476cc",
  "#494c8c",
  "#709b4c",
  "#381ce4",
  "#f3a59a",
  "#f22d26",
  "#6c3f3f",
  "#845ace",
];

export const Balance: React.FC<{ currentAccount: keyof IAccounts | null }> = ({ currentAccount }) => {
  const userInfo = useTypedSelector((state) => state.userInfo);

  const renderDetails = (currentTab: "income" | "expenses", data: IHistory): IHistory => {
    const positiveType = currentTab === "income" ? incomeTypes : expensesTypes;
    const negativeType = currentTab === "income" ? expensesTypes : incomeTypes;
    // console.log(
    //   Object.keys(data).map((historyId) => {
    //     // @ https://stackoverflow.com/questions/40598296/how-to-check-if-a-given-string-key-exists-in-enum
    //     if (data[historyId].type in positiveType) {
    //       return { [historyId]: data[historyId] };
    //     } else if (data[historyId].type in negativeType) {
    //       return;
    //     }
    //   })
    // );

    return Object.assign(
      {},
      ...Object.keys(data).map((historyId) => {
        // @ https://stackoverflow.com/questions/40598296/how-to-check-if-a-given-string-key-exists-in-enum
        if (data[historyId].type in positiveType) {
          return { [historyId]: data[historyId] };
        } else if (data[historyId].type in negativeType) {
          return;
        }
      })
    );
  };

  const [state, setState] = useState<IAccounts>();
  const [currentIndexes, setIndexes] = useState<IHistory>();
  const [dataColors, setDataColors] = useState<{
    [x: string]: {
      value: number;
      color: string;
    };
  } | null>(null);
  const [currentTab, setCurrentTab] = useState<"income" | "expenses">("income");

  useEffect(() => {
    if (currentAccount !== null) {
      setState(userInfo.state!.accounts[currentAccount]);
      setDataColors(sortColors(renderDetails(currentTab, userInfo.state!.accounts[currentAccount].history)));
      setIndexes(renderDetails(currentTab, userInfo.state!.accounts[currentAccount].history));
    }
  }, [currentAccount, currentTab, userInfo]);

  useEffect(() => {
    setCurrentTab("income");
  }, [currentAccount]);

  const sortColors = (
    data: IHistory
  ): {
    [x: string]: {
      value: number;
      color: string;
    };
  } => {
    return Object.assign(
      {},
      ...Object.keys(data).map((key) => {
        return {
          [key]: {
            value: data[key].value,
            color: colors[Math.floor(Math.random() * colors.length)],
          },
        };
      })
    );
  };

  return !state ? (
    <div></div>
  ) : (
    <div className='balance-info-wrapper'>
      <div className='balance-info'>
        <div className='chart'>
          <Doughnut
            data={{
              datasets: [
                {
                  label: "My First dataset",
                  backgroundColor: [
                    ...Object.keys(dataColors!).map((id) => {
                      return dataColors![id].color;
                    }),
                  ],
                  borderColor: "#FFF",
                  data: [
                    ...Object.keys(dataColors!).map((id) => {
                      return dataColors![id].value;
                    }),
                  ],
                },
              ],
            }}
            options={{ cutout: 120 }}
          />
          <div>
            {/* див будет ставиться в середину доната чтобы текст можно было копировать */}
            <h2>
              {state.balance} {state.currency}
            </h2>
            {state.currency !== "RUB" ? (
              <span>{Number(state.balance * 110).toFixed(0)} RUB</span>
            ) : (
              <span>{Number(state.balance / 110).toFixed(0)} USD</span>
            )}
          </div>
        </div>
        <div className='chart-details'>
          <div className={`income ${currentTab === "income" ? "active" : ""}`}>
            <h3 onClick={() => setCurrentTab("income")}>Доходы {/*<span className='positive'>(+20%)</span>*/}</h3>
            {Object.keys(currentIndexes!).map((historyId) => {
              return (
                <span className='detail' key={historyId}>
                  <div className='color-marker' style={{ backgroundColor: dataColors![historyId].color }}></div>
                  {/*10% -*/}{" "}
                  <button className='history-reference'>
                    {incomeTypes[currentIndexes![historyId].type as keyof typeof incomeTypes]}
                  </button>
                </span>
              );
            })}
          </div>
          <div className={`expenses ${currentTab === "expenses" ? "active" : ""}`}>
            <h3 onClick={() => setCurrentTab("expenses")}>Расходы {/*}span className=''>(-10%)</span></div>*/}</h3>
            {Object.keys(currentIndexes!).map((historyId) => {
              return (
                <span className='detail' key={historyId}>
                  <div className='color-marker' style={{ backgroundColor: dataColors![historyId].color }}></div>
                  {/*10% -*/}{" "}
                  <button className='history-reference'>
                    {expensesTypes[currentIndexes![historyId].type as keyof typeof expensesTypes]}
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className='balance-history'>
        <h2>История</h2>
        <div className='balance-history-wrapper'>
          {state.history ? (
            Object.keys(state.history)
              .sort(function (a, b) {
                return state.history[b].date - state.history[a].date;
              })
              .map((historyId) => (
                <div className='history-default' key={historyId}>
                  <div className='history-default-wrapper'>
                    <h3>{state.history[historyId].title}</h3>
                    <span>{state.history[historyId].description}</span>
                  </div>
                  <span className='history-default-date'>
                    {new Date(state.history[historyId].date).toLocaleString("ru", timeFormatOptions)}
                  </span>
                </div>
              ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};
