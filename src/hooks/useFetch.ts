import axios from "axios";
import { reactive, toRefs } from "vue";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

interface State {
  data: null | any[];
  isError: boolean;
  errorMessage?: string;
  isLoading: boolean;
}

interface Config {
  url: string;
  method?: string;
  data?: any;
}

export default function useFetch(config) {
  const state: State = reactive({
    data: null,
    isError: false,
    errorMessage: "",
    isLoading: true,
  });

  const fetchData = async () => {
    try {
      const response = await axios.request({ ...config });
      state.data = response.data;
    } catch (err: any) {
      state.isError = true;
      state.errorMessage = err.response.data.message;
    } finally {
      state.isLoading = false;
    }
  };

  return { ...toRefs(state), fetchData };
}
