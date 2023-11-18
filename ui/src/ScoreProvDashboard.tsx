import { useState } from "react";

import { Card, CardHeader, CardBody, Heading, Input, Button, Box, Flex, Text } from "@chakra-ui/react";
import { ethers } from "ethers";

import { attestMatchScore } from "./lib/lib";

const provider = new ethers.BrowserProvider(window.ethereum);

function ScoreProviderDashboard() {
  const [attestationUID, setAttestationUID] = useState("");
  const [schemaUID, setSchemaUID] = useState("");
  const [sportId, setSportId] = useState("");
  const [matchId, setMatchId] = useState("");
  const [team1Id, setTeam1Id] = useState("");
  const [team2Id, setTeam2Id] = useState("");
  const [team1Score, setTeam1Score] = useState("");
  const [team2Score, setTeam2Score] = useState("");

  // TODO open modal?
  const handleAttestMatchScore = async () => {
    const signer = await provider.getSigner();

    console.log(schemaUID);
    console.log(sportId);
    console.log(matchId);
    console.log(team1Id);
    console.log(team2Id);
    console.log(team1Score);
    console.log(team2Score);
    const aUID = await attestMatchScore(signer, {
      schemaUID: schemaUID,
      sportId: parseInt(sportId),
      matchId: parseInt(matchId),
      team1Id: parseInt(team1Id),
      team2Id: parseInt(team2Id),
      team1Score: parseInt(team1Score),
      team2Score: parseInt(team2Score),
    });

    setAttestationUID(aUID);
  };

  return (
    <Box>
      <Heading size="md" mb="4">
        Score Provider Dashboard
      </Heading>

      <Card>
        <CardHeader>
          <Heading size="md">Attest Score</Heading>
        </CardHeader>

        <CardBody>
          <Flex flexDir="column">
            <Input
              mt="2"
              maxWidth="lg"
              placeholder="Schema UID"
              onChange={(e) => {
                setSchemaUID(e.target.value);
              }}
            />
            <Input
              mt="2"
              maxWidth="lg"
              placeholder="Sport Id"
              onChange={(e) => {
                setSportId(e.target.value);
              }}
            />
            <Input
              mt="2"
              maxWidth="lg"
              placeholder="Match Id"
              onChange={(e) => {
                setMatchId(e.target.value);
              }}
            />
            <Input
              mt="2"
              maxWidth="lg"
              placeholder="Team 1 Id"
              onChange={(e) => {
                setTeam1Id(e.target.value);
              }}
            />
            <Input
              mt="2"
              maxWidth="lg"
              placeholder="Team 2 Id"
              onChange={(e) => {
                setTeam2Id(e.target.value);
              }}
            />
            <Input
              mt="2"
              maxWidth="lg"
              placeholder="Team 1 Score"
              onChange={(e) => {
                setTeam1Score(e.target.value);
              }}
            />

            <Input
              mt="2"
              maxWidth="lg"
              placeholder="Team 2 Score"
              onChange={(e) => {
                setTeam2Score(e.target.value);
              }}
            />
          </Flex>

          <Text mt={6}>Attestation UID: {attestationUID}</Text>
          <Button mt="1"  onClick={handleAttestMatchScore}>
            Attest Match Score
          </Button>
        </CardBody>
      </Card>
    </Box>
  );
}

export default ScoreProviderDashboard;
