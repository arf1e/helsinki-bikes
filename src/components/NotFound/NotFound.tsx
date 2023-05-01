import styled from 'styled-components';
import PageHead from '../PageHead/PageHead';
import { PrimaryButton } from '@/app/styled/Buttons';
import Link from 'next/link';

const NotFoundContainer = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 60vh;
  padding: ${({ theme }) => theme.appBoxPadding};

  .code {
    font-size: 212px;
    line-height: 212px;
    color: ${({ theme }) => theme.primaryColor};
    margin-bottom: 16px;
  }

  .heading {
    font-size: 32px;
    color: ${({ theme }) => theme.darkGrayColor};
    margin-bottom: 12px;
  }

  .description {
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.darkGrayColor};
    width: 450px;
    text-align: center;
    margin-bottom: 24px;
  }

  .redirect {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.primaryColor};
    padding: 12px 24px;
    color: ${({ theme }) => theme.backgroundColor};
    transition: 0.3s;

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.darkGrayColor};
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <PageHead title="Not found :(" />
      <h1 className="code">404</h1>
      <strong className="heading">aka Page not found</strong>
      <p className="description">
        I could not come up with a good 404-page joke, so I asked ChatGPT to generate me one. Here it goes: <br />
        — Why did the HTTP 404 page break up with the Internet? <br />— Because it could not find love!
      </p>
      <Link href="/" className="redirect">
        Take me away from this place please
      </Link>
    </NotFoundContainer>
  );
};

export default NotFound;
