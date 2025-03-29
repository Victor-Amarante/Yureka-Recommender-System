import { Outlet } from 'react-router';

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const AppRoot = () => {
  return (
    <div className="w-full h-full py-20">
      <div className="w-full h-full max-w-[420px] sm:max-w-[576px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1440px] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppRoot;
