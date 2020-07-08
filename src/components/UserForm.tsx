import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  IconButton,
  Button,
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
import { User, UserFormValues } from "../typings";
import { UserFormCard } from "./UserFormCard";
import { UserFormField } from "./UserFormField";

interface UserFormParams {
  title: string;
  user?: User;
  onSubmit: (user: UserFormValues) => void;
}

export function UserForm({ title, user, onSubmit }: UserFormParams) {
  return (
    <Formik
      initialValues={user || {}}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          component="form"
          // TODO: Fix typings
          onSubmit={handleSubmit as any}
        >
          <AppBar position="static" color="inherit">
            <Toolbar>
              <IconButton edge="start" component={Link} to="/">
                <ArrowBack />
              </IconButton>

              <Typography variant="h6">{title}</Typography>

              <Box flexGrow={1} />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </Toolbar>
          </AppBar>

          <Box p={2} flexGrow="1" overflow="auto">
            <Grid container spacing={2}>
              <Grid item lg={4} sm={6} xs={12}>
                <UserFormCard title="General Info">
                  <UserFormField icon={Person} label="Name" name="name" />

                  <UserFormField icon={Email} label="Email" name="email" />

                  <UserFormField icon={Phone} label="Phone" name="phone" />

                  <UserFormField icon={Web} label="Website" name="website" />
                </UserFormCard>
              </Grid>

              <Grid item lg={4} sm={6} xs={12}>
                <UserFormCard title="Address">
                  <UserFormField
                    icon={LocationCity}
                    label="City"
                    name="address.city"
                  />

                  <UserFormField label="Street" name="address.street" />

                  <UserFormField label="Suite" name="address.suite" />

                  <UserFormField label="ZIP" name="address.zipcode" />
                </UserFormCard>
              </Grid>

              <Grid item lg={4} sm={6} xs={12}>
                <UserFormCard title="Company">
                  <UserFormField
                    icon={Business}
                    label="Name"
                    name="company.name"
                  />
                </UserFormCard>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Formik>
  );
}
