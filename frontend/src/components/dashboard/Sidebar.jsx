/** @format */

import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaUser,
  FaChartBar,
  FaBox,
  FaUsers,
  FaList,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import Profile from "./windows/Profile";
import React from "react";
import { useAuth } from "../context/Auth";
import { useData } from "../context/FetchAccountContext";

export const SideBar = ({ setTab, tab }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useData();
  const auth = useAuth();
  const authId = auth.user._id;

  const handleTabChange = (tabName) => {
    setTab(tabName);
    onClose();
  };

  const renderLinks = (user) => {
    if (user.role === "admin" && user._id === authId) {
      return (
        <React.Fragment key={user._id}>
          {[
            { tabName: "prelist", label: "Accounts", icon: FaUser },
            { tabName: "studlistid", label: "ID List", icon: FaList },
            { tabName: "graphsandanalytics", label: "Status Panel", icon: FaChartBar },
            { tabName: "reports", label: "ID Lost Record", icon: FaFileAlt },
            { tabName: "settings", label: "Settings", icon: FaCog },
          ].map((item) => (
            <Link
              key={item.tabName}
              onClick={() => handleTabChange(item.tabName)}
            >
              <Flex
                align="center"
                gap={2}
                backgroundColor={tab === item.tabName ? "#FFD700" : ""}
                borderRadius={5}
                px={2}
                py={2}
                mb={2}
                _hover={{ bg: "#FFD700", borderRadius: 5, color:"blue.700" }}
              >
                <Icon as={item.icon} color={tab === item.tabName ? "blue.700" : ""} />
                <Text as="p" color={tab === item.tabName ? "blue.700" : ""}>{item.label}</Text>
              </Flex>
            </Link>
          ))}
        </React.Fragment>
      );
    }
    return null;
  };

  const renderUserLinks = (user) => (
    <Box key={user._id}>
      {[
        { tabName: "profile", label: "Profile", icon: FaUsers },
        { tabName: "reportid", label: "Report ID", icon: FaBox },
      ].map((item) => (
        <Link
          key={item.tabName}
          onClick={() => handleTabChange(item.tabName)}
        >
          <Flex
            align="center"
            gap={2}
            backgroundColor={tab === item.tabName ? "#FFD700" : ""}
            borderRadius={5}
            px={2}
            py={2}
            mb={2}
            _hover={{ bg: "#FFD700", borderRadius: 5 }}
          >
            <Icon as={item.icon} color={tab === item.tabName ? "blue.700" : "white"} />
            <Text as="p" color={tab === item.tabName ? "blue.700" : "white"}>{item.label}</Text>
          </Flex>
        </Link>
      ))}
    </Box>
  );

  return (
    <Box pos="fixed" left={0} top={0} bg="blue.700" color='white' h="100vh" px={3} w={{ base: "15%", lg: "20%", xl: "17%" }}>
      {/* DRAWER BUTTON */}
      <Box
        cursor="pointer"
        display={{ base: "flex", md: "block", lg: "none" }}
        justify="center"
        onClick={onOpen}
        mt={5}
        p={2}
      >
        <Icon as={FiMenu} boxSize={6} color="white" />
      </Box>

      <Flex flexDir="column" justify="space-between" h="100%" py={5}>
        <VStack display={{ base: "none", md: "none", lg: "block" }} spacing={2}>
          {data.map(renderLinks)}
          {data.filter(
            (user) => ["student", "faculty", "staff"].includes(user.role) && user._id === authId
          ).map(renderUserLinks)}
        </VStack>
        <Box display={{ base: "none", md: "none", lg: "block" }}>
          <Profile allUsers={data} authId={authId} />
        </Box>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent bg="blue.700">
            <DrawerCloseButton color="white" />
            <DrawerBody p={0}>
              <Flex flexDir="column" justify="space-between" h="100%" py={5} color="white">
                <Flex flexDir="column" mt={5} px={3}>
                  {data.map(renderLinks)}
                  {data.filter(
                    (user) => ["student", "faculty", "staff"].includes(user.role) && user._id === authId
                  ).map(renderUserLinks)}
                </Flex>
                <Box px={3}>
                  <Profile allUsers={data} authId={authId} />
                </Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};
