import { ref, watch } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  const history = ref([ source.value ]);

  watch(
    source,
    (newSource, oldSource) => {
      history.value.push(newSource);
    },
    { flush: 'sync' },
  );

  return { history };
}
