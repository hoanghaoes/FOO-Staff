// HomeScreen.js
import React from 'react';
import { Heading, Text } from 'rebass';
import {
  Hero,
  CallToAction,
  ScrollDownIndicator,
  Section,
  Checklist,
} from 'react-landing-page';

const featherCheckmark = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const HomeScreen = () => (
  <>
    <Hero
      color="black"
      bg="white"
      // backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
    >
      <Heading>FOO-Staff</Heading>
      <Text as="p" variant="subtitle">
        App Management
      </Text>
      <CallToAction href="/question" mt={3}>
        Get Started
      </CallToAction>
      <ScrollDownIndicator />
    </Hero>
    <Section
      width={1}
      heading="List of contents"
      subhead="Here"
    >
      <Checklist
        children={['Questions', 'Locations', 'Mystery Items', 'Artifacts', 'Events']}
        checkmark={featherCheckmark}
      />
    </Section>
  </>
);

export default HomeScreen;
