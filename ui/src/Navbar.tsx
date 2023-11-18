import { Box, Flex, Text, Spacer, Image } from "@chakra-ui/react";

import easLogo from "../public/eas.png"; // Import your logo image
import chilizLogo from "../public/chiliz.svg"; // Import your logo image

function Navbar() {
  return (
    <Flex bg="teal.500" p="4" align="center">
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="white">
          attesTOTO
        </Text>
      </Box>
      <Spacer />
      {/* <Text fontSize="xl" fontWeight="bold" color="white">
        attestTOTO
      </Text> */}
      <Box>
        <Image src={chilizLogo} w={50}/>
      </Box>
      <Box>
        <Image marginLeft={4} src={easLogo} h={8}/>
      </Box>
    </Flex>
  );
}

export default Navbar;
