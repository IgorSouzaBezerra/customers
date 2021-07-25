import { Avatar, Flex, Image, useDisclosure, Fade, Box } from "@chakra-ui/react";

import logImg from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";

export function Header() {
  const { isOpen, onToggle } = useDisclosure()
  const { user, Logout } = useAuth();

  function LogoutHeader() {
    Logout();
    window.location.reload();
  }

  return (
    <div>
      <Flex 
        maxW={1550} 
        margin="0 auto"
        h="150px"

        align="center"
        justify="space-between" 
      >
        <Image 
          src={logImg} 
          alt="logo" 
          w={120}
        />
        <div>
          <Flex
            onClick={onToggle}
            alignItems="center"
            p={3}
            _hover={{ bg: "#FFF" }}
            cursor="pointer"
          >
            <Avatar name={user?.name} />
              <Flex
                flexDir="column"
                align="center"
                justify="center"
                ml={3}
              >
                <p>{user?.name}</p>
                <p>{user?.email}</p>
                
              </Flex>
              
          </Flex>
          <Fade in={isOpen}>
            <Box
              p="13px 20px 13px"
              color="#969CB3"
              bg="#FFF"
              _hover={{ color: "facebook.500" }}
            >
              <Box 
                cursor="pointer"
                onClick={LogoutHeader}
              >
                Sair
              </Box>
            </Box>
          </Fade>
        </div>
      </Flex>
    </div>
  );
}
