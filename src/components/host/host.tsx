import { memo } from 'react';
import type { Offer } from '../../types/types';

const Host = memo(({ hostData }: { hostData: Offer }): JSX.Element => {
  const { host } = hostData;
  return (
    <div className="offer__host-user user">
      <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
        <img className="offer__avatar user__avatar" src={host.avatarUrl} width={74} height={74} alt="Host avatar" />
      </div>
      <span className="offer__user-name">
        {host.name}
      </span>
      <span className="offer__user-status">
        Pro
      </span>
    </div>
  );
});

Host.displayName = 'Host';

export default Host;
