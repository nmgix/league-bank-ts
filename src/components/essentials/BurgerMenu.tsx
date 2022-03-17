export const BurgerMenu: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div onClick={onClick} className='burger-menu'>
      <div className='line'></div>
      <div className='line'></div>
      <div className='line'></div>
    </div>
  );
};
