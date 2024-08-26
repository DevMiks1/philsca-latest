// FrontSide.js
import React, { forwardRef } from "react";
import { Card, CardBody, Stack, Heading, Text, Image, Avatar } from "@chakra-ui/react";
import logo from "../../../../../assets/philscalogo.png";

const IdFrontCard = forwardRef(({ student }, ref) => (
  <div ref={ref}>
    <Card maxW="sm" bg="#050C9C" border="2px" borderRadius="lg">
      <CardBody p={0}>
        <Stack spacing="4" align="center" w="full">
          <Text size="xs" color="white" textAlign="center" mt="5">
            Republic of the Philippines
          </Text>
          <Heading size="md" color="yellow.400" textAlign="center" mt="-4">
            PHILIPPINE STATE COLLEGE
          </Heading>
          <Heading size="md" color="yellow.400" textAlign="center" mt="-4">
            OF AERONAUTICS
          </Heading>
          <Text fontSize="sm" fontWeight="light" color="white" textAlign="center" mt="-5">
            Piccio Garden, Villamor. Pasay City
          </Text>
          <Stack direction="row" align="center" justify="space-between" bg="#507889" p="4" w="full">
            <Stack align="center">
              <Image src={logo} alt="Philsca Logo" boxSize="100px" ml={10} />
              <Text fontSize="md" color="yellow.400" ml={10}>
                SY-2023-2024
              </Text>
            </Stack>
            <Stack align="center">
              {student.picture === "" ? (
                <Avatar src={student.picture} alt="profile" boxSize="100px" />
              ) : (
                <Image src={student.picture} alt="profile" boxSize="150px" mr={4} />
              )}
              <Text fontSize="sm" color="yellow.400">
                1st Sem. / 2nd Sem.
              </Text>
            </Stack>
          </Stack>
          <Stack align="center" justify="center" bg="white" p="10px" rounded="lg" borderColor="yellow.400" w="80" mb={3}>
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
  </div>
));

export default IdFrontCard;
