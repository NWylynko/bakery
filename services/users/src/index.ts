
import { hello } from "@bakery/hello";

const main = async () => {
  const message = await hello();
  console.log(message);
}

main()