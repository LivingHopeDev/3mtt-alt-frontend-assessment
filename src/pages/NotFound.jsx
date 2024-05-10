import { Box, Heading, Text, Button, Card } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Card>
        <Heading as="h1" size="xl">
          Oops! Lost in the cosmos?
        </Heading>
        <Text fontSize="lg" mt={4}>
          We can't seem to find the page you're looking for. It may have been
          removed or the URL might be incorrect.
        </Text>
        <Button
          m={8}
          w="50%"
          mx="auto"
          colorScheme="purple"
          variant="outline"
          as="a"
          href="/"
        >
          Take me home
        </Button>
      </Card>
    </Box>
  );
};

export default NotFound;
