import { RingLoader } from 'react-spinners';

export const PostsPreloader = () => (
  <div style={{
    paddingTop: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <RingLoader
      color='red'
      size={300} />
  </div>
);
