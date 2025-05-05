export const generateDefaultAvatar = (): string => {
    const randomNum = Math.floor(Math.random() * 50);
    return `https://i.pravatar.cc/150?img=${randomNum}`;
  };