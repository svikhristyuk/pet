import React from "react";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { render, act, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "../../typings";
import { Users } from "./Users";

jest.mock("../../api", () => ({
  fetchUsers: jest.fn().mockResolvedValue([{ id: 1, name: "Vin" } as User]),
  updateUser: jest.fn().mockResolvedValue({ id: 1 } as User),
  createUser: jest.fn().mockResolvedValue({ id: 2 } as User),
  deleteUser: jest.fn().mockResolvedValue({ id: 1 } as User),
}));

describe("Users", () => {
  beforeEach(async () => {
    await act(async () => {
      await render(
        <SnackbarProvider>
          <MemoryRouter>
            <Users />
          </MemoryRouter>
        </SnackbarProvider>
      );
    });
  });

  test("list", () => {
    expect(screen.getAllByTestId("users-list-item")).toHaveLength(1);
    expect(screen.getByTestId("users-list-item-avatar").textContent).toBe("V");
    expect(screen.getByTestId("users-list-item-name").textContent).toBe("Vin");
    expect(screen.getByText("Select user to see details")).toBeInTheDocument();
  });

  test("edit", async () => {
    act(() => {
      userEvent.click(screen.getByTestId("users-list-item"));
    });
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Name *"), "Viny");
      fireEvent.submit(screen.getByTestId("users-form"));
    });

    expect((await screen.findByRole("alert")).textContent).toBe("User updated");
    expect(screen.getByTestId("users-list-item-name").textContent).toBe("Viny");
  });

  test("create", async () => {
    act(() => {
      userEvent.click(screen.getByTestId("users-addButton"));
    });
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Name *"), "Mike");
      fireEvent.submit(screen.getByTestId("users-form"));
    });

    expect((await screen.findByRole("alert")).textContent).toBe("User created");
    expect(screen.getAllByTestId("users-list-item")).toHaveLength(2);
    expect(screen.getAllByTestId("users-list-item-avatar")[0].textContent).toBe(
      "M"
    );
    expect(screen.getAllByTestId("users-list-item-name")[0].textContent).toBe(
      "Mike"
    );
  });

  test("delete", async () => {
    act(() => {
      userEvent.click(screen.getByTestId("users-list-item"));
    });
    act(() => {
      userEvent.click(screen.getByTestId("users-deleteButton"));
    });

    expect((await screen.findByRole("alert")).textContent).toBe("User deleted");
    expect(screen.getByTestId("users-list")).toBeEmpty();
  });
});
