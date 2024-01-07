import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {auth} from "./firebase";
import DailyButton from "./DailyButton";
import logo from "./assets/favicon.ico";
import ChangelogModal from "./ChangelogModal.js";

import {
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    VStack,
    MenuDivider,
    Tooltip,
    Text,
    Box,
    Divider,
    Center,
    Badge,
    Button,
    Stack,
    useDisclosure
} from "@chakra-ui/react";

export default function Navbar({userData, updatedConfig}) {
    const [user, setUser] = useState(null);

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, [auth]);

    function changeLocation() {
        const currentLocation = window.location.pathname;
        if (currentLocation === "/") {
            window.location.replace(`/`);
        }
    }

    //eslint-disable-next-line
    return (
        <Box as={'nav'} bgColor={updatedConfig["themeBackground"]} width={['150vw', '100%', '100%', '100%']}
             className="nav"
        >
            <Box display={'flex'} justifyContent={['initial', 'center', 'center', 'center']}>
                <Box display={'flex'} width={['70%', '90%', '90%', '70%']} justifyContent={'space-between'}>

                    <Box className="Logo whiteText" fontWeight="500">
                        <NavLink onClick={changeLocation} to="/" className="site-title">
                            <Box fontSize="24px" className="Logo">
                                {" "}
                                <Text color={updatedConfig["mainText"]}>hackertype </Text>
                            </Box>
                        </NavLink>
                        <NavLink onClick={changeLocation} to="/" className="site-title">
                            <Text fontSize="24px" color={updatedConfig["logoColor"]} marginLeft="-11px">
                                .
                            </Text>
                            <Text
                                fontSize="23px"
                                mt={'1px'}
                                onClick={changeLocation}
                                color={updatedConfig["logoColor"]}
                                marginLeft="-4px">
                                dev
                            </Text>
                        </NavLink>

                        <Divider marginLeft="10px" marginRight="10px"/>
                    </Box>
                    <Box fontWeight={"500"} display={["none", "none", "inline-block"]}>
                        <ul>
                            <Tooltip label={user ? "daily solution" : "log in to save your streak"}>

                                <li>
                                    <DailyButton config={updatedConfig} user={userData}/>
                                </li>
                            </Tooltip>

                            <li>
                                <NavLink to={'/settings'}>
                                    <Text fontSize="16px" paddingRight="5px" textColor="">
                                        &lt;settings&gt;
                                    </Text>

                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/recent">
                                    <VStack>
                                        <Text fontSize="16px" paddingRight="5px"
                                        >
                                            &lt;recent&gt;


                                        </Text>

                                    </VStack>
                                </NavLink>
                            </li>


                            <li>
                                <NavLink to="/about">&lt;about&gt;</NavLink>
                            </li>
                            <li>
                                <Stack direction="row">
                                    {!user && (
                                        <NavLink to="/login">
                                            <Text marginTop="6px" fontSize="16px" paddingRight="5px" textColor="">
                                                &lt;log in&gt;
                                            </Text>
                                        </NavLink>
                                    )}
                                    {user && (
                                        <Box fontSize="40px" paddingTop="9px">
                                            <NavLink to={`/profile/${user.displayName}`}>
                                                <li>
                                                    <Text marginTop="-3px" fontSize="16px" paddingRight="5px"
                                                          textColor="">
                                                        &lt;{user.displayName}&gt;
                                                    </Text>
                                                </li>
                                            </NavLink>
                                        </Box>
                                    )}

                                </Stack>
                            </li>

                        </ul>
                    </Box>
                    <Box
                        paddingTop="5px"
                        paddingRight="20px"
                        opacity="1"
                        color={updatedConfig["mainText"]}
                        display={["block", "block", "none"]}
                    >
                        <Menu>
                            <MenuButton

                                as={Text}
                                fontSize="27px"
                                fontWeight="400"
                                color={updatedConfig["mainText"]}
                                _hover={{color: "#5180c4"}}
                                cursor={"pointer"}
                            >
                                &#9776;
                            </MenuButton>
                            <MenuList color={updatedConfig["mainText"]} zIndex="101"
                                      bg={updatedConfig["themeBackground"]}>
                                <MenuItem bg={updatedConfig["themeInactiveButton"]}>
                                    <Box minW="100%" as="a" href="/">
                                        home
                                    </Box>
                                </MenuItem>
                                <MenuDivider/>
                                <MenuItem bg={updatedConfig["themeInactiveButton"]}>
                                    <Box minW="100%" as="a" href="/settings">
                                        settings
                                    </Box>
                                </MenuItem>
                                <MenuDivider/>

                                <MenuItem bg={updatedConfig["themeInactiveButton"]}>
                                    <Box minW="100%" as="a" href="/about">
                                        about
                                    </Box>
                                </MenuItem>
                                <MenuDivider/>
                                <MenuItem bg={updatedConfig["themeInactiveButton"]}>
                                    <Box minW="100%" as="a" href="/recent">
                                        recent
                                    </Box>
                                </MenuItem>
                                <MenuDivider/>
                                <MenuItem bg={updatedConfig["themeInactiveButton"]}>
                                    {!user && (
                                        <Box minW="100%" as="a" href="/login">
                                            log In
                                        </Box>
                                    )}
                                    {user && (
                                        <Box minW="100%" as="a" href={`/profile/${user.displayName}`}>
                                            {user.displayName}
                                        </Box>
                                    )}


                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>
            </Box>
        </Box>

    );
}
