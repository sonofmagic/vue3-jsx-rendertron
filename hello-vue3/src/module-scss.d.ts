/* eslint-disable */
declare module '*.module.scss' {
  interface IModuleScss {
    [key: string]: string
  }
  const ModuleScss: IModuleScss
  export default ModuleScss
}
