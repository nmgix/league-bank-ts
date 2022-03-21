import { UserInfo, UserInfoTypes } from "../types/UserType";

const userInfoMockup: UserInfo = {
  notifications: {
    "notification-9263-4c86-a261-f15c6e1db2e9": {
      title: "Ваш валютный счёт 'abroadBalance'(EUR) заблокирован",
      description: "Причиной блокировки счёта являются сомнительные транзакции",
      date: 1621591374000,
      //new Date('2021-03-17T18:36:00').getTime();
    },
    "6165a8ea-baff-44c5-b7ee-efa83a04ca8e": {
      title: "Скоро закончится срок действования карты (...33f82d03e5d8)",
      description: "Срок заканичвается 17 марта 2021г",
      date: 1615995360000,
    },
  },
  accounts: {
    "balance-834b-4f34-94ec-33f82d03e5d8": {
      name: "forUsual",
      type: "settlement",
      currency: "RUB",
      balance: 117000,
      blocked: false,
    },
    "balance-9a06-4631-b751-93fb3ad83edc": {
      name: "futureExpenses",
      type: "deposit",
      currency: "USD",
      balance: 100000,
      blocked: false,
    },
    "balance-342a-455a-8b20-1f9e12ebabe2": {
      name: "forWannables",
      type: "credit",
      currency: "RUB",
      balance: 75000,
      blocked: false,
    },
    "balance-7e91-4833-9f00-8244ffa6781d": {
      name: "abroadBalance",
      type: "settlement",
      currency: "EUR",
      balance: 15000,
      blocked: true,
    },
  },
  history: {
    "c4fd5f2b-9d4d-4ea1-9ff3-09fe42ebccf1": {
      title: "Тразнакция на имя Косалов Михаил (5000 RUB)",
      description: "Транзация на Косалов Михаил Валерьевич (05fe32egkc5e) 5000 RUB",
      sender: "balance-834b-4f34-94ec-33f82d03e5d8",
      reciever: "balance-5e92-3523-2h20-05fe32egkc5e",
      currency: "RUB",
      value: 5000,
      date: 1647605443067,
    },
  },
};

export const getUserInfo = (id: string) => {
  if (id === process.env.REACT_APP_USER_ID) {
    return { type: UserInfoTypes.USER_INFO_SUCCESS, payload: userInfoMockup };
  } else {
    return { type: UserInfoTypes.USER_INFO_ERROR, payload: "Что-то пошло не так" };
  }
};

export const resetUserInfo = () => {
  return { type: UserInfoTypes.USER_INFO_RESET };
};
