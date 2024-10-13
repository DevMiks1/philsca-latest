/** @format */

import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { uploadAccount } from "../../../../../api/uploadAccount";

const UploadAccount = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle upload confirmation
  const handleUploadConfirm = async () => {
    if (selectedFile) {
      try {
        // Call the API to upload the account
        const response = await uploadAccount(selectedFile);
        toast({
          title: "Upload Successful",
          description: "Accounts have been uploaded successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log("Upload response:", response);
        onClose(); // Close the modal after successful upload
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: "There was an error uploading the accounts.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload File</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="file"
            accept=".xlsx, .xls" // Limit to Excel files
            onChange={handleFileChange}
            mb={4}
          />
          {selectedFile && (
            <Text>
              Selected File: <strong>{selectedFile.name}</strong>
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleUploadConfirm}
            disabled={!selectedFile}
          >
            Confirm Upload
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadAccount;
