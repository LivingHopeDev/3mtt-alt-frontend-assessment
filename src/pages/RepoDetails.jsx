import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Flex,
  Box,
  Heading,
  HStack,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { Skeleton, Stack } from "@chakra-ui/react";
import "../Pagination.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function RepoDetails() {
  const [repoDetails, setRepoDetails] = useState([]);
  const [isLoadingDetails, setLoadingDetails] = useState(false);
  const { name } = useParams();
  const toast = useToast();
  useEffect(() => {
    if (name) {
      setLoadingDetails(true);
      fetch(`https://api.github.com/repos/LivingHopeDev/${name}`)
        .then((res) => res.json())
        .then((data) => {
          setLoadingDetails(false);
          if (data.message) {
            return toast({
              title: "404",
              description: ` ${data.message}`,
              duration: 5000,
              isClosable: true,
              status: "error",
              position: "top",
            });
          }
          setRepoDetails(data);
        })
        .catch((error) => {
          if (error.message) {
            toast({
              title: "Error while fetching",
              description: ` ${error.message}`,
              duration: 5000,
              isClosable: true,
              status: "error",
              position: "top",
            });
          }
        });
    }
  }, [name]);
  if (isLoadingDetails) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return (
    <SimpleGrid spacing={10} minChildWidth="300px" mx="auto">
      <Card borderTop="8px" borderColor="purple.400" bg="white">
        <CardHeader>
          <Flex gap={5}>
            <Box>
              <Heading as="h3" size="sm">
                {repoDetails.name}
              </Heading>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody color="gray.500">
          <Text> Description: {repoDetails.description}</Text>
          <Text> Fork: {repoDetails.forks_count}</Text>
          <Text>Language: {repoDetails.language}</Text>
          <Text>Visibility: {repoDetails.visibility}</Text>
          <Text>Stars: {repoDetails.stargazers_count}</Text>
        </CardBody>
        <Divider borderColor="gray.200" />
        <CardFooter>
          <HStack>
            <Button variant="ghost" leftIcon={<ViewIcon />}>
              Watch
            </Button>
            <Button variant="ghost" leftIcon={<EditIcon />}>
              Comment
            </Button>
          </HStack>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
}
