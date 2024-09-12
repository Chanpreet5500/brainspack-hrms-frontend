import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
    Box,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie, IconNews, IconUserPlus } from '@tabler/icons-react';
import classes from './FeaturesCards.module.scss';

const mockdata = [
    {
        title: 'Total Employess',
        description:
            'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
        icon: IconUser,
        bgcolor: '#bfa7f9'
    },
    {
        title: 'On Leave',
        description:
            'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
        icon: IconNews,
        bgcolor: '#f4bdaa'
    },
    {
        title: 'New Joinee',
        description:
            'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
        icon: IconUserPlus,
        bgcolor: '#739590'
    },
];

export function FeaturesCards() {
    const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl" style={{ flexGrow: 1 }} >
            {/* <feature.icon
                style={{ width: rem(50), height: rem(50) }}
                // stroke={2}
                color={theme.colors.blue[6]}
            /> */}
            <Box className={classes.circularBox} style={{ backgroundColor: feature.bgcolor }}>
                {/* <IconUser size={30} /> */}
                <feature.icon
                    style={{ width: rem(30), height: rem(30) }}
                    stroke={2}
                // color={theme.colors.blue[6]}
                />
            </Box>
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" mt="sm">
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>200</span>
                <span>/400</span>
            </Text>
        </Card>
    ));

    return (
        <Container size="100%" py="xl" m={0} style={{ width: '100%' }}>
            {/* <Group justify="center">
                <Badge variant="filled" size="lg">
                    Best company ever
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
                Integrate effortlessly with any technology stack
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
                hunger drives it to try biting a Steel-type Pokémon.
            </Text> */}

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" style={{ width: '100%' }} >
                {features}
            </SimpleGrid>
        </Container>
    );
}

