"use client"
import { MantineCard } from "@/components/Card/Card";
import { FeaturesCards } from "@/components/Card/FeaturesCards";
import { NavbarNested } from "@/components/navbar/NavbarNested";
import { Button, Flex } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const Dashboard = () => {
    return (
        <div>
            <Flex
                // mih={50}
                // gap="lg"
                justify="flex-end"
                align="center"
                direction="row"
                wrap="wrap"
                py={{ base: 'xs', sm: 'md', lg: 'md' }}
            >
                <Button
                    variant="light"

                    rightSection={<IconPlus size={14} />}
                >
                    Add Employee
                </Button>

            </Flex>
            <Flex
                mih={50}
                gap="lg"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
            >
                <MantineCard />
                <MantineCard />
                <MantineCard />

            </Flex>
            <Flex
                mih={50}
                gap="sm"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
            >
                <FeaturesCards />
            </Flex>
        </div>
    )
}

export default Dashboard;