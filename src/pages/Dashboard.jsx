import { Skeleton, Stack } from "@chakra-ui/react";
import {
  SimpleGrid,
  Card,
  CardHeader,
  Flex,
  Box,
  Heading,
  useToast,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../Pagination.css";
export default function Dashboard() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [reposPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    setIsLoading(true);

    fetch("https://api.github.com/users/LivingHopeDev/repos")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        setRepos(data);
        setFilteredRepos(data);
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

  const indexOfLastRepo = (currentPage + 1) * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = filteredRepos?.slice(indexOfFirstRepo, indexOfLastRepo);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    const filtered = repos.filter((repo) =>
      repo.name.toLowerCase().includes(searchTerm)
    );
    setFilteredRepos(filtered);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    const filtered = repos.filter((repo) => {
      console.log("language", repo.public);
      if (value === "all") return true;
      return value === "public" ? repo.public : !repo.public;
    });
    setFilteredRepos(filtered);
  };

  const handlePageChange = ({ selected }) => {
    window.scrollTo(0, 0);
    setCurrentPage(selected);
  };

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Input
          placeholder="Search repositories"
          value={searchTerm}
          onChange={handleSearch}
          w="70%"
          mr={4}
        />
        <IconButton onClick={onOpen} icon={<i className="fas fa-filter"></i>} />
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement="top">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Filter Repositories
          </DrawerHeader>
          <DrawerBody>
            <Select value={filter} onChange={handleFilterChange} mb={4}>
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="language">Language</option>
            </Select>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
                <Flex gap={5}>
                  <Box>
                    <Heading as="h3" size="sm" _hover={{ color: "teal.700" }}>
                      <Link to={`/repo-details/${repo.name}`}>{repo.name}</Link>
                    </Heading>
                  </Box>
                </Flex>
              </CardHeader>
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
