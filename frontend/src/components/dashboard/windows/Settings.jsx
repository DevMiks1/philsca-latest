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
import { fetchAccountAPI, updateAccountAPI } from "../../api/AccountsApi";
import { useAuth } from "../../context/Auth";
import { useData } from "../../context/FetchAccountContext";

export default function Settings() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    middlename: "",
    lastname: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const auth = useAuth();
  const authId = auth.user._id;
  const { data, loading, setData } = useData();

  const accountLogin = () => {
    return data.find((d) => d._id === authId);
  };

  const user = accountLogin();
  console.log(user);

  const handleSubmit = async () => {
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
            <ModalContent>
              <ModalHeader>Personal Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody maxW="480px">
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <FormHelperText>Input a valid email</FormHelperText>
                </FormControl>
  
                <FormControl isRequired>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Firstname</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    placeholder="Enter your firstname"
                    value={formData.firstname}
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Middlename</FormLabel>
                  <Input
                    type="text"
                    name="middlename"
                    placeholder="Enter your middlename"
                    value={formData.middlename}
                    onChange={(e) =>
                      setFormData({ ...formData, middlename: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Lastname</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    placeholder="Enter your lastname"
                    value={formData.lastname}
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                  />
                </FormControl>
              </ModalBody>
  
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="green"
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
