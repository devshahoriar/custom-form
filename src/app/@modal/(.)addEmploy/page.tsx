import AddEmployee from "@/app/(site)/addEmploy/AddEmployee";
import Modal from "./Modal";

export default function InterceptedLoginPage() {
  return (
    <Modal>
      <AddEmployee />
    </Modal>
  );
}
