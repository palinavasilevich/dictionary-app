import { useRouter } from "vue-router";

export default function useWordRouter() {
  const router = useRouter();

  const goBack = () => router.go(-1);

  return { goBack };
}
