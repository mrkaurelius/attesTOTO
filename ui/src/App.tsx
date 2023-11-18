import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LeagueAssocDashboard from "./LeagueAssocDashboard";
import ScoreProviderDashboard from "./ScoreProvDashboard";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Tabs>
        <TabList>
          <Tab>League Association</Tab>
          <Tab>Score Provider</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LeagueAssocDashboard></LeagueAssocDashboard>
          </TabPanel>
          <TabPanel>
            <ScoreProviderDashboard></ScoreProviderDashboard>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default App;
