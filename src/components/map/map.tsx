type Map = {
   className: string;
}

function Map ({className} : Map) : JSX.Element {
  return (
    <section className={`${className}__map map`}></section>
  );
}

export default Map;
