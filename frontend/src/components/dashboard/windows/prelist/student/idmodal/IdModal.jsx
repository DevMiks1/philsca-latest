import React, { useState, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import logo from "../../../../../../assets/philscalogo.png";
import ReactToPrint from "react-to-print";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  ButtonGroup,
  Avatar,
  Image,
} from "@chakra-ui/react";
import { updateAccountAPI } from "../../../../../api/AccountsApi";

export default function IdModal({ isOpen, onClose, data, setData, student }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const componentRef = useRef();
  const printRef = useRef();

  const handlePrintAndUpdateStatus = async () => {
    setIsLoading(true);
    try {
      const response = await updateAccountAPI({
        body: { isIdIssued: true },
        _id: student._id,
      });

      if (response) {
        const updatedData = data.map((el) =>
          el._id === student._id ? { ...el, isIdIssued: true } : el
        );
        setData(updatedData);
        toast({
          title: "Success",
          description: "Student's status updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the student's status.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const showPrintButton = data.some((item) => !item.isIdIssued);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Student ID</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div ref={componentRef}>
            {/* Front of the ID */}
            <Card maxW="sm" bg="#050C9C" border="2px" borderRadius="lg">
              <CardBody p={0}>
                <Stack spacing="4" align="center" w="full">
                  <Text size="xs" color="white" textAlign="center" mt="5">
                    Republic of the Philippines
                  </Text>
                  <Heading
                    size="md"
                    color="yellow.400"
                    textAlign="center"
                    mt="-4"
                  >
                    PHILIPPINE STATE COLLEGE
                  </Heading>
                  <Heading
                    size="md"
                    color="yellow.400"
                    textAlign="center"
                    mt="-4"
                  >
                    OF AERONAUTICS
                  </Heading>
                  <Text
                    fontSize="sm"
                    fontWeight="light"
                    color="white"
                    textAlign="center"
                    mt="-5"
                  >
                    Piccio Garden, Villamor. Pasay City
                  </Text>

                  <Stack
                    direction="row"
                    align="center"
                    justify="space-between"
                    bg="#507889"
                    p="4"
                    w="full"
                  >
                    <Stack align="center">
                      <Image
                        src={logo}
                        alt="Philsca Logo"
                        boxSize="100px"
                        ml={10}
                      />
                      <Text fontSize="md" color="yellow.400" ml={10}>
                        SY-2023-2024
                      </Text>
                    </Stack>
                    <Stack align="center">
                      {student.picture === "" ? (
                        <Avatar
                          src={student.picture}
                          alt="profile"
                          boxSize="100px"
                        />
                      ) : (
                        <Image
                          src={student.picture}
                          alt="profile"
                          boxSize="150px"
                          mr={4}
                        />
                      )}
                      <Text fontSize="sm" color="yellow.400">
                        1st Sem. / 2nd Sem.
                      </Text>
                    </Stack>
                  </Stack>

                  <Stack
                    align="center"
                    justify="center"
                    bg="white"
                    p="10px"
                    rounded="lg"
                    borderColor="yellow.400"
                    w="80"
                    mb={3}
                  >
                    {student.firstname === "" && student.lastname === "" ? (
                      <Text>EMPTY</Text>
                    ) : (
                      <Heading size="md" color="black">
                        {`${student.firstname} ${student.middlename} ${student.lastname}`}
                      </Heading>
                    )}

                    {student.schoolid === "" ? (
                      <Text>EMPTY</Text>
                    ) : (
                      <Text fontSize="lg" color="black">
                        {student.schoolid}
                      </Text>
                    )}

                    {student.course === "" ? (
                      <Text>EMPTY</Text>
                    ) : (
                      <Text fontSize="lg" color="black">
                        {student.course}
                      </Text>
                    )}
                  </Stack>
                </Stack>
              </CardBody>
            </Card>

            {/* Back of the ID */}
            <Card
              maxW="sm"
              bg="#050C9C"
              border="2px"
              borderRadius="lg"
              mt={5} // Add some margin between front and back
            >
              <CardBody p={0}>
                <Stack spacing="4" align="center" w="full">
                  <Text size="xs" color="white" textAlign="center" mt="5">
                    Emergency Contact Information
                  </Text>
                  <Stack
                    align="center"
                    justify="center"
                    bg="white"
                    p="10px"
                    rounded="lg"
                    borderColor="yellow.400"
                    w="80"
                    mb={3}
                  >
                    <Heading size="md" color="black">
                      {`${student.emergencyContactName}`}
                    </Heading>

                    <Text fontSize="lg" color="black">
                      {student.emergencyContactNumber}
                    </Text>

                    <Text fontSize="lg" color="black">
                      {student.emergencyContactRelation}
                    </Text>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={onClose}>
              Cancel
            </Button>
            {showPrintButton && !student.isIdIssued && (
              <ReactToPrint
                trigger={() => (
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    isLoading={isLoading}
                  >
                    Print ID
                  </Button>
                )}
                content={() => componentRef.current}
                ref={printRef}
                onAfterPrint={handlePrintAndUpdateStatus}
              />
            )}
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
