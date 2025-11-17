import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import * as useAuthModule from '@/hooks/useAuth';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/hooks/useAuth');

const mockLogin = vi.fn();

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthModule.useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      loading: false,
      login: mockLogin,
      register: vi.fn(),
      logout: vi.fn(),
    });
  });

  it('should render login form', () => {
    renderLogin();

    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('should show error when fields are empty', async () => {
    const user = userEvent.setup();
    renderLogin();

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/completa todos los campos/i)).toBeInTheDocument();
    });
  });

  it('should call login function with correct credentials', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue(true);

    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    await user.type(emailInput, 'miguel.carvajal@userena.cl');
    await user.type(passwordInput, 'qwerty123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('miguel.carvajal@userena.cl', 'qwerty123');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should show error message on failed login', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue(false);

    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    await user.type(emailInput, 'wrong@userena.cl');
    await user.type(passwordInput, 'wrongpass');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email o contraseña inválidos/i)).toBeInTheDocument();
    });
  });
});
