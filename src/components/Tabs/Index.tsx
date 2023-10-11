import React from "react";
import { Tabs, TabsHeader, TabsBody, Tab } from "@material-tailwind/react";
import { TabData } from "../../types/tabs-interface";

const Index = ({ data, defaultValue, children }: TabData) => {
  const [activeTab, setActiveTab] = React.useState("food");
  //   const data = [
  //     {
  //       label: "Food",
  //       value: "food",
  //       desc: `It really matters and then like it really doesn't matter.
  //         What matters is the people who are sparked by it. And the people
  //         who are like offended by it, it doesn't matter.`,
  //     },
  //     {
  //       label: "Transaksi",
  //       value: "transaksi",
  //       desc: `Because it's about motivating the doers. Because I'm here
  //         to follow my dreams and inspire other people to follow their dreams, too.`,
  //     },
  //   ];

  return (
    <Tabs value={defaultValue}>
      <TabsHeader
        className="bg-transparent max-w-full px-8 shadow-md"
        indicatorProps={{
          className:
            "border-b-2 border-[#00ABED] shadow-sm rounded-none text-[#00ABED]",
        }}
        style={{
          display: "flex",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-[#00ABED " : "text-black"}
            style={{
              flexBasis: "10rem",
            }}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>{children}</TabsBody>
    </Tabs>
  );
};

export default Index;
