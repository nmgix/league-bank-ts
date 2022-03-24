import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAction } from "../../redux/hooks/useAction";
import { useTypedSelector } from "../../redux/hooks/useTypedSelector";
import { Loader } from "../essentials/Loader";

export const Ads: React.FC<{}> = () => {
  const { getRecommendationNews } = useAction();
  const ads = useTypedSelector((state) => state.search);

  useEffect(() => {
    if (!ads.recommentation?.news.length) {
      getRecommendationNews(0, 3);
    }
  }, [ads.recommentation?.news]);

  let navigate = useNavigate();

  return (
    <div className='ads'>
      {ads.recommentation?.news ? (
        ads.recommentation.news.map((news) => {
          // @ https://dev.to/zenveus/routing-with-react-router-v6-6b1
          // использование navigate и + использование слеша в начале позволили возвращаться на самый верх роутера

          return (
            <div onClick={() => navigate(`/posts/${news.link}`)} key={news.link}>
              <h2>{news.title}</h2>
              <p>{news.description}</p>
            </div>
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
};
