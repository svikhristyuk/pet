import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useAppContext } from "../AppContext";

export function UserList() {
  const { users } = useAppContext();

  return (
    <Box display="flex" flexDirection="column" width="300px" height="100%">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Users</Typography>
        </Toolbar>
      </AppBar>

      <Box
        flexGrow="1"
        overflow="auto"
        borderRight="1px solid rgba(0, 0, 0, 0.12)"
        bgcolor="#fff"
      >
        <List>
          {users.map(({ id, name }) => (
            <ListItem button key={id} component={Link} to={`/${id}`}>
              <ListItemAvatar>
                <Avatar>{name[0]}</Avatar>
              </ListItemAvatar>

              <ListItemText>
                <Box
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {name}
                </Box>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
