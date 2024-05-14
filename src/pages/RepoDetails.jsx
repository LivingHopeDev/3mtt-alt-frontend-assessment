import { EditIcon, Icon, DeleteIcon } from "@chakra-ui/icons";
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
  useDisclosure,
} from "@chakra-ui/react";
import { Skeleton, Stack } from "@chakra-ui/react";
import "../Pagination.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTimeDifference } from "../../timeConverter";
import EditRepo from "../components/EditRepo";
import axios from "axios";

export default function RepoDetails() {
  const [repoDetails, setRepoDetails] = useState([]);
  const [isLoadingDetails, setLoadingDetails] = useState(false);
  const { name } = useParams();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const accessToken = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    if (name) {
      setLoadingDetails(true);
      axios
        .get(`https://api.github.com/repos/LivingHopeDev/${name}`)
        .then((response) => {
          setLoadingDetails(false);
          const data = response.data;
          if (data.message) {
            toast({
              title: "Server error",
              description: ` ${data.message}`,
              duration: 5000,
              isClosable: true,
              status: "error",
              position: "top",
            });
          } else {
            setRepoDetails(data);
          }
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
    }
  }, [name, toast]);

  const handleDelete = async (e, name) => {
    e.preventDefault();
    console.log("name", name);
    try {
      const response = await axios.delete(
        `https://api.github.com/repos/LivingHopeDev/${name}`,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );
      if (response) {
        toast({
          title: "Successful",
          description: "Repository deleted",
          duration: 5000,
          isClosable: true,
          status: "success",
          position: "top",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Error occured: Repository not deleted",
        description: ` ${error.message}`,
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "top",
      });
    }
  };
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
        {repoDetails.name && repoDetails.name.includes("example") && (
          <CardFooter>
            <HStack>
              <Button variant="ghost" leftIcon={<EditIcon />} onClick={onOpen}>
                Edit
              </Button>
              <EditRepo
                isOpen={isOpen}
                onClose={onClose}
                repoDetails={repoDetails}
              />
              <Button
                variant="ghost"
                leftIcon={<DeleteIcon />}
                bg="red"
                onClick={(e) => handleDelete(e, repoDetails.name)}
              >
                Delete
              </Button>
            </HStack>
          </CardFooter>
        )}
      </Card>
    </SimpleGrid>
  );
}
