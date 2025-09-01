export type ArrayElementType<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type GenericObject = { [x: string]: unknown }
