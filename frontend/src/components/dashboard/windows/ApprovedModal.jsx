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
import { useData } from "../../context/FetchAccountContext";
import { updateAccountAPI } from "../../api/AccountsApi";

const ApprovedModal = ({ isOpen, approved, onClose }) => {
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
          position: 'top',
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
      <ModalContent>
        <ModalHeader>Approved Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center" fontSize="20px" pb={5}>Are you sure you want to approved?</Text>
          <Flex justify="center"  gap={2}>
            <Button bg="blue.500"  _hover={{bg:'blue.400'}} onClick={handleToApproved} isLoading={isLoading}>Yes</Button>

            <Button bg="blue.500" _hover={{bg:'blue.400'}}>No</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ApprovedModal;
