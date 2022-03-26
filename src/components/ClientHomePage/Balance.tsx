import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { groupBy } from "../../functions/GroupBy";
import { useTypedSelector } from "../../redux/hooks/useTypedSelector";
import {
  exchangeType,
  exchangeTypeKeys,
  expensesTypes,
  IAccounts,
  IHistory,
  incomeTypes,
} from "../../redux/types/UserType";
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
  "#d8492f",
  "#f4c6c6",
  "#7e627d",
  "#2e7255",
  "#e49bd4",
  "#e3b1ef",
  "#a676a3",
  "#4a22e6",
  "#646df4",
  "#005295",
  "#c000cc",
  "#ccc0aa",
  "#d3b4ab",
  "#867e78",
];

type grouppedIndexes = Record<exchangeTypeKeys, IHistory[]> | {};

// @ https://stackoverflow.com/questions/42136098/array-groupby-in-typescript

const MarkersWithLables: React.FC<{
  dataTyped: {
    [x: string]: {
      value: number;
      color: string;
    };
  } | null;
}> = ({ dataTyped }) => {
  return dataTyped !== null ? (
    <>
      {Object.keys(dataTyped).map((currentType) => {
        return (
          <span className='detail' key={currentType}>
            <div className='color-marker' style={{ backgroundColor: dataTyped![currentType].color }}></div>
            <button className='history-reference'>{exchangeType[currentType as keyof typeof exchangeType]}</button>
          </span>
        );
      })}
    </>
  ) : (
    <>
      <Loader />
    </>
  );
};

export const Balance: React.FC<{ currentAccount: keyof IAccounts | null }> = ({ currentAccount }) => {
  const userInfo = useTypedSelector((state) => state.userInfo);

  const renderDetails = (currentTab: "income" | "expenses", data: IHistory): grouppedIndexes => {
    const positiveType = currentTab === "income" ? incomeTypes : expensesTypes;

    var newData = JSON.parse(JSON.stringify(data));

    var obj = Object.keys(newData).map((historyId) => {
      return { [historyId]: newData[historyId] };
    });

    if (Array.isArray(obj) && obj.length) {
      obj = obj.filter((elem) => elem[Object.keys(elem)[0]].type in positiveType);
      var group = groupBy(obj, (el) => el[Object.keys(el)[0]].type);

      return group;
    } else {
      return {};
    }
  };

  const [state, setState] = useState<IAccounts>();
  const [dataTyped, setdataTyped] = useState<{
    [x: string]: {
      value: number;
      color: string;
    };
  } | null>(null);
  const [currentTab, setCurrentTab] = useState<"income" | "expenses">("income");

  useEffect(() => {
    if (currentAccount !== null) {
      setState(userInfo.state!.accounts[currentAccount]);

      setdataTyped(sortTypes(renderDetails(currentTab, userInfo.state!.accounts[currentAccount].history)));
    }
  }, [currentAccount, currentTab, userInfo]);

  useEffect(() => {
    setCurrentTab("income");
  }, [currentAccount]);

  const sortTypes = (
    data: grouppedIndexes
  ): {
    [x: string]: {
      value: number;
      color: string;
    };
  } => {
    return Object.assign(
      {},
      ...Object.keys(data).map((key) => {
        var typeArray: IHistory[] = data[key as keyof grouppedIndexes];
        var calcedArray = typeArray.reduce((prevEl, currEl) => {
          var prevObj = prevEl[Object.keys(prevEl)[0]];
          prevObj.value += currEl[Object.keys(currEl)[0]].value;
          return prevEl;
        });
        return {
          [key]: {
            value: calcedArray[Object.keys(calcedArray)[0]].value,
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
                    ...Object.keys(dataTyped!).map((id) => {
                      return dataTyped![id].color;
                    }),
                  ],
                  borderColor: "#FFF",
                  data: [
                    ...Object.keys(dataTyped!).map((id) => {
                      return dataTyped![id].value;
                    }),
                  ],
                },
              ],
            }}
            options={{ cutout: 120 }}
          />
          <div>
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
            <MarkersWithLables dataTyped={dataTyped} />
          </div>
          <div className={`expenses ${currentTab === "expenses" ? "active" : ""}`}>
            <h3 onClick={() => setCurrentTab("expenses")}>Расходы {/*}span className=''>(-10%)</span></div>*/}</h3>
            <MarkersWithLables dataTyped={dataTyped} />
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
