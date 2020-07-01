import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  Business,
  Email,
  LocationCity,
  Person,
  Phone,
  Web,
  ArrowBack,
} from "@material-ui/icons";
import { User } from "../api";
import { UserFormCard } from "./UserFormCard";
import { UserFormField } from "./UserFormField";

interface UserFormParams {
  title: string;
  user?: User;
}

export function UserForm({ title, user }: UserFormParams) {
  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton edge="start" component={Link} to="/">
            <ArrowBack />
          </IconButton>

          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>

      <Box p={2} flexGrow="1" overflow="auto">
        <Grid container spacing={2}>
          <Grid item lg={4} sm={6} xs={12}>
            <UserFormCard title="General Info">
              <UserFormField icon={Person} label="Name" />

              <UserFormField icon={Email} label="Email" />

              <UserFormField icon={Phone} label="Phone" />

              <UserFormField icon={Web} label="Website" />
            </UserFormCard>
          </Grid>

          <Grid item lg={4} sm={6} xs={12}>
            <UserFormCard title="Address">
              <UserFormField icon={LocationCity} label="City" />

              <UserFormField label="Street" />

              <UserFormField label="Suite" />

              <UserFormField label="ZIP" />
            </UserFormCard>
          </Grid>

          <Grid item lg={4} sm={6} xs={12}>
            <UserFormCard title="Company">
              <UserFormField icon={Business} label="Name" />
            </UserFormCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
