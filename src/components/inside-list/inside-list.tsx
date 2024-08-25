import { memo } from 'react';
import type { Offer } from '../../types/types';

const InsideItem = memo(({ good }: { good: string }): JSX.Element => (
  <li className="offer__inside-item">{good}</li>
));

InsideItem.displayName = 'SortOptions';

const InsideList = memo(({ items }: { items: Offer }): JSX.Element => {
  const { goods } = items;
  return (
    <ul className="offer__inside-list">
      {goods.map((good) => <InsideItem good={good} key={good} />)}
    </ul>
  );
});

InsideList.displayName = 'InsideList';

export default InsideList;
