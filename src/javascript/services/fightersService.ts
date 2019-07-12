import { callApi } from '../helpers/apiHelper';

interface IFighterService {
  getFighters(): Promise <Array<object>>,
  getFighterDetails(_id: string) : Promise <object>
};

class FighterService implements IFighterService {

  async getFighters() {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(_id: string) {
    try {
      const endpoint = `details/fighter/${_id}.json`;
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
