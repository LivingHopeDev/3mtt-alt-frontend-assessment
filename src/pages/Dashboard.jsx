import { Avatar, CardBody, HStack, Skeleton, Stack } from "@chakra-ui/react";
import {
  SimpleGrid,
  Card,
  CardHeader,
  Flex,
  Box,
  useToast,
  useDisclosure,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../Pagination.css";
import AddRepoModal from "../components/AddRepoModal";
import axios from "axios";
export default function Dashboard() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [reposPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accessToken = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const fetchRepos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/users/LivingHopeDev/repos?cachebust=${Math.random()}`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setRepos(response.data);
        setFilteredRepos(response.data);
        console.log(response.data);
      } catch (error) {
        toast({
          title: "Error while fetching",
          description: error.message,
          duration: 5000,
          isClosable: true,
          status: "error",
          position: "top",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const indexOfLastRepo = (currentPage + 1) * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos =
    filteredRepos.length > 0
      ? filteredRepos?.slice(indexOfFirstRepo, indexOfLastRepo)
      : [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    const filtered = repos.filter((repo) =>
      repo.name.toLowerCase().includes(searchTerm)
    );
    setFilteredRepos(filtered);
  };

  const handlePageChange = ({ selected }) => {
    window.scrollTo(0, 0);
    setCurrentPage(selected);
  };

  if (isLoading) {
    return (
      <Stack mt="6rem">
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb={4} mt="7rem">
        <Input
          placeholder="Search repositories"
          value={searchTerm}
          onChange={handleSearch}
          w={{ base: "100%", md: "40%" }}
          mr={4}
        />
        <Button colorScheme="purple" onClick={onOpen}>
          Add New Repo
        </Button>
        <AddRepoModal isOpen={isOpen} onClose={onClose} />
      </Flex>

      <SimpleGrid spacing={10} minChildWidth="300px">
        {currentRepos &&
          currentRepos.map((repo) => (
            <Card
              key={repo.id}
              borderTop="8px"
              borderColor="purple.400"
              bg="white"
            >
              <CardHeader>
                <Flex gap={5} alignItems="center">
                  <Avatar name="github-logo" src="/github-logo.png" />
                  <Box>
                    <Text as="h2" size="sm" _hover={{ color: "teal.700" }}>
                      <Link to={`/repo-details/${repo.name}`}>{repo.name}</Link>
                    </Text>
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <HStack>
                  <Text
                    border="1px"
                    borderRadius="md"
                    p="6px"
                    bg="purple.400"
                    color="white"
                  >
                    {repo.visibility}
                  </Text>
                  <Text
                    border="2px"
                    borderRadius="md"
                    borderColor="purple.400"
                    p="6px"
                    ml={4}
                  >
                    {repo.language}
                  </Text>
                </HStack>
              </CardBody>
            </Card>
          ))}
      </SimpleGrid>
      <ReactPaginate
        pageCount={Math.ceil(repos.length / reposPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
}
