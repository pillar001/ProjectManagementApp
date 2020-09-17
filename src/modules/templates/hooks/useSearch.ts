import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { Url, ScrollObserver } from 'utils';

import { TemplatesPayload } from 'core/api';

import { useTemplatesProvider } from '../TemplatesProvider';

import { TemplatesSearchFilters } from '..';

import { useFilters } from '.';

const parse = (filters: TemplatesSearchFilters) => (): TemplatesPayload => ({
  ...filters,
  page: +filters.page,
  limit: +filters.limit,
  technologiesIds: JSON.parse(filters.technologiesIds),
  patternsIds: JSON.parse(filters.patternsIds)
});

export const useSearch = () => {
  const { replace, location } = useHistory();

  const filters = useFilters();

  const { getTemplates, allLoaded } = useTemplatesProvider();

  const parsedFilters = useMemo(parse(filters), [filters]);
  console.log(parsedFilters);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    let obs: ScrollObserver;

    const onEmit = ({ bottom }: ScrollObserver.Position) => {
      const incremenPage = () => {
        const url = Url(location)
          .swap('page', parsedFilters.page + 1)
          .value();

        replace(url);
      };

      if (!allLoaded && bottom) {
        incremenPage();
      }
    };

    if (!obs) {
      obs = new ScrollObserver(document, onEmit);
    }

    return () => {
      obs.unsubscribe();
    };
  }, [allLoaded, parsedFilters]);

  useEffect(() => {
    getTemplates(parsedFilters);
  }, [location.key]);
};
