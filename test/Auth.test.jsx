import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Auth from "../src/components/Auth/Auth";
import { fetchAccessToken } from "../src/redux/AccessTokenSlice";
import { MemoryRouter, useNavigate } from "react-router-dom";

const mockStore = configureStore();

const TestWrapper = ({ children }) => {
  const navigate = useNavigate();

  return (
    <MemoryRouter initialEntries={["/"]}>
      {children}
      <button onClick={() => navigate("/?code=abc123")}>Change URL</button>
    </MemoryRouter>
  );
};

describe("Auth", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        accessToken: null,
        status: "idle",
        error: null,
      },
    });
  });

  it("renders loading state when status is loading", () => {
    store = mockStore({
      auth: {
        accessToken: null,
        status: "loading",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    );

    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  it("renders error message when error is present", () => {
    const errorMessage = "Something went wrong";
    store = mockStore({
      auth: {
        accessToken: null,
        status: "idle",
        error: errorMessage,
      },
    });

    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    );

    const errorText = screen.getByText(`Error: ${errorMessage}. Log In again.`);
    expect(errorText).toBeInTheDocument();
  });

  it("renders login link when authToken is null", () => {
    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    );

    const loginLink = screen.getByRole("link", { name: "Login with Reddit" });
    expect(loginLink).toBeInTheDocument();
  });

  it("does not render login link when authToken is present", () => {
    store = mockStore({
      auth: {
        accessToken: "valid_token",
        status: "idle",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    );

    const loginLink = screen.queryByRole("link", { name: "Login with Reddit" });
    expect(loginLink).not.toBeInTheDocument();
  });

  it("dispatches fetchAccessToken action when access code is present in URL", async () => {
    const accessCode = "abc123";
    const dispatchMock = vi.fn();

    render(
      <Provider store={store}>
        <TestWrapper>
          <Auth dispatch={dispatchMock} />
        </TestWrapper>
      </Provider>
    );

    // Simular un cambio en la URL
    const changeUrlButton = screen.getByRole("button", { name: "Change URL" });
    changeUrlButton.click();

    // Esperar un ciclo de actualización para que se ejecute el efecto secundario
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledWith(fetchAccessToken(accessCode)));
  });
});
