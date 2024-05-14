import { useState, useEffect } from "react";
import { Box, Center, Text } from "@chakra-ui/react";

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    // Custom fallback UI
    return (
      <Center height="70vh">
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold">
            Ooops! Something went wrong. It&apos;s not your fault.
          </Text>
        </Box>
      </Center>
    );
  }

  return <>{children}</>;
}

export default ErrorBoundary;
