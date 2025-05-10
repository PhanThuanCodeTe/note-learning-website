"use client"

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import NavBar from './NavBar';
import FolderDrawer from './FolderDrawer';
import GroupDrawer from './GroupDrawer';
import { hasCookie } from '../common/utils/cookieUtils';
import ROUTES from '../common/constants/routes';

// Các trang được phép truy cập khi chưa đăng nhập
const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra tình trạng đăng nhập
    const checkAuth = () => {
      const hasToken = hasCookie('accessToken');
      setIsAuthenticated(hasToken);
      
      // Nếu không đăng nhập và không ở trang công khai, chuyển hướng về Home
      if (!hasToken && !PUBLIC_ROUTES.includes(pathname)) {
        router.push(ROUTES.HOME);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return <div className="w-full h-screen flex items-center justify-center">Đang tải...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex-1 relative overflow-hidden">
        {isAuthenticated ? (
          <GroupDrawer>
            <FolderDrawer>
              <main className="w-full h-full overflow-auto">{children}</main>
            </FolderDrawer>
          </GroupDrawer>
        ) : (
          <main className="w-full h-full overflow-auto">{children}</main>
        )}
      </div>
    </div>
  );
}