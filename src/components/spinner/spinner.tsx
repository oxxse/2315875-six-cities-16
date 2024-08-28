import './spinner.module.css';

function Spinner(): JSX.Element {
  return (
    <div className="lds-roller">
      Loading ...
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
