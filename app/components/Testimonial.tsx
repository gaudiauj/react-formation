import {
  Text,
  HStack,
  Flex,
  Box,
  Avatar,
  Icon,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { ImQuotesRight } from "react-icons/im";
import { Rating } from "react-simple-star-rating";

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
              <Text fontWeight="bold" fontSize="lg">
                {testimonial.username}{" "}
                <Rating
                  initialValue={testimonial.note}
                  readonly
                  allowFraction
                  SVGstyle={{ display: "inline-block" }}
                />
              </Text>
              <Text fontSize="md">
                {testimonial.position} chez{" "}
                <Link href={testimonial.link}>{testimonial.company}</Link>
              </Text>
            </Flex>
          </HStack>
          <Icon as={ImQuotesRight} w={8} h={8} />
        </Flex>
      </Flex>
    </>
  );
};

export default Testimonials;
