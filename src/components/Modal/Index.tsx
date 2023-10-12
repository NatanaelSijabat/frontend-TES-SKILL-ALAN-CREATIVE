import { Input, Modal } from "antd";
import { ModalProps } from "../../types/modal-interface";
import { Table } from "../Index";
import { Button } from "@material-tailwind/react";

const Index = ({ isModalOpen, handleOk, handleCancel, data }: ModalProps) => {
  return (
    <Modal
      title="Detail Pesanan"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={700}
      footer={null}
    >
      <div className="flex justify-center items-start gap-6">
        <div className="w-3/5">
          <Table data={data} />
        </div>
        <div className="border-l-2 px-2 text-center whitespace-nowrap font-bold w-2/5">
          <div className="mb-4 flex flex-col">
            <label className="mb-4">Uang Pembeli Rp </label>
            <Input type="number" />
          </div>
          <div className="flex justify-between gap-4 mb-2">
            <Button className="w-1/2" variant="outlined" onClick={handleCancel}>
              Close
            </Button>
            <Button className="w-1/2 bg-[#00ABED]" variant="outlined">
              Pay!
            </Button>
          </div>
          <span style={{ color: "red", alignItems: "start" }}>Kembalian :</span>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
