import { Card, CardHeader, CardBody, Heading, Text, Button, Box, Spacer, Flex, Input } from "@chakra-ui/react";

function LeagueAssocDashboard() {
  return (
    <Box>
      <Flex>
        <Heading size="md" mb="4">
          League Association Dashboard
        </Heading>

        <Spacer />
        <Button colorScheme="blue">Connect Wallet</Button>
      </Flex>

      <Card mt="4">
        <CardHeader>
          <Heading size="sm">Create Match Result Schema</Heading>
        </CardHeader>
        <CardBody>
          <Text>Create Match Result Schema using Ethereum Attestation Service</Text>
          <Input mt="2" placeholder="enter sport type: basketball, soccer, tennis ... " />
          <Input mt="2" placeholder="team1" />
          <Input mt="2" placeholder="team2" />
          <Button mt={6}>Create</Button>
        </CardBody>
      </Card>

      <Card mt="4">
        <CardHeader>
          <Heading size="sm">Create Score Provider Schema</Heading>
        </CardHeader>
        <CardBody>Create Score Provider Schema using Ethereum Attestation Service
          <Input mt="2" placeholder="xx " />

          <Button mt={6}>Authorization</Button>
         </CardBody> 
      </Card>
    </Box>
  );
}

export default LeagueAssocDashboard;
