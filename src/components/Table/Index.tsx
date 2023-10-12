/* eslint-disable react-refresh/only-export-components */
import { Button, Card, Typography } from "@material-tailwind/react";
import { TableData } from "../../types/table-interface";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { Form } from "../Index";

const TABLE_HEAD = ["#", "Nama", "Foto", "Harga"];
const baseImageURL = `${import.meta.env.VITE_BASE_IMAGE_API}`;

export function formatNumberCurrency(number: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

const Index = ({ data, showAdd }: TableData) => {
  const [showForm, setShowForm] = useState(false);

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      {!showForm && showAdd ? (
        <Button
          type="button"
          size="sm"
          className="mb-4 bg-[#00ABED] capitalize shadow-sm flex items-center space-x-1"
          onClick={handleFormToggle}
        >
          <AiOutlinePlus />
          <span>tambah menu</span>
        </Button>
      ) : null}

      {showForm ? (
        <Form />
      ) : (
        <Card className="h-full w-full mb-3">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, nama, foto, harga, jumlah }, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id} className="odd:bg-blue-gray-50/50">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {jumlah !== undefined ? nama + `x` + jumlah : nama}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <img
                        src={baseImageURL + `/${foto}`}
                        alt="food image"
                        className="h-10 w-10 rounded-lg object-cover object-center"
                      />
                    </td>
                    <td className={classes}>
                      <Typography
                        as="span"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {formatNumberCurrency(Number(harga))}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
};

export default Index;
