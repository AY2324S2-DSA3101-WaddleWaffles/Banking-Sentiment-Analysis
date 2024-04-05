import React, { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {  IconLayoutDashboard,IconReport, IconLogout, IconArrowsRightLeft } from '@tabler/icons-react';
import classes from './navbar.module.css';

function NavbarLink({ icon: Icon, label, active, onClick }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const labels = [
    { icon: IconLayoutDashboard, label: 'Overview' },
    { icon: IconArrowsRightLeft, label: 'Comparison' },
    { icon: IconReport, label: 'Product Reviews' },
];

export default function NavbarTooltip({setActiveHeaderTab, activeHeaderTab, onExitClick}) {
  const [active, setActive] = useState(2);

  const links = labels.map((link, index) => (
    <NavbarLink
      icon={link.icon}
      label={link.label}
      key={link.label}
      active={index === activeHeaderTab}
      onClick={() => setActiveHeaderTab(link.label)}
    />
  ));

  return (
    <div className={classes.navbar}>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </div>
  );
}
