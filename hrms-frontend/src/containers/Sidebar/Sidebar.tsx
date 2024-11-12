"use client";
import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  ScrollArea,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import {
  IconAlignBoxLeftStretch,
  IconCalendarMonth,
  IconCalendarStats,
  IconChevronRight,
  IconUsersGroup,
} from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import { usePathname, useRouter } from "next/navigation";

interface LinkItem {
  label: string;
  link?: string;
  icon: React.FC<any>;
  links?: { label: string; link: string }[];
  initiallyOpened?: boolean;
  data?: any;
}

interface NavbarProps {
  linksData: LinkItem[];
  toggltSidebar: () => void;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  data,
  link,
  toggltSidebar,
}: LinkItem & { toggltSidebar: () => void }) {
  const pathname = usePathname();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const router = useRouter();

  const handleNavigation = (itemLink: string | undefined) => {
    if (itemLink) {
      router.push(itemLink);
      toggltSidebar();
    }
  };

  const items = (hasLinks ? links : []).map((subLink) => (
    <Text<"a">
      component="a"
      className={classes.link}
      href={subLink.link}
      key={subLink.label}
      onClick={(event) => {
        event.preventDefault();
        handleNavigation(subLink.link);
      }}
    >
      {subLink.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => {
          if (!hasLinks) {
            handleNavigation(link);
          } else {
            setOpened((o) => !o);
          }
        }}
        className={pathname === link ? classes.pathcontrol : classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <Box className="flex">
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? "rotate(-90deg)" : "none",
                }}
              />
            </Box>
          )}
        </Group>
      </UnstyledButton>

      {hasLinks && <Collapse in={opened}>{items}</Collapse>}
    </>
  );
}

export function Navbar({ linksData, toggltSidebar }: NavbarProps) {
  const links = linksData.map((item) => (
    <LinksGroup {...item} key={item.label} toggltSidebar={toggltSidebar} />
  ));

  return (
    <div className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </div>
  );
}

const mockdata = [
  { label: "Dashboard", icon: IconAlignBoxLeftStretch, link: "/dashboard" },
  {
    label: "Employees",
    icon: IconUsersGroup,
    link: "/employees",
  },

  {
    label: "Leaves Management",
    icon: IconCalendarStats,
    links: [
      { label: "Leaves", link: "/leavepolicies/leaves" },
      { label: "Type", link: "/leavepolicies/typepolicies" },
      { label: "Policies", link: "/leavepolicies/leavespolicies" },
    ],
  },
  {
    label: "Holiday Calendar",
    icon: IconCalendarMonth,
    link: "/holidays",
  },
];

export default function Sidebar({
  toggltSidebar,
}: {
  toggltSidebar: () => void;
}) {
  return <Navbar linksData={mockdata} toggltSidebar={toggltSidebar} />;
}
