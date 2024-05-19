import { getCountries } from "@/app/_lib/data-service";

// Let's imagine your colleague already built this component 😃
type SelectCountryProps = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};

type country = {
  name: string;
  flag: string;
  independent: boolean;
};

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryProps) {
  const countries: country[] = await getCountries();
  console.log(countries);
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;

// export async function getCountries() {
//   try {
//     const res = await fetch(
//       'https://restcountries.com/v2/all?fields=name,flag'
//     );
//     const countries = await res.json();
//     return countries;
//   } catch {
//     throw new Error('Could not fetch countries');
//   }
// }
