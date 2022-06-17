import React from 'react';

export default function lazyWithPreload(factory) {
  const Component = React.lazy(factory);
  Component.preload = factory;
  return Component;
}
