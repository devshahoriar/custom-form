import AddEmployee from "@/app/(site)/AddEmployee";
import Modal from "./Modal";

export default function InterceptedLoginPage() {
  return (
    <Modal>
      <AddEmployee />
    </Modal>
  );
}
