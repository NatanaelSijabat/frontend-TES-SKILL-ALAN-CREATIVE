import React from "react";
import { Tabs, TabsHeader, TabsBody, Tab } from "@material-tailwind/react";
import { TabData } from "../../types/tabs-interface";

const Index = ({ data, defaultValue, children }: TabData) => {
  const [activeTab, setActiveTab] = React.useState("food");

  return (
    <Tabs value={defaultValue}>
      <TabsHeader
        className="bg-transparent max-w-full px-24 shadow-md"
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
              flexBasis: "7rem",
            }}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {children}
      </TabsBody>
    </Tabs>
  );
};

export default Index;
