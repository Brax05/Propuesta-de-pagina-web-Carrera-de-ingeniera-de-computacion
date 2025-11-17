import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbarpage';
import * as useAuthModule from '@/hooks/useAuth';

// Mock del hook useAuth
vi.mock('@/hooks/useAuth');

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  it('should render navigation links', () => {
    vi.mocked(useAuthModule.useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      loading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
    });

    renderNavbar();

    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Plan de Estudios')).toBeInTheDocument();
    expect(screen.getByText('Noticias')).toBeInTheDocument();
  });

  it('should show login buttons when not authenticated', () => {
    vi.mocked(useAuthModule.useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      loading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
    });

    renderNavbar();

    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    expect(screen.getByText('Registro')).toBeInTheDocument();
  });

  it('should show user name and logout when authenticated', () => {
    vi.mocked(useAuthModule.useAuth).mockReturnValue({
      user: { id: '1', name: 'Juan Pérez', email: 'juan@userena.cl', role: 'student' },
      isAuthenticated: true,
      loading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
    });

    renderNavbar();

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
  });
});
