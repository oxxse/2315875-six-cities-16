import type { Offer } from '../../types/offer';

function InsideItem({ good }: { good: string }): JSX.Element {
  return (
    <li className="offer__inside-item">{good}</li>
  );
}

function InsideList({ items }: { items: Offer }): JSX.Element {
  const { goods } = items;
  return (
    <ul className="offer__inside-list">
      {goods.map((good) => <InsideItem good={good} key={good} />)}
    </ul>
  );
}

export default InsideList;
