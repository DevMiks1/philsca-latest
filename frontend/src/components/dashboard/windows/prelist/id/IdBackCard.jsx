// BackSide.js
import React, { forwardRef } from "react";
import { Card, CardBody, Stack, Text } from "@chakra-ui/react";

export default function IdBackCard() {
  return (
    <div>
      <Card maxW="sm" bg="#050C9C" border="2px" borderRadius="lg">
        <CardBody p={0}>
          <Stack spacing="4" align="center" w="full">
            {/* Your Back Side Content */}
            <Text color="white" textAlign="center">
              Back Side Content Here
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}
