import { Box, Button, Flex, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { CloseIcon, EditIcon, TimeIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import ChangePassword from "./ChangePassword";
import { useData } from "../../context/FetchAccountContext";
import { updateAccountAPI } from "../../api/AccountsApi";
import { useAuth } from "../../context/Auth";

const ProfileModal = ({ setProfile, handleLogout }) => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast();

  const { data} = useData();
  const auth = useAuth();
  const authId = auth.user._id;

  const accountLogin = () => {
    return data.find((d) => d._id === authId);
  };
  const user = accountLogin();
  const changePassword = async() => {
    setIsLoading(true)
    const body = {
      password: newPassword
    }
    try {
      if (user.password !== oldPassword) {
        toast({
          title: "Make sure old password is correct",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else if(newPassword === "") {
        toast({
          title: "New Password must not empty",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else {
        const response = await updateAccountAPI({_id: user._id,body})
        if (response) {

          const newPassword = response.newData.password
          console.log(response.newData);
          setNewPassword(newPassword)
          toast({
            title: "Successfully Change Password",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom",





            
          });
          setNewPassword(""); // Reset the newPassword state
        setOldPassword(""); // Reset the oldPassword state
          onClose(); // Close the modal after successful update
        }
      }
      
    } catch (error) {
      toast({
        title: "Error",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoading(false)
    }
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      bg="white"
      color="black"
      borderRadius={8}
      boxShadow="md"
      
      py={4}
      position="absolute"
      h="150px"
      w="210px"
      right={0}
      bottom={0}
      mr={3}
      mb="7rem"
      // mb={5}
      // ml="3rem"

      zIndex={9999}
    >
      <IconButton
        aria-label="Close"
        icon={<CloseIcon />}
        size="xs"
        variant="ghost"
        colorScheme="blackAlpha"
        position="absolute"
        top="5px"
        right={0}
        mr={1}
        onClick={() => setProfile(false)}
      />

      <Box textAlign="center" mt="1.3rem">
        
        <Flex color="black" _hover={{ bg: "#FFD700",color:"blue.700", cursor: "pointer" }} onClick={onOpen} align="center" mb={3} px={3} py={2}>
          <Icon mr={5}>
            <EditIcon />
          </Icon>
          Change Password
        </Flex>
        <Flex color="black" _hover={{ bg: "#FFD700",color:"blue.700", cursor: "pointer" }} onClick={handleLogout} align="center" px={3} py={2}>
          <Icon mr={5}>
            <TimeIcon />
          </Icon>
          Logout
        </Flex>


      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxW="600px">
            
        <ChangePassword oldPassword={oldPassword} setOldPassword={setOldPassword} newPassword={newPassword} setNewPassword={setNewPassword}/>
            
          </ModalBody>

            <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>

              <Button
                colorScheme="green"
                onClick={changePassword}
                isLoading={isLoading}
              >
                Update
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileModal;
