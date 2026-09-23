import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_USER = {
  id: 'usr_demo_99',
  name: 'Alex Rivera',
  email: 'demo@lumina.shop',
  password: 'demo123',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  createdAt: new Date().toISOString()
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('lumina_theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    let storedUsers = [];
    try {
      const parsed = localStorage.getItem('lumina_users');
      if (parsed) {
        storedUsers = JSON.parse(parsed);
      }
    } catch (err) {
      console.error('Error reading lumina_users:', err);
    }

    const demoExists = storedUsers.some(u => u.email.toLowerCase() === DEMO_USER.email.toLowerCase());
    if (!demoExists) {
      storedUsers = [DEMO_USER, ...storedUsers];
      localStorage.setItem('lumina_users', JSON.stringify(storedUsers));
    }
    setUsers(storedUsers);

    try {
      const savedUser = localStorage.getItem('lumina_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Error reading lumina_user:', err);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('lumina_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const register = ({ name, email, password, confirmPassword }) => {
    if (!name || !email || !password || !confirmPassword) {
      return { success: false, error: 'All fields are required.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match.' };
    }

    const emailNormalized = email.trim().toLowerCase();
    const isDuplicate = users.some(u => u.email.toLowerCase() === emailNormalized);
    if (isDuplicate) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: emailNormalized,
      password: password,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('lumina_users', JSON.stringify(updatedUsers));

    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar };
    setCurrentUser(sessionUser);
    localStorage.setItem('lumina_user', JSON.stringify(sessionUser));

    return { success: true, user: sessionUser };
  };

  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    const emailNormalized = email.trim().toLowerCase();
    const userMatch = users.find(
      u => u.email.toLowerCase() === emailNormalized && u.password === password
    );

    if (!userMatch) {
      return { success: false, error: 'Invalid email or password credentials.' };
    }

    const sessionUser = {
      id: userMatch.id,
      name: userMatch.name,
      email: userMatch.email,
      avatar: userMatch.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userMatch.name)}`
    };

    setCurrentUser(sessionUser);
    localStorage.setItem('lumina_user', JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  };

  const loginDemo = () => {
    return login(DEMO_USER.email, DEMO_USER.password);
  };

  const logout = () => {
    localStorage.removeItem('lumina_user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        theme,
        toggleTheme,
        register,
        login,
        loginDemo,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
