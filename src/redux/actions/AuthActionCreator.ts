import { AuthActions, AuthTypes } from "../types/AuthorizationType";

const userMockup = JSON.stringify({
  id: "a1b43",
  phone: "79668563241",
  mail: "brokeaf@mail.yo",
  names: {
    first: "Oleg",
    second: "Broke",
    third: "AF",
  },
  img: `%PUBLIC_URL%/images/a1b43.png`,
});

export function getUser(login: string, password: string): AuthActions {
  if (login.length > 32 || password.length > 32) {
    return {
      type: AuthTypes.AUTH_ERROR,
      payload: `Длина ${login.length > 32 ? "логина" : "пароля"} превышает допустимые значения`,
    };
  } else if (login.length < 2 || password.length < 2) {
    return {
      type: AuthTypes.AUTH_ERROR,
      payload: `Длина ${login.length < 2 ? "логина" : "пароля"} не привышает минимальный порог значения`,
    };
  }

  //тут типо будет axios запрос, но мне лень, поэтому просто галимый JSON
  if (login === process.env.REACT_APP_USER_LOGIN && password === process.env.REACT_APP_USER_PASSWORD) {
    return { type: AuthTypes.AUTH_SUCCESS, payload: JSON.parse(userMockup) };
  } else {
    console.log(login, process.env.REACT_APP_USER_LOGIN);
    console.log(password, process.env.REACT_APP_USER_PASSWORD);
    return { type: AuthTypes.AUTH_ERROR, payload: "Логин или пароль неверны" };
  }
}

export function resetState(): AuthActions {
  return { type: AuthTypes.AUTH_RESET, payload: {} };
}

export function resetPassword(login: string, oldPassword: string, newPassword: string): AuthActions {
  //тут должен быть запрос набд за поиском по поте или по номеру или по ещё чему
  //   if (existsUser(login)) {
  //тут должно быть "если найден логин, то отправить запрос на почту, но я пропущу"
  const mailResponse = true;

  if (mailResponse) {
    if (oldPassword === process.env.REACT_APP_USER_PASSWORD) {
      //тут идёт запрос на бек для обновления пароля (newPassword), а пока что получаем по допустим айди и возвращаем юзера
      return { type: AuthTypes.AUTH_SUCCESS, payload: JSON.parse(userMockup) };
    } else {
      return { type: AuthTypes.AUTH_ERROR, payload: "Что-то пошло не так" }; //Что-то пошло не так и пароль не сходится
    }
  } else {
    return { type: AuthTypes.AUTH_ERROR, payload: "Что-то пошло не так" }; //Что-то пошло не так и письмо не дошло
  }
  //   } else {
  //     return { type: AuthTypes.AUTH_ERROR, payload: "Что-то пошло не так" }; //Логин неверный, пользователь не найден
  //   }
}
