import { UnlockIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Box,
  Text,
  Spacer,
  HStack,
  useToast,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
export default function Navbar() {
  const [owner, setOwner] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  // Owner profile
  useEffect(() => {
    setIsLoading(true);

    fetch("https://api.github.com/users/LivingHopeDev")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setOwner(data);
      })
      .catch((error) => {
        toast({
          title: "Error while fetching",
          description: ` ${error.message}`,
          duration: 5000,
          isClosable: true,
          status: "error",
          position: "top",
        });
      });
  }, [toast]);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Flex as="nav" p="10px" mb="5rem" alignItems="center">
      <Heading as="h1">Available Repositories</Heading>
      <Spacer />
      <HStack spacing="20px">
        <Avatar name="Adetayo" src={owner.avatar_url}></Avatar>

        <Text>{owner.login}</Text>
      </HStack>
    </Flex>
  );
}
