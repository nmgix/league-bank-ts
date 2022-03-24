import { INews, RecommendationNewsFound, RecommendationsTypes, UserSearchTypes } from "../types/SearchType";

const newsMockup: INews[] = [
  {
    title: "Любая инфа, новости 1",
    description: "Пример подписки к тайтлу",
    link: "example-link-1",
  },
  {
    title: "Любая инфа, новости 2",
    description: "Пример подписки к тайтлу",
    link: "example-link-2",
  },
  {
    title: "Любая инфа, новости 3",
    description: "Пример подписки к тайтлу",
    link: "example-link-3",
  },
  {
    title: "Любая инфа, новости 4",
    description: "Пример подписки к тайтлу",
    link: "example-link-4",
  },
  {
    title: "Любая инфа, новости 5",
    description: "Пример подписки к тайтлу",
    link: "example-link-5",
  },
  {
    title: "Любая инфа, новости 6",
    description: "Пример подписки к тайтлу",
    link: "example-link-6",
  },
  {
    title: "Любая инфа, новости 7",
    description: "Пример подписки к тайтлу",
    link: "example-link-7",
  },
];

//написал эту функцию ибо после отправки логина нужно дождаться ответа есть ли такой логин, и если логин всё-же присутствует, то поменять в модалке контент на смену пароля
export const existsUser = (login: string) => {
  // эту функцию потом будет необходимо полностью переписать ибо она должна будет быть редакс-асинхронной
  // тут должен быть запрос на бд, где бек сам должен разобраться какого типа ему инфа припёрлась, ну или пусть бд думает
  if (login === process.env.REACT_APP_USER_LOGIN) {
    // будет поиск по бд и возврат айди, ибо логин может быть чем угодно, но тут пока костыль
    return { type: UserSearchTypes.USER_FOUND, payload: login };
  } else {
    return { type: UserSearchTypes.USER_NOT_FOUND };
  }
};

export const getRecommendationNews = (index: number, step: number = 3): RecommendationNewsFound => {
  return { type: RecommendationsTypes.RECOMMENDATION_NEWS_FOUND, payload: newsMockup.slice(index, index + step) };
};

//тут также будут запросы постов из FAQ чанками по N кол-во
