export function useRules() {
  return {
    requiredString(value: unknown) {
      return (typeof value === 'string' && !!value) || 'Valor obrigatório'
    },

    requiredNumber(value: unknown) {
      return (typeof value === 'number' && !isNaN(value) && value !== undefined) || 'Valor obrigatório'
    },
  }
}
