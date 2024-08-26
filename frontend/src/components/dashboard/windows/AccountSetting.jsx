/** @format */

import React from "react";
import StudentProfile from "./StudentProfile";
import AccountTempoId from "./AccountTempoId";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

const AccountSetting = () => {
  return (
    <div className="ml-4">
      <Tabs size="sm" variant="enclosed">
        <TabList>
          <Tab>Profile</Tab>
          <Tab>TempoID</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          <StudentProfile />
          </TabPanel>
          <TabPanel>
          <AccountTempoId />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AccountSetting;
