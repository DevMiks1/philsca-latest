/** @format */

import {
  CheckCircleIcon,
  EditIcon,
  Icon,
  StarIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  HStack,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { fetchAccountAPI } from "../../api/AccountsApi";
import { useData } from "../../context/FetchAccountContext";
import ActiveUser from "./ActiveUser";
import ActiveId from "./ActiveId";

const GraphsAndAnalytics = () => {
  const { data, loading, setData } = useData();

  const filteredStudents = data.filter((account) => account.role === "student");
  const filteredFaculty = data.filter((account) => account.role === "faculty");
  const filteredStaff = data.filter((account) => account.role === "staff");
  const filteredIssuedId = data.filter((account) => account.isIdIssued === true );
  const filteredNonIssuedId = data.filter((account) => account.isIdIssued === false);

  return (
    <>
      <Tabs colorScheme="purple" variant="enclosed">
        <TabList py={10} px={5} bg="#e9e8df" boxShadow="md">
          <Tab _selected={{ color: "blue.700", bg: "#FFD700" }}>
            Active User
          </Tab>
          <Tab _selected={{ color: "blue.700", bg: "#FFD700" }}>ID Status</Tab>


        </TabList>

        <TabPanels>
          <TabPanel>
            <List>
              <ListItem>
                <ActiveUser
                  filteredStudents={filteredStudents}
                  filteredFaculty={filteredFaculty}
                  filteredStaff={filteredStaff}
                />
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel>
            <List>
              <ListItem>
              <ActiveId filteredIssuedId={filteredIssuedId} filteredNonIssuedId={filteredNonIssuedId}/>
              </ListItem>
            </List>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default GraphsAndAnalytics;
