import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

interface UserFormCardProps {
  title: string;
}

export function UserFormCard({
  title,
  children,
}: React.PropsWithChildren<UserFormCardProps>) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{title}</Typography>

        {children}
      </CardContent>
    </Card>
  );
}
