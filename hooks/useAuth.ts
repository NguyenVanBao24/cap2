// src/hooks/useAuth.ts
import useAuthStore from "../store/useAuthStore";

const useAuth = () => {
  const { user, token, isLoading, error, login, logout } = useAuthStore();
  return { user, token, isLoading, error, login, logout };
};

export default useAuth;
