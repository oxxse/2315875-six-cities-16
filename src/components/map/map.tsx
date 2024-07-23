type MapProps = {
  className: string;
}

function Map({ className }: MapProps): JSX.Element {
  return (
    <section className={`${className}__map map`}></section>
  );
}

export default Map;
