import React, { useState } from 'react';
import style from './Content.module.css';
import { Text } from '../../../../../UI/Text';

interface ContentProps {
  author: string;
  title: string;
  id: string;
  onEditAuthor: (id: string, newAuthor: string) => void; 
}

export const Content: React.FC<ContentProps> = ({ author, title, id, onEditAuthor }) => {
  const [isEditingAuthor, setIsEditingAuthor] = useState<boolean>(false);
  const [newAuthor, setNewAuthor] = useState<string>(author);

  const handleSaveAuthor = () => {
    onEditAuthor(id, newAuthor);
    setIsEditingAuthor(false);
  };

  return (
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
          onBlur={handleSaveAuthor} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSaveAuthor();
            }
          }}
        />
      ) : (
        <Text
          As='a'
          color='orange'
          size={12}
          tsize={14}
          className={style.linkAuthor}
          href='#'
          onClick={() => {
            setIsEditingAuthor(true);
            setNewAuthor(author);
          }}
        >
          {author}
        </Text>
      )}
    </div>
  );
};