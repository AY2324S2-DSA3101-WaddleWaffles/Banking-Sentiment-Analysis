import React from 'react';
import { UnstyledButton, Stack, rem } from '@mantine/core';
import {  IconLayoutDashboard,IconReport, IconLogout } from '@tabler/icons-react';
import classes from './navbar.module.css';

function NavbarLink({ icon: Icon, label, active, onClick }) {
  return (
    <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
      <div className={classes.linkContent}>
        <div className={classes.icon}>
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        </div>
        <div className={classes.label}>{label}</div>
      </div>
    </UnstyledButton>
  );
}

const labels = [
  { icon: IconLayoutDashboard, label: 'Overview' },
  { icon: IconReport, label: 'Comparison' },
  { icon: IconReport, label: 'NewProductReviews' },
];

export function NavbarMinimal({setActiveHeaderTab, activeHeaderTab, onExitClick}) {

  const links = labels.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === activeHeaderTab}
      onClick={() => setActiveHeaderTab(link.label)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}  style={{ background: '#f5f5f5' }}>
        <Stack justify="center" gap={0}>
          {links}
          <UnstyledButton onClick={onExitClick} className={classes.link}>
            <div className={classes.linkContent}>
              <div className={classes.icon}>
                <IconLogout style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              </div>
              <div className={classes.label}>Exit</div>
            </div>
          </UnstyledButton>
        </Stack>
      </div>
    </nav>
  );
}