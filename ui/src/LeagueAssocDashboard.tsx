import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  Box,
  Flex,
  Input,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { createMatchResultSchema } from "./lib/lib";

const provider = new ethers.BrowserProvider(window.ethereum);

function LeagueAssocDashboard() {
  const [connectedAddress, setAddress] = useState("");
  const [matchResultSchemaUID, setMatchResultSchemaUID] = useState("");

  const handleConnect = async () => {
    const signer = await provider.getSigner();
    const connectedAddress = signer.address;
    setAddress(connectedAddress);
  };

  const handleCreateMatchResultSchema = async () => {
    const signer = await provider.getSigner();
    const schemaUID = await createMatchResultSchema(signer);
    setMatchResultSchemaUID(schemaUID);
  };

  return (
    <Box>
      <Flex>
        <Heading size="md" mb="4">
          League Association Dashboard
        </Heading>
      </Flex>

      <Box>
        <Button colorScheme="blue" onClick={handleConnect}>
          Connect Wallet
        </Button>
        <Text>{connectedAddress}</Text>
      </Box>

      <Card mt="4">
        <CardHeader>
          <Heading size="sm">Create Match Result Schema</Heading>
        </CardHeader>
        <CardBody>
          <UnorderedList>
            <ListItem>Sport Type</ListItem>
            <ListItem>Match Id</ListItem>
            <ListItem>Team 1 Id</ListItem>
            <ListItem>Team 2 Id</ListItem>
            <ListItem>Team 1 Score</ListItem>
            <ListItem>Team 2 Score</ListItem>
          </UnorderedList>
          <Text mt="6">Create Match Result Schema</Text>
          <Text>Schema UID: {matchResultSchemaUID}</Text>
          <Button mt="1" onClick={handleCreateMatchResultSchema}>
            Create Schema
          </Button>
        </CardBody>
      </Card>

      <Card mt="4">
        <CardHeader>
          <Heading size="sm">Attest Score Provider Address</Heading>
        </CardHeader>
        <CardBody>
          <Input mt="2" placeholder="Score Provider Address" />
          <Button mt={6}>Authorization</Button>
        </CardBody>
      </Card>
    </Box>
  );
}

export default LeagueAssocDashboard;
