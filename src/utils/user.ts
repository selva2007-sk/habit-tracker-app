import { User } from '../types';

export const getUserDisplayName = (user: User | null) => {
  const trimmedName = user?.name?.trim();
  if (trimmedName) {
    return trimmedName;
  }

  return 'there';
};
