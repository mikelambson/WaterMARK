// @/lib/apiFetch.ts
import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface DataTableError {
  message: string;
  // You can include additional properties specific to your error structure
}

type FetchResult<T> = {
  success: boolean;
  data?: T;
  error?: Error | unknown;
};

class ApiFetch {
  private async performRequest<T>(route: string, method: string, data?: any): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axios({
        method,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "https://backend.watermark.work",
        },
        url: `${baseUrl}${route}`,
        data,
      });
      return response;
    } catch (error) {
      console.error("Error performing request:", error);
      throw error; // Propagate the error to the caller
    }
  }

  private createSSEConnection<T>(
    sseRoute: string,
    onData: (data: T) => void
  ): EventSource {
    const eventSource = new EventSource(`${baseUrl}${sseRoute}`);

    eventSource.onmessage = (event: MessageEvent) => {
      const eventData: T = JSON.parse(event.data);
      onData(eventData);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Connection Error:", error);
      eventSource.close();
    };

    return eventSource;
  }

  public async fetchData<T>(specificRoute: string): Promise<FetchResult<T>> {
    try {
      const response: AxiosResponse<T> = await this.performRequest<T>(
        specificRoute,
        'get',
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { success: false, error };
    }
  }

  public connectToSSE<T>(
    sseRoute: string,
    onData: (data: T) => void
  ): EventSource {
    return this.createSSEConnection<T>(sseRoute, onData);
  }


  public async updateData<T>(specificRoute: string, newData: T): Promise<FetchResult<T>> {
    try {
      const response: AxiosResponse<T> = await this.performRequest<T>(
        specificRoute,
        'put', // Assuming you want to use the HTTP PUT method for updating
        { data: newData } // Wrap the new data in an object
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error updating data:", error);
      return { success: false, error };
    }
  }
}

export default ApiFetch;