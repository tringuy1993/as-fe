'use client'
import {
  Header,
  Group,
  Button,
  Divider,
  Burger,
  Drawer,
  ScrollArea,
  ActionIcon,
  Indicator,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { BsFillPersonFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
// import { useFBAuth } from "../../login/FBAuthContext";
// import ThemeToggler from "../theme/ThemeToggle";

import { useStyles } from "./HeaderMenuStyle";
import { useFBAuth } from "@/app/(auth)/FBAuthContext";

const HeaderMenu = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { classes, theme } = useStyles();
  let { user, logoutUser } = useFBAuth();

  return (
    <>
      <Header className={classes.header}>
        <Group position="apart" sx={{ height: "100%" }}>
          <h1>
            <a href="/home" className={classes.brand}>
              Seekers
            </a>
          </h1>
          <Group className={classes.hiddenMobile}>
            <Indicator label="New">
              <a href="/home" className={classes.link}>
                Home
              </a>
            </Indicator>

            <Indicator label="New">
              <a href="/greektime" className={classes.link}>
                Time
              </a>
            </Indicator>

            <a href="/BackTest" className={classes.link}>
              Test
            </a>
            <a href="/about" className={classes.link}>
              About
            </a>
            <a href="#contact" className={classes.link}>
              Contact
            </a>
            <a href="/MusicGame" className={classes.link}>
              Music
            </a>
            {/* <ThemeToggler></ThemeToggler> */}
            {user ? (
              <ActionIcon onClick={logoutUser}>
                <IoLogOut className="icon" />
              </ActionIcon>
            ) : (
              <ActionIcon component="a" href="/signin">
                <BsFillPersonFill className="icon" />
              </ActionIcon>
            )}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Alpha-Seekers"
        className={classes.hiddenDesktop}
      >
        <ScrollArea sx={{ height: "calc(100vh-60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          ></Divider>
          <a href="/" className={classes.link}>
            Home
          </a>
          <a href="/TimeGamma" className={classes.link}>
            TimeGamma
          </a>
          <a href="/MusicGame" className={classes.link}>
            Music
          </a>
          <a href="/about" className={classes.link}>
            About
          </a>

          {/* <ThemeToggler></ThemeToggler> */}

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          ></Divider>

          <Group position="center" grow pb="xl" px="md">
            {user ? (
              <Button
                onClick={logoutUser}
                leftIcon={<IoLogOut className="icon" />}
              >
                <span>Log Out</span>
              </Button>
            ) : (
              <Button
                leftIcon={<BsFillPersonFill className="icon" />}
                component="a"
                href="/signin"
              >
                <span>Log In</span>
              </Button>
            )}
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
};

export default HeaderMenu;
