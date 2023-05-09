'use client'
import { AppShell } from "@mantine/core";
import HeaderMenu from "./Header/HeaderMenu";
import { useStyles } from "./MainShellStyle";

export default function MainShell({children}) {

  const { classes, theme } = useStyles();
    return (
        
          <AppShell className={classes.body} header={<HeaderMenu/>}>
            {children}
          </AppShell>
        
      );

}