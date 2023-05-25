import { buildModel, required } from '../../utils/modelValidation.js'

export const loginModel = buildModel({
  user: [required('REQUIRED_FIELD_IS_MISSING')],
  password: [required('REQUIRED_FIELD_IS_MISSING')]
})
