import { Card, Typography } from "@material-tailwind/react";
import { TableData } from "../../types/table-interface";

const TABLE_HEAD = ["#", "Nama", "Foto", "Harga"];
const baseImageURL = `${import.meta.env.VITE_BASE_IMAGE_API}`;

const Index = ({ data }: TableData) => {
  return (
    <>
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
            {data.map(({ id, nama, foto, harga }, index) => {
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
                      {nama}
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
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      Rp. {harga}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default Index;
