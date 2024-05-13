import {
  Input,
  Select,
  Text,
  Button,
  Modal, // Import Modal here
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditRepo({ isOpen, onClose, repoDetails }) {
  const [newRepoName, setNewRepoName] = useState(repoDetails.name || "");
  const [newRepoDescription, setNewRepoDescription] = useState(
    repoDetails.description || ""
  );
  const [newRepoVisibility, setNewRepoVisibility] = useState(
    repoDetails.visibility || "public"
  );
  const toast = useToast();
  const handleEditRepo = async (e) => {
    e.preventDefault();
    const newRepo = {
      name: newRepoName,
      description: newRepoDescription,
      visibility: newRepoVisibility,
    };
    const accessToken = import.meta.env.VITE_GITHUB_TOKEN;
    try {
      const response = await axios.patch(
        `https://api.github.com/repos/LivingHopeDev/${newRepo.name}`,
        newRepo,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );
      if (response) {
        toast({
          title: "Successful",
          description: "Repository updated",
          duration: 5000,
          isClosable: true,
          status: "success",
          position: "top",
        });
        setNewRepoName("");
        setNewRepoDescription("");
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occured: Repository not updated",
        description: ` ${error.message}`,
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "top",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Repo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleEditRepo}>
            <FormControl isRequired mb={3}>
              <FormLabel htmlFor="name">Enter Repo Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={newRepoName}
                onChange={(e) => setNewRepoName(e.target.value)}
                placeholder="Repository Name"
                focusBorderColor="purple.500"
              />
              <FormErrorMessage>Name is required</FormErrorMessage>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel htmlFor="description">Enter Description</FormLabel>
              <Textarea
                name="description"
                value={newRepoDescription}
                onChange={(e) => setNewRepoDescription(e.target.value)}
                placeholder="Description"
                focusBorderColor="purple.500"
              />
              <FormHelperText>
                A brief description of your repository.
              </FormHelperText>
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel htmlFor="visibility">Select Visibility</FormLabel>
              <Select
                name="visibility"
                value={newRepoVisibility}
                onChange={(e) => setNewRepoVisibility(e.target.value)}
                focusBorderColor="purple.500"
              >
                <option value="private" className="px-8">
                  Private
                </option>
                <option value="public" className="px-8">
                  Public
                </option>
              </Select>
              <FormErrorMessage>Visibility is required</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="purple" mt={4}>
              Edit Repository
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
