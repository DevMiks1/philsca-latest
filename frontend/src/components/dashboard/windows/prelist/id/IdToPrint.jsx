/** @format */

import React, { useState, useRef } from "react";
import { Box, useToast } from "@chakra-ui/react";
import logo from "../../../../../assets/philscalogo.png";
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

export default function IdModal({ isOpen, onClose, data, setData, student }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const componentRef = useRef();
  const showPrintButton = data.some((item) => !item.isIdIssued);
  const formatPhoneNumber = (number) => {
    // Pad the number to ensure it's 11 digits
    const paddedNumber = number.padStart(11, "0");
    // Format the number as 0943-348-5534
    return `${paddedNumber.slice(0, 4)}-${paddedNumber.slice(
      4,
      7
    )}-${paddedNumber.slice(7)}`;
  };
  const date = new Date(student.birthdate);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div ref={componentRef}>
            {/* Front Card */}
            <Card maxW="sm" bg="#050C9C" border="2px" borderRadius="lg" mb={4}>
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
                      <Heading
                        size="md"
                        color="black"
                      >{`${student.firstname} ${student.middlename} ${student.lastname}`}</Heading>
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

            {/* Back Card */}
            <Card maxW="sm" border="2px" borderRadius="lg">
              <CardBody px={2}>
                <div className="flex pb-2">
                  <p className="w-[35%] font-[500]">DATE OF BIRTH: </p>
                  <p className="w-[65%] font-[600]">{student.birthdate ? formattedDate : 'EMPTY'}</p>
                </div>
                <div className="border-2 border-black">
                  <div className="bg-black text-white">
                    <p className="px-2">IN CASE OF EMERGENCY PLS. NOTIFY</p>
                  </div>
                  <div className="px-2">
                    <div className="flex gap-2">
                      <p className=" font-[500]">Name: </p>
                      <p className=" font-[600]">{student.contactperson}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className=" font-[500]">Address: </p>
                      <p className=" font-[600]">{student.address}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className=" font-[500]">Tel. No.: </p>
                      <p className=" font-[600]">
                        {student.contactpersonnumber
                          ? formatPhoneNumber(student.contactpersonnumber)
                          : "EMPTY"}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="pt-[1.5rem] text-[1.2rem] font-[600] text-center">
                  IMPORTANT
                </p>
                <p className="px-2 font-[500] pb-[3.5rem]">
                  THIS CARD IS NON-TRANSFERABLE IT MUST BE WORN WHILE INSIDE THE
                  CAMPUS PREMISES.
                </p>
                <div className="text-center text-[.900rem] pb-[2.5rem]">
                  <p class="signature ">SIGNATURE</p>
                </div>
                <div className="text-center">
                  <p class="signature-registrar text-[.700rem] ">
                    College Registrar
                  </p>
                </div>
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
              />
            )}
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
