export type AuthContextValue = {
  isAuthorized: boolean;
  isChecking: boolean;
  authorize: (apiKey: string) => Promise<boolean>;
  logout: () => void;
};
