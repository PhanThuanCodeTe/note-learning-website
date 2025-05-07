import { redirect } from 'next/navigation';
import ROUTES from '@/app/common/constants/routes';

export default function Home() {
  redirect(ROUTES.HOME);
}