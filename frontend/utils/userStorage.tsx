import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'userData';

export async function saveUserData(userData: any): Promise<void> {
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
}

export async function getUserData(): Promise<string | null> {
  return await SecureStore.getItemAsync(USER_KEY);
}

export async function deleteUserData(): Promise<void> {
  await SecureStore.deleteItemAsync(USER_KEY);
}