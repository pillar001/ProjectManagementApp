import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { addTemplate, TemplatePayload } from 'core/api';

interface State {
  pending: boolean;
  error: string;
  id: string | null;
}

type Return = [State, (payload: TemplatePayload) => Promise<void>];

const STATE: State = {
  pending: false,
  error: '',
  id: null
};

export const useTemplateManagement = (): Return => {
  const history = useHistory();

  const [state, setState] = useState(STATE);

  const handleAdd = useCallback(async (payload: TemplatePayload) => {
    setState({ ...STATE, pending: true });

    try {
      const id = await addTemplate(payload);

      setState({ ...STATE, id });
    } catch (error) {
      setState({ ...STATE, error });
    }
  }, []);

  useEffect(() => {
    if (state.id) {
      history.replace(`/app/templates/all/${state.id}`);
    }
  }, [state.id]);

  return [state, handleAdd];
};