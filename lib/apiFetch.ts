// @/lib/apiFetch.ts
"use server";
import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiFetch {
  private async performRequest<T>(route: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(`${baseUrl}${route}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
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

  public async fetchData<T>(specificRoute: string): Promise<T> {
    return this.performRequest<T>(specificRoute);
  }

  public connectToSSE<T>(
    sseRoute: string,
    onData: (data: T) => void
  ): EventSource {
    return this.createSSEConnection<T>(sseRoute, onData);
  }
}

export default ApiFetch;
