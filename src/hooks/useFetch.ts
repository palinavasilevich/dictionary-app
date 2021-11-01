import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { reactive, toRefs } from "vue";

// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
export interface IState {
  data: null | any[];
  isError: boolean;
  errorMessage?: string;
  isLoading: boolean;
}

export default function useFetch(config: AxiosRequestConfig) {
  const state: IState = reactive({
    data: null,
    isError: false,
    errorMessage: "",
    isLoading: true,
  });

  const fetchData = async () => {
    try {
      const response = await axios.request({ ...config });
      state.data = response.data;
    } catch (err) {
      state.isError = true;
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError;
        if (serverError && serverError.response) {
          state.errorMessage = serverError.response.data.message;
        }
      }
    } finally {
      state.isLoading = false;
    }
  };

  return { ...toRefs(state), fetchData };
}
