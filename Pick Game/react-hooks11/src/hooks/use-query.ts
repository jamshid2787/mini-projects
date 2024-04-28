import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface IState<T> {
  data?: T;
  isLoading: boolean;
  error?: string;
}

export function useQuery<TResult>(requestFn: () => Promise<TResult>) {
  const [state, setState] = useState<IState<TResult>>({ error: '', isLoading: true });

  const query = async () => {
    setState({ isLoading: true });
    try {
      const result = await requestFn();
      setState({ data: result, isLoading: false });
    } catch (error: any) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        setState({ error: message, isLoading: false });

        toast.error(message!);
      }
    }
  };

  useEffect(() => {
    query();
  }, []);

  return { ...state, refetch: query };
}
