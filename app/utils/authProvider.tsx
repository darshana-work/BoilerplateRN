import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
    setSeenIntroStatus: (hasSeenIntro: boolean) => Promise<void>;
    seenIntro: boolean;
  }
  
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  export const AuthContext = createContext<AuthContextProps | undefined>(
    undefined,
  );
  
  export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [seenIntro, setSeenIntro] = useState<boolean>(false);
  
    useEffect(() => {
    }, []);
  
    const setSeenIntroStatus = async (hasSeenIntro: boolean) => {
    //   try {
    //     if (hasSeenIntro) {
    //       await AsyncStorage.setItem('hasSeenIntro', 'true');
    //       setSeenIntro(true);
    //     } else {
    //       await AsyncStorage.setItem('hasSeenIntro', 'false');
    //       setSeenIntro(false);
    //     }
    //   } catch (error) {
    //     console.log('Failed to set hasSeenIntro value ', error);
    //   }
    };
  
    return (
      <AuthContext.Provider
        value={{
          setSeenIntroStatus,
          seenIntro,
        }}>
        {children}
      </AuthContext.Provider>
    );
  };