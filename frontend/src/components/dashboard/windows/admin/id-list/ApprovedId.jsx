/** @format */

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useData } from "../../../../context/FetchAccountContext";
import { updateAccountAPI } from "../../../../api/AccountsApi";

const ApprovedModal = ({ isOpen, approved, onClose }) => {
  console.log(approved);
  const { data, setData } = useData();
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleToApproved = async () => {
    setIsLoading(true);
    try {
      const response = await updateAccountAPI({
        body: { isIdIssued: true },
        _id: approved._id,
      });

      if (response) {
        const updatedData = data.map((el) =>
          el._id === approved._id ? { ...el, isIdIssued: true } : el
        );
        setData(updatedData);
        toast({
          title: "Success",
          description: "Status Approved",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating status.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="md" boxShadow="lg">
        <ModalHeader
          textAlign="center"
          fontSize="24px"
          fontWeight="bold"
          color="blue.600"
        >
          Approved ID
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center" fontSize="1.1rem" pb={5} color="gray.700">
            {` Are you sure you want to approve the ID of ${approved.email}`}
          </Text>
          <Flex justify="center" gap={4}>
            <Button
              bg="blue.500"
              color="white"
              _hover={{ bg: "orange.400", color: "white" }}
              onClick={handleToApproved}
              isLoading={isLoading}
              borderRadius="md"
              boxShadow="sm"
              transition="background-color 0.2s"
            >
              Yes
            </Button>

            <Button
              bg="orange.400"
              color="white"
              _hover={{ bg: "orange.300" }}
              onClick={onClose}
              borderRadius="md"
              boxShadow="sm"
              transition="background-color 0.2s"
            >
              No
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ApprovedModal;
