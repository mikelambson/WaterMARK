import Ordercount from "@/components/Ordercount";

const Scheduling = () => {

  return (
    <div className={"flex flex-col m-4"}>
      <div className={"flex-1"}>
        <h1 className={"text-3xl font-semibold mb-5"}>Scheduling Dashboard</h1>  
      </div>
      <div>
        <Ordercount />
      </div>
    </div>
  );
};

export default Scheduling;
