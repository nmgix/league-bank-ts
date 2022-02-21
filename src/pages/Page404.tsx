import { useNavigate } from "react-router-dom";

export const Page404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      Страница, которую вы ищите не найдена, <button onClick={() => navigate(-1)}>вернуться обратно</button>
    </div>
  );
};
