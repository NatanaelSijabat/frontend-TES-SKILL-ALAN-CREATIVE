import { TabPanel } from "@material-tailwind/react";
import "./Global.css";
import { Footer, Header, Table, Tabs } from "./components/Index";
import { useEffect, useState } from "react";
import { API_URL } from "./utils/callApi";
import { ObjTableData } from "./types/table-interface";

function App() {
  const [food, setFood] = useState<ObjTableData[]>([]);
  const getData = async () => {
    const res = await API_URL.get("/food");
    setFood(res.data.data);
  };

  useEffect(() => {
    getData();
  }, []);
  const data = [
    {
      label: "Food",
      value: "food",
      desc: <Table data={food} />,
    },
    {
      label: "Transaksi",
      value: "transaksi",
      desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];
  return (
    <>
      <Header />
      <div className="bg-transparant h-100">
        <Tabs data={data} defaultValue="food">
          {data.map((item) => (
            <TabPanel key={item.value} value={item.value}>
              <div className="mx-20 px-6 py-2 h-100 shadow-md">
                <p>{item.desc}</p>
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
      <Footer />
    </>
  );
}

export default App;
