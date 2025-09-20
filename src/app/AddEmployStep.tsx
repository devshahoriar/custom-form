import { Stapper, Step } from "@/components/Stepper";

const AddEmployStep = () => {
  return (
    <div>
      <Stapper
        onComplete={() => console.log("complet")}
        title="Add Employee"
        className="mx-auto mt-10"
      >
        <Step>
          <h1>Shuvo</h1>
        </Step>
        <Step validate={() => ({ message: "This is error", hasError: true })}>
          <h1>Shuvo1</h1>
        </Step>
        <Step>
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
