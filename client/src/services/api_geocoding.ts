type address = {
  lat: string | number;
  lng: string | number;
};

export async function getCurrentAddress({ lat, lng }: address) {
  const res: Response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  );
  if (!res.ok) throw Error("Failed getting the address");
  const data = await res.json();
  return data;
}
