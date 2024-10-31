import React, { useState } from 'react';
import style from './Post.module.css';
import notphoto from './img/notphoto.jpg';
import { formateDate } from '../../../../utils/formateDate'; // Убедитесь, что путь правильный
import postStore from '../../../../store/postsStore'; // Убедитесь, что путь правильный
import { ReactComponent as ButtonDelIcon } from './img/delete.svg';
import { ReactComponent as ButtonEditIcon } from './img/edit.svg';
import { Text } from '../../../../UI/Text';

interface PostData {
  thumbnail: string;
  title: string;
  author: string;
  id: string;
}

interface PostProps {
  postData: PostData;
}

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = notphoto;
};

export const Post: React.FC<PostProps> = ({ postData }) => {
  const {
    thumbnail,
    title,
    author,
    id,
  } = postData;

  const [isEditingAuthor, setIsEditingAuthor] = useState<boolean>(false);
  const [newAuthor, setNewAuthor] = useState<string>(author);

  const handleDelete = () => {
    postStore.deletePostById(id);
  };

  const handleEditAuthor = () => {
    postStore.updatePostAuthor(id, newAuthor);
    setIsEditingAuthor(false);
  };

  return (
    <li className={style.post}>
      <img
        className={style.img}
        src={thumbnail.length > 10 ? thumbnail : notphoto}
        alt={title}
        onError={handleImageError} 
      />

      <div className={style.content}>
        <Text
          As='h2'
          className={style.title}
          bold
          size={18}
          tsize={24}>
          {title}
        </Text>
        {isEditingAuthor ? (
          <input
            type="text"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            onBlur={handleEditAuthor}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEditAuthor();
              }
            }}
          />
        ) : (
          <Text
            As='span'
            color='orange'
            size={12}
            tsize={14}
            className={style.linkAuthor}
          >
            {author}
          </Text>
        )}
      </div>

      <button className={style.delete} onClick={handleDelete}>
        <ButtonDelIcon />
      </button>
      <button
        className={style.edit}
        onClick={() => {
          setIsEditingAuthor(true);
          setNewAuthor(author);
        }}>
        <ButtonEditIcon />
      </button>

      <time
        className={style.date}
        dateTime={new Date().toISOString()}>
        {formateDate(new Date())}
      </time>
    </li>
  );
};