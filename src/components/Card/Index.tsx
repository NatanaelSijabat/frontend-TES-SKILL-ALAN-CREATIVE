/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { ObjTableData, TableData } from "../../types/table-interface";
import { formatNumberCurrency } from "../Table/Index";
import { Avatar, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Modal } from "../Index";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

const baseImageURL = `${import.meta.env.VITE_BASE_IMAGE_API}`;

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const Index = ({ data }: TableData) => {
  const [dataTransaksi, setDataTransaksi] = useState<ObjTableData[]>([]);
  const [charge, setCharge] = useState<ObjTableData[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [modalOpen, setModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModal(!modalOpen);
  };

  const handleDoubleClick = (e: any) => {
    const existingItemIndex = dataTransaksi.findIndex(
      (item) => item.nama === e.nama
    );

    if (existingItemIndex !== -1) {
      const updatedDataTransaksi = [...dataTransaksi];
      const existingItem = updatedDataTransaksi[existingItemIndex];

      existingItem.jumlah += 1;
      existingItem.harga = (
        parseFloat(existingItem.harga) + parseFloat(e.harga)
      ).toString();

      const newTotal = updatedDataTransaksi.reduce(
        (accumulator, item) => accumulator + parseFloat(item.harga),
        0
      );

      setTotal(newTotal);
      setDataTransaksi(updatedDataTransaksi);
      setCharge(updatedDataTransaksi);
    } else {
      setDataTransaksi((prevDataTransaksi) => [
        ...prevDataTransaksi,
        {
          harga: e.harga,
          nama: e.nama,
          foto: e.foto,
          jumlah: 1,
        },
      ]);
      setCharge((prevDataTransaksi) => [
        ...prevDataTransaksi,
        {
          harga: e.harga,
          nama: e.nama,
          foto: e.foto,
          jumlah: 1,
        },
      ]);
    }

    const newTotal = dataTransaksi.reduce(
      (accumulator, item) => accumulator + parseFloat(item.harga),
      parseFloat(e.harga)
    );

    setTotal(newTotal);
  };

  const handleClearCart = () => {
    setDataTransaksi([]);
    setTotal(0);
  };

  const handleCharge = () => {
    setModal(!modalOpen);
  };

  const savePdf = () => {
    ReactPDF.render(<MyDocument />, `${__filename}/example.pdf`);
  };

  return (
    <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 space-x-6">
      <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {data.map(({ nama, foto, harga }) => (
          <Card
            className="max-w-[24rem] overflow-hidden cursor-pointer"
            onDoubleClick={() => handleDoubleClick({ nama, foto, harga })}
          >
            <CardHeader className="m-0 rounded-none">
              <img
                src={`${baseImageURL}/${foto}`}
                alt="ui/ux review check"
                className="w-full h-auto"
              />
            </CardHeader>
            <CardFooter>
              <Typography
                variant="h6"
                color="blue-gray"
                className="text-center capitalize"
              >
                {nama}
              </Typography>
              <Typography
                className="text-center"
                style={{ color: "#00ABED" }}
                variant="small"
                as="span"
              >
                {formatNumberCurrency(Number(harga))}
              </Typography>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="w-full md:w-2/5">
        <Card>
          <CardBody>
            <div className="flex justify-center items-center gap-4">
              <Avatar icon={<UserOutlined />} size={"large"} />
              <Typography variant="h6" color="black" className="font-bold">
                Pesanan
              </Typography>
            </div>
            {dataTransaksi.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>Tidak Ada Pesanan</span>}
              />
            ) : (
              <>
                {dataTransaksi.map(({ nama, foto, harga, jumlah }) => (
                  <List>
                    <ListItem>
                      <ListItemPrefix>
                        <div className="grid md:grid-cols-4 gap-2 justify-center items-center">
                          <img
                            src={`${baseImageURL}/${foto}`}
                            alt="ui/ux review check"
                            className="w-10 h-auto"
                          />
                          <p className="font-bold text-center md:text-left text-sm whitespace-nowrap">
                            {nama}
                          </p>
                          <Typography
                            className="font-bold flex justify-center md:justify-end"
                            variant="small"
                            color="black"
                          >
                            {`x` + jumlah}
                          </Typography>
                          <Typography
                            className="font-bold text-center md:text-left whitespace-nowrap"
                            style={{
                              color: "#00ABED",
                            }}
                            variant="small"
                            color="black"
                          >
                            {formatNumberCurrency(Number(harga))}
                          </Typography>
                        </div>
                      </ListItemPrefix>
                    </ListItem>
                  </List>
                ))}
              </>
            )}
          </CardBody>
          <CardFooter>
            <div className="w-full space-y-3">
              <Button
                variant="outlined"
                style={{
                  borderColor: "red",
                  width: "100%",
                }}
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
              <div className="flex gap-4">
                <Button
                  variant="filled"
                  style={{
                    backgroundColor: "#7CAF84",
                    width: "100%",
                  }}
                >
                  Save Bill
                </Button>
                <Button
                  variant="filled"
                  style={{
                    backgroundColor: "#7CAF84",
                    width: "100%",
                  }}
                  onClick={savePdf}
                >
                  Print Bill
                </Button>
              </div>
              {total !== 0 && (
                <>
                  <Button
                    variant="outlined"
                    style={{
                      width: "100%",
                      backgroundColor: "#00ABED",
                    }}
                    className="capitalize"
                    onClick={handleCharge}
                  >
                    Charge {formatNumberCurrency(Number(total))}
                  </Button>
                  <Modal
                    isModalOpen={modalOpen}
                    handleOk={handleOpenModal}
                    handleCancel={handleOpenModal}
                    data={charge}
                  />
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
