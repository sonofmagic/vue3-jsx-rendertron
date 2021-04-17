import axios from 'axios'

export function getProvinceData() {
  return axios.get('/api/data')
}
