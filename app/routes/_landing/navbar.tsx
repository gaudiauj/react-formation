import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  useTheme,
  useOutsideClick,
} from "@chakra-ui/react";
import { SkipNavLink } from "@chakra-ui/skip-nav";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import Logo from "~/assets/logo";
import {
  NavLink as RemixLink,
  useLocation,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function WithSubnavigation() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const ref = useRef(null);
  useOutsideClick({
    ref,
    handler: () => onClose(),
  });
  const navigation = useNavigation();
  useEffect(() => {
    if (navigation.state === "loading") {
      onClose();
    }
  }, [navigation.state, onClose]);

  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  return (
    <>
      <Box
        as="header"
        aria-label="Navigation principal"
        position={"fixed"}
        w={"100%"}
        ref={ref}
        zIndex={9999}
      >
        <SkipNavLink>Skip to content</SkipNavLink>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
          w={"100%"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Link to="/" as={RemixLink} prefetch="intent">
              <Logo
                width="130px"
                color={useColorModeValue(
                  theme.colors.brand[500],
                  theme.colors.brand[200]
                )}
              />
            </Link>

            <Flex as="nav" display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <IconButton
              onClick={toggleColorMode}
              icon={
                colorMode === "light" ? (
                  <MoonIcon w={3} h={3} />
                ) : (
                  <SunIcon w={3} h={3} />
                )
              }
              variant={"ghost"}
              aria-label={"changer de theme"}
            />
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
      <Stack h={"60px"} />
    </>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const location = useLocation();

  return (
    <Stack direction={"row"} spacing={4} as="ul" style={{ listStyle: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} as="li" display={"flex"} alignItems="center">
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                as={RemixLink}
                prefetch="intent"
                to={navItem.children ? "#" : navItem.href}
                fontSize={"sm"}
                fontWeight={500}
                onClick={(e) => {
                  if (navItem.children) {
                    e.preventDefault();
                  }
                }}
                color={linkColor}
                _activeLink={{ fontWeight: navItem.children ? "" : "bold" }}
                sx={{
                  fontWeight:
                    navItem.children &&
                    location.pathname.includes(navItem.href || "")
                      ? "bold"
                      : "",
                }}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
                {navItem.children && (
                  <ChevronDownIcon marginLeft={2}></ChevronDownIcon>
                )}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const textColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Link
      to={href || ""}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("brand.100", "brand.700") }}
      _activeLink={{ fontWeight: "bold" }}
      as={RemixLink}
      prefetch="intent"
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text transition={"all .3s ease"} color={textColor}>
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
      as="nav"
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const textColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Stack spacing={4} onClick={() => children && onToggle()}>
      <Flex
        py={2}
        as={RemixLink}
        to={children ? "#" : href}
        onClick={(e) => {
          if (children) {
            e.preventDefault();
          }
        }}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "underline",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                py={2}
                to={child.href || ""}
                as={RemixLink}
                color={textColor}
                prefetch="intent"
                _activeLink={{ fontWeight: "bold" }}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Mentorat",
    href: "/mentorat",
    children: [
      {
        label: "Mentorat",
        href: "mentorat/index",
      },
      {
        label: "Qu'attendre du mentorat ?",
        href: "mentorat/liste",
      },
      {
        label: "Prix",
        href: "mentorat/prix",
      },
    ],
  },
  {
    label: "La formation",
    href: "/formations",
    children: [
      {
        label: "Plan de la formation",
        href: "formations/plan",
      },
      {
        label: "Formation FAQ",
        href: "formations/faq",
      },
      {
        label: "Prix",
        href: "formations/prix",
      },
    ],
  },
  {
    label: "Qui somme nous ?",
    href: "/about",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Nous contacter",
    href: "/contact",
  },
];
