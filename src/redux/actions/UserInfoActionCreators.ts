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
      history: {
        "c4fd5f2b-9d4d-4ea1-9ff3-09fe42ebccf1": {
          title: "Тразнакция на имя Косалов Михаил (5000 RUB)",
          description: "Транзация на Косалов Михаил Валерьевич (05fe32egkc5e) 5000 RUB",
          type: "transaction_to",
          sender: "balance-834b-4f34-94ec-33f82d03e5d8",
          reciever: "balance-5e92-3523-2h20-05fe32egkc5e",
          currency: "RUB",
          value: 5000,
          date: 1647605443067,
        },
        "4kngfd5f2b-52g5-3bj1-4dj3-4mcu42ebccf1": {
          title: "Тразнакция на имя Косалов Михаил (5000 RUB)",
          description: "Транзация на Косалов Михаил Валерьевич (05fe32egkc5e) 5000 RUB",
          type: "transaction_to",
          sender: "balance-834b-4f34-94ec-33f82d03e5d8",
          reciever: "balance-5e92-3523-2h20-05fe32egkc5e",
          currency: "RUB",
          value: 5000,
          date: 1647606453067,
        },
        "e4fd5f2b-469d-4ea1-y4f3-09fe62ebccf1": {
          title: "Тразнакция на имя Косалов Михаил (5000 RUB)",
          description: "Транзация на Косалов Михаил Валерьевич (05fe32egkc5e) 5000 RUB",
          type: "transaction_to",
          sender: "balance-834b-4f34-94ec-33f82d03e5d8",
          reciever: "balance-5e92-3523-2h20-05fe32egkc5e",
          currency: "RUB",
          value: 5000,
          date: 1647604345067,
        },
        "e4x75f6b-465i-4ea1-y4f3-09fe62ebccf1": {
          title: "Пополнение счёта на 132000 RUB",
          type: "deposit",
          description: "Код атм пополнения: 453423",
          currency: "RUB",
          value: 132000,
          date: 1647602345067,
        },
      },
    },
    "balance-9a06-4631-b751-93fb3ad83edc": {
      name: "futureExpenses",
      type: "deposit",
      currency: "USD",
      balance: 100000,
      blocked: false,
      history: {
        "g4x55f6b-465i-4ea1-y4f3-09fe62ebccf1": {
          title: "Пополнение счёта на 100000 USD",
          type: "deposit",
          description: "Код атм пополнения: 453423",
          currency: "RUB",
          value: 100000,
          date: 1647602345067,
        },
      },
    },
    "balance-342a-455a-8b20-1f9e12ebabe2": {
      name: "forWannables",
      type: "credit",
      currency: "RUB",
      balance: 75000,
      blocked: false,
      history: {
        // "xxx55f6b-465i-4ea1-y4f3-09fe62ebccf1": {
        //   title: "Оформление кредитной карты на 75000 RUB",
        //   description: "Код атм пополнения: 453423",
        //   currency: "RUB",
        //   value: 5000,
        //   date: 1647602345067,
        // },
      },
    },
    "balance-7e91-4833-9f00-8244ffa6781d": {
      name: "abroadBalance",
      type: "settlement",
      currency: "EUR",
      balance: 15000,
      blocked: true,
      history: {
        "i4x55f6b-465i-4ea1-y4f3-09fe62ebccf1": {
          title: "Пополнение счёта на 15000 EUR",
          description: "Код атм пополнения: 453423",
          type: "deposit",
          currency: "RUB",
          value: 15000,
          date: 1647602345067,
        },
      },
    },
  },
  patterns: {
    "pattern-9d4d-4833-9ff3-8244ffa6781d": {
      title: "Перевод Константину К.",
      action: /* Action<Transaction> */ "transaction" /* там типо от Action Type будет зависеть перегрузка паттерна */,
      defaultProps: {
        reciever: "balance-5e92-3523-2h20-05fe32egkc5e" /* пропс который будет вставлять в форму далее */,
      },
    },
    "pattern-9p4d-4836-9ef3-824447sj781d": {
      title: "Опалата “коммуналки”",
      action:
        /* Action<Transaction> */ "utilities_payment" /* там типо от Action Type будет зависеть перегрузка паттерна */,
      defaultProps: {
        reciever: "balance-3e92-6h63-2e21-07fe32ggk35e",
        adress: "Театральная 32Б к3 кв114",
      },
    },
    "pattern-2p4d-7843-6bt4-5kx947sj781d": {
      title: "Оплата колледжа",
      action:
        /* Action<Transaction> */ "other-payments" /* там типо от Action Type будет зависеть перегрузка паттерна */,
      defaultProps: {
        reciever: "balance-3e92-6h63-4bt2-5mk6h2ggk35e",
      },
    },
    "pattern-25ae-7843-6bt4-5xg9876j7j7d": {
      title: "Перевод с “обычная” на “на будущее”",
      action:
        /* Action<Transaction> */ "iternal-account-transaction" /* там типо от Action Type будет зависеть перегрузка паттерна */,
      defaultProps: {
        sender: "balance-834b-4f34-94ec-33f82d03e5d8",
        reciever: "balance-9a06-4631-b751-93fb3ad83edc",
      },
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
