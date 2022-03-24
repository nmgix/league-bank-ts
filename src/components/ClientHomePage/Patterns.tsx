import React from "react";
import { useTypedSelector } from "../../redux/hooks/useTypedSelector";
import { IPatterns } from "../../redux/types/UserType";
import { Loader } from "../essentials/Loader";

export const Patterns: React.FC<{}> = () => {
  const userInfo = useTypedSelector((state) => state.userInfo);

  return (
    <div className='pattern'>
      <h3>Шаблоны</h3>
      <div className='pattern-wrapper'>
        {userInfo.state ? (
          Object.keys(userInfo.state.patterns).map((patterdId) => {
            return (
              <button className='pattern-default' key={patterdId}>
                {userInfo.state!.patterns[patterdId as keyof IPatterns].title}
              </button>
            );
          })
        ) : (
          <Loader text='Информация загружается, пожалуйста, подождите' />
        )}
        <button className='other-patterns'>Другие шаблоны...</button>
      </div>
    </div>
  );
};
