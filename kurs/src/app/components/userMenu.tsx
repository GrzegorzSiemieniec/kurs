"use client";
import { forwardRef } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { Group, Avatar, Text, Menu, UnstyledButton } from "@mantine/core";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: "var(--mantine-spacing-md)",
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size="1rem" />}
      </Group>
    </UnstyledButton>
  )
);

function Demo() {
  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          name="Grzegorz Siemieniec"
          email="grzegorz021104@gmail.com"
        />
      </Menu.Target>
      <Menu.Dropdown className=" bg-[#CBF1F5]">
        <Menu.Item className=" hover:bg-white">Edit Profile</Menu.Item>
        <Menu.Item className=" hover:bg-white" style={{ color: "red" }}>
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Demo;
