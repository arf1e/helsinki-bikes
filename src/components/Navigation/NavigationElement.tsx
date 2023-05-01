import Link from 'next/link';
import { useRouter } from 'next/router';
import SNavigationElement from './Navigation.styles';

type Props = {
  title: string;
  route: string;
};

const NavigationElement = ({ title, route }: Props) => {
  const router = useRouter();
  const isActive = router.pathname.startsWith(route);
  return (
    <SNavigationElement isActive={isActive}>
      <Link href={route}>
        <span>{title}</span>
      </Link>
    </SNavigationElement>
  );
};

export default NavigationElement;
