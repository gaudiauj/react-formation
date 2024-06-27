import {
  Text,
  HStack,
  Flex,
  Box,
  Avatar,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface TestimonialAttributes {
  username: string;
  position: string;
  company: string;
  content: string;
  image?: string;
  note: number;
  link: string;
}

const Testimonials = (testimonial: TestimonialAttributes) => {
  return (
    <>
      <Flex direction="column" maxW={"600px"}>
        <Box
          p={5}
          bg={useColorModeValue("gray.50", "gray.900")}
          borderTopLeftRadius="lg"
          borderTopRightRadius="lg"
          border={"1px solid #e2e8f0"}
          borderBottom={"0px solid"}
        >
          {testimonial.content}
        </Box>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p={5}
          bg={useColorModeValue("brand.50", "brand.700")}
          borderBottomLeftRadius="lg"
          borderBottomRightRadius="lg"
        >
          <HStack spacing={2}>
            <Avatar name={testimonial.username} src={testimonial.image} />

            <Flex direction="column">
              <Text fontWeight="bold" fontSize="lg" display="flex" gap={"12px"}>
                {testimonial.username}
                <Flex
                  justifyContent={"center"}
                  alignItems="center"
                  color={"yellow"}
                  as="span"
                >
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </Flex>
              </Text>
              <Text fontSize="md">
                {testimonial.position} chez{" "}
                <Link href={testimonial.link}>{testimonial.company}</Link>
              </Text>
            </Flex>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Testimonials;
