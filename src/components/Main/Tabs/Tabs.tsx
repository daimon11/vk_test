import React, { useEffect, useState } from 'react';
import style from './Tabs.module.css';
import { assignId } from '../../../utils/generateRandomNumber';
import { debounceRaf } from '../../../utils/debounce';
import { ReactComponent as ArrowIcon } from './img/arrow.svg';
import { ReactComponent as BestIcon } from './img/best.svg';
import { ReactComponent as HomeIcon } from './img/home.svg';
import { ReactComponent as HotIcon } from './img/hot.svg';
import { ReactComponent as TopIcon } from './img/top.svg';
import { useNavigate } from 'react-router-dom';

interface Tab {
  value: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  link: string;
  id: string; 
}

export const LIST: Tab[] = [
  { value: 'Главная', Icon: HomeIcon, link: 'home', id: '' },
  { value: 'Топ', Icon: TopIcon, link: 'top', id: '' },
  { value: 'Лучшие', Icon: BestIcon, link: 'best', id: '' },
  { value: 'Горячие', Icon: HotIcon, link: 'hot', id: '' },
].map(assignId);

export const Tabs: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<string | false>(false);
  const navigate = useNavigate();

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDropdown(true);
    } else {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    const debounceResize = debounceRaf(handleResize);
    debounceResize();
    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  return (
    <div className={style.container}>
      {isDropdown && (
        <div className={style.wrapperBtn}>
          <button
            className={style.btn}
            onClick={() => setDropdownOpen(!isDropdownOpen)}>
            {activePage ? activePage : 'add'}
            <ArrowIcon width={15} height={15} />
          </button>
        </div>
      )}

      {(isDropdownOpen || !isDropdown) && (
        <ul className={style.list} onClick={() => setDropdownOpen(false)}>
          {LIST.map(({ value, link, id, Icon }) => (
            <li className={style.item} key={id}>
              <button
                className={style.btn}
                onClick={() => {
                  setActivePage(value);
                  navigate(link !== 'home' ? `/category/${link}` : '');
                }}>
                {value}
                {Icon && <Icon width={30} height={25} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};