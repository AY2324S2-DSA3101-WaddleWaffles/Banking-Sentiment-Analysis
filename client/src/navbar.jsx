import React from 'react';
import { UnstyledButton, Stack, rem } from '@mantine/core';
import { IconMap2, IconLayoutDashboard,IconReport, IconLogout } from '@tabler/icons-react';
//import classes from './Navbar.module.css';

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
  { label: 'Statistics' },
  { label: 'Product Reviews' },
];

export function NavbarMinimal({setActiveTab, activeTab, onExitClick}) {

  const links = labels.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === activeTab}
      onClick={() => setActiveTab(index)}
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