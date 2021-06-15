import useSWR from 'swr';
import { queryParams } from '@/utils/format';

const useApi = (fetcher, params, options = {}) => {
  const { shouldFetch = true, ...restOptions } = options;

  params ||= {};

  // key 为 null 时， 不会发出请求
  const key =
    shouldFetch && typeof fetcher === 'function'
      ? `${fetcher.name}${queryParams(params)}`
      : null;

  // console.log({ key, params });

  const finalOptions = {
    dedupingInterval: 100,
    revalidateOnReconnect: true, // 断网重连后自动请求
    revalidateOnMount: true, // 所在组件挂载时自动更新， 如果不设置， 却传了 initialData 会自动设置为 false
    revalidateOnFocus: false, // 聚焦时自动请求
    shouldRetryOnError: false, // 请求失败后自动再次请求
    ...restOptions,
  };

  const { data, mutate, error } = useSWR(
    key,
    async () => fetcher(params),
    finalOptions,
  );

  return {
    data,
    mutate,
    error,
    loading: key && !error && !data,
  };
};

export default useApi;
