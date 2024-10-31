import { useEffect, useRef } from 'react';
import style from './List.module.css';
import Post from './Post';
import { observer } from 'mobx-react';
import postStore from '../../../store/postsStore'; 
import { Outlet, useParams } from 'react-router-dom';

export const List = observer(() => {
  const endList = useRef<HTMLLIElement | null>(null);
  const { page } = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    if (page) {
      postStore.resetPosts();
      postStore.setPage(page);
      postStore.fetchPosts(); 
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !postStore.loading) { 
        postStore.fetchPosts();
      }
    }, {
      rootMargin: '100px',
    });

    if (endList.current) {
      observer.observe(endList.current);
    }

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);

  return (
    <>
      <ul className={style.list}>
        {postStore.posts.map(item => (
          <Post 
            key={item.data.id} 
            postData={item.data} />
        ))}
        <li ref={endList} className={style.end} />
      </ul>
      <Outlet />
    </>
  );
});