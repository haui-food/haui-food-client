import { createContext, useContext, useEffect, useState } from 'react';

// Tạo một Context mới để lưu trữ thông tin về chủ đề (theme)
const ThemeContext = createContext();

// Component Provider cho Context
export const ThemeProvider = ({ children }) => {
  // Hàm này được sử dụng để lấy trạng thái ban đầu của chủ đề (theme)
  function getInitialDarkMode() {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (!storedDarkMode) {
      const defaultDarkModeValue = false;
      localStorage.setItem('darkMode', JSON.stringify(defaultDarkModeValue));
      return defaultDarkModeValue;
    }
    return JSON.parse(storedDarkMode);
  }

  // Sử dụng hook useState để theo dõi trạng thái của chủ đề (theme)
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode());

  // Hàm để chuyển đổi giữa chủ đề sáng và tối
  const toggleDarkMode = () => {
    setIsDarkMode((preMode) => {
      const newMode = !preMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  // Sử dụng hook useEffect để cập nhật lớp 'dark' trên phần tử HTML khi chủ đề thay đổi
  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Trả về Provider với giá trị là toggleDarkMode và isDarkMode
  return <ThemeContext.Provider value={{ toggleDarkMode, isDarkMode }}>{children}</ThemeContext.Provider>;
};

// Hook để sử dụng các giá trị từ Context
export const useTheme = () => {
  return useContext(ThemeContext);
};
