import MainPage from '../../pages/main/main';

type OffersProps = {
  offersCount: number;
}


function App({offersCount}: OffersProps): JSX.Element {
  return (
    <MainPage offersCount={offersCount} />
  );
}

export default App;
