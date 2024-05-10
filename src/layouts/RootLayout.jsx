import { Outlet } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
export default function RootLayout() {
  return (
    <Grid templateColumns="repeat(1fr)" bg="gray.50" h="100vh">
      <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 4 }} p="40px">
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  );
}
