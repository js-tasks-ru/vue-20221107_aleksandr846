import { computed, isRef } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  const values = (elems) => elems.map((el) => isRef(el) ? el.value : el);

  return (...args) => computed(() => func(...values(args)));
}
