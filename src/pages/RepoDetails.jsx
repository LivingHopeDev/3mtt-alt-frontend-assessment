import { EditIcon, ViewIcon, Icon, DeleteIcon } from "@chakra-ui/icons";
import { GoRepoForked } from "react-icons/go";
import { MdRemoveRedEye } from "react-icons/md";
import { MdStarBorderPurple500 } from "react-icons/md";
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
  Avatar,
  Grid,
} from "@chakra-ui/react";
import { Skeleton, Stack } from "@chakra-ui/react";
import "../Pagination.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTimeDifference } from "../../timeConverter";
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
              title: "Server error",
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
    <SimpleGrid
      spacing={10}
      minChildWidth="300px"
      mx="auto"
      mt="10rem"
      maxWidth="700px"
    >
      <Card borderTop="8px" borderColor="purple.400" bg="white">
        <CardHeader>
          <Flex gap={5} justifyContent="center">
            {/* Center cardHeader content */}
            <Box>
              <Heading as="h3" size="sm">
                {repoDetails.name}
              </Heading>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody color="gray.500">
          <HStack spacing="10rem" mb="1rem">
            <Text>
              <Icon as={MdRemoveRedEye} mr={2} />
              Watchers: {repoDetails.watchers}
            </Text>
            <Text>
              <Icon as={MdStarBorderPurple500} boxSize={4} mr={2} />
              Stars: {repoDetails.stargazers_count}
            </Text>
            <Text>
              <Icon as={GoRepoForked} boxSize={4} mr={2} />
              Fork: {repoDetails.forks_count}
            </Text>
          </HStack>
          <Box>
            <Text>Description: {repoDetails.description}</Text>
          </Box>
          <HStack>
            <Text>Default branch: {repoDetails.default_branch}</Text>
            <Text>Created: {getTimeDifference(repoDetails.created_at)}</Text>
          </HStack>
        </CardBody>
        <Divider borderColor="gray.200" />
        <CardFooter>
          <HStack>
            <Button variant="ghost" leftIcon={<EditIcon />}>
              Edit
            </Button>
            <Button variant="ghost" leftIcon={<DeleteIcon />} bg="red">
              Delete
            </Button>
          </HStack>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
}
