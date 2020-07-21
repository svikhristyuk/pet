import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
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
  IconButton,
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { useUsersContext } from "../UsersContex";

export function UserList() {
  const { users } = useUsersContext();
  const { path } = useRouteMatch();

  return (
    <Box display="flex" flexDirection="column" width="300px" height="100%">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Users</Typography>

          <Box flexGrow={1} />

          <IconButton
            edge="end"
            color="inherit"
            component={Link}
            to={`${path}/create`}
            data-testid="users-addButton"
          >
            <PersonAdd />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        flexGrow="1"
        overflow="auto"
        borderRight="1px solid rgba(0, 0, 0, 0.12)"
        bgcolor="#fff"
      >
        <List data-testid="users-list">
          {users.map(({ id, name }) => (
            <ListItem
              button
              key={id}
              component={Link}
              to={`${path}/${id}`}
              data-testid="users-list-item"
            >
              <ListItemAvatar data-testid="users-list-item-avatar">
                <Avatar>{name[0]}</Avatar>
              </ListItemAvatar>

              <ListItemText data-testid="users-list-item-name">
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
