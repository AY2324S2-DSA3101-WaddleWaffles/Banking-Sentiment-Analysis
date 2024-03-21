import React from 'react'
import './index.css'
import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
import './styles.css'

const child = <Skeleton height={140} radius="md" animate={false} />;

function Statistics() {
  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
}

export default Statistics;