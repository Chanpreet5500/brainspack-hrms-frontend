"use client";

import { useState } from "react";
import { Group, Box, Collapse, ThemeIcon, ScrollArea, Text, UnstyledButton, rem } from "@mantine/core";
import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import { usePathname, useRouter } from "next/navigation";

interface LinkItem {
  label: string;
  link?: string;
  icon: React.FC<any>;
  links?: { label: string; link: string }[];
  initiallyOpened?: boolean;
}

interface NavbarProps {
  linksData: LinkItem[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, data }: LinkItem) {
  console.log(data, 'dfdsfdsfdsfdsfdsfsd')
  const pathname = usePathname();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const router = useRouter();
  const handleNavigation = (link: string) => {
    if (link) {
      router.push(link);
    } else {
      console.log(link)
    }
  };
  console.log()
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={pathname == data?.link ? classes.pathcontrol : classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }} onClick={() => { handleNavigation(data?.link) }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks && <Collapse in={opened}>{items}</Collapse>}
    </>
  );
}
export function Navbar({ linksData }: NavbarProps) {
  const links = linksData.map((item) => <LinksGroup {...item} key={item.label} data={item} />);
  console.log(linksData, 'hgghgfhgfhgfh')

  return (
    <div className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </div>
  );
}

const mockdata = [
  { label: "Dashboard", icon: IconCalendarStats, link: "/dashboard" },
  {
    label: "Employees",
    icon: IconCalendarStats,
    link: "/employees",
  },
  {
    label: "Leaves Management",
    icon: IconCalendarStats,
    link: "/leaves",
  },
  {
    label: "Leave Policy",
    icon: IconCalendarStats,
    links: [
      { label: "Type", link: "/leavetypes" },
      { label: "Policies", link: "/leavepolicies" },
    ],
  },
  {
    label: "Holiday Calendar",
    icon: IconCalendarStats,
    link: "/calendar",
  },
];
export default function Sidebar() {
  return <Navbar linksData={mockdata} />;
}
