const Loader = () => {
  let circleCommonClasses = 'h-[4px] w-[4px] bg-current rounded-full';

  return (
    <div className="flex">
      <div className={`${circleCommonClasses} mr-[2px] animate-bounce100`}></div>
      <div className={`${circleCommonClasses} mr-[2px] animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
};

export default Loader;
