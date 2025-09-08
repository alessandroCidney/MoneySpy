export function useRules() {
  return {
    requiredString(value: unknown) {
      return (typeof value === 'string' && !!value) || 'Valor obrigatório'
    },

    requiredNumber(value: string | number) {
      return (!isNaN(typeof value === 'string' ? parseFloat(value) : value) && value !== undefined) || 'Valor obrigatório'
    },

    validEmail(value: unknown) {
      const emailRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

      return (typeof value === 'string' && emailRegExp.test(value)) || 'E-mail inválido'
    },

    strongPassword(value: unknown) {
      const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/

      return (typeof value === 'string' && passwordRegExp.test(value)) || 'No mínimo 8 caracteres, contendo letras, números e caracteres especiais.'
    },

    matchingPasswords(password: unknown, confirmPassword: unknown) {
      return password === confirmPassword || 'As senhas não correspondem'
    },
  }
}
