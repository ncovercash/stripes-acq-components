import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  stripesConnect,
  stripesShape,
} from '@folio/stripes/core';

import { baseManifest } from '../manifests';
import FieldTags from './FieldTags';

const FieldTagsContainer = ({
  formName,
  mutator,
  name,
  resources,
  stripes: { store },
}) => {
  const allTags = get(resources, ['tags', 'records'], []);
  const tagSettings = get(resources, ['configTags', 'records'], []);
  const tagsEnabled = !tagSettings.length || tagSettings[0].value === 'true';

  const onAdd = useCallback(
    (tag) => (
      mutator.tags.POST({
        label: tag,
        description: tag,
      })
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allTags, mutator.tags],
  );

  return (
    tagsEnabled
      ? (
        <FieldTags
          allTags={allTags}
          formName={formName}
          name={name}
          onAdd={onAdd}
          store={store}
        />
      )
      : null
  );
};

FieldTagsContainer.manifest = Object.freeze({
  tags: {
    ...baseManifest,
    path: 'tags',
    params: {
      query: 'cql.allRecords=1 sortby label',
    },
    records: 'tags',
  },
  configTags: {
    ...baseManifest,
    records: 'configs',
    path: 'configurations/entries',
    GET: {
      params: {
        query: '(module=TAGS and configName=tags_enabled)',
      },
    },
  },
});

FieldTagsContainer.propTypes = {
  formName: PropTypes.string.isRequired,
  mutator: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  resources: PropTypes.object.isRequired,
  stripes: stripesShape.isRequired,
};

export default stripesConnect(FieldTagsContainer);