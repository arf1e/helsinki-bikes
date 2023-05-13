import PageHead from '../PageHead/PageHead';
import Link from 'next/link';
import NotFoundContainer from './NotFound.styles';

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
