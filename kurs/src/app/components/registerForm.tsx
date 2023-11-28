"use client";
import { useForm, matchesField } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  PasswordInput,
  Progress,
  Text,
  Popover,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}
function Demo() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState("");
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const form = useForm({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      confirmPassword: matchesField("password", "Passwords are not the same"),
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const surname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    console.log(email, password);
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          surname: surname,
        }),
      });
      if (res.status === 200) {
        console.log("Udało sie");
      }
      if (res.status === 400) {
        console.log("This email is alredy registereed");
      }
    } catch (error) {}
  };

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          placeholder="Name"
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Surname"
          placeholder="Surname"
          required
          {...form.getInputProps("surname")}
        />
        <TextInput
          mt="sm"
          label="Email"
          placeholder="Email"
          required
          {...form.getInputProps("email")}
        />
        <Popover
          opened={popoverOpened}
          position="bottom"
          width="target"
          transitionProps={{ transition: "pop" }}
        >
          <Popover.Target>
            <div
              onFocusCapture={() => setPopoverOpened(true)}
              onBlurCapture={() => setPopoverOpened(false)}
            >
              <PasswordInput
                mt="sm"
                label="Password"
                placeholder="Password"
                required
                value={value}
                onChange={(event) => {
                  setValue(event.currentTarget.value);
                  form.getInputProps("password").onChange(event); // Manually call the onChange from getInputProps
                }}
              />
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <Progress color={color} value={strength} size={5} mb="xs" />
            <PasswordRequirement
              label="Includes at least 6 characters"
              meets={value.length > 5}
            />
            {checks}
          </Popover.Dropdown>
        </Popover>
        <PasswordInput
          mt="sm"
          label="Confirm Password"
          required
          placeholder="Confirm Password"
          {...form.getInputProps("confirmPassword")}
        />
        <Button
          type="submit"
          mt="sm"
          className="bg-green-500 flex m-auto w-[200px] items-center justify-center rounded-full"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
export default Demo;
