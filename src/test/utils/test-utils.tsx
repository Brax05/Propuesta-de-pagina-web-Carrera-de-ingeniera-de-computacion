// src/test/utils/test-utils.tsx
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock para useAuth personalizable
export const createMockAuth = (overrides = {}) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  ...overrides,
});

// Mock de usuario autenticado
export const mockAuthenticatedUser = {
  id: 'test-user-123',
  name: 'Test User',
  email: 'test@userena.cl',
  role: 'student' as const,
};

// Mock de usuario admin
export const mockAdminUser = {
  id: 'admin-123',
  name: 'Admin User',
  email: 'admin@userena.cl',
  role: 'admin' as const,
};

// Wrapper con Router para tests
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

// Función de render personalizada
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-exportar todo de testing-library
export * from '@testing-library/react';
export { customRender as render };

// Helpers para esperar por acciones async
export const waitForLoadingToFinish = () => 
  waitFor(() => {
    const loadingIndicators = screen.queryAllByText(/loading|cargando/i);
    expect(loadingIndicators).toHaveLength(0);
  });

// Helper para llenar formulario de login
export const fillLoginForm = async (
  user: ReturnType<typeof userEvent.setup>,
  email: string,
  password: string
) => {
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/contraseña|password/i);

  await user.type(emailInput, email);
  await user.type(passwordInput, password);
};

// Helper para llenar formulario de registro
export const fillRegisterForm = async (
  user: ReturnType<typeof userEvent.setup>,
  data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
) => {
  await user.type(screen.getByLabelText(/nombres/i), data.firstName);
  await user.type(screen.getByLabelText(/apellidos/i), data.lastName);
  await user.type(screen.getByLabelText(/email/i), data.email);
  
  const passwordInputs = screen.getAllByLabelText(/contraseña/i);
  await user.type(passwordInputs[0], data.password);
  await user.type(passwordInputs[1], data.confirmPassword);
};

// Mock de Supabase client
export const mockSupabaseClient = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
        single: vi.fn(),
      })),
      single: vi.fn(),
    })),
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(),
      })),
    })),
  })),
};
