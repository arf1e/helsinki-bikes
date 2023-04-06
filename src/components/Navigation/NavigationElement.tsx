import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

const SNavigationElement = styled.li<{ isActive: boolean }>`
  font-size: 42px;
  font-weight: 500;
  margin-right: 32px;

  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.blackColor};
    transition: 0.3s;
    padding-bottom: 4px;
    border-bottom: 8px solid;
    border-color: transparent;
    display: flex;

    ${({ isActive, theme }) =>
      isActive
        ? css`
            border-color: ${theme.primaryColor};
          `
        : css`
            opacity: 0.5;
            &:hover {
              opacity: 1;
            }
          `}
    &:hover {
      color: ${({ theme }) => theme.primaryColor};
    }

    &:active {
      transform: scale(0.98);
      padding-bottom: 8px;
    }
  }
`;

type Props = {
  title: string;
  route: string;
};

const NavigationElement = ({ title, route }: Props) => {
  const router = useRouter();
  const isActive = router.pathname === route;
  return (
    <SNavigationElement isActive={isActive}>
      <Link href={route}>
        <span>{title}</span>
      </Link>
    </SNavigationElement>
  );
};

export default NavigationElement;
