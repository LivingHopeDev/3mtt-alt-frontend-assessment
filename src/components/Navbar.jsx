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
    <Flex
      as="nav"
      alignItems="center"
      bg="purple.400"
      width="100%"
      h="6rem"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Spacer />
      <HStack spacing="15px">
        <Avatar name="Adetayo" src={owner.avatar_url}></Avatar>

        <Text color="white" fontSize="1.5rem" fontWeight="500" mr="1rem">
          {owner.login}
        </Text>
      </HStack>
    </Flex>
  );
}
