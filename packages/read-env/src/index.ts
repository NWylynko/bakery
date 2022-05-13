import "source-map-support/register"
import "dotenv/config";

export const readEnvArray = (name: string | undefined): string[] => {
  if (!name) {
    throw new Error(`${name} is not defined`);
  }

  try {
    
    const array = JSON.parse(name);

    if (!Array.isArray(array)) {
      throw new Error(`${name} is not a json array`);
    }

    return array;

  } catch (error) {
    
    throw new Error(`Failed to parse ${name}: ${error}`);

  }
}

export const readEnvString = (name: string | undefined): string => {
  if (!name) {
    throw new Error(`${name} is not defined`);
  }

  return name;
}