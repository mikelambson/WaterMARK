// pages/scheduling.tsx
import DnDContextWrapper from '@/app/testing/(routes)/scheduling/components/DnDContextWrapper';

const SchedulingPage = () => {
  return (
    <div className='p-2'>
      <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>Order Scheduling DEVELOPMENT</h1>
      <DnDContextWrapper />
    </div>
  );
};

export default SchedulingPage;
