/** @format */

import React, { useEffect, useState } from "react";
import { EditIcon, InfoIcon } from "@chakra-ui/icons";
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
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  WrapItem,
  Spinner,
} from "@chakra-ui/react";
import { fetchAccountAPI, updateAccountAPI } from "../../../../api/AccountsApi";
import { useAuth } from "../../../../context/Auth";
import { useData } from "../../../../context/FetchAccountContext";
import useAuthStore from "../../../../../modules/auth";

export default function Settings() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    middlename: "",
    lastname: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const auth = useAuth();
  const { userId } = useAuthStore();
  const { data, loading, setData } = useData();

  const accountLogin = () => {
    return data.find((d) => d._id === userId);
  };
  const user = accountLogin();
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      email: user?.email || "", // Safely set the email if user is defined
      firstname: user?.firstname || "", // Safely set the firstname if user is defined
      middlename: user?.middlename || "", // Safely set the middlename if user is defined
      lastname: user?.lastname || "", // Safely set the lastname if user is defined
      password: user?.password || "", // Safely set the password if user is defined
    }));
  }, [user]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const body = {
      email: formData.email,
      password: formData.password,
      firstname: formData.firstname,
      middlename: formData.middlename,
      lastname: formData.lastname,
    };
    try {
      const response = await updateAccountAPI({
        _id: user._id,
        body: body,
      });

      if (response) {
        const updatedData = data.map((el) =>
          el._id === user._id ? { ...el, ...body } : el
        );
        setData(updatedData);
        toast({
          title: "Updated Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        onClose(); // Close the modal after successful update
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="60vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <>
          <>
            <SimpleGrid key={user._id}>
              <Card borderTop="8px" borderColor="purple.400" bg="white">
                <CardHeader bg="purple.100">
                  <Flex gap={2}>
                    <Box w="120px" h="100px">
                      <WrapItem>
                        <Avatar
                          size="xl"
                          name={user.firstname}
                          src={user.picture}
                        />
                      </WrapItem>
                    </Box>
                    <Box>
                      <Heading as="h3" size="sm">
                        {user.firstname}
                      </Heading>
                      <Text>{user.email}</Text>
                    </Box>
                  </Flex>
                </CardHeader>

                <Divider borderColor="gray.400" />

                <CardBody bg="purple.50">
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={InfoIcon} color="#FFD700" />
                      Name:{" "}
                      {`${user.firstname} ${user.middlename} ${user.lastname}`}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={InfoIcon} color="#FFD700" />
                      Email: {user.email}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={InfoIcon} color="#FFD700" />
                      Password: {user.password}
                    </ListItem>
                  </List>
                </CardBody>

                <Divider borderColor="gray.400" />

                <CardFooter borderBottom="8px" borderColor="purple.400">
                  <HStack>
                    <Button
                      onClick={onOpen}
                      variant="ghost"
                      leftIcon={<EditIcon />}
                    >
                      Edit Personal Details
                    </Button>
                  </HStack>
                </CardFooter>
              </Card>
            </SimpleGrid>{" "}
          </>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius="lg" boxShadow="lg">
              <ModalHeader
                bg="blue.600"
                color="white"
                fontWeight="bold"
                borderTopRadius="lg"
              >
                Personal Details
              </ModalHeader>
              <ModalCloseButton color="white" />

              <ModalBody maxW="480px" p={6}>
                <FormControl isRequired mb={4}>
                  <FormLabel color="blue.600">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    focusBorderColor="orange.400"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel color="blue.600">New Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    focusBorderColor="orange.400"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel color="blue.600">First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    placeholder="Enter your first name"
                    value={formData.firstname}
                    focusBorderColor="orange.400"
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel color="blue.600">Middle Name</FormLabel>
                  <Input
                    type="text"
                    name="middlename"
                    placeholder="Enter your middle name"
                    value={formData.middlename}
                    focusBorderColor="orange.400"
                    onChange={(e) =>
                      setFormData({ ...formData, middlename: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel color="blue.600">Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    placeholder="Enter your last name"
                    value={formData.lastname}
                    focusBorderColor="orange.400"
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  bg="orange.400"
                  color="white"
                  _hover={{ bg: "orange.500" }}
                  w="100%"
                  isLoading={isLoading}
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
