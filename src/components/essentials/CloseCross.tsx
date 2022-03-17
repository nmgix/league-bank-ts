export const CloseCross: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div onClick={onClick} className='close-cross'>
      <div className='line'></div>
      <div className='line'></div>
    </div>
  );
};
