import AirportWx from "./AirportWx";
import AirportInfo from "./AirportInfo";

export default function Airport({ data, wx: { conditions } }) {
  return (
    <section>
      <AirportWx conditions={conditions} />
      <AirportInfo data={data} conditions={conditions} />
    </section>
  );
}
