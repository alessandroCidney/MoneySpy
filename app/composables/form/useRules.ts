export function useRules() {
  return {
    requiredString(value: unknown) {
      return (typeof value === 'string' && !!value) || 'Valor obrigatório'
    },

    requiredNumber(value: string | number) {
      return (!isNaN(typeof value === 'string' ? parseFloat(value) : value) && value !== undefined) || 'Valor obrigatório'
    },
  }
}
