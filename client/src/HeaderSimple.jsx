import { useState } from 'react';
import { Container, Group, Burger, UnstyledButton, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';
import {  IconLayoutDashboard,IconReport, IconLogout } from '@tabler/icons-react';
import gxslogo from './assets/gxs-bank-logo.png';

const labels = [
  { icon: IconLayoutDashboard, label: 'Statistics' },
  { icon: IconReport, label: 'Product Reviews' },
];

function TabLink({ icon: Icon, label, active, onClick }) {
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

export function HeaderSimple({ setActiveHeaderTab, activeHeaderTab, onExitClick }) {
  const [opened, { toggle }] = useDisclosure(false);

  const links = labels.map((link, index) => (
    <TabLink
      {...link}
      key={link.label}
      active={index === activeHeaderTab}
      onClick={() => setActiveHeaderTab(link.label)}
    />
  ));

  return (
    <div className={classes.header}>
      <Container size="100%" className={classes.inner}>
        

        {/* for the logo and heading */}
        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: "50px"}}>
          <div>
              <img src={gxslogo} alt="GXS Bank logo" style={{width: "100px", height: "auto"}}/>
          </div>

          <div>
            <h2 className={classes.h2}>Sentiment Analysis</h2>
          </div>
        </Container>

        {/* for the tabs */}
        <div className={classes.linkContent}>
          <Group gap={100} visibleFrom="xs">
            {links}
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </div>

      </Container>
    </div>


  );
}