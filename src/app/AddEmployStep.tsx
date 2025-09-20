import { Stapper, Step } from "@/components/Stepper";

const AddEmployStep = () => {
  return (
    <div>
      <Stapper title="Add Employee" className="mx-auto mt-10">
        <Step >
          <h1>Shuvo</h1>
        </Step>
        <Step>
          <h1>Shuvo1</h1>
        </Step>
        <Step validate={() => false}>
          <h1>Shuvo2</h1>
        </Step>
        <Step>
          <h1>Shuvo2</h1>
        </Step>
        <Step>
          <h1>Shuvo2</h1>
        </Step>
      </Stapper>
    </div>
  );
};

export default AddEmployStep;
