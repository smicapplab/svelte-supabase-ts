import type { ParsedResponse } from "./types/apiResponse";

export function assembleFormData(data: { [key: string]: string }): FormData {
  const formData = new FormData();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  }
  return formData;
}

export const destructureFormData = async (
  formDataPromise: Promise<FormData>
): Promise<{ [key: string]: string }> => {
  const formData = await formDataPromise;
  const data: { [key: string]: string } = {};
  formData.forEach((value, key) => {
    data[key] = value as string;
  });
  return data;
};

export const parseResponse = async (
  response: Response
): Promise<ParsedResponse> => {
  try {
    const jsonResponse = await response.json();
    const parsedArray = JSON.parse(jsonResponse.data);

    // Extract the positions of keys from the first element of the array
    const keyPositions = parsedArray[0];
    const success = parsedArray[keyPositions.success];
    const message = parsedArray[keyPositions.message] || "Unknown error occurred";
    const data = keyPositions.data !== undefined ? parsedArray[keyPositions.data] : undefined;

    const result: ParsedResponse = {
      type: jsonResponse.type,
      status: jsonResponse.status,
      data: {
        success,
        message,
        data,
      },
    };

    return result;
  } catch (error) {
    console.error("Error parsing response data:", error);
    return {
      type: "error",
      status: 500,
      data: {
        success: false,
        message: "Something went wrong!"
      }
    };
  }
};