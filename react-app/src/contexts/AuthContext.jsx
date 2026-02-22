import { createContext, useState, useContext, useEffect, useRef } from 'react';
import Keycloak from 'keycloak-js';
import { setTokenProvider } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080';
  const keycloak = useRef(
    new Keycloak({
      url: keycloakUrl,
      realm: 'pestmanagement',
      clientId: 'pestmanagement-webapp',
    })
  ).current;

  const [token, setToken] = useState(null);
  const initCalled = useRef(false);

  // Check for existing session on mount
  useEffect(() => {
    if (initCalled.current) return;
    initCalled.current = true;

    keycloak
      .init({ onLoad: 'login-required' })
      .then((authenticated) => {
        if (authenticated) {
          const parsed = keycloak.tokenParsed;
          const roles = parsed?.realm_access?.roles || [];

          setUser({
            id: parsed.sub,
            username: parsed.preferred_username,
            email: parsed.email,
            firstName: parsed.given_name,
            lastName: parsed.family_name,
            roles,
            permissions: roles.includes('admin') ? ['all'] : roles,
          });
          setToken(keycloak.token);
          setTokenProvider(() => keycloak.token);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Keycloak init failed:', err);
        setLoading(false);
      });

    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).then(() => {
        setToken(keycloak.token);
        setTokenProvider(() => keycloak.token);
      });
    };
  }, []);

  const logout = () => {
    keycloak.logout();
    setUser(null);
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.permissions.includes('all')) return true;
    return user.permissions.includes(permission);
  };

  const value = {
    user,
    loading,
    logout,
    hasPermission,
    isAuthenticated: !!user,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
