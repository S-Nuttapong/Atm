const baseUri = 'https://frontend-challenge.screencloud-michael.now.sh/api/'

const makeApi = (endpoint: string) => baseUri + endpoint

export const api = {
    userInformation: makeApi('pin'),
}