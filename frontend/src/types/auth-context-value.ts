export type AuthContextValue = {
  isAuthorized: boolean;
  isChecking: boolean;
  authorize: (apiKey: string) => Promise<void>;
  logout: () => void;
};
