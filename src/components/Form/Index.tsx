/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@material-tailwind/react";
import { Button, Form, Input, Upload, message } from "antd";
import { BsCloudUpload } from "react-icons/bs";
import { ObjTableData } from "../../types/table-interface";
import { useState } from "react";
import { API_URL } from "../../utils/callApi";

const Index = () => {
  const { Dragger } = Upload;
  const [formValues, setFormValue] = useState<ObjTableData>({
    nama: "",
    harga: "",
    foto: null,
    jumlah: 0,
  });

  const [form] = Form.useForm();

  const handleNamaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValues, nama: event.target.value });
  };

  const handleHargaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValues, harga: event.target.value });
  };

  const handleFotoChange = (file: File) => {
    setFormValue({ ...formValues, foto: file });
  };

  const onFinish = async () => {
    form.validateFields().then(async () => {
      const formData = new FormData();
      formData.append("nama", formValues.nama);
      formData.append("harga", formValues.harga);
      const fileList = form.getFieldValue("foto");
      if (fileList && fileList.length > 0) {
        formData.append("foto", fileList[0].originFileObj);
      }

      try {
        await API_URL.post("/food", formData);
        form.resetFields();
        location.reload();
      } catch (error: any) {
        console.log(error.message);
        message.error(error.message);
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="mt-6 w-full">
      <Typography className="mb-6">Tambahkan Menu</Typography>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        autoComplete="off"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name={"nama"} label="Nama Menu">
          <Input
            type="text"
            id="nama"
            value={formValues.nama}
            onChange={handleNamaChange}
          />
        </Form.Item>
        <Form.Item
          name={"foto"}
          label="Foto Menu"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Dragger
            listType="picture-circle"
            maxCount={1}
            style={{ padding: "40px" }}
            beforeUpload={(file, _fileList) => {
              handleFotoChange(file);
              return false;
            }}
            accept="image/*"
          >
            <div
              style={{
                fontSize: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <BsCloudUpload />
            </div>
            <p className="ant-upload-text">
              drag and drop a file here or click
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item name={"harga"} label="Harga Menu">
          <Input
            type="number"
            id="harga"
            addonBefore={
              <span
                style={{
                  color: "#00ABED",
                }}
              >
                Rp.
              </span>
            }
            value={formValues.harga}
            onChange={handleHargaChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "#7CAF84",
              marginLeft: "auto",
              display: "block",
              width: "150px",
            }}
          >
            Simpan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
